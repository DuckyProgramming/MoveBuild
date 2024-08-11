class card{
    constructor(layer,battle,player,x,y,type,level,color,id,cost,additionalSpec,name,list,effect,attack,target,spec,cardClass,limit,falsed,retain2=false,colorful=false,edition,baseCost,drawn,editedCost,editedCostComplete,nonCalc){
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
        if(variants.deckbuild){
            switch(types.card[this.type].name){
                case 'Defend':
                    this.type=round(findName('Deckbuild\nDefend',types.card))
                break
                case 'Defend-':
                    this.type=round(findName('Deckbuild\nDefend-',types.card))
                break
            }
        }
        if(variants.mtg&&types.card[this.type].mtg==undefined){
            this.type=0
        }
        this.level=level
        this.color=variants.mtg?(typeof color=='number'?[color]:copyArray(color)):constrain(color,0,types.color.card.length-1)
        this.id=id

        this.width=90
        this.height=120
        this.size=0
        this.fade=1
        this.sizeCap=1
        this.deSize=false
        this.deSizeDrop=false
        this.deFade=false
        this.downSize=false
        this.upSize=false
        this.usable=true
        this.exhaust=false
        this.purge=false
        this.vanish=false
        this.retain=false
        this.retain2=retain2
        this.select=false
        this.afford=false
        this.energyAfford=false
        this.costDownTrigger=false
        this.costUpTrigger=false
        this.cancelDesc=false
        this.originated=false
        this.swapped=false
        this.discardEffect=[]
        this.discardEffectBuffered=[]
        this.upped=[false,false,false,false]
        this.relIndex=0
        this.characteristic=0
        this.time=0

        this.anim={select:0,afford:0,costDown:0,costUp:0}
        
        try{
            this.name=name||types.card[this.type].name
            this.checkReplacement()
            this.list=list||(variants.mtg?types.card[this.type].mtg.list:types.card[this.type].list)
            this.rarity=variants.mtg?types.card[this.type].mtg.rarity:types.card[this.type].rarity
            this.spec=spec
            this.additionalSpec=additionalSpec
            this.additionalSpec=this.additionalSpec==undefined?[]:copyArray(additionalSpec)
            let doubles=[]
            if(this.additionalSpec.includes(61)&&spec==undefined){
                for(let a=0,la=this.additionalSpec.length;a<la;a++){
                    if(this.additionalSpec[a]==61){
                        doubles++
                    }
                }
            }
            this.basic=this.rarity==-2
            if(variants.mtg&&types.card[this.type].mtg!=undefined){
                if(types.card[this.type].mtg.levels[0].spec.includes(53)){
                    this.spec=this.spec==undefined?copyArray(types.card[this.type].mtg.levels[0].spec.concat(this.additionalSpec)):copyArray(this.spec)
                    this.effect=effect
                    this.effect=this.effect==undefined?[types.card[this.type].mtg.levels[0].effect[0]+types.card[this.type].mtg.levels[0].effect[1]*this.level,types.card[this.type].mtg.levels[0].effect[1]]:copyArray(this.effect)
                    this.attack=attack||types.card[this.type].mtg.levels[0].attack
                    this.target=target
                    this.target=this.target==undefined?copyArray(types.card[this.type].mtg.levels[0].target):copyArray(this.target)
                    this.class=cardClass||types.card[this.type].mtg.levels[0].class
                }else{
                    this.spec=this.spec==undefined?copyArray(types.card[this.type].mtg.levels[this.level].spec.concat(this.additionalSpec)):copyArray(this.spec)
                    this.effect=effect
                    this.effect=this.effect==undefined?(this.spec.includes(12)?copyArrayStack(types.card[this.type].mtg.levels[this.level].effect):copyArray(types.card[this.type].mtg.levels[this.level].effect)):(this.spec.includes(12)?copyArrayStack(this.effect):copyArray(this.effect))
                    this.attack=attack||types.card[this.type].mtg.levels[this.level].attack
                    this.target=target
                    this.target=this.target==undefined?copyArray(types.card[this.type].mtg.levels[this.level].target):copyArray(this.target)
                    this.class=cardClass||types.card[this.type].mtg.levels[this.level].class
                }
                this.specialCost=this.spec.includes(11)||this.spec.includes(21)||this.spec.includes(40)||this.spec.includes(55)||this.spec.includes(58)||this.spec.includes(59)
                this.cost=cost
                if(cost==undefined&&this.type<types.card.length&&this.type>=0){
                    if(types.card[this.type].levels[0].spec.includes(53)){
                        this.cost=sortNumbers(copyArray(types.card[this.type].mtg.levels[0].cost))
                    }else{
                        this.cost=sortNumbers(copyArray(types.card[this.type].mtg.levels[this.level].cost))
                    }
                }else if(variants.mtg){
                    if(typeof this.cost=='number'){
                        this.cost=[this.cost]
                    }else{
                        this.cost=sortNumbers(copyArray(this.cost))
                    }
                }
            }else{
                if(types.card[this.type].levels[0].spec.includes(53)){
                    this.spec=this.spec==undefined?copyArray(types.card[this.type].levels[0].spec.concat(this.additionalSpec)):copyArray(this.spec)
                    this.effect=effect
                    this.effect=this.effect==undefined?[types.card[this.type].levels[0].effect[0]+types.card[this.type].levels[0].effect[1]*this.level,types.card[this.type].levels[0].effect[1]]:copyArray(this.effect)
                    this.attack=attack||types.card[this.type].levels[0].attack
                    this.target=target
                    this.target=this.target==undefined?copyArray(types.card[this.type].levels[0].target):copyArray(this.target)
                    this.class=cardClass||types.card[this.type].levels[0].class
                }else{
                    this.spec=this.spec==undefined?copyArray(types.card[this.type].levels[this.level].spec.concat(this.additionalSpec)):copyArray(this.spec)
                    this.effect=effect
                    this.effect=this.effect==undefined?(this.spec.includes(12)?copyArrayStack(types.card[this.type].levels[this.level].effect):copyArray(types.card[this.type].levels[this.level].effect)):(this.spec.includes(12)?copyArrayStack(this.effect):copyArray(this.effect))
                    this.attack=attack||types.card[this.type].levels[this.level].attack
                    this.target=target
                    this.target=this.target==undefined?copyArray(types.card[this.type].levels[this.level].target):copyArray(this.target)
                    this.class=cardClass||types.card[this.type].levels[this.level].class
                }
                this.specialCost=this.spec.includes(5)||this.spec.includes(11)||this.spec.includes(35)||this.spec.includes(40)||this.spec.includes(41)||this.spec.includes(55)||this.spec.includes(58)||this.spec.includes(59)
                this.cost=cost
                if(cost==undefined&&this.type<types.card.length&&this.type>=0){
                    if(types.card[this.type].levels[0].spec.includes(53)){
                        this.cost=types.card[this.type].levels[0].cost
                    }else{
                        this.cost=types.card[this.type].levels[this.level].cost
                    }
                }
            }
            this.levels=types.card[this.type].levels.length
            this.limit=limit
            this.limit=this.limit==undefined?this.attack==1947?-1:this.attack==1352?findName('Duck',types.combatant):(this.spec.includes(15)||this.spec.includes(30)||this.spec.includes(38)||this.spec.includes(42)||this.attack==1947)?types.card[this.type].levels[this.level].limit:0:this.limit
            this.edition=edition
            this.edition=this.edition==undefined?0:this.edition
            this.drawn=drawn
            this.drawn=this.drawn==undefined?0:this.drawn
            this.nonCalc=nonCalc
            this.nonCalc=this.nonCalc==undefined?false:this.nonCalc
            if(!variants.mtg&&this.list==-1){
                this.list=this.color
            }
            this.base={cost:baseCost}
            if(this.base.cost==undefined){
                if(variants.mtg&&!this.specialCost&&types.card[this.type].mtg!=undefined){
                    this.base.cost=sortNumbers(copyArray(types.card[this.type].mtg.levels[constrain(this.level,0,types.card[this.type].mtg.levels.length-1)].cost))
                }else{
                    this.base.cost=types.card[this.type].levels[constrain(this.level,0,types.card[this.type].levels.length-1)].cost
                }
            }
            this.edited={cost:editedCost,costComplete:editedCostComplete}
            if(this.edited.cost==undefined){
                this.edited.cost=0
            }
            if(this.edited.costComplete==undefined){
                this.edited.costComplete=false
            }
            if(!(variants.mtg&&!this.specialCost)&&this.edited.cost!=0&&!this.edited.costComplete){
                if(this.edited.cost>0){
                    this.costUp(2,[this.edited.cost])
                }else{
                    this.costDown(2,[-this.edited.cost])
                }
                this.edited.costComplete=true
            }
            if(this.base.cost==-2){
                this.base.cost=floor(random(0,10))
            }
            if(this.spec.includes(12)){
                this.reality=copyArrayStack(types.card[this.type].levels[this.level].reality)
            }else{
                this.reality=[]
            }
            if(variants.mtg){
                if(this.color[0]==-2){
                    let totals=[0,0,0,0,0,0,0]
                    for(let a=0,la=this.battle.energy.originalBase[this.player].length;a<la;a++){
                        totals[this.battle.energy.originalBase[this.player][a]]++
                    }
                    let above=[]
                    for(let a=0,la=5;a<la;a++){
                        for(let b=0,lb=totals.length;b<lb;b++){
                            if(totals[b]==5-a){
                                above.push(b)
                            }
                        }
                    }
                    let resolve=0
                    switch(this.class){
                        case 1:
                            this.color=[above[0]]
                            resolve=above[0]
                        break
                        case 2:
                            this.color=[above[min(above.length-1,1)]]
                            resolve=above[min(above.length-1,1)]
                        break
                        default:
                            this.color=above.length==3?[above[2]]:above.length==2?sortNumbers([above[0],above[1]]):[above[0]]
                            resolve=above.length==3?above[2]:above.length==2?mtgCombineColor(above[0],above[1]):above[0]
                        break
                    }
                    for(let a=0,la=this.cost.length;a<la;a++){
                        if(this.cost[a]==-2){
                            this.cost[a]=resolve
                        }
                    }
                    for(let a=0,la=this.base.cost.length;a<la;a++){
                        if(this.base.cost[a]==-2){
                            this.base.cost[a]=resolve
                        }
                    }
                }
            }

            this.colorful=this.rarity==-5&&this.attack!=1754||colorful

            this.remove=false

            if(variants.vanish&&!this.spec.includes(15)&&!this.spec.includes(38)){
                this.spec.push(15)
                this.limit=this.basic?3:6
            }
            if(variants.polar){
                this.pole=this.type%2==0?1:0
            }
            this.falsed=falsed
            this.falsed=this.falsed==undefined?{trigger:false,name:this.name,attack:this.attack,effect:this.effect,spec:this.spec,rarity:this.rarity,list:this.list,class:this.class,reality:this.reality,colorDetail:this.colorDetail,target:this.target,cost:this.cost}:copyFalsed(this.falsed)
            if(this.battle.initialized&&this.battle.modded(148)){
                if(this.spec.includes(12)){
                    for(let a=0,la=this.class.length;a<la;a++){
                        this.class[a]=10
                    }
                }else{
                    this.class=10
                }
            }
            if(this.additionalSpec.includes(-1)){
                this.setCost(2,[0])
            }
            if(doubles>0){
                for(let a=0,la=doubles;a<la;a++){
                    this.doubleBoth()
                }
            }
        }catch(error){
            print('!!!',this.type,error)
            this.remove=true
            this.spec=[]
        }
        this.setColorDetail()
    }
    setColorDetail(){
        if(variants.mtg){
            if(this.color.length==1){
                this.colorDetail=types.color.mtg[this.color[0]]
            }else{
                this.colorDetail=[]
                for(let a=0,la=this.color.length;a<la;a++){
                    this.colorDetail.push(types.color.mtg[this.color[a]])
                }
            }
        }else{
            this.colorDetail=types.color.card[this.color]
        }
    }
    checkReplacement(){
        let change=false
        if(variants.junk){
            switch(this.name){
                case 'Strike': case 'Defend': case 'Step':
                    this.name+='_'
                    change=true
                break
            }
        }
        if(change){
            this.type=findName(this.name,types.card)
        }
    }
    getCost(type){
        switch(type){
            case 0:
                return variants.mtg?(this.specialCost?this.cost[0]:this.cost.length):this.cost
            case 1:
                let totalNeutral=0
                if(variants.mtg&&!this.specialCost){
                    for(let a=0,la=this.cost.length;a<la;a++){
                        if(this.cost[a]==-1){
                            totalNeutral++
                        }
                    }
                }
                return variants.mtg?(this.specialCost?this.cost[0]:totalNeutral):this.cost
        }
    }
    setCost(type,args){
        let remain=[]
        let preCost=variants.mtg?copyArray(this.cost):this.cost
        switch(type){
            case 0:
                if(variants.mtg){
                    for(let a=0,la=this.cost.length;a<la;a++){
                        if(this.cost[a]==-3){
                            remain.push(this.cost[a])
                        }
                    }
                    this.cost=this.specialCost?[args[0]]:elementArray(-1,args[0])
                    for(let a=0,la=remain.length;a<la;a++){
                        this.cost.push(remain[a])
                    }
                }else{
                    this.cost=args[0]
                }
            break
            case 1:
                if(variants.mtg){
                    for(let a=0,la=this.base.cost.length;a<la;a++){
                        if(this.base.cost[a]==-3){
                            remain.push(this.base.cost[a])
                        }
                    }
                    this.base.cost=this.specialCost?[args[0]]:elementArray(-1,args[0])
                    for(let a=0,la=remain.length;a<la;a++){
                        this.base.cost.push(remain[a])
                    }
                }else{
                    this.base.cost=args[0]
                }
            break
            case 2:
                if(variants.mtg){
                    remain=[[],[]]
                    for(let a=0,la=this.cost.length;a<la;a++){
                        if(this.cost[a]==-3){
                            remain[0].push(this.cost[a])
                        }
                    }
                    for(let a=0,la=this.base.cost.length;a<la;a++){
                        if(this.base.cost[a]==-3){
                            remain[1].push(this.base.cost[a])
                        }
                    }
                    this.cost=this.specialCost?[args[0]]:elementArray(-1,args[0])
                    this.base.cost=this.specialCost?[args[0]]:elementArray(-1,args[0])
                    for(let a=0,la=remain[0].length;a<la;a++){
                        this.cost.push(remain[0][a])
                    }
                    for(let a=0,la=remain[1].length;a<la;a++){
                        this.base.cost.push(remain[1][a])
                    }
                }else{
                    this.cost=args[0]
                    this.base.cost=args[0]
                }
            break
        }
        if(variants.mtg?(this.specialCost?this.cost[0]<preCost[0]:this.cost.length<preCost.length):this.cost<preCost){
            this.costDownTrigger=true
        }else if(variants.mtg?(this.specialCost?this.cost[0]>preCost[0]:this.cost.length>preCost.length):this.cost>preCost){
            this.costUpTrigger=true
        }
    }
    costUp(type,args){
        this.costUpTrigger=true
        switch(type){
            case 0:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.cost[0]>=0){
                            this.cost[0]+=args[0]
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            this.cost.push(-1)
                        }
                    }
                }else if(this.cost>=0){
                    this.cost+=args[0]
                }
            break
            case 1:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.base.cost[0]>=0){
                            this.base.cost[0]+=args[0]
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            this.base.cost.push(-1)
                        }
                    }
                }else if(this.base.cost>=0){
                    this.base.cost+=args[0]
                }
            break
            case 2:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.cost[0]>=0){
                            this.cost[0]+=args[0]
                        }
                        if(this.base.cost[0]>=0){
                            this.base.cost[0]+=args[0]
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            this.cost.push(-1)
                            this.base.cost.push(-1)
                        }
                    }
                }else{
                    if(this.cost>=0){
                        this.cost+=args[0]
                    }
                    if(this.base.cost>=0){
                        this.base.cost+=args[0]
                    }
                }
            break
            case 3:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.cost[0]>=0){
                            this.cost[0]+=args[0]
                        }
                        if(this.base.cost[0]>=0){
                            this.base.cost[0]+=args[0]
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            this.cost.push(-1)
                            this.base.cost.push(-1)
                        }
                    }
                }else{
                    if(this.cost>=0){
                        this.cost+=args[0]
                    }
                    if(this.base.cost>=0){
                        this.base.cost+=args[0]
                    }
                }
                this.edited.cost+=args[0]
                this.edited.costComplete=true
            break
            case 4:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.cost[0]>=0){
                            this.cost[0]+=args[0]
                        }
                        if(this.base.cost[0]>=0){
                            this.base.cost[0]+=args[0]
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            this.cost.push(args[1])
                            this.base.cost.push(args[1])
                        }
                    }
                }else{
                    if(this.cost>=0){
                        this.cost+=args[0]
                    }
                    if(this.base.cost>=0){
                        this.base.cost+=args[0]
                    }
                }
            break
        }
    }
    costDown(type,args){
        this.costDownTrigger=true
        switch(type){
            case 0:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.cost[0]>0){
                            this.cost[0]=max(0,this.cost[0]-args[0])
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            if(this.cost.includes(-1)){
                                this.cost.splice(this.cost.indexOf(-1),1)
                            }
                        }
                    }
                }else if(this.cost>0){
                    this.cost=max(0,this.cost-args[0])
                }
            break
            case 1:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.base.cost[0]>0){
                            this.base.cost[0]=max(0,this.base.cost[0]-args[0])
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            if(this.base.cost.includes(-1)){
                                this.base.cost.splice(this.base.cost.indexOf(-1),1)
                            }
                        }
                    }
                }else if(this.base.cost>0){
                    this.base.cost=max(0,this.base.cost-args[0])
                }
            break
            case 2:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.cost[0]>0){
                            this.cost[0]=max(0,this.cost[0]-args[0])
                        }
                        if(this.base.cost[0]>0){
                            this.base.cost[0]=max(0,this.base.cost[0]-args[0])
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            if(this.cost.includes(-1)){
                                this.cost.splice(this.cost.indexOf(-1),1)
                            }
                            if(this.base.cost.includes(-1)){
                                this.base.cost.splice(this.base.cost.indexOf(-1),1)
                            }
                        }
                    }
                }else{
                    if(this.cost>0){
                        this.cost=max(0,this.cost-args[0])
                    }
                    if(this.base.cost>0){
                        this.base.cost=max(0,this.base.cost-args[0])
                    }
                }
            break
            case 3:
                if(variants.mtg){
                    if(this.specialCost){
                        if(this.cost[0]>0){
                            this.cost[0]=max(0,this.cost[0]-args[0])
                        }
                        if(this.base.cost[0]>0){
                            this.base.cost[0]=max(0,this.base.cost[0]-args[0])
                        }
                    }else{
                        for(let a=0,la=args[0];a<la;a++){
                            if(this.cost.includes(-1)){
                                this.cost.splice(this.cost.indexOf(-1),1)
                            }
                            if(this.base.cost.includes(-1)){
                                this.base.cost.splice(this.base.cost.indexOf(-1),1)
                            }
                        }
                    }
                }else{
                    if(this.cost>0){
                        this.cost=max(0,this.cost-args[0])
                    }
                    if(this.base.cost>0){
                        this.base.cost=max(0,this.base.cost-args[0])
                    }
                }
                this.edited.cost-=args[0]
                this.edited.costComplete=true
            break
        }
    }
    updateSpecialCost(){
        this.specialCost=this.spec.includes(11)||this.spec.includes(21)||this.spec.includes(35)||this.spec.includes(40)||this.spec.includes(55)||this.spec.includes(58)||this.spec.includes(59)
        if(this.specialCost){
            if(typeof this.cost!='number'){
                this.cost=[this.cost.length]
            }
            if(typeof this.base.cost!='number'){
                this.base.cost=[this.base.cost.length]
            }
        }
    }
    calculateEffect(effect,type){
        if(stage.scene=='battle'&&!this.nonCalc&&!this.cancelDesc){
            let user=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            this.cancelDesc=false
            return calculateEffect(effect,user,type,this.player,this.battle.relicManager,true,[this.basic&&this.class==1,this.name=='Shiv'||this.name=='Broken\nShiv'||this.name=='Deluxe\nShiv',this.spec.includes(25),this.spec.includes(54),this.basic&&(this.class==1||this.class==2),this.spec.includes(52),this.name.includes('Cable')&&this.class==1,this.rarity==0&&this.class==1])
        }else{
            this.cancelDesc=false
            return calculateEffect(effect,this.battle.proxyPlayer,type,-1,new disabledRelicManager(),-1,[false,false,false,false,false,false,false])
        }
    }
    calculateEffectAlly(effect,type){
        if(stage.scene=='battle'&&!this.nonCalc&&!this.cancelDesc){
            let user=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.players-1-this.player)]
            this.cancelDesc=false
            return calculateEffect(effect,user,type,this.player,this.battle.relicManager,true,[this.basic&&this.class==1,this.name=='Shiv'||this.name=='Broken\nShiv'||this.name=='Deluxe\nShiv',this.spec.includes(25),this.spec.includes(54),this.basic&&(this.class==1||this.class==2),this.spec.includes(52),this.name.includes('Cable')&&this.class==1,this.rarity==0&&this.class==1])
        }else{
            this.cancelDesc=false
            return calculateEffect(effect,this.battle.proxyPlayer,type,-1,new disabledRelicManager(),-1,[false,false,false,false,false,false,false])
        }
    }
    diceEffect(effect,number,variant,value){
        let midPoint=this.calculateEffect(value,variant).toString().replace(`X`,` x ${effect!=1?`${effect}`:``}D${number}`)
        if(midPoint[0]==' '||midPoint[1]=='x'||midPoint[2]==' '){
            return midPoint.substr(3,midPoint.length-3)
        }else{
            return midPoint
        }
    }
    description(attack,effect,spec,target){
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
        if(spec.includes(47)){
            string+='Anti-Innate\n'
        }
        if(spec.includes(9)){
            string+='Stapled\n'
        }
        switch(attack){
            case -1: string+=`At the End of Your Turn,\nGain ${effect[0]} Weak`; break
            case -2: string+=`At the End of Your Turn,\nGain ${effect[0]} Vulnerable`; break
            case -3: string+=`When Drawn,\nExhaust ${effect[0]} Card\nCannot be Selected\nto Exhaust`; break
            case -4: string+=`At the End of Your Turn,\nTake ${effect[0]} Damage`; break
            case -5: string+=`Take ${effect[0]} Damage\nWhen You Play a Card`; break
            case -6: string+=`When Drawn,\nGain ${effect[0]} Weak`; break
            case -7: string+=`At the End of Your Turn,\nTake ${effect[0]} Damage Per\nCard Remaining in hand`; break
            case -8: string+=`Take ${effect[0]} Damage\nWhen an Enemy Dies`; break
            case -9: string+=`You Cannot\nPlay More Than ${effect[0]}\nCards This Turn`; break
            case -10: string+=`When Removed,\nLose ${effect[0]} Max Health`; break
            case -11: string+=`If Unplayed,\nAdd a Pride to\nDiscard`; break
            case -12: string+=`When Drawn,\nA Random Card\nCosts ${effect[0]} More\nTemporarily`; break
            case -13: string+=`Take ${effect[0]} Damage`; break
            case -14: string+=`Lose ${effect[0]} Currency`; break
            case -15: string+=`When Drawn,\nYou Cannot Move\nFor ${effect[0]} Turn${pl(effect[0])}\nWhen Played, Cancels\nPrevious Effect`; break
            case -16: string+=`When Drawn,\nAdd a Fatigue to Hand`; break
            case -17: string+=`When Drawn,\nA Random Card\nCosts ${effect[0]} More`; break
            case -18: string+=`When Drawn,\nLose ${effect[0]} ${variants.mtg?`Random Mana`:`Energy`}`; break
            case -19: string+=`When Drawn,\nYou Cannot Move\nFor ${effect[0]} Turn${pl(effect[0])}`; break
            case -20: string+=`When Drawn,\nMovement Cards in Hand\nCost ${effect[0]} More`; break
            case -21: string+=`Take ${effect[0]} Damage\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case -22: string+=`When Drawn,\nStop Drawing`; break
            case -23: string+=`When Drawn,\nExhaust ${effect[0]}\nRandom Card${pl(effect[0])}`; break
            case -24: string+=`When Drawn,\nAdd a Burn to Hand`; break
            case -25: string+=`When Drawn,\nA Random Card\nGains Exhaust`; break
            case -26: string+=`When Drawn,\nHalve Card Effects`; break
            case -27: string+=`When Drawn,\nLose ${effect[0]} Temporary\nStrength`; break
            case -28: string+=`When Drawn,\nGain ${effect[0]} Strength`; break
            case -29: string+=`When Drawn,\nLose All Energy`; break
            case -30: string+=`When You Play a Card,\nDiscard ${effect[0]} Random Card${pl(effect[0])}`; break
            case -31: string+=`When Drawn,\nApply ${effect[0]} Poison\nto Everything`; break
            case -32: string+=`When Drawn,\nApply ${effect[0]} Poison\nto Everything Else`; break
            case -33: string+=`Take ${effect[0]} Damage\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case -34: string+=`When Drawn,\nHidden Swap ${effect[0]} Times`; break
            case -35: string+=`Set Energy to 0`; break
            case -36: string+=`Take ${effect[0]} Damage\nIf Discarded,\nGain ${effect[1]} Poison`; break
            case -37: string+=`Spends Draw as Retain`; break
            case -38: string+=`When Etherealed,\nLose ${effect[0]} Currency`; break
            case -39: string+=`Lose ${effect[0]} Strength\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case -40: string+=`Unupgrade ${effect[0]} Card${pl(effect[0])}`; break
            case -41: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nAround Self and to Self\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case -42: string+=`Gain ${effect[0]} Poison\nWhen You Play a Card`; break
            case -43: string+=`When Drawn,\nHidden Swap Draw\nPile ${effect[0]} Times`; break
            case -44: string+=`When Drawn,\nA Random Card\nis Stapled`; break
            case -45: string+=`When Added,\na Random Card\nGets Vanishing 3`; break
            case -46: string+=`When Drawn,\nDraw ${effect[0]} More and\nStop Drawing`; break
            case -47: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTake ${effect[1]} Damage\nWhen You Take Damage,\nDamage Decreases by ${effect[2]}`; break
            case -48: string+=`When Drawn,\nLose ${effect[0]} Energy\nWhen Selectively\nDiscarded,\nNext ${effect[1]!=1?`${effect[1]} `:``}Attack${pl(effect[1])}\nDeal${effect[1]==1?`s`:``} Double Damage`; break
            case -49: string+=`At the End of Your Turn\nLose ${effect[0]} Block`; break
            case -50: string+=`When Etherealed,\nDraw ${effect[0]} More Card${pl(effect[0])}\nNext Turn`; break
            case -51: string+=`When Drawn,\nCosts 1 Less`; break
            case -52: string+=`A Random Enemy\nGains ${effect[0]} Strength`; break
            case -53: string+=`Take ${effect[0]} Damage\nin 2 Turns`; break
            case -54: string+=`When Etherealed,\nDraw ${effect[0]} Less Card${pl(effect[1])}\nNext Turn`; break
            case -55: string+=`When Drawn,\nBurn ${effect[0]} Card${pl(effect[0])}`; break
            case -56: string+=`When Drawn,\nLose ${effect[0]} Energy\nAnd a Random Card\nin Hand Costs ${effect[1]} Less`; break
            case -57: string+=`When Etherealed,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy`; break
            case -58: string+=`When Etherealed,\nUnupgrade ${effect[0]} Random\nCard${pl(effect[0])}`; break
            case -60: string+=`Lose ${effect[0]} Currency\nGain ${effect[1]} Temporary\nStrength`; break
            case -61: string+=`When Drawn,\nMake ${effect[0]} Cop${effect[0]!=1?`ies`:`y`}`; break
            case -62: string+=`Take ${effect[0]} Damage\nIf You Do Not\nAttack This Turn`; break
            case -63: string+=`When Drawn,\nAdd a Pristine to Hand`; break
            case -64: string+=`When Drawn,\nAll Colored Cards in Hand\nCost ${effect[0]} More`; break
            case -65: string+=`At the End of Turn,\nIf There are 3 or\nMore Lunacies in Hand,\nLose ${effect[0]} Health Each`; break
            case -66: string+=`When Drawn,\nDiscard ${effect[0]} Random\nCard${pl(effect[0])}`; break
            case -67: string+=`When Drawn,\nLose ${effect[0]} Currency\nWhen Removed,\nLose ${effect[1]} Currency`; break
            case -68: string+=`When Drawn,\nDiscard ${effect[0]} Card${pl(effect[0])}`; break
            case -69: string+=`If Enemy Dies,\nYou Die`; break
            case -70: string+=`When Drawn,\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}\nMake ${effect[2]} Cop${effect[2]!=1?`ies`:`y`}`; break
            case -71: string+=`When Drawn,\nNext Luck-Based Card\nis Guaranteed to Fail`; break
            case -72: string+=`When Drawn,\nLose ${effect[0]} Energy\nAdd a Pristine to Hand`; break
            case -73: string+=`When Drawn,\nLose ${effect[0]} Temporary\nStrength\nLose ${effect[1]} Temporary\nDexterity`; break
            case -74: string+=`When Drawn,\nNext Luck-Based Card\nis Guaranteed\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case -75: string+=`When Drawn,\nDiscard All Defenses`; break
            case -76: string+=`When Drawn,\nDiscard All Skills`; break
            case -77: string+=`At the End of Your Turn\nTake ${effect[0]} Damage\nWhen Played,\nLose ${effect[1]} Energy Next Turn`; break
            case -78: string+=`When Drawn,\nAdd a Refracted\nSunlight to Discard`; break
            case -79: string+=`At the End of Your Turn,\nAdd a Refracted\nSunlight to Discard`; break
            case -80: string+=`When Drawn,\nFreeze ${effect[0]} Card${pl(effect[0])}`; break
            case -81: string+=`At the End of Your Turn,\nAdd a Quiet\nMoonlight to Discard`; break
            case -82: string+=`At the End of Your Turn,\nAdd a Glamorous\nStarlight to Discard`; break
            case -83: string+=`When Drawn,\nGain ${effect[0]} Lock On`; break
            case -84: string+=`Must be Played\nWithin ${effect[0]} Seconds or\nTake ${effect[1]} Damage${stage.scene=='battle'&&this.player>=0&&this.player<this.battle.players?`\n(Currently ${floor(this.time/60)}s)`:``}`; break
            case -85: string+=`When Drawn,\nTake ${effect[0]} Damage\nIf You Do Not\nAttack This Turn`; break
            case -86: string+=`At the End of Your Turn,\nLose ${effect[0]} Currency\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case -87: string+=`At the End of Your Turn,\nGain ${effect[0]} Frail`; break
            case -88: string+=`At the End of Your Turn,\nTake ${effect[0]} Damage\nIncreases by ${effect[1]}`; break
            case -89: string+=`Gain ${effect[0]} Energy\nWhen Drawn,\nCosts 1 Less`; break
            case -90: string+=`At the End of Your Turn,\nLose ${effect[0]} Charge`; break
            
            //mark n

            case 1: case 25: case 32: case 36: case 57: case 590: case 1139: case 1191:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2: case 1700:
                string+=`Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 3: string+=`Move ${effect[0]} Tile${pl(effect[0])}`; break
            case 4: case 729:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times`; break
            case 5: case 16:
                string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile`; break
            case 6: case 4129:
                string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage`; break
            case 7: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Energy`; break
            case 8: case 3827:
                string+=`Draw ${effect[0]} Card${pl(effect[0])}`; break
            case 9: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nor\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 10: string+=`Heal ${this.calculateEffect(effect[0],4)} Health`; break
            case 11: case 251:
                string+=`Pull Target Until Adjacent\nTarget Will Face User`; break
            case 12: case 1171:
                string+=`Deal ${this.calculateEffect(effect[0],2)} Damage`; break
            case 13: string+=`Add ${this.calculateEffect(effect[0],3)} Block`; break
            case 14: string+=`Pass Through an\nAdjacent Target\nor\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 15: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nMove Forward 1 Tile`; break
            case 17: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMove 1 Tile Away`; break
            case 18: case 4124:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions`; break
            case 19: string+=`Swap With an\nAdjacent Target\nDeal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile`; break
            case 20: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDiscard ${effect[1]}\nRandom Card`; break
            case 21: string+=`Advance`; break
            case 22: string+=`Gain ${effect[0]} Energy\nTake ${effect[1]} Damage`; break
            case 23: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}`; break
            case 24: string+=`Make an Enemy Attack\nThey Will Not Attack\non Their Turn`; break
            case 26: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nYou Cannot Be Pushed\nThis Turn`; break
            case 27: case 33:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance`; break
            case 28: string+=`Put a Card in Discard\nPile in Your Hand`; break
            case 29: string+=`Put a Card in Draw\nPile in Your Hand`; break
            case 30: case 3830:
                string+=`Gain ${effect[0]} Dodge`; break
            case 31: case 489:
                string+=`Push 1 Tile\nin All Directions`; break
            case 34: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nNext Turn`; break
            case 35: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target is Undamaged,\nGain ${effect[1]} Energy`; break
            case 37: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDisarm`; break
            case 38: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nReduce Damage by ${effect[1]}`; break
            case 39: case 49:
                string+=`Apply ${effect[0]} Bleed`; break
            case 40: string+=`Discard Your Hand\nDraw That Many Cards`; break
            case 41: string+=`Gain ${effect[0]} Energy`; break
            case 42: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 43: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 44: string+=`Shuffle Discard Pile\nInto Draw Pile\nDraw ${effect[0]} Card${pl(effect[1])}`; break
            case 45: string+=`Upgrade All Cards`; break
            case 46: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target Has Bleed`; break
            case 47: case 662:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed`; break
            case 48: case 100:
                string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 2 Tiles`; break
            case 50: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Block\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 51: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Dodge`; break
            case 52: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDiscard When a\nCard is Played`; break
            case 53: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Dodge`; break
            case 54: string+=`Move to Any\nEmpty Tile`; break
            case 55: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 56: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCosts 1 More When\na Card is Played`; break
            case 58: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd a Stride\nto Hand`; break
            case 59: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLose All Block`; break
            case 60: string+=`Move Up to ${effect[0]!=1?effect[0]:``}X${effect[1]>0?`+`+effect[1]:``} Tiles`; break
            case 61: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Currency`; break
            case 62: string+=`Reduce Cost of\nAll Cards in\nHand to ${effect[0]}${effect[1]==0?`\nTemporarily`:``}`; break
            case 63: string+=`Exhaust Any\nNumber of Cards`; break
            case 64: string+=`Gain ${effect[0]} Control`; break
            case 65: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCannot Add Block\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 66: case 84:
                string+=`Apply ${effect[0]} Weak`; break
            case 67: case 85:
                string+=`Apply ${effect[0]} Vulnerable`; break
            case 68: string+=`Remove ${effect[0]} Temporary\nStrength`; break
            case 69: string+=`Add ${effect[0]} Random\nColorless Card${pl(effect[0])}\nto Hand`; break
            case 70: string+=`Place a Card on\nTop of Draw Pile\nIt Costs 0\nTemporarily`; break
            case 71: string+=`Choose a Card to\nAdd to Hand\nIt Costs 0`; break
            case 72: string+=`Gain ${effect[0]} Strength\nLose ${effect[1]} Health`; break
            case 73: string+=`Gain ${effect[0]} Dexterity\nLose ${effect[1]} Health`; break
            case 74: string+=`Gain ${effect[0]} Buffer\nLose ${effect[1]} Health`; break
            case 75: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAway From Target`; break
            case 76: string+=`Gain ${effect[0]} Intangible`; break
            case 77: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 78: string+=`A Random Card in\nYour Hand Costs 0`; break
            case 79: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd an Ouroboros With\n+${effect[1]} Damage to Discard`; break
            case 80: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Frail`; break
            case 81: string+=`Apply ${effect[0]} Poison`; break
            case 82: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nMay Target\nThrough Obstructions`; break
            case 83: string+=`Apply ${effect[0]} Stun`; break
            case 86: string+=`Apply ${effect[0]} Frail`; break
            case 87: string+=`Move to Any Tile\nDestroy its\nOccupants`; break
            case 88: string+=`Deal ${this.calculateEffect(effect[0],5)} Damage`; break
            case 89: case 3645:
                string+=`Remove All\nBlock of Target\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 90: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Attack Deals\n${effect[1]} More Damage`; break
            case 91: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 92: string+=`Remove ${effect[0]} Fatigue${pl(effect[0])}`; break
            case 93: string+=`Put a Card in Exhaust\nPile in Your Hand`; break
            case 94: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 95: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 96: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Push 1 Tile`; break
            case 97: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Bleed`; break
            case 98: string+=`Attacks This Turn\nDeal ${effect[0]} More Damage`; break
            case 99: string+=`Gain ${effect[0]} Energy\nNext Turn`; break
            case 101: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Played First,\nDeals Double\nDamage`; break
            case 102: string+=`Rearm or Create\na Rearmament Point`; break
            case 103: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Less\nCard${effect[1]?`s`:``} Next Turn`; break
            case 104: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will\nUse a Special Move,\nReduce Effect by ${effect[1]}`; break
            case 105: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nLose ${effect[1]} Energy`; break
            case 106: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nApply ${effect[1]} Weak`; break
            case 107: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDecreases by ${effect[1]}`; break
            case 108: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts ${effect[1]} Less`; break
            case 109: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nAdd a Burn to\nDiscard`; break
            case 110: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Control`; break
            case 111: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have Played\nLess Than ${effect[1]} Card${pl(effect[1])},\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 112: string+=`Add ${effect[0]} Shiv${pl(effect[0])}\nto Hand`; break
            case 113: case 457:
                string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 114: string+=`Gain an Item`; break
            case 115: string+=`Deal ${effect[0]} Damage\nAdd a Copy of\nThis Card to Draw`; break
            case 116: string+=`End Your Turn\nGain X${effect[0]!=0?`+${effect[0]}`:``} Energy\nNext Turn`; break
            case 117: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You Have Weak`; break
            case 118: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}`; break
            case 119: string+=`If Every Card in\nHand is an Attack,\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 120: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 121: string+=`If Unarmed,\n${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile`; break
            case 122: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} All`; break
            case 123: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Slow Bleed\nto Discard Pile`; break
            case 124: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhaust ${effect[1]} Random Card${pl(effect[1])}`; break
            case 125: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Attack Deals\n${effect[1]} Less Damage`; break
            case 126: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak`; break
            case 127: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nAdvance`; break
            case 128: string+=`Gain ${effect[0]} Combo`; break
            case 129: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage`; break
            case 130: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nEnd Combo\nAdvance`; break
            case 131: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}+${effect[2]!=1?`${effect[2]}*`:``}Combo`; break
            case 132: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\n3 Times\nEnd Combo`; break
            case 133: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nMove 1 Tile Away`; break
            case 134: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile Right`; break
            case 135: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile Left`; break
            case 136: case 217: case 1055:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times`; break
            case 137: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Strength\nNext Turn`; break
            case 138: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide`; break
            case 139: string+=`Deal ${this.calculateEffect(effect[0],0)}+${effect[1]!=1?`${effect[1]}*`:``}Combo\nDamage 3 Tiles Wide\nEnd Combo`; break
            case 140: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block`; break
            case 141: string+=`Gain ${this.calculateEffect(effect[0],6)} Block\nEnd Combo`; break
            case 142: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Temporary\nStrength When Hit\nThis Turn`; break
            case 143: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\n`:`\n`}Push 1 Tile`; break
            case 144: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCards in Discard\n(Including This Card)`; break
            case 145: string+=`Heal ${effect[0]} Health\nto Ally`; break
            case 146: string+=`Add ${effect[0]} Block\nto Ally`; break
            case 147: string+=`Swap Places\nWith Ally`; break
            case 148: string+=`Heal ${this.calculateEffectAlly(effect[0],4)} Health\nRemove ${effect[1]} Health\nfrom Ally`; break
            case 149: string+=`Take 25% Less\nDamage For ${effect[0]} Turn${pl(effect[0])}`; break
            case 150: string+=`Gain ${effect[0]} Strength\nFor 2 Turns`; break
            case 151: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Etherealed, Add\nan Operational Defend\nof Equivalent Level`; break
            case 152: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Etherealed, Add\nan Operational Strike\nof Equivalent Level`; break
            case 153: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDiagonally`; break
            case 154: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Your Block`; break
            case 155: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy`; break
            case 156: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Temporary Slow`; break
            case 157: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Target and to Up\nto 1 Adjacent Enemy`; break
            case 158: string+=`Ally Draws ${effect[0]} More\nCards on Their Turn`; break
            case 159: string+=`Ally Gains ${effect[0]} Strength`; break
            case 160: string+=`Ally Gains ${effect[0]} Energy\non Their Turn`; break
            case 161: string+='Send All Remaining\nCards to Ally'; break
            case 162: string+=`Ally Gains ${effect[0]} Buffer`; break
            case 163: string+=`Ally Removes ${effect[0]}\nStatus Card${pl(effect[0])}`; break
            case 164: string+=`Steal ${effect[0]} Currency\nFrom Ally`; break
            case 165: string+=`Move Ally to Any\nEmpty Tile`; break
            case 166: string+=`Add to Hand:\nRiot Shield\nPepper Spray\nShock Baton`; break
            case 167: string+=`Add to Hand:\nRiot Shield\nPepper Spray\nShock Baton\nUpgrade 1\nat Random`; break
            case 168: string+=`Add to Hand:\nFlamethrower\nImpact Grenade\nSafemine`; break
            case 169: string+=`Add to Hand:\nFlamethrower\nImpact Grenade\nSafemine\nUpgrade 1\nat Random`; break
            case 170: string+=`Add to Hand:\nSubmachine\nAntitank Rocket\nResupply`; break
            case 171: string+=`Add to Hand:\nSubmachine\nAntitank Rocket\nResupply\nUpgrade 1\nat Random`; break
            case 172: string+=`You Cannot Take\nFrontal Damage\nFor ${effect[0]} Turn${pl(effect[0])}`; break
            case 173: string+=`Target Moves in a\nRandom Direction ${effect[0]} Time${pl(effect[0])}`; break
            case 174: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Stun`; break
            case 175: string+=`Apply ${effect[0]} Burn\n3 Tiles Wide`; break
            case 176: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nIgnore Block`; break
            case 177: string+=`Create 1 Landmine`; break
            case 178: string+=`Deal ${this.calculateEffect(effect[0],0)} Decrementing\nDamage\n4 Times`; break
            case 179: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nPushes Without\nSplash at Range 1`; break
            case 180: string+=`Your Next ${effect[0]} Exhaust${pl(effect[0])}\nDiscard the Card Instead`; break
            case 181: string+=`Gain ${effect[0]} Dodge\nCounter ${effect[1]}`; break
            case 182: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Combo\nTake ${effect[2]} Damage\nIf You Do Not\nAttack This Turn`; break
            case 183: string+=`Draw ${effect[0]!=1?`effect[0]`:``}X${effect[1]>0?`+${effect[1]}`:``} Cards`; break
            case 184: string+=`Collisions Do ${effect[0]}\nMore Damage`; break
            case 185: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card\n${effect[1]!=1?`They Cost`:`It Costs`} 0`; break
            case 186: string+=`All Cards in Hand\nCost ${effect[0]} Less\nTemporarily`; break
            case 187: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTake ${effect[1]} Damage\nWhen Discarded`; break
            case 188: string+=`Apply ${effect[0]} Damage\nTaken Up\nApply ${effect[1]} Strength`; break
            case 189: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCause Target to Attack`; break
            case 190: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Energy When\nHit This Turn`; break
            case 191: string+=`Deal ${this.calculateEffect(effect[0],8)}\nDamage`; break
            case 192: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Strength`; break
            case 193: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double to Bosses`; break
            case 194: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nLose ${effect[1]} Health`; break
            case 195: string+=`Convert ${effect[0]}*Combo\nto Health`; break
            case 196: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Conditioning`; break
            case 197: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Conditioning`; break
            case 198: string+=`Multiply Your\nCombo by ${effect[0]}`; break
            case 199: case 3556:
                string+=`Combo Costing Cards\nCost ${effect[0]} Less`; break
            case 200: string+=`Gain ${effect[0]} Conditioning\nLose ${effect[1]} Health`; break
            case 201: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nin Both Directions`; break
            case 202: string+=`Gain ${effect[0]} Combo\nWhen Exhausted,\nGain ${effect[1]} Combo`; break
            case 203: string+=`Retain Block\nFor ${effect[0]} Turn${pl(effect[0])}`; break
            case 204: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Conditioning`; break
            case 205: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDoesn't Trigger Enemies`; break
            case 206: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Hand Size\nDiscard Your Hand`; break
            case 207: string+=`Discard ${effect[0]} Card${pl(effect[0])}\nAdd ${effect[1]} Random\nCards to Hand`; break
            case 208: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n4 Times\nAdvance`; break
            case 209: string+=`Add ${effect[0]} Random\nDefense${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 210: string+=`Add ${effect[0]} Random\nDefense${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 211: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nGain ${effect[1]} Dodge`; break
            case 212: string+=`Gain ${effect[0]} Base\nEnergy This Combat`; break
            case 213: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Conditioning`; break
            case 214: string+=`Upgrade ${effect[0]} Random Card${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 215: string+=`Gain ${effect[0]} Combo\nLose ${effect[1]} Health`; break
            case 216: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 218: case 2090:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Card${pl(effect[2])}`; break
            case 219: string+=`Add ${effect[0]} Shiv${pl(effect[0])}\nto Hand\nEvery Turn`; break
            case 220: case 594:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard When a\nCard is Played`; break
            case 221: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Combo`; break
            case 222: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin Both Directions`; break
            case 223: string+=`Gain ${effect[0]} Conditioning`; break
            case 224: string+=`Heal ${this.calculateEffect(effect[0],9)} Health`; break
            case 225: string+=`Gain ${effect[0]} Combo\nGain ${effect[1]} Energy\nNext Turn`; break
            case 226: string+=`Gain ${effect[0]} Combo\nLose All Combo\nat End of Turn`; break
            case 227: case 3832:
                string+=`Next ${effect[0]} Card${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated`; break
            case 228: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 229: string+=`Add ${effect[0]} Random\nAttack${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 230: string+=`Add ${effect[0]} Random\nAttack${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 231: string+=`Each Hit Gains\n${effect[0]} More Combo`; break
            case 232: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nWhen an Attack is Played`; break
            case 233: string+=`Gain ${effect[0]} Combo\nWhen You Add Block`; break
            case 234: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Combo`; break
            case 235: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nCounter ${effect[1]}X`; break
            case 236: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile Right Back`; break
            case 237: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile Left Back`; break
            case 239: string+=`Gain ${effect[0]} Combo\nPer Turn`; break
            case 240: string+=`Gain ${effect[0]} Combo\nNext Turn`; break
            case 241: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nWhen There is an Empty\nTile Spot Behind You\nMove 1 Tile Away`; break
            case 242: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} at Range 1-2`; break
            case 243: string+=`Pull Target 1 Tile\nTarget Will Face User\nAdvance`; break
            case 244: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 2 Tiles\nAround Right`; break
            case 245: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 2 Tiles\nAround Left`; break
            case 246: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMove 6 Tiles Away`; break
            case 247: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nPush 1 Tile\nEnd Combo`; break
            case 248: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Conditioning`; break
            case 249: string+=`Gain Strength\nPer ${effect[0]} Combo\nEnd Combo`; break
            case 250: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push to End`; break
            case 252: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nX Times`; break
            case 253: string+=`Discard Your Hand\nand Add That\nMany${effect[0]>0?`+${effect[0]}`:``} Shivs`; break
            case 254: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen You Play a Card`; break
            case 255: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDecreases by ${effect[1]}`; break
            case 256: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 257: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nWhen Selectively\nDiscarded`; break
            case 258: string+=`Gain ${effect[0]} Energy\nWhen Selectively\nDiscarded`; break
            case 259: string+=`Gain ${effect[0]} Energy\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 260: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget's Attacks Deal ${effect[1]}\nLess Damage This Turn`; break
            case 261: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\n${effect[1]!=1?`They Cost`:`It Costs`} 1 Less\nTemporarily`; break
            case 262: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Block\nNext Turn`; break
            case 263: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 This\nTurn When a Card\nis Selectively Discarded`; break
            case 264: string+=`Shivs Deal ${effect[0]}\nMore Damage`; break
            case 265: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nAttacks Played\nThis Turn\n(Including This Card)`; break
            case 266: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 More\nWhen You Take Damage`; break
            case 267: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nDefenses in Hand`; break
            case 268: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Has Weak:\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 269: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Has Vulnerable:\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 270: string+=`Add ${effect[0]} Shiv${pl(effect[0])}\nto Hand\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 271: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCounter ${effect[1]}`; break
            case 272: string+=`Apply ${effect[0]} Random Debuff`; break
            case 273: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 274: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Chip of\nEquivalent Level to\nDiscard`; break
            case 275: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nAdd ${this.calculateEffect(effect[1],3)} Block\nValues Swap\nWhen X is Odd`; break
            case 276: string+=`Next ${effect[0]} Card${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated\nDiscard ${effect[0]} Random Card${pl(effect[0])}`; break
            case 277: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Copy of\nThis Card to Discard`; break
            case 278: string+=`Gain ${effect[0]}\nTemporary Strength`; break
            case 279: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporary`; break
            case 280: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number of\nAttacks in Hand`; break
            case 281: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust ${effect[1]} Random Card${pl(effect[1])}`; break
            case 282: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen You Take Damage`; break
            case 283: string+=`Gain ${effect[0]} Energy\nLose ${effect[1]} Health`; break
            case 284: string+=`Gain ${effect[0]} Energy\nGain ${effect[1]} Dexterity\nNext Turn`; break
            case 285: string+=`Discard ${effect[0]} Card${pl(effect[1])}\n50%: Draw ${effect[1]} Card${pl(effect[1])}\nFrom the Bottom`; break
            case 286: string+=`Counter ${effect[0]} All\nThis Combat`; break
            case 287: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Takes ${effect[1]}\nDamage Per Card\nPlayed This Turn`; break
            case 288: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Drawn,\nMake ${effect[1]} Cop${effect[1]!=1?`ies`:`y`}`; break
            case 289: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nIf Last Card\nis a Defense,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 290: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nCosts 1 Less This\nTurn When a Card\nis Selectively Discarded`; break
            case 291: string+=`Draw to ${effect[0]} Card${pl(effect[0])}`; break
            case 292: string+=`Apply ${effect[0]} Weak\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 293: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} More\nCard${pl(effect[1])} Next Turn`; break
            case 294: string+=`All Cards Cost 0\nYou Cannot Draw More\nCards This Turn`; break
            case 295: string+=`Target Explodes\non Death For\nits Max Health`; break
            case 296: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Draw is Empty`; break
            case 297: string+=`Remove ${effect[0]}X Strength\nApply ${effect[1]}X Weak`; break
            case 298: string+=`Add ${effect[0]} Cop${effect[0]!=1?`ies`:`y`}\nof a Card to\nthe Bottom of\nYour Draw\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 299: string+=`Deal Double Damage\nNext Turn`; break
            case 300: string+=`Draw ${effect[0]} Card${pl(effect[0])} and\nDiscard ${effect[1]} Card${pl(effect[1])}\nEvery Turn`; break
            case 301: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard All\nNon-Attacks in Hand`; break
            case 302: string+=`Gain ${effect[0]} Intangible\nLose ${effect[1]} Dexterity\nPer Turn`; break
            case 303: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Exhausted,\nGain ${effect[1]} Energy`; break
            case 304: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhuast All\nNon-Attacks in Hand`; break
            case 305: string+=`If Target Will Attack,\nGain ${effect[0]} Strength`; break
            case 306: string+=`Retain All Block\nThis Combat`; break
            case 307: string+=`Gain ${effect[0]} Vulnerable\nGain ${effect[1]} Base Energy\nThis Combat`; break
            case 308: string+=`Draw ${effect[0]} Card${pl(effect[0])} and\nLose ${effect[1]} Health\nEvery Turn`; break
            case 309: case 3421:
                string+=`Defenses are\nFree and Exhaust\nThis Combat`; break
            case 310: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Max Health`; break
            case 311: string+=`Multiply Your\nBuffs by ${effect[0]}`; break
            case 312: string+=`When You Take Damage,\nAdd ${effect[0]} Shiv${pl(effect[0])}\nto Hand`; break
            case 313: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nIf Last Card\nis an Attack,\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 314: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nDeal ${this.calculateEffect(effect[1],0)} Splash Damage\nAround Target`; break
            case 315: string+=`Send Discard\nPile to Hand`; break
            case 316: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Random Debuff`; break
            case 317: string+=`Gain ${effect[0]} Intangible\nand ${effect[1]} Energy\nNext Turn`; break
            case 318: string+=`When a Card is Exhausted,\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 319: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto a Random\nOther Enemy`; break
            case 320: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nThis Turn and\nNext 2 Turns`; break
            case 321: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext Attack Deals\n${effect[1]} More Damage`; break
            case 322: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have No Block,\nGain ${effect[1]} Energy`; break
            case 323: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 324: string+=`Add a Shiv\nto Hand\nFor Each One\nYou Already Have`; break
            case 325: string+=`Add ${effect[0]!=1?effect[0]:``}X Shivs${effect[0]!=round(effect[0])?`\n(Rounded Up)`:``}\nto Hand`; break
            case 326: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 327: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage${target[2]>1?`\nAdvance`:``}`; break
            case 328: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nin Any Direction`; break
            case 329: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiagonally`; break
            case 330: string+=`Move to\nEnd of Board\nMax Range of ${effect[0]} Tile${pl(effect[0])}`; break
            case 331: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 332: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nHorizontally Only`; break
            case 333: string+=`Swap With a Target\nat Range 1-2\nTarget Will Face User`; break
            case 334: string+=`Gain ${effect[0]} Energy and\nDraw ${effect[1]} Less Card${pl(effect[1])}\nEvery Turn`; break
            case 335: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nNext Turn`; break
            case 336: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nRange 1-2`; break
            case 337: string+='Put an Attack\nFrom Your Draw\nPile Into\nYour Hand'; break
            case 338: string+='Put a Defense\nFrom Your Draw\nPile Into\nYour Hand'; break
            case 339: string+='Put a Movement\nFrom Your Draw\nPile Into\nYour Hand'; break
            case 340: string+='Put a Power\nFrom Your Draw\nPile Into\nYour Hand'; break
            case 341: string+=`Enemies Move\nToward Point`; break
            case 342: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy`; break
            case 343: string+=`Shuffle Any ${effect[0]} Random\nAttack${pl(effect[0])} Into\nYour Draw\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 344: string+=`Shuffle Any ${effect[0]} Random\nDefense${pl(effect[0])} Into\nYour Draw\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 345: string+=`Deal Damage Equal to\nNumber of Cards in\nYour Deck${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].deck.cards.length})`:``}`; break
            case 346: string+=`Add ${effect[0]}X Random\nColorless Cards\nto Hand`; break
            case 347: string+=`When an Enemy is\nDebuffed on Your Turn,\nDeal ${this.calculateEffect(effect[0],0)} Damage to it`; break
            case 348: string+=`Target Rotates\n180 Degrees`; break
            case 349: string+=`Heal All Health`; break
            case 350: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nGain ${effect[1]} Strength\nGain ${effect[2]} Dexterity`; break
            case 351: string+=`Ally Adds Any\n${effect[0]} Random Card${pl(effect[0])}`; break
            case 352: string+=`Add to Ally's Hand:\nStrike Aid\nDefend Aid\nStep Aid`; break
            case 353: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nAround Ally`; break
            case 354: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Push 1\nTile Left`; break
            case 355: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Push 1\nTile Right`; break
            case 356: string+=`Push 1 Tile Left\nin All Directions`; break
            case 357: string+=`Push 1 Tile Right\nin All Directions`; break
            case 358: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPierces Up to 2 Targets`; break
            case 359: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Temporary\nSpeed Down ${effect[1]}`; break
            case 360: string+=`Gain ${effect[0]} Max Health`; break
            case 361: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Health`; break
            case 362: string+=`Remove All Fatigues\nLose ${effect[0]} Health Each`; break
            case 363: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 364: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nLose ${effect[1]}X Health`; break
            case 365: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nLose ${effect[1]}X Health`; break
            case 366: string+=`All Existing Fatigues\nare Ethereal`; break
            case 367: string+=`Move All Fatigues\nto Hand`; break
            case 368: string+=`Advance to Range 2`; break
            case 369: string+=`Gain ${effect[0]} Regeneration`; break
            case 370: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nWhen You Deal Damage`; break
            case 371: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nBelow 50% Health:\nDeals Double Damage`; break
            case 372: string+=`Gain ${effect[0]} Energy\nPer Turn\nAll Cards Cost\n${effect[1]} Health to Play`; break
            case 373: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Max Health`; break
            case 374: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nWhen Drawn,\nMake ${effect[1]} Cop${effect[1]!=1?`ies`:`y`}`; break
            case 375: string+=`Move Between ${effect[0]}\nand ${effect[1]} Tile${pl(effect[0])}`; break
            case 376: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFor Every ${effect[1]}\nHealth You Have`; break
            case 377: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number\nof Fatigues`; break
            case 378: string+=`Lose 10% Health\nDeal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Health Lost`; break
            case 379: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nExhausted Fatigues`; break
            case 380: string+=`Gain ${effect[0]} Strength\nLose ${effect[1]} Max Health`; break
            case 381: string+=`For the Rest\nof Combat, Take\n40% Less Damage`; break
            case 382: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply 1 Confusion`; break
            case 383: string+=`Move to Scythe\nUp to ${effect[0]} Tile${pl(effect[0])} Away`; break
            case 384: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nDiscard ${effect[2]} Card${pl(effect[2])}`; break
            case 385: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Balance`; break
            case 386: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n${effect[1]} Balance`; break
            case 387: string+=`Set Balance to 0`; break
            case 388: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Balance\nSet Balance to 0`; break
            case 389: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Balance\nSet Balance to 0`; break
            case 390: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[1]} Balance`; break
            case 391: string+=`Heal ${this.calculateEffect(effect[0],9)} Health\nWhere X = Balance\nSet Balance to 0`; break
            case 392: string+=`Gain ${effect[0]} Intangible\n${effect[1]} Balance`; break
            case 393: string+=`Gain ${effect[0]} Dexterity\nDraw ${effect[1]} Card${pl(effect[1])}\n${effect[2]} Balance`; break
            case 394: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\n${effect[1]} Balance`; break
            case 395: string+=`Apply ${effect[0]} Bleed\nin All Directions`; break
            case 396: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRearm From\nAdjacent Tiles`; break
            case 397: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n${effect[1]} Balance`; break
            case 398: string+=`Tick Statuses\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 399: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDisarm`; break
            case 400: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\n${effect[1]} Balance`; break
            case 401: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nAdvance`; break
            case 402: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal Health Equal\nto Target's Bleed`; break
            case 403: string+=`Attacks This Turn\nApply ${effect[0]} Bleed`; break
            case 404: string+=`Next Attack\nApplies ${effect[0]} Bleed`; break
            case 405: string+=`Attacks This Combat\nApply ${effect[0]} Bleed`; break
            case 406: string+=`Gain ${effect[0]} Bleed\nGain ${effect[1]} Strength`; break
            case 407: string+=`Multiply All\nBleed by ${effect[0]}`; break
            case 408: string+=`Multiply Target\nBleed by ${effect[0]}`; break
            case 409: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Weak`; break
            case 410: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Confusion`; break
            case 411: string+=`Draw ${effect[0]} More\nCard${pl(effect[0])} Per Turn\n${effect[1]} Balance`; break
            case 412: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nDisarm`; break
            case 413: string+=`Apply ${effect[0]} Bleed\nDisarm`; break
            case 414: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen an Attack is Played\n${effect[1]} Balance`; break
            case 415: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen a Defense is Played`; break
            case 416: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 1 Less\nWhen an Attack is Played`; break
            case 417: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Confusion\n${effect[2]} Balance`; break
            case 418: string+=`When an Enemy Dies,\nHeal ${this.calculateEffect(effect[0],4)} Health`; break
            case 419: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Hand Size\nExhaust Your Hand`; break
            case 420: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nHeal ${this.calculateEffect(effect[0],4)} Health Each`; break
            case 421: string+=`Rearm From Anywhere`; break
            case 422: string+=`Balance Has No Effect`; break
            case 423: string+=`Breaking Balance\nGives 1 Energy`; break
            case 424: string+=`Existing Cards\nNo Longer\nRequire Armament`; break
            case 425: string+=`Apply ${effect[0]} Confusion\nto All Enemies`; break
            case 426: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} Dexterity\nDisarm as\nNon-Reusable`; break
            case 427: string+=`If Unarmed\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Confusion\nApply ${effect[2]} Vulnerable`; break
            case 428: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} 3 Times`; break
            case 429: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Winded\nto Discard Pile`; break
            case 430: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Block\nFor ${effect[1]} Turn${pl(effect[1])}\n${effect[2]} Balance`; break
            case 431: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nRearm From\nAdjacent Tiles`; break
            case 432: case 435:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDisarm on Own Tile`; break
            case 433: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Defend,\nReduce Block by ${effect[1]}`; break
            case 434: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nIf Targets Will Attack,\nReduce Damage by ${effect[1]}`; break
            case 436: string+=`${effect[0]>0?`Apply ${effect[0]} Bleed\n`:`\n`}Push 1 Tile`; break
            case 437: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDisarm as\nNon-Reusable`; break
            case 438: string+=`Pull Target Until Adjacent\nTarget Will Face Away\nApply ${effect[0]} Confusion`; break
            case 439: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPer Turn When Armed`; break
            case 440: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Damage\nTaken Up`; break
            case 441: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nGain ${effect[2]} Bleed`; break
            case 442: string+=`Heal ${this.calculateEffect(effect[0],9)} Health\nWhere X = Self Bleed\nRemove All Self Bleed`; break
            case 443: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nReduce Balance\nLimit by ${effect[1]}`; break
            case 444: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Fury of\nEquivalent Level With\n-1 Damage to Hand\n${effect[1]} Balance`; break
            case 445: string+=`Gain ${effect[0]!=1?effect[0]:``}X Strength\nWhere X = Balance\nSet Balance to 0`; break
            case 446: string+=`Gain ${effect[0]!=1?effect[0]:``}X Dexterity\nWhere X = Balance\nSet Balance to 0`; break
            case 447: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nto All Enemies`; break
            case 448: string+=`Pass Through an\nAdjacent Target\nApply ${effect[0]} Bleed`; break
            case 449: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRearm From Target Tile`; break
            case 450: string+=`Double Balance`; break
            case 451: string+=`Draw ${effect[0]} More\nCard${pl(effect[0])} Next Turn`; break
            case 452: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Dazed\nto Draw`; break
            case 453: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\n3 Tiles Wide`; break
            case 454: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen You Take Damage`; break
            case 455: string+=`When You Heal,\nGain ${effect[0]} Max Health`; break
            case 456: string+=`Remove All\nNon-Temporary Items\nGain ${effect[0]} Max Health Each`; break
            case 458: string+=`Pass Through an\nAdjacent Target\nand Add a Chain\nShift to Hand\nor\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 459: string+=`Push 2 Tiles\nin All Directions`; break
            case 460: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Health\nAdd a Pain\nStrike to Hand`; break
            case 461: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nLose ${effect[1]} Health\nAdd a Pain\nDefend to Hand`; break
            case 462: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove ${effect[1]} Fatigue${pl(effect[1])}`; break
            case 463: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRemove ${effect[1]} Fatigue${pl(effect[1])}`; break
            case 464: string+=`Move in a L Shape`; break
            case 465: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Left`; break
            case 466: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Right`; break
            case 467: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Hard Left`; break
            case 468: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Hard Right`; break
            case 469: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHorizontally Only`; break
            case 470: string+=`Gain ${effect[0]}X Max Health`; break
            case 471: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nTargets Will Face\nAway and Attack`; break
            case 472: string+=`Create 1 Plant Tile`; break
            case 473: string+=`Deal ${effect[0]} Damage\nto All Combatants\non Plant Tiles`; break
            case 474: string+=`Create 7 Plant Tiles\nin a Circle`; break
            case 475: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Used on a Plant Tile`; break
            case 476: string+=`Heal ${effect[0]} Health\nto All Combatants\non Plant Tiles`; break
            case 477: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number\nof Plant Tiles`; break
            case 478: string+=`Randomly Rotate\nTargets on Plant Tiles`; break
            case 479: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto a Target on\na Plant Tile`; break
            case 480: string+=`Apply ${effect[0]} Strength\nApply ${effect[1]} Dexterity\nto All Combatants\non Plant Tiles`; break
            case 481: string+=`Apply ${effect[0]} Poison\nto All Combatants\non Plant Tiles`; break
            case 482: string+=`Create a Row of Up\nto 6 Plant Tiles`; break
            case 483: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash\nDamage Around Self\nDie`; break
            case 484: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCannot Move\nStraight Right`; break
            case 485: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCannot Move\nStraight Left`; break
            case 486: string+=`Move to Any\nEmpty Plant Tile`; break
            case 487: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nAdvance`; break
            case 488: string+=`Gain ${effect[0]} Combo\nAdd ${effect[1]} Random\nCombo Costing Card${pl(effect[1])}\nto Hand`; break
            case 490: string+=`Hold ${effect[0]} Basic Orb${pl(effect[0])}`; break
            case 491: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}`; break
            case 492: string+=`Hold ${effect[0]} Shield Orb${pl(effect[0])}`; break
            case 493: string+=`Hold ${effect[0]} Explosive Orb${pl(effect[0])}`; break
            case 494: string+=`Evoke All Orbs`; break
            case 495: string+=`Hold ${effect[0]} Energy Orb${pl(effect[0])}`; break
            case 496: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable`; break
            case 497: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nClaw Up ${effect[1]}`; break
            case 498: string+=`Hold ${effect[0]} Basic Orb${pl(effect[0])}\nClaw Up ${effect[1]}`; break
            case 499: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nClaw Up ${effect[1]}`; break
            case 500: string+=`Claw Up ${effect[0]}`; break
            case 501: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nClaw Up ${effect[1]}`; break
            case 502: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nClaw Up ${effect[1]}`; break
            case 503: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nClaw Up ${effect[1]}`; break
            case 504: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nClaw Up ${effect[1]}\nAdvance`; break
            case 505: string+=`Hold ${effect[0]} Dark Orb${pl(effect[0])}`; break
            case 506: string+=`Hold ${effect[0]} Lightning Orb${pl(effect[0])}`; break
            case 507: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Energy\nClaw Up ${effect[2]}`; break
            case 508: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Basic Orb${pl(effect[1])}`; break
            case 509: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Shield Orb${pl(effect[1])}`; break
            case 510: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Orbs`; break
            case 511: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]!=1?effect[1]:``}X Cards\nWhere X = Number\nof Unique Orbs`; break
            case 512: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nHold ${effect[1]} Shield Orb${pl(effect[1])}`; break
            case 513: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPut a Card in Discard\nPile in Your Hand`; break
            case 514: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Card Played\nReturns to the\nTop of Draw Pile`; break
            case 515: string+=`Add Block Equal\nto Number of Cards\nin Discard ${effect[0]>0?`+${effect[0]}`:``}`; break
            case 516: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 517: string+=`Gain ${effect[0]} Energy\nAdd a Void\nto Discard Pile`; break
            case 518: string+=`Gain ${effect[0]} Energy\nFor Every ${effect[1]} Cards\nin Draw Pile`; break
            case 519: string+=`Gain ${effect[0]} Focus`; break
            case 520: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nHold ${effect[1]} Dark Orb${pl(effect[1])}`; break
            case 521: string+=`Double ${variants.mtg?`Existing Mana`:`Your Energy`}`; break
            case 522: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Your Hand\nThis Turn`; break
            case 523: string+=`When You Play a Power,\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 524: string+=`Each Turn,\nAdd ${effect[0]} Random Power${pl(effect[0])}\nto Hand`; break
            case 525: string+=`Lose ${effect[0]} Focus\nGain ${effect[1]} Strength\nGain ${effect[2]} Dexterity`; break
            case 526: string+=`Hold X Basic OrbS`; break
            case 527: string+=`Add ${effect[0]} Random\nPower${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 528: string+=`When You Play a Power,\nHold ${effect[0]} Basic Orb${pl(effect[0])}`; break
            case 529: string+=`When You Take Damage,\nHold ${effect[0]} Basic Orb${pl(effect[0])}`; break
            case 530: string+=`Each Turn, Add ${effect[0]}\nRandom Common Card${pl(effect[0])}\nto Hand`; break
            case 531: string+=`Remove All Orbs\nGain 1 Energy\nand Draw 1\nCard Each`; break
            case 532: string+=`Evoke All Orbs\nGain 1 Energy\nand Draw 1\nCard Each`; break
            case 533: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Focus`; break
            case 534: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Energy Orb${pl(effect[1])}`; break
            case 535: string+=`Evoke First Orb ${effect[0]!=1?`${effect[0]}`:``}X Time${pl(effect[0])}`; break
            case 536: string+=`Hold ${effect[0]} Shield Orb${pl(effect[0])}\nHold ${effect[1]} Dark Orb${pl(effect[1])}\nHold ${effect[2]} Lightning Orb${pl(effect[2])}`; break
            case 537: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Orbs Held\nThis Combat`; break
            case 538: string+=`Apply ${effect[0]} Node`; break
            case 539: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Node`; break
            case 540: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturn All 0${variants.mtg?` Total`:``} Cost\nCards to Hand`; break
            case 541: string+=`Gain ${effect[0]} Focus\nLose ${effect[1]} Focus\nEvery Turn`; break
            case 542: string+=`Discard Your Hand\nShuffle Discard Pile\nInto Draw Pile\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 543: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 544: string+=`Hold ${effect[0]} Shield Orb${pl(effect[0])}\nFor Every Enemy`; break
            case 545: string+=`Evoke First Orb\nFor Every Enemy`; break
            case 546: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number\nof Shield Orbs\nHeld This Combat`; break
            case 547: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nHold ${effect[1]} Shield Orb${pl(effect[1])}`; break
            case 548: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMultiply Target's\nVulnerable by ${effect[1]}`; break
            case 549: string+=`Hold ${effect[0]} Random Orb${pl(effect[0])}`; break
            case 550: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nRehold it`; break
            case 551: string+=`Hold ${effect[0]} Light Orb${pl(effect[0])}`; break
            case 552: string+=`Hold ${effect[0]} Flame Orb${pl(effect[0])}`; break
            case 553: string+=`Hold ${effect[0]} Ice Orb${pl(effect[0])}`; break
            case 554: string+=`Hold ${effect[0]} Buff Orb${pl(effect[0])}`; break
            case 555: string+=`Hold ${effect[0]} Cop${effect[0]!=1?`ies`:`y`}\nof the Last Orb`; break
            case 556: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nRehold it ${effect[1]} Time${pl(effect[1])}`; break
            case 557: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nHold ${effect[1]} Lightning Orb${pl(effect[1])}`; break
            case 558: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Light Orb${pl(effect[1])}`; break
            case 559: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Flame Orb${pl(effect[1])}`; break
            case 560: string+=`Hold ${effect[0]} Flame Orb${pl(effect[0])}\nHold ${effect[1]} Energy Orb${pl(effect[1])}\nHold ${effect[2]} Ice Orb${pl(effect[2])}`; break
            case 561: string+=`Replace Basic Orbs\nWith Explosive Orbs`; break
            case 562: string+=`Replace Basic Orbs\nWith Dark Orbs`; break
            case 563: string+=`Replace Basic Orbs\nWith Light Orbs`; break
            case 564: string+=`Hold ${effect[0]} Basic Orb${pl(effect[0])}\nand Evoke 1`; break
            case 565: string+=`Minor Evoke\nAll Orbs`; break
            case 566: string+=`Alternate Evoke\nAll Shield Orbs`; break
            case 567: string+=`Alternate Evoke\nAll Explosive Orbs`; break
            case 568: string+=`Alternate Evoke\nAll Buff Orbs`; break
            case 569: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nEvoke All Orbs\non Target`; break
            case 570: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nHold ${effect[1]} Basic Orb${pl(effect[1])}`; break
            case 571: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nHold ${effect[1]} Explosive Orb${pl(effect[1])}`; break
            case 572: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nOrthogonally or\n${effect[1]} Tile${pl(effect[1])}\nDiagonally`; break
            case 573: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd a Step\nNext Turn`; break
            case 574: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nEvoke First Orb\non Self ${effect[1]} Time${pl(effect[1])}`; break
            case 575: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nRemove All Orbs`; break
            case 576: string+=`Push 1 Tile\nin All Directions\nHold ${effect[0]} Ice Orb${pl(effect[0])}`; break
            case 577: string+=`Hold ${effect[0]} Nerf Orb${pl(effect[0])}`; break
            case 578: string+=`Hold ${effect[0]} Poison Orb${pl(effect[0])}`; break
            case 579: string+=`Alternate Evoke\nAll Nerf Orbs`; break
            case 580: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Buff Orb${pl(effect[1])}`; break
            case 581: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Nerf Orb${pl(effect[1])}`; break
            case 582: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nHold ${effect[1]} Poison Orb${pl(effect[1])}`; break
            case 583: string+=`Hold ${effect[0]} Buff Orb${pl(effect[0])}\nHold ${effect[1]} Poison Orb${pl(effect[1])}\nHold ${effect[2]} Light Orb${pl(effect[2])}`; break
            case 584: string+=`Hold ${effect[0]} Lightning Orb${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],3)} Block\nWhere X = Number\nOf Lightning Orbs`; break
            case 585: string+=`Build a Wall`; break
            case 586: string+=`Gain ${effect[0]} Metal`; break
            case 587: string+=`Destroy a Construct`; break
            case 588: string+=`Heal ${effect[0]} Health\nto Construct`; break
            case 589: string+=`Add ${effect[0]} Block\nto Construct`; break
            case 591: string+=`Deal ${this.calculateEffect(effect[0],0)}-${this.calculateEffect(effect[1],11)} Damage\nWhere X = (Range-1)`; break
            case 592: string+=`Remove All\nEnemy Strength\nApply ${effect[0]} Weak`; break
            case 593: string+=`Deal ${this.calculateEffect(effect[0],0)}-${this.calculateEffect(effect[1],11)} Damage\nWhere X = (Range-1)\nIf Fatal,\nGain ${effect[2]} Energy`; break
            case 595: string+=`Exhaust All\nBlueprints in Hand\nGain ${effect[0]} Energy Each`; break
            case 596: string+=`Construct Gains\n${effect[0]} Max Health`; break
            case 597: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jagged Bleed`; break
            case 598: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jagged Bleed\n3 Times`; break
            case 599: string+=`Apply ${effect[0]} Jagged Bleed`; break
            case 600: string+=`Deal Splash Damage\nEqual to Target\nConstruct Health`; break
            case 601: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 602: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 603: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 604: string+=`Construct Gains\n${effect[0]} Regeneration`; break
            case 605: string+=`Choose Between\n${effect[0]} Blueprint${pl(effect[0])} to\nAdd to Hand`; break
            case 606: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nApply ${effect[1]} Vulnerable`; break
            case 607: string+=`Draw and Upgrade\n${effect[0]} Card${pl(effect[0])}`; break
            case 608: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nBecome Confused`; break
            case 609: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove ${effect[1]} Temporary\nStrength`; break
            case 610: string+=`Construct Gains\n${effect[0]} Armor`; break
            case 611: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTo All Targets`; break
            case 612: string+=`Discard and\nUpgrade Your Hand\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 613: string+=`Add ${effect[0]} Random\nCard${pl(effect[0])} to Hand\nSkewed Odds`; break
            case 614: string+=`Add ${effect[0]} Random\nDefense${pl(effect[0])} to Hand\nSkewed Odds`; break
            case 615: string+=`Add ${effect[0]} Random\nBlueprint${pl(effect[0])} to Hand`; break
            case 616: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 617: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDraw ${effect[1]} Card${pl(effect[1])}\nCaseu Target to Face\nAway and Attack`; break
            case 618: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDraw ${effect[1]} Card${pl(effect[1])}\nApply ${effect[2]} Frail`; break
            case 619: string+=`Gain ${effect[0]} Metal\nIncreases by ${effect[1]}`; break
            case 620: string+=`Build a Spike Pillar`; break
            case 621: string+=`Build a Projector`; break
            case 622: string+=`Build a Turret`; break
            case 623: string+=`Build a Readout`; break
            case 624: string+=`Build a Strengthener`; break
            case 625: string+=`Gain ${effect[0]} Metal\nDraw ${effect[1]} Card${pl(effect[1])}`; break
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
            case 638: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTransform ${effect[1]} Card${pl(effect[1])}`; break
            case 639: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${effect[1]} Times\nMore Damage\nIf Target Has Block`; break
            case 640: string+=`Draw Cards Equal\nto Hand Size${effect[0]>0?`+${effect[0]}`:``}`; break
            case 641: string+=`Add to Hand:\nRiot Shield\nPepper Spray\nShock Baton\nUpgrade 2\nat Random`; break
            case 642: string+=`Add to Hand:\nFlamethrower\nImpact Grenade\nSafemine\nUpgrade 2\nat Random`; break
            case 643: string+=`Add to Hand:\nSubmachine\nAntitank Rocket\nResupply\nUpgrade 2\nat Random`; break
            case 644: string+=`Gain ${effect[0]} Combo\nGain ${effect[1]} Energy\nNext Turn\nGain ${effect[2]} Combo\nNext Turn`; break
            case 645: string+=`Gain ${effect[0]} Energy\nNext Turn\nDraw ${effect[1]} Card${pl(effect[1])}\nNext Turn`; break
            case 646: string+=`Each Hit Gains\n${effect[0]} More Combo\nGain ${effect[1]} Combo`; break
            case 647: string+=`Gain ${effect[0]} Combo\nWhen You Add Block\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 648: string+=`Gain ${effect[0]} Combo\nPer Turn\nGain ${effect[1]} Combo`; break
            case 649: string+=`Gain Strength\nPer ${effect[0]} Combo\nEnd Combo\nGain ${effect[1]} Combo`; break
            case 650: string+=`Swap With an\nAdjacent Target\nor\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 651: string+=`Advance\nRange ${target[1]}-${target[2]}\nor\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 652: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nin All Directions`; break
            case 653: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile Left\nin All Directions`; break
            case 654: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile Right\nin All Directions`; break
            case 655: string+=`Remove ${effect[0]} Fatigue${pl(effect[0])}\nAll Fatigues\nare Ethereal`; break
            case 656: string+=`Remove ${effect[0]} Fatigue${pl(effect[0])}\nMove All Fatigues\nto Hand`; break
            case 657: string+=`Advance to Range 2\nRange ${target[1]}-${target[2]}\nor\nMove ${effect[1]} Tile${pl(effect[1])}`; break
            case 658: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 2 Tiles\nin All Directions`; break
            case 659: string+=`Gain ${effect[0]}X+${effect[1]} Max Health`; break
            case 660: string+=`Move to Any\nEmpty Plant Tile\nor Create One`; break
            case 661: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target Has Bleed\nApply ${effect[1]} Bleed`; break
            case 663: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Dodge\nAdd ${this.calculateEffect(effect[2],1)} Block`; break
            case 664: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLose All Block\nExcept ${effect[1]}`; break
            case 665: string+=`End Your Turn\nGain X${effect[0]!=0?`+${effect[0]}`:``} Energy\nand ${effect[1]} Temporary Strength\nNext Turn`; break
            case 666: string+=`Move to Scythe\nUp to ${effect[0]} Tile${pl(effect[0])} Away\nor\nMove ${effect[1]} Tile${pl(effect[1])}`; break
            case 667: string+=`Apply ${effect[0]} Random Debuff\nApply ${effect[1]} Random Debuff`; break
            case 668: string+=`When You Take Damage,\nAdd ${effect[0]} Shiv${pl(effect[0])}\nto Hand\nAdd ${effect[1]} Shivs\nto Hand`; break
            case 669: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Random Debuff\nApply ${effect[2]} Random Debuff`; break
            case 670: string+=`Add ${effect[0]}X+${effect[1]} Shivs\nto Hand`; break
            case 671: string+=`Hold X${effect[0]!=0?`+${effect[0]}`:``} Basic Orbs`; break
            case 672: string+=`Evoke First Orb ${effect[0]!=1?`${effect[0]}`:``}X${effect[1]>0?`+${effect[1]}`:``} Time${pl(effect[0])}`; break
            case 673: string+=`Hold ${effect[0]} Basic Orb${pl(effect[0])}\nand Evoke ${effect[1]}`; break
            case 674: string+=`Move to Any Tile\nSwap With its\nOccupants`; break
            case 675: string+=`Add ${effect[0]}X+${effect[1]} Random\nColorless Cards\nto Hand`; break
            case 676: string+=`Destroy a Construct\nReturn ${effect[0]} Metal`; break
            case 677: string+=`Heal All Health\nto Construct`; break
            case 678: string+=`Construct Takes\nAn Extra Turn`; break
            case 679: string+=`Construct Gains\n${effect[0]} Ethereal`; break
            case 680: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 681: string+=`Transform ${effect[0]} Card${pl(effect[0])}`; break
            case 682: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTransform ${effect[1]} Card${pl(effect[1])}`; break
            case 683: string+=`Destroy a Construct\nReturn Used Metal`; break
            case 684: string+=`Gain ${effect[0]} Metal\nGain ${effect[1]} Less Per\nBuilt Construct`; break
            case 685: string+=`Build a Miniturret`; break
            case 686: string+=`Build a Metal Box`; break
            case 687: string+=`Build an Upgrader`; break
            case 688: string+=`Build a Transformer`; break
            case 689: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Metal`; break
            case 690: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Metal`; break
            case 691: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nConstructs Attack Target`; break
            case 692: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Metal`; break
            case 693: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpward or Horizontally`; break
            case 694: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDownward or Horizontally`; break
            case 695: string+=`Build a Doubler`; break
            case 696: string+=`Build an Exhauster`; break
            case 697: string+=`Deal ${this.calculateEffect(effect[1],0)} Damage\nTarget Moves in a\nRandom Direction ${effect[0]} Times`; break
            case 698: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nDiscard ${effect[1]}\nRandom Card`; break
            case 699: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Metal`; break
            case 700: string+=`Build a Teleporter Start`; break
            case 701: string+=`Build a Teleporter End`; break
            case 702: string+=`Add a Proxy\nTeleport to Hand\nDestroys Teleporter Used`; break
            case 703: string+=`Teleport to Teleporter\nDestroys Teleporter Used`; break
            case 704: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nReturn ${effect[1]} Gun${pl(effect[1])}\nFrom Discard to Hand`; break
            case 705: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nRemove Effects on\nTarget Tile`; break
            case 706: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 707: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nor Diagonally Vertically`; break
            case 708: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nor Diagonally Top\nRight or Bottom Left`; break
            case 709: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nor Diagonally Top\nLeft or Bottom Right`; break
            case 710: string+=`Destroy a Construct\nReturn Blueprint`; break
            case 711: string+=`Gain ${effect[0]} Metal\nGain ${effect[1]} Buffer`; break
            case 712: string+=`Gain Metal Equal\nto the Cost of the\nMost Expensive Blueprint\nin Your Hand${effect[0]>0?`+${effect[0]}`:``}\nMinimum 1`; break
            case 713: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nGain ${effect[1]} Metal`; break
            case 714: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 715: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSwap Attack Intents`; break
            case 716: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nSwap Defense Intents`; break
            case 717: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Random\nBlueprint${pl(effect[1])} to Hand`; break
            case 718: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Destroyed\nConstructs${effect[1]!=0?` +${effect[1]}`:``}${this.player>=0&&this.player<this.battle.players?` (${this.battle.combatantManager.numberAbstract(0,[])+this.effect[1]})`:``}`; break
            case 719: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nApply ${effect[1]!=1?`${effect[1]}`:``}X Weak\nApply ${effect[2]!=1?`${effect[2]}`:``}X Vulnerable`; break
            case 720: string+=`Apply ${effect[0]} Weak\nNext Turn`; break
            case 721: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnter Wrath`; break
            case 722: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nEnter Calm`; break
            case 723: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnter Haste`; break
            case 724: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nEnter Sturdy`; break
            case 725: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExit Stance`; break
            case 726: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExit Stance`; break
            case 727: string+=`Move ${effect[0]} Tile${pl(effect[0])} or\n${effect[1]} Tile${pl(effect[1])} Toward an Enemy`; break
            case 728: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nExit Stance`; break
            case 730: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nEnter Wrath`; break
            case 731: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nEnter Calm`; break
            case 732: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nEnter Haste`; break
            case 733: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nEnter Sturdy`; break
            case 734: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Enemies`; break
            case 735: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nShuffle an Insight\nInto Draw Pile`; break
            case 736: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturn on Stance Change`; break
            case 737: string+=`Add ${effect[0]} Smite${pl(effect[0])}\nto Hand\nEvery Turn`; break
            case 738: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds ${effect[1]} Times More\nWhen in Wrath`; break
            case 739: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nEnd Turn`; break
            case 740: string+=`Enter Wrath`; break
            case 741: string+=`Enter Calm`; break
            case 742: string+=`Enter Haste`; break
            case 743: string+=`Enter Sturdy`; break
            case 744: string+=`Gain ${effect[0]} Faith`; break
            case 745: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Safety\nto Hand`; break
            case 746: string+=`Wrath:\nApply ${effect[0]} Weak\nElse: Enter Wrath`; break
            case 747: string+=`Calm:\nDraw ${effect[0]} Card${pl(effect[0])}\nElse: Enter Calm`; break
            case 748: string+=`Put a Card in Discard\nPile in Your Hand\nEnter Calm\nEnd Turn`; break
            case 749: string+=`Put a Card in Discard\nPile in Your Hand\nEnter Calm\nEnd Turn\nGain ${effect[0]} Energy\nNext Turn`; break
            case 750: string+=`Haste:\nMove ${effect[0]} Tile${pl(effect[0])}\nElse: Enter Haste`; break
            case 751: string+=`Sturdy: Apply ${effect[0]} Frail\nand Gain ${effect[1]} Dexterity\nElse: Enter Sturdy`; break
            case 752: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nNext Turn\nEnter Sturdy\nEnd Turn`; break
            case 753: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nNext Turn\nEnter Sturdy\nEnd Turn\nGain ${effect[1]} Energy\nNext Turn`; break
            case 754: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen You\nChange Stance`; break
            case 755: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nWhen You\nChange Stance`; break
            case 756: string+=`Gain ${effect[0]} Faith\nShuffle an Insight\nInto Draw Pile`; break
            case 757: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less Temporarily\nWhen Retained`; break
            case 758: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd Block Equal to\nTarget's Health Lost`; break
            case 759: string+=`Gain ${effect[0]} Faith\nGain ${effect[1]} Strength`; break
            case 760: string+=`Next Attack Deals\n${effect[0]} More Damage`; break
            case 761: string+=`Gain ${effect[0]} Faith\nLose ${effect[1]} Health\nNext Turn`; break
            case 762: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nEnter Wrath`; break
            case 763: string+=`Gain ${effect[0]} Dodge\nEnter Calm`; break
            case 764: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nEnter Haste`; break
            case 765: string+=`Gain ${effect[0]} Armor\nEnter Sturdy`; break
            case 766: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],12)}\nDamage`; break
            case 767: string+=`Add ${effect[0]} Miracle${pl(effect[0])}\nto Hand`; break
            case 768: string+=`Gain ${effect[0]} Faith\nPer Turn`; break
            case 769: string+=`Add Block Equal to\nNumber of Cards in\nYour Deck${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].deck.cards.length})`:``}`; break
            case 770: string+=`Gain ${effect[0]} Faith\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 771: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Smite\nto Hand`; break
            case 772: string+=`Add a Miracle to Your\nHand For X Turns\nGain ${effect[0]} Energy`; break
            case 773: string+=`Add an Upgraded\nMiracle to Your\nHand For X Turns\nGain ${effect[0]} Energy`; break
            case 774: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} Dexterity\nLose ${effect[2]} Energy\nPer Turn`; break
            case 775: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Retained`; break
            case 776: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]}\nWhen Retained`; break
            case 777: string+=`Choose Any Attack to Add\nto Hand`; break
            case 778: string+=`Choose Any Attack to Add\nto Hand\nIt Costs 0`; break
            case 779: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nShuffle a End Up\nInto Draw`; break
            case 780: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have\nNo Other Attacks\nin Hand`; break
            case 781: string+=`Next Turn,\nDraw ${effect[0]} Card${pl(effect[0])}\nand Enter Wrath`; break
            case 782: string+=`Shuffle ${effect[0]} Insight${pl(effect[0])}\nInto Draw Pile\nEach Turn`; break
            case 783: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext Attack is Free`; break
            case 784: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Target is Hit,\nAttacker Gains ${effect[1]} Block`; break
            case 785: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash\nDamage ${effect[1]} Time${pl(effect[1])}`; break
            case 786: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Upgrade\na Card Permanently`; break
            case 787: string+=`If Target Has\nLess Than ${effect[0]} Health,\nIt Dies`; break
            case 788: string+=`Gain ${effect[0]} Energy\nPer Turn Per Turn`; break
            case 789: string+=`When a Card is Retained,\nReduce its Cost by ${effect[0]}`; break
            case 790: string+=`Shuffle a Beta\nInto Draw`; break
            case 791: string+=`Shuffle an Omega\nInto Draw`; break
            case 792: string+=`Shuffle an Expunger\nWith X${effect[0]>0?`+${effect[0]}`:``} Into Draw`; break
            case 793: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Time${pl(effect[1])}`; break
            case 794: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nYou Cannot Die\nThis Turn`; break
            case 795: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have\nStatus Cards or\nCurses in Hand`; break
            case 796: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Do Not Have\nStatus Cards or\nCurses in Hand`; break
            case 797: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nIt Costs 0 Temporarily\nIf Played First,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 798: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Played First,\nApply ${effect[1]} Vulnerable`; break
            case 799: string+=`Turn 4 Or Later:\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 800: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds ${effect[1]} Times More\nWhen in Calm`; break
            case 801: string+=`Target Loses Health\nEqual to Your\nMissing Health`; break
            case 802: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nEnter Wrath`; break
            case 803: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nEnter Calm`; break
            case 804: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nEnter Haste`; break
            case 805: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nEnter Sturdy`; break
            case 806: string+=`Wrath:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 807: string+=`Calm:\nGain ${effect[0]} Energy`; break
            case 808: string+=`Haste:\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 809: string+=`Sturdy: Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 810: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext ${effect[1]!=1?`${effect[1]} `:``}Time${pl(effect[1])} You\nGain Block ${effect[1]!=1?`are`:`is`} Tripled`; break
            case 811: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext ${effect[1]!=1?`${effect[1]} `:``}Damage${pl(effect[1])} Deal\nAdd${effect[1]==1?`s`:``} Equivalent Block`; break
            case 812: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nExit Stance`; break
            case 813: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nin Triangles Vertically`; break
            case 814: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nin Triangles Top\nRight or Bottom Left`; break
            case 815: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nin Triangles Top\nLeft or Bottom Right`; break
            case 816: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Faith`; break
            case 817: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCosts 0 at\nLeft of Hand`; break
            case 818: string+=`Calm:\nAdd to Hand:\nCrescendo\nForward\nStandstill`; break
            case 819: string+=`Calm:\nAdd to Hand:\nCrescendo+\nForward+\nStandstill+`; break
            case 820: string+=`Wrath:\nGain ${effect[0]} Energy`; break
            case 821: string+=`Haste:\nGain ${effect[0]} Energy`; break
            case 822: string+=`Sturdy: Gain ${effect[0]} Energy`; break
            case 823: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nMay Pass Obstructions\nEnter Haste`; break
            case 824: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPlayable in Haste`; break
            case 825: string+=`Push 1 Tile\nSturdy: Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 826: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Faith`; break
            case 827: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFatigues in\nHand Gain Quickdraw`; break
            case 828: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Max Health`; break
            case 829: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nand Retain ${effect[1]!=1?`Them`:`It`} Once`; break
            case 830: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nShuffle a Restrike\nInto Draw`; break
            case 831: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAmplify:\nAdd ${this.calculateEffect(effect[1],1)} Block\nNext Turn`; break
            case 832: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nAmplify:\nDraw ${effect[1]} More`; break
            case 833: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAmplify:\nDeal Triple Damage`; break
            case 834: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Charge`; break
            case 835: string+=`Exhuast Half of\nYour Discard\nGain 1 Energy For\nEvery ${effect[0]} Cards Exhausted`; break
            case 836: string+=`Add ${effect[0]} Cop${effect[0]!=1?`ies`:`y`} of\nthe Last Attack\nPlayed to Hand`; break
            case 837: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number\nof Burns in Hand\nAmplify:\nDeal Double Damage`; break
            case 838: string+=`When You Add Block,\nAdd ${effect[0]} Spark${pl(effect[0])} to Hand`; break
            case 839: string+=`When You Add Block,\nAdd ${effect[0]} Upgraded\nSpark${pl(effect[0])} to Hand`; break
            case 840: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSpend ${effect[1]} Charge:\nGain ${effect[2]} Energy\nDraw ${effect[3]} Card${pl(effect[3])}`; break
            case 841: string+=`Gain ${effect[0]} Charge`; break
            case 842: string+=`Gain ${effect[0]} Charge\nAmplify:\nGain ${effect[1]} More`; break
            case 843: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFor Every ${effect[1]}\nRelics You Have`; break
            case 844: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nWhen Discard is Empty`; break
            case 845: string+=`Add ${effect[0]} Dark Matter${pl(effect[0])}\nto Draw\nWhen Etherealed,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 846: string+=`Exhaust the Top ${effect[0]}\nCard${pl(effect[0])} of Your Draw\nDeal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Attacks Exhausted`; break
            case 847: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove ${effect[1]} Strength\nFrom a Random Enemy\nAmplify:\nRepeat`; break
            case 848: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Spark to Hand`; break
            case 849: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd an Upgraded\nSpark to Hand`; break
            case 850: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number\nof Exhausted Cards`; break
            case 851: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nAmplify:\nReturn ${effect[1]} Random\nCard${pl(effect[1])} to Hand\nFrom Discard`; break
            case 852: string+=`Gain ${effect[0]} Charge\nPer Turn`; break
            case 853: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Charge${effect[1]>0?`+${effect[1]}`:``}`; break
            case 854: string+=`Draw ${effect[0]} More\nCard${pl(effect[0])} Per Turn\nand Add a Burn to\nHand Per Turn`; break
            case 855: string+=`When You Amplify,\nPut a Card in Discard\nPile in Your Hand`; break
            case 856: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nAmplify 2:\nInstantly Kill Those\nWith ${effect[1]} or Less Health`; break
            case 857: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen a Spark is Played`; break
            case 858: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Charge`; break
            case 859: string+=`Add to Hand:\nInstant Wrath\nInstant Calm`; break
            case 860: string+=`Add to Hand:\nInstant Haste\nInstant Sturdy`; break
            case 861: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Burn\nto Hand`; break
            case 862: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 When\na Card is Amplified`; break
            case 863: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain 1 Energy \nPer ${effect[1]} Card${pl(effect[1])}\nin Your Deck`; break
            case 864: string+=`Add ${effect[0]} Random Card${pl(effect[0])}\nto Hand\nSkewed Odds\nPlace ${effect[1]} Card${pl(effect[1])}\non Top of Your\nDraw Pile`; break
            case 865: string+=`Deal ${this.calculateEffect(1,2)}${effect[0]!=0?`+${this.calculateEffect(effect[0],10)}`:``} Damage\nWhere X = Number\nof Cards in Hand\nAmplify:\nDeal ${this.calculateEffect(effect[1],2)} Damage Instead\nWhere X = Current Energy`; break
            case 866: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Time${pl(effect[1])}\nIncreases by ${effect[2]} Time${pl(effect[2])}`; break
            case 867: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRemove a\nRandom Debuff`; break
            case 868: string+=`Put a Card in Draw\nPile in Your Hand\nUpgrade It`; break
            case 869: string+=`Gain ${effect[0]} Energy\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 870: string+=`Add X Random\nAttacks to Hand\nThey Cost 0 and\nHave Exhaust`; break
            case 871: string+=`Add X Random Upgraded\nAttacks to Hand\nThey Cost 0 and\nHave Exhaust`; break
            case 872: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAmplify: Deal ${this.calculateEffect(effect[1],10)} More`; break
            case 873: string+=`Convert Charge to Energy`; break
            case 874: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Time${pl(effect[1])}\nExhaust ${effect[2]} Card${pl(effect[2])}`; break
            case 875: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nGain ${effect[2]} Temporary\nStrength`; break
            case 876: string+=`All Amplifying is\nFree This Combat`; break
            case 877: string+=`Add a Random\nAttack to Hand\nDeal Damage Equal\nto its Effect`; break
            case 878: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[1],0)} Splash Damage\nAround Self`; break
            case 879: string+=`Discard Draw Pile\nAdd Block Equal\nto Number of\nCards Discarded${effect[0]>0?`+${effect[0]}`:``}`; break
            case 880: string+=`Gain ${effect[0]} Armor\nAmplify:\nGain ${effect[1]} More`; break
            case 881: string+=`Apply ${effect[0]} Burn`; break
            case 882: string+=`Apply ${effect[0]} Burn\nin All Directions`; break
            case 883: string+=`Multiply Target\nBurn by ${effect[0]}`; break
            case 884: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nNext 2 Turns`; break
            case 885: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Energy\nNext 2 Turns`; break
            case 886: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nReturn ${effect[1]} Gun${pl(effect[1])}\nFrom Discard to Hand`; break
            case 887: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Burn`; break
            case 888: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn`; break
            case 889: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nto All Enemies`; break
            case 890: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext Turn,\nDraw ${effect[1]} Card${pl(effect[1])},\nBut You Cannot Amplify`; break
            case 891: string+=`Shuffle ${effect[0]} Random Card${pl(effect[0])}\nInto Draw\nSkewed Odds\n${effect[1]}% Upgrade Chance\nDraw ${effect[2]} Card${effect[2]?`s`:``}`; break
            case 892: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nWhen Exhausted,\nReturn Exhaust\nPile to Hand`; break
            case 893: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Charge Consumed`; break
            case 894: string+=`For All Non-Movement\nCards in Hand,\nIncrease First Numerical\nValue by ${effect[0]}`; break
            case 895: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Deals\nDouble Damage`; break
            case 896: string+=`Gain a Relic`; break
            case 897: string+=`Roll ${effect[0]} Di${effect[0]!=1?`c`:``}e and\nDeal That Much Damage`; break
            case 898: string+=`Gain ${effect[0]} Energy\nNext Turn\nAmplify:\nAmplifying is Free\nThis Turn`; break
            case 899: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSparks in Hand\nGain Effect Equal to\nTarget's Health Lost\nAmplify:\nDeal ${this.calculateEffect(effect[1],0)} Damage Instead`; break
            case 900: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain Currency Equal to\nTarget's Health Lost\nAmplify:\nGain Double Currency`; break
            case 901: string+=`When Draw Shuffled,\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 902: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove a Buff\nFrom Target\nAmplify:\nDeal ${this.calculateEffect(effect[1],0)} Damage Instead`; break
            case 903: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhaust ${effect[1]} Card${pl(effect[1])}\nAdd a Burn to Hand`; break
            case 904: string+=`All Attacks in\nHand Cost 0 Temporarily\nLose ${effect[0]} Temporary\nStrength`; break
            case 905: string+=`Apply ${effect[0]} Vulnerable\nAmplify:\nAffects All Enemies`; break
            case 906: string+=`Target Gains\nIndefinite Weak`; break
            case 907: string+=`Target Gains\nIndefinite Vulnerable`; break
            case 908: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Time${pl(effect[1])}\nAmount of Times\nIncreases by ${effect[2]}`; break
            case 909: string+=`Return Your Hand\nto Draw Pile\nAdd That Many\nRandom Cards to\nYour Hand`; break
            case 910: string+=`Return Your Hand\nto Draw Pile\nAdd That Many\nRandom Upgraded Cards\nto Hand`; break
            case 911: string+=`Exhaust Non-Attacks\nAdd That Many\nSparks to Hand`; break
            case 912: string+=`Exhaust Non-Attacks\nAdd That Many\nUpgraded Sparks to Hand`; break
            case 913: string+=`Upgrade ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Buffer`; break
            case 914: string+=`Discard Your Hand\nDraw That Many Cards\nGain ${effect[0]} Strength`; break
            case 915: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 916: string+=`Construct Takes\nX${effect[0]>0?`+${effect[0]}`:``} Extra Turns`; break
            case 917: string+=`Construct Gains\n${effect[0]} Max Health\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 918: string+=`Add ${effect[0]} Block\nto Construct\nIt Retains Block\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 919: string+=`Add ${effect[0]} Block\nto Construct\nConstruct Gains\n${effect[1]} Max Health`; break
            case 920: string+=`Construct Gains\n${effect[0]} Buffer`; break
            case 921: string+=`Add Any ${effect[0]}\nRandom Power${pl(effect[0])}\nto Hand`; break
            case 922: string+=`Transform Your Hand`; break
            case 923: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nConstructs Next to\nYou After Moving\nGain ${effect[1]} Max Health`; break
            case 924: string+=`Remove All\nBlock of Target\nApply ${effect[0]} Vulnerable`; break
            case 925: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nIf Last Card\nis an Attack,\nGain ${effect[2]} Strength`; break
            case 926: string+=`Apply ${effect[0]} Distracted`; break
            case 927: string+=`Add ${effect[0]} Scrap Metal${pl(effect[0])}\nto Hand`; break
            case 928: string+=`Next ${effect[0]} Hit${pl(effect[0])} Taken\nHeal${effect[0]==1?`s`:``} You Instead`; break
            case 929: string+=`Retain ${effect[0]} Card${pl(effect[0])}\nUntil ${effect[0]!=1?`They Are`:`it is`} Played`; break
            case 930: string+=`50%: Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Add ${this.calculateEffect(effect[1],1)} Block`; break
            case 931: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n50%: Move 1 Extra Tile`; break
            case 932: string+=`Existing Burns are\nEthereal, Give ${effect[0]} Strength,\nand Deal No Damage`; break
            case 933: string+=`When Drawn,\nGain ${effect[0]} Energy\nWhen Exhausted,\nDeal ${this.calculateEffect(effect[1],0)} Damage\nto a Random Enemy`; break
            case 934: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal on an\nElite or Boss Combat,\nGain a Relic`; break
            case 935: string+=`Constructs Face Target`; break
            case 936: string+=`Create ${effect[0]} Metal Tile${pl(effect[0])}\nin Random Locations`; break
            case 937: string+=`Gain ${effect[0]} Energy\nGain ${effect[1]} Charge\nBoth Increase by ${effect[2]}`; break
            case 938: string+=`Deal ${this.calculateEffect(effect[0],0)}-${this.calculateEffect(effect[1],0)} Damage\n${effect[2]} Time${pl(effect[2])}`; break
            case 939: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Charge`; break
            case 940: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Burn to Hand`; break
            case 941: string+=`Gain ${effect[0]} Currency\nGain ${effect[1]} Weak`; break
            case 942: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain Armor Equal to\nHalf of Target's\nHealth Lost`; break
            case 943: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd to Hand:\nSpark\nRising Sweep\nLeyline`; break
            case 944: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd to Hand:\nSpark\nRising Sweep\nLeyline\nand Upgrade Them`; break
            case 945: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCycle Bypass`; break
            case 946: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSet Energy to ${effect[1]}`; break
            case 947: string+=`Exactly 0 Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 948: string+=`50%: Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Triple Damage`; break
            case 949: string+=`Remove a Card\nPermanently`; break
            case 950: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCards in Discard\n(Including This Card)\nAdd ${effect[1]} Burn${pl(effect[1])} to Hand`; break
            case 951: string+=`Discard Any\nNumber of Cards\nAdd ${this.calculateEffect(effect[0],3)} Block Each`; break
            case 952: string+=`Choose to\nAdd to Hand:\nWhite Dwarf\nBlack Dwarf\nof Equivalent Level`; break
            case 953: string+=`Add to Hand:\nWhite Dwarf\nBlack Dwarf\nUpgrade Them`; break
            case 954: string+=`Add to Hand:\nWhite Dwarf\nBlack Dwarf\nUpgrade Them Twice`; break
            case 955: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Charge`; break
            case 956: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\non Any Combatant`; break
            case 957: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMore than or\nEqual to 3 Charge:\nDeals Double`; break
            case 958: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLess than 3 Charge:\nDeals Double`; break
            case 959: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMore than or\nEqual to 3 Charge:\nLose 3 Charge:\nLess than 3 Charge\nGain 3 Charge`; break
            case 960: string+=`Add to Hand:\nFire Ball\nWater Ball\nGrass Ball`; break
            case 961: string+=`Add to Hand:\nFire Ball\nWater Ball\nGrass Ball\nUpgrade 1\nat Random`; break
            case 962: string+=`Add to Hand:\nFire Ball\nWater Ball\nGrass Ball\nUpgrade 2\nat Random`; break
            case 963: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAmplify:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 964: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose All Charge`; break
            case 965: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSpend ${effect[1]} Charge:\nDeals Triple Damage`; break
            case 966: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Charge`; break
            case 967: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRemove ${effect[1]} Burn${pl(effect[1])}`; break
            case 968: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nAdd ${effect[1]} Burn${pl(effect[1])} to Hand`; break
            case 969: string+=`Add ${effect[0]} Spark${pl(effect[0])}\nto Hand`; break
            case 970: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nAdd ${effect[1]} Spark${pl(effect[1])}\nto Hand`; break
            case 971: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nAdd a Spark to Hand\nFor Each Enemy Hit`; break
            case 972: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAmplify: Heal Equal\nto Target's\nHealth Lost`; break
            case 973: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nDeal ${effect[1]} Damage`; break
            case 974: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nIf Target Unmoved,\nPush Again`; break
            case 975: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Control`; break
            case 976: string+=`Move to Any\nEmpty Tile\nAdd ${effect[0]} Burn${pl(effect[0])} to Hand`; break
            case 977: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Charge\nNext Turn`; break
            case 978: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Amplify is Free`; break
            case 979: string+=`Move to Any\nEmpty Tile\nDeal ${this.calculateEffect(effect[0],0)} Splash Damage`; break
            case 980: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Burns`; break
            case 981: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nAdd ${effect[1]} Burn${pl(effect[1])} to Hand`; break
            case 982: string+=`Exhaust a Random Card\nChoose a Replacement`; break
            case 983: string+=`Exhaust a Random Card\nChoose a Replacement\nUpgrade Said Replacement`; break
            case 984: string+=`Add a Random\nDefense to Hand\nEvery Turn`; break
            case 985: string+=`Add a Random\nUpgraded Defense to\nHand Every Turn`; break
            case 986: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nCan Push 2 Targets`; break
            case 987: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nGain ${effect[1]} Strength`; break
            case 988: string+=`Move to a Random\nEmpty Tile`; break
            case 989: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf Last Card Played\nWas an Attack,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 990: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf Last Card Played\nWas a Defense,\nGain ${effect[1]} Energy`; break
            case 991: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Last Card Played\nWas a Defense,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 992: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Last Card Played\nWas an Attack,\nGain ${effect[1]} Energy`; break
            case 993: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Last Card Played\nWas an Attack,\nApply ${effect[1]} Weak`; break
            case 994: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Last Card Played\nWas a Defense,\nApply ${effect[1]} Vulnerable`; break
            case 995: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf Last Card Played\nWas an Attack,\nGain ${effect[1]} Strength`; break
            case 996: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf Last Card Played\nWas a Defense,\nGain ${effect[1]} Dexterity`; break
            case 997: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Last Card Played\nWas an Attack,\nNext ${effect[1]} Damage Deal${pl(effect[1])}\n${effect[1]!=1?`are`:`is`} 50% More`; break
            case 998: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Last Card Played\nWas a Defense,\nNext ${effect[1]} Block Add${pl(effect[1])}\n${effect[1]!=1?`are`:`is`} 50% More`; break
            case 999: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Last Card Played\nWas a Movement,\nGain ${effect[1]} Energy`; break
            case 1000: string+=`Kill All Enemies`; break
            case 1001: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nTarget Will Face Away`; break
            case 1002: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCenter of Hand:\nDeals Double Damage`; break
            case 1003: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 at\nLeft of Hand`; break
            case 1004: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLefmost Card in Hand:\nDeals Double Damage`; break
            case 1005: string+=`Upgrade All Cards\nCreated This Combat`; break
            case 1006: string+=`20X%: Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1007: string+=`Roll ${effect[0]} Di${effect[0]!=1?`c`:``}e and\nDeal That Much Damage\nRoll ${effect[1]} More Di${effect[1]!=1?`c`:``}e and\nDamage Random\nOther Enemies`; break
            case 1008: string+=`Gain ${effect[0]} Strength\nWhen You Lowroll`; break
            case 1009: string+=`50%: Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1010: string+=`50%: Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Gain ${effect[1]} Energy`; break
            case 1011: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIn a Random Direction`; break
            case 1012: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 0 at\nLeft of Hand`; break
            case 1013: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nLefmost Card in Hand:\nAdds Double Block`; break
            case 1014: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCenter of Hand:\nApply ${effect[1]} Weak`; break
            case 1015: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCenter of Hand:\nApply ${effect[1]} Vulnerable`; break
            case 1016: string+=`Discard ${effect[0]} Card${pl(effect[0])}\nAdd a Copy of\nThis Card to Hand`; break
            case 1017: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nRandomize Target Intent`; break
            case 1018: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRandomize Target Intent`; break
            case 1019: string+=`Gain ${effect[0]} Decrementing\nStrength`; break
            case 1020: string+=`Gain ${effect[0]} Ammo`; break
            case 1021: string+=`Discard Your Hand\nGain ${effect[0]} Vulnerable\nAdd ${effect[1]} Anger Punch${effect[1]?`es`:``}`; break
            case 1022: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext ${effect[1]} Damage Deal${pl(effect[1])}\n${effect[1]!=1?`are`:`is`} 50% More\nAdvance`; break
            case 1023: string+=`50%: Push 1 Tile\n50%: Apply ${effect[0]} Confusion`; break
            case 1024: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Ammo`; break
            case 1025: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nMove a Card From\nDiscard to Draw`; break
            case 1026: string+=`Gain ${effect[0]} Energy\nSwap Draw and Discard\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1027: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Total\nHand Cost`; break
            case 1028: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nShuffle ${effect[2]} Card${pl(effect[2])} From\nHand Into Draw`; break
            case 1029: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nNext 3 Turns`; break
            case 1030: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} More\nCard${pl(effect[1])} Next Turn`; break
            case 1031: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscards to\nDraw`; break
            case 1032: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}\nNext Turn`; break
            case 1033: string+=`Gain ${effect[0]} Temporary\nDexterity`; break
            case 1034: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 Temporarily\nat Center of Hand`; break
            case 1035: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCenter of Hand:\nGain ${effect[1]} Armor`; break
            case 1036: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],13)}Hand\nSize Damage\nCenter of Hand:\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1037: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 0 Temporarily\nat Center of Hand`; break
            case 1038: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Strike${pl(effect[1])}\nto Draw`; break
            case 1039: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Defend${pl(effect[1])}\nto Draw`; break
            case 1040: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less Temporarily\nWhen a Basic\nCard is Played`; break
            case 1041: case 3418:
                string+=`Strikes and Defends\nHave ${effect[0]} More Effect`; break
            case 1042: string+=`Make ${effect[0]} Card${pl(effect[0])}\nFree This Combat`; break
            case 1043: string+=`Existing Strikes\nHave +1 Range`; break
            case 1044: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nFrom the Bottom`; break
            case 1045: string+=`Send 1 of Every ${effect[0]}\nCards in Discard\nto Hand`; break
            case 1046: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Currency`; break
            case 1047: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nNext ${effect[2]} Card${pl(effect[2])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 1048: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd an Ourostep\nto Discard Pile`; break
            case 1049: string+=`Apply ${effect[0]} Bruise`; break
            case 1050: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bruise`; break
            case 1051: string+=`Apply ${effect[0]} Bruise\nin All Directions`; break
            case 1052: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturn ${effect[1]} Gun${pl(effect[1])}\nFrom Discard to Hand`; break
            case 1053: string+=`Guns Deal ${effect[0]}\nMore Damage`; break
            case 1054: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = (Range-1)`; break
            case 1056: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy\nRepeat if Fatal,\nMax 3 Times`; break
            case 1057: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${this.calculateEffect(effect[1],14)} More\nIf Played First`; break
            case 1058: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[1],10)} More\nPer Curse in Deck`; break
            case 1059: string+=`Other Enemies Face\nTarget and Attack`; break
            case 1060: string+=`Summon in ${effect[0]} MobMan${pl(effect[0])}`; break
            case 1061: string+=`Gain ${effect[0]} Armor\nCenter of Hand:\nGain ${effect[1]} Energy`; break
            case 1062: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nNext ${effect[1]!=1?`${effect[1]} `:``}Card${pl(effect[1])} ${effect[1]!=1?`are`:`is`} Free`; break
            case 1063: string+=`Exhaust Your Hand\nGain ${effect[0]} Strength Each`; break
            case 1064: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Target\nDeal ${this.calculateEffect(effect[1],0)} Damage\nto All Enemies\nWhen Drawn,\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1065: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nAll Cards in Hand\nCost 0 This Turn\nWhen Drawn,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1066: string+=`Gain ${effect[0]} Strength\nTarget Does Too\nFails if Not\nTargetting Enemy`; break
            case 1067: string+=`Target Wants to\nDie Temporarily`; break
            case 1068: case 3946:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Ammo`; break
            case 1069: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTo All Targets\nGain ${effect[1]} Ammo Each`; break
            case 1070: string+=`Return Target\nConstruct's Blueprint`; break
            case 1071: string+=`Summon in an AllyMonkey`; break
            case 1072: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals 0 After\nYou Take Damage`; break
            case 1073: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal Double Damage\nand Take Double\nDamage This Turn`; break
            case 1074: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}\nAdd an Out of Time\nto Draw`; break
            case 1075: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd an Impending Doom\nof Equivalent Level\nto Draw`; break
            case 1076: string+=`When Drawn,\nAll Enemies Take\n${effect[0]} Damage`; break
            case 1077: string+=`Increase All Block\nAdded by ${effect[0]}`; break
            case 1078: string+=`Exhaust Your Hand\nGain ${effect[0]} Ammo Each`; break
            case 1079: string+=`Gain ${effect[0]} Energy\nPer Enemy`; break
            case 1080: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Strike${pl(effect[1])}\nof Equivalent Level\nto Draw`; break
            case 1081: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Defend${pl(effect[1])}\nof Equivalent Level\nto Draw`; break
            case 1082: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDeal ${this.calculateEffect(effect[1],0)} Damage\nat any Range\nIf Possible`; break
            case 1083: string+=`Deal ${this.calculateEffect(1,0)}-${this.calculateEffect(effect[0],0)} Damage\nand Gain That\nMuch Currency`; break
            case 1084: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDiscard All Blueprints`; break
            case 1085: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nTransform ${effect[1]} Card${pl(effect[1])}`; break
            case 1086: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDeal ${this.calculateEffect(effect[1],0)} Splash Damage`; break
            case 1087: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Credit\nof Equivalent Level\nto Draw`; break
            case 1088: string+=`All Hits Taken\n${effect[0]!=1?`Next ${effect[0]} Turns`:`This Turn`}\nHeal You Instead`; break
            case 1089: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Would Die,\nDeal Only ${this.calculateEffect(effect[1],0)} Damage\nApply ${effect[2]} Bleed`; break
            case 1090: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Would Die,\nDeal Only ${this.calculateEffect(effect[1],0)} Damage\nAdd ${this.calculateEffect(effect[2],1)} Block`; break
            case 1091: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Would Die,\nDeal Only ${this.calculateEffect(effect[1],0)} Damage\nHeal ${this.calculateEffect(effect[2],4)} Health`; break
            case 1092: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Would Die,\nDeal Only ${this.calculateEffect(effect[1],0)} Damage\nGain ${effect[2]} Currency`; break
            case 1093: string+=`Add a Random\nAce of Equivalent\nLevel to Hand\nand Retain It\nUntil Played`; break
            case 1094: string+=`Reverse All Your\nStat Changes`; break
            case 1095: string+=`Discard Your Hand\nDraw That Many Cards\nAdd a Redraw\nof Equivalent\nLevel to Hand`; break
            case 1096: string+=`Add Magic Trick Cards\nof Equivalent Level\nCard to Your Draw\nand Discards`; break
            case 1097: string+=`50%: Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\n50%: Deal ${this.calculateEffect(effect[2],0)} Damage\nAdd ${this.calculateEffect(effect[3],1)} Block`; break
            case 1098: string+=`Put a Card From\nFirst 3 Cards in Draw\nPile in Your Hand\nIt Costs 0 This Turn`; break
            case 1099: string+=`Add ${effect[0]} Queen${pl(effect[0])} of Hearts\nto Hand`; break
            case 1100: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 1101: string+=`Damage Dealt This\nTurn Converts to\nCurrency`; break
            case 1102: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nDamage Dealt Gives\nTarget ${effect[1]} Regeneration`; break
            case 1103: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nto Everything`; break
            case 1104: string+=`Move to End of Board,\nDeal ${this.calculateEffect(effect[0],0)} Damage Damage\nto All Targets and Swap`; break
            case 1105: string+=`Deal Double Damage\nThis Turn\nBut No Enemies\nCan Die`; break
            case 1106: string+=`Move to Any\nEmpty Tile\nPush 1 Tile\nin All Directions\nAt 2 Range`; break
            case 1107: string+=`${effect[0]} Spin${pl(effect[0])}\n12.5% Each:\n10 Currency, 1 Item\n2 Strength, 2 Dexterity\n${this.calculateEffect(5,1)} Block, 1 Buffer\n1 Energy, 2 Cards`; break
            case 1108: string+=`Gain ${effect[0]} Strength\nAdd ${effect[1]} Basicit${effect[1]!=1?`ies`:`y`}\nto Draw`; break
            case 1109: string+=`All Hits Taken\n${effect[0]!=1?`Next ${effect[0]} Turns`:`This Turn`}\nAdd Block Instead`; break
            case 1110: string+=`Remove All Cards\nof a Name\nPermanently`; break
            case 1111: string+=`You Cannot Be Debuffed\nTarget Cannot Be Buffed`; break
            case 1112: string+=`Deal Double Damage\nThis Turn\nLose ${effect[0]} Health`; break
            case 1113: string+=`When Owned,\nCompact Cards`; break
            case 1114: string+=`When Owned,\nCompact Cards\nWhen Drawn,\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1115: string+=`When Drawn,\nHeal ${this.calculateEffect(effect[0],4)} Health\nDiscard ${effect[1]}\nRandom Card${pl(effect[1])}`; break
            case 1116: string+=`Deal Double Damage\nNext Turn\nBut All Enemies\nare Invisible`; break
            case 1117: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nApply ${effect[1]} Burn\nto Everything`; break
            case 1118: string+=`Reflect Next Hit Taken`; break
            case 1119: string+=`Build an Antizone\nWith ${effect[0]}x`; break
            case 1120: string+=`All Non-Movement Cards\nin Hand Get +${effect[0]} to\nAll Numerical Values`; break
            case 1121: string+=`Duplicate Your Hand\nCannot Duplicate Itself`; break
            case 1122: string+=`Choose a Nothings\nto Add to Hand`; break
            case 1123: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[0]} Currency\nDraw 1 Card`; break
            case 1124: string+=`Choose Between More\nCards of Equivalent\nLevel to Add\nto Hand`; break
            case 1125: string+=`Choose an Arcana of\nEquivalent Level to\nAdd to Hand`; break
            case 1126: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Not Fatal,\nGain ${effect[1]} Ammo`; break
            case 1127: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n50%: Adds\nDouble Block`; break
            case 1128: string+=`50%: Push 1 Tile\n50%: Push 2 Tiles`; break
            case 1129: string+=`Gain ${effect[0]} Currency\nWhen Another Card\nis Played`; break
            case 1130: string+=`Taking Damage This\nTurn Takes ${effect[0]} Currency\nInstead`; break
            case 1131: string+=`Counter ${effect[0]}\nDamage Down`; break
            case 1132: string+=`Exhaust a Card\nAdd ${this.calculateEffect(effect[0],3)} Block\nWhere X = its Cost`; break
            case 1133: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLowers by 1 Permanently\nAt 0 Damage, Becomes:\nWorthless Baseball Card\nCard Sleeve`; break
            case 1134: string+=`Make a Card Innate`; break
            case 1135: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 4th Time Played\nOn Play: ${this.limit%4+1}/4`; break
            case 1136: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLeave Behind 1\nSpike Tile`; break
            case 1137: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n50%: Gain ${effect[1]} Energy`; break
            case 1138: string+=`Add X Throw Bullets\nof Equivalent Level\nto Hand\nWhere X = Ammo`; break
            case 1140: string+=`Gain ${effect[0]} Ammo\nGain ${effect[1]} Regeneration\nEnd Your Turn`; break
            case 1141: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Ammo\nWhen Hit This Turn`; break
            case 1142: string+=`Gain ${effect[0]} Ammo\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 1143: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLeave Behind 1\nC4 Tile`; break
            case 1144: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2nd Card in Hand:\nApply ${effect[1]} Bleed`; break
            case 1145: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2nd Card in Hand:\nApply ${effect[1]} Confusion`; break
            case 1146: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPermanently\nIncreases by ${effect[1]}`; break
            case 1147: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Ichor`; break
            case 1148: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAt Range 1, is Melee\nInstead of Gun`; break
            case 1149: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have Ammo Left,\nAdd a Copy of This\nCard to Hand`; break
            case 1150: string+=`Apply ${effect[0]} Ichor`; break
            case 1151: string+=`Put a Card in Discard\nPile in Your Hand\nAdd ${this.calculateEffect(effect[0],3)} Block Where\nX = ${variants.mtg?`Total `:``}Cost of Card`; break
            case 1152: string+=`Put a Card in Draw\nPile in Your Hand\nAdd ${this.calculateEffect(effect[0],3)} Block Where\nX = ${variants.mtg?`Total `:``}Cost of Card`; break
            case 1153: string+=`Roll ${effect[0]} Di${effect[0]!=1?`c`:``}e and\nDeal That Much Damage\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 1154: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nShuffle a Diamond\nInto Draw`; break
            case 1155: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Random\n(Temporary)\nCurse to Hand`; break
            case 1156: string+=`Apply ${effect[0]} Weak\nApply ${effect[1]} Frail\nApply ${effect[2]} Vulnerable\nApply ${effect[3]} Poison`; break
            case 1157: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Loses Health\nEqual to its Bleed`; break
            case 1158: string+=`Add ${effect[0]} Random Card${pl(effect[0])}\nof Equivalent Level\nContaining 'Strike' to Hand\nThey Cost 0`; break
            case 1159: string+=`Gain ${effect[0]} Energy\nNext Turn\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1160: string+=`If Target Has\nCurrency or Block\nGain ${effect[0]} Currency\nTarget Loses ${effect[1]} Currency\nor All Block`; break
            case 1161: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Double if\nThere are No\nAttacks in Hand`; break
            case 1162: string+=`3 or More Energy:\nApply ${effect[0]} Poison`; break
            case 1163: string+=`Apply ${effect[0]} Poison\nTarget Loses Health\nEqual to its Poison`; break
            case 1164: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen You Take Damage`; break
            case 1165: string+=`Choose and Add Any\nCharacter or Colorless\nCard of Equivalent\nLevel to Hand`; break
            case 1166: string+=`For 4 Turns,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 1167: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Exhausted,\nDeal ${effect[1]} Splash Damage`; break
            case 1168: string+=`Target Moves\nApply ${effect[0]} Poison`; break
            case 1169: string+=`When in Discard,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy\nEach Turn`; break
            case 1170: string+=`When in Discard,\nAdd ${this.calculateEffect(effect[0],1)} Block\nEach Turn`; break
            case 1172: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nShuffle a Heavy Metal\nof Equivalent Level\nInto Draw`; break
            case 1173: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nGain ${effect[1]} Metal`; break
            case 1174: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Random Common\nCard of Equivalent\nLevel to Hand`; break
            case 1175: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStrikes Gain ${effect[1]} Effect`; break
            case 1176: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDefends Gain ${effect[1]} Effect`; break
            case 1177: string+=`Return Exhaust\nto Hand`; break
            case 1178: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGet Rickrolled`; break
            case 1179: string+=`Even Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1180: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n25%: Apply ${effect[1]} Bleed\n25%: Add ${this.calculateEffect(effect[1],1)} Block\n25%: Heal ${this.calculateEffect(effect[1],4)} Health\n25%: Gain ${effect[1]} Currency`; break
            case 1181: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTranssubstantiate Enemy`; break
            case 1182: string+=`Heal Target For ${effect[0]}\nGain ${effect[1]} Energy\nIf Healed to Full, Lose\n${effect[0]} Currency`; break
            case 1183: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nView the First 3\nCards in Draw Pile`; break
            case 1184: string+=`Add ${effect[0]} Random Card${pl(effect[0])}\nof Equivalent Level\nContaining 'Ball' to Hand`; break
            case 1185: string+=`Summon in an Rewriter`; break
            case 1186: string+=`Have 999999 Max Health`; break
            case 1187: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target is\nSmall and Humanoid\nit Dies Instantly`; break
            case 1188: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],13)}Balance\nDamage`; break
            case 1189: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nDiscards to Draw`; break
            case 1190: string+=`Gain ${effect[0]} Currency\nAll Enemies Gain ${effect[1]} Strength`; break
            case 1192: string+='${this.description()}'; break
            case 1193: string+=`Just Better`; break
            case 1194: string+=`Apply ${effect[0]} Weak`; break
            case 1195: string+=`Apply ${effect[0]} Vulnerable`; break
            case 1196: string+=`Apply ${effect[0]} Stun`; break
            case 1197: string+=`Gain ${effect[0]} Strength`; break
            case 1198: string+=`Gain ${effect[0]} Dexterity`; break
            case 1199: string+=`Gain ${effect[0]} Buffer`; break
            case 1200: string+=`Used by ${types.combatant[this.color].name}`; break
            case 1201: string+=`Enter a Random Stance`; break
            case 1202: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCan Kill Enemies\nThat Cannot Die`; break
            case 1203: string+=`Add to Hand:\nBuild Wall\nMobJustice\nIndictment`; break
            case 1204: string+=`Add to Hand:\nBuild Wall\nMobJustice\nIndictment\nUpgrade 1\nat Random`; break
            case 1205: string+=`Add to Hand:\nBuild Wall\nMobJustice\nIndictment\nUpgrade 2\nat Random`; break
            case 1206: string+=`Add ${effect[0]} Conviction${pl(effect[0])} to\nYour Hand Next Turn`; break
            case 1207: string+=`Gain ${effect[0]} Currency\nAdd The Donald to Deck`; break
            case 1208: string+=`Lower Hitscore by ${effect[0]}`; break
            case 1209: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDecreases by ${effect[1]}\nWhen You Hit`; break
            case 1210: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage to Self\nDisarm on Own Tile`; break
            case 1211: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Gain ${effect[1]} Energy\n50%: Lose ${effect[1]} Energy`; break
            case 1212: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nBlackjack:\nDeals Triple`; break
            case 1213: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nSurvives Bust`; break
            case 1214: string+=`Increase Your Bust\nLimit by ${effect[0]}`; break
            case 1215: string+=`Cycle Through ${effect[0]}\nMore Card${pl(effect[0])} This Turn`; break
            case 1216: string+=`Protects Later Cards\nFrom Busting`; break
            case 1217: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOn Fatal,\nReset Hitscore`; break
            case 1218: string+=`Gain ${effect[0]} Drop${pl(effect[0])}`; break
            case 1219: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen You Hit`; break
            case 1220: string+=`Lower Hitscore by ${effect[0]}\nPer Card in Hand`; break
            case 1221: string+=`Hit ${effect[0]} Time${pl(effect[0])}\nBlackjacks on Bust`; break
            case 1222: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose All Drops`; break
            case 1223: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Drop${pl(effect[1])}`; break
            case 1224: string+=`Put a Card in Draw\nPile in Your Hand\nIt is Reusable Each Turn`; break
            case 1225: string+=`Exhaust ${effect[0]} Card${pl(effect[0])},\nEither a Card Slot\nor Made by One\nAdd to Hand:\nCard Slot\nSlot Shift`; break
            case 1226: string+=`50%: Put a Card in Draw\nPile in Your Hand`; break
            case 1227: string+=`Get a Random Card\nFrom Draw Pile`; break
            case 1228: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nPer Other Medley`; break
            case 1229: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nIf You Have No Energy,\nGain ${effect[1]} Energy`; break
            case 1230: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nAt Max, Deal ${this.calculateEffect(effect[1],0)}\nSplash Damage`; break
            case 1231: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Gain ${effect[1]} Energy`; break
            case 1232: string+=`Build a Mirror Shield`; break
            case 1233: string+=`Even Turn:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1234: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n25%: Gain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1235: string+=`Gain ${effect[0]} Rizz`; break
            case 1236: string+=`Add to Hand:\nWhite Dwarf\nBlack Dwarf\nof Equivalent Level`; break
            case 1237: string+=`Heavily Compact\nCards in Hand`; break
            case 1238: case 1477: case 1486: case 1487: case 1488: case 1489:
                string+=`When Vanished,\nContains Something`; break
            case 1239: string+=`When Drawn,\nGain ${effect[0]} Damage Down\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1240: string+=`When Drawn,\nGain ${effect[0]} Burn\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1241: string+=`When Drawn,\nCounter ${effect[0]} All\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1242: string+=`When Drawn,\nAdd ${this.calculateEffect(effect[0],1)} Block\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1243: string+=`When Drawn,\nUpgrade ${effect[0]} Card${pl(effect[0])}\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1244: string+=`If Target Will Attack,\nReduce Damage by ${effect[0]}`; break
            case 1245: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 1246: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1247: string+=`Even Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nExactly 4:\nGain ${effect[1]} Energy`; break
            case 1248: case 1630:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscards to Hand`; break
            case 1249: string+=`Reduce All\nCountdowns by ${effect[0]}`; break
            case 1250: string+=`Reduce All\nCountdowns by X${effect[0]!=0?`+${effect[0]}`:``}`; break
            case 1251: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReduce All\nCountdowns by ${effect[1]}`; break
            case 1252: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Next ${effect[1]!=1?`${effect[1]} `:``}Attack${pl(effect[1])}\nDeal${effect[1]==1?`s`:``} Double Damage`; break
            case 1253: string+=`75%: Put a Card in Draw\nPile in Your Hand`; break
            case 1254: string+=`90%: Put a Card in Draw\nPile in Your Hand`; break
            case 1255: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nReduce Damage by ${effect[1]}\nGain ${effect[2]} Damage Down\nWhen Discarded`; break
            case 1256: string+=`If Target Will Attack,\nReduce Damage by ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1257: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nReduce Damage by ${effect[1]}\nPush 1 Tile`; break
            case 1258: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}\nOdd Energy:\nGain ${effect[3]} Energy`; break
            case 1259: string+=`Even Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}\nDiscard ${effect[3]} Random Card${pl(effect[3])}`; break
            case 1260: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Random Card${pl(effect[1])}\nAmplify:\nDraw ${effect[2]} More\nCard${pl(effect[2])} Per Turn`; break
            case 1261: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\nDraw ${effect[2]} Card${pl(effect[2])}\nDiscard ${effect[3]} Random Card${pl(effect[3])}`; break
            case 1262: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nGain ${effect[2]} Energy`; break
            case 1263: string+=`Apply:\n${effect[0]} Poison, ${effect[1]} Shock,\n${effect[2]} Freeze, ${effect[3]} Burn\n${effect[4]} Weak, ${effect[5]} Vulnerable\n${effect[6]} Frail, ${effect[7]} Anti-Control\n${effect[8]} Jinx`; break
            case 1264: string+=`Have ${effect[0]} Energy`; break
            case 1265: string+=`Have ${effect[0]} Energy\nA Random Card\nCosts ${effect[1]} More`; break
            case 1266: string+=`Roll X${effect[0]!=0?`+${effect[0]}`:``} Dice\nof Value 1-3 and\nDeal That Much Damage\nWhere X = Hand Size\nDiscard Your Hand`; break
            case 1267: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn`; break
            case 1268: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Shock`; break
            case 1269: string+=`Gain ${effect[0]} Energy\nHidden Swap 2 Cards\nFrom Draw`; break
            case 1270: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDecreases by ${effect[1]}\nEach Battle`; break
            case 1271: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Drawn,\nDeal ${this.calculateEffect(effect[1],0)} Damage\nto a Random Enemy`; break
            case 1272: string+=`Kill All Enemies\nThat are Copies`; break
            case 1273: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Total\nStatuses on Target`; break
            case 1274: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nApply ${effect[2]} Shock`; break
            case 1275: string+=`Gain ${effect[0]} Currency\nWhen An Enemy Dies`; break
            case 1276: string+=`New Shivs Get +${effect[0]}\nRange and Advance`; break
            case 1277: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\n10 Times`; break
            case 1278: string+=`Kill Everything`; break
            case 1279: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]}\nRandom Debuff to Self`; break
            case 1280: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]}\nRandom Debuff to Self\nApply ${effect[2]}\nRandom Debuff to Self`; break
            case 1281: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Randomly\nLeft or Right\n75%: Gain ${effect[1]} Energy`; break
            case 1282: string+=`A Random\nNon-Movement\nCard in Deck\nHas Double Effect\nand Vanishing ${effect[0]}`; break
            case 1283: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash\nDamage Around Self`; break
            case 1284: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 3 Lucky 7s\nPlayed${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].hand.playedSpecific[0]%3})`:``},\nGain ${effect[1]} Currency`; break
            case 1285: string+=`${effect[0]>0?`Activates in ${effect[0]} Card${pl(effect[0])}\n`:``}Deal ${this.calculateEffect(effect[1],0)} Damage\nApply ${effect[2]} Random Debuff`; break
            case 1286: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Increases\nby ${effect[1]} Permanently`; break
            case 1287: string+=`Your Next ${effect[0]!=1?`${effect[0]} } Exhausts`:`Exhaust`}\nReturn${effect[0]==1?`s`:``} to Draw Instead\nand Duplicate${effect[0]==1?`s`:``} the Card`; break
            case 1288: string+=`If Last Card\nRemaining in Hand,\nApply ${effect[0]} Miss`; break
            case 1289: string+=`Deluxe Upgrade\na Card`; break
            case 1290: string+=`Enter a Rest Site`; break
            case 1291: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose Random ${variants.mtg?`Mana`:`Energy`}\nFrom Remaining`; break
            case 1292: string+=`Tech Goes Here`; break
            case 1293: string+=`Add ${effect[0]} Random\nCard${pl(effect[0])} of Any Group\nto Hand`; break
            case 1294: string+=`Combine Two Equal\nCards, Sums Values,\nReduces by 1`; break
            case 1295: string+=`Even X:\nDeal ${this.calculateEffect(effect[0],2)} Damage\nShuffle a Snip With\nX/2 Into Draw`; break
            case 1296: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal Double Damage\nThis Turn\nIf Target Would Die,\nDeal Only ${this.calculateEffect(effect[1],0)} Damage`; break
            case 1297: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nAdd ${this.calculateEffect(effect[1],1)} Block\nCounter ${effect[2]} All`; break
            case 1298: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSpend ${effect[1]} Charge:\nHeal ${this.calculateEffect(effect[2],4)} Health`; break
            case 1299: string+=`Draw ${effect[0]} More\nCard${pl(effect[0])} Per Turn\nGain ${effect[1]} Miss`; break
            case 1300: string+=`Add ${effect[0]} Miracle${pl(effect[0])}\nto Hand\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1301: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1302: string+=`Remove Properties\nFrom Cards in Hand\nTemporarily`; break
            case 1303: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Card${pl(effect[1])}\nDraws Rarer\nCards First`; break
            case 1304: string+=`Requires X = ${effect[0]} Exactly\nAdd a Keyblade\nof Equivalent Level\nto Hand`; break
            case 1305: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturns to Hand\nAfter Each Turn`; break
            case 1306: string+=`Double Your Energy\nAmplify:\nTriple It`; break
            case 1307: string+=`When Drawn,\nGain ${effect[0]} Bleed\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 1308: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Random Buff`; break
            case 1309: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nEach Battle`; break
            case 1310: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}\nSpend ${effect[3]} Charge:\nGain ${effect[4]} Energy`; break
            case 1311: string+=`Deal Damage Equal to\nthe Sum of the Damage\nof the First 4 Other\nAttacks in Hand${effect[0]!=0?`+${effect[0]}`:``}`; break
            case 1312: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHidden Swap 2 Cards\nFrom Draw`; break
            case 1313: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCards in Hand\nHave a 50% Chance\nto Cost 1 Less`; break
            case 1314: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Shock`; break
            case 1315: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Will Not\nRotate This Turn`; break
            case 1316: string+=`4 or More Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn`; break
            case 1317: string+=`Add ${effect[0]} 6-Miracle${pl(effect[0])}\nto Hand`; break
            case 1318: string+=`Add ${effect[0]} Six Shot${pl(effect[0])}\nto Hand\nGain ${effect[1]} Ammo`; break
            case 1319: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Single\nAttack Strength`; break
            case 1320: string+=`Even Energy:\nApply ${effect[0]} Shock`; break
            case 1321: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has Shock,\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1322: string+=`Odd Energy:\nHeal ${this.calculateEffect(effect[0],4)} Health\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1323: string+=`75%: Gain ${effect[0]} Currency\n25%: Gain ${effect[1]} Relic${pl(effect[1])}`; break
            case 1324: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nA Random Card\nGets +1 to Numeric Values`; break
            case 1325: string+=`Convert Energy to\na Die Face and Turn\nit on its Side`; break
            case 1326: string+=`Put a Card\nFrom Your Deck\nInto Hand`; break
            case 1327: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nand Retain ${effect[0]!=1?`Them`:`It`}\nUntil Played`; break
            case 1328: string+=`While in Your Deck,\nGain ${effect[0]} Strength on\nElite and Boss Combats`; break
            case 1329: string+=`Gain ${effect[0]} Currency\nShuffle ${effect[1]} McDucknolds\nAdvertisement${pl(effect[1])} Into\n${this.battle.players==2?`Ally's`:`Your`} Draw`; break
            case 1330: string+=`Buy McDucknolds!`; break
            case 1331: string+=`Shuffle All 1-5\nof Blood Hearts\nInto Draw`; break
            case 1332: string+=`On First Draw,\nHeal ${this.calculateEffect(effect[0],4)} Health\nPlay: Deal ${this.calculateEffect(effect[1],0)} Damage\nApply ${effect[2]} Bleed`; break
            case 1333: let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]; string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscards to Hand\nCosts 5 Taken Damage\n(Currently ${userCombatant.compression})`; break
            case 1334: string+=`Apply ${effect[0]}X Jinx`; break
            case 1335: string+=`Apply ${effect[0]} Jinx`; break
            case 1336: string+=`Deal Damage Equal to\n${this.calculateEffect(effect[0]*10,0)}% of Target's Jinx`; break
            case 1337: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nApply ${effect[1]} Miss`; break
            case 1338: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple if\nTarget Has Miss`; break
            case 1339: string+=`Exactly 0 Energy:\nApply ${effect[0]} Burn\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1340: string+=`Absorbs Half of\nCurrency Earned\nPays Double on Play${this.player>=0&&this.player<this.battle.players?`\n(Holding ${this.battle.currency.ss[this.player]} Currency)`:``}`; break
            case 1341: string+=`Gain ${this.limit.length>0?this.limit[1]:`?`} Currency\nIncreases by 1-10\nRandomly Each Battle`; break
            case 1342: string+=`4th Card in Hand\nand Exactly 3 Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nTarget Deals Half\nDamage For ${effect[1]} Turn${pl(effect[1])}`; break
            case 1343: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove a Random Card\nFrom Your Deck\nDisarm`; break
            case 1344: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage Where\nX = Number of Burns\nExhaust All Burns`; break
            case 1345: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Incremented`; break
            case 1346: string+=`Build an Armored Turret`; break
            case 1347: string+=`Apply ${effect[0]} Regeneration\nto All Combatants\non Plant Tiles`; break
            case 1348: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nReduce Damage by ${effect[1]}\nDiscards to Hand`; break
            case 1349: string+=`Add a Container Ball\nto Deck With\nTarget Enemy\nand Kills It\nFails Against Bosses`; break
            case 1350: string+=`Send Target to\nthe Shadow Realm`; break
            case 1351: string+=`Summon ${effect[0]} L${pl(effect[0])}`; break
            case 1352: string+=`Summon in a\n${types.combatant[this.limit].name}`; break
            case 1353: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double at Range 1`; break
            case 1354: string+=`If You Have\nNo Other Attacks\nin Hand,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1355: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nTarget Has Freeze`; break
            case 1356: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nTarget Has Burn`; break
            case 1357: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nSpend ${effect[1]} Charge:\nAdd ${this.calculateEffect(effect[2],14)} More\nDraw ${effect[3]} Card${pl(effect[3])}`; break
            case 1358: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Shock`; break
            case 1359: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExactly 4 Energy:\nApply ${effect[1]} Burn`; break
            case 1360: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExactly 4 Energy:\nApply ${effect[1]} Freeze`; break
            case 1361: string+=`Add Any Random\nCard to Deck\nRemove a Card\nPermanently`; break
            case 1362: string+=`Even Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nAt Range 3,\nGain ${effect[1]} Charge`; break
            case 1363: string+=`Gain ${effect[0]} Energy\nNext Turn\nAmplify:\nGet ${effect[1]} Instead`; break
            case 1364: string+=`Add ${effect[0]} 6-Miracle${pl(effect[0])}\nto Hand\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1365: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\nGain ${effect[1]} Conditioning`; break
            case 1366: string+=`Double Self\nDiscards to Draw`; break
            case 1367: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nApply ${effect[2]} Shock`; break
            case 1368: string+=`Exactly 0 Energy:\nAdd ${this.calculateEffect(effect[0],1)} Block\nHeal ${this.calculateEffect(effect[1],4)} Health\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1369: string+=`When Drawn,\nGain ${effect[0]} Armor\nOn Play, Add ${this.calculateEffect(effect[1],1)} Block`; break
            case 1370: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nGain ${effect[1]} Charge`; break
            case 1371: string+=`Add ${effect[0]} Shiv${pl(effect[0])}\nto Hand\nGain ${effect[1]} Miss`; break
            case 1372: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMove 1 Tile Away\nAdvance`; break
            case 1373: string+=`Requires 1 Energy Exactly\nDeal ${this.calculateEffect(effect[0],0)} Damage and ${effect[1]} Weak\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1374: case 2308: case 2505:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1375: string+=`Next Luck-Based Card\nis Guaranteed`; break
            case 1376: string+=`Exhaust ${effect[0]} Defense${pl(effect[0])}\nIf ${effect[0]} ${effect[0]!=1?`Are`:`is`} Exhausted,\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 1377: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Wouldn't Die,\n50%: Deal ${this.calculateEffect(effect[1],0)} Damage\nGain ${effect[2]} Currency`; break
            case 1378: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Card${pl(effect[1])}\nGain ${effect[2]} Burn`; break
            case 1379: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Card${pl(effect[1])}\nGain ${effect[2]} Freeze`; break
            case 1380: string+=`Add Any ${effect[0]} Random\nPower${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 This Turn`; break
            case 1381: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage-1`; break
            case 1382: string+=`Retain ${effect[0]} Card${pl(effect[0])} Once\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1383: string+=`Create 1 Safemine`; break
            case 1384: string+=`Put a Card in Discard\nPile in Your Hand\nCosts ${effect[0]} Currency\nDiscards to Hand`; break
            case 1385: string+=`Exhaust a Card\nDeal ${this.calculateEffect(effect[0],2)} Damage\nto a Random Enemy\nWhere X = its Cost`; break
            case 1386: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nMove 1 Tile Away`; break
            case 1387: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nPush 1 Tile`; break
            case 1388: string+=`2 or More Energy:\nHeal ${this.calculateEffect(effect[0],4)} Health\nDiscard ${effect[1]} Random Card${pl(effect[1])}`; break
            case 1389: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 1390: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard Your Hand\nDraw That Many Cards`; break
            case 1391: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain ${effect[1]}\nMore Energy Per Turn`; break
            case 1392: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nShuffle ${effect[1]} Card${pl(effect[1])} Into Draw`; break
            case 1393: string+=`While in Your Deck,\nGain ${effect[0]} Strength on\nBasic Combats`; break
            case 1394: string+=`While in Your Deck,\nGain ${effect[0]} Armor\nEvery Combat`; break
            case 1395: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[1],0)} Damage\nNext Turn`; break
            case 1396: string+=`When You Deal\nMore Than 20 Damage,\nApply ${effect[0]} Miss`; break
            case 1397: string+=`Even X:\nDeal ${this.calculateEffect(effect[0],2)} Damage\nHeal ${this.calculateEffect(effect[1],9)} Health\nShuffle a Snip\nBetween 1 and X-1\nInto Draw`; break
            case 1398: string+=`While in Your Deck,\nHeal ${this.calculateEffect(effect[0],4)} Health\nEvery Turn`; break
            case 1399: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} ${['Burn','Freeze','Shock','Weak'][this.battle.turn.total%4]}\nChanges Every Turn`; break
            case 1400: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\nTarget Cannot Move\nFor ${effect[2]} Turn${pl(effect[2])}`; break
            case 1401: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Miracle${pl(effect[1])} to Hand\nDiscards to Hand`; break
            case 1402: string+=`Gain ${effect[0]} Energy\nDraw Cards to ${effect[1]} Cost`; break
            case 1403: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nTemporarily Every 2\nTurns When Retained`; break
            case 1404: string+=`Exactly 0 Energy:\nGain ${effect[0]} Armor\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1405: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Random Debuff\nApply ${effect[2]} Random Debuff\nApply ${effect[3]} Random Debuff\nDiscards to Hand`; break
            case 1406: string+=`50%: Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Frail\n50%: Deal ${this.calculateEffect(effect[2],0)} Damage`; break
            case 1407: string+=`Set Energy to Gen`; break
            case 1408: string+=`Add a Miracle\nNext Combat`; break
            case 1409: string+=`Apply ${effect[0]} Wet\nto All Enemies`; break
            case 1410: string+=`Apply ${effect[0]} Wet`; break
            case 1411: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}\nDraws Cheaper Cards First`; break
            case 1412: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}\nDraws More Expensive\nCards First`; break
            case 1413: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Power${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1414: string+=`Add ${effect[0]} Cop${effect[0]!=1?`ies`:`y`} of\nYour Base Pack`; break
            case 1415: string+=`If Hand Costs ${effect[0]},\nDraw ${effect[1]} Card${pl(effect[1])}\nNext ${effect[2]} Card${pl(effect[2])}\nPlayed ${effect[2]!=1?`are`:`is`} Duplicated`; break
            case 1416: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen You Play a Card\nDeals ${effect[1]} Less\nWhen You Play a Card`; break
            case 1417: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Weak All\nCounter ${effect[2]} All This Combat`; break
            case 1418: string+=`4 More Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} More\nCard${pl(effect[1])} Next Turn`; break
            case 1419: string+=`End Your Current Turn\nTake Another Instantly`; break
            case 1420: string+=`Halve All Countdowns`; break
            case 1421: string+=`Odd Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nIf Exactly 3, Counter\n${effect[1]} All This Combat`; break
            case 1422: string+=`All Cards in Hand\nCost ${effect[0]} Less Temporarily\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1423: string+=`Exhaust a Card\nGain Energy Equal\nto its Cost`; break
            case 1424: string+=`Roll ${effect[0]} Di${effect[0]!=1?`c`:``}e and\nDeal Damage Equal\nto the Highest\nAdd Block Equal\nto the Second Highest`; break
            case 1425: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Turn Number`; break
            case 1426: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nOdd X: Apply ${effect[1]} Burn\nEven X: Apply ${effect[1]} Freeze`; break
            case 1427: string+=`50%: Apply ${effect[0]} Burn\n50%: Deal ${this.calculateEffect(effect[1],0)} Damage\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1428: string+=`50%: Apply ${effect[0]} Freeze\n50%: Deal ${this.calculateEffect(effect[1],0)} Damage\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1429: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nA Random Card\nCosts ${effect[1]} More`; break
            case 1430: string+=`Apply ${effect[0]} Random Debuff\nGain ${effect[1]} Energy\nNext Turn\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1431: string+=`Apply ${effect[0]} Random Debuff\nApply ${effect[1]} Random Debuff\nGain ${effect[2]} Energy\nNext Turn\nDraw ${effect[3]} Card${pl(effect[3])}`; break
            case 1432: string+=`Exactly 0 Energy:\nApply ${effect[0]} Freeze\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1433: string+=`When Drawn,\nGain ${effect[0]} Freeze\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1434: string+=`Apply ${effect[0]} Burn\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1435: string+=`Apply ${effect[0]} Freeze\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1436: string+=`Apply ${effect[0]} Freeze\n3 Tiles Wide`; break
            case 1437: string+=`4 or More Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze`; break
            case 1438: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze`; break
            case 1439: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nGain ${effect[2]} Freeze (Self)`; break
            case 1440: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nGain ${effect[2]} Burn (Self)`; break
            case 1441: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nApply ${effect[1]} Freeze`; break
            case 1442: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Energy:\nApply ${effect[1]} Burn`; break
            case 1443: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nDiscards to Hand`; break
            case 1444: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nDiscards to Hand`; break
            case 1445: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nPush 1 Tile`; break
            case 1446: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nPush 1 Tile`; break
            case 1447: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nin All Directions`; break
            case 1448: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nin All Directions`; break
            case 1449: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze`; break
            case 1450: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nto All Enemies`; break
            case 1451: string+=`Apply ${effect[0]} Freeze`; break
            case 1452: string+=`Multiply Target\nFreeze by ${effect[0]}`; break
            case 1453: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Freeze`; break
            case 1454: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked, Apply\n${effect[1]} Miss to Self`; break
            case 1455: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Shock\nDiscards to Hand`; break
            case 1456: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Block For ${effect[1]} Turn${pl(effect[1])}\nCreate 1 C4 Tile`; break
            case 1457: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPer Different Color\nCard in Hand`; break
            case 1458: string+=`When Removed,\nGain ${effect[0]} Currency`; break
            case 1459: string+=`2nd Card in Hand:\nNext ${effect[0]} Card${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated`; break
            case 1460: string+=`Gain ${effect[0]} Armor\nCounter ${effect[1]} All This Combat\nHeal ${this.calculateEffect(effect[2],4)} Health\nGain ${this.calculateEffect(effect[3],1)} 2 Turn Dexterity`; break
            case 1461: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nWhen Added, Add\nPride to Deck`; break
            case 1462: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCards in Hand\nThat Retain`; break
            case 1463: string+=`Heal Target For ${effect[0]}\nApply ${effect[1]} Poison`; break
            case 1464: string+=`6 Cards in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1465: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExactly 1 Energy:\nReduce All\nCountdowns by ${effect[1]}`; break
            case 1466: string+=`Take Another Turn`; break
            case 1467: string+=`Set Energy to Gen\nGain ${effect[0]} Shock`; break
            case 1468: string+=`Have ${effect[0]} Energy\nDiscard ${effect[1]} Random Card${pl(effect[1])}`; break
            case 1469: string+=`Summon in a Fat Duck`; break
            case 1470: string+=`Deal Damage Equal to\nthe Sum of the Damage\nof the First 2 Other\nAttacks in Hand${effect[0]!=0?`+${effect[0]}`:``}\nSpend ${effect[1]} Charge:\nDeal Triple Damage`; break
            case 1471: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExactly 2 Energy:\nGain ${effect[1]} Charge`; break
            case 1472: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Random Pot\nto Hand`; break
            case 1473: string+=`Next ${effect[0]} Card${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated\nSpend ${effect[1]} Charge:\nDuplicates Double Cards`; break
            case 1474: string+=`Target Deals Half\nDamage For ${effect[0]} Turn${pl(effect[0])}`; break
            case 1475: string+=`Take Another Turn\nSpawn a Latency Enemy`; break
            case 1476: string+=`50%: Gain ${effect[0]}\nDouble Damage\n50%: Next ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 1478: string+=`Deal ${this.calculateEffect(effect[0],2)}+${this.calculateEffect(effect[1],10)} Damage`; break
            case 1479: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nApply ${effect[2]} Freeze`; break
            case 1480: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nApply ${effect[2]} Burn`; break
            case 1481: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nHeal Health Equal\nto Target's Freeze`; break
            case 1482: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nHeal Health Equal\nto Target's Burn`; break
            case 1483: string+=`Apply ${effect[0]} Freeze\nIf Target Already\nHas Freeze, Also\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 1484: string+=`Apply ${effect[0]} Burn\nIf Target Already\nHas Burn, Also\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 1485: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Damage Down\nDiscards to Hand`; break
            case 1490: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nApply ${effect[1]} Chained`; break
            case 1491: string+=`Next ${effect[0]} Card${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Free\nNext ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 1492: string+=`75%: Deal ${this.calculateEffect(effect[0],0)} Damage\n75%: Add ${this.calculateEffect(effect[1],1)} Block`; break
            case 1493: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nTarget is Undamaged`; break
            case 1494: string+=`Gain ${effect[0]} Random Buff\nGain ${effect[1]} Random Buff\nGain ${effect[2]} Random Buff`; break
            case 1495: string+=`Immune to Damage\nDuring Current Own Turn`; break
            case 1496: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Hit${pl(effect[0])}\nYou Deal ${effect[0]!=1?`Are`:`is`} Reflected`; break
            case 1497: string+=`Target Takes Another Turn`; break
            case 1498: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Target and Self`; break
            case 1499: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple if\nYou Have Miss`; break
            case 1500: string+=`Apply ${effect[0]} Miss\nto Everybody`; break
            case 1501: string+=`When Drawn, Gain ${effect[0]} Shock\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 1502: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Difference\nBetween Cost of the Most\nExpensive Card and Least\nExpensive Card in Hand`; break
            case 1503: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has No Block`; break
            case 1504: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Wet\nDiscards to Hand`; break
            case 1505: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDraw ${effect[1]} Less Card${pl(effect[1])}\nNext Turn`; break
            case 1506: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard All Cards\nThat Do Not Cost 1`; break
            case 1507: string+=`Discard a Random Card\n75%: Deal ${this.calculateEffect(effect[0],0)} Damage\n75%: Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1508: string+=`Deal Damage Equaln\nto the Sum of\nthe First Value of\nOther Cards in Hand\nDiscard Your Hand\nDiscard When a\nCard is Played`; break
            case 1509: string+=`75%: Move ${effect[0]} Tile${pl(effect[0])}\n25%: Take ${effect[1]} Damage`; break
            case 1510: string+=`Discard ${effect[0]} Card${pl(effect[0])}\n50%: Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1511: string+=`Apply ${effect[0]} Weak\nto Everybody`; break
            case 1512: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Last Card\nRemaining in Hand`; break
            case 1513: string+=`90%: Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1514: string+=`90%: Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 1515: string+=`90%: Move ${effect[0]} Tile${pl(effect[0])}`; break
            case 1516: string+=`Add ${effect[0]} 6-Miracle${pl(effect[0])}\nto Hand\nDiscard Your Hand`; break
            case 1517: string+=`Summon in ${effect[0]} Man${pl(effect[0])}`; break
            case 1518: string+=`Lose ${effect[0]} Currency\n50%: Heal ${this.calculateEffect(effect[1],4)} Health`; break
            case 1519: string+=`If Target Has\nLess Than ${effect[0]} Health,\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 1520: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage to a\nRandom Target (Including\nSelf) Repeat if Fatal,\nMax 3 Times`; break
            case 1521: string+=`Deal Damage Equal to\nthe Sum of the Damage\nof the First 4 Other\nAttacks in Hand\nCap ${effect[0]} Each`; break
            case 1522: string+=`Last Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Shock\nGain ${effect[2]} Currency`; break
            case 1523: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTransform ${effect[1]}\nRandom Card${pl(effect[1])}`; break
            case 1524: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have At\nLeast Half Health`; break
            case 1525: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nAnother Card Spends\nYour Last Energy`; break
            case 1526: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove ${effect[1]} Random Card${pl(effect[1])}\nPermanently`; break
            case 1527: string+=`Next ${effect[0]} Card${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated\nLose ${effect[1]} Health`; break
            case 1528: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nHeal ${effect[1]} Health to Target`; break
            case 1529: string+=`Deal ${this.effect[0]!=1?`${this.effect[0]}`:``}X Damage\nto Self`; break
            case 1530: string+=`Apply ${effect[0]} Stun\nDeal Half Damage\nNext Turn`; break
            case 1531: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nActions Target Has`; break
            case 1532: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n50%: Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1533: string+=`Cannot Move and\nCannot Be Pushed\nThis Turn`; break
            case 1534: string+=`Add ${this.calculateEffect(effect[0],1)} Block Next Turn\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1535: string+=`Roll ${effect[0]} Di${effect[0]!=1?`c`:``}e and\nDeal Damage Equal\nto the Lowest\nAdd Block Equal\nto the Second Lowest`; break
            case 1536: string+=`7 Cards in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1537: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nA Random Card\nGets -1 to Numeric Values`; break
            case 1538: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\n25%: Gain ${effect[2]} Poison`; break
            case 1539: string+=`Remove All\nBlock of Target\nIt Gets its Block\nBack Next Turn`; break
            case 1540: string+=`You Will Survive\n${effect[0]} Fatal Hit${pl(effect[0])}`; break
            case 1541: string+=`Target Cannot Die\nFor ${effect[0]} Turn${pl(effect[0])}`; break
            case 1542: string+=`If You Cannot Move,\nYou Can`; break
            case 1543: string+=`Split Half Your\nEnergy Into a Snip\nas Evenly as Possible`; break
            case 1544: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Card${pl(effect[0])}\nThat Cost${effect[0]==1?`s`:``} 1 ${effect[0]==1?`is`:`are`} Free`; break
            case 1545: string+=`Apply ${effect[0]} Stun\nIf Target is Neither\nAttacking Nor Defending`; break
            case 1546: string+=`Apply:\nEven Energy: ${effect[0]} Weak\nOdd Energy: ${effect[1]} Shock`; break
            case 1547: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Lose ${effect[1]} Health\nNext Turn`; break
            case 1548: string+=`Exactly 0 Energy:\nApply ${effect[0]} Shock\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1549: string+=`Randomly Duplicate a\nCard Permanently or\nDestroy it Permanently`; break
            case 1550: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} 0 Cost Card${pl(effect[1])}`; break
            case 1551: string+=`${effect[0]>0?`Gain`:`Lose`} ${abs(effect[0])} Strength\nReverses Each Use`; break
            case 1552: string+=`Discard ${effect[0]} Random Card${pl(effect[0])}\nPut 2 Copies of Each\nTo Top of Draw`; break
            case 1553: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])} Deal${effect[0]==1?`s`:``}\n50%: Triple Damage\n50%: No Damage`; break
            case 1554: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} 1.5x Damage+1`; break
            case 1555: string+=`Remove All Cards\nin Hand Permanently`; break
            case 1556: string+=`3rd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nIf Played First,\nDeals Triple Damage`; break
            case 1557: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Difference\nBetween Highest and\nLowest First Values of\nAttacks in Hand`; break
            case 1558: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More When\nTarget Has Shock`; break
            case 1559: string+=`Exactly 0 Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Currency\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1560: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More if Target\nHas Duplicate Enemies`; break
            case 1561: string+=`3 or More Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1562: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Played First,\nGain ${effect[1]} Charge`; break
            case 1563: string+=`Counter ${effect[0]} All\nThis Combat\nLose ${effect[1]} Currency`; break
            case 1564: string+=`When Retained,\nAdd ${this.calculateEffect(effect[0],1)} Block\nWhen You Are Hit,\nExhausts`; break
            case 1565: string+=`When Drawn,\n${effect[0]} Balance\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1566: string+=`Apply ${effect[0]} Burn\nApply ${effect[1]} Stun`; break
            case 1567: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Currency\nIf Played First,\nApply ${effect[2]} Freeze`; break
            case 1568: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Currency\nIf Played First,\nApply ${effect[2]} Burn`; break
            case 1569: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nApply ${effect[1]} Stun`; break
            case 1570: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLose ${effect[1]} Combo`; break
            case 1571: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCreate a Plant Tile\non Target Tile`; break
            case 1572: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nReduce Balance\nLimit by ${effect[1]}`; break
            case 1573: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nEven Turn:\nGain ${effect[1]} Energy`; break
            case 1574: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nReduce All\nCountdowns by ${effect[1]}`; break
            case 1575: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nMove Something\nBehind You`; break
            case 1576: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd a Random\nInstant Stance Card\nto Hand`; break
            case 1577: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Burn${pl(effect[1])} to Hand`; break
            case 1578: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGuns Deal ${effect[1]}\nMore Damage`; break
            case 1579: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n10%: Gain ${effect[1]} Energy`; break
            case 1580: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Weak`; break
            case 1581: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLose ${effect[1]} Health`; break
            case 1582: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nApply ${effect[1]} Poison\nin All Directions`; break
            case 1583: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Single\nAttack Strength`; break
            case 1584: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nRemove ${effect[1]} Fatigue${pl(effect[1])}`; break
            case 1585: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Attack${pl(effect[1])}`; break
            case 1586: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Defense${pl(effect[1])}`; break
            case 1587: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Movement${pl(effect[1])}`; break
            case 1588: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Power${pl(effect[1])}`; break
            case 1589: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nStraight Left:\nGain ${effect[1]} Energy`; break
            case 1590: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nStraight Right:\nGain ${effect[1]} Energy`; break
            case 1591: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nApply ${effect[0]} Freeze`; break
            case 1592: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nApply ${effect[0]} Burn`; break
            case 1593: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nDeal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 1594: string+=`Swap With an\nAdjacent Target\nSwap Buffs and Debuffs\nTarget Will Face User\nor\nMove ${effect[0]} Tiles`; break
            case 1595: string+=`Pass Through an\nAdjacent Target\nApply ${effect[0]} Jinx`; break
            case 1596: string+=`Swap With a Construct`; break
            case 1597: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOn Turns Divisible\nby 3 Only`; break
            case 1598: string+=`75%: Deal ${this.calculateEffect(effect[0],0)}-${this.calculateEffect(effect[1],2)} Damage\nWhere X = (Range-1)`; break
            case 1599: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Random Debuff\nGain ${effect[2]} Random Debuff\nGain ${effect[3]} Random Debuff\nDiscards to Hand`; break
            case 1600: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Stun\nto All Duplicate Enemies`; break
            case 1601: string+=`Gain ${effect[0]} Decrementing\nArmor`; break
            case 1602: string+=`Target Has No Block:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nTarget Has Block:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1603: string+=`Gain ${effect[0]} Twos`; break
            case 1604: string+=`Add ${effect[0]} Bouncy Ball${pl(effect[0])}\nto Hand`; break
            case 1605: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n1 Energy: Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1606: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}\nAdd a Fat Defend\nto Hand`; break
            case 1607: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSend Remaining Energy\nto Next Turn`; break
            case 1608: string+=`Add ${effect[0]} Random\nMovement${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 1609: string+=`Add ${effect[0]} Random\nMovement${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 1610: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAt Least ${effect[1]} Charge:\nDeals Double Damage`; break
            case 1611: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFor 3 Turns\nDraw ${effect[1]} Less Card${pl(effect[1])}\nNext Turn`; break
            case 1612: string+=`While in Your Deck,\nIgnore ${effect[0]} Tile${pl(effect[0])}\nEvery Combat`; break
            case 1613: string+=`Apply ${effect[0]} Jinx\nNext Turn`; break
            case 1614: string+=`Multiply Target\nJinx by ${effect[0]}`; break
            case 1616: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} ${['Burn','Freeze','Shock','Weak'][this.battle.turn.total%4]}\nChanges Every Turn\nDiscards to Hand`; break
            case 1617: string+=`Lefmost Card in Hand:\nApply ${effect[0]} Freeze\nRightmost Card in Hand:\nApply ${effect[1]} Burn`; break
            case 1618: string+=`Exactly 0 Energy:\nApply ${effect[0]} Jinx\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1619: string+=`Apply ${effect[0]} Jinxshock`; break
            case 1620: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nGain ${effect[2]} Energy\nGain ${effect[3]} Energy\nNext Turn`; break
            case 1621: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Jinx`; break
            case 1622: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nDiscards to Hand`; break
            case 1623: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nAdd a Second Fist\nof Equivalent Level\nto Hand`; break
            case 1624: string+=`Add a Ready or Not\nto Hand`; break
            case 1625: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard ${effect[1]} Random Card${pl(effect[1])}\nDiscards to Hand`; break
            case 1626: string+=`Apply ${effect[0]} Poison\n60%: Gain ${effect[1]} Energy\nDiscards to Hand`; break
            case 1627: string+=`Apply ${effect[0]} Poison\n75%: Gain ${effect[1]} Energy\nDiscards to Hand`; break
            case 1628: string+=`Apply ${effect[0]} Poison\n75%: Gain ${effect[1]} Energy\n25%: Draw ${effect[2]} Card${pl(effect[3])}\nDiscards to Hand`; break
            case 1629: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Poison\nApplies Double Poison\nIf Target Has Poison`; break
            case 1631: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRandomize When a\nCard is Played,\nFrom (${4+2*this.level}-${12+6*this.level})`; break
            case 1632: string+=`Draw ${effect[0]} More Burning\nCard${pl(effect[0])} Per Turn`; break
            case 1633: string+=`Odd Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have Exactly 1,\nApply ${effect[1]} Weak`; break
            case 1634: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} 3-Miracle${pl(effect[1])}\nto Hand`; break
            case 1635: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscards to Hand\nCosts ${effect[1]} Less`; break
            case 1636: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Metallicize\nGain ${effect[2]} Control`; break
            case 1637: string+=`Add ${effect[0]} Weak Basic\nCard${pl(effect[0])} to Hand`; break
            case 1638: string+=`Exactly 2 Energy:\nCounter ${effect[0]} All\nThis Combat`; break
            case 1639: string+=`Duplicate ${effect[0]} Random Card${pl(effect[0])}`; break
            case 1640: string+=`Exactly ${effect[0]} Energy:\nDeal ${this.calculateEffect(effect[1],0)} Damage\nChanges on Play`; break
            case 1641: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nWhen You Lowroll`; break
            case 1642: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExactly 4 Energy:\nDiscard to Hand`; break
            case 1643: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nHeal ${effect[1]} to Self\nand in All Directions`; break
            case 1644: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLose ${effect[1]} Strength`; break
            case 1645: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\n25%: Swap Back\nor\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 1646: string+=`Swap With an\nAdjacent Target\n25% Swap Back\nor\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 1647: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUnupgrade Cards in Hand`; break
            case 1648: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n10%: Lose ${effect[1]} Energy`; break
            case 1649: string+=`Requires ${['Even','Odd'][this.limit%2]} Energy\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDiscards to Hand`; break
            case 1650: string+=`Add a Random\nCrystal of Equivalent\nLevel to Hand\nDiscards to Hand`; break
            case 1651: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Chained`; break
            case 1652: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRedraw the First\nCard in Your Hand`; break
            case 1653: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nThe Leftmost Card in Hand\nCosts 0 Temporarily`; break
            case 1654: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCost Increases by 1\nDiscards to Hand`; break
            case 1655: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Random Debuff\nDiscards to Hand`; break
            case 1656: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Max HP\nAdd a Pain\nStrike to Hand`; break
            case 1657: string+=`Next Attack Deals\n${effect[0]} More Damage and\nApplies ${effect[1]} Regeneration`; break
            case 1658: string+=`Shivs Apply ${effect[0]} Freeze`; break
            case 1659: string+=`Shivs Apply ${effect[0]} Burn`; break
            case 1660: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nYou Cannot Draw More\nCards This Turn`; break
            case 1661: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${effect[1]} Times\nLess Damage\nIf Target Has Block`; break
            case 1662: string+=`4th Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Mixed`; break
            case 1663: string+=`5th Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Silence`; break
            case 1664: string+=`Gain ${effect[0]} Faith\nNext Turn`; break
            case 1665: string+=`Cards This Turn\nCosting More Than 0\nDiscard to Hand`; break
            case 1666: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 1667: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nAnother Card Discarded`; break
            case 1668: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Poison Thorn${pl(effect[1])}\nto Hand`; break
            case 1669: string+=`Create 1 Plant Tile\nAnywhere`; break
            case 1670: string+=`Create 1 Plant Tile\nUnder All Combatants\nIncluding Dead Ones`; break
            case 1671: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Combo\nLose ${effect[2]} Combo Next Turn`; break
            case 1672: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nApply ${effect[1]} Bruise`; break
            case 1673: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Attack Deals\n${effect[1]} More Damage`; break
            case 1674: string+=`Target Moves ${effect[0]} Tile${pl(effect[0])}\nIn a Random Direction`; break
            case 1675: string+=`Gain ${effect[0]} Faith\nLose ${effect[1]} Health\nExhaust ${effect[2]} Card${pl(effect[2])}`; break
            case 1676: string+=`Enter a Random Stance\nAdd ${effect[0]} Random Card${pl(effect[0])} of the\nCorresponding Class\n(Wrath: Attack, Calm:\nSkill, Haste: Movement,\nSturdy: Defense)`; break
            case 1677: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nHaste:\nExit Stance`; break
            case 1678: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSturdy: Exit Stance`; break
            case 1679: string+=`Add ${effect[0]} Shiv${pl(effect[0])}\nto Hand\n${effect[0]!=1?`They Get`:`It Gets`} +${effect[1]} Damage`; break
            case 1680: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDiscard Your Hand\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 1681: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLose ${effect[1]} Currency`; break
            case 1682: string+=`Move to\nEnd of Board\nand Collide`; break
            case 1683: string+=`Apply ${effect[0]} Mixed`; break
            case 1684: string+=`Apply ${effect[0]} Silence`; break
            case 1685: string+=`Shuffle a Peak\nand a Trough\nof Equivalent Level\nInto Draw`; break
            case 1686: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCards Played This Turn`; break
            case 1687: string+=`Even Position:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nOdd Position:\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 1688: string+=`Target Moves As Far\nAway as Possible`; break
            case 1689: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReduce Another\nCountdown by ${effect[1]}`; break
            case 1690: string+=`Apply ${effect[0]!=1?`${effect[0]}`:``}X Shock\nWhere X = Number\nof Cards in Hand\nDiscard Your Hand`; break
            case 1691: string+=`Exhaust Your Hand\nEnd Your Turn\nRed: Gain ${effect[0]} Max HP Each\nOtherwise: Tone to Red\nand Gain ${effect[1]} Strength Each`; break
            case 1692: string+=`Apply ${effect[0]} Weak\nPurple: Add Last Quarter\nto Discard\nOtherwise: Tone to Purple\nand Add Self`; break
            case 1693: string+=`Remove ${effect[0]} Strength\nReset Theme`; break
            case 1694: string+=`Remove All Fatigues\nYellow: Replace\nWith Sandstones\nOtherwise: Tone to Yellow\nReplace With Quicksands`; break
            case 1695: string+=`50%: Draw ${effect[0]} Card${pl(effect[0])}`; break
            case 1696: string+=`50%: Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1697: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}`; break
            case 1698: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSpends Draw as Retain`; break
            case 1699: string+=`Exhaust ${effect[0]} Defense${pl(effect[0])}\nIf ${effect[0]} ${effect[0]!=1?`Are`:`is`} Exhausted,\nDeal ${this.calculateEffect(effect[1],0)} Damage\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1701: string+=`Add X${effect[0]>0?`+${effect[0]}`:``} Quills\nto Hand`; break
            case 1702: string+=`Discard Your Hand\nAdd to Hand:\n${effect[0]} x Sneeze\n${effect[1]} x Spike\n${effect[2]} x Sharp Spike`; break
            case 1703: string+=`1st Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nShuffle a Number 2\nof Equivalent Level\nInto Draw`; break
            case 1704: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nShuffle a Number 3\nof Equivalent Level\nInto Draw`; break
            case 1705: string+=`3rd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nShuffle a Number 4\nof Equivalent Level\nInto Draw`; break
            case 1706: string+=`4th Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nShuffle a Number 5\nof Equivalent Level\nInto Draw`; break
            case 1707: string+=`5th Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nShuffle a Number 6\nof Equivalent Level\nInto Draw`; break
            case 1708: string+=`6th Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1709: string+=`Deal ${this.calculateEffect(effect[0],0)}+${effect[1]!=1?`${effect[1]}*`:``}Combo\nDamage 3 Tiles Wide`; break
            case 1710: string+=`Gain ${effect[0]} Combo\nHeal ${this.calculateEffect(effect[1],4)} Health\nIf Exhausted,\nGain ${effect[1]} Combo`; break
            case 1711: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\n3 Times\nLose ${effect[2]} Combo`; break
            case 1712: string+=`Gain ${effect[0]} Energy\nLose ${effect[1]} Max Health`; break
            case 1713: string+=`Odd Turn:\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 1714: string+=`Rest of Hand Costs ${effect[0]}:\nApply ${effect[1]} Poison`; break
            case 1715: string+=`Reverse Your Hand\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1716: string+=`Shuffle Uptick\nand Downtick\nof Equivalent Level\nInto Draw`; break
            case 1717: string+=`Gain ${effect[0]} Strength\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1718: string+=`Shuffle Buff Up\nand Nerf Up\nof Equivalent Level\nInto Draw`; break
            case 1719: string+=`Upgrade ${effect[0]} Card${pl(effect[0])}`; break
            case 1720: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\n25%: Occurs Around Self`; break
            case 1721: string+=`Multiply Target\nPoison by ${effect[0]}\nApply ${effect[1]} Weak`; break
            case 1722: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}\nDraws Cards With\nMore Properties First`; break
            case 1723: string+=`Gain ${effect[0]} Salad Item${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1724: string+=`1 or Less\nNon-Attack in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1725: string+=`Even X: Deal ${this.calculateEffect(effect[0],2)} Damage\nOdd X: Add ${this.calculateEffect(effect[1],3)} Block`; break
            case 1726: string+=`Add ${effect[0]} Broken Shiv${pl(effect[0])}\nto Hand\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1727: string+=`Add ${effect[0]} Deluxe Shiv${pl(effect[0])}\nto Hand`; break
            case 1728: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Power${pl(effect[1])}`; break
            case 1729: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}\nCreate 1 Plant Tile`; break
            case 1730: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nFor Each Construct`; break
            case 1731: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nWhen There are\n2 or More Constructs`; break
            case 1732: string+=`Exactly 2 Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nOtherwise: Heal ${this.calculateEffect(effect[1],4)} Health`; break
            case 1733: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nApply ${effect[1]}-X Poison`; break
            case 1734: string+=`Even Energy:\nGain ${effect[0]} Energy\nOdd Energy:\nLose ${effect[0]} Energy`; break
            case 1735: string+=`2 Cards in Hand\nWith 1 as a Value:\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1736: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Card Position is Even`; break
            case 1737: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Add a Peak\nto Hand Next Turn`; break
            case 1738: string+=`Add ${this.calculateEffect(1,1)}-${this.calculateEffect(effect[0],1)} Block`; break
            case 1739: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDamage Increases by ${effect[1]}\nCost Increases by ${effect[2]}\nDiscards to Draw`; break
            case 1740: string+=`Requires ${['Even','Odd'][this.limit%2]} Energy\nDeal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nDiscards to Hand`; break
            case 1741: string+=`Reduce Another\nCountdown by ${effect[0]}`; break
            case 1742: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nReduce Another\nCountdown by ${effect[1]}`; break
            case 1743: string+=`Reduce All\nCountdowns by ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1744: string+=`Apply ${effect[0]} Burn\nApply ${effect[1]} Poison`; break
            case 1745: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nWhen Drawn,\nMake ${effect[2]} Cop${effect[2]!=1?`ies`:`y`}`; break
            case 1746: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nApply ${effect[2]} Chained`; break
            case 1747: string+=`Set All Countdowns to 0`; break
            case 1748: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSet a Random\nCountdown to ${effect[1]}`; break
            case 1749: string+=`Deal Damage Equal to\nFirst Attack in Hand's\nFirst Value\nOn Prime Number,\nApply ${effect[0]} Chained`; break
            case 1750: string+=`Double Countdown\nIncrements This Turn`; break
            case 1751: string+=`Deal ${effect[0]} Damage\nApply ${effect[1]} Burn\nDamage is Constant`; break
            case 1752: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReduce All Countdowns\nby Leftover Energy`; break
            case 1753: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less Temporarily\nWhen Retained\nDiscards to Hand`; break
            case 1754: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Random ${[`Setsuna`,`Lira`][this.battle.turn.total%2]}\nCard${pl(effect[1])} to Hand`; break
            case 1755: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}\nSpend ${effect[3]} Charge:\nDeal Triple Damage`; break
            case 1756: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nSpend ${effect[1]} Charge:\nX Increased by ${effect[2]}`; break
            case 1757: string+=`Add ${effect[0]} Miracle${pl(effect[0])} to Hand\nAdd ${effect[1]} Wrong Miracle${pl(effect[1])}\nto Hand\nLose All Energy`; break
            case 1758: string+=`50%: Gain ${effect[0]} Energy\n50% Lose ${effect[1]} Energy`; break
            case 1759: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n10%: Gain ${effect[1]} Dodge`; break
            case 1760: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n20%: Gain ${effect[1]} Dodge`; break
            case 1761: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n30%: Gain ${effect[1]} Dodge`; break
            case 1762: string+=`Apply ${effect[0]} Fade`; break
            case 1763: string+=`Exactly 0 Energy:\nApply ${effect[0]} Fade\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1764: string+=`If Energy is More\nThan or Equal to 4,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Fade`; break
            case 1765: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Target Fade`; break
            case 1766: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nDraw ${effect[1]} More Card${pl(effect[1])}\nNext Turn`; break
            case 1767: string+=`Duplicate Cards Cost 0\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1768: string+=`Apply ${effect[0]} Dodge`; break
            case 1769: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Damage\nand Removes Dodge\nIf Target Has Dodge`; break
            case 1770: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card\nDiscards to Draw`; break
            case 1771: string+=`Shuffle ${effect[0]} Shank${pl(effect[0])}\nInto Draw`; break
            case 1772: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nAdd ${effect[1]} Random Subcard${pl(effect[1])}\nto Hand`; break
            case 1773: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRoll a Die\nAdd That Much Block`; break
            case 1774: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIn 2 Turns\nActivates Existing\nTimed Damage`; break
            case 1775: string+=`Activate All Poison\nDown to 0`; break
            case 1776: string+=`Activate All Bleed\nDown to 0`; break
            case 1777: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Incremented,\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscards to Hand`; break
            case 1778: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\nDiscards to Draw`; break
            case 1779: string+=`2 or More Energy:\nDeal ${this.calculateEffect(effect[0],2)}+${this.calculateEffect(effect[1],14)} Damage\nWhere X = Energy`; break
            case 1780: string+=`Apply ${effect[0]} Poison\nAdd ${effect[1]} Miracle${pl(effect[1])} to\nHand Next Turn\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1781: string+=`Next Attack Gets\nDamage of Last Attack`; break
            case 1782: string+=`Apply ${effect[0]} Dodge\nGain ${effect[1]} Energy`; break
            case 1783: string+=`Halve All Countdowns\nRounds Down`; break
            case 1784: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Attack Deals\n${effect[1]} Less Damage`; break
            case 1785: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nPlace Ahead 1\nSpike Tile`; break
            case 1786: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nVertically`; break
            case 1787: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nVertically`; break
            case 1788: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nDiscards to Hand`; break
            case 1789: string+=`Add to Hand:\n${effect[0]} x Red Beard\n${effect[1]} x Pirate Hookshot\n${effect[2]} x Pirate Hook`; break
            case 1790: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExactly 4 Energy:\nGain ${effect[1]} Energy`; break
            case 1791: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target is Not\nAt Full Health,\nApply ${effect[1]} Burn`; break
            case 1792: string+=`Discard Your Hand\nAdd to Hand:\n${effect[0]} x Inky Juggle\n${effect[1]} x Baby Squid Strike`; break
            case 1793: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 1794: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nYou Cannot Move\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1795: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\n75%: Gain ${effect[2]} Energy`; break
            case 1796: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nPush 1 Tile`; break
            case 1797: string+=`Add ${effect[0]} Random Card${pl(effect[0])}\nto Hand From These:\nBlizzard\nInferno\nLightning Bolt`; break
            case 1798: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nto Any Enemy`; break
            case 1799: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nto Any Enemy`; break
            case 1800: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Shock\nto Any Enemy`; break
            case 1801: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Energy:\nLose ${effect[1]} Energy`; break
            case 1802: string+=`Exactly 1 Energy:\nGain ${effect[0]} Temporary\nDamage Up`; break
            case 1803: string+=`Exactly 3 Energy:\nHeal ${this.calculateEffect(effect[0],4)} Health`; break
            case 1804: string+=`Exactly 4 Energy:\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 1805: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Shock\nPush 1 Tile`; break
            case 1806: string+=`Reduce All\nCountdowns by ${effect[0]}\nDiscards to Hand`; break
            case 1807: string+=`Your Hits That Deal\n10 Damage or Less\nDeal ${effect[0]} More Damage`; break
            case 1808: string+=`Place ${effect[0]} Card${pl(effect[0])} on Top\nof Draw Pile and Retain\n${effect[0]!=1?`Them`:`it`} Until Played`; break
            case 1809: string+=`Deal ${this.calculateEffect(1,2)}${effect[0]!=0?`+${this.calculateEffect(effect[0],0)}`:``} Damage\nWhere X = Number of\nBasic Cards in Deck`; break
            case 1810: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard ${effect[1]} Random Card${pl(effect[1])}\nFails Without Discards`; break
            case 1811: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRedraw All Cost 2+ Cards`; break
            case 1812: string+=`Add X${effect[0]>0?`+${effect[0]}`:``} Hyperquills\nto Hand\nNext Turn`; break
            case 1813: string+=`Split 1/3 Your\nEnergy Into a Snip\nFails if Not Divisible`; break
            case 1814: string+=`2 or More Energy:\nAdd ${this.calculateEffect(effect[0],1)} Block\nDiscard ${effect[1]} Random Card${pl(effect[1])}`; break
            case 1815: string+=`Exactly 0 Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Poison\n2 Times`; break
            case 1816: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Hit${pl(effect[0])}\nWith Odd Damage\nDeal${effect[0]==1?`s`:``} Double Damage`; break
            case 1817: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Hit${pl(effect[0])} With\n10 or Less Damage\nDeal${effect[0]==1?`s`:``} Double Damage`; break
            case 1818: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Poison\nto Any Enemy`; break
            case 1819: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 1820: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nto Any Enemy`; break
            case 1821: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\nApply ${effect[2]} Bleed\nDiscards to Hand`; break
            case 1822: string+=`2 or More Energy:\nApply ${effect[0]} Burn\nDiscard ${effect[1]} Random Card${pl(effect[1])}`; break
            case 1823: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFreeze For Each\nof Target's Attacks\nto Any Enemy`; break
            case 1824: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nGain ${effect[1]} Freeze`; break
            case 1825: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nApply ${effect[1]} Weak`; break
            case 1826: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Poison`; break
            case 1827: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nReduce All\nCountdowns by ${effect[1]}`; break
            case 1828: string+=`50%: Apply ${effect[0]} Burn\n50%: Apply ${effect[1]} Shock`; break
            case 1829: string+=`Heal Target For ${effect[0]}\nApply ${effect[1]} Shock`; break
            case 1830: string+=`Apply ${effect[0]} Shock\nFor Every ${effect[1]}\nHealth You Have`; break
            case 1831: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has No Poison,\nApply ${effect[1]} Poison`; break
            case 1832: string+=`Discard Duplicate Cards\nIf Successful,\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1833: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Fail\nto Any Enemy`; break
            case 1834: string+=`Draw ${effect[0]} More\nCard${pl(effect[0])} Per Turn\nCosts 1 Less\nWhen You Take Damage`; break
            case 1835: string+=`Target Has No Block:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nTarget Has Block:\nCounter ${effect[1]} All`; break
            case 1836: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nCounter ${effect[1]} All\nThis Combat`; break
            case 1837: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}\nEven Energy:\nDraw Even Costs\nOdd Energy:\nDraw Odd Costs`; break
            case 1838: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTake ${effect[1]} Damage\nNext Turn`; break
            case 1839: string+=`Gain ${effect[0]} Strength\nSpend ${effect[1]} Charge:\nGain ${effect[2]} More`; break
            case 1840: string+=`Gain ${effect[0]} Charge\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 1841: string+=`Gain ${effect[0]} Damage Up\nSpend ${effect[1]} Charge:\nGain ${effect[2]} Energy`; break
            case 1842: string+=`Even X:\nGain ${effect[0]!=1?effect[0]:``}X${effect[2]!=0?`${effect[2]>0?`+`:``}${effect[2]}`:``} Strength\nOdd X:\nGain ${effect[1]!=1?effect[1]:``}X${effect[3]!=0?`${effect[3]>0?`+`:``}${effect[3]}`:``} Dexterity`; break
            case 1843: string+=`${effect[0]!=1?effect[0]:`An`} Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\n50% Trigger Chance\nPer Attack`; break
            case 1844: string+=`Gain ${effect[0]} Random Buff\nGain ${effect[1]} Random Buff\nGain ${effect[2]} Random Buff\nGain ${effect[3]} Random Debuff\nDraw ${effect[4]} Card${pl(effect[4])}`; break
            case 1845: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Apply ${effect[1]} Miss`; break
            case 1846: string+=`Add 37 of\nNothings to Hand`; break
            case 1847: string+=`Double All Damage\nYou Deal Over 20`; break
            case 1848: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDuplicate ${effect[1]} Random Card${pl(effect[1])}`; break
            case 1849: string+=`Exhaust ${effect[0]} Random Card${pl(effect[0])}\nAdd ${effect[1]} Miracle${pl(effect[1])} to Hand\nIf Last Card\nRemaining in Hand,\nHeal ${this.calculateEffect(effect[2],4)} Health`; break
            case 1850: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} "New" Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1851: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nNext ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 1852: string+=`Apply ${effect[0]} Random Debuff\nDiscards to Hand`; break
            case 1853: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n50%: Gain ${effect[1]} Miss`; break
            case 1854: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nGain ${effect[1]} Armor`; break
            case 1855: string+=`Switch Combat to a\nDifferent Encounter`; break
            case 1856: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily\nDiscards to Hand`; break
            case 1857: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily\nAdd ${this.calculateEffect(effect[1],1)} Block\nDiscards to Hand`; break
            case 1858: string+=`Apply ${effect[0]} Freeze\nReduce Another\nCountdown by ${effect[1]}`; break
            case 1859: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto All Enemies\nApply ${effect[1]} Freeze\nto Everybody`; break
            case 1860: string+=`The Final Boss\nLoses ${effect[0]} Health`; break
            case 1861: string+=`Gain ${effect[0]} Armor\nDraw ${effect[1]} "New" Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 1862: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nTake Another Turn`; break
            case 1863: string+=`Apply ${effect[0]} Freeze\nSpend ${effect[1]} Charge:\nDeal ${this.calculateEffect(effect[2],0)} Damage`; break
            case 1864: string+=`Apply ${effect[0]} Burn\nApplies Double if Target\nHas Freeze or Wet`; break
            case 1865: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nConvert Up to ${effect[1]} Extra\nEnergy To ${effect[1]!=1?`Miracles`:`A Miracle`}`; break
            case 1866: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nDouble Both if\nTarget Has Freeze`; break
            case 1867: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nDouble Both if\nTarget Has Burn`; break
            case 1868: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Retained\nDiscards to Hand`; break
            case 1869: string+=`Exactly 0 Energy:\nApply ${effect[0]} Chained\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 1870: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage If:\nTarget Has No Block\nTarget Health Isn't Full\nYou Have 100 Currency`; break
            case 1871: string+=`Put the Last Card\nFrom Exhaust\nInto Hand`; break
            case 1872: string+=`Draw a Card\nFor Every Exhausted\nCard${effect[0]!=0?` +${effect[0]}`:``}${stage.scene=='battle'&&this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].exhaust.cards.length+effect[0]})`:``}`; break
            case 1873: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nDraw ${effect[1]} More\nCard${pl(effect[1])} Next Turn`; break
            case 1874: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Total\nStatuses on Self`; break
            case 1875: string+=`Deal ${this.calculateEffect(effect[0],0)} More\nDamage Than Your\nLast Damage Deal`; break
            case 1876: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have No Block,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1877: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nHeal ${this.calculateEffect(effect[1],4)} Health\nAdd a Random Common\nCard of Equivalent\nLevel to Hand`; break
            case 1878: string+=`Apply ${effect[0]} Weak\nRemove ${effect[1]} Strength\nDraw ${effect[2]} Card${pl(effect[2])}\nGain ${effect[3]} Energy`; break
            case 1879: string+=`Apply ${effect[0]} Silence\nDraw ${effect[1]} Card${pl(effect[1])}\nIf Target Will Attack,\nDeal ${this.calculateEffect(effect[2],0)} Damage`; break
            case 1880: string+=`Apply ${effect[0]} Chained\nAdd Any ${effect[1]} Random\n3 Cost Card${pl(effect[1])} to Hand`; break
            case 1881: string+=`While in Your Deck,\nGain ${effect[0]} Regeneration\nEvery Combat`; break
            case 1882: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain 1-${effect[1]} Energy`; break
            case 1883: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Does\nNot Lose Health,\nGain ${effect[2]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 1884: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nIf Unblocked,\nApply ${effect[1]} Burn\nApply ${effect[2]} Freeze\nApply ${effect[3]} Shock`; break
            case 1885: string+=`Set a Random\nCountdown to ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 1886: string+=`Reduce All\nCountdowns by ${effect[0]}\nNext ${effect[1]!=1?`${effect[1]} `:``}Attack${pl(effect[1])}\nDeal${effect[1]==1?`s`:``} Double Damage`; break
            case 1887: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Turn 1\nDeals Double Turn 2`; break
            case 1888: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSmoke ${effect[1]} Card${pl(effect[1])}`; break
            case 1889: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Dodge\nAdvance`; break
            case 1890: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nApply ${effect[1]} Burn\nEven Energy:\nApply ${effect[1]} Freeze`; break
            case 1891: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nNext ${effect[1]!=1?`${effect[1]} `:``}Attack${pl(effect[1])}\nDeal${effect[1]==1?`s`:``} Double Damage`; break
            case 1892: string+=`Add a Random\nDefense to Hand\nDeal Damage Equal\nto its Effect`; break
            case 1893: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Time${pl(effect[1])}\nAmount of Times\nIncreases by ${effect[2]}\nDiscards to Draw`; break
            case 1894: string+=`Heal Target For ${effect[0]}\nApply ${effect[1]} Random Debuff\nApply ${effect[2]} Random Debuff\nApply ${effect[3]} Random Debuff`; break
            case 1895: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\nTake ${effect[2]} Damage\nNext Turn`; break
            case 1896: string+=`Take 60% Less\nDamage For ${effect[0]} Turn${pl(effect[0])}`; break
            case 1897: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSwap Target\nFreeze and Burn`; break
            case 1898: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCountdowns in Hand`; break
            case 1899: string+=`Add ${effect[0]} Sick Shot${pl(effect[0])}\nto Hand\nGain ${effect[1]} Ammo`; break
            case 1900: string+=`Apply ${effect[0]} Poison\nGain ${effect[1]} Single\nAttack Strength`; break
            case 1901: string+=`Gain ${effect[0]} Dodge\nTake ${effect[1]} Damage`; break
            case 1902: string+=`Deal ${effect[0]} Damage\nApply ${effect[1]} Shock\nApplies Double if Last\nCard Remaining in Hand`; break
            case 1903: string+=`Add ${effect[0]} Wrong\nMiracle${pl(effect[0])} to Hand\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 1904: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 3 Turns`; break
            case 1905: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUse Target's Attack`; break
            case 1906: string+=`Use Target's Attack\n${effect[0]} Times`; break
            case 1907: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nApply ${effect[1]} Fade`; break
            case 1908: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Silence\nExhaust ${effect[2]} Card${pl(effect[2])}`; break
            case 1909: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nA Random Card\nGets +1 to Numeric Values\nDiscards to Hand\nCosts Increases by 1`; break
            case 1910: string+=`Roll a Die and Deal\nThat Much +${this.calculateEffect(effect[0],0)} Damage`; break
            case 1911: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\non Left Side`; break
            case 1912: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\non Right Side`; break
            case 1913: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nDiscards to Hand`; break
            case 1914: string+=`Next Attack Gets\nDamage of Last Hit Taken\nDivided by ${effect[0]}`; break
            case 1915: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDraw ${effect[1]} Frozen Card${pl(effect[1])}`; break
            case 1916: string+=`Odd Energy:\nLose ${effect[0]} Energy`; break
            case 1917: string+=`Skip to the\nFinal Boss`; break
            case 1918: string+=`Skip to the\nFinal Boss\nGain ${effect[0]} Max HP`; break
            case 1919: string+=`Add Any ${effect[0]} Card${pl(effect[0])} That\nCost${effect[0]==1?`s`:``} Your Energy\nto Hand`; break
            case 1920: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy: to Self`; break
            case 1921: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nGain ${effect[1]} Energy\nDiscards to Hand`; break
            case 1922: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Worker Bee${pl(effect[1])} to Hand\nConvert Sting to 3 Shock`; break
            case 1923: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Sting`; break
            case 1924: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nWhen Added, Add\nBozo to Deck`; break
            case 1925: string+=`Add ${effect[0]} Broken Shiv${pl(effect[0])}\nto Hand`; break
            case 1926: string+=`Roll a D20\nDo That Much Damage\nOn 20, Apply ${effect[0]} Stun`; break
            case 1927: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nLose All Currency`; break
            case 1928: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiagonally\nRotate Target Randomly`; break
            case 1929: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nHaste:\nExit Stance`; break
            case 1930: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nHaste:\nExit Stance`; break
            case 1931: string+=`Lose ${effect[0]} Health\nBecome Confused`; break
            case 1932: string+=`Apply ${effect[0]} Fail`; break
            case 1933: string+=`Choose a Mixture\nto Add to Hand`; break
            case 1934: string+=`You and Target Deal\nHalf Damage For ${effect[0]} Turn${pl(effect[0])}`; break
            case 1935: string+=`Even Energy:\nApply ${effect[0]} Miss`; break
            case 1936: string+=`Swap Draw and Discard\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1937: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nAdvance`; break
            case 1938: string+=`Return All Innate\nCards to Hand\nIncluding Exhausted Ones`; break
            case 1939: string+=`Return All Innate\nCards to Hand\nIncluding Exhausted Ones\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1940: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Energy:\nGain ${effect[1]} Armor`; break
            case 1941: string+=`Draw ${effect[0]} More Frozen\nCard${pl(effect[0])} Per Turn`; break
            case 1942: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDraw ${effect[1]} Burning Card${pl(effect[1])}`; break
            case 1943: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nWhen Drawn,\nMake ${effect[2]} Cop${effect[2]!=1?`ies`:`y`}`; break
            case 1944: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nDiscards to Hand`; break
            case 1945: string+=`75% Chance Each:\n${effect[0]} Poison, ${effect[1]} Shock,\n${effect[2]} Freeze, ${effect[3]} Burn\n${effect[4]} Weak, ${effect[5]} Vulnerable\n${effect[6]} Frail, ${effect[7]} Anti-Control\n${effect[8]} Jinx`; break
            case 1946: string+=`Add a Stolen Attack\nWith Target's Attack`; break
            case 1947: string+=`Contains Some Attack`; break
            case 1948: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Attack is Converted\nto Single Damage Up`; break
            case 1949: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nRandomize When a\nCard is Played,\nFrom (1-3)`; break
            case 1950: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Apply ${effect[1]} Miss\n50%: Target Moves\nRandomly`; break
            case 1951: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Miss\nTarget Moves Randomly`; break
            case 1952: string+=`Add a Stolen Attack\nWith Target's Attack\nTargets Any Enemy`; break
            case 1953: string+=`For Every 2\nCards Exhausted,\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1954: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nto Any Enemy`; break
            case 1955: string+=`Remove All\nEnemy Strength\nApply ${effect[0]} Weak\nApply ${effect[1]} Vulnerable`; break
            case 1956: string+=`Shuffle Into Draw\nand Upgrade Your Hand\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1957: string+=`Transform Your Hand\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1958: string+=`Constructs Face Target\nTargets Any Enemy\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1959: string+=`Deal ${this.diceEffect(1,6,2,effect[0])} Damage`; break
            case 1960: string+=`Construct Takes\nan Extra Turn\nConstruct Gains\n${effect[0]} Max Health`; break
            case 1961: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Removed, Gain\n1 Trash Can Item`; break
            case 1962: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nPush 1 Tile Cyclically\nin All Directions`; break
            case 1963: string+=`Add ${this.diceEffect(1,6,3,effect[0])} Block`; break
            case 1964: string+=`Add ${effect[0]} Random\nAce${pl(effect[0])} of Equivalent\nLevel to Hand\nand Retain ${effect[0]!=1?`Them`:`It`}\nUntil Played`; break
            case 1965: string+=`Deal ${this.diceEffect(1,6,2,effect[0])} Damage\nto a Random Enemy\n${effect[1]} Time${pl(effect[1])}`; break
            case 1966: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]}\nWhen You Take Damage`; break
            case 1967: string+=`Heal Target For ${effect[0]}\nApply ${effect[1]} Burn`; break
            case 1968: string+=`Apply ${effect[0]} Bleed\nApply ${effect[1]} Bruise`; break
            case 1969: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Energy:\nApply ${effect[1]} Bleed`; break
            case 1970: string+=`Deal ${this.diceEffect(1,6,2,effect[0])} Damage\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 1971: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Vulnerable`; break
            case 1972: string+=`Deal ${this.calculateEffect(1,2)}${effect[0]>0?`+${this.calculateEffect(effect[0],14)}`:``} x D3 Damage\nWhere X = Hand Size\nDiscard Your Hand`; break
            case 1973: string+=`Deal ${this.diceEffect(1,6,2,effect[0])} Damage\nAdd ${this.diceEffect(1,6,3,effect[1])} Block\n(Uses Same Roll)`; break
            case 1978: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Vulnerable`; break
            case 1979: string+=`Deal ${this.diceEffect(1,20,2,effect[0])} Damage\nOn 20 or Higher,\nApply ${effect[1]} Jinx`; break
            case 1980: string+=`Deal ${this.diceEffect(1,20,2,effect[0])} Damage\nOn 19 or Higher,\nApply ${effect[1]} Jinx`; break
            case 1981: string+=`Deal ${this.diceEffect(1,20,2,effect[0])} Damage\nOn 18 or Higher,\nApply ${effect[1]} Jinx`; break
            case 1982: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.diceEffect(1,6,3,effect[1])} Block`; break
            case 1983: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDiscard Your Hand\nDraw That Many Cards`; break
            case 1984: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStrikes in Hand\nCost 0 Temporarily`; break
            case 1985: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDefends in Hand\nCost 0 Temporarily`; break
            case 1986: string+=`Existing Steps\nHave +1 Range`; break
            case 1987: string+=`Add ${effect[0]} Strike${pl(effect[0])} and\n${effect[1]} Defend${pl(effect[1])} of Equivalent\nLevel to Hand`; break
            case 1988: string+=`Increase All Dice\nRolls by ${effect[0]}`; break
            case 1989: string+=`Increase All Dice\nRolls by ${effect[0]}\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 1990: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFor Every ${effect[1]}\nCurrency You Have`; break
            case 1991: string+=`${effect[1]} or More Currency:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 1992: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCosts 1 Less\nWhen Step Played`; break
            case 1993: string+=`Gain ${effect[0]} Dexterity\nWhen You Lowroll`; break
            case 1994: string+=`Gain ${effect[0]} Energy\nWhen You Lowroll`; break
            case 1995: string+=`Gain ${effect[0]} Strength\nWhen You Highroll`; break
            case 1996: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nWhen You Highroll`; break
            case 1997: string+=`Gain ${effect[0]} Dexterity\nWhen You Highroll`; break
            case 1998: string+=`Gain ${effect[0]} Energy\nWhen You Highroll`; break
            case 1999: case 3920:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n4 Times`; break
            case 2000: string+=`Set Balance to 0\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 2001: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Next Luck-Based\nCard is Guaranteed`; break
            case 2002: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStrikes in Hand\nGet Effect Doubled`; break
            case 2003: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDefends in Hand\nGet Effect Doubled`; break
            case 2004: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain Strength Equal\nto the Number of\nStrikes in Hand`; break
            case 2005: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain Dexterity Equal\nto the Number of\nDefends in Hand`; break
            case 2006: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nGains 1 Range When\na Basic Card is Played`; break
            case 2007: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\na Basic Card is Played`; break
            case 2008: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n10%: Gain ${effect[1]} Control`; break
            case 2009: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n10%: Draw ${effect[1]} Card${pl(effect[1])}\n${effect[1]!=1?`They Cost`:`It Costs`} 0`; break
            case 2010: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Apply ${effect[1]} Vulnerable\nNext Turn`; break
            case 2011: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Gain ${effect[1]} Currency`; break
            case 2012: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Add a Diamond\nto Hand`; break
            case 2013: string+=`10% Chances\nBecome 25%`; break
            case 2014: string+=`Dice Always Roll\nMax Value`; break
            case 2015: string+=`Double Your Energy\nSpend ${effect[0]} Charge:\nTriple It`; break
            case 2016: string+=`Apply ${effect[0]} Shock\nFor Every ${effect[1]}\nCurrency You Have`; break
            case 2017: string+=`${effect[1]} or Less Currency:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2018: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Energy:\nDraw ${effect[1]} More Card${pl(effect[1])}\nNext Turn`; break
            case 2019: string+=`Next Luck-Based\nCard Next Turn\nis Guaranteed`; break
            case 2020: string+=`Luck-Based Cards\nSucceed 50% of the Time\nThat They Would Fail\nFor ${effect[0]} Turn${pl(effect[0])}`; break
            case 2021: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nNext Luck-Based\nCard is Guaranteed`; break
            case 2022: string+=`Apply D6${effect[0]>0?`+${effect[0]}`:``} Freeze`; break
            case 2023: string+=`Apply D6${effect[0]>0?`+${effect[0]}`:``} Burn`; break
            case 2024: string+=`Apply D6${effect[0]>0?`+${effect[0]}`:``} Shock`; break
            case 2025: string+=`Deal ${this.diceEffect(1,20,2,effect[0])} Damage\nOn 20 (or Higher),\nNext ${effect[1]!=1?`${effect[1]} `:``}Card${pl(effect[1])} ${effect[1]!=1?`are`:`is`} Free`; break
            case 2026: string+=`Deal ${this.diceEffect(1,20,2,effect[0])} Damage\nOn 19 or Higher,\nNext ${effect[1]!=1?`${effect[1]} `:``}Card${pl(effect[1])} ${effect[1]!=1?`are`:`is`} Free`; break
            case 2027: string+=`Deal ${this.diceEffect(1,20,2,effect[0])} Damage\nOn 18 or Higher,\nNext ${effect[1]!=1?`${effect[1]} `:``}Card${pl(effect[1])} ${effect[1]!=1?`are`:`is`} Free`; break
            case 2028: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDeal ${this.diceEffect(1,6,2,effect[1])} Damage`; break
            case 2029: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\nAmplify:\nTriple Damage Instead`; break
            case 2030: string+=`Deal ${this.diceEffect(1,6,2,effect[0])} Damage\nOdd Roll: Apply ${effect[1]} Burn\nEven Roll: Apply ${effect[1]} Freeze`; break
            case 2031: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Random Card${pl(effect[1])}\nAmplify 2:\nDraw ${effect[2]} More\nCard${pl(effect[2])} Per Turn`; break
            case 2032: string+=`Deal ${this.diceEffect(1,6,2,effect[0])} Damage\nGain ${effect[1]!=1?`${effect[1]} x `:``}D6 Currency\n(Uses Same Roll)`; break
            case 2033: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n10%: Gain ${effect[1]} Armor`; break
            case 2034: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Strike${pl(effect[1])} to Hand`; break
            case 2035: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Defend${pl(effect[1])} to Hand`; break
            case 2036: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Strike${pl(effect[1])}\nof Equivalent Level\nto Hand`; break
            case 2037: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Defend${pl(effect[1])}\nof Equivalent Level\nto Hand`; break
            case 2038: string+=`Lose 1 Item`; break
            case 2039: string+=`Add ${effect[0]} Random\nUncommon Colorless Card${pl(effect[0])}\nto Hand`; break
            case 2040: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Attack Deals\n${effect[1]} Less Damage`; break
            case 2041: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You are on\na Special Tile`; break
            case 2042: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nApply ${effect[1]} Damage Down\n50%: Apply ${effect[2]} Burn\n50%: Apply ${effect[3]} Freeze`; break
            case 2043: string+=`Add a Random Card\nof Every Color\nof Equivalent Level\nto Hand`; break
            case 2044: string+=`Your Attacks Get\nDamage of Last Hit Taken\nDivided by ${effect[0]}`; break
            case 2045: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTake Damage Equal\nto Hand Size`; break
            case 2046: string+=`Deal ${this.diceEffect(1,20,2,effect[0])} Damage\nOn 1, Lose ${effect[1]} Health`; break
            case 2047: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 2048: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Apply ${effect[1]} Freeze\n50%: Apply ${effect[2]} Shock`; break
            case 2049: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nGain ${effect[2]} Weak`; break
            case 2050: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} ${['Burn','Freeze','Shock','Weak'][this.battle.turn.total%4]}\nChanges Every Turn\nDiscards to Hand`; break
            case 2051: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStrikes Lose ${effect[1]} Effect`; break
            case 2052: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDefends Lose ${effect[1]} Effect`; break
            case 2053: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDamage Decreases by ${effect[1]}\nCost Increases by ${effect[2]}\nDiscards to Draw`; break
            case 2054: string+=`Divinity: Deal ${this.calculateEffect(effect[0],0)} Damage\nExit Stance`; break
            case 2055: string+=`Divinity: Add ${this.calculateEffect(effect[0],1)} Block\nExit Stance`; break
            case 2056: string+=`Wrath:\nGain ${effect[0]} Strength\nCalm:\nGain ${effect[1]} Energy\nNext Turn\nHaste:\nGain ${effect[2]} Dodge\nSturdy: Gain ${effect[3]} Dexterity`; break
            case 2057: string+=`Add a Teleport\nNext Combat`; break
            case 2058: string+=`Add a Redraw\nNext Combat`; break
            case 2059: string+=`Add a Smite\nNext Combat`; break
            case 2060: string+=`Discard ${effect[0]} Card${pl(effect[0])}\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 2061: string+=`Discard ${effect[0]} Card${pl(effect[0])}\nExhaust ${effect[1]} Card${pl(effect[1])}\nGain ${effect[2]} Energy`; break
            case 2062: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Frail`; break
            case 2063: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Turn Changes`; break
            case 2065: string+=`Turn 4 Or Later:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2066: string+=`Turn 10 Or Later:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2067: string+=`Turn 4 Or Later:\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 2068: string+=`Turn 10 Or Later:\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 2069: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]}\nWhen Turn Changes`; break
            case 2070: string+=`Return All Innate\nCards to Hand`; break
            case 2071: string+=`Increase Turn\nNumber by ${effect[0]}`; break
            case 2072: string+=`Decrease Turn\nNumber by ${effect[0]}`; break
            case 2073: string+=`Double Turn Number`; break
            case 2074: string+=`Go to Turn ${effect[0]}`; break
            case 2075: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nTurn 4 Or Later:\nGain ${effect[1]} Energy`; break
            case 2076: string+=`Wrath:\nApply ${effect[0]} Burn\nCalm:\nApply ${effect[1]} Freeze\nHaste:\nApply ${effect[2]} Shock\nSturdy: Apply ${effect[3]} Weak`; break
            case 2077: string+=`Gain ${effect[0]} Strength\nWhen Selectively\nDiscarded`; break
            case 2078: string+=`Gain ${effect[0]} Dexterity\nWhen Selectively\nDiscarded`; break
            case 2079: string+=`Gain ${effect[0]} Dodge\nWhen Selectively\nDiscarded`; break
            case 2080: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nClaw Up ${effect[1]}`; break
            case 2081: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 2082: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Triple Turn 1\nAdds Double Turn 2`; break
            case 2083: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nIncrease Turn\nNumber by ${effect[1]}`; break
            case 2084: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jinx\nto Any Enemy`; break
            case 2085: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nOdd Energy:\nApply ${effect[1]} Burn\nEven Energy:\nApply ${effect[1]} Freeze`; break
            case 2086: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 2087: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nOdd Energy:\nGain ${effect[1]} Energy`; break
            case 2088: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nGain ${effect[1]} Currency`; break
            case 2089: string+=`Apply ${effect[0]} Shock\nClaw Up ${effect[1]}`; break
            case 2091: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Shock\nHeal Health Equal\nto Target's Shock`; break
            case 2092: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]} When\nAnother Card Discarded`; break
            case 2093: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nTarget Has Shock`; break
            case 2094: string+=`Apply ${effect[0]} Shock\nIf Target Already\nHas Shock, Also\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 2095: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nApply ${effect[0]} Shock`; break
            case 2096: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Shock\nWhen Drawn,\nMake ${effect[2]} Cop${effect[2]!=1?`ies`:`y`}`; break
            case 2097: string+=`Apply ${effect[0]} Shock\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 2098: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Target Burn`; break
            case 2099: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Target Freeze`; break
            case 2100: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Target Shock`; break
            case 2101: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen Turn Changes`; break
            case 2102: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Turn Number`; break
            case 2103: string+=`Move X${effect[0]>0?`+${effect[0]}`:``} Tiles\nWhere X = Turn Number`; break
            case 2104: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nAdd ${effect[1]} Random Uncommon\nColorless Card${pl(effect[1])}\nto Hand`; break
            case 2105: string+=`Take Another Turn\nGain ${effect[0]} Shock`; break
            case 2106: string+=`Deal ${this.calculateEffect(max(0,effect[0]+(stage.scene=='battle'&&this.player>=0&&this.player<this.battle.players?this.battle.cardManagers[this.player].greenDiff:0)),0)} Damage\nIncreases by 1\nWhen You Play a Card\nDecreases by 1\nWhen Card Discarded\nThis Combat`; break
            case 2107: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nin Any Direction\nWhen Etherealed, Add\nan Operational L\nof Equivalent Level`; break
            case 2108: string+=`Move in a L Shape\nWhen Etherealed, Add\nan Operational Star\nof Equivalent Level`; break
            case 2109: string+=`Increase Turn\nNumber by ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2110: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTurn 1:\nGain ${effect[1]} Energy`; break
            case 2111: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTurn 1:\nGain ${effect[1]} Energy`; break
            case 2112: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nDiscard ${effect[1]!=1?effect[1]:``}X Cards`; break
            case 2113: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nTurn 1:\nGain ${effect[1]} Energy`; break
            case 2114: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTurn 2 or Later:\nDeals Double Damage`; break
            case 2115: string+=`Select the Boss\nFor This World`; break
            case 2116: string+=`When Vanished,\nAdd an Antimatter\nto Deck`; break
            case 2117: string+=`Draw ${effect[0]} More\nCard${pl(effect[0])} Per Turn\nPermanently`; break
            case 2118: string+=`When Vanished,\nAdd an Exotic\nMatter to Deck`; break
            case 2119: string+=`All Cards in Hand\nBecome Negative\nPermamently`; break
            case 2120: string+=`Edition a Card`; break
            case 2121: string+=`Draw ${effect[0]} Card${pl(effect[0])} and\nAdd a Myopia to Hand\nWhen Selectively\nDiscarded`; break
            case 2122: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Miss\nto Any Enemy`; break
            case 2123: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jinx\nUpgrade ${effect[2]} Card${pl(effect[2])}`; break
            case 2124: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Poison\nHeal Health Equal\nto Target's Poison`; break
            case 2125: string+=`Apply ${effect[0]} Shock\nIf Target Has No Shock`; break
            case 2126: string+=`Apply ${effect[0]} Shock\nAdvance`; break
            case 2127: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Miss`; break
            case 2128: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nWhen Drawn,\nMake ${effect[2]} Cop${effect[2]!=1?`ies`:`y`}`; break
            case 2129: string+=`Destroy a Construct\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 2130: string+=`Destroy a Construct\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 2131: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Double Block\nWhen There are\n2 or More Constructs`; break
            case 2132: string+=`Apply ${effect[0]} Shock\nin All Directions`; break
            case 2133: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Shock`; break
            case 2134: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nBelow 50% Health:\nIn All Directions`; break
            case 2135: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nDamages Decreases by ${effect[2]}\nWhen You Play a Card\nBlock Increases by ${effect[3]}\nWhen You Play a Card`; break
            case 2136: string+=`Apply ${effect[0]} Jinx\nPush 1 Tile`; break
            case 2137: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nApply ${effect[1]} Jinx`; break
            case 2138: string+=`Apply ${effect[0]} Jinx\nto All Damaged Enemies`; break
            case 2139: string+=`Apply ${effect[0]} Jinx\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random Card${pl(effect[2])}`; break
            case 2140: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nRemove its Block`; break
            case 2141: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nApply ${effect[1]} Vulnerable`; break
            case 2142: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jinx\nApply ${effect[2]} Shock`; break
            case 2143: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nApply ${effect[2]} Shock`; break
            case 2144: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 2145: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds ${this.calculateEffect(effect[1],1)} Instead\nIf You are Hit`; break
            case 2146: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nLose ${effect[1]} Energy\nNext Turn`; break
            case 2147: string+=`Duplicate Non-Movement\nCards Gain +${effect[0]} on\nFirst Effect\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2148: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nHold ${effect[1]} Dark Orb${pl(effect[1])}`; break
            case 2149: string+=`Construct Takes\n${effect[0]} Extra Turn${pl(effect[0])}\nConstruct Loses ${effect[1]} Health`; break
            case 2150: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Damage\nIf Target Has Jinx`; break
            case 2151: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Miss\nIf Target Has Jinx`; break
            case 2152: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDiscard ${effect[1]} Card${pl(effect[1])}\n12 or More Cards\nin Discard:\nGain ${effect[2]} Energy`; break
            case 2153: string+=`Discard ${effect[0]} Card${pl(effect[0])}\nNext ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 2154: string+=`Gain ${effect[0]} Strength\nWhen Selectively\nDiscarded, Add ${this.calculateEffect(effect[1],1)} Block`; break
            case 2155: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Temporary\nStrength\nLose ${effect[2]} Temporary\nStrength Next Turn`; break
            case 2156: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Turn 0`; break
            case 2157: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Triple Turn 0`; break
            case 2158: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTurn 7:\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 2159: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nApply ${effect[1]} Weak`; break
            case 2160: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nApply ${effect[1]} Jinx`; break
            case 2161: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Energy:\nApply ${effect[1]} Weak`; break
            case 2162: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} All\nThis Combat\nYou Cannot Move\nFor ${effect[2]} Turn${pl(effect[2])}`; break
            case 2163: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nYou Cannot Be Pushed\nThis Turn`; break
            case 2164: string+=`Swap With an\nAdjacent Target\nTake 25% Less\nDamage This Turn\nTarget Will Face User`; break
            case 2165: string+=`Swap With an\nAdjacent Target\nTake 25% Less\nDamage This Turn`; break
            case 2166: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 2167: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Attack Deals\n25% Less Damage`; break
            case 2168: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDiagonally\nAdd a Step\nNext Turn`; break
            case 2169: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nPush Something\nBehind You`; break
            case 2170: string+=`Apply ${effect[0]} Weak\nIf Target Already\nHas Weak,\nNext Attack Deals\n${effect[1]} More Damage`; break
            case 2171: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCards in Discard\nThat Cost 0`; break
            case 2172: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrade ${effect[1]} Random Card${pl(effect[1])}\nSlime ${effect[2]} Random Card${pl(effect[2])}`; break
            case 2173: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Miracle${pl(effect[1])}\nto Hand`; break
            case 2174: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nRemove a\nRandom Debuff`; break
            case 2175: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDownward:\nGain ${effect[1]} Energy`; break
            case 2176: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpward:\nGain ${effect[1]} Energy`; break
            case 2177: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDownward:\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2178: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpward:\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2179: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Behind,\nDeal ${effect[1]} Damage`; break
            case 2180: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nGain ${effect[1]} Energy`; break
            case 2181: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nTarget Has Weak`; break
            case 2182: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have No Block,\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 2183: string+=`Apply ${effect[0]} Weak\nPush 1 Tile\nin All Directions`; break
            case 2184: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Weak\nIf Target Has No Weak`; break
            case 2185: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard ${effect[1]} Card${pl(effect[1])}\nAdvance to Range 2`; break
            case 2186: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 2187: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push to Edge\nto All Enemies`; break
            case 2188: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nGain ${effect[1]} Faith`; break
            case 2189: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 2190: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nTransform ${effect[1]} Card${pl(effect[1])}`; break
            case 2191: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nExit Stance`; break
            case 2192: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Random Debuff`; break
            case 2193: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nIf Fatal,\nGain ${effect[1]} Energy`; break
            case 2194: string+=`Add ${effect[0]} Shiv${pl(effect[0])}\nto Hand\nGain ${effect[1]} Energy\nNext Turn`; break
            case 2195: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 2196: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Card Discarded`; break
            case 2197: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen a Shiv is Played`; break
            case 2198: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Selectively\nDiscarded,\nDeal ${this.calculateEffect(effect[1],0)} Damage\nto a Random Enemy`; break
            case 2199: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Selectively\nDiscarded,\nApply ${effect[1]} Weak\nto All Enemies`; break
            case 2200: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nWhen Drawn,\nMake ${effect[2]} Cop${effect[2]!=1?`ies`:`y`}`; break
            case 2201: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jinx\nExhaust ${effect[2]} Card${pl(effect[2])}`; break
            case 2202: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDownward:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2203: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpward:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2204: string+=`Even Turn: Deal ${this.calculateEffect(effect[0],2)} Damage\nOdd Turn: Add ${this.calculateEffect(effect[1],3)} Block`; break
            case 2205: string+=`Even Turn:\nGain ${effect[0]!=1?effect[0]:``}X${effect[2]!=0?`${effect[2]>0?`+`:``}${effect[2]}`:``} Strength\nOdd Turn:\nGain ${effect[1]!=1?effect[1]:``}X${effect[3]!=0?`${effect[3]>0?`+`:``}${effect[3]}`:``} Dexterity`; break
            case 2206: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nDraw ${effect[2]} Less\nCard${pl(effect[2])} Next Turn`; break
            case 2207: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose All Block\nGet it Back Next Turn`; break
            case 2208: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target is\nBelow 50% Health,\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 2209: string+=`Gain ${effect[0]} Temporary\nDexterity\nWhen Selectively\nDiscarded,\nApply ${effect[1]} Jinx\nto a Random Enemy`; break
            case 2210: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Selectively\nDiscarded,\nPut a Card in Discard\nPile in Your Hand`; break
            case 2211: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Selectively\nDiscarded,\nPut a Card in Draw\nPile in Your Hand`; break
            case 2212: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have a\nShiv in Your Hand`; break
            case 2213: string+=`If Target Has\nLess Health Than You,\nGain ${effect[0]} Strength\nOtherwise,\nGain ${effect[1]} Dexterity`; break
            case 2214: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nTarget Has No Statuses`; break
            case 2215: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Selectively\nDiscarded,\nAdd ${effect[1]} Miracle${pl(effect[1])} to Hand`; break
            case 2216: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nOdd Energy:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2217: string+=`Next Attack Deals\n${effect[0]} More Damage\nWhen Drawn,\nMake ${effect[1]} Cop${effect[1]!=1?`ies`:`y`}`; break
            case 2218: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nOdd Energy:\nAdd ${this.calculateEffect(effect[1],14)} More`; break
            case 2219: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nDeals ${this.calculateEffect(effect[1],10)} More`; break
            case 2220: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nGain ${effect[1]} Strength`; break
            case 2221: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2222: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nGain ${effect[1]} Armor`; break
            case 2223: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nApply ${effect[1]} Burn`; break
            case 2224: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Selectively\nDiscarded,\nIncreases by ${effect[1]}`; break
            case 2225: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTo Target and All\nEquivalent Enemies`; break
            case 2226: string+=`Remove ${effect[0]} Strength\nAdd a Void\nto Discard Pile`; break
            case 2227: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Block\nto a Random Enemy`; break
            case 2228: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nApply ${effect[1]} Weak\nPer Unblocked Hit`; break
            case 2229: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nLose ${effect[1]} Temporary\nStrength Next Turn`; break
            case 2230: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple if\nYou Have 5 Energy`; break
            case 2231: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Triple if\nYou Have 5 Energy`; break
            case 2232: string+=`Add Any Random\n${effect[0]} 2 Cost Card${effect[0]!=1?`s`:``}\nof Equivalent Level\nto Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 2233: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if 2 or\nLess Attacks in Hand`; break
            case 2234: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n5 Cards in Hand:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2235: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nBoth Increase by ${effect[2]}\nPermanently`; break
            case 2236: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nWhen Selectively\nDiscarded,\nDeal ${this.calculateEffect(effect[2],0)} Damage\nto All Enemies`; break
            case 2237: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\n${effect[1]!=1?`They Cost`:`It Costs`} 1 Less\nTemporarily`; break
            case 2238: string+=`Draw ${effect[0]+effect[1]} Card${(effect[0]+effect[1])!=1?`s`:``}\nThe First ${effect[1]!=1?`${effect[1]}\nCost`:`One\nCosts`} 1 Less\nTemporarily`; break
            case 2239: string+=`Gain ${effect[0]} Currency\nAdd a Random Common\nCard of Equivalent\nLevel to Hand`; break
            case 2240: string+=`Put a Card in Discard\nPile in Your Hand\nAdd a Random Common\nCard of Equivalent\nLevel to Hand`; break
            case 2241: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nAdd X Random Common\nCards of Equivalent\nLevel to Hand`; break
            case 2242: string+=`Take Another Turn\nand Exhaust\nWhen Selectively\nDiscarded`; break
            case 2243: string+=`Put a Card in Discard\nPile in Your Hand\nAll Cards Cost 0\nTemporarily`; break
            case 2244: string+=`When Drawn,\nDraw ${effect[0]} More\nCard${pl(effect[0])} Next Turn\nWhen Selectively\nDiscarded,\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 2245: string+=`Transforms and Costs 0\nWhen Retained`; break
            case 2246: string+=`Put The First ${effect[0]}\nCard${pl(effect[0])} in Discard\nInto Hand`; break
            case 2247: string+=`Exhaust All\nAttacks in Hand\nGain ${effect[0]} Regeneration\nPer Attack Discarded`; break
            case 2248: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nRepeat if\nTarget Will Attack`; break
            case 2249: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number of\nUnique Debuffs on Target`; break
            case 2250: string+=`Apply ${effect[0]} Vulnerable\nApplies Double if\nAnother Enemy is\nAdjacent to Target`; break
            case 2251: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],3)} Block\nWhere X = Hand Size`; break
            case 2252: string+=`Add ${effect[0]} Shiv${pl(effect[0])} to Hand\nWhen You Gain\n8 or More Block`; break
            case 2253: string+=`Target Gains\nIndefinite Frail`; break
            case 2254: string+=`Blocked Damage\nTaken Heals You\nThis Turn`; break
            case 2255: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nA Random Strike in\nHand Costs 0`; break
            case 2256: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nA Random Defend in\nHand Costs 0`; break
            case 2257: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf Your Block\nIs Broken This Turn,\nDeal ${effect[1]} Splash Damage`; break
            case 2258: string+=`Add Block Next Turn\nEqual to Your\nCurrent Block`; break
            case 2259: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Metallicize`; break
            case 2260: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturn ${effect[1]} 0 Cost Card${pl(effect[1])}\nFrom Discard`; break
            case 2261: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 When\nYou Use an Item`; break
            case 2262: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Cost Cards\nin Hand Cost 1`; break
            case 2263: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDraw ${effect[1]} More if You\nHave Played At Least\n${effect[2]} Cards This Turn`; break
            case 2264: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nD3 Times`; break
            case 2265: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have At Least\n5 Exhausted Cards${stage.scene=='battle'&&this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].exhaust.cards.length})`:``}`; break
            case 2266: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nHeal ${this.calculateEffect(effect[1],4)} Health\nLose 1 HP Per Turn\nFor ${effect[2]} Turn${pl(effect[2])}`; break
            case 2267: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nIf You Have Block,\nGain ${effect[1]} Dexterity`; break
            case 2268: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen You Play\na 2 Cost Card`; break
            case 2269: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\nGain ${effect[1]} Energy\nIf You Have Shock`; break
            case 2270: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target Has 2 or\nMore Unique Statuses`; break
            case 2271: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAt Least 1 Unplayable\nCard in Hand:\nApply ${effect[1]} Jinx`; break
            case 2272: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Below 25% Health:\nNext ${effect[1]!=1?`${effect[1]} `:``}Attack${pl(effect[1])}\nDeal${effect[1]==1?`s`:``} Double Damage`; break
            case 2273: string+=`Remove All\nBlock of Target\nIf it Had Block,\nApply ${effect[0]} Stun`; break
            case 2274: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nA Random Card in\nHand Costs 0\nand Exhausts`; break
            case 2275: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 2276: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nDraw and Upgrade\n${effect[1]} Card${pl(effect[1])}`; break
            case 2277: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\n50%: Apply ${effect[1]} Weak\n50%: Apply ${effect[2]} Vulnerable\n50%: Apply ${effect[3]} Frail`; break
            case 2278: string+=`When You Heal,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy`; break
            case 2279: string+=`Add ${effect[0]} Shiv${pl(effect[0])} to Hand\nAll Shivs in Hand\nDeal ${effect[1]} More Damage`; break
            case 2280: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Paradigm Shift\nof Equivalent Level\nto Hand`; break
            case 2281: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Control`; break
            case 2282: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nDraw ${effect[1]} Card${pl(effect[1])}\nOtherwise,\nGain ${effect[2]} Energy`; break
            case 2283: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily\nIncreases by ${effect[1]}`; break
            case 2284: string+=`Evoke All Orbs\nDraw ${effect[0]} Card${pl(effect[0])}\nHold ${effect[1]} Glass Orb${pl(effect[1])}`; break
            case 2285: string+=`Cards in Hand\nCost Randomly 0 or 1`; break
            case 2286: string+=`${effect[0]>0?`Add ${this.calculateEffect(effect[0],1)} Block`:``}\nUnused Block This\nTurn is Converted\nto Single Damage Up`; break
            case 2287: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nAdd a Comet\nto Draw`; break
            case 2288: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhaust a Card\nFrom Draw`; break
            case 2289: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nRetain Block For\n${effect[1]!=1?effect[1]:``}X Turns`; break
            case 2290: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nEnter Calm`; break
            case 2291: string+=`Exactly Turn 4:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2292: string+=`Gain ${effect[0]} Energy\nAdd a Nightfall\nof Equivalent Level\nto Discard Pile`; break
            case 2293: string+=`Turn 3 or Later:\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 2294: string+=`Turn 8 or Later:\nNext ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Triple Damage`; break
            case 2295: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less Temporary\nWhen Another Card\nis Retained`; break
            case 2296: string+=`Advance Orthogonally\nor Diagonally`; break
            case 2297: string+=`Advance Orthogonally\nor Diagonally\nor Move ${effect[0]} Tile${pl(effect[0])}`; break
            case 2298: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Attack${pl(effect[1])}`; break
            case 2299: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Defense${pl(effect[1])}`; break
            case 2300: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Movement${pl(effect[1])}`; break
            case 2301: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Power${pl(effect[1])}`; break
            case 2302: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nOdd Energy:\nCounter ${effect[1]}`; break
            case 2303: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Strength\nin 2 Turns`; break
            case 2304: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Dexterity\nin 2 Turns`; break
            case 2305: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Hand Size\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2306: string+=`If You Have a\nCost 2+ Card in Hand,\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2307: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain ${effect[1]} Random\nCard${pl(effect[1])} Once`; break
            case 2309: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have No Armor,\nGain ${effect[1]} Armor`; break
            case 2310: string+=`Gain ${effect[0]} Regeneration\nWhen You Take Damage`; break
            case 2311: string+=`Discard ${effect[0]} Card${pl(effect[0])}\nLast Card\nRemaining in Hand:\nGain ${effect[1]} Strength`; break
            case 2312: string+=`Gain ${effect[0]} Energy\nFor Each Power\nin Hand`; break
            case 2313: string+=`When Drawn,\nGain ${effect[0]} Dexterity\nWhen Selectively\nDiscarded,\nGain ${effect[1]} Armor`; break
            case 2314: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nin All Directions`; break
            case 2315: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target is a Minion`; break
            case 2316: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Time${pl(effect[1])}\nDeals Double Damage\nIf Target Has\nAt Least 8 Shock`; break
            case 2317: string+=`Target Receives\nYour Debuffs`; break
            case 2318: string+=`Discard Your Hand\nand Add That Many${effect[0]>0?`+${effect[0]}`:``}\n1-11 of Nothings`; break
            case 2319: string+=`Discard Your Hand\nDraw ${effect[0]} Card${pl(effect[0])}\nNext ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 2320: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAll Enemies\nGain ${effect[1]} Block`; break
            case 2321: string+=`Gain ${effect[0]} Energy\nSlime ${effect[1]} Random Card${pl(effect[1])}`; break
            case 2322: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}\nSlime ${effect[2]} Random Card${pl(effect[2])}`; break
            case 2323: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf You Have Another\nMovement in Hand,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2324: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nOdd Energy:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2325: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Shock`; break
            case 2326: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nEven Turn:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2327: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nOdd Turn:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2328: string+=`Turn 5 or Earlier:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2329: string+=`Turn 5 Or Earlier:\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 2330: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTurn 0:\nTake Another Turn`; break
            case 2331: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOn Turns Divisible by 4`; break
            case 2332: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nand Draw ${effect[2]} Card${pl(effect[2])}\nOn Turns Divisible by 4`; break
            case 2333: string+=`Even Turn:\nGain ${effect[0]} Strength`; break
            case 2334: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} More\nCard${pl(effect[1])} Next Turn\nIf Your Block\nIs Not Broken`; break
            case 2335: string+=`Even Turn:\nGain ${effect[0]} Buffer`; break
            case 2336: string+=`Odd Turn:\nNext ${effect[0]!=1?`${effect[0]} `:``}Card${pl(effect[0])}\nPlayed are Free`; break
            case 2337: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jinx`; break
            case 2338: string+=`Add a Timestamp to\nHand With Current Turn`; break
            case 2339: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPut a Card in Draw\nPile in Your Hand`; break
            case 2340: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nOdd Energy:\nGain ${effect[1]} Energy`; break
            case 2341: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nOdd Energy:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2342: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStraight Left:\nDeal ${this.calculateEffect(effect[1],0)} More`; break
            case 2343: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpward-Right:\nDeal ${this.calculateEffect(effect[1],0)} More`; break
            case 2344: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDownward-Right:\nDeal ${this.calculateEffect(effect[1],0)} More`; break
            case 2345: string+=`Apply ${effect[0]} Freeze\nTarget Takes ${effect[1]}\nDamage Per Card\nPlayed This Turn`; break
            case 2346: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]!=1?effect[1]:``}X\nWhere X = Number of\nCards in Discard`; break
            case 2347: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Upgrade\nThis Card Permamently`; break
            case 2348: string+=`Go to Turn ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2349: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStraight Right:\nGain ${effect[1]} Temporary\nStrength`; break
            case 2350: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpward-Left:\nGain ${effect[1]} Temporary\nStrength`; break
            case 2351: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDownward-Left:\nGain ${effect[1]} Temporary\nStrength`; break
            case 2352: string+=`Existing Cable Cards\nHave 3 Range`; break
            case 2353: case 3420:
                string+=`Cable Cards\nDeal ${effect[0]} More Damage`; break
            case 2354: string+=`Add ${effect[0]} Random\nCable${pl(effect[0])} to Hand`; break
            case 2355: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if Last\nCard Remaining in Hand`; break
            case 2356: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Health\nHealth Lost\nIncreases by ${effect[2]}`; break
            case 2357: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nIf You Have Weak`; break
            case 2358: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nin 2 Turns`; break
            case 2359: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Energy\nin 2 Turns`; break
            case 2360: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Weak`; break
            case 2361: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nRemove ${effect[1]} Fatigue${pl(effect[1])}`; break
            case 2362: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nApply ${effect[1]} Bleed`; break
            case 2363: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nAdd Any ${effect[1]} Random Card${pl(effect[1])}\nWith Random Edition${pl(effect[1])}\nto Hand`; break
            case 2364: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nApply ${effect[1]} Poison`; break
            case 2365: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nAdd ${effect[1]} Tetraphobia${pl(effect[1])} to Hand`; break
            case 2366: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nDraw ${effect[1]} Power${pl(effect[1])}`; break
            case 2367: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nAdd ${effect[1]} Spark${pl(effect[1])}\nto Hand`; break
            case 2368: string+=`Reflect Next Hit Taken\nGain ${effect[0]} Vulnerable`; break
            case 2369: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily\nTarget Takes ${effect[1]}\nDamage Per Card\nPlayed This Turn`; break
            case 2370: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Weak\nIf You Move 2 Tiles`; break
            case 2371: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Weak\nIf You Move 1 Tile`; break
            case 2372: string+=`First ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nAfter The Next One\nDeal${effect[0]==1?`s`:``} Double Damage`; break
            case 2373: string+=`Gain ${effect[0]} Strength\nIn 3 Turns`; break
            case 2374: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nGain ${effect[1]} Control`; break
            case 2375: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Buffer`; break
            case 2376: string+=`Next Movement is Free`; break
            case 2377: string+=`Next Movement is Free\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 2378: string+=`Odd Turn:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2379: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[1],0)} Splash Damage\nIgnore Block`; break
            case 2380: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nRemove its Block`; break
            case 2381: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nA Random Attack\nCosts ${effect[1]} Less`; break
            case 2382: string+=`Move to Any\nEmpty Tile\nGain ${effect[0]} Dodge`; break
            case 2383: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Intangible`; break
            case 2384: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\nClaw Up ${effect[1]}`; break
            case 2385: string+=`Remove ${effect[0]} Fatigue${pl(effect[0])}\nGain ${effect[1]} Shock`; break
            case 2386: string+=`Hold X Random Orbs`; break
            case 2387: string+=`Hold X${effect[0]!=0?`+${effect[0]}`:``} Random Orbs`; break
            case 2388: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStraight Left:\nApply ${effect[1]} Weak`; break
            case 2389: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpward-Right:\nApply ${effect[1]} Vulnerable`; break
            case 2390: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDownward-Right:\nApply ${effect[1]} Frail`; break
            case 2391: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove a Random Buff\nFrom Target`; break
            case 2392: string+=`Discard ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 2393: string+=`Apply ${effect[0]} Shock\nIf Target Already\nHas Shock, Also\nApply ${effect[1]} Poison`; break
            case 2394: string+=`Return ${effect[0]} Random\nCard${pl(effect[0])} From Discard\nto Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 2395: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You Have Shock`; break
            case 2396: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Played or When\nSelectively Discarded`; break
            case 2397: string+=`Add ${effect[0]} Shiv${pl(effect[0])} to Hand\nYou Cannot Gain\nBlock For ${effect[1]} Turn${pl(effect[1])}`; break
            case 2398: string+=`Deal Damage Equal to\nFirst Attack in Hand's\nFirst Value\nDiscard ${effect[0]} Card${pl(effect[0])}`; break
            case 2399: string+=`Cable Cards Can\nBe Used in Their\nOpposing Directions`; break
            case 2400: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You Have Block`; break
            case 2401: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Damage\nIf You Have At Least\n8 Cards in Hand`; break
            case 2402: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen a Strike is Played`; break
            case 2403: string+=`Draw ${effect[0]} Unplayable Card${pl(effect[0])}`; break
            case 2404: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nIf Target Has Shock`; break
            case 2405: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Turns:\nApply ${effect[1]} Weak\nOdd Turns:\nApply ${effect[2]} Vulnerable`; break
            case 2406: string+=`Turn 3 or Earlier:\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 2407: string+=`Next Luck-Based Card\nis Guaranteed\nLose ${effect[0]} Health`; break
            case 2408: string+=`Even Turn:\nAll Cards in Hand\nCost 0 Temporarily`; break
            case 2409: string+=`Odd Turn:\nDraw ${effect[0]} Attack${pl(effect[0])}\nDraw ${effect[1]} Defense${pl(effect[1])}\nDraw ${effect[2]} Movement${pl(effect[2])}\nDraw ${effect[3]} Power${pl(effect[3])}\nThey Cost 0`; break
            case 2410: string+=`If Target Will Attack,\nGain ${effect[0]} Buffer`; break
            case 2411: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Temporary\nDamage Up\nWhen Drawn,\nGain ${effect[2]} Temporary\nDamage Up`; break
            case 2412: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nSee Your Draw\nPile in Order`; break
            case 2413: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nWhen Selectively\nDiscarded,\nDraw ${effect[1]} Card${pl(effect[1])}\nNext Turn`; break
            case 2414: string+=`Add ${effect[0]} Random\nGun${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 1 Less\nGain ${effect[1]} Ammo`; break
            case 2415: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} More\nIf You Have\nAt Least 4 Ammo`; break
            case 2416: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nReturn ${effect[1]} Random Card${pl(effect[1])}\nFrom Discard\nto Hand`; break
            case 2417: string+=`Gain ${effect[0]} Temporary Strength\nIf You Have Block,\nGain ${effect[1]} Strength`; break
            case 2418: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Attack is Free`; break
            case 2419: string+=`Gain ${effect[0]} Energy\nNext Turn\nDraw ${effect[1]} Card${pl(effect[1])}\nCosts ${effect[2]} Less`; break
            case 2420: string+=`If You Have Block,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Block`; break
            case 2421: string+=`When You Play\na 0 Cost Card,\nNext Attack Deals\n${effect[0]} More Damage`; break
            case 2422: string+=`Double Your Next\nBuff or Debuff Received`; break
            case 2423: string+=`Even Turn:\nAdd ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}`; break
            case 2424: string+=`When Removed,\nGain a Relic`; break
            case 2425: string+=`Turn 6 Or Later:\nAdd ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2426: string+=`Powers Cost 1 Less\nand Have Exhaust`; break
            case 2427: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Strength if\nTarget Has More\nHealth Than You`; break
            case 2428: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nChoose a Rare Card\nto Add to Hand`; break
            case 2429: string+=`Gain ${effect[0]} Strength\nUnupgrade Your Hand`; break
            case 2430: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Not Fatal,\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 2431: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n2 or Less\nCards in Hand:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2432: string+=`If Last Card\nRemaining in Hand,\nDraw ${effect[0]} Card${pl(effect[0])}\nAdd ${effect[1]} Miracle${pl(effect[1])}\nto Hand`; break
            case 2433: string+=`Gain ${effect[0]} Vulnerable\nGain ${effect[1]} Energy\nOdd Energy:\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 2434: string+=`Target Loses ${effect[0]} Health\nWhen You Play a Power`; break
            case 2435: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nAdd a Void\nto Discard Pile`; break
            case 2436: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2437: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhaust a Card\nFrom Discard`; break
            case 2438: string+=`Common Attacks\nGain ${effect[0]} Effect`; break
            case 2439: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Random\nCable${pl(effect[1])} to Hand`; break
            case 2440: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Shock`; break
            case 2441: string+=`Discard All Unplayable\nCards in Hand\nTrigger Their Selective\nDiscard Effects`; break
            case 2442: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Missing Energy`; break
            case 2443: string+=`Push 1 Tile\nTurn 2 or Later:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2444: string+=`Trigger Target's Jinx`; break
            case 2445: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has\n20 or More Jinx,\nGain ${effect[1]} Energy`; break
            case 2446: string+=`Make a Card Silver\nPermanently`; break
            case 2447: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nFrom the Bottom\nDiscard ${effect[1]} Card${pl(effect[1])}`; break
            case 2448: string+=`Odd Energy:\nDraw ${effect[0]} Card${pl(effect[0])}\nEven Energy:\nGain ${effect[1]} Energy`; break
            case 2449: string+=`Gain ${effect[0]} Dexterity\nWhen Selectively\nDiscarded, Gain ${effect[1]}\nEnergy Next Turn`; break
            case 2450: string+=`Counter ${effect[0]} All\nWhen Selectively\nDiscarded, Draw ${effect[1]}\nMovement${pl(effect[1])}`; break
            case 2451: string+=`Add ${effect[0]} Random\nMineral Card${pl(effect[0])}\nof Equivalent Level\nto Hand`; break
            case 2452: string+=`Gain ${effect[0]} Jinxheal`; break
            case 2453: case 3419:
                string+=`Mineral Cards\nDeal ${effect[0]} More Damage`; break
            case 2454: string+=`Cards Will Always\nConsider Your Energy\nto Be Odd`; break
            case 2455: string+=`Add ${effect[0]} Random\nSilver Card${pl(effect[0])} to Hand`; break
            case 2456: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nTick Your Own Statuses`; break
            case 2457: string+=`Existing Mineral Cards\nHave 2 Range`; break
            case 2458: string+=`Apply ${effect[0]} Random Debuff\nOdd Energy:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2459: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2460: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy: 10%:\nMake a Card Polychrome\nPermanently`; break
            case 2461: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nAdd Any ${effect[1]} Random\n4 Cost Card${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 2 Less`; break
            case 2464: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Kill All\nEquivalent Enemies`; break
            case 2465: string+=`Apply ${effect[0]} Jinx\nCounter ${effect[1]} All\nWhen Drawn,\nMake ${effect[2]} Cop${effect[2]!=1?`ies`:`y`}`; break
            case 2466: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Burn\nApply ${effect[2]} Freeze`; break
            case 2467: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Buffer`; break
            case 2468: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if Target\nHas Burn and Freeze`; break
            case 2469: string+=`Gain ${effect[0]} Armor\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 2470: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Poison\nDiscards to Hand`; break
            case 2471: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nGain ${effect[2]} Energy\nNext Turn`; break
            case 2472: string+=`Gain ${effect[0]} Energy\nNext Luck-Based Card\nis Guaranteed to Fail`; break
            case 2473: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nGain ${effect[1]} Metal`; break
            case 2474: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nIf You Are Armed`; break
            case 2475: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nRearm From\nAdjacent Tiles`; break
            case 2476: string+=`Apply ${effect[0]} Bleed\nIf Target Already\nHas Bleed, Also\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 2477: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage if\nThis Card Has An Edition`; break
            case 2478: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Shock`; break
            case 2479: string+=`When Drawn,\nGain ${effect[0]} Jinx\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 2480: string+=`When Drawn,\nGain ${effect[0]} Shock\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 2481: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Strength`; break
            case 2482: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Dazed${pl(effect[1])}\nto Draw\nNumber Added\nIncreases by ${effect[2]}`; break
            case 2483: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nin 2 Turns`; break
            case 2484: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts Increases by ${effect[1]}\nPermanently`; break
            case 2485: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Your Deck Has\n20 Cards or Less`; break
            case 2486: string+=`Next Luck-Based Card\nis Guaranteed to Fail`; break
            case 2487: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Luck-Based Card\nis Guaranteed to Fail`; break
            case 2488: string+=`Draw a Card\nMake ${effect[0]} Cop${effect[0]!=1?`ies`:`y`}`; break
            case 2489: string+=`When Selectively\nDiscarded,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto All Enemies\nDiscards to Hand`; break
            case 2490: string+=`Deal ${this.calculateEffect(effect[0],2)} Splash Damage\nWhere X = Total\nHand Cost`; break
            case 2491: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nBecome Confused`; break
            case 2492: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOther Cards in Hand\nCost 1 More`; break
            case 2493: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMake a Card\nCost 1 Less`; break
            case 2494: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMake a Card\nCost 1 More`; break
            case 2495: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nHeal ${this.calculateEffect(effect[1],4)} Health\nDraw ${effect[2]} Attack${pl(effect[2])}\n${effect[2]!=1?`They Cost`:`It Costs`} 2 Less`; break
            case 2496: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Poison\nDraw ${effect[2]} Defense${pl(effect[2])}\n${effect[2]!=1?`They Cost`:`It Costs`} 2 Less`; break
            case 2497: string+=`Deal Damage Equal to\nFirst Attack in Hand's\nFirst Value\nOn Prime Number,\nGain ${effect[0]} Burn`; break
            case 2498: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Cost Cards\nin Hand Cost 3`; break
            case 2499: string+=`Put a Card in Discard\nPile in Your Hand\nBecome Confused`; break
            case 2500: string+=`End Your Turn\nand Exhaust\nWhen Selectively\nDiscarded`; break
            case 2501: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 1 Less\nTemporarily\nIncreases by ${effect[1]}`; break
            case 2502: string+=`Add ${effect[0]} Random\nCable${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 2503: string+=`Choose a Timestamp\nto Add to Hand`; break
            case 2504: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nNext Attack Deals\n${effect[1]} More Damage`; break
            case 2506: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n50%: Deal ${this.calculateEffect(effect[1],0)} Damage\nHeal ${this.calculateEffect(effect[2],4)} Health\n50%: Deal ${this.calculateEffect(effect[3],0)} Damage\nAdd ${this.calculateEffect(effect[4],1)} Block`; break
            case 2507: string+=`Damage Dealt Next ${effect[0]}\nTurn${pl(effect[0])} Converts to\nCurrency`; break
            case 2508: string+=`Damage Taken Next ${effect[0]}\nTurn${pl(effect[0])} Converts to\nCurrency`; break
            case 2509: string+=`Heal ${this.calculateEffect(effect[0],9)} Health\nWhere X = Hand Size\nDiscard Your Hand`; break
            case 2510: string+=`When Drawn,\nHeal ${this.calculateEffect(effect[0],4)} Health`; break
            case 2511: string+=`When Drawn,\nHeal ${this.calculateEffect(effect[0],4)} Health\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 2512: string+=`25%:\nEdition a Card`; break
            case 2513: string+=`40%:\nEdition a Card`; break
            case 2514: string+=`50%:\nEdition a Card`; break
            case 2515: string+=`Upgrade a Random Card\nPermanently\nMay Deluxe Upgrade`; break
            case 2516: string+=`Add Any ${effect[0]} Random\nCard${pl(effect[0])}\nof Equivalent Level\nto Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 1 Less`; break
            case 2517: string+=`All Cards in Hand\nCost ${effect[0]} Less\nTemporarily\nand are Ethereal`; break
            case 2518: string+=`Every Turn, a Random\nCard Costs ${effect[0]} Less`; break
            case 2519: string+=`Your Cable Cards\nCost 0`; break
            case 2520: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Random\nCable${pl(effect[1])} to Hand`; break
            case 2521: string+=`25%: Deal ${this.calculateEffect(effect[0],0)} Damage\n25%: Add ${this.calculateEffect(effect[1],1)} Block`; break
            case 2522: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Weak if\nTarget Has More\nHealth Than You`; break
            case 2523: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Armor\n2 Cost Attacks in Hand\nCost 0 Temporarily`; break
            case 2524: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nExhaust ${effect[1]} Card${pl(effect[1])}\n2 Cost Defenses in Hand\nCost 0 Temporarily`; break
            case 2525: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Removed, Double\nUpgrade a Random\nUpgraded Card in Deck`; break
            case 2526: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Removed, a\nRandom Card in Deck\nBecomes Polychrome`; break
            case 2527: string+=`Remove a Random\nCard From Deck\nAdd ${effect[0]} Random Common\nCard${pl(effect[0])} With Random\nEditions to Deck`; break
            case 2528: string+=`Remove a Random\nCard From Deck\nAdd ${effect[0]} Random Uncommon\nCard${pl(effect[0])} With Random\nEditions to Deck`; break
            case 2529: string+=`Remove a Random\nCard From Deck\nAdd ${effect[0]} Random Rare\nCard${pl(effect[0])} With Random\nEditions to Deck`; break
            case 2530: string+=`Choose an Attack\nWith an Edition\nFrom Any Character\nto Add to Deck`; break
            case 2531: string+=`Choose a Defense\nWith an Edition\nFrom Any Character\nto Add to Deck`; break
            case 2532: string+=`Choose a Movement\nWith an Edition\nFrom Any Character\nto Add to Deck`; break
            case 2533: string+=`Choose a Power\nWith an Edition\nFrom Any Character\nto Add to Deck`; break
            case 2534: string+=`${effect[0]!=1?effect[0]:`A`} Random Card${pl(effect[0])} in Deck\nGets ${effect[0]==1?`a `:``}Random Edition${pl(effect[0])}`; break
            case 2535: string+=`Add a Random\nMythic Card of Equivalent\nLevel to Deck`; break
            case 2536: string+=`All Cards in Hand\nCost 1 Permanently`; break
            case 2537: string+=`All Cards in Hand\nBecome a Singular\nNew Color`; break
            case 2538: string+=`Remove ${effect[0]} Random\nCard${pl(effect[0])} in Deck\nGain ${effect[1]} Currency`; break
            case 2539: string+=`Remove a Random\nCard From Deck\nDuplicate a Card\nPermanently`; break
            case 2540: string+=`Remove a Random\nCard From Deck\nMake a Card Polychrome\nPermanently`; break
            case 2541: string+=`Remove a Random\nCard From Deck\nMake a Card Negative\nPermanently`; break
            case 2542: string+=`Make 2 Copies\nof a Common Card\nPermanently`; break
            case 2543: string+=`Remove All Buffs\nof All Enemies`; break
            case 2544: string+=`Make Something Free\nat the Next Shop`; break
            case 2545: string+=`Move to Any\nEmpty Tile\nRandomly Move All\nOther Combatants`; break
            case 2546: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Boss Defeated`; break
            case 2547: string+=`Apply ${effect[0]} Freeze\nto All Enemies${effect[0]==effect[1]?``:`\nApplies Only ${effect[1]}\nWhen an Enemy Dies\nWhile This Card\nis in Your Hand`}`; break
            case 2548: string+=`Copy a Random\nItem You Have`; break
            case 2549: string+=`Have Perfect\nLuck This Combat`; break
            case 2550: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Your Deck Has\n50+${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].deck.cards.length})`:``} Cards`; break
            case 2551: string+=`When Drawn,\nAdd ${effect[0]} Shiv${pl(effect[0])} to Hand\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 2552: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nWhen There is an Empty\nTile Spot Behind You\nPush 1 Tile`; break
            case 2553: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n2 Times`; break
            case 2554: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nYou Use an Item`; break
            case 2555: string+=`Make a Card Foil\nand Duplicate it\n2 Times Permanently`; break
            case 2556: string+=`Return Last Removed\nCard to Deck`; break
            case 2557: string+=`A Random Card in\nDeck Costs ${effect[0]} Less\nPermanently`; break
            case 2558: string+=`Even X:\nNext ${effect[0]!=1?effect[0]:``}X${effect[2]!=0?`${effect[2]>0?`+`:``}${effect[2]}`:``} Attacks\nDeal Double Damage\nOdd X:\nGain ${effect[1]!=1?effect[1]:``}X${effect[3]!=0?`${effect[3]>0?`+`:``}${effect[3]}`:``} Conditioning`; break
            case 2559: string+=`Even Turn:\nNext ${effect[0]!=1?effect[0]:``}X${effect[2]!=0?`${effect[2]>0?`+`:``}${effect[2]}`:``} Attacks\nDeal Double Damage\nOdd Turn:\nGain ${effect[1]!=1?effect[1]:``}X${effect[3]!=0?`${effect[3]>0?`+`:``}${effect[3]}`:``} Conditioning`; break
            case 2560: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nApply ${effect[1]} Weak\nin All Directions`; break
            case 2561: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Not Fatal,\nAdd 2 Dazed\nto Draw`; break
            case 2562: string+=`Add ${effect[0]} Random\nCard${pl(effect[0])} of Any Group\nto Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 2563: string+=`Discard ${effect[0]} Card${pl(effect[0])}\nCreate 2 Copies of ${effect[0]!=1?`Them`:`it`}`; break
            case 2564: string+=`Deal Double Damage\nUntil You Get Hit`; break
            case 2565: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nRemove a Random\nDebuff`; break
            case 2566: string+=`Choose a Card That\nCosts Your Energy\nto Add to Hand`; break
            case 2567: string+=`If You Have 20+ Block,\nNext ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage`; break
            case 2568: string+=`Increase All Damage\nDealt By ${effect[0]}\nIncrease All Damage\nTaken by ${effect[1]}`; break
            case 2569: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Below 25% Health:\nGain ${effect[1]} Energy`; break
            case 2570: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nBelow 50% Health:\nApply ${effect[1]} Vulnerable`; break
            case 2571: string+=`Gain an Item Slot`; break
            case 2572: string+=`Gain ${effect[0]} Energy\nDrink Item${pl(effect[0])}`; break
            case 2573: string+=`Add Block Equal to\nNumber of Unique Cards\nin Your Deck${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].deck.uniqueNumber()})`:``}`; break
            case 2574: string+=`Discard Your Hand\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 2575: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nWhen Added, Add\nNormality to Deck`; break
            case 2576: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target Has\nLess Health Than You`; break
            case 2577: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Glass\nShard Item${pl(effect[1])}`; break
            case 2578: string+=`When Drawn,\nGain an Item`; break
            case 2579: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nChoose a 2 Cost Card\nto Add to Hand`; break
            case 2580: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Exhausted,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2581: string+=`Gain ${effect[0]} Control\nWhen Selectively\nDiscarded, Gain ${effect[1]}\nRandom Buff`; break
            case 2582: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Strength if\nYour Deck Contains\n30 or More Cards`; break
            case 2583: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 3 Edicts\nPlayed${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].hand.playedSpecific[1]%3})`:``},\nDeals Double Damage`; break
            case 2584: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Not Attack,\nGain ${effect[1]} Control`; break
            case 2585: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target Has\nMore Health Than You`; break
            case 2586: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has\nLess Health Than You,\nGain ${effect[1]} Energy`; break
            case 2587: string+=`Gain ${effect[0]} Bottled\nFairy Item${pl(effect[0])}`; break
            case 2588: string+=`Deal Damage Equal to\nHalf Your Block\nAdd Block Next Turn\nEqual to Half Your Block\nLose All Block`; break
            case 2589: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Strength if\nYour Deck Contains\n30 or More Cards`; break
            case 2590: string+=`Gain ${effect[0]} Armor\nGain ${effect[1]} Frail\nGain ${effect[2]} Control`; break
            case 2591: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain an Item`; break
            case 2592: string+=`Gain ${effect[0]} Molten\nMetal Item${pl(effect[0])}`; break
            case 2593: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrades Repeatedly\nby ${effect[1]}`; break
            case 2594: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nUpgrades Repeatedly\nby ${effect[1]}`; break
            case 2595: string+=`Apply ${effect[0]} Burn\nUpgrades Repeatedly\nby ${effect[1]}`; break
            case 2596: string+=`Apply ${effect[0]} Freeze\nUpgrades Repeatedly\nby ${effect[1]}`; break
            case 2597: string+=`Apply ${effect[0]} Shock\nUpgrades Repeatedly\nby ${effect[1]}`; break
            case 2598: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nUpgrades Repeatedly\nby ${effect[1]}`; break
            case 2599: string+=`Gain ${effect[0]} Random\nTemporary Item${pl(effect[0])}`; break
            case 2600: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Random\nTemporary Item${pl(effect[1])}`; break
            case 2601: string+=`Fill All Item Slots\nWith Temporary Items`; break
            case 2602: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Target Tile\nHas an Effect,\nGain ${effect[1]} Energy`; break
            case 2603: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} More\nCard${pl(effect[1])} Next Turn`; break
            case 2604: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAbove 75% Health:\nGain ${effect[1]} Energy`; break
            case 2605: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDamage Doubles After\nEach Boss is Defeated`; break
            case 2606: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}\nAfter This One`; break
            case 2607: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}\nAfter This One`; break
            case 2608: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}\nAfter This One`; break
            case 2609: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard All Movements\nDraw a Card For\nEach Card Discarded`; break
            case 2610: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 2611: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}\nPush 1 Tile`; break
            case 2612: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nYou Cannot Move`; break
            case 2613: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nTarget Cannot Move`; break
            case 2614: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext ${effect[1]!=1?`${effect[1]} `:``}Attack${pl(effect[1])}\nDeal${effect[1]==1?`s`:``} Double Damage`; break
            case 2615: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRemove Self\nFreeze and Burn`; break
            case 2616: string+=`1 or Less\nNon-Defense in Hand:\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 2617: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n2 Times\nDecreases by ${effect[1]}`; break
            case 2618: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nApply ${effect[1]} Random\nDebuff to Self`; break
            case 2619: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nApply ${effect[1]} Random\nDebuff to Self\nApply ${effect[2]}\nRandom Debuff to Self`; break
            case 2620: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nTarget Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 2621: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy if\nYou Cannot Move`; break
            case 2622: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n5+ Balance:\nGain ${effect[1]} Energy`; break
            case 2623: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSet Balance to 9`; break
            case 2624: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\n${effect[1]} Balance`; break
            case 2625: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust a Card\nFrom Draw`; break
            case 2626: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nApply ${effect[0]} Bleed`; break
            case 2627: string+=`Remove All\nBlock of Target\nApply ${effect[0]} Bleed`; break
            case 2628: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nDisarm`; break
            case 2629: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nDisarm on Own Tile`; break
            case 2630: string+=`Apply ${effect[0]} Bleed\nApply ${effect[1]} Bleed\nin 2 Turns`; break
            case 2631: string+=`Upgrade All\nConcoctions in Hand`; break
            case 2632: string+=`Retain All\nConcoctions in Hand\nUntil Played`; break
            case 2633: string+=`Add a Random\nConcoction of Equivalent\nLevel to Hand and\nRetain it Until Played`; break
            case 2634: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nChoose a Concoction\nto Add to Hand`; break
            case 2635: string+=`Upgrade a Random\nConcoction in Hand\n${effect[0]} Time${pl(effect[0])}`; break
            case 2636: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have a\nConcoction in Hand`; break
            case 2637: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd a Random\nConcoction to Hand`; break
            case 2638: string+=`Retain ${effect[0]}+X Cards\nWhere X = Number of\nConcoctions in Hand`; break
            case 2639: string+=`Upgrade ${effect[0]}+X Cards\nWhere X = Number of\nConcoctions in Hand`; break
            case 2640: string+=`Next Item Used\nHas Double Effect`; break
            case 2641: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Added, Remove a\nRandom Card From Deck`; break
            case 2642: string+=`Remove All Items\nGain ${effect[0]} Strength Each`; break
            case 2643: string+=`Gain ${effect[0]} Strength\nYou Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}\nAfter This One`; break
            case 2644: string+=`Nobody Can Move\nFor ${effect[0]} Turn${pl(effect[0])}`; break
            case 2645: string+=`When You Can't\nMove on Your Turn,\nAdd ${effect[0]} Shiv${pl(effect[0])}\nto Hand`; break
            case 2646: string+=`2nd Card in Hand:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 2647: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExactly 2 Energy:\nApply ${effect[1]} Burn\nExactly 3 Energy:\nApply ${effect[2]} Freeze`; break
            case 2648: string+=`Deal ${effect[0]!=1?effect[0]:``}X Damage\nWhere X = Number of\nShivs in Hand${effect[1]!=0?` +${effect[1]}`:``}`; break
            case 2649: string+=`Apply ${effect[0]!=1?effect[0]:``}X Bleed`; break
            case 2650: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if\nYou Have Bleed`; break
            case 2651: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block\nIf Target Has Block,\nApply ${effect[1]} Bleed`; break
            case 2652: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nApply ${effect[1]} Bleed`; break
            case 2653: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\n2 Times\nBoth Decrease to 0`; break
            case 2654: string+=`Apply ${effect[0]} Bleed\n3 Tiles Wide\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2655: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nDisarm`; break
            case 2656: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More\nIf You Are Unarmed`; break
            case 2657: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPierces Up to 2 Targets\nAdd ${this.calculateEffect(effect[1],1)} Block Per Hit`; break
            case 2658: string+=`Move to Any\nEmpty Tile\nDisarm`; break
            case 2659: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDisarm Between Own\nTile and Target Tile`; break
            case 2660: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Are Disarmed,\nGain ${effect[1]} Strength`; break
            case 2661: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],15)}Balance\nBlock`; break
            case 2662: string+=`Exactly 0 Energy:\nApply ${effect[0]} Bleed\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 2663: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Damage\nIf You Have Dodge\nAdvance`; break
            case 2664: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nRearm From Target Tile`; break
            case 2665: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDecreases by ${effect[1]}\nGain ${effect[2]} Energy\nNext Turn`; break
            case 2666: string+=`50%: Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrades Repeatedly\nby ${effect[1]}`; break
            case 2667: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Vision\nIf You Have\nNo Awakening`; break
            case 2668: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRewind ${effect[1]} Card${pl(effect[1])}\nElemental Form:\nAdds ${this.calculateEffect(effect[2],14)} More`; break
            case 2669: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} History`; break
            case 2670: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} History`; break
            case 2671: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDrawn 2+ Times: (${this.drawn})\nDeals Double Damage`; break
            case 2672: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDrawn 2+ Times: (${this.drawn})\nDeal ${this.calculateEffect(effect[1],0)} Damage\nin All Directions`; break
            case 2673: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}\nRewound:\nTrigger Effect And Exhaust`; break
            case 2674: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain Energy Equal\nto Your Awakening`; break
            case 2675: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nWhere X = Knowledge\nRewound:\nGain ${effect[2]} Knowledge`; break
            case 2676: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Refreshed\nto Hand\nElemental Form:\nAdd Another Refreshed`; break
            case 2677: string+=`Gain ${effect[0]} History\nElemental Form:\nApply ${effect[1]} Weak\nto All Enemies`; break
            case 2678: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])} if\nYou Have Knowledge\nDraw ${effect[2]} Card${pl(effect[2])} if\nYou Have History`; break
            case 2679: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Strength\nRewind a Card\nFrom Discard Pile`; break
            case 2680: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRewind a Card\nFrom Discard Pile\nElemental Form:\nDouble Upgrade it\nTemporarily`; break
            case 2681: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nElemental Form:\nDeals Triple Damage`; break
            case 2682: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRewound:\nTrigger Effect`; break
            case 2683: string+=`Gain ${effect[0]} Vision\nElemental Form:\nGain ${effect[1]} Dexterity`; break
            case 2684: string+=`Add ${effect[0]} Refreshed${pl(effect[0])}\nto Hand\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 2685: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Knowledge\nGain ${effect[1]} Knowledge if\nYou Have 2 or Less`; break
            case 2686: string+=`Gain ${effect[0]} Vision\nElemental Form:\nGain ${effect[1]} Strength`; break
            case 2687: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nRewind ${effect[1]} Card${pl(effect[1])}\nGain ${effect[2]} Vision`; break
            case 2688: string+=`History Damages\nAll Enemies`; break
            case 2689: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} History\nElemental Form:\nRetain Block For ${effect[2]} Turn ${pl(effect[2])}\nRetain History For ${effect[3]} Turn ${pl(effect[3])}`; break
            case 2690: string+=`Rewind Your Hand\nGain ${effect[0]} Vision Each\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2691: string+=`Gain ${effect[0]} Knowledge\nElemental Form:\nGain ${effect[1]} Wisdom`; break
            case 2692: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nRewound:\nIncreases by ${effect[1]}`; break
            case 2693: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nGain ${effect[2]} Wisdom`; break
            case 2694: string+=`When Drawn,\nAdd ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} History`; break
            case 2695: string+=`Gain ${effect[0]} Wisdom if\nYou Have 1 or Less\nRewind ${effect[1]} Card${pl(effect[1])} to\nthe Top of Draw Pile\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 2696: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nElemental Form:\nApply ${effect[1]} Stun`; break
            case 2697: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRewind ${effect[1]} Card${pl(effect[1])}\nElemental Form:\nGain ${effect[2]} Energy`; break
            case 2698: string+=`Gain ${effect[0]} Vision\nRewind Any Number\nof Cards`; break
            case 2699: string+=`Gain ${effect[0]} History\nEvery Turn`; break
            case 2700: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Knowledge\nin All Directions\nElemental Form:\nRepeat`; break
            case 2701: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Knowledge\nElemental Form:\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 2702: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Target is Hit,\nAttacker Gains ${effect[1]} Vision`; break
            case 2703: string+=`Gain X${effect[0]!=0?`+${effect[0]}`:``} Vision\nWhere X = Hand Size`; break
            case 2704: string+=`Gain ${effect[0]!=1?effect[0]:``}X Temporary\nStrength Where\nX = Your Knowledge`; break
            case 2705: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nElemental Form:\nApply ${effect[2]} Vulnerable`; break
            case 2706: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nFor Every 3\nCards Rewound`; break
            case 2707: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nFor Every 2\nCards Rewound`; break
            case 2708: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Card Rewound`; break
            case 2709: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRewind ${effect[1]} Card${pl(effect[1])}`; break
            case 2710: string+=`Gain ${effect[0]} Knowledge\nDraw ${effect[1]} Card${pl(effect[1])} and\nRewind ${effect[2]} Card${pl(effect[2])}\nEvery Turn`; break
            case 2711: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nElemental Form:\nGain ${effect[1]} Strength`; break
            case 2712: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain ${effect[1]} Energy\nand Add a Copy of This\nCard to Your Hand`; break
            case 2713: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAt Least ${effect[1]} History:\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 2714: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nGain ${effect[1]!=1?effect[1]:``}X History\nWhere X = Number\nof Enemies`; break
            case 2715: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nRewind ${effect[1]} Card${pl(effect[1])}\nAdd a Disappointed\nto Hand`; break
            case 2716: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Disappointed\nto Hand\nElemental Form:\nAdd a Refreshed Instead`; break
            case 2717: string+=`Put a Card in Draw\nPile in Your Hand\nElemental Form:\nUpgrade It`; break
            case 2718: string+=`Set Your Knowledge\nand History to the\nHigher of the Two`; break
            case 2719: string+=`Apply ${effect[0]} Weak\nIf Target Will Attack,\nApply ${effect[1]} Vulnerable`; break
            case 2720: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Drawn,\nCosts 1 Less`; break
            case 2721: string+=`Exhuast Non-Attacks\nAdd ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number of\nCards Exhausted\nElemental Form:\nAdds Double Block`; break
            case 2722: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Knowledge\nDeals Double Damage if\nX is 6 or More`; break
            case 2723: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStatus in Hand:\nExhaust It\nGain ${effect[1]} Knowledge`; break
            case 2724: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nStatus in Hand:\nExhaust It\nGain ${effect[1]} Energy`; break
            case 2725: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf Last Card is an Attack,\nDeal ${this.calculateEffect(effect[2],10)} More`; break
            case 2726: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nIf Last Card is a Defense,\nAdd ${this.calculateEffect(effect[2],14)} Block`; break
            case 2727: string+=`Gain ${effect[0]} Max Health\nGain Indefinite Weak\nGain Indefinite Vulnerable`; break
            case 2728: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Wisdom\nElemental Form:\nAdd ${this.calculateEffect(effect[2],1)} Block`; break
            case 2729: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Cards Rewound\nThis Turn${effect[1]>0?` +${effect[1]}`:``}`; break
            case 2730: string+=`Remove All\nBlock of Target\nDeal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],13)}X Damage\nWhere X = Knowledge`; break
            case 2731: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy\nGain ${effect[1]} Vision\nElemental Form:\nRepeat 3 More Times`; break
            case 2732: string+=`When Drawn,\nGain ${effect[0]} History\nRewound:\nTrigger Effect`; break
            case 2733: string+=`Apply ${effect[0]} Weak\nElemental Form:\nGain ${effect[1]} Strength`; break
            case 2734: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage ${effect[1]} Time${pl(effect[1])}\nGain ${effect[2]} Knowledge\nElemental Form:\nGain ${effect[3]} Wisdom`; break
            case 2735: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Vision\nElemental Form:\nRewind Self\nAnd Costs 0`; break
            case 2736: string+=`Rewound Cards\nCost 1 Less\nUntil Played`; break
            case 2737: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Strength\nPermanently`; break
            case 2738: string+=`Exhaust Your Hand\nGain ${effect[0]} Knowledge\nRemove All of\nYour Debuffs`; break
            case 2739: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nRemove ${effect[2]} Fatigue${pl(effect[2])}`; break
            case 2740: case 4123:
                string+=`Scry ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2741: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Bleed`; break
            case 2742: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Refreshed${pl(effect[1])}\nto Hand`; break
            case 2743: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nRewind ${effect[1]} Card${pl(effect[1])}`; break
            case 2744: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nIf You Have Block`; break
            case 2745: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nElemental Form:\nGain ${effect[1]} Energy`; break
            case 2746: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2747: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Vision`; break
            case 2748: string+=`Move to Any\nEmpty Tile\nElemental Form:\nGain ${effect[0]} Awakening`; break
            case 2749: string+=`Move to Any\nEmpty Tile\nLose ${effect[0]} Health`; break
            case 2750: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nStraight Left:\nGain ${effect[1]} Knowledge`; break
            case 2751: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nStraight Right:\nGain ${effect[1]} History`; break
            case 2752: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nElemental Form:\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2753: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n8 or More\nCards in Hand:\nGain ${effect[1]} Energy`; break
            case 2754: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nYou Play a Movement`; break
            case 2755: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nYou Play a Power`; break
            case 2756: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Vulnerable`; break
            case 2757: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nElemental Form:\nGain ${effect[1]} Dodge`; break
            case 2758: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Card Played\nReturns to the\nTop of Draw Pile`; break
            case 2759: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLose All Vision`; break
            case 2760: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${effect[1]} Disappointed${pl(effect[1])}\nto Hand`; break
            case 2761: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nTrigger Your History\n${effect[1]} Time${pl(effect[1])}`; break
            case 2762: string+=`Move to Any\nEmpty Tile\nEnd Your Turn`; break
            case 2763: string+=`Move to Any Tile\nSwap With its\nOccupants\nEnd Your Turn`; break
            case 2764: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext Card Played\nReturns to the\nTop of Draw Pile`; break
            case 2765: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nUpgrade ${effect[1]} Random\nCard${pl(effect[1])} in Hand`; break
            case 2766: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Strength\nTarget Gains ${effect[1]} Strength`; break
            case 2767: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have More\nEnergy Than Normal,\nGain ${effect[1]} Energy`; break
            case 2768: string+=`Double Your Energy\nLose ${effect[0]} Energy\nNext Turn`; break
            case 2769: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRewind a Card\nFrom Discard Pile\nIt Costs 1 Less`; break
            case 2770: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nWhen Exhausted,\nGain ${effect[2]} Energy`; break
            case 2771: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nIf You Have Block`; break
            case 2772: string+=`If You Have Block,\nCounter ${effect[0]} All\nOtherwise,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2773: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nCard Added to Deck`; break
            case 2774: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nHeal ${this.calculateEffect(effect[1],4)} Health\nLose 1 HP Per Turn\nFor ${effect[2]} Turn${pl(effect[2])}`; break
            case 2775: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 When You\nDraw a Card`; break
            case 2776: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nWhen Drawn,\nMake ${effect[1]} Cop${effect[1]!=1?`ies`:`y`}`; break
            case 2777: string+=`Add a Smite\nto Hand\nAdd a Safety\nto Hand`; break
            case 2778: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nAdd ${effect[1]!=1?effect[1]:``}X Dazed\nto Draw`; break
            case 2779: string+=`When Drawn,\nAttacks This Turn\nApply ${effect[0]} Shock`; break
            case 2780: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nUpgrade ${effect[1]} Random\nCard${pl(effect[1])} in Hand`; break
            case 2781: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nTargets a Random\nAdjacent Enemy`; break
            case 2782: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPut a Card in Exhaust\nPile in Your Hand`; break
            case 2783: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Add a\nTrip to Hand\n50%: Add an\nEntrance to Hand`; break
            case 2784: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You Have Played\nMore Than ${effect[1]} Card${effect[1]>0?`s`:``}`; break
            case 2785: string+=`Apply ${effect[0]} Strength\nApply ${effect[1]} Miss`; break
            case 2786: string+=`Apply ${effect[0]} Strength\nApply ${effect[1]} Weak\nApply ${effect[2]} Miss`; break
            case 2787: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nA Random Attack\nin Hand Deals\n${effect[1]} More Damage`; break
            case 2788: string+=`A Random Card in\nDraw Pile Costs 0`; break
            case 2789: string+=`Draw and Staple\n${effect[0]} Card${pl(effect[0])}`; break
            case 2790: string+=`Retain ${effect[0]} Card${pl(effect[0])} Once\nAdd ${this.calculateEffect(effect[1],1)} Block\nNext Turn`; break
            case 2791: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Exhausted,\nGain ${effect[1]} Strength`; break
            case 2792: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Triple Damage\nNext Card Played\nReturns to the\nTop of Draw Pile`; break
            case 2793: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Double Block\nIf You Have Another\nInnate Card in Hand`; break
            case 2794: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2795: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust The Center\nCard(s) in Hand`; break
            case 2796: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nBecome Confused`; break
            case 2797: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nConfuse a Random\nCard in Hand`; break
            case 2798: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf Last Card\nContains 'Strike',\nGain ${effect[2]} Energy`; break
            case 2799: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nWhere X = Strength`; break
            case 2800: string+=`Choose The Target's\nIntent This Turn`; break
            case 2801: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Mundane\nDust Item${pl(effect[1])}`; break
            case 2802: string+=`The Next Set of Skipped\nNormal Card Rewards\nAre Removed From\nthe Pool Permanently`; break
            case 2803: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Miracle Played`; break
            case 2804: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nWhen Drawn,\nCosts 1 Less`; break
            case 2805: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nRemove Effects on\nOwn Tile`; break
            case 2806: string+=`Gain Strength Equal to\nTarget's Strength${effect[0]!=0?` +${effect[0]}`:``}`; break
            case 2807: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nCounter ${effect[2]}+${effect[3]!=1?`${effect[3]}`:``}X\nWhere X = Strength`; break
            case 2808: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage ${effect[1]} Time${pl(effect[1])}\nAdd a Spiked to Hand`; break
            case 2809: string+=`Remove a Card\nPermanently\nLose ${effect[0]} Health`; break
            case 2810: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Not Fatal,\nGain ${effect[1]} Weak`; break
            case 2811: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Played First,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2812: string+=`Add ${effect[0]} Miracle${pl(effect[0])}\nto Hand\nEnd Your Turn`; break
            case 2813: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nApply ${effect[1]} Damage\nTaken Up\nGain ${effect[2]} Dodge\nAdvance`; break
            case 2814: string+=`Gain ${effect[0]} Currency\nGain ${effect[1]} Control`; break
            case 2815: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDeals ${this.calculateEffect(effect[1],10)} More For Each\nStatus Card in Hand`; break
            case 2816: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nIf Target Has Freeze`; break
            case 2817: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Temporary\nStrength For Each\nDodge You Have`; break
            case 2818: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nFatigue in Hand:\nExhaust It\nGain ${effect[1]} Strength`; break
            case 2819: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Below 50% Health:\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2820: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nRetain Block\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 2821: string+=`When Drawn,\nGain ${effect[0]} Mundane\nDust Item${pl(effect[0])}\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 2822: string+=`When Drawn,\nGain ${effect[0]} Vision\nWhen Vanished,\nChoose a Rare Card\nto Add Permanently`; break
            case 2823: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nAdd a Random\nDiscus of Equivalent\nLevel to Hand`; break
            case 2824: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nIgnore Block\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2825: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nIgnore Block\nGain ${effect[1]} Temporary\nStrength`; break
            case 2826: string+=`Gain ${effect[0]} Energy${effect[1]>0?`\nand Draw ${effect[1]} Card${pl(effect[1])}`:``}\nPer Different Color\nCard in Hand`; break
            case 2827: string+=`Gain ${effect[0]} Energy\nReturns to Hand\nAfter Each Turn`; break
            case 2828: string+=`+1: Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\n-3: Take 75% Less\nDamage For ${effect[1]} Turn${pl(effect[1])}\n-7: Gain ${effect[2]} Strength`; break
            case 2829: string+=`+1: Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\n-3: Gain ${effect[1]} Dodge\n-7: Deal ${this.calculateEffect(effect[2],0)} Damage\nApply ${effect[3]} Vulnerable`; break
            case 2830: string+=`+1: Add ${this.calculateEffect(effect[0],1)} Block\n-3: Gain ${effect[1]} Energy\n-7: Gain ${effect[2]} Intangible`; break
            case 2831: string+=`Add the Three\nFairies of Light\nto Draw Pile`; break
            case 2832: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDrawn 2+ Times: (${this.drawn})\nGain ${effect[1]} Energy`; break
            case 2833: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRewound:\nAdd a Stride\nto Hand`; break
            case 2834: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRewound:\nGain ${effect[1]} Vision`; break
            case 2835: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDrawn 2+ Times: (${this.drawn})\nAdds Double Block`; break
            case 2836: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Dexterity\nRewind a Card\nFrom Discard Pile`; break
            case 2837: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nElemental Form:\nIn All Directions`; break
            case 2838: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nEnergy Increases by ${effect[2]}\nPermanently`; break
            case 2839: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nIf X is 4 or More,\nIgnore Block`; break
            case 2840: string+=`Deal Double Damage\nUntil You Play a Power`; break
            case 2841: string+=`Damage Dealt to\nTarget is Rounded Up\nto the Nearest 5`; break
            case 2842: string+=`Damage Dealt to\nTarget is Rounded Up\nto the Nearest 5\nTargets Any Enemy`; break
            case 2843: string+=`Gain ${effect[0]} Random\nTemporary Item${pl(effect[0])}\nAdd a Dazed\nto Draw`; break
            case 2844: string+=`Next Item Used\nHas Double Effect\nLose ${effect[0]} Health`; break
            case 2845: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Caffeine\nPill Item${pl(effect[1])}`; break
            case 2846: string+=`All Items Used\nThis Combat\nGive ${effect[0]} Energy`; break
            case 2847: string+=`Gain ${effect[0]} Currency\nApply ${effect[1]} Strength`; break
            case 2848: string+=`Gain ${effect[0]} Attack\nDust Item${pl(effect[0])}\nGain ${effect[1]} Defense\nDust Item${pl(effect[1])}`; break
            case 2849: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Mystery\nBox Item${pl(effect[1])}`; break
            case 2850: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Salad Item${pl(effect[1])}`; break
            case 2851: string+=`Gain a Random\nTemporary Item\nUse it Immediately`; break
            case 2852: string+=`All Items Used\nThis Combat\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 2853: string+=`Items This Combat\nHave Double Effect`; break
            case 2854: string+=`Damage Dealt to\nTarget Cannot Be\nBelow 10`; break
            case 2855: string+=`Damage Dealt to\nTarget Cannot Be\nBelow 10\nTargets Any Enemy`; break
            case 2856: string+=`Every 10 Damage Dealt\nto Target Converts to\nTemporary Damage Down`; break
            case 2857: string+=`Every 10 Damage Dealt\nto Target Converts to\nTemporary Damage Down\nTargets Any Enemy`; break
            case 2858: string+=`Damage Dealt to\nTarget Above 20\nApplies a Random Debuff`; break
            case 2859: string+=`Damage Dealt to\nTarget Above 20\nApplies a Random Debuff\nTargets Any Enemy`; break
            case 2860: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nNext Item Used\nHas Double Effect`; break
            case 2861: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\nGain ${effect[1]} Random\nTemporary Item${pl(effect[1])}`; break
            case 2862: string+=`All Damage Taken\nis Repeated on\na Random Enemy`; break
            case 2863: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You Have\nFull Item Slots`; break
            case 2864: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You Have No Items`; break
            case 2865: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nWhere X = Items`; break
            case 2866: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nIf You Have\n2 or More Items`; break
            case 2867: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nMake X of Them Free\nWhere X = Items`; break
            case 2868: string+=`Gain ${effect[0]} Random\nTemporary Item${pl(effect[0])}\nEvery Turn`; break
            case 2869: string+=`Gain ${effect[0]} Vision\nElemental Form:\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 2870: string+=`Rewind ${effect[0]} Card${pl(effect[0])}\nElemental Form:\nDraw and Upgrade\n${effect[1]} Card${pl(effect[1])}`; break
            case 2871: string+=`Gain ${effect[0]} Currency\nGains Double Currency\nDuring Elite and\nBoss Combats`; break
            case 2872: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nA Random Concoction\nin Hand Upgrades\nTwice as Rapidly`; break
            case 2873: string+=`When Drawn,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy,\nGain ${effect[1]} Energy,\nand Draw ${effect[2]} Card${pl(effect[2])}`; break
            case 2874: string+=`Add ${effect[0]} Prismatic\nBomb${pl(effect[0])} to Draw Pile`; break
            case 2875: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has Freeze,\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 2876: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Knowledge`; break
            case 2877: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Knowledge`; break
            case 2878: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nCosts 0 When a\nPolychrome Card\nis Played`; break
            case 2879: string+=`Add ${effect[0]} Prismatic\nBomb${pl(effect[0])} to Draw Pile\nAdd a Void\nto Discard Pile`; break
            case 2880: string+=`Build a Shotgun`; break
            case 2881: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Dexterity\nIf You Have\na Construct`; break
            case 2882: string+=`Adjacent Cards Cost 0`; break
            case 2883: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nChoose a Discus\nof Equivalent Level\nto Add to Hand`; break
            case 2884: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nAdd a Dual Discus\nof Equivalent Level\nto Hand`; break
            case 2885: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nAdd ${this.calculateEffect(effect[1],17)} Barrier`; break
            case 2886: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 2887: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nCounter ${effect[1]}`; break
            case 2888: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nGain ${effect[1]} Temporary\nStrength`; break
            case 2889: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You Have Barrier`; break
            case 2890: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nIf You Have Barrier`; break
            case 2891: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nPut a Card in Exhaust\nPile in Your Hand`; break
            case 2892: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Temporary\nStrength`; break
            case 2893: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 2894: string+=`Add ${effect[0]} Dual Discus${effect[0]!=1?`es`:``}\nof Equivalent Level\nto Hand\nThey Cost 1 Less`; break
            case 2895: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nConvert Your Block\nto Barrier`; break
            case 2896: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nRemove ${effect[1]} Fatigue${pl(effect[1])}`; break
            case 2897: string+=`Your Block is\nConverted to Barrier\nThis Combat`; break
            case 2898: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTake Another Turn`; break
            case 2899: string+=`When You Add Barrier,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy`; break
            case 2900: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nScry ${effect[1]}`; break
            case 2901: string+=`Scry ${effect[0]} Each Turn`; break
            case 2902: string+=`Add ${effect[0]} Dual Discus${effect[0]!=1?`es`:``}\nto Hand Each Turn\nIf You Have None`; break
            case 2903: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nGain ${effect[1]} Energy\nPer Discus in Hand`; break
            case 2904: string+=`When Drawn,\nDraw ${effect[0]} More Card${pl(effect[0])}\nEach Turn For 2 Turns`; break
            case 2905: string+=`When Drawn,\nDraw ${effect[0]} More Card${pl(effect[0])}\nEach Turn For 3 Turns`; break
            case 2906: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier`; break
            case 2907: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is an Attack,\nDeal ${this.calculateEffect(effect[2],10)} More`; break
            case 2908: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Defense,\nAdd ${this.calculateEffect(effect[2],14)} Block`; break
            case 2909: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf its Name\nContains 'Strike',\nGain ${effect[2]} Energy`; break
            case 2910: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 2911: string+=`Gain ${effect[0]} Intangible\nAdd ${effect[1]} Dazed${pl(effect[1])}\nto Draw`; break
            case 2912: string+=`Add a Dual Discus\nNext Combat`; break
            case 2913: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Discarded by Scry`; break
            case 2914: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nScry ${effect[1]}`; break
            case 2915: string+=`Draw ${effect[0]} Card${pl(effect[1])}\nDeal ${this.calculateEffect(effect[1],0)} Damage\nFor Each One\nThat is An Attack`; break
            case 2916: string+=`Draw ${effect[0]} Card${pl(effect[1])}\nAdd ${this.calculateEffect(effect[1],1)} Block\nFor Each One\nThat is A Defense`; break
            case 2917: string+=`Scry ${effect[0]}\nCards Discarded\nThis Way Cost 0\nUntil Played`; break
            case 2918: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Dual Discus\nof Equivalent Level\nto Hand`; break
            case 2919: string+=`Deal Damage Equal to\nNumber of Unique Cards\nin Your Deck${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].deck.uniqueNumber()})`:``}`; break
            case 2920: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has\nMore Health Than You,\nGain ${effect[1]} Energy`; break
            case 2921: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nBelow 50% Health:\nGain ${effect[1]} Regeneration`; break
            case 2922: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\nElemental Form:\nTriple Damage Instead`; break
            case 2923: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nDrawn 2+ Times: (${this.drawn})\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 2924: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nElemental Form:\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 2925: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nIf You Have\nFull Item Slots`; break
            case 2926: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nIf You Have No Items`; break
            case 2927: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Movement is Free`; break
            case 2928: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}\nFor Each Other\nMovement in Hand`; break
            case 2929: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],17)} Barrier`; break
            case 2930: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nScry ${effect[1]}`; break
            case 2931: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIncreases by ${effect[1]}\nWhen an Attack is Played\n(Max 3)`; break
            case 2932: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIncreases by ${effect[1]}\nWhen a Defense is Played\n(Max 3)`; break
            case 2933: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIncreases by ${effect[1]}\nWhen a Movement is Played\n(Max 3)`; break
            case 2934: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIncreases by ${effect[1]}\nWhen a Power is Played\n(Max 3)`; break
            case 2935: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdjacent Combatants\nTake ${effect[1]} Damage Per\nCard Played This Turn`; break
            case 2936: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Movement,\nGain ${effect[2]} Energy`; break
            case 2937: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Lose ${effect[1]} Energy\nNext Turn`; break
            case 2938: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n50%: Lose ${effect[1]} Energy\nNext Turn`; break
            case 2939: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nSet Energy to ${effect[1]}`; break
            case 2940: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nIf You Have a\nDiscus in Hand`; break
            case 2941: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nPut a Card in Exhaust\nPile in Your Hand`; break
            case 2942: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpward:\nUpgrade ${effect[1]} Card${pl(effect[1])}\nDownward:\nExhaust ${effect[2]} Card${pl(effect[2])}`; break
            case 2943: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nDraw ${effect[2]} Defense${pl(effect[2])}\n${effect[2]!=1?`They Cost`:`It Costs`} 2 Less`; break
            case 2944: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nWhen Selectively\nDiscarded,\nIncreases by ${effect[1]}`; break
            case 2945: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nPer Adjacent Enemy`; break
            case 2946: string+=`Move to Any\nEmpty Tile\nDraw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 2947: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\n${effect[1]} or Less Currency:\nAdds Double Barrier`; break
            case 2948: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n${effect[1]} or Less Currency:\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 2949: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Exhausted,\nGain ${effect[1]} Currency`; break
            case 2950: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nGain Energy Equal\nto its Cost`; break
            case 2951: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nIf Fatal,\nGain ${effect[1]} Intangible`; break
            case 2952: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n2 Cost Defenses\nin Hand Cost 1`; break
            case 2953: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 Until Played\nWhen Discarded by Scry`; break
            case 2954: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 0 Until Played\nWhen Discarded by Scry`; break
            case 2955: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCosts 0 Until Played\nWhen Discarded by Scry`; break
            case 2956: string+=`Whenever You Scry,\nScry ${effect[0]} More`; break
            case 2957: string+=`Temporary Damage Up\nGiven to You By Freeze\nIs Increased By ${effect[0]}`; break
            case 2958: string+=`Gain ${effect[0]} Energy\nAnd Draw ${effect[1]} Card${pl(effect[1])}\nWhen You Play\na 2+ Cost Card`; break
            case 2959: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Target is\nHit This Turn,\nAttacker Gains ${effect[1]} Barrier`; break
            case 2960: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nCounter ${effect[1]} All`; break
            case 2961: string+=`Set Your Block\nand Barrier to the\nHigher of the Two`; break
            case 2962: string+=`Gain ${effect[0]} Dodge\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 2963: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nGain ${effect[1]} Temporary\nDexterity When Hit\nThis Turn`; break
            case 2964: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nAdd ${effect[1]} Miracle${pl(effect[1])} to Hand`; break
            case 2965: string+=`Add ${effect[0]} Dual Discus${effect[0]!=1?`es`:``}\nof Equivalent Level\nto Hand\nExhaust ${effect[1]} Card${pl(effect[1])}`; break
            case 2966: string+=`Discuses Deal\nMore ${effect[0]} Damage`; break
            case 2967: string+=`Add a Dual Discus\nto Hand That Costs 0\nWhen a Cost 3+\nCard is Played`; break
            case 2968: string+=`All Discuses in Hand\nBecome Foil`; break
            case 2969: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nAdd a Dual Discus\nof Equivalent Level\nto Hand`; break
            case 2970: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nCosts 1 Less\nWhen Discus Played`; break
            case 2971: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is an Attack,\nIt Costs 0 Temporarily`; break
            case 2972: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Defense,\nIt Costs 0 Temporarily`; break
            case 2973: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Movement,\nIt Costs 0 Temporarily`; break
            case 2974: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nScry ${effect[1]}\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 2975: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}\nAdd a Defocus\nto Discard Pile`; break
            case 2976: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Your Barrier`; break
            case 2977: string+=`Target Takes ${effect[0]}\nDamage Per Card\nPlayed This Turn\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Power,\nTarget Takes ${effect[2]} More`; break
            case 2978: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nTarget Takes ${effect[1]}\nDamage Per Card\nPlayed This Turn`; break
            case 2979: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is an Attack,\nGain ${effect[2]} Strength`; break
            case 2980: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Defense,\nGain ${effect[2]} Dexterity`; break
            case 2981: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDeal ${this.calculateEffect(effect[1],0)} Damage\nIf it is an Attack\nDeal ${this.calculateEffect(effect[2],0)} Block\nIf it is a Defense`; break
            case 2982: string+=`Gain ${effect[0]} Currency\nScry ${effect[1]}`; break
            case 2983: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is an Attack,\nDeal ${this.calculateEffect(effect[2],10)} More`; break
            case 2984: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Strength\nIf it is An Attack\nGain ${effect[2]} Dexterity\nIf it is An Defense`; break
            case 2985: string+=`Exhaust ${effect[0]} Card${pl(effect[1])}\nFrom Draw\nExhaust ${effect[1]} Card${pl(effect[1])}\nFrom Discard\nExhaust ${effect[2]} Card${pl(effect[2])}\nFrom Hand`; break
            case 2986: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nIf You Have Barrier`; break
            case 2987: string+=`Remove All\nBlock of Target\nIf You Have Barrier\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2988: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext Card Reward\nHas ${effect[1]} More Choice${pl(effect[1])}`; break
            case 2989: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRemove ${effect[1]} Non-Fatigue\nStatus Card${pl(effect[1])}`; break
            case 2990: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nRemove a\nRandom Debuff`; break
            case 2991: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nIf it is Upgraded`; break
            case 2992: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nAfter 2 Turns`; break
            case 2993: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nWhen You Scry`; break
            case 2994: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturn on Scry`; break
            case 2995: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has Freeze,\nGain ${effect[1]} Strength`; break
            case 2996: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Double Block\nIf You Have Barrier`; break
            case 2997: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nConvert Your Block\nto Barrier`; break
            case 2998: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nIncreases by ${effect[1]}\nWhen Discarded by Scry`; break
            case 2999: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nIf Target's Maximum\nHP is Divisible by 4`; break
            case 3000: string+=`Gain ${effect[0]} Dexterity\nRemove ${effect[1]} Dexterity`; break
            case 3001: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Dexterity\nand Draw ${effect[2]} Card${pl(effect[2])}`; break
            case 3002: string+=`Scry ${effect[0]}\nGain ${effect[1]} Energy\nNext Turn`; break
            case 3003: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\nDraw ${effect[1]} Attack${pl(effect[1])}`; break
            case 3004: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nScry ${effect[1]}\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3005: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is an Attack,\nLose ${effect[2]} Energy`; break
            case 3006: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Card Reward\nHas ${effect[1]} More Choice${pl(effect[1])}`; break
            case 3007: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDeals Double Damage\nIf Target Has Block\nIgnore Block`; break
            case 3008: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nNext Card Reward\nHas ${effect[1]} More Choice${pl(effect[1])}`; break
            case 3009: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Rest Skipped\nDeals Double to Bosses`; break
            case 3010: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw and Retain Once\n${effect[1]} Movement${pl(effect[1])}`; break
            case 3011: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw and Retain Once\n${effect[1]} Defense${pl(effect[1])}`; break
            case 3012: string+=`Add ${effect[0]} Miracle${pl(effect[0])}\nto Hand\nin 2 Turns`; break
            case 3013: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nIt Moves Randomly`; break
            case 3014: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\nAdd ${this.calculateEffect(effect[1],17)} Barrier`; break
            case 3015: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nAdd ${effect[1]} Miracle${pl(effect[1])}\nto Hand`; break
            case 3016: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Times\nGain ${effect[2]} Intangible`; break
            case 3017: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nScry ${effect[1]}\nAdd a Void\nto Discard Pile`; break
            case 3018: string+=`${variants.mtg?`Gain ${effect[0]} Energy a\n Black White, and Green`:`Gain 1-${effect[0]} Energy`}\nGain ${effect[1]} Poison`; break
            case 3019: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\na Card Reward\nFrom Any Color`; break
            case 3020: string+=`Tick Statuses\nan Additional Time\nEvery Turn`; break
            case 3021: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nAdd ${effect[2]} Dual Discus${effect[2]!=1?`es`:``}\nto Hand`; break
            case 3022: string+=`Even X: Add ${this.calculateEffect(effect[0],3)} Barrier\nOdd X: Deal ${this.calculateEffect(effect[1],2)} Damage\nin All Directions`; break
            case 3023: string+=`Scry ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}\nLose ${effect[2]} Energy\nNext Turn`; break
            case 3024: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nNext Turn`; break
            case 3025: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nAdd ${effect[1]} Random\nAttack${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 3026: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number of\nCommon Colorless\nCards in Hand`; break
            case 3027: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Card Reward\nHas ${effect[1]} More Choice${pl(effect[1])}`; break
            case 3028: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Pure\nEnergy to Hand`; break
            case 3029: string+=`Gain ${effect[0]} Energy\nA Random Card\nCosts ${effect[1]} Less`; break
            case 3030: string+=`Add an Upgraded\nDual Discus to Hand\nThat Costs 0\nWhen a Cost 3+\nCard is Played`; break
            case 3031: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 1 Less\nTemporarily\nTarget Takes ${effect[1]}\nDamage Per Card\nPlayed This Turn`; break
            case 3032: string+=`Add ${this.calculateEffect(effect[0],18)} Barrier\nGain ${effect[1]} Energy\nIf X is 1 or More`; break
            case 3033: string+=`Add ${this.calculateEffect(effect[0],18)} Barrier\nGain ${effect[1]} Energy`; break
            case 3034: string+=`Apply ${effect[0]} Vulnerable\nAdd ${effect[1]} Deluxe Shiv${pl(effect[1])}\nto Draw\nAdd ${effect[2]} Deluxe Shiv${pl(effect[2])}\nto Discard Pile`; break
            case 3035: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]}\nWhen Miracle Played`; break
            case 3036: string+=`Push 1 Tile\nDraw ${effect[0]} Card${pl(effect[0])}\nIf it is a Movement,\nApply ${effect[1]} Weak`; break
            case 3037: string+=`Scry ${effect[0]}\nApply ${effect[1]} Freeze\nPer Card Discarded`; break
            case 3038: string+=`Shuffle Discard Pile\nInto Draw Pile\nScry Entire Draw Pile`; break
            case 3039: string+=`Add ${effect[0]} Miracle${pl(effect[0])}\nto Hand\nin 3 Turns`; break
            case 3040: string+=`Upgrade ${effect[0]} Random Card${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3041: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nYou Break Balance`; break
            case 3042: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 0 Temporarily\nWhen You Rearm`; break
            case 3043: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]}\nWhen You Move Upward`; break
            case 3044: string+=`Shuffle Discard Pile And\nHand Into Draw Pile\nShuffle Draw Pile\nDraw ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Energy`; break
            case 3045: string+=`Choose an Attack or\nDefense to Add to Hand\nAttack: Gain ${effect[0]} Strength\nDefense: Gain ${effect[1]} Dexterity`; break
            case 3046: string+=`Scry ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}\nShuffle Discard Pile\ninto Draw`; break
            case 3047: string+=`Draw ${effect[0]} 1 Cost Card${pl(effect[0])}\nDraw ${effect[1]} 2 Cost Card${pl(effect[1])}`; break
            case 3048: string+=`Take Another Turn\nin 2 Turns`; break
            case 3049: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nPermanently\nIncreases by ${effect[1]}`; break
            case 3050: string+=`Decrease All Damage\nTaken by ${effect[0]}\nto a Minimum of 1`; break
            case 3051: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nGain ${effect[1]} Energy`; break
            case 3052: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nin All Directions\nCosts 0 When ${effect[2]} Cards\nAre Played This Turn`; break
            case 3053: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nIf You Have Barrier`; break
            case 3054: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLeft: Draw ${effect[1]} Attack${pl(effect[1])}\nRight: Draw ${effect[2]} Defense${pl(effect[2])}`; break
            case 3055: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nIf it is a Power,\nGain ${effect[1]} Intangible`; break
            case 3056: string+=`Scry ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Power,\nGain ${effect[2]} Intangible`; break
            case 3057: string+=`Gain ${effect[0]} Dexterity\nDraw ${effect[1]} More\nCard${pl(effect[1])} Next Turn`; break
            case 3058: string+=`Apply ${effect[0]} Weak\nto All Enemies\nNext Card Reward\nHas ${effect[1]} More Choice${pl(effect[1])}\nAdd a Trough to Hand`; break
            case 3059: string+=`Add ${effect[0]} Random\nPower${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily\nLose ${effect[1]} Health`; break
            case 3060: string+=`Add ${effect[0]} Random\nPower${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0\nLose ${effect[1]} Health`; break
            case 3061: string+=`Add ${effect[0]} Dual Discus${effect[0]!=1?`es`:``}\nof Equivalent Level\nto Hand\nThey Cost 1 More`; break
            case 3062: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Vulnerable\nIf You Have Barrier`; break
            case 3063: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nLose All Block`; break
            case 3064: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext Card Reward\nHas ${effect[1]} Less Choice${pl(effect[1])}`; break
            case 3065: string+=`Lose ${effect[0]} Currency\nScry ${effect[1]}`; break
            case 3066: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is an Attack,\nDeal ${this.calculateEffect(effect[2],10)} Less`; break
            case 3067: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDecreases by ${effect[1]} When\nYou Play a Movement`; break
            case 3068: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDrawn 5+ Times: (${this.drawn})\nDeals Double Damage`; break
            case 3069: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Weak\nElemental Form:\nGain ${effect[2]} Vulnerable`; break
            case 3070: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nBelow 50% Health:\nLose ${effect[1]} Health`; break
            case 3071: string+=`Gain ${effect[0]} Dodge\nDiscard ${effect[1]} Random Card${pl(effect[1])}`; break
            case 3072: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nWhen Drawn,\nCosts 1 More`; break
            case 3073: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nCosts 0 When a\nNegative Card\nis Played`; break
            case 3074: string+=`+1: Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times to a\nRandom Enemy\n-3: Take 75% Less\nDamage For ${effect[1]} Turn${pl(effect[1])}\n-7: Gain ${effect[2]} Strength`; break
                case -1000: string+=`-3: Take 75% Less\nDamage For ${effect[1]} Turn${pl(effect[1])}`; break
                case -1001: string+=`-7: Gain ${effect[2]} Strength`; break
            case 3075: string+=`+1: Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\n-3: Gain ${effect[1]} Dodge\n-7: Deal ${this.calculateEffect(effect[2],0)} Damage\nApply ${effect[3]} Vulnerable`; break
                case -1002: string+=`-3: Gain ${effect[1]} Dodge`; break
                case -1003: string+=`-7: Deal ${this.calculateEffect(effect[2],0)} Damage\nApply ${effect[3]} Vulnerable`; break
            case 3076: string+=`+1: Add ${this.calculateEffect(effect[0],1)} Block\n-3: Gain ${effect[1]} Energy\n-7: Gain ${effect[2]} Intangible`; break
                case -1004: string+=`-3: Gain ${effect[1]} Energy`; break
                case -1005: string+=`-7: Gain ${effect[2]} Intangible`; break
            case 3077: string+=`Shuffle Discard Pile And\nHand Into Draw Pile\nShuffle Draw Pile\nDraw ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Energy\nPut a Card in Draw\nPile in Your Hand`; break
            case 3078: string+=`+1: Gain Temporary Strength\nEqual to the Number of\nDefenses Played This Turn${effect[0]!=0?` +${effect[0]}`:``}\n-4: Put a Card in Exhaust\nPile in Your Hand\n-9: Add Any ${effect[1]} Random\nRare Card${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 0, Exhaust,\nand are Ethereal`; break
                case -1006: string+=`-4: Put a Card in Exhaust\nPile in Your Hand`; break
                case -1007: string+=`-9: Add Any ${effect[1]} Random\nRare Card${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 0, Exhaust,\nand are Ethereal`; break
            case 3079: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have\nBlock or Barrier`; break
            case 3081: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLose ${effect[1]} Energy\nIf You Have Block`; break
            case 3082: string+=`+1: A Random Card\nCosts ${effect[0]} Less\n-3: All Cards in Hand\nCost ${effect[1]} Less\n-6: Heal ${this.calculateEffect(effect[2],4)} Health`; break
                case -1008: string+=`-3: All Cards in Hand\nCost ${effect[1]} Less`; break
                case -1009: string+=`-6: Heal ${this.calculateEffect(effect[2],4)} Health`; break
            case 3083: string+=`Gain Strength Equal to\nthe Number of Unique\nStatuses You Have${effect[0]>0?` +${effect[0]}`:``}`; break
            case 3084: string+=`All Vanishing Cards\nin Hand Gain ${effect[0]} Use${pl(effect[0])}`; break
            case 3085: string+=`Edition a Basic Card\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 3086: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Pristine to Hand`; break
            case 3087: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Non-Rare\nColorless Card${pl(effect[0])} Played\nThis Turn Costs 0`; break
            case 3088: string+=`When Drawn,\nAll Cards in Hand\nCost ${effect[0]} Less Temporarily`; break
            case 3089: string+=`When Drawn,\nAll Cards in Hand\nCost ${effect[0]} Less Temporarily\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3090: string+=`Add a Pristine to Hand\nDraw ${effect[0]} Card${pl(effect[0])}\nAdd a Void to Discard`; break
            case 3091: string+=`Shuffle a Vitality\ninto Draw`; break
            case 3092: string+=`Take Another Turn\nDraw No Cards\nDuring it`; break
            case 3093: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nAdd a Pristine to Hand`; break
            case 3094: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Double\nDuring Elite Combats\nAdds Triple\nDuring Boss Combats`; break
            case 3095: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double\nDuring Elite Combats\nDeals Triple\nDuring Boss Combats`; break
            case 3096: string+=`For 4 Turns,\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 3097: string+=`For 4 Turns,\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 3098: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Currency\nAfter Each Combat`; break
            case 3099: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nWhere X = Number of\nCommon Colorless\nCards in Hand`; break
            case 3100: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 Temporarily\nWhen a Colorless\nCard is Played`; break
            case 3101: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 0 Temporarily\nWhen a Colorless\nCard is Played`; break
            case 3102: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCosts 0 Temporarily\nWhen a Colorless\nCard is Played`; break
            case 3103: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Drawn,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3104: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nAdd to Discard:\nDazed\nBurn\nVoid`; break
            case 3105: string+=`Add ${effect[0]} Random\nCommon Colorless Card${pl(effect[0])}\nto Hand`; break
            case 3106: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nAdd ${effect[1]} Random Common\nColorless Card${pl(effect[1])}\nto Hand`; break
            case 3107: string+=`Next Turn,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto the Enemy With\nthe Highest Health`; break
            case 3108: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrade ${effect[1]} Random\nAttack${pl(effect[1])} in Hand`; break
            case 3109: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nUpgrade ${effect[1]} Random\nDefense${pl(effect[1])} in Hand`; break
            case 3110: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double if You\nHave a Pristine in Hand`; break
            case 3111: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Temporary\nDexterity\nLose ${effect[2]} Temporary\nDexterity Next Turn`; break
            case 3112: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\na Pristine is Played`; break
            case 3113: string+=`Gain ${effect[0]} Intangible\nWhen Drawn,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3114: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Drawn,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3115: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpward:\nDeal ${this.calculateEffect(effect[1],0)} Damage\nto a Random Enemy\nDownward:\nAdd ${this.calculateEffect(effect[2],1)} Block`; break
            case 3116: string+=`Odd Energy:\nExhaust ${effect[0]} Card${pl(effect[0])}\nEven Energy:\nGain ${effect[1]} Dodge`; break
            case 3117: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd a Pristine to Hand`; break
            case 3118: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCannot Deal Damage\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 3119: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nWhen Drawn,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3120: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhausts Self When\nAnother Card is Played`; break
            case 3121: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhausts Self When\nAnother Card is Played`; break
            case 3122: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\nAdd a Pristine to Hand`; break
            case 3123: string+=`Next ${effect[0]} Non-Rare\nColorless Card${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated`; break
            case 3124: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard All Prismatic\nBombs in Hand`; break
            case 3125: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSpend ${effect[1]} Charge:\nAdd ${effect[2]} Miracle${pl(effect[2])}\nto Hand`; break
            case 3126: string+=`Add a Random Common\nColorless Card to Deck\nRemove a Card\nPermanently`; break
            case 3127: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Block For ${effect[1]} Turn${pl(effect[1])}\nGain ${effect[2]} Strength\nLose ${effect[3]} Health Per Turn`; break
            case 3128: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nAdd Barrier Equal to\nTarget's Health Lost`; break
            case 3129: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal Half That to\nAll Other Enemies\nLose ${effect[1]} Strength`; break
            case 3130: string+=`Gain ${effect[0]} Temporary\nDexterity Per Turn`; break
            case 3131: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Once`; break
            case 3132: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\nCosts ${effect[2]} Less`; break
            case 3133: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}\nAdd a Moonscape\nto Discard Pile`; break
            case 3134: string+=`+1: Apply ${effect[0]} Poison\nto a Random Enemy\n-3: Upgrade Your Hand\n-7: Apply ${effect[1]} Poison\nto All Enemies\nAll Enemies Take\nDamage Equal to\nTheir Poison`; break
                case -1010: string+=`-3: Upgrade Your Hand`; break
                case -1011: string+=`-7: Apply ${effect[1]} Poison\nto All Enemies\nAll Enemies Take\nDamage Equal to\nTheir Poison`; break
            case 3135: string+=`+1: Upgrade ${effect[0]} Card${pl(effect[0])}\n-5: Add 17 of\nNothings to Hand\nDraw ${effect[1]} Card${pl(effect[1])}\n-12: Remove a Card\nPermanently`; break
                case -1012: string+=`-5: Add 17 of\nNothings to Hand\nDraw ${effect[1]} Card${pl(effect[1])}`; break
                case -1013: string+=`-12: Remove a Card\nPermanently`; break
            case 3136: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Freeze\nAdd ${effect[2]} Snowflake${pl(effect[2])} to Hand`; break
            case 3137: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nIf Fatal, Add ${effect[1]} Random\nPower${pl(effect[1])} to Hand`; break
            case 3138: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[1]!=1?`Them`:`it`} if ${effect[1]!=1?`Them`:`it`}\nDoes Not Cost 0`; break
            case 3139: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf Blocked,\nGain ${effect[2]} Energy`; break
            case 3140: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nTarget Cannot Move\nFor ${effect[1]} Turn${pl(effect[1])}\nTarget Loses ${effect[2]}\nHP Per Turn\nLose ${effect[3]} HP Per Turn`; break
            case 3141: case 3557:
                string+=`All Cards Cost ${effect[0]} Less\nThis Combat`; break
            case 3142: string+=`Push 1 Tile Randomly\nin All Directions\nTargets Become Invisible`; break
            case 3143: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nSummon in a Duck`; break
            case 3144: string+=`Create 6 Money Tiles\nAround Self`; break
            case 3145: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n4 Times\nExhaust Your Hand\nAdd That Many\nPristines to Hand`; break
            case 3146: string+=`Deal Damage Equal to\nYour Last Damage Dealt\nAdd Block Equal to\nYour Last Block Added${effect[0]!=0?`\nDraw ${effect[0]} Card${pl(effect[0])}`:``}`; break
            case 3147: string+=`Gain ${effect[0]} Temporary\nStrength When You\nPlay a Common Card`; break
            case 3148: string+=`When You Gain\nTemporary Strength,\nGain ${effect[0]} Strength`; break
            case 3149: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Drawn,\nIncreases by ${effect[1]}`; break
            case 3150: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nDeals Double Damage\nIf You Have Intangible`; break
            case 3151: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 2 Graphites\nPlayed${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].hand.playedSpecific[2]%2})`:``},\nAdd a Graphene to Hand`; break
            case 3152: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 2 Graphenes\nPlayed${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].hand.playedSpecific[3]%2})`:``},\nAdd a Diamond to Hand`; break
            case 3153: string+=`Convert a Card in\nDeck to Become Colorless\nPermanently`; break
            case 3154: string+=`Gain ${effect[0]} Buffer\nRewind ${effect[1]} Card${pl(effect[1])}\nDraw ${effect[2]} Card${pl(effect[2])}\nElemental Form:\nUpgrade ${effect[2]!=1?`Them`:`It`}`; break
            case 3155: string+=`Target Takes ${effect[0]}\nDamage Per Card\nPlayed This Turn\nGain ${effect[1]} Knowledge`; break
            case 3156: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAmplify:\nDeal ${this.calculateEffect(effect[1],0)} Splash Damage\nAround Self`; break
            case 3157: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAmplify:\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 3158: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Amplify is Free`; break
            case 3159: string+=`Deal Double Damage\nUntil You Play\na Movement`; break
            case 3160: string+=`All Cards in Hand\nBecome Erratic\nThis Combat`; break
            case 3161: string+=`${effect[0]} Random Card${pl(effect[0])} in Hand\nCost${effect[0]==1?`s`:``} ${effect[1]} Less\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3162: string+=`Deal Double Damage\nThis Turn\nGain ${effect[0]} Intangible`; break
            case 3163: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nAdd ${effect[1]} Random\nCommon Colorless Card${pl(effect[1])}\nto Hand`; break
            case 3164: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n25%: Move 1 More\n25%: Move 1 Less`; break
            case 3165: string+=`Gain ${effect[0]} Energy\nAdd a Pristine to Hand\nLose ${effect[1]} Health`; break
            case 3166: string+=`Add a Random\n0 Cost Card\nof Every Color\nof Equivalent Level\nto Hand`; break
            case 3167: string+=`Take Another Turn\nGet No Energy\nFor That Turn`; break
            case 3168: string+=`${effect[0]} or More History:\nRemove a Card\nPermanently`; break
            case 3169: string+=`Left Side of Hand:\nApply ${effect[0]} Weak\nRight Side of Hand:\nApply ${effect[1]} Vulnerable\nExact Center of Hand:\nApply Both`; break
            case 3170: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nIf X is 5 or More,\nPut a Card in Exhaust\nPile in Your Hand`; break
            case 3171: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nat the End of Combat`; break
            case 3172: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Triple Damage\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3173: string+=`Gain ${effect[0]} Currency\nWhen Removed\nIncreases by ${effect[1]}\nEach Node Traveled`; break
            case 3174: string+=`Add ${effect[0]} Strike${pl(effect[0])}\nof Equivalent Level\nto Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 and\n${effect[0]!=1?`Get`:`Gets a`} Random Edition${pl(effect[0])}`; break
            case 3175: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nDraw ${effect[1]} Attack${pl(effect[1])}`; break
            case 3176: string+=`Gain ${effect[0]} Intangible\nLose ${effect[1]} Currency`; break
            case 3177: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nin All Directions\nCosts 0 When a\nPristine is Played`; break
            case 3178: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nAdd a Lunacy to Hand`; break
            case 3179: string+=`Apply ${effect[0]} Weak\nApply ${effect[1]} Frail\nApply ${effect[2]} Vulnerable\nRemove a Random\nDebuff From Self\nAdd a Pristine to Hand`; break
            case 3180: string+=`Add ${effect[0]} Pristine${pl(effect[0])}\nto Hand Every Turn`; break
            case 3181: string+=`When a Colorless\nCard is Played,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nto All Enemies`; break
            case 3182: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nExhaust All Non-Colorless\nCards in Hand`; break
            case 3183: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number of\nColorless Cards in Hand`; break
            case 3184: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nWhere X = Number of\nColorless Cards in Hand`; break
            case 3185: string+=`Add a Pristine to Hand\nDraw ${effect[0]} Card${pl(effect[0])}\nAdd a Glamorous\nStarlight to Discard`; break
            case 3186: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy\nWhen Selectively\nDiscarded, Trigger Effect\nand Draw ${effect[1]} Card${pl(effect[1])}`; break
            case 3187: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nGain ${effect[1]} Energy\nOtherwise,\nDeals Damage Again`; break
            case 3188: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nRepeat if Fatal`; break
            case 3189: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Double Block\nIf You Have Strength\nand Dexterity`; break
            case 3190: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Currency\nAfter Each Combat`; break
            case 3191: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nChange Target Intent to\nan Attack if Possible`; break
            case 3192: string+=`Add a Stride\nto Hand\nFor 3 Turns`; break
            case 3193: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nDeals Double Damage if\nThis Card Has An Edition`; break
            case 3194: string+=`Gain ${effect[0]} Intangible\nShuffle ${effect[1]} Raiment${pl(effect[1])}\nof Equivalent Level\ninto Draw`; break
            case 3195: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance\nWhen Added, Add\nCopystrike to Deck`; break
            case 3196: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nDiscards to Hand`; break
            case 3197: string+=`Heal All Enemies For ${effect[0]}\nApply ${effect[1]} Poison\nto All Enemies`; break
            case 3198: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nIncreases by ${effect[1]}\nReturn on Heal\nReturn on Enemy Death`; break
            case 3199: string+=`Choose a Shiru\nor Daiyousei Card\nto Add to Hand\nIt Costs 0`; break
            case 3200: string+=`Choose a 1 ${variants.mtg?`Total\nCost Card to\n`:`Cost Card\nto `}Add to Hand\nIt Costs 0`; break
            case 3201: string+=`All Attacks This\nTurn Apply ${effect[0]}\nDamage Taken Up`; break
            case 3202: string+=`Gain ${effect[0]} Energy\nBoss Combat:\nGain a Relic`; break
            case 3203: string+=`Gain ${effect[0]} Strength and\n${effect[1]} Dexterity in 4 Turns`; break
            case 3204: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf Played First,\nAdd ${effect[1]} Random\nBlueprint${pl(effect[1])} to Hand`; break
            case 3205: string+=`Retain ${effect[0]} Card${pl(effect[0])} Once\nTake Another Turn`; break
            case 3206: string+=`Gain ${effect[0]} Dodge\nTake Another Turn`; break
            case 3207: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nin All Directions\nCosts 1 Less\nWhen You Scry`; break
            case 3208: string+=`Take 50% Less Damage\nThis Turn`; break
            case 3209: string+=`Upgrade Your Hand`; break
            case 3210: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nTarget Becomes\nInvisible Permanently`; break
            case 3211: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nA Random Enemy\nBecomes Invisible\nPermanently`; break
            case 3212: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[1],0)} Damage\nto a Random Enemy\nWhen Discarded`; break
            case 3213: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${this.calculateEffect(effect[1],1)} Block\nWhen Discarded`; break
            case 3214: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 2 Tiles\nAdvance`; break
            case 3215: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nTransform a Random\nCurse in Deck`; break
            case 3216: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nWhen Incremented`; break
            case 3217: string+=`Overloaded Orbs Evoke\non Random Enemies\nInstead of Yourself`; break
            case 3218: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy Next\nTurn When Discarded`; break
            case 3219: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTransform a Card\nFrom Discard`; break
            case 3220: string+=`Apply ${effect[0]} Shock\nApplies Double if\nTarget Has 3 or\nMore Unique Statuses`; break
            case 3221: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]} When\na Pristine is Played`; break
            case 3222: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Does\nNot Lose Health,\nGain ${effect[1]} Energy and\nAdd ${effect[2]} Random\nDefenses to Hand`; break
            case 3223: string+=`Gain ${effect[0]} Control\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3224: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 3rd Time Played,\nGain ${effect[1]} Currency\nOn Play: ${this.limit%3+1}/3`; break
            case 3225: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 3rd Time Played,\nDeals Double Damage\nOn Play: ${this.limit%3+1}/3`; break
            case 3226: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 2nd Time Played,\nAdd a Graphene to Hand\nOn Play: ${this.limit%2+1}/2`; break
            case 3227: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 2nd Time Played,\nAdd a Diamond to Hand\nOn Play: ${this.limit%2+1}/2`; break
            case 3228: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number\nof Enemies`; break
            case 3229: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nWhere X = Number\nof Enemies`; break
            case 3230: string+=`Add ${effect[0]}X${effect[1]>0?`+${effect[1]}`:``} Random\nCommon Colorless\nCards to Hand\nThey Cost 0 Temporarily`; break
            case 3231: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nIf Fatal, Add ${effect[1]} Random\nPower${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 3232: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Does\nNot Lose Health,\nGain ${effect[1]} Energy and\nAdd ${effect[2]} Random\nDefenses to Hand\n${effect[2]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 3233: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Strength if\nYour Deck Contains\n40 or More Cards`; break
            case 3234: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Strength if\nYour Deck Contains\n40 or More Cards`; break
            case 3235: string+=`Choose a 1 Cost,\n2 Cost, or 3 Cost\nCard to Add to Hand`; break
            case 3236: string+=`Gain ${effect[0]} Energy\nChoose a 1 Cost,\n2 Cost, or 3 Cost\nCard to Add to Hand`; break
            case 3237: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nShuffle ${effect[1]} Shiv${pl(effect[1])}\ninto Draw Pile`; break
            case 3238: string+=`Take Another Turn\nNext ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} No Damage`; break
            case 3239: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nAdd ${effect[2]} Shiv${pl(effect[2])}\nto Hand`; break
            case 3240: string+=`Add ${effect[0]} Shiv${pl(effect[0])} to Hand\nAdd ${effect[1]} Shiv${pl(effect[1])} to Hand\nWhen an Enemy Dies`; break
            case 3241: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhaust the Rightmost\nCard in Hand`; break
            case 3242: string+=`Force Target to\nMove ${effect[0]} Tile${pl(effect[0])} Randomly\nAway From You`; break
            case 3243: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nin All Directions\nAdd a Safety\nto Hand`; break
            case 3244: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nDeal ${this.calculateEffect(effect[2],0)} Splash Damage\nNext Turn`; break
            case 3245: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Drawn,\nLose All Block`; break
            case 3246: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTransform a Card\nFrom Draw`; break
            case 3247: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have Dodge,\nGain ${effect[1]} Energy`; break
            case 3248: string+=`Choose a Card\nFrom ${effect[0]} Choices\nFrom Discard Pile\nto Add to Hand\nIt Costs 0`; break
            case 3249: string+=`If Target Will Attack,\nAdd ${this.calculateEffect(effect[0],1)} Block\nOtherwise,\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 3250: string+=`Add ${effect[0]} Spare\nStrike${pl(effect[0])} to Draw`; break
            case 3251: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Will Not Change\nIntents This Turn`; break
            case 3252: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nCreate 7 Plant Tiles\nAround You`; break
            case 3253: string+=`Gain ${effect[0]} Energy\nCosts 1 Less\nWhen You Gain Energy\nDuring Your Turn`; break
            case 3254: string+=`Gain ${effect[0]} Energy\nDiscard the Card\nto the Right`; break
            case 3255: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw Cards Equal to\nHalf the Number\nPlayed This Turn,\nRounded Up`; break
            case 3256: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nReduce X by the\nNumber of Other\nCards in Hand`; break
            case 3257: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAway From Target\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 3258: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Selectively\nDiscarded,\nPut a Card in Exhaust\nPile in Your Hand`; break
            case 3259: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nEvery 10th Time Played,\nAdd a Nuclear\nBomb to Hand\nOn Play: ${this.limit%10+1}/10`; break
            case 3260: string+=`Target Takes ${effect[0]}\nDamage Per Card\nPlayed This Turn\nChoose a 0 Cost Card\nto Add to Hand`; break
            case 3261: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nGain ${effect[1]} Knowledge\nGain ${effect[2]} History`; break
            case 3262: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nGain ${effect[1]} Energy\nGain ${effect[2]} Charge`; break
            case 3263: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nCounter ${effect[2]} All`; break
            case 3264: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nAdd Another Random\nSculpture of Equivalent\nLevel to Hand`; break
            case 3265: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nAdd Another Random\nSculpture of Equivalent\nLevel to Hand`; break
            case 3266: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nAdd Another Random\nSculpture of Equivalent\nLevel to Hand`; break
            case 3267: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nAt Max, Gain ${effect[1]}\nTemporary Strength`; break
            case 3268: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nAdd a Burn to Hand`; break
            case 3269: string+=`Moving Does Not\nReduce Your Combo\nThis Combat`; break
            case 3270: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target Has Vulnerable\nDeals Double Damage\nIf Target Has Block`; break
            case 3271: string+=`Gain ${effect[0]} Metal\nNext Construct Built\nMoves ${effect[1]} More\nTile${pl(effect[1])} Per Turn`; break
            case 3272: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdjacent Constructs\nAdd ${effect[1]} Block`; break
            case 3273: string+=`Add ${effect[0]} Defend${pl(effect[0])}\nof Equivalent Level\nto Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 and\n${effect[0]!=1?`Get`:`Gets a`} Random Edition${pl(effect[0])}`; break
            case 3274: string+=`Scry ${effect[0]}\nDeal ${this.calculateEffect(effect[1],0)} Damage to\na Random Enemy For\nEach Card Discarded\nAdd ${this.calculateEffect(effect[1],1)} Block For Each\nCard Not Discarded`; break
            case 3275: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nApply ${effect[2]} Frail\nDiscard the Card\nto the Right`; break
            case 3276: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust a Card\nFrom Discard`; break
            case 3277: string+=`Remove the Newest Card\nFrom Deck Permanently\nGain a Card Reward\nFrom Any Color`; break
            case 3278: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nGain ${effect[1]} Energy\nNext Turn`; break
            case 3279: string+=`Apply ${effect[0]} Weak\nA Random Card\nCosts ${effect[1]} Less`; break
            case 3280: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nSwap With it`; break
            case 3281: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDraw ${effect[1]} More Card${pl(effect[1])} of\nthe Same Class`; break
            case 3282: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nYou Cannot Die\nThis Turn`; break
            case 3283: string+=`This Combat, While\nYou Are Weak,\nDeal 25% More\nDamage Instead`; break
            case 3284: string+=`Apply ${effect[0]} Shock\nDraw ${effect[1]} Defense${pl(effect[1])}`; break
            case 3285: string+=`Gain ${effect[0]} Weak\nGain ${effect[1]} Frail\nGain ${effect[2]} Vulnerable\nGain ${effect[3]} Bleed`; break
            case 3286: string+=`When You Draw a Shiv,\nDraw ${effect[0]} Card${pl(effect[0])}\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Draw`; break
            case 3287: string+=`Add a Knife\nExpress to Hand\nIncrease its Damage\nby ${effect[0]} For Each\nExhausted Shiv`; break
            case 3288: string+=`Prismatic Bombs\nApply ${effect[0]} Freeze`; break
            case 3289: string+=`Prismatic Bombs\nApply ${effect[0]} Poison`; break
            case 3290: string+=`Prismatic Bombs\nTarget ${effect[0]} More Enem${effect[0]!=1?`ies`:`y`}`; break
            case 3291: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nDraw ${effect[1]} More\nCard${pl(effect[2])} in 2 Turns`; break
            case 3292: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nSpend ${effect[1]} Metal:\nMove ${effect[2]} More Tile${pl(effect[2])}`; break
            case 3293: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nSpend ${effect[1]} Charge:\nMove ${effect[2]} More Tile${pl(effect[2])}`; break
            case 3294: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdjacent Constructs\nAlso Move`; break
            case 3295: string+=`Apply ${effect[0]} Poison\nHeal ${this.calculateEffect(effect[1],4)} Health\nGain ${effect[2]} Poison`; break
            case 3296: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} at Range 1-6\nEach Counter\nRequires Ammo`; break
            case 3297: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Splash\nat Range 2`; break
            case 3298: case 4088:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nApply ${effect[1]} Frail\nLose ${effect[2]} Currency`; break
            case 3299: string+=`Gain ${effect[0]} Strength\nLose ${effect[1]} HP Per Turn\nAdd ${effect[2]} Random\nAttack${pl(effect[2])} to Hand\n${effect[2]!=1?`They Cost`:`It Costs`} 0\nTemporarily`; break
            case 3300: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Exhausted,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3301: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Exhausted,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3302: string+=`Gain ${effect[0]} Metal\nNext Construct Built\nLoses 50% HP`; break
            case 3303: string+=`Gain ${effect[0]} Temporary\nStrength Per Turn`; break
            case 3304: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf an Enemy is\nin the Same Row\nof Tiles as You`; break
            case 3305: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDeal ${this.calculateEffect(effect[1],0)} Damage to All\nEnemies Next Turn\nDamage Increases by ${effect[2]}\nPermanently`; break
            case 3306: string+=`Add ${effect[0]} Prismatic\nBomb${pl(effect[0])} to Discard\nEvery Turn`; break
            case 3307: string+=`Put a Card in Draw\nPile in Your Hand\nMake ${effect[0]} Cop${effect[0]!=1?`ies`:`y`}`; break
            case 3308: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nSpend ${effect[1]} Charge:\nRetain Block\nFor ${effect[2]} Turn${pl(effect[2])}`; break
            case 3309: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nFatigue in Hand:\nExhaust It\nGain ${effect[1]} Weak`; break
            case 3310: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd an Astrology\nto Hand`; break
            case 3311: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have Played\nan Attack This Turn,\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 3312: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Charge\nIf You Have No Charge`; break
            case 3313: string+=`Shuffle ${effect[0]} Miracle${pl(effect[0])}\nand ${effect[1]} Dual Discus${effect[1]!=1?`es`:``}\ninto Draw`; break
            case 3314: string+=`Add ${effect[0]} Miracle${pl(effect[0])} to Hand\nIf You Do Not Have\nStatus Cards or\nCurses in Hand`; break
            case 3315: string+=`Remove All\nActive Counters`; break
            case 3316: string+=`Apply ${effect[0]} Poison\nApply ${effect[1]} Shock`; break
            case 3317: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDrawn 1 Time: (${this.drawn})\nChoose an Attack\nto Add to Hand`; break
            case 3318: string+=`End Your Turn\nDraw ${effect[0]} More\nCard${pl(effect[0])} Next Turn`; break
            case 3319: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPlayed Last Turn:\nAttack: Draw ${effect[1]} Card${pl(effect[1])}\nDefense: Gain ${effect[2]} Energy`; break
            case 3320: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Double Block\nIf You Played a\nDefense Last Turn`; break
            case 3321: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],3)} Block\nWhere X = Target Burn`; break
            case 3322: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRetain the Rightmost\nCard in Hand Once`; break
            case 3323: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove ${effect[1]} Strength\nFrom Target\nIf You Are Debuffed`; break
            case 3324: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 1 More\nTemporarily`; break
            case 3325: string+=`Take ${effect[0]} Damage\nGain ${effect[1]} Buffer`; break
            case 3326: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTake ${effect[1]} More Damage\nFrom Attacks This Turn`; break
            case 3327: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Deluxe Upgrade\na Card Permanently`; break
            case 3328: string+=`Put the Top Card\nof Draw and Discard\nPiles into Hand\nThey Cost 0 Temporarily`; break
            case 3329: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nWhen Drawn Innately,\nDraw ${effect[2]} Less Card${pl(effect[2])}`; break
            case 3330: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nYou Cannot Draw More\nCards This Turn`; break
            case 3331: string+=`Exactly 5 Energy:\nRemove Target Dodge\nDeal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block`; break
            case 3332: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 3333: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Pull 1 Tile at Range 2+`; break
            case 3334: string+=`+1: Remove ${effect[0]}\nNon-Fatigue Status Card${pl(effect[0])}\n-3: Scry ${effect[1]}\nDraw ${effect[2]} Card${pl(effect[1])}\n-8: Add ${effect[3]} Miracle${pl(effect[3])}\nto Hand`; break
                case -1014: string+=`-3: Scry ${effect[1]}\nDraw ${effect[2]} Card${pl(effect[1])}`; break
                case -1015: string+=`-8: Add ${effect[3]} Miracle${pl(effect[3])}\nto Hand`; break
            case 3335: string+=`+1: Add ${this.calculateEffect(effect[0],17)} Barrier\n-3: Add ${effect[1]} Riptide${pl(effect[1])}\nto Hand\n-8: Choose a Rare\nPower to Add to Hand\nIt Costs 0`; break
                case -1016: string+=`-3: Add ${effect[1]} Riptide${pl(effect[1])}\nto Hand`; break
                case -1017: string+=`-8: Choose a Rare Power\nto Add to Hand\nIt Costs 0`; break
            case 3336: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nApply ${effect[1]} Burn\nLose ${effect[2]} Health`; break
            case 3337: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Add ${this.calculateEffect(effect[1],1)} Block\nGain ${effect[2]} Armor`; break
            case 3338: string+=`Add 1-11 of Nothings\nto Hand, Draw,\nand Discard Piles${effect[0]>0?`\nDraw ${effect[0]} Card${pl(effect[0])}`:``}`; break
            case 3339: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Hand Size\nDiscard Your Hand\nDrawn 1 Time: (${this.drawn})\nDraw ${effect[1]} Card${pl(effect[1])}\n${effect[1]!=1?`They Cost`:`It Costs`} 0`; break
            case 3340: string+=`Add ${effect[0]} Block\nto Any Combatant`; break
            case 3341: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nUnupgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 3342: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nLose ${effect[1]} Temporary\nStrength`; break
            case 3343: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Exhausted,\nLose ${effect[1]} Energy`; break
            case 3344: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTake ${this.diceEffect(1,6,2,effect[1])} Damage`; break
            case 3345: string+=`Exactly Turn 420:\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 3346: string+=`Triplicate Non-Movement\nCards Gain +${effect[0]} on\nFirst Effect\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3347: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nCards Currently in Hand\nDo Not Fatigue\nThis Combat`; break
            case 3348: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nWhen a Fatigue is Played\nShuffle All Fatigues in\nDiscard into Draw`; break
            case 3349: string+=`Apply ${effect[0]} Burn\nApply ${effect[1]} Bruise\nIncreases by ${effect[2]}\nand ${effect[3]} When You\nPlay a Movement`; break
            case 3350: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Poison\nIf Target is on\na Plant Tile`; break
            case 3351: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nGain ${effect[1]} Strength\nGain ${effect[2]} Dexterity\nSpawn a Management\nRobot Enemy`; break
            case 3352: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Colorless Card${pl(effect[1])}`; break
            case 3353: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLeft Around Target`; break
            case 3354: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nRight Around Target`; break
            case 3355: string+=`A Random Card\nin Hand Costs ${effect[0]}\nLess Temporarily\nand Exhausts`; break
            case 3356: string+=`Gain ${effect[0]} Currency\nAdd ${effect[1]} Barrier\nto Target`; break
            case 3357: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Triple Block If\nYou Have Played 3\nPowers This Turn`; break
            case 3358: string+=`When Drawn,\nDraw ${effect[0]} Defense${pl(effect[0])}\nDraw ${effect[1]} Movement${pl(effect[1])}\nDraw ${effect[2]} Power${pl(effect[2])}`; break
            case 3359: string+=`Each Turn,\nPut a Random Card\nFrom Your Deck\nInto Hand`; break
            case 3360: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],0)} Instead\nIf You are Hit`; break
            case 3361: string+=`Add Any Random\n${effect[0]} X Cost Card${effect[0]!=1?`s`:``}\nof Equivalent Level`; break
            case 3362: string+=`Gain ${effect[0]} Energy\nEvery 2 Turns`; break
            case 3363: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrade the Top\nCard of Draw Pile`; break
            case 3364: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it Has an Edition,\nDeal ${this.calculateEffect(effect[2],10)} More`; break
            case 3365: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nX Increases by 1\nWhen You Gain Energy\n(Currently +${effect[1]})`; break
            case 3366: string+=`Add Any ${effect[0]} Random\nCard${pl(effect[0])} to Hand Each Turn\n${effect[0]!=1?`They Become`:`It Becomes`} Negative`; break
            case 3367: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAlly Cards in Hand\nGain ${effect[1]} Unity`; break
            case 3368: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nin a Random Direction`; break
            case 3369: string+=`Shuffle ${effect[0]} Vitalit${effect[0]!=1?`ies`:``} into Draw\nGain ${effect[1]} Knowledge\nGain ${effect[2]} Wisdom`; break
            case 3370: string+=`Spawn ${effect[0]} Gangster\nEnem${effect[0]!=1?`ies`:``}\nThey Attack You`; break
            case 3371: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscards to Draw\nWhen Played`; break
            case 3372: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturn ${effect[1]} Random\n0 Cost Cards From\nDiscard to Hand`; break
            case 3373: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Currency`; break
            case 3374: string+=`All Attacks in Hand\nGain ${effect[0]} Effect\nLose ${effect[1]} Currency`; break
            case 3375: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number of\nDebuffs on Target\nIgnore Block`; break
            case 3376: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nEven X: Draw ${effect[1]} Attack${pl(effect[1])}\nOdd X: Draw ${effect[2]} Defense${pl(effect[2])}`; break
            case 3377: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nElemental Form:\nShuffle a Vitality into Draw\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3378: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nHold ${effect[1]} Random Orb${pl(effect[1])}`; break
            case 3379: string+=`Take Another Turn\nRewind ${effect[0]} Card${pl(effect[0])}\nAt the Start\nof That Turn`; break
            case 3380: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nDraw an Equal\nNumber of Cards\nof the Same Class`; break
            case 3381: string+=`+1: Adjacent Combatants\nTake ${effect[0]} Damage\nPer Card Played\n-3: Draw ${effect[1]} Card${pl(effect[1])}\n${effect[1]!=1?`They Cost`:`It Costs`} 0\n-6: Next Card Reward\nHas ${effect[2]} More Choice${pl(effect[2])}`; break
                case -1018: string+=`-3: Draw ${effect[1]} Card${pl(effect[1])}\n${effect[1]!=1?`They Cost`:`It Costs`} 0`; break
                case -1019: string+=`-6: Next Card Reward\nHas ${effect[2]} More Choice${pl(effect[2])}`; break
            case 3382: string+=`+1: Strikes and Defends\nDrawn Cost 0 Temporarily\n-3: Add ${effect[0]} Strike${pl(effect[0])} and\n${effect[1]} Defend${pl(effect[1])} to Hand\nThey Cost 0 and Exhaust\n-12: Edition a\nBasic Card`; break
                case -1020: string+=`-3: Add ${effect[0]} Strike${pl(effect[0])} and\n${effect[1]} Defend${pl(effect[1])} to Hand\nThey Cost 0 and\nHave Exhaust`; break
                case -1021: string+=`-12: Edition a\nBasic Card`; break
            case 3383: string+=`+1: Strikes and Defends\nDrawn Cost 0 Temporarily\nand Gain ${effect[0]} Effect\n-3: Add ${effect[1]} Strike${pl(effect[1])} and\n${effect[2]} Defend${pl(effect[2])} to Hand\nThey Cost 0 and Exhaust\n-12: Edition a\nBasic Card`; break
                case -1022: string+=`-3: Add ${effect[1]} Strike${pl(effect[1])} and\n${effect[2]} Defend${pl(effect[2])} to Hand\nThey Cost 0 and\nHave Exhaust`; break
            case 3384: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTarget Takes ${effect[1]}\nDamage Per Card\nPlayed This Turn`; break
            case 3385: string+=`${effect[0]} Random Card${pl(effect[0])} in\nDraw Pile Cost${effect[0]==1?`s`:``} 0`; break
            case 3386: string+=`Apply ${effect[0]} Vulnerable\nAdd ${effect[1]} Shiv${pl(effect[1])} to Hand\nShuffle ${effect[2]} Shiv${pl(effect[2])} into Draw\nAdd ${effect[3]} Shiv${pl(effect[3])} to Discard`; break
            case 3387: string+=`Select if the Next\nCombat Will be an\nEnemy or an Elite`; break
            case 3388: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Damage\nto All Enemies`; break
            case 3389: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nChoose a George Card\nto Add to Hand`; break
            case 3390: string+=`+1: Retain the Next\n${effect[0]!=1?`${effect[0]}`:``} Card${pl(effect[0])} Once\n-2: Shuffle a Vitality\nof Equivalent Level\ninto Draw\n-5: Heal ${this.calculateEffect(effect[1],4)} Health\nat the End of Combat`; break
                case -1023: string+=`-2: Shuffle a Vitality\nof Equivalent Level\ninto Draw`; break
                case -1024: string+=`-5: Heal ${this.calculateEffect(effect[1],4)} Health\nat the End of Combat`; break
            case 3391: string+=`Shuffle ${effect[0]} Dual Discus${effect[0]!=1?`es`:``}\nof Equivalent Level\nand ${effect[1]} Miracle${pl(effect[1])}\ninto Draw`; break
            case 3392: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSet Balance to 0`; break
            case 3393: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nArmed:\nApply ${effect[1]} Weak\nUnarmed:\nApply ${effect[2]} Vulnerable`; break
            case 3394: string+=`Apply ${effect[0]} Burn\nExhaust All\nMovements in Hand`; break
            case 3395: string+=`+1: Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Card${pl(effect[1])}\n-4: Reflect Next Hit Taken\n-9: Add ${effect[2]} Discus${effect[2]!=1?`es`:``} of\nLight and Dark of\nEquivalent Level\nto Hand\n${effect[2]!=1?`They Cost`:`It Costs`} 0`; break
                case -1025: string+=`-4: Reflect Next Hit Taken`; break
                case -1026: string+=`-9: Add ${effect[2]} Discus${effect[2]!=1?`es`:``} of\nLight and Dark of\nEquivalent Level\nto Hand\n${effect[2]!=1?`They Cost`:`It Costs`} 0`; break
            case 3396: string+=`+1: Gain ${effect[0]} Control\n-2: Add ${effect[1]} Pristine${pl(effect[1])}\nto Hand\n-6: Choose a Common\nColorless Card to\nAdd to Deck and Hand`; break
                case -1027: string+=`-2: Add ${effect[1]} Pristine${pl(effect[1])}\nto Hand`; break
                case -1028: string+=`-6: Choose a Common\nColorless Card to\nAdd to Deck and Hand`; break
            case 3397: string+=`+1: Increase Turn\nNumber by ${effect[0]}\n-3: Add Block Equal to\nYour Last Block${effect[1]>0?`\nAdded Times ${effect[1]}`:`Added`}\n-8: Add ${effect[2]} Random\nSculpture${pl(effect[2])} of Equivalent\nLevel to Hand,\n${effect[2]!=1?`They Cost`:`It Costs`} 0`; break
                case -1029: string+=`-3: Add Block Equal to\nYour Last Block${effect[1]>0?`\nAdded Times ${effect[1]}`:`Added`}`; break
                case -1030: string+=`-8: Add ${effect[2]} Random\nSculpture${pl(effect[2])} of Equivalent\nLevel to Hand,\n${effect[2]!=1?`They Cost`:`It Costs`} 0`; break
            case 3398: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nPut the Top Card\nof Draw and Discard\nPiles into Hand`; break
            case 3399: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nIf it is a Skill,\nGain ${effect[1]} Intangible`; break
            case 3400: string+=`Scry ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Skill,\nGain ${effect[2]} Intangible`; break
            case 3401: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nYou Play a Skill`; break
            case 3402: string+=`Add ${effect[0]} Prismatic\nBomb${pl(effect[0])} to Draw Pile\nAdd ${effect[1]} Void${pl(effect[1])}\nto Discard Pile`; break
            case 3403: string+='Put a Skill\nFrom Your Draw\nPile Into\nYour Hand'; break
            case 3404: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Skill${pl(effect[1])}`; break
            case 3405: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Skill${pl(effect[1])}`; break
            case 3406: string+=`Gain ${effect[0]} Energy\nFor Each Skill\nin Hand`; break
            case 3407: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nDraw ${effect[1]} Skill${pl(effect[1])}`; break
            case 3408: string+=`Odd Turn:\nDraw ${effect[0]} Attack${pl(effect[0])}\nDraw ${effect[1]} Defense${pl(effect[1])}\nDraw ${effect[2]} Movement${pl(effect[2])}\nDraw ${effect[3]} Skill${pl(effect[3])}\nDraw ${effect[4]} Power${pl(effect[4])}\nThey Cost 0`; break
            case 3409: string+=`Choose a Skill\nWith an Edition\nFrom Any Character\nto Add to Deck`; break
            case 3410: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIncreases by ${effect[1]}\nWhen Skill Played\n(Max 3)`; break
            case 3411: string+=`Target Takes ${effect[0]}\nDamage Per Card\nPlayed This Turn\nDraw ${effect[1]} Card${pl(effect[1])}\nIf it is a Skill,\nTarget Takes ${effect[2]} More`; break
            case 3412: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Triple Block If\nYou Have Played ${effect[1]}\nSkill${pl(effect[1])} This Turn`; break
            case 3413: string+=`When Drawn,\nDraw ${effect[0]} Defense${pl(effect[0])}\nDraw ${effect[1]} Movement${pl(effect[1])}\nDraw ${effect[2]} Skill${pl(effect[2])}`; break
            case 3414: string+=`Add ${effect[0]} Random\nSkill${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 3415: string+=`Add ${effect[0]} Random\nSkill${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 3416: string+=`Cards No Longer\nRequire Armament`; break
            case 3417: string+=`Burns Give ${effect[0]} Strength\nand Deal No Damage`; break
            case 3422: string+=`Strikes Gain ${effect[0]} Range`; break
            case 3423: string+=`Skills Cost ${effect[0]}\nLess and Exhaust\nThis Combat`; break
            case 3424: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nWhen You Play a Step`; break
            case 3425: string+=`Cable Cards\nGain ${effect[0]} Range`; break
            case 3426: string+=`Mineral Cards\nGain ${effect[0]} Range`; break
            case 3427: string+=`Common Attacks\nGain ${effect[0]} Effect`; break
            case 3428: string+=`Cable Cards are Free`; break
            case 3429: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Faith`; break
            case 3430: string+=`${variants.mtg?`Gain ${effect[0]} Energy`:`Next ${effect[0]!=1?`${effect[0]} `:``}Non-Rare\nColorless Card${pl(effect[0])} Played\nThis Turn Costs 0`}\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 3431: string+=`Advance\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 3432: string+=`Advance\nDraw ${effect[0]} Card${pl(effect[0])}\nRange ${target[1]}-${target[2]}\nor\nMove ${effect[1]} Tile${pl(effect[1])}`; break
            case 3433: string+=`Advance\nIf You Have Played\nan Attack This Turn,\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 3434: string+=`When You Build a\nConstruct, It Takes\nAn Extra Turn`; break
            case 3435: string+=`When You Build a\nConstruct, Add ${this.calculateEffect(effect[0],1)} Block\nto Construct and Self`; break
            case 3436: string+=`Gain ${effect[0]} Metal\nPer Turn`; break
            case 3437: string+=`All Constructs Built\nMove ${effect[0]} More\nTile${pl(effect[0])} Per Turn`; break
            case 3438: string+=`When You Build a\nConstruct, It Gains ${effect[0]}\nStrength and ${effect[1]} Dexterity`; break
            case 3439: string+=`Guns Give ${effect[0]}\nTemporary Strength`; break
            case 3440: string+=`Guns Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 3441: string+=`Increase Turn Number\nby ${effect[0]} Every Turn`; break
            case 3442: string+=`Whenever You Take\nan Extra Turn,\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 3443: string+=`Add a Supremum and\nInfimum to Hand and\nRetain Them Until Played`; break
            case 3444: string+=`Reverse All Turn\nNumber Changes`; break
            case 3445: string+=`This Combat, While\nEnemies Are Weak,\nThey Deal 50% Less\nDamage to You Instead`; break
            case 3446: string+=`Reduce Cost of\nAll Cards in\nHand to ${effect[0]} Temporarily`; break
            case 3447: string+=`Reduce Cost of\nAll Cards in\nHand to ${effect[0]}`; break
            case 3448: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}\nAdd a Pristine to Hand\nLose ${effect[2]} Health`; break
            case 3449: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target is a Robot,\nApply ${effect[1]} Stun`; break
            case 3450: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Shadow\nto Hand`; break
            case 3451: string+=`Put a Copy of\na Card in Draw\nPile in Your Hand`; break
            case 3452: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal on a Duck,\nGain ${effect[1]} Currency`; break
            case 3453: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 4:\nAdd ${this.calculateEffect(effect[1],1)} Block\nGain ${effect[2]} Currency`; break
            case 3454: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Temporary\nStrength Next Turn Per\nAttack Played This Turn\nGain ${effect[2]} Temporary\nDexterity Next Turn Per\nDefense Played This Turn\nExhaust ${effect[3]} Card${pl(effect[3])}`; break
            case 3455: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAll Skills in Hand\nCost ${effect[1]} Less Temporarily`; break
            case 3456: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAll Defenses and\nSkills in Hand Cost\n${effect[1]} Less Temporarily`; break
            case 3457: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust ${effect[1]} Random Status\nCard${pl(effect[1])} From Hand\nDraw Cards Equal to\nthe Number Exahusted`; break
            case 3458: string+=`${effect[0]} Random Card${pl(effect)}\nin Hand Duplicate\nOnce When Played`; break
            case 3459: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nChoose to Double\nDamage or Block`; break
                case -1031: string+=`Deal ${this.calculateEffect(effect[0]*2,0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
                case -1032: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1]*2,1)} Block`; break
            case 3460: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage to a\nRandom Enemy 2 Times\nGain ${effect[1]} Energy if You\nHave Temporary Strength\nGain ${effect[2]} Energy if You\nHave Temporary Dexterity`; break
            case 3461: string+=`Deal Splash Damage\nEqual to Double Target\nConstruct Health`; break
            case 3462: string+=`Return a Removed\nCard to Deck`; break
            case 3463: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health\nWhen Discarded,\nLose ${effect[2]} Health`; break
            case 3464: string+=`Advance\nApply ${effect[0]} Vulnerable`; break
            case 3465: string+=`Advance\nTarget Cannot Move\nFor ${effect[0]} Turn${pl(effect[0])}`; break
            case 3466: string+=`Choose and Add\nAny Common Character\nor Colorless Card\nof Equivalent Level\nto Hand`; break
            case 3467: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Starlight${effect[1]!=1?`s`:``}\nto Discard Pile`; break
            case 3468: string+=`Add ${effect[0]} Prismatic\nBomb${pl(effect[0])} to Draw Pile\nPrismatic Bombs\nDeal ${this.calculateEffect(effect[1],14)} More Damage`; break
            case 3469: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nSwaps When You\nAre Below 50% Health`; break
            case 3470: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nSwaps When You\nAre Above 50% Health`; break
            case 3471: string+=`Put a Card in Discard\nPile in Your Hand\nLeftmost or Rightmost\nCard in Hand:\nIt Costs 0 Temporarily`; break
            case 3472: string+=`Add ${effect[0]} Random Card${pl(effect[0])}\nof Equivalent Level\nContaining 'Storm'\nto Hand`; break
            case 3473: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDrawn 2+ Times: (${this.drawn})\nDraw ${effect[1]} More`; break
            case 3474: string+=`Combine Duplicate\nCards Into a Single\nNegative Copy`; break
            case 3475: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n5 Cards in Hand:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3476: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n8 or More\nCards in Hand:\nGain ${effect[1]} Energy`; break
            case 3477: string+=`Bomb 7 Tiles\nin a Circle\nFor ${effect[0]} Damage`; break
            case 3478: string+=`Gain ${effect[0]} Intangible\nDeal No Damage\nNext Turn`; break
            case 3479: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50%: Add ${this.calculateEffect(effect[1],1)} Block\n50%: Deal ${this.calculateEffect(effect[2],0)} Damage\nto a Random Enemy`; break
            case 3480: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nSpend ${effect[1]} Charge:\nAdd ${this.calculateEffect(effect[2],1)} Block`; break
            case 3481: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw to ${effect[1]} Card${pl(effect[1])}`; break
            case 3482: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy\n${effect[1]} Time${effect[1]!=1?`s`:``}`; break
            case 3483: string+=`Gain ${effect[0]} Temporary\nStrength\nHeal ${this.calculateEffect(effect[1],4)} Health\nTake ${effect[2]} Damage\nNext Turn`; break
            case 3484: string+=`End Your Current Turn\nTake Another Instantly\nYou Can Only Play\n${effect[0]} Card${pl(effect[0])} During it`; break
            case 3485: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSpend ${effect[1]} Charge:\nGain ${effect[2]} Dodge`; break
            case 3486: string+=`When You Play\na 2+ Cost Card,\nNext Attack Deals\n${effect[0]} More Damage`; break
            case 3487: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen You Play\na 2+ Cost Card`; break
            case 3488: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nApply ${effect[1]} Damage\nTaken Up\nGain ${effect[2]} Intangible\nAdvance`; break
            case 3489: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Card${pl(effect[1])}\nDraws Common\nCards First`; break
            case 3490: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nAt Max, Gain ${effect[1]} Armor`; break
            case 3491: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIncreases by ${effect[1]} When\na Pristine is Played\n(Max 3)`; break
            case 3492: string+=`When Vanished,\nGain ${effect[0]} Currency`; break
            case 3493: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Currency\nAfter Each Combat`; break
            case 3494: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext ${effect[1]!=1?`${effect[1]} `:``}Attack${pl(effect[1])}\nAdd${effect[1]==1?`s`:``} Equal Block`; break
            case 3495: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext ${effect[1]!=1?`${effect[1]} `:``}Attack${pl(effect[1])}\nAdd${effect[1]==1?`s`:``} Block Equal to\nHalf of Damage Dealt`; break
            case 3496: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nAdd${effect[0]==1?`s`:``} Equal Block\nNext ${effect[1]!=1?`${effect[1]} `:``}Time${pl(effect[1])} You\nGain Block Deal${effect[1]==1?`s`:``}\nEqual Damage to\na Random Enemy`; break
            case 3497: string+=`Gain ${effect[0]} Energy\nPer Miracle in Hand`; break
            case 3498: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nFrom Draw Each Turn`; break
            case 3499: string+=`Gain ${effect[0]} Strength\nShuffle a Refracted\nSunlight into Draw`; break
            case 3500: string+=`Add ${effect[0]} Barrier\nNext Combat`; break
            case 3501: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen You Enter\nElemental Form`; break
            case 3502: string+=`Next Luck-Based Card\nis Guaranteed\nDiscard the Card\nto the Right`; break
            case 3503: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nChoose a Chip Card\nto Add to Hand`; break
            case 3504: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nApply ${effect[1]} Stun\nto Single Target`; break
            case 3505: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nLeft of Hand:\nGain ${effect[1]} Energy`; break
            case 3506: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n50% Change to Damage\nEach Adjacent Combatant`; break
            case 3507: string+=`Add ${effect[0]} Random\n1 Cost Card${effect[0]!=1?`s`:``} of\nEquivalent Level to Hand\nGain ${effect[1]} Energy Next Turn`; break
            case 3508: string+=`Choose an Uncommon\nCard to Add to Hand\nIt Costs 0`; break
            case 3509: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nAdd a Dark Residue\nto Discard Pile`; break
            case 3510: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nAll Enemies Gain\n${effect[1]} Strength And\n${effect[2]} Dexterity`; break
            case 3511: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDecreases by ${effect[1]}\nWhen Incremented`; break
            case 3512: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nGain X-1 Energy\nNext Turn`; break
            case 3513: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Exhausted,\nGain ${effect[1]} Energy\nA Random Card\nCosts ${effect[2]} Less`; break
            case 3514: string+=`Next X Cost Card\nPlayed Gets +${effect[0]} to X`; break
            case 3515: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nWhen You Lose\nHealth On Your Turn`; break
            case 3516: string+=`Gain ${effect[0]} Currency\nApply ${effect[1]} Burn\nIf Target Has Burn`; break
            case 3517: string+=`Summon in a Yes Man`; break
            case 3518: string+=`All Cards in Hand\nBecome Ethereal\nGain ${effect[0]} Strength Each`; break
            case 3519: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nDamage Increases by ${effect[2]}\nWhen an Attack is Played\nBlock Increases by ${effect[3]}\nWhen a Defense is Played`; break
            case 3520: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nThe Final Boss\nLoses ${effect[1]} Health`; break
            case 3521: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nWhen You Gain Energy`; break
            case 3522: string+=`Draw ${effect[0]} Attack${pl(effect[0])}\nEvery Turn`; break
            case 3523: string+=`Add Any ${effect[0]} Random\nSkill${pl(effect[0])} to Hand Each Turn\n${effect[0]!=1?`They Cost`:`It Costs`} 0 and Exhaust${effect[0]==1?`s`:``}`; break
            case 3524: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPermanently\nIncreases by ${effect[1]}\nLose ${effect[2]} Health`; break
            case 3525: string+=`For Every 3\nCards Exhausted,\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 3526: string+=`When a Non-Shiv\nCard is Exhausted,\nAdd ${effect[0]} Shiv${pl(effect[0])}\nto Hand`; break
            case 3527: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage 3 Times\nIncreases by ${effect[1]} When a\nCard is Drawn Outside\nof the Draw Step`; break
            case 3528: string+=`When You Add\n12 or More Block,\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 3529: string+=`Scry ${effect[0]}\nAdd ${this.calculateEffect(effect[1],1)} Block For\nEach Defense Discarded\nDraw ${effect[2]} Card${effect[2]!=1?`s`:``}`; break
            case 3530: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nScry ${effect[1]}\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3531: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTake Another Turn`; break
            case 3532: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nWrath:\nAdds Double Block\nDivinity:\nAdds Triple Block`; break
            case 3533: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Exhausted,\nAdd ${effect[1]} Prismatic\nBomb${pl(effect[1])} to Draw Pile`; break
            case 3534: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nWhen You Lose a Buff`; break
            case 3535: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nIf You Have Strength`; break
            case 3536: string+=`Add ${effect[0]} Astrolog${effect[0]!=1?`ies`:`y`}\nto Hand Each Turn\nIf You Have None`; break
            case 3537: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd an Astrology\nto Hand`; break
            case 3538: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]} When a\nPrismatic Bomb Activates`; break
            case 3539: string+=`When You Build a\nConstruct, Gain ${effect[0]} Metal`; break
            case 3540: string+=`Attacks This Combat\nApply ${effect[0]} Jinx`; break
            case 3541: string+=`Attacks This Combat\nApply ${effect[0]} Shock`; break
            case 3542: string+=`Gain ${effect[0]} Ammo\nPer Turn`; break
            case 3543: string+=`When You Play\na Countdown,\nReduce Another\nCountdown by ${effect[0]}`; break
            case 3544: string+=`Add ${effect[0]} Random\nCommon Colorless\nCard${pl(effect[0])} to Hand\nEvery Turn`; break
            case 3545: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWrath:\nAdd a Smite to Hand`; break
            case 3546: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nSturdy:\nAdd a Safety to Hand`; break
            case 3547: string+=`Gain a Common\nCard Reward\nLose ${effect[0]} Health`; break
            case 3548: string+=`Add ${effect[0]} Random\nAttack${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily\nAdd ${effect[0]} Random\nSkill${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 0 Temporarily\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3549: string+=`Add ${effect[0]} Random\nAttack${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0\nAdd ${effect[0]} Random\nSkill${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 0\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3550: string+=`Take No Damage\nThis Turn\nTake it in 2 Turns Instead`; break
            case 3551: string+=`${variants.mtg?`Gain ${effect[0]} Random Energy`:`A Random Card\nCosts ${effect[0]} Less`}`; break
            case 3552: string+=`20%:\nEdition a Card`; break
            case 3553: string+=`30%:\nEdition a Card`; break
            case 3554: string+=`Apply ${effect[0]} Dodge\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3555: string+=`Gain an Uncommon\nCard Reward\nLose ${effect[0]} Health`; break
            case 3558: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nNext Turn, a Random\nCard Costs ${effect[1]} Less`; break
            case 3559: string+=`The Next Card\nAdded to Deck\nBecomes Foil`; break
            case 3560: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nIf You Have No Block\nLose ${effect[2]} Block\nIf You Have Block`; break
            case 3561: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Common Card${pl(effect[1])}`; break
            case 3562: string+=`Apply ${effect[0]} Vulnerable\nApplies Double if\nNo Enemies Are\nAdjacent to Target`; break
            case 3563: string+=`Gain ${effect[0]} Energy\nLose a Random Item\nIf You Have One`; break
            case 3564: string+=`Add a Random\nAlly Card of Equivalent\nLevel to Deck`; break
            case 3565: string+=`Remove a Card\nPermanently\nIf it Has an Edition,\nTransfer it to a\nRandom Other Card`; break
            case 3566: string+=`Remove a Random\nCard From Deck\nMake a Card Erratic\nPermanently`; break
            case 3567: string+=`Draw ${effect[0]!=1?`${effect[0]}`:``}X${effect[1]!=0?`+${effect[1]}`:``} Cards\nExhaust ${effect[2]!=1?`${effect[2]}`:``}X${effect[3]!=0?`+${effect[3]}`:``} Cards\nGain ${effect[4]!=1?`${effect[4]}`:``}X${effect[5]!=0?`+${effect[5]}`:``} Energy`; break
            case 3568: string+=`+1: Counter ${effect[0]} All\n-3: Add Block Equal to\nYour Last Block${effect[1]>0?`\nAdded Times ${effect[1]}`:`Added`}\n-8: Add ${effect[2]} Random\nSculpture${pl(effect[2])} of Equivalent\nLevel to Hand,\n${effect[2]!=1?`They Cost`:`It Costs`} 0`; break
            case 3569: string+=`+1: Deal ${this.calculateEffect(effect[0],0)} Damage\nto the Enemy With\nthe Highest Health\n-2: Remove All Block\nFrom All Enemies\n-12: Transform and\nUpgrade a Card\nPermanently`; break
                case -133: string+=`-2: Remove All Block\nFrom All Enemies`; break
                case -134: string+=`-12: Transform and\nUpgrade a Card\nPermanently`; break
            case 3570: string+=`Lefmost Card in Hand:\nPut a Card in Discard\nPile in Your Hand\nRightmost Card in Hand:\nPut a Card in Draw\nPile in Your Hand`; break
            case 3571: string+=`Defenses and Skills\nCost ${effect[0]} Less\nThis Combat`; break
            case 3572: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Attack${pl(effect[1])}`; break
            case 3573: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\nSpend ${effect[1]} Charge:\nApply ${effect[2]} Freeze`; break
            case 3574: string+=`When Vanished,\nGain a Common Relic`; break
            case 3575: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Strength When\nYou Dodge an Attack`; break
            case 3576: string+=`Gain ${effect[0]} Energy When\nYou Dodge an Attack`; break
            case 3577: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nApply ${effect[1]} Frail\nGain ${effect[2]} Dodge\nAdvance`; break
            case 3578: string+=`Choose a Card\nFrom ${effect[0]} Choices\nFrom Draw Pile\nto Add to Hand\nDiscard the Rest`; break
            case 3579: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked, Apply\n${effect[1]} Damage Taken Up`; break
            case 3580: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto a Random Enemy\n${effect[1]} Time${effect[1]!=1?`s`:``}\nIgnore Block\nGain ${effect[2]} Strength`; break
            case 3581: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block\nGain ${effect[1]} Energy\nWhen Drawn,\nLose ${effect[2]} Energy`; break
            case 3582: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\nAdd Barrier Equal to\nUnblocked Damage Dealt`; break
            case 3583: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage to\nAll Combatants 2 Tiles\nAway Orthogonally or 1\nTile Away Diagonally`; break
            case 3584: string+=`+1: Scry ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}\n-3: Add ${this.calculateEffect(effect[2],1)} Block\nUpgrade ${effect[3]} Card${pl(effect[3])}\n-6: Deal ${this.calculateEffect(effect[4],0)} Damage\nto Any Enemy\nIf Fatal, Gain ${effect[5]} Intangible`; break
                case -1035: string+=`-3: Add ${this.calculateEffect(effect[2],1)} Block\nUpgrade ${effect[3]} Card${pl(effect[3])}`; break
                case -1036: string+=`-6: Deal ${this.calculateEffect(effect[4],0)} Damage\nto Any Enemy\nIf Fatal, Gain ${effect[5]} Intangible`; break
            case 3585: string+=`+1: Gain ${effect[0]} Temporary Strength\nGain ${effect[1]} Temporary Dexterity\n-2: Gain ${effect[2]} Dodge\nGain ${effect[3]} Temporary Strength\nFor Each Dodge You Have\n-5: Draw to ${effect[4]} Card${pl(effect[4])}\nGain ${effect[5]} Energy`; break
                case -1037: string+=`-2: Gain ${effect[2]} Dodge\nGain ${effect[3]} Temporary Strength\nFor Each Dodge You Have`; break
                case -1038: string+=`-5: Draw to ${effect[4]} Card${pl(effect[4])}\nGain ${effect[5]} Energy`; break
            case 3586: string+=`+1: Discard Up to ${effect[0]} Card${pl(effect[0])}\nDraw an Equal Number of Cards\n-2: Choose an Uncommon Attack,\nDefense, Movement, or Skill of\nEquivalent Level to Add to Hand\nIt Costs 0\n-4: Choose a Rare Attack,\nDefense, Movement, or Skill of\nEquivalent Level to Add to Hand\nIt Costs 0`; break
                case -1039: string+=`-2: Choose an Uncommon Attack,\nDefense, Movement, or Skill of\nEquivalent Level to Add to Hand\nIt Costs 0`; break
                case -1040: string+=`-4: Choose a Rare Attack,\nDefense, Movement, or Skill of\nEquivalent Level to Add to Hand\nIt Costs 0`; break
            case 3587: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 3588: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nRepeat${effect[0]==1?`s`:``} Damage Dealt\n2 Turns Later`; break
            case 3589: string+=`Gain ${variants.mtg?effect[1]:effect[0]} ${variants.mtg?`White `:``}Energy\n${variants.mtg?``:`Next Attack Deals\n${effect[2]} Less Damage`}`; break
            case 3590: string+=`${variants.mtg?`Gain ${effect[0]} Energy\nas 1 of Each Color`:`${effect[0]==1?`A`:`${effect[0]}`} Random Card${pl(effect[0])}\nCost${effect[0]==1?`s`:``} ${effect[1]} Less`}`; break
            case 3591: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n${variants.mtg?`Gain ${effect[1]} Random Energy`:`A Random Card\nCosts ${effect[1]} Less`}`; break
            case 3592: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nSlightly Compact Cards\nThis Combat`; break
            case 3593: string+=`Open a Spectral Pack\nAnd Add it to Hand\nLose ${effect[0]} Currency\nGain ${effect[1]} Weak\nGain ${effect[2]} Vulnerable`; break
            case 3594: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nFrom Directly Behind\nGain ${effect[2]} Ammo`; break
            case 3595: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage`; break
            case 3596: string+=`Upgrade ${effect[0]} Card${pl(effect[0])}\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3597: string+=`Counter ${effect[0]} All\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3598: string+=`${effect[0]} Balance\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3599: string+=`Add ${effect[0]} Broken\nShiv${pl(effect[0])} to Hand\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3600: string+=`Gain ${effect[0]} Armor\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3601: string+=`Gain ${effect[0]} Burn\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3602: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3603: string+=`Gain ${effect[0]} Jinx\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3604: string+=`Gain ${effect[0]} Shock\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3605: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3606: string+=`Gain ${effect[0]} Mundane\nDust Item${pl(effect[0])}\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3607: string+=`Gain ${effect[0]} Vision\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3608: string+=`Hold ${effect[0]} Glass Orb${pl(effect[0])}\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3609: string+=`Enter Depression\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3610: string+=`Gain ${effect[0]} Charge\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3611: string+=`Scry ${effect[0]}\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3612: string+=`Add ${effect[0]} Defend${pl(effect[0])} to Hand\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 3613: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nMay Target Any Tile\nWithin Range ${target[1]}-${target[2]}\nOdd Energy:\nGain ${effect[1]} Energy`; break
            case 3614: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Card${pl(effect[2])}`; break
            case 3615: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nOdd Energy:\nApply ${effect[1]} Freeze\nEven Energy:\nApply ${effect[1]} Burn`; break
            case 3616: string+=`Target Moves in a\nRandom Direction\nApply ${effect[0]} Vulnerable`; break
            case 3617: string+=`Target Moves in a\nRandom Direction\nApply ${effect[0]} Vulnerable\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 3618: case 3834:
                string+=`All Attacks This Turn\nApply ${effect[0]} Lock On`; break
            case 3619: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked, Apply\n${effect[1]} Lock On`; break
            case 3620: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nApply ${effect[1]} Freeze\nEven Energy:\nApply ${effect[1]} Burn`; break
            case 3621: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Energy:\nApply ${effect[1]} Jinx`; break
            case 3622: case 3636:
                string+=`Apply ${effect[0]} Lock On\nApply ${effect[1]} Strength`; break
            case 3623: string+=`Apply ${effect[0]} Vulnerable\nApply ${effect[1]} Strength`; break
            case 3624: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Lock On`; break
            case 3625: string+=`Add ${effect[0]} Miracle${pl(effect[0])} to Hand\nDraw ${effect[1]} Card${pl(effect[1])}\nAdd a Quiet\nMoonlight to Discard`; break
            case 3626: string+=`Add ${effect[0]} Miracle${pl(effect[0])} to Hand\nDraw ${effect[1]} Card${pl(effect[1])}\nAdd a Refracted\nSunlight to Discard`; break
            case 3627: string+=`Add ${effect[0]} Miracle${pl(effect[0])} to Hand\nDraw ${effect[1]} Card${pl(effect[1])}\nAdd a Glamorous\nStarlight to Discard`; break
            case 3628: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nAdd to Discard:\nQuiet Moonlight\nRefracted Sunlight\nGlamorous Starlight`; break
            case 3629: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}\nLose ${effect[3]} Energy\nNext Turn`; break
            case 3630: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nExhaust Up to ${effect[1]} Card${pl(effect[1])}\nDraw an Equal\nNumber of Cards`; break
            case 3631: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}\nWhen Etherealed,\nDraw ${effect[2]} More Card${pl(effect[2])}\nNext Turn`; break
            case 3632: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTake Another Turn\nAll Cards Cost\n${effect[1]} More on That Turn`; break
            case 3633: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Prismatic\nBomb${pl(effect[1])} to Draw Pile`; break
            case 3634: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nApply ${effect[1]} Bleed\nGain ${effect[2]} Intangible\nAdvance`; break
            case 3635: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nApply ${effect[1]} Lock On\nGain ${effect[2]} Dodge\nAdvance`; break
            case 3637: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} or More\nCards in Hand:\nGain ${effect[2]} Energy`; break
            case 3638: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} or Less\nCards in Hand:\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3639: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n${effect[1]} or More\nCards in Hand:\nGain ${effect[2]} Energy`; break
            case 3640: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n${effect[1]} or Less\nCards in Hand:\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3641: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n${effect[1]} or More\nCards in Hand:\nGain ${effect[2]} Energy`; break
            case 3642: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n${effect[1]} or Less\nCards in Hand:\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3643: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Miss\nApply ${effect[2]} Weak\nto Any Enemy`; break
            case 3644: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2nd Card in Hand:\nApply ${effect[1]} Bruise`; break
            case 3646: string+=`Apply ${effect[0]} Buffer\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3647: string+=`Exactly 5 Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nIgnore Block`; break
            case 3648: string+=`Gain ${effect[0]} Conditioning\nNext Attack is Free`; break
            case 3649: string+=`Gain ${effect[0]} Buffer\nAdd ${this.calculateEffect(effect[1],1)} Block\nNext Turn`; break
            case 3650: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Buffer\nNext Turn`; break
            case 3651: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nElemental Form:\nNext Skill is Free`; break
            case 3652: string+=`Take Another Turn\nGain ${effect[0]} Dodge\non That Turn`; break
            case 3653: string+=`Gain ${effect[0]} Dodge\nTake ${effect[1]} Damage\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3654: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Bleed\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3655: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Shock\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3656: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Hand Size`; break
            case 3657: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Hand Size`; break
            case 3658: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nAdd ${this.calculateEffect(effect[1],3)} Block\nWhere X = Hand Size\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3659: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],3)} Block\nWhere X = Hand Size`; break
            case 3660: string+=`Discard Your Hand\nDraw That Many More\nCards Next Turn`; break
            case 3661: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nPer Adjacent Enemy`; break
            case 3662: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${variants.mtg?`Gain ${effect[1]} Random Energy`:`A Random Card\nCosts ${effect[1]} Less`}`; break
            case 3663: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n50%: Deal ${this.calculateEffect(effect[1],0)} Damage\nto a Random Enemy\n50%: Add ${this.calculateEffect(effect[2],1)} Block`; break
            case 3664: string+=`The Next Time\nYou Roll Dice,\nRoll ${effect[0]} More`; break
            case 3665: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n${effect[1]} or Less Currency:\nGain ${effect[2]} Currency`; break
            case 3666: string+=`Discard Your Hand\nDraw That Many Cards\nUpgrade ${effect[0]} Card${pl(effect[0])}`; break
            case 3667: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number of\nUnplayable Cards in Hand\nDiscard ${effect[2]} Card${pl(effect[2])}`; break
            case 3668: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Removed,\nGain a Relic`; break
            case 3669: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2nd Card in Hand:\nApply ${effect[1]} Vulnerable`; break
            case 3670: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Last Card Played\nWas a Different Color,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3671: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nAfter Each Elite or\nBoss is Defeated`; break
            case 3672: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nUpgrade a Card\nFrom Discard`; break
            case 3673: string+=`Transform a Card\nInto Any Random\nDouble Upgraded Card\nWith an Edition`; break
            case 3674: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Random Mineral\nCard to Hand and\nRetain it Until Played`; break
            case 3675: string+=`Discard ${effect[0]} Card${pl(effect[0])}`; break
            case 3676: string+=`Requires X = ${effect[0]} Exactly\n50%: Add a Keyblade\nof Equivalent Level\nto Hand`; break
            case 3677: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nApply ${effect[1]} Freeze\nin All Directions\nFreeze Increases by ${effect[2]}\nWhen Movement Played`; break
            case 3678: string+=`${variants.mtg?`Gain ${effect[0]} Energy\nas Blue, Green,\nGreen, Rainbow`:`Draw ${effect[1]} Attack${pl(effect[1])}\nDraw ${effect[2]} Movement${pl(effect[2])}\nDraw ${effect[3]} Skill${pl(effect[3])}`}`; break
            case 3679: string+=`Draw ${effect[0]} Blueprint${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 2 Less\nTemporarily`; break
            case 3680: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n1/3: Apply ${effect[1]} Freeze\n1/3: Apply ${effect[2]} Poison\n1/3: Apply ${effect[3]} Bleed\nElemental Form:\nGuarantee All Chances`; break
            case 3681: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpward:\nNext Movement is Free`; break
            case 3682: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Removed,\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 3683: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Block Add${pl(effect[0])}\nRepeat${effect[0]==1?`s`:``} Block Added\n2 Turns Later`; break
            case 3684: string+=`Gain ${effect[0]} Energy\nNext Turn\nLose ${effect[1]} Health`; break
            case 3685: string+=`Gain ${effect[0]} Temporary\nStrength When a\nCard is Exhausted`; break
            case 3686: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nAll Cards in Hand\nCost ${effect[1]} Less Temporarily\nLose ${effect[2]} Energy Next Turn`; break
            case 3687: string+=`Put a Card in Discard\nPile in Your Hand\nIt Duplicates Once`; break
            case 3688: string+=`Remove All\nBlock of Target\nIf it Had Block,\nApply ${effect[0]} Weak\nApply ${effect[1]} Vulnerable`; break
            case 3689: string+=`+1: Draw ${effect[0]} Card${pl(effect[0])}\nExhaust ${effect[1]} Card${pl(effect[1])}\n-4: Reflect Next Hit Taken\n-9: Add ${effect[2]} Discus${effect[2]!=1?`es`:``} of\nLight and Dark of\nEquivalent Level\nto Hand\n${effect[2]!=1?`They Cost`:`It Costs`} 0`; break
            case 3690: string+=`Attacks This Combat\nApply ${effect[0]} Poison`; break
            case 3691: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Once\nCounter ${effect[2]} Once Next Turn`; break
            case 3692: string+=`If Target Has No\nBleed and No Block,\nApply ${effect[0]} Bleed\nOtherwise,\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 3693: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nChoose and Exhaust a\nCard From the First ${effect[1]}\nin Draw Pile`; break
            case 3694: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 2nd Time Played,\nIgnore Block\nOn Play: ${this.limit%2+1}/2`; break
            case 3695: string+=`Every 2nd Time Played,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nOtherwise,\nHeal Target For ${effect[1]}\nOn Play: ${this.limit%2+1}/2`; break
            case 3696: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 2nd Time Played,\nAdd ${this.calculateEffect(effect[1],1)} Block\nOn Play: ${this.limit%2+1}/2`; break
            case 3697: string+=`Every 2nd Time Played,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nOtherwise,\nDraw ${effect[1]} Card${pl(effect[1])}\nOn Play: ${this.limit%2+1}/2`; break
            case 3698: string+=`Every 4th Time Played,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nOtherwise,\nHeal Target For ${effect[1]}\nOn Play: ${this.limit%4+1}/4`; break
            case 3699: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 2nd Time Played,\nDeals Double Damage\nEvery 4th Time Played,\nHeals Target Instead\nOn Play: ${this.limit%4+1}/4`; break
            case 3700: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nApply ${effect[1]} Bruise`; break
            case 3701: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nApply ${effect[2]} Shock`; break
            case 3702: string+=`Even Energy:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 3703: string+=`Gain ${effect[0]} Currency\nIf You Have Played\n${effect[1]} Attacks This Turn`; break
            case 3704: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Incremented\nIncreases by ${effect[2]} When\nYou Play a Movement`; break
            case 3705: string+=`Deal ${this.calculateEffect(effect[0],20)} Splash Damage\nWhere Y = Number of\nCards Played This Turn`; break
            case 3706: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Half Damage\nIf You Have No Block\nLose ${effect[1]} Block\nIf You Have Block`; break
            case 3707: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard Up to ${effect[1]} Card${pl(effect[1])}\nDraw Cards Equal to\nthe Number Discarded`; break
            case 3709: string+=`Every 2nd Time Played,\nDeal ${this.calculateEffect(effect[0],0)} Damage\nOn Play: ${this.limit%2+1}/2`; break
            case 3708: string+=`Gain ${effect[0]} Vision\nNext Combat`; break
            case 3710: string+=`Gain ${effect[0]!=1?`${effect[0]}`:``}X${effect[1]!=0?`+${effect[1]}`:``} Temporary\nStrength Where\nX = Number of Cards\nPlayed Last Turn${stage.scene=='battle'&&this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].hand.lastTurnPlayed[0]*effect[0]+effect[1]})`:``}`; break
            case 3711: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nIf You Have\nTemporary Strength`; break
            case 3712: string+=`Deal and Take\nTriple Damage in Wrath\n(Instead of Double)`; break
            case 3713: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust ${effect[1]} Random Card${pl(effect[1])}\nFrom Discard Pile`; break
            case 3714: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\n2 Tiles Away in a\nRandom Direction ${effect[1]} Time${pl(effect[1])}`; break
            case 3715: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvery 2nd Time Played,\nDeals Damage\nin All Directions\nOn Play: ${this.limit%2+1}/2`; break
            case 3716: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Throwing\nKni${effect[1]!=1?`ves`:`fe`} to Hand`; break
            case 3717: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[1],0)} Damage\nto a Random Enemy\nWhen Discarded Normally\nor Selectively`; break
            case 3718: string+=`Upgrade ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Temporary\nStrength\nLose ${effect[2]} Health`; break
            case 3719: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCreate 1 Plant Tile\nUnder Self`; break
            case 3720: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Claw${pl(effect[1])}\nto Hand`; break
            case 3721: string+=`10%:\nChoose a Spectral\nCard of Equivalent Level\nto Add to Hand\n90%:\nChoose a Prehextorica\nCard of Equivalent Level\nto Add to Hand`; break
            case 3722: string+=`Add a Random\nEquipment Pack\nof Equivalent Level\nto Hand`; break
            case 3723: string+=`Upgrade All\nAttacks in Hand\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 3724: string+=`+1: A Random Enemy\nLoses ${effect[0]} Health Per Turn\n(Does Not Stack)\n-2: Apply ${effect[1]} Weak\nApply ${effect[2]} Vulnerable\nto Any Enemy\n-10: Add a Random\nSpectral Card to Hand`; break
                case -1041: string+=`-2: Apply ${effect[1]} Weak\nApply ${effect[2]} Vulnerable\nto Any Enemy`; break
                case -1042: string+=`-10: Add a Random\nSpectral Card to Hand`; break
            case 3725: string+=`+1: Apply ${effect[0]} Lock On\nto a Random Enemy\n-3: All Attacks This Turn\nApply ${effect[1]} Lock On\n-8: Deal ${this.calculateEffect(effect[2],0)} Damage\n2 Times\nApply ${effect[3]} Lock On\nGain ${effect[4]} Dodge\nAdvance\nRange 1-3`; break
                case -1043: string+=`-3: All Attacks This Turn\nApply ${effect[1]} Lock On`; break
                case -1044: string+=`-8: Deal ${this.calculateEffect(effect[2],0)} Damage\n2 Times\nApply ${effect[3]} Lock On\nGain ${effect[4]} Dodge\nAdvance\nRange 1-3`; break
            case 3726: string+=`+1: Gain ${effect[0]} Temporary Strength\nDiscard ${effect[1]} Random Non-Attack${pl(effect[1])}\n-4: Next ${effect[2]} Card${pl(effect[2])}\nPlayed ${effect[2]!=1?`are`:`is`} Duplicated\n-7: All Cards in Hand\nBecome Ethereal\nGain ${effect[3]} Strength Each`; break
                case -1045: string+=`-4: Next ${effect[2]} Card${pl(effect[2])}\nPlayed ${effect[2]!=1?`are`:`is`} Duplicated`; break
                case -1046: string+=`-7: All Cards in Hand\nBecome Ethereal\nGain ${effect[3]} Strength Each`; break
            case 3727: string+=`+1: Deal ${this.calculateEffect(effect[0],0)} Damage to a\nRandom Enemy ${effect[1]} Time${pl(effect[1])}\nDeals Damage an Extra Time\nFor Each Curse in Deck\n-3: Add a Random Curse\nof Equivalent Level to Deck\n-5: Remove a Curse\nFrom Deck\n-9: Transform a Curse\nFrom Deck`; break
                case -1047: string+=`-3: Add a Random Curse\nof Equivalent Level to Deck`; break
                case -1048: string+=`-5: Remove a Curse\nFrom Deck`; break
                case -1049: string+=`-9: Transform a Curse\nFrom Deck`; break
            case 3728: string+=`Next Card Reward\nHas ${effect[0]} More Choice${pl(effect[0])}`; break
            case 3729: string+=`Next Card Reward\nHas ${effect[0]} Less Choice${pl(effect[0])}`; break
            case 3730: string+=`Gain a Common\nCard Reward From a\nRandom Character`; break
            case 3731: string+=`Gain ${effect[0]} Wish Power`; break
            case 3732: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Wish Power`; break
            case 3733: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Wish Power`; break
            case 3734: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nGain ${effect[1]} Wish Power`; break
            case 3735: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Wish Power`; break
            case 3736: string+=`Remove ${effect[0]} Temporary\nStrength From All Enemies\nAdd ${effect[1]} Shadow${pl(effect[1])} to Hand\nGain ${effect[2]} Wish Power`; break
            case 3737: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Attack${pl(effect[1])}`; break
            case 3738: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Defense${pl(effect[1])}`; break
            case 3739: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Movement${pl(effect[1])}`; break
            case 3740: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Skill${pl(effect[1])}`; break
            case 3741: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nIf Played First,\nApply ${effect[2]} Lock On`; break
            case 3742: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 0 When You\nDraw a Card`; break
            case 3743: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCosts 0 When You\nDraw a Card`; break
            case 3744: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nYou Draw a Card`; break
            case 3745: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]} When\nYou Draw a Card`; break
            case 3746: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIncreases by ${effect[1]} When\nYou Draw a Card\n(Max 3)`; break
            case 3747: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Energy\nLose ${effect[2]} Energy\nNext Turn`; break
            case 3748: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nIf Played First,\nGain ${effect[1]} Energy`; break
            case 3749: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Block\nFor ${effect[1]} Turn${pl(effect[1])}\nGain ${effect[2]} Dodge`; break
            case 3750: string+=`Gain ${effect[0]} Dodge\nEnd Your Turn`; break
            case 3751: string+=`All Combatants\nGain ${effect[0]} Dodge`; break
            case 3752: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain the Most\nExpensive Card in Hand\nUntil Played\n(Picks Randomly if Tied)`; break
            case 3753: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Drawn,\nGains a Random Edition`; break
            case 3754: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nWhen Drawn,\nGains a Random Edition`; break
            case 3755: string+=`Gain ${effect[0]}${variants.mtg?` Random`:``} Energy\nEvery 5 Cards Played`; break
            case 3756: string+=`Gain ${effect[0]}${variants.mtg?` Red`:``} Energy\nGives Triple During\nElite and Boss Combats`; break
            case 3757: string+=`Gain ${effect[0]} Energy${variants.mtg?`\nof Any Color`:``}`; break
            case 3758: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Added,\nGain ${effect[1]} Currency`; break
            case 3759: string+=`When Added,\nGain ${effect[0]} Currency\nWhen Removed,\nLose ${effect[1]} Currency`; break
            case 3760: string+=`Choose a Common\nCard to Add to Hand\nIt Costs 0\nDrawn 1 Time: (${this.drawn})\nGain ${effect[0]} Energy`; break
            case 3761: string+=`Upgrade ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Drop${pl(effect[1])}`; break
            case 3762: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nBlackjack:\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3763: string+=`Add Block Equal\nto Hitscore${effect[0]!=0?` +${effect[0]}`:``}`; break
            case 3764: string+=`${variants.mtg?`Convert All Energy\nto Rainbow`:`Gain ${effect[0]} Energy`}`; break
            case 3765: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Damage an\nAdditional Time if\nRainbow Energy Spent`; break
            case 3766: string+=`Apply ${effect[0]} Freeze\nin All Directions`; break
            case 3767: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has\nLess Than ${effect[1]} Health,\nApply ${effect[2]} Stun`; break
            case 3768: string+=`When You Draw\na Status Card,\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 3769: string+=`Gain ${effect[0]} Strength\nBelow 50% Health:\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 3770: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncrease a Random\nDebuff of Target by ${effect[1]}`; break
            case 3771: string+=`Deal ${this.calculateEffect(effect[0],0)}-${this.calculateEffect(effect[1],11)} Damage\nWhere X = (Range-1)\nIncrease a Random\nDebuff of Target by ${effect[2]}`; break
            case 3772: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPer Adjacent Enemy`; break
            case 3773: string+=`Gain ${effect[0]} Temporary\nStrength When You\nPlay a Skill`; break
            case 3774: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nEven Turn:\nAdd ${this.calculateEffect(effect[1],1)} Block\nNext Turn`; break
            case 3775: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Poison`; break
            case 3776: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nWhen Drawn,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3777: string+=`Take Another Turn\nAdd a Void\nto Discard Pile`; break
            case 3778: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAbove 50% Health:\nDraw ${effect[1]} Attack${pl(effect[1])}\nOtherwise:\nDraw ${effect[2]} Defense${pl(effect[2])}`; break
            case 3779: string+=`Swap 2 Random\nEnemy Locations`; break
            case 3780: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nLefmost Card in Hand:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3781: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nIf X is 5 or More,\nAll Cards in Hand\nCost ${effect[1]} Less Temporarily`; break
            case 3782: string+=`Apply ${effect[0]} Vulnerable\nto Any Enemy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3783: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} Faith\nDivinity:\nGives Double Strength`; break
            case 3784: string+=`Gain ${effect[0]} Faith\nChoose a Sanae Card\nto Add to Hand`; break
            case 3785: string+=`Gain ${effect[0]} Strength\nLefmost Card in Hand:\nGives Double Strength`; break
            case 3786: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Takes Double\nDamage This Turn`; break
            case 3787: string+=`Deal Damage\nAccording to a Bell\nCurve With Mean ${effect[0]} and\nStandard Deviation ${effect[1]}`; break
            case 3788: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nor ${effect[1]} Tile${pl(effect[1])}\nHorizontally`; break
            case 3789: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nor ${effect[1]} Tile${pl(effect[1])} Bottom\nRight or Top Left`; break
            case 3790: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nor ${effect[1]} Tile${pl(effect[1])} Top\nRight or Bottom Left`; break
            case 3791: string+=`50%:\nPut a Card in Discard\nPile in Your Hand\n50%:\nPut a Card in Draw\nPile in Your Hand`; break
            case 3792: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Add ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 3793: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n10%: Counter ${effect[1]}`; break
            case 3794: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n10%: Apply ${effect[1]} Burn\nin All Directions`; break
            case 3795: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],1)} Block\nIf You Have\na Shield Orb`; break
            case 3796: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nIf You Have\nan Energy Orb`; break
            case 3797: string+=`1 or Less\nNon-Movement in Hand:\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 3798: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Focus`; break
            case 3799: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCounter ${effect[1]} All`; break
            case 3800: string+=`Move ${effect[0]} Tile${pl(effect[0])}\n5 Cards in Hand:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3801: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nBecome Confused`; break
            case 3802: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Mundane\nDust Item${pl(effect[1])}`; break
            case 3803: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nNext Defense is Free`; break
            case 3804: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nElemental Form:\nCounter ${effect[1]} All\nGain ${effect[2]} Vision`; break
            case 3805: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]} When\nYou Amplify`; break
            case 3806: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPer Adjacent Enemy,\nGain ${effect[1]} Armor`; break
            case 3807: string+=`Scry ${effect[0]}\nLose ${effect[1]} Energy\nNext Turn`; break
            case 3808: string+=`When Etherealed,\nAdd a Dual Discus\nof Equivalent Level\nto Hand`; break
            case 3809: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random\nAttack${pl(effect[2])}`; break
            case 3810: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random\nDefense${pl(effect[2])}`; break
            case 3811: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random\nMovement${pl(effect[2])}`; break
            case 3812: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random\nPower${pl(effect[2])}`; break
            case 3813: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nDiscard ${effect[2]} Random\nSkill${pl(effect[2])}`; break
            case 3814: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Bleed`; break
            case 3815: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 Temporarily\nWhen You Rearm`; break
            case 3816: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]} When\nYou Break Balance`; break
            case 3817: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nApply ${effect[1]} Weak\nin All Directions\nIf You Have an Active\nAlly Card in Hand,\nApply ${effect[2]} Poison\nin All Directions`; break
            case 3818: string+=`Lose ${effect[0]} Health\nSummon 3 Fairies of Light\nof Equivalent Level\nAdd One to Hand\nShuffle the Others\ninto Draw Pile`; break
            case 3819: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n5+ Balance:\nGain ${effect[1]} Energy`; break
            case 3820: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\n${effect[1]} Balance`; break
            case 3821: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nNext Turn, Gain ${effect[1]} Energy\nand a Random\nCard Costs ${effect[2]} More`; break
            case 3822: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Remove\n${effect[1]} Dexterity`; break
            case 3823: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Miracle${pl(effect[1])} to Hand\nGain ${effect[2]} Strength Per Power\nPlayed This Combat`; break
            case 3824: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAmplify 2:\nAll Cards in Hand\nCost ${effect[1]} Less Temporarily`; break
            case 3825: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nCosts 1 Less Temporarily\nWhen a Colorless\nCard is Played`; break
            case 3826: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nTarget Loses ${effect[1]} Health\nPer Enemy Defeated\nThis Combat`; break            
            case 3828: string+=`Upgrade ${effect[0]} Card${pl(effect[0])}\nCannot be Selected to\nUpgrade During Combat`; break
            case 3829: string+=`If You Have No Dodge,\nGain ${effect[0]} Dodge`; break
            case 3831: string+=`All Non-Wish Cards\nCost ${effect[0]} Less Temporarily`; break
            case 3833: string+=`Decrease All Damage\nTaken This Turn by ${effect[0]}\nto a Minimum of 1`; break
            case 3835: string+=`Gain ${effect[0]} Temporary\nStrength\nIncreases by ${effect[1]}`; break
            case 3836: string+=`Apply ${effect[0]} Burn\nin All Directions\nApply ${effect[1]} Freeze\nin All Directions\nGain ${effect[2]} Energy\nDraw ${effect[3]} Card${pl(effect[3])}`; break
            case 3837: string+=`Take Another Turn\nAll Cards Cost\n${effect[0]} More on That Turn`; break
            case 3838: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Uncommon Card${pl(effect[1])}`; break
            case 3839: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 1 Less\nTemporarily\nIf Played First,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3840: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nGain ${effect[1]} Bleed`; break
            case 3841: string+=`Left of Hand: Upgrade\nAll Attacks in Hand\nRight of Hand: Upgrade\nAll Defenses in Hand\nExact Center of Hand:\nUpgrades Both`; break
            case 3842: string+=`Draw ${effect[0]} Card${pl(effect[0])}${effect[0]>=2?`\n${effect[0]==2?`Swap Their Costs`:`Rotate Their Costs`}\nTemporarily`:``}`; break
            case 3843: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nRemove a Random Buff\nFrom Target`; break
            case 3844: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target Has Block`; break
            case 3845: string+=`Gain ${effect[0]} Buffer\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3846: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3847: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Miracle${pl(effect[1])} to Hand`; break
            case 3848: string+=`Apply ${effect[0]} Weak\nDraw ${effect[1]} Card${pl(effect[1])}\nGain ${effect[2]} Energy`; break
            case 3849: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 1 Less\nTemporarily`; break
            case 3850: string+=`Draw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 1 Less\nTemporarily\nNext Attack Deals\n${effect[1]} More Damage`; break
            case 3851: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nCosts ${effect[2]} Less`; break
            case 3852: string+=`Reduce All\nCountdowns by ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}\nCosts ${effect[1]} Less`; break
            case 3853: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Are Debuffed,\nApply ${effect[1]} Vulnerable`; break
            case 3854: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Block For ${effect[1]} Turn${pl(effect[1])}\nCounter ${effect[2]}`; break
            case 3855: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3856: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nDiscard ${effect[1]} Random Card${pl(effect[1])}`; break
            case 3857: string+=`Apply ${effect[0]} Freeze\nApply ${effect[1]} Bleed`; break
            case 3858: string+=`Gain ${effect[0]} Energy Per\nCountdown in Hand`; break
            case 3859: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} More\nIf Used on a Plant Tile`; break
            case 3860: string+=`When Exhausted,\nHeal ${this.calculateEffect(effect[0],4)} Health`; break
            case 3861: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target is on\na Plant Tile`; break
            case 3862: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDiscard ${effect[1]} Random Card${pl(effect[1])}`; break
            case 3863: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nIf Target Has Jinx`; break
            case 3864: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak\nto a Random Enemy\nAmplify:\nRepeat`; break
            case 3865: string+=`Gain ${effect[0]} Wish Power\nPer Turn`; break
            case 3866: string+=`Every 13 Cards Played,\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 3867: string+=`Every 13 Cards Played,\nAdd ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3868: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Miracle${pl(effect[1])} to Hand\nIf You Have Full,\nUnique Orb Slots,\nGain ${effect[2]} Focus`; break
            case 3869: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nGain ${effect[1]} Wish Power`; break
            case 3870: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block\nApply ${effect[1]} Poison`; break
            case 3871: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReflect Next Hit Taken\nAdvance`; break
            case 3872: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPierces Up to 2 Targets\nApply ${effect[1]} Lock On to Each`; break
            case 3873: string+=`Add ${effect[0]} Random\nDefense${pl(effect[0])} or Skill${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 and Exhaust${effect[0]==1?`s`:``}`; break
            case 3874: string+=`Next Attack Deals\n${effect[0]} More Damage\nFor Each Card\nPlayed Last Turn`; break
            case 3875: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Temporary\nDexterity`; break
            case 3876: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Strike${pl(effect[1])}\nof Equivalent Level\nto Hand`; break
            case 3877: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Defend${pl(effect[1])}\nof Equivalent Level\nto Hand`; break
            case 3878: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPierces Up to 2 Targets\nDraw ${effect[1]} Card${pl(effect[1])} Per Hit`; break
            case 3879: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nStrike in Hand:\nDeals Double Damage`; break
            case 3880: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDefend in Hand:\nAdds Double Block`; break
            case 3881: string+=`Apply ${effect[0]} Weak\nApply ${effect[1]} Vulnerable`; break
            case 3882: string+=`Gain ${effect[0]}${variants.mtg?` Red`:``} Energy\nDraw ${effect[1]} Card${pl(effect[1])}\nGives Triple Energy During\nElite and Boss Combats`; break
            case 3883: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Random Common\nCard of Equivalent\nLevel to Hand`; break
            case 3884: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],1)} Block\nPer Adjacent Enemy`; break
            case 3885: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrade a Card\nFrom Discard`; break
            case 3886: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPut a Card in Discard\nPile in Your Hand`; break
            case 3887: string+=`Take Another Turn\nLose ${effect[0]} Health\nAfter That Turn`; break
            case 3888: string+=`Exhaust a Card\nHeal ${this.calculateEffect(effect[0],9)} Health\nWhere X = its Cost`; break
            case 3889: string+=`Exhaust a Card\nDraw Cards Equal\nto its Cost${effect[0]!=0?` +${effect[0]}`:``}`; break
            case 3890: string+=`Discard Your Hand\nAdd ${effect[0]} Random\nAttack${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 3891: string+=`Discard Your Hand\nAdd ${effect[0]} Random\nAttack${pl(effect[0])} to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 3892: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nTo Target and to a\nRandom Other Enemy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3893: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less Temporarily\nEvery 2 Times Retained${stage.scene=='battle'?`\nCurrently: ${this.effect[1]%2+1}/2`:``}`; break
            case 3894: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 1 Less Temporarily\nEvery 2 Times Retained${stage.scene=='battle'?`\nCurrently: ${this.effect[1]%2+1}/2`:``}`; break
            case 3895: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvoke First Orb ${effect[1]} Time${pl(effect[1])}\nto Any Enemy`; break
            case 3896: string+=`Add ${effect[0]} Miracle${pl(effect[0])} to Hand\nWhen You Play a Wish`; break
            case 3897: string+=`Gain ${effect[0]} Energy\nExhaust All Powers\nin Hand`; break
            case 3898: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}\nExhaust All Powers\nin Hand`; break
            case 3899: string+=`Gain ${effect[0]} Energy\nIf You Have Less\nEnergy Than Base`; break
            case 3900: string+=`Gain ${effect[0]} Energy\nIf You Have Less\nEnergy Than Base\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3901: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCenter of Hand:\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 3902: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nReduce Another\nCountdown by ${effect[1]}`; break
            case 3903: string+=`Every Turn,\nExhaust ${effect[0]} Card${pl(effect[0])}\nDraw an Equal\nNumber of Cards`; break
            case 3904: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Weak\nGain ${effect[2]} Vulnerable\nGain ${effect[3]} Frail`; break
            case 3905: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have No Ammo,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3906: string+=`Apply ${effect[0]} Bleed\nApply ${effect[1]} Weak`; break
            case 3907: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Last Card\nPlayed Was a Gun,\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3908: string+=`+1: All Powers in Hand\nCost ${effect[0]} Less Temporarily\n-2: All Attacks in Hand\nCost ${effect[1]} Less Temporarily\n-6: All Cards in Hand\nCost ${effect[2]} Less Temporarily`; break
                case -1050: string+=`-2: All Attacks in Hand\nCost ${effect[1]} Less Temporarily`; break
                case -1051: string+=`-6: All Cards in Hand\nCost ${effect[2]} Less Temporarily`; break
            case 3909: string+=`+1: Draw ${effect[0]} Card${pl(effect[0])}\nRewind ${effect[1]} Card${pl(effect[1])}\n-4: Put a Card in Discard\nPile in Your Hand\nPut a Card in Draw\nPile in Your Hand\n-9: Discard Your Hand\nGain ${effect[2]} Energy\nDraw ${effect[3]} Card${pl(effect[3])}`; break
                case -1052: string+=`-4: Put a Card in Discard\nPile in Your Hand\nPut a Card in Draw\nPile in Your Hand`; break
                case -1053: string+=`-9: Discard Your Hand\nGain ${effect[2]} Energy\nDraw ${effect[3]} Card${pl(effect[3])}`; break
            case 3910: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Block For ${effect[1]} Turn${pl(effect[1])}\nGain ${effect[2]} Strength\nLose ${effect[3]} Health Per Turn\nWhen Drawn,\nGain ${effect[4]} Energy`; break
            case 3911: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage\nEnter Wrath`; break
            case 3912: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have Strength,\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 3913: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nPush 1 Tile\nin 3 Directions\nEnd Combo`; break
            case 3914: string+=`Gain ${effect[0]} Dodge\nDiscard ${effect[1]} Random Card${pl(effect[1])}\nDiscard When a\nCard is Played`; break
            case 3915: string+=`More Energy Than Base:\nDeal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nIgnore Block`; break
            case 3916: string+=`Choose and Add\nAny Disbanded Card\nof Equivalent Level\nto Hand`; break
            case 3917: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTransfer Target's Shock\nto a Random Enemy`; break
            case 3918: string+=`Enter Depression`; break
            case 3919: string+=`Add ${effect[0]} Random Card${pl(effect[0])}\nof Equivalent Level\nContaining 'Time'\nto Hand`; break
            case 3921: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Are Debuffed,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 3922: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Dice are Rolled`; break
            case 3923: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRange Increases by ${effect[1]}\nWhen a Basic\nCard is Played\n(Max 6)`; break
            case 3924: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nBasic Cards in Deck`; break
            case 3925: string+=`Add ${effect[0]} Strike${pl(effect[0])}\nof Equivalent Level\nWith ${effect[0]!=1?``:`a `}Random Edition${pl(effect[0])}\nto Deck Permanently`; break
            case 3926: string+=`Add ${effect[0]} Defend${pl(effect[0])}\nof Equivalent Level\nWith ${effect[0]!=1?``:`a `}Random Edition${pl(effect[0])}\nto Deck Permanently`; break
            case 3927: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nDraw ${effect[1]} Defense${pl(effect[1])}\nOtherwise,\nDraw ${effect[2]} Attack${pl(effect[2])}`; break
            case 3928: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen You Move\n${effect[2]} or More Tiles`; break
            case 3929: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRange Increases by ${effect[1]}\nWhen You Use an Item\n(Max 6)`; break
            case 3930: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nHold ${effect[1]} Shield Orb${pl(effect[1])}`; break
            case 3931: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nHold ${effect[1]} Energy Orb${pl(effect[1])}`; break
            case 3932: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nHold ${effect[1]} Light Orb${pl(effect[1])}`; break
            case 3933: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nDiagonally`; break
            case 3934: string+=`Gain ${effect[0]} Base\nEnergy This Combat\nGain ${effect[1]} Energy`; break
            case 3935: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Target\nDeal ${this.calculateEffect(effect[1],0)} Damage\nto All Enemies`; break
            case 3936: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nAll Cards in Hand\nCost 0 This Turn`; break
            case 3937: string+=`Gain ${effect[0]} Vision\nPer Turn`; break
            case 3938: string+=`Gain ${effect[0]} Knowledge\nNext 3 Turns\nGain ${effect[1]} Wisdom`; break
            case 3939: string+=`When You Start Your\nTurn in Elemental Form,\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3940: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nHold ${effect[1]} Dark Orb${pl(effect[1])}`; break
            case 3941: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 3942: string+=`Gain ${effect[0]} Strength\nGives Double if Last\nCard Remaining in Hand`; break
            case 3943: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nCosts (1) More When\na Card is Played`; break
            case 3944: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nScry ${effect[1]}\nDraw ${effect[2]} Defense${pl(effect[2])}\n${effect[2]!=1?`They Cost`:`It Costs`} 2 Less`; break
            case 3945: string+=`Scry ${effect[0]}\nApply ${effect[1]} Vulnerable\nPer Card Discarded`; break
            case 3947: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage if\nThis Card Has An Edition`; break
            case 3948: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Lock On\nAdd ${this.calculateEffect(effect[2],1)} Block\nPer Adjacent Enemy\nOther Than Target`; break
            case 3949: string+=`Exhaust All\nBlueprints in Hand\nGain ${effect[0]} Energy and\nDraw ${effect[1]} Card${pl(effect[1])} Each`; break
            case 3950: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf Target Has Block`; break
            case 3951: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Damage\nIf Target Has Block`; break
            case 3952: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Vision\nPer Adjacent Enemy`; break
            case 3953: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nApply ${effect[1]} Lock On`; break
            case 3954: string+=`Your Next ${effect[0]} Exhaust${pl(effect[0])}\nDiscard the Card Instead\nGain (N)`; break
            case 3955: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain (E) When\nHit This Turn`; break
            case 3956: string+=`Gain (E) at the\nStart of Your Turn`; break
            case 3957: string+=`Gain (N) (N)`; break
            case 3958: string+=`Gain (N) (N) (N)`; break
            case 3959: string+=`Gain (N) (N) (N) (N)`; break
            case 3960: string+=`Gain (W) (W)`; break
            case 3961: string+=`Gain (W) (W) (W)`; break
            case 3962: string+=`Gain (W) (W) (W) (W)`; break
            case 3963: string+=`Gain (B) (B)`; break
            case 3964: string+=`Gain (B) (B) (B)`; break
            case 3965: string+=`Gain (B) (B) (B) (B)`; break
            case 3966: string+=`Gain (K) (K)`; break
            case 3967: string+=`Gain (K) (K) (K)`; break
            case 3968: string+=`Gain (K) (K) (K) (K)`; break
            case 3969: string+=`Gain (G) (G)`; break
            case 3970: string+=`Gain (G) (G) (G)`; break
            case 3971: string+=`Gain (G) (G) (G) (G)`; break
            case 3972: string+=`Gain (R) (R)`; break
            case 3973: string+=`Gain (R) (R) (R)`; break
            case 3974: string+=`Gain (R) (R) (R) (R)`; break
            case 3975: string+=`Gain (E) (E)`; break
            case 3976: string+=`Gain (E) (E) (E)`; break
            case 3977: string+=`Gain (E) (E) (E) (E)`; break
            case 3978: string+=`Gain ${effect[0]} Combo\nGain (G) Next Turn`; break
            case 3979: string+=`Gain (E) (E)\nNext Turn`; break
            case 3980: string+=`Gain (E) (E) (E)\nNext Turn`; break
            case 3981: string+=`Gain (E) (E) (E) (E)\nNext Turn`; break
            case 3982: string+=`Apply ${effect[0]} Weak\nAdd a Void\nto Discard Pile`; break
            case 3983: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nShuffle ${effect[1]} Shiv${pl(effect[1])}\ninto Draw Pile\n${effect[1]!=1?`They Have`:`It Has`} Replenish`; break
            case 3984: string+=`Apply ${effect[0]} Vulnerable\nShuffle ${effect[1]} Shiv${pl(effect[1])} into Draw\nAdd ${effect[2]} Shiv${pl(effect[2])} to Discard\n${effect[1]+effect[2]!=1?`They Have`:`It Has`} Replenish`; break
            case 3985: string+=`Apply ${effect[0]} Buffer\nWhen Used on an Enemy,\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 3986: string+=`Apply ${effect[0]} Strength\nWhen Used on an Enemy,\nGain ${effect[1]} Currency`; break
            case 3987: string+=`Gain ${effect[0]} Strength\n${effect[1]} or Less\nCards in Hand:\nGives Double Strength`; break
            case 3988: string+=`Destroy a Construct\nReturn Blueprint\nGain ${effect[0]} Metal`; break
            case 3989: string+=`Destroy a Construct\nReturn Used Metal\nGain ${effect[0]} Energy`; break
            case 3990: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCenter of Hand:\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 3991: string+=`Gain (E) at the\nStart of Your Turn\nGain (E)`; break
            case 3992: string+=`Gain (E) at the\nStart of Your Turn\nGain (E) (E)`; break
            case 3993: string+=`Gain (E) at the\nStart of Your Turn\nGain (E) (E) (N)`; break
            case 3994: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Pristine or\na Splash to Hand`; break
            case 3995: string+=`Remove All Orbs\nGain ${effect[0]} Energy and\nDraw ${effect[1]} Card${pl(effect[1])} Each`; break
            case 3996: string+=`Evoke All Orbs\nGain ${effect[0]} Energy and\nDraw ${effect[1]} Card${pl(effect[1])} Each`; break
            case 3997: string+=`Breaking Balance\nGives ${effect[0]} Energy`; break
            case 3998: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nGain X-${effect[1]} Energy\nNext Turn`; break
            case 3999: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2nd Card in Hand:\nApply ${effect[1]} Burn`; break
            case 4000: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain ${effect[1]} Energy\nYou Have 5 Energy`; break
            case 4001: string+=`Exit Stance\nAdd a Corresponding\nInstant Stance Card\nto Hand\n(Not Divinity)`; break
            case 4002: string+=`Enter Wrath\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4003: string+=`Enter Calm\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4004: string+=`Enter Haste\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4005: string+=`Enter Sturdy\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4006: string+=`Enter Depression\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4007: string+=`Transform All Items`; break
            case 4008: string+=`Transform All Items\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4009: string+=`When Drawn,\nDraw a Vitality of\nEquivalent Level to Hand`; break
            case 4010: string+=`When Drawn,\nGain ${effect[0]} Energy`; break
            case 4011: string+=`When Drawn,\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4012: string+=`Exhaust Any\nNumber of Cards\nGain ${effect[0]} Energy Each`; break
            case 4013: string+=`Gain ${effect[0]} Energy\nIncreases by ${effect[1]}`; break
            case 4014: string+=`Draw ${effect[0]} Attack${pl(effect[0])}`; break
            case 4015: string+=`Draw ${effect[0]} Defense${pl(effect[0])}`; break
            case 4016: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${this.calculateEffect(effect[1],1)} Block Next Turn\nDiscard ${effect[2]} Card${pl(effect[2])}`; break
            case 4017: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have No Block`; break
            case 4018: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have No Block,\nUpgrade ${effect[1]} Card${pl(effect[1])}`; break
            case 4019: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw and Upgrade\n${effect[1]} Card${pl(effect[1])}, and\nRetain ${effect[1]!=1?`Them`:`it`} Until Played`; break
            case 4020: string+=`Hold ${effect[0]} Shield Orb${pl(effect[0])}\nRetain Your Hand\nThis Turn`; break
            case 4021: string+=`Any Construct Takes\n${effect[0]} Extra Turn${pl(effect[0])}\nand Gains ${effect[1]} Buffer\nIt Loses ${effect[2]} Health\nNext Turn`; break
            case 4022: string+=`Destroy a Construct\nPut a Card in Discard\nPile in Your Hand`; break
            case 4023: string+=`Destroy a Construct\nPut a Card in Discard\nPile in Your Hand\nGain ${effect[0]} Metal`; break
            case 4024: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTargets a Random\nAdjacent Enemy\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 4025: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTake ${effect[1]} More Damage\nFrom Attacks This Turn`; break
            case 4026: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEvoke First Orb ${effect[1]} Time${pl(effect[1])}`; break
            case 4027: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nEvoke First Orb\non Self ${effect[1]} Time${pl(effect[1])}`; break
            case 4028: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4029: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Damage\nIf There are No\nAdjacent Empty Tiles`; break
            case 4030: string+=`Construct Gains\n${effect[0]} Max Health, ${effect[1]}\nStrength and ${effect[2]} Dexterity`; break
            case 4031: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nAdd ${effect[1]} Random\nBlueprint${pl(effect[1])} to Hand`; break
            case 4032: string+=`If You Have Block,\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4033: string+=`Upgrade the Last\n${effect[0]} Card${pl(effect[0])} in Deck\nMay Deluxe Upgrade`; break
            case 4034: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrade ${effect[1]} Random\nCard${pl(effect[1])} in Hand\nPrioritizes Attacks`; break
            case 4035: string+=`Hold ${effect[0]} Dark Orb${pl(effect[0])}\nTick All Dark Orbs`; break
            case 4036: string+=`5%: Gain an Item Slot\n5%: Make a Card Glitched\n90%: Draw ${effect[0]} Card${pl(effect[0])}`; break
            case 4037: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nLose ${effect[1]} Health`; break
            case 4038: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Drawn,\nGain ${effect[1]} Armor`; break
            case 4039: string+=`All Enemies Lose ${effect[0]} Health\nHeal ${this.calculateEffect(effect[1],4)} Health Each`; break
            case 4040: string+=`Gain ${effect[0]} Currency\nGain ${effect[1]} Energy Next Turn`; break
            case 4041: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} Temporary\nStrength`; break
            case 4042: string+=`Gain ${effect[0]} Dexterity\nGain ${effect[1]} Temporary\nDexterity`; break
            case 4043: string+=`Gain ${effect[0]} Strength\nAdd a Smite to Hand`; break
            case 4044: string+=`Gain ${effect[0]} Dexterity\nAdd a Safety to Hand`; break
            case 4045: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Currency\nWhen Exhausted,\nAdd ${this.calculateEffect(effect[2],1)} Block`; break
            case 4046: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${this.calculateEffect(effect[1],17)} Barrier\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 4047: string+=`Draw and Upgrade\n${effect[0]} Card${pl(effect[0])}\nAdd ${this.calculateEffect(effect[1],17)} Barrier Per\nUpgraded Card\nCannot Deluxe Upgrade`; break
            case 4048: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nWhen Drawn,\nGains a Random Edition`; break
            case 4049: string+=`Every Turn,\nDraw ${effect[0]} Card${pl(effect[0])}\n${effect[0]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 4050: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Lock On\nIf Played First,\nExhaust ${effect[2]} Card${pl(effect[2])}`; break
            case 4051: string+=`Add a Random\n0 Cost Skill\nof Every Color\nof Equivalent Level\nto Hand`; break
            case 4052: string+=`Target Gains\nIndefinite Node`; break
            case 4053: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nPer Dark Orb`; break
            case 4054: string+=`Gain ${effect[0]} Armor\nAdd a Better of\nEquivalent Level to Hand`; break
            case 4055: string+=`Upgrade ${effect[0]} Card${pl(effect[0])}\nAdd a Faster of\nEquivalent Level to Hand`; break
            case 4056: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nAdd a Stronger of\nEquivalent Level to Hand`; break
            case 4057: string+=`Gain ${effect[0]} Strength\nAdd a Harder of\nEquivalent Level to Hand`; break
            case 4058: string+=`Move Over an Adjacent\nEmpty Tile Location\nor\nMove ${effect[0]} Tile${pl(effect[0])}`; break
            case 4059: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal on an\nEnemy With a Gun,\nAdd Their Gun Card to\nHand and Gain ${effect[1]} Ammo`; break
            case 4060: string+=`Add ${this.calculateEffect(effect[0],1)} Block Per\nAdjacent Empty Tile\nLocation`; break
            case 4061: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Random\nAttack${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 4062: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Random\nDefense${pl(effect[1])} to Hand\n${effect[1]!=1?`They Cost`:`It Costs`} 0 Temporarily`; break
            case 4063: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nin 3 Directions`; break
            case 4064: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]}\nWhen Incremented`; break
            case 4065: string+=`Gain ${effect[0]} Temporary\nStrength\nGain ${effect[1]} Temporary\nDexterity`; break
            case 4066: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nGain ${effect[1]} Dexterity`; break
            case 4067: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nTarget Will Face Away`; break
            case 4068: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile`; break
            case 4069: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nEnter Calm`; break
            case 4070: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nGain ${effect[1]} Wish Power`; break
            case 4071: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nSteal up to ${effect[0]}\nBlock From Target`; break
            case 4072: string+=`Advance 1 Tile\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 4073: string+=`Draw ${effect[0]} Gun${pl(effect[0])}\nGain ${effect[1]} Ammo`; break
            case 4074: string+=`Gain ${effect[0]} Temporary\nStrength When You\nSwitch Stance`; break
            case 4075: string+=`Hold ${effect[0]} Lightning Orb${pl(effect[0])}\nTick All Lightning Orbs`; break
            case 4076: string+=`Move to Any\nEmpty Tile\nNot Adjacent to\na Combatant`; break
            case 4077: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],13)}X Damage\nWhere X = Lock On\non Target`; break
            case 4078: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nWhen Drawn,\nMake ${effect[1]} Cop${effect[1]!=1?`ies`:`y`}`; break
            case 4079: string+=`Instantly Evoke a\nBasic Orb ${effect[0]} Time${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4080: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Already Have Block,\nGain ${effect[1]} Energy`; break
            case 4081: string+=`If You Have No Block,\nAdd ${this.calculateEffect(effect[0],1)} Block\nOtherwise,\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4082: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number of\nColorless Cards in Hand\nto Any Enemy`; break
            case 4083: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Lock On\nto Any Enemy`; break
            case 4084: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nGain ${effect[1]} Dodge\nExhaust ${effect[2]} Card${pl(effect[2])}`; break
            case 4085: string+=`Apply ${effect[0]} Freeze\nGain ${effect[1]} Energy\nNext 3 Turns`; break
            case 4086: string+=`Remove All Your Statuses\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4087: string+=`Deal ${this.calculateEffect(effect[0],0)}-${this.calculateEffect(effect[1],11)} Damage\nWhere X = (Range-1)\nin 3 Directions`; break
            case 4089: string+=`Apply ${effect[0]} Weak\nApply ${effect[1]} Vulnerable\nin All Directions\nLose ${effect[2]} Currency`; break
            case 4090: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Double Block\nIf Used on a Plant Tile`; break
            case 4091: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnergy Divisible by 3:\nGain ${effect[1]} Energy\nDiscard the Card\nto the Right`; break
            case 4092: string+=`When You Are Debuffed,\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 4093: string+=`Remove a Card\nPermanently\nReturn a Removed\nCard to Deck and\nAdd a Copy to Hand\nCannot Be Skipped`; break
            case 4094: string+=`Gain ${effect[0]} Temporary\nStrength When You\nPlay a Basic Card`; break
            case 4095: string+=`Draw ${effect[0]} Card${pl(effect[0])} When You\nPlay a Basic Card`; break
            case 4096: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has Lock On,\nAdd ${this.calculateEffect(effect[1],1)} Block\nGain ${effect[2]} Armor`; break
            case 4097: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nGain ${effect[1]} Energy\nNext Turn`; break
            case 4098: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Triple Damage if\nYour Deck Has No\nDuplicate Non-Basic Cards`; break
            case 4099: string+=`Next ${effect[0]} Attack${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated`; break
            case 4100: string+=`Add ${effect[0]} Cop${effect[0]!=1?`ies`:`y`} of a\nCard in Hand to Hand`; break
            case 4101: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nShiv in Hand:\nGain ${effect[1]} Energy`; break
            case 4102: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCreate 1 Plant Tile\nUnder Target`; break
            case 4103: string+=`Gain ${effect[0]} Energy and\nDraw ${effect[1]} Card${pl(effect[1])}\nFor Every ${effect[2]} Plant Tile${pl(effect[2])}`; break
            case 4104: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nTake ${effect[1]} Damage\nGain ${effect[2]} Strength`; break
            case 4105: string+=`Steal up to ${effect[0]}\nBlock From Target\nDeal ${this.calculateEffect(effect[1],0)} Damage\n2 Times`; break
            case 4106: string+=`Draw ${effect[0]} Basic Card${pl(effect[0])}`; break
            case 4107: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have No\nOther Attacks in Hand,\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 4108: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nPer Exhausted Card${stage.scene=='battle'&&this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].exhaust.cards.length})`:``}`; break
            case 4109: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nIf You Dodged an\nAttack This Turn`; break
            case 4110: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} 1 Cost Attack${pl(effect[1])}`; break
            case 4111: string+=`Gain ${effect[0]} Strength\nNext Luck-Based Card\nis Guaranteed to Fail`; break
            case 4112: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nWhere X = Wish Power\nWhen Exhausted,\nGain ${effect[2]} Dodge`; break
            case 4113: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nIf Something is Ahead,\nApply ${effect[1]} Freeze`; break
            case 4114: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nIgnore Block\nGain ${effect[1]} Strength`; break
            case 4115: string+=`Gain ${effect[0]} Strength\nAdd ${effect[1]} Strike${pl(effect[1])}\nof Equivalent Level\nto Hand`; break
            case 4116: string+=`Gain ${effect[0]} Dexterity\nAdd ${effect[1]} Defend${pl(effect[1])}\nof Equivalent Level\nto Hand`; break
            case 4117: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nIf Last Card Played\nWas a Different Color,\nGain ${effect[1]} Charge`; break
            case 4118: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nExhaust ${effect[1]} Card${pl(effect[1])} After\nNext Card Played`; break
            case 4119: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])} After\nNext Card Played`; break
            case 4120: string+=`Draw ${effect[0]} Card${pl(effect[0])}\nAll Skills in Hand\nCost ${effect[1]} Less Temporarily`; break
            case 4121: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier\nDeal ${this.calculateEffect(effect[1],0)} Damage\nin All Directions\nIf You Have Barrier`; break
            case 4122: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block\nDamage Increases by ${effect[2]}\nWhen a Strike is Played\nBlock Increases by ${effect[3]}\nWhen a Defend is Played`; break            
            case 4125: string+=`Add ${this.calculateEffect(effect[0],1)}+${this.calculateEffect(effect[1],16)} Block\nWhere X = Number of\nAdjacent Enemies`; break
            case 4126: string+=`Double the Effect\nof All Basic Cards`; break
            case 4127: string+=`Double and Increase\nby ${effect[0]} the Effect\nof All Basic Cards`; break
            case 4128: string+=`Exhaust ${effect[0]} Card${pl(effect[0])}\nNext ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 4130: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]} When\nAbsorbing Wish Power`; break
            case 4131: string+=`Choose a Common\nCard to Add to Hand\nIt Costs 0\nGain ${effect[0]} Wish Power`; break
            case 4132: string+=`Apply ${effect[0]} Lock On\nDraw ${effect[1]} Attack${pl(effect[1])}`; break
            case 4133: string+=`When Drawn,\nApply ${effect[0]} Lock On\nto All Enemies`; break
            case 4134: string+=`Gain (R) (N)\nExhaust All Powers\nin Hand`; break
            case 4135: string+=`Gain (R) (N)\nDraw ${effect[0]} Card${pl(effect[0])}\nExhaust All Powers\nin Hand`; break
            case 4136: string+=`Gain (R) (R) (N)\nDraw ${effect[0]} Card${pl(effect[0])}\nExhaust All Powers\nin Hand`; break
            case 4137: string+=`Apply ${effect[0]} Buffer\nWhen Used on an Enemy,\nGain (W) (B)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4138: string+=`Apply ${effect[0]} Buffer\nWhen Used on an Enemy,\nGain (E) (W) (B)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4139: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Add a Miracle\nto Hand`; break
            case 4140: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n10%: Apply ${effect[1]} Vulnerable`; break
            case 4141: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nUpward: Gain ${effect[1]}\nTemporary Strength\nDownward: Gain ${effect[2]}\nTemporary Dexterity`; break
            case 4142: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Focus`; break
            case 4143: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Strength`; break
            case 4144: string+=`Take Another Turn\nWhen Drawn,\nCosts 1 Less`; break
            case 4145: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nAdd ${effect[2]} Scrap Metal${pl(effect[2])}\nto Hand`; break
            case 4146: string+=`Add a Random\nConcoction to Hand and\nUpgrade it ${effect[0]} Time${pl(effect[0])}`; break
            case 4147: string+=`Add ${effect[0]} Random Offcolor\nCard${pl(effect[0])} That Give${effect[0]!=1?``:`s`} an\nExtra Turn to Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 4148: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} Weak`; break
            case 4149: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nAdd ${this.calculateEffect(effect[1],3)} Block\nWhere X = Number of Attacks\nPlayed This Turn`; break
            case 4150: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nNext ${effect[1]} Card${pl(effect[1])}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 4151: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Not Fatal,\nGain ${effect[1]} Vulnerable`; break
            case 4152: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nif You Have Strength\nDeals Double Damage\nif Target Has Strength`; break
            case 4153: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain ${effect[1]} Energy and\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 4154: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain (B) (N)`; break
            case 4155: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain (E) (B)`; break
            case 4156: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain (E) (E)`; break
            case 4157: string+=`Gain (R) (R)\nTake ${effect[0]} Damage`; break
            case 4158: string+=`Gain (R) (R) (N)\nTake ${effect[0]} Damage`; break
            case 4159: string+=`Gain (E) (R) (R)\nTake ${effect[0]} Damage`; break
            case 4160: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Energy\nNext Turn`; break
            case 4161: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain (B) (R) Next Turn`; break
            case 4162: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain (E) (B) (R) Next Turn`; break
            case 4163: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain (E) (E) (E) Next Turn`; break
            case 4164: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain (W) (B) Next Turn`; break
            case 4165: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain (E) (W) (B) Next Turn`; break
            case 4166: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain (E) (E) (E) Next Turn`; break
            case 4167: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target is Undamaged,\nGain (W)`; break
            case 4168: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target is Undamaged,\nGain (E)`; break
            case 4169: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain (K)`; break
            case 4170: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain (K) (N)`; break
            case 4171: string+=`Gain (G) at the\nStart of Your Turn\nCreate 7 Plant Tiles\nAround You`; break
            case 4172: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${pl(effect[1])}\nIf Blocked,\nGain (W) (W)`; break
            case 4173: string+=`Add ${effect[0]} Random\n1 Total Cost Card${effect[0]!=1?`s`:``} of\nEquivalent Level to Hand\nGain (N) Next Turn`; break
            case 4174: string+=`Add ${effect[0]} Random\n1 Total Cost Card${effect[0]!=1?`s`:``} of\nEquivalent Level to Hand\nGain (E) Next Turn`; break
            case 4175: string+=`Gain (E) (K) (K)\n(W) (W) Next Turn\nLose ${effect[0]} Health`; break
            case 4176: string+=`Gain (E) (E) (K) (K)\n(W) (W) Next Turn\nLose ${effect[0]} Health`; break
            case 4177: string+=`Gain (E) (E) (K) (K)\n(W) (W) (N) Next Turn\nLose ${effect[0]} Health`; break
            case 4178: string+=`Gain ${effect[0]} (G)\nIncreases by ${effect[1]}`; break
            case 4179: string+=`Gain (E) and\nDraw ${effect[0]} Card${pl(effect[0])}\nFor Every ${effect[1]} Plant Tile${pl(effect[2])}`; break
            case 4180: string+=`End Your Turn\nGain X${effect[0]!=0?`+${effect[0]}`:``} (W)\nNext Turn`; break
            case 4181: string+=`End Your Turn\nGain X${effect[0]!=0?`+${effect[0]}`:``} (E)\nNext Turn`; break
            case 4182: string+=`For Each (W) Spent:\nExhaust ${effect[0]} Card${pl(effect[0])}\nFor Each (G) Spent:\nGain ${effect[1]} Dodge`; break
            case 4183: string+=`When Drawn,\nGain ${effect[0]} Bleed\nDeal ${this.calculateEffect(effect[1],0)} Damage`; break
            case 4184: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Hand Size\nAdd a Miracle to Hand`; break
            case 4185: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Hand Size\nAdd a Splash to Hand`; break
            case 4186: string+=`Breaking Balance\nGives (E)`; break
            case 4187: string+=`Gain (R) (R)\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4188: string+=`Gain (R) (R) (R)\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4189: string+=`Gain (E) (E) (E)\nDraw ${effect[0]} Card${pl(effect[0])}`; break
            case 4190: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts (R) More\nWhen You Take Damage`; break
            case 4191: string+=`Gain (B) (B)\nLose ${effect[0]} Health`; break
            case 4192: string+=`Gain (B) (B) (N)\nLose ${effect[0]} Health`; break
            case 4193: string+=`Gain (E) (B) (B)\nLose ${effect[0]} Health`; break
            case 4194: string+=`Gain (W) (W) (N) (N)\nNext Turn`; break
            case 4195: string+=`Gain (W) (W) (W) (N) (N)\nNext Turn`; break
            case 4196: string+=`Gain (E) (E) (E) (N) (N)\nNext Turn`; break
            case 4197: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have No Block,\nGain (N)`; break
            case 4198: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain (N) Next Turn`; break
            case 4199: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain (N) (N) Next Turn`; break
            case 4200: string+=`Apply ${effect[0]} Random Debuff\nGain (N) Next Turn\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4201: string+=`Apply ${effect[0]} Random Debuff\nApply ${effect[1]} Random Debuff\nGain (N) Next Turn\nDraw ${effect[2]} Card${pl(effect[2])}`; break
            case 4202: string+=`Add ${effect[0]} Shiv${pl(effect[0])}\nto Hand\nGain (N) Next Turn`; break
            case 4203: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain (E) if You\nCannot Move`; break
            case 4204: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block\nGain (R)`; break
            case 4205: string+=`Add ${effect[0]} Shiv${pl(effect[0])} to Hand\nWhen Vanished,\nChoose a Rare Card\nof Equivalent Level\nto Add Permanently`; break
            case 4206: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block\nGain (R) (N)`; break
            case 4207: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Already Have Block,\nGain (N)`; break
            case 4208: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nShiv in Hand:\nGain (R)`; break
            case 4209: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nShiv in Hand:\nGain (R) (R)`; break
            case 4210: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nShiv in Hand:\nGain (E) (E)`; break
            case 4211: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMana Total Divisible by 3:\nHold ${effect[1]} Dark Orb${pl(effect[1])}`; break
            case 4212: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMana Total Divisible by 3:\nAdd ${effect[1]} Shiv${pl(effect[1])}\nto Hand`; break
            case 4213: string+=`Gain (E) (E) (E)\nAdd a Void\nto Discard Pile`; break
            case 4214: string+=`Gain (E) (E) (E) (E)\nAdd a Void\nto Discard Pile`; break
            case 4215: string+=`Gain (E) (E) (E) (E) (E)\nAdd a Void\nto Discard Pile`; break
            case 4216: string+=`Gain (E) For Every\n${effect[0]} Cards in Draw Pile`; break
            case 4217: string+=`For Every (2) Spent:\nHold ${effect[0]} Basic Orb${pl(effect[0])}`; break
            case 4218: string+=`For Every (2) Spent:\nEvoke First Orb ${effect[0]} Time${pl(effect[0])}`; break
            case 4219: string+=`For Every (2) Spent:\nEvoke First Orb ${effect[0]} Time${pl(effect[0])}\nEvoke First Orb ${effect[1]}\nAdditional Time${effect[1]!=1?`s`:``}`; break
            case 4220: string+=`For Each (W) Spent:\nExhaust ${effect[0]} Card${pl(effect[0])}\nFor Each (G) Spent:\nGain ${effect[1]} Dodge\nExhaust ${effect[2]} Additional Card${pl(effect[2])}`; break
            case 4221: string+=`For Each (W) Spent:\nExhaust ${effect[0]} Card${pl(effect[0])}\nFor Each (G) Spent:\nGain ${effect[1]} Dodge\nExhaust ${effect[2]} Additional Card${pl(effect[2])}\nGain ${effect[3]} Additional Dodge`; break
            case 4222: string+=`${effect[0]} Random Card${pl(effect)}\nin Hand Duplicate\nOnce When Played\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4223: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain (E) (E)\nDraw ${effect[1]} Card${pl(effect[1])}\nLose ${effect[2]} Random Mana\nNext Turn`; break
            case 4224: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nGain (E) (E) (E)\nDraw ${effect[1]} Card${pl(effect[1])}\nLose ${effect[2]} Random Mana\nNext Turn`; break
            case 4225: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage to a\nRandom Enemy 2 Times\nGain (R) (R) if You Have\nTemporary Strength\nGain (W) (W) if You Have\nTemporary Dexterity`; break
            case 4226: string+=`For Every (2) Spent:\nHold ${effect[0]} Random Orb${pl(effect[0])}`; break
            case 4227: string+=`For Every (2) Spent:\nHold ${effect[0]} Random Orb${pl(effect[0])}\nHold ${effect[1]} Additional\nRandom Orb${pl(effect[1])}`; break
            case 4228: string+=`Remove All Orbs\nGain (G) (R) and\nDraw ${effect[0]} Card${pl(effect[0])} Each`; break
            case 4229: string+=`Evoke All Orbs\nGain (G) (R) and\nDraw ${effect[0]} Card${pl(effect[0])} Each`; break
            case 4230: string+=`Evoke All Orbs\nGain (E) (E) and\nDraw ${effect[0]} Card${pl(effect[0])} Each`; break
            case 4231: string+=`Exhaust Any\nNumber of Cards\nGain (K) Each`; break
            case 4232: string+=`Hold ${effect[0]} Shield Orb${pl(effect[0])}\nDraw ${effect[1]} Card${pl(effect[1])}\nRetain Your Hand\nThis Turn`; break
            case 4233: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nGain (B)\nNext Turn`; break
            case 4234: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}\nGain (B) (N)\nNext Turn`; break
            case 4235: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nGain (E) (E) (E) (E) and\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4236: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Mana Total:\nGain ${effect[1]} Armor`; break
            case 4237: string+=`5 or More Mana:\nApply ${effect[0]} Poison`; break
            case 4238: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEven Mana Total:\nApply ${effect[1]} Bleed`; break
            case 4239: string+=`Gain (K) at the\nStart of Your Turn\nAll Cards Cost\n${effect[0]} Health to Play`; break
            case 4240: string+=`Gain (K) at the\nStart of Your Turn\nGain (K) Immediately\nAll Cards Cost\n${effect[0]} Health to Play`; break
            case 4241: string+=`Gain (K) at the\nStart of Your Turn\nGain (K) (K) Immediately\nAll Cards Cost\n${effect[0]} Health to Play`; break
            case 4242: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n5+ Balance:\nGain (R) (R)`; break
            case 4243: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n5+ Balance:\nGain (E) (E)`; break
            case 4244: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n5+ Balance:\nGain (E) (E) (E)`; break
            case 4245: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n5+ Balance:\nGain (R) (R)`; break
            case 4246: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n5+ Balance:\nGain (E) (E)`; break
            case 4247: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n5+ Balance:\nGain (E) (E) (E)`; break
            case 4248: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFor Each (B) Spent:\nApply ${effect[1]} Freeze\nFor Each (R) Spent:\nApply ${effect[2]} Burn`; break
            case 4249: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nOdd Mana Total:\nApply ${effect[1]} Freeze\nEven Mana Total:\nApply ${effect[1]} Burn`; break
            case 4250: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nOdd Mana Total:\nApply ${effect[1]} Freeze\nEven Mana Total:\nApply ${effect[1]} Burn`; break
            case 4251: string+=`Shuffle Into Draw\nand Upgrade Your Hand`; break
            case 4252: string+=`Ally Gains (E) (E)\non Their Turn`; break
            case 4253: string+=`Ally Gains (E) (E) (E)\non Their Turn`; break
            case 4254: string+=`Ally Gains (E) (E) (E) (E)\non Their Turn`; break
            case 4255: string+=`Add a Random Common\nColorless Card to Deck\nRemove a Card\nPermanently\nLose ${effect[0]} Health`; break
            case 4256: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Has Weak:\nGain (B) (B)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4257: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Has Weak:\nGain (E) (E)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4258: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Has Vulnerable:\nGain (B) (B)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4259: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Has Vulnerable:\nGain (E) (E)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4260: string+=`Increase Combo\nCap by ${effect[0]}`; break
            case 4261: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nGain ${effect[1]} Charge`; break
            case 4262: string+=`Move ${effect[0]} Tile${pl(effect[0])}\nExhaust When a\nCard is Played`; break
            case 4263: string+=`Gain (B)\nDraw ${effect[0]} Blue Card${pl(effect[0])}`; break
            case 4264: string+=`Gain (B) (B)\nDraw ${effect[0]} Blue Card${pl(effect[0])}`; break
            case 4265: string+=`Gain (B) (B) (B)\nDraw ${effect[0]} Blue Card${pl(effect[0])}`; break
            case 4266: string+=`Apply ${effect[0]} Vulnerable\nto Any Enemy`; break
            case 4267: string+=`Exhaust All\nBlueprints in Hand\nGain (E) and\nDraw ${effect[0]} Card${pl(effect[0])} Each`; break
            case 4268: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Triple Block\nWhen in Wrath`; break
            case 4269: string+=`Sturdy: Apply ${effect[0]} Vulnerable\nElse: Enter Sturdy`; break
            case 4270: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds Triple Block\nWhen in Calm`; break
            case 4271: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Does\nNot Lose Health,\nGain (B) (G)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4272: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Does\nNot Lose Health,\nGain (E) (E)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4273: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Does\nNot Lose Health,\nGain (E) (E) (N)\nDraw ${effect[1]} Card${pl(effect[1])}`; break
            case 4274: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy\nShuffle an Insight\nInto Draw`; break
            case 4275: string+=`Scry ${effect[0]}\nDraw ${effect[1]} Card${pl(effect[1])}\nLose ${effect[2]} Random Mana\nNext Turn`; break






            //mark p

            //mark q

            /*
            case 1: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2: string+=`Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 3: string+=`Move ${effect[0]} Tile${pl(effect[0])}`; break
            case 5: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile`; break
            case 6: string+=`Next ${effect[0]!=1?`${effect[0]} `:``}Attack${pl(effect[0])}\nDeal${effect[0]==1?`s`:``} Double Damage`; break
            case 8: string+=`Draw ${effect[0]} Card${pl(effect[0])}`; break
            case 10: string+=`Heal ${this.calculateEffect(effect[0],4)} Health`; break
            case 18: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions`; break
            case 23: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}`; break
            case 28: string+=`Put a Card in Discard\nPile in Your Hand`; break
            case 29: string+=`Put a Card in Draw\nPile in Your Hand`; break
            case 41: string+=`Gain ${effect[0]} Energy`; break
            case 50: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Block\nFor ${effect[1]} Turn${pl(effect[1])}`; break
            case 64: string+=`Gain ${effect[0]} Control`; break
            case 112: string+=`Add ${effect[0]} Shiv${pl(effect[0])}\nto Hand`; break
            case 114: string+=`Gain an Item`; break
            case 227: string+=`Next ${effect[0]} Card${pl(effect[0])}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated`; break
            case 490: string+=`Hold ${effect[0]} Basic Orb${pl(effect[0])}`; break
            case 366: string+=``; break
            case 491: string+=`Evoke First Orb ${effect[0]} Time${pl(effect[0])}`; break
            case 637: string+=`Gain ${effect[0]} Currency`; break
            case 2906: string+=`Add ${this.calculateEffect(effect[0],17)} Barrier`; break
            */
        }
        if(string[string.length-1]=='\n'){
            string=string.substring(0,string.length-1)
        }
        if(target[0]==2||target[0]==12||target[0]==14||target[0]==17||target[0]==22||target[0]==26||target[0]==29||target[0]==48||target[0]==52){
            string+=`\nRange ${target[1]}-${this.calculateEffect(target[2],19)}`
        }
        if(target[0]==46){
            string+=`\nRange ${target[3]}-${this.calculateEffect(target[4],19)}`
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
        if(spec.includes(46)){
            string+='\n6 Fatigue'
        }
        if(spec.includes(45)){
            string+='\n8 Fatigue'
        }
        if(spec.includes(44)){
            string+='\n10 Fatigue'
        }
        if(spec.includes(51)){
            string+='\n16 Fatigue'
        }
        if(spec.includes(50)){
            string+='\n20 Fatigue'
        }
        if(spec.includes(49)){
            string+='\n24 Fatigue'
        }
        if(spec.includes(19)){
            string+='\nHeavy Fatigue'
        }
        if(spec.includes(17)){
            string+='\nX Fatigue'
        }
        if(spec.includes(2)){
            string+='\nRetain'
        }else if(this.retain2){
            string+='\nRetain Until Played'
        }else if(this.retain){
            string+='\nRetain Once'
        }else if(spec.includes(29)){
            string+='\n80%: Retain'
        }
        if(spec.includes(57)){
            string+='\nDuplicate Once'
        }
        if(spec.includes(56)){
            string+='\nPurge'
        }else if(spec.includes(1)){
            string+='\nExhaust'
        }
        if(spec.includes(15)){
            string+=`\nVanishing ${this.limit}`
        }
        if(spec.includes(38)){
            string+=`\nVanishing ${this.limit[0]}`
        }
        if(spec.includes(36)){
            string+=`\nVanishing 20%`
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
        if(spec.includes(62)){
            string+='\nReplenish'
        }
        if(spec.includes(63)){
            string+='\nReplenish 2'
        }
        if(spec.includes(23)){
            string+='\nHolding 1'
        }
        if(spec.includes(26)){
            string+='\nAmalgum'
        }
        if(spec.includes(32)){
            string+='\nDeprecated'
        }
        if(spec.includes(33)){
            string+='\nWide'
        }
        if(spec.includes(42)){
            string+=`\nExhausting ${this.limit}`
        }
        if(string[0]=='\n'){
            string=string.substring(1,string.length)
        }
        return string
    }
    callDiscardEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.spec.includes(23)){
            this.battle.cardManagers[this.player].draw(1)
        }
        switch(this.attack){
            case -1:
                userCombatant.statusEffectNext('Weak',this.effect[0])
            break
            case -2:
                userCombatant.statusEffectNext('Vulnerable',this.effect[0])
            break
            case -4: case -77:
                if(this.name=='Burn'){
                    if(userCombatant.getStatus('Burn Bypass')<=0){
                        userCombatant.takeDamage(this.effect[0],-1)
                    }
                    if(userCombatant.getStatus('Burn Strength')>0){
                        userCombatant.statusEffect('Strength',userCombatant.getStatus('Burn Strength'))
                    }
                }else{
                    userCombatant.takeDamage(this.effect[0],-1)
                }
            break
            case -7:
                userCombatant.takeDamage(this.effect[0]*(this.battle.cardManagers[this.player].hand.cards.length-1),-1)
            break
            case -36:
                userCombatant.statusEffect('Poison',this.effect[1])
            break
            case -49:
                userCombatant.block=max(0,userCombatant.block-this.effect[0])
            break
            case -79:
                this.battle.drop(this.player,findName('Refracted\nSunlight',types.card),0,game.playerNumber+1)
            break
            case -81:
                this.battle.drop(this.player,findName('Quiet\nMoonlight',types.card),0,game.playerNumber+1)
            break
            case -82:
                this.battle.drop(this.player,findName('Glamorous\nStarlight',types.card),0,game.playerNumber+1)
            break
            case -86:
                this.battle.loseCurrency(this.effect[0],this.player)
                userCombatant.heal(this.effect[1])
            break
            case -87:
                userCombatant.statusEffectNext('Frail',this.effect[0])
            break
            case -88:
                userCombatant.takeDamage(this.effect[0],-1)
                this.effect[0]+=this.effect[1]
            break
            case -90:
                userCombatant.charge=min(0,userCombatant.charge-this.effect[0])
            break
            case 187:
                userCombatant.takeDamage(this.effect[1],-1)
            break
            case 1255:
                userCombatant.statusEffect('Damage Down',this.effect[2])
            break
            case 3212:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 3213:
                userCombatant.addBlock(this.effect[1])
            break
            case 3218:
                userCombatant.statusEffect('Energy Next Turn',this.effect[1])
            break
            case 3463:
                userCombatant.loseHealth(this.effect[2])
            break
            case 3717:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
        }
    }
    callScryEffect(){
        switch(this.attack){
            case 3207:
                if(this.cost>0){
                    this.cost--
                }
            break
        }
    }
    callScryDiscardEffect(){
        switch(this.attack){
            case 2913: case 2998:
                this.effect[0]+=this.effect[1]
            break
            case 2953: case 2954: case 2955:
                this.cost=0
                this.additionalSpec.push(-2)
            break
        }
    }
    callSpecDiscardEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -48:
                userCombatant.statusEffect('Double Damage',this.effect[1])
            break
            case 257:
                this.battle.cardManagers[this.player].draw(this.effect[0])
            break
            case 258:
                this.battle.addSpecificEnergy(this.effect[0],this.player,6)
            break
            case 2077:
                userCombatant.statusEffect('Strength',this.effect[0])
            break
            case 2078:
                userCombatant.statusEffect('Dexterity',this.effect[0])
            break
            case 2079:
                userCombatant.statusEffect('Dodge',this.effect[0])
            break
            case 2121:
                this.battle.cardManagers[this.player].draw(this.effect[0])
                this.battle.cardManagers[this.player].hand.add(findName('Myopia',types.card),0,0)
            break
            case 2154:
                userCombatant.addBlock(this.effect[1])
            break
            case 2198:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 2199:
                this.battle.combatantManager.allEffect(30,[this.effect[1]])
            break
            case 2209:
                this.battle.combatantManager.randomEnemyEffect(4,[this.effect[1]])
            break
            case 2210:
                this.battle.overlayManager.overlays[7][this.player].active=true
                this.battle.overlayManager.overlays[7][this.player].activate()
            break
            case 2211:
                this.battle.overlayManager.overlays[8][this.player].active=true
                this.battle.overlayManager.overlays[8][this.player].activate()
            break
            case 2215:
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Miracle',types.card),0,0)
                }
            break
            case 2224:
                this.effect[0]+=this.effect[1]
            break
            case 2236:
                this.battle.combatantManager.allEffect(43,[this.effect[2],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 2242:
                userCombatant.statusEffect('Extra Turn',1)
                this.exhaust=true
            break
            case 2244:
                userCombatant.heal(this.effect[1])
            break
            case 2313:
                userCombatant.statusEffect('Armor',this.effect[1])
            break
            case 2396:
                userCombatant.addBlock(this.effect[0])
            break
            case 2413:
                userCombatant.statusEffect('Temporary Draw',this.effect[1])
            break
            case 2449:
                userCombatant.statusEffect('Energy Next Turn',this.effect[1])
            break
            case 2450:
                this.battle.cardManagers[this.player].drawAbstract(this.effect[1],0,0,[3])
            break
            case 2489:
                this.battle.combatantManager.allEffect(43,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 2500:
                this.battle.endTurn()
                this.exhaust=true
            break
            case 2581:
                userCombatant.randomStatusInstant(this.effect[1],[0])
            break
            case 2944:
                this.effect[0]+=this.effect[1]
                this.target[2]+=this.effect[1]
            break
            case 3186:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
                this.battle.cardManagers[this.player].draw(this.effect[1])
            break
            case 3258:
                this.battle.overlayManager.overlays[19][this.player].active=true
                this.battle.overlayManager.overlays[19][this.player].activate()
            break
            case 3717:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
        }
    }
    callAnotherDrawEffect(number){
        switch(this.attack){
            case 2775: case 3742: case 3743:
                this.cost=0
            break
            case 3527:
                if(this.battle.turn.active){
                    this.effect[0]+=this.effect[1]*number
                }
            break
            case 3744: case 3745:
                this.effect[0]+=this.effect[1]
            break
            case 3746:
                this.effect[0]=min(this.effect[0]+this.effect[1],3)
                this.target[2]=min(this.target[2]+this.effect[1],3)
            break
        }
    }
    callBalanceBreakEffect(){
        switch(this.attack){
            case 3041: case 3816:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    callRearmEffect(){
        switch(this.attack){
            case 3042: case 3815:
                this.cost=0
            break
        }
    }
    callMoveTileEffect(oldTilePosition,newTilePosition,distance){
        switch(this.attack){
            case 3043:
                if(newTilePosition.y<oldTilePosition.y){
                    this.effect[0]+=this.effect[1]
                }
            break
            case 3928:
                if(distance>=this.effect[2]){
                    this.effect[0]+=this.effect[1]
                }
            break
        }
    }
    callInDiscardEffect(){
        switch(this.attack){
            case 1169:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 1170:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.effect[0])
            break
        }
    }
    callRewindEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case 2673:
                this.battle.addSpecificEnergy(this.effect[0],this.player,6)
                this.battle.cardManagers[this.player].draw(this.effect[1])
                return true
            case 2675:
                userCombatant.statusEffect('Knowledge',this.effect[2])
            break
            case 2682:
                userCombatant.addBlock(this.effect[0])
            break
            case 2692:
                this.effect[0]+=this.effect[1]
            break
            case 2732:
                userCombatant.statusEffect('History',this.effect[0])
            break
            case 2833:
                this.battle.cardManagers[this.player].hand.add(findName('Stride',types.card),0,0)
            break
            case 2834:
                userCombatant.vision+=this.effect[1]
            break
        }
        if(userCombatant.getStatus('Rewind Cost Down')>0&&this.cost>0){
            this.cost=max(this.cost-1,0)
        }
        return false
    }
    callExhaustEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.battle.modded(159)){
            userCombatant.loseHealth(2)
        }
        switch(this.attack){
            case 202: case 1710:
                userCombatant.combo+=this.effect[1]
            break
            case 303: 
                this.battle.addSpecificEnergy(this.effect[1],this.player,6)
            break
            case 892:
                this.battle.cardManagers[this.player].exhaust.send(this.battle.cardManagers[this.player].hand.cards,0,-1,1)
            break
            case 933:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 1167:
                this.battle.combatantManager.areaAbstract(0,[this.effect[1],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 1202:
                this.battle.dropDrawShuffle(this.player,findName('Rewrite',types.card),0,0)
            break
            case 2580:
                userCombatant.addBlock(this.effect[1])
            break
            case 2770: 
                this.battle.addSpecificEnergy(this.effect[2],this.player,6)
            break
            case 2791:
                userCombatant.statusEffect('Strength',this.effect[1])
            break
            case 2949:
                this.battle.addCurrency(this.effect[1],this.player)
            break
            case 3300: case 3301:
                this.battle.cardManagers[this.player].draw(this.effect[1])
            break
            case 3343: 
                this.battle.loseEnergy(this.effect[1],this.player)
            break
            case 3513:
                this.battle.addSpecificEnergy(this.effect[1],this.player,6)
                this.battle.cardManagers[this.player].randomEffect(2,1,[this.effect[2]])
            break
            case 3533:
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.dropDrawShuffle(this.player,findName('Prismatic\nBomb',types.card),0,0)
                }
            break
            case 3860:
                userCombatant.heal(this.effect[0])
            break
            case 4045:
                userCombatant.addBlock(this.effect[2])
            break
            case 4112:
                userCombatant.statusEffect('Dodge',this.effect[2])
            break
        }
    }
    callVanishEffect(){
        switch(this.attack){
            case 1238:
                this.battle.cardManagers[this.player].deck.add(findName('Plague',types.card),0,game.playerNumber+2)
            break
            case 1477:
                this.battle.cardManagers[this.player].deck.add(findName('Skellic\nSlash',types.card),0,0)
            break
            case 1486:
                this.battle.cardManagers[this.player].deck.add(findName('Backfire',types.card),0,game.playerNumber+2)
            break
            case 1487:
                this.battle.cardManagers[this.player].deck.add(findName('Bear\nMaul',types.card),0,0)
            break
            case 1488:
                this.battle.cardManagers[this.player].deck.add(findName('Bozo',types.card),0,game.playerNumber+2)
            break
            case 1489:
                this.battle.cardManagers[this.player].deck.add(findName('Fury\nSpell',types.card),0,0)
            break
            case 1239: case 1240: case 1241: case 1242: case 1243: case 1246: case 1373: case 1433: case 1565: case 1903:
            case 2469: case 2479: case 2480: case 2551: case 2821: case 2822:
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([0,2,0])
            break
            case 2116:
                this.battle.cardManagers[this.player].deck.add(findName('Antimatter',types.card),0,0)
            break
            case 2118:
                this.battle.cardManagers[this.player].deck.add(findName('Exotic\nMatter',types.card),0,0)
            break
            case 3492:
                this.battle.addCurrency(this.effect[0],this.player)
            break
            case 3574:
                this.battle.relicManager.addSetRelic(0,this.player)
            break
            case 3596: case 3597: case 3598: case 3599: case 3600: case 3601: case 3602: case 3603: case 3604: case 3605:
            case 3606: case 3607: case 3608: case 3609: case 3610: case 3611: case 3612: case 4205:
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([this.level,2,0])
            break
        }
    }
    callStartEffect(encounterClass){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case 1328:
                if(encounterClass==1||encounterClass==2){
                    userCombatant.statusEffect('Strength',this.effect[0])
                }
            break
            case 1393:
                if(encounterClass!=1&&encounterClass!=2){
                    userCombatant.statusEffect('Strength',this.effect[0])
                }
            break
            case 1394:
                userCombatant.statusEffect('Armor',this.effect[0])
            break
            case 1398:
                userCombatant.statusEffect('Heal Per Turn',this.effect[0])
            break
            case 1612:
                userCombatant.statusEffect('Ignore Tile',this.effect[0])
            break
            case 1881:
                userCombatant.statusEffect('Regeneration',this.effect[0])
            break
            //update addinitial to invalidate these
        }
    }
    callEndEffect(encounterCLass){
        switch(this.attack){
            case 1270:
                this.effect[0]=max(1,this.effect[0]-this.effect[1])
            break
            case 1309:
                this.effect[0]=this.effect[0]+this.effect[1]
            break
            case 1341:
                if(this.limit.length>0){
                    this.limit[1]+=floor(random(1,11))
                }
            break
            case 2546:
                if(encounterCLass==2){
                    this.effect[0]+=this.effect[1]
                }
            break
            case 2605:
                if(encounterCLass==2){
                    this.effect[0]*=2
                }
            break
            case 3098: case 3190: case 3493:
                this.battle.addCurrency(this.effect[1],this.player)
            break
            case 3671:
                if(encounterCLass==1||encounterCLass==2){
                    this.effect[0]+=this.effect[1]
                }
            break
        }
    }
    callRemoveEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -10:
                userCombatant.loseMaxHP(this.effect[0])
            break
            case -67:
                this.battle.loseCurrency(this.effect[1],this.player)
            break
            case 1458: case 3173:
                this.battle.addCurrency(this.effect[0],this.player)
            break
            case 1961:
                this.battle.itemManager.addItem(findName('Trash Can',types.item),this.player)
            break
            case 2424: case 3668:
                this.battle.relicManager.addRandomRelic(this.player)
            break
            case 2525:
                this.battle.cardManagers[this.player].deck.randomEffect(38,[0])
            break
            case 2526:
                this.battle.cardManagers[this.player].deck.randomEffect(30,[4])
            break
            case 3682:
                userCombatant.heal(this.effect[1])
            break
            case 3759:
                this.battle.loseCurrency(this.effect[1],this.player)
            break
        }
    }
    callAddEffect(){
        switch(this.attack){
            case -45:
                this.battle.cardManagers[this.player].deck.randomEffect(29,[3])
            break
            case 1461:
                this.battle.cardManagers[this.player].deck.add(findName('Pride',types.card),0,game.playerNumber+2)
            break
            case 1924:
                this.battle.cardManagers[this.player].deck.add(findName('Bozo',types.card),0,game.playerNumber+2)
            break
            case 2575:
                this.battle.cardManagers[this.player].deck.add(findName('Normality',types.card),0,game.playerNumber+2)
            break
            case 2641:
                this.battle.cardManagers[this.player].deck.randomEffect(21)
            break
            case 3195:
                this.battle.cardManagers[this.player].deck.add(findName('Copystrike',types.card),0,game.playerNumber+2)
            break
            case 3758:
                this.battle.addCurrency(this.effect[1],this.player)
            break
            case 3759:
                this.battle.addCurrency(this.effect[0],this.player)
            break
        }
    }
    callAnotherAddEffect(){
        switch(this.attack){
            case 2773:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    callTurnEffect(){
        switch(this.attack){
            case 2063: case 2069:
                this.effect[0]+=this.effect[1]
            break
            case 2101:
                if(this.cost>0){
                    this.cost--
                }
            break
        }
    }
    callNodeEffect(){
        switch(this.attack){
            case 2064:
                this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,4,0,[],[0])
            break
            case 3173:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    onIncrementCountdown(){
        switch(this.attack){
            case 1345: case 3704: case 4064:
                this.effect[0]+=this.effect[1]
            break
            case 1777:
                this.battle.cardManagers[this.player].draw(this.effect[1])
            break
            case 3216:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.effect[1])
            break
            case 3511:
                this.effect[0]-=this.effect[1]
            break
        }
    }
    prismaticActivation(){
        switch(this.attack){
            case 3538:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    onItem(){
        switch(this.attack){
            case 2261:
                this.cost=0
            break
            case 2554:
                this.effect[0]+=this.effect[1]
            break
            case 3929:
                this.target[2]=min(this.target[2]+this.effect[1],6)
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
            case 1667: case 2092:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    taken(){
        switch(this.attack){
            case -47:
                this.effect[0]=max(0,this.effect[0]-this.effect[2])
            break
            case 266:
                this.costUp(2,[1])
            break
            case 282: case 1834:
                this.costDown(2,[1])
            break
            case 1072:
                this.effect[0]=0
            break
            case 1164: case 1966:
                this.effect[0]+=this.effect[1]
            break
            case 1564:
                this.deSize=true
                this.exhaust=true
            break
            case 2145: case 3360:
                this.effect[0]=this.effect[1]
            break
            case 4190:
                this.costUp(4,[1,5])
            break
        }
    }
    played(){
        if(variants.transcend){
            this.cost=max(this.cost-1,0)
            this.base.cost=max(this.base.cost-1,0)
        }
        if(this.additionalSpec.includes(-2)){
            this.additionalSpec.splice(this.additionalSpec.indexOf(-3))
        }
        switch(this.attack){
            case 107: case 255: case 2617: case 2665:
                this.effect[0]=max(this.effect[0]-this.effect[1],0)
            break
            case 108: case 1635: case 2419:
                this.costDown(2,[1])
            break
            case 118: case 619: case 1479: case 1480: case 1697: case 1740: case 1746: case 1788: case 2283: case 2471:
            case 2501: case 3198: case 3647: case 3915: case 4013: case 4178:
                this.effect[0]+=this.effect[1]
            break
            case 866: case 908: case 1893: case 2356: case 2482:
                this.effect[1]+=this.effect[2]
            break
            case 937:
                this.effect[0]+=this.effect[2]
                this.effect[1]+=this.effect[2]
            break
            case 1133:
                this.effect[0]--
                for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                    if(this.battle.cardManagers[this.player].deck.cards[a].id==this.id){
                        this.battle.cardManagers[this.player].deck.cards[a].effect[0]--
                    }
                }
                if(this.effect[0]<=0){
                    this.exhaust=true
                    for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                        if(this.battle.cardManagers[this.player].deck.cards[a].id==this.id){
                            this.battle.cardManagers[this.player].deck.cards[a].callVanishEffect()
                            this.battle.cardManagers[this.player].deck.cards.splice(a,1)
                            a--
                            la--
                        }
                    }
                    this.battle.cardManagers[this.player].hand.add(findName('Worthless\nBaseball Card',types.card),this.level,this.color)
                    this.battle.cardManagers[this.player].deck.add(findName('Card\nSleeve',types.card),this.level,this.color)
                    this.battle.cardManagers[this.player].deck.add(findName('Worthless\nBaseball Card',types.card),this.level,this.color)
                }
            break
            case 1285:
                this.effect[0]=this.effect[3]
            break
            case 1332:
                this.effect[0]=0
            break
            case 1551:
                this.effect[0]*=-1
                for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                    if(this.battle.cardManagers[this.player].deck.cards[a].id==this.id){
                        this.battle.cardManagers[this.player].deck.cards[a].effect[0]*=-1
                    }
                }
            break
            case 1640:
                this.effect[0]=1+floor(random(0,3))*2
            break
            case 1654: case 1909:
                this.cost+=1
                this.base.cost+=1
            break
            case 1739:
                this.effect[0]+=this.effect[1]
                this.cost+=this.effect[2]
                this.base.cost+=this.effect[2]
            break
            case 2053:
                this.effect[0]=max(this.effect[0]-this.effect[1],0)
                this.cost+=this.effect[2]
                this.base.cost+=this.effect[2]
            break
            case 2653:
                this.effect[0]=0
                this.effect[1]=0
            break
            case 2735:
                if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].elemental){
                    this.cost=0
                    this.base.cost=0
                    this.discardEffect.push(6)
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                }
            break
            case 3074: case 3075: case 3076: case 3078: case 3082: case 3134: case 3135: case 3334: case 3335: case 3381:
            case 3382: case 3383: case 3390: case 3395: case 3396: case 3397: case 3568: case 3569: case 3584: case 3585:
            case 3586: case 3689: case 3724: case 3725: case 3726: case 3727: case 3908: case 3909:
                if(!this.spec.includes(55)){
                    this.discardEffect.push(13)
                }
            break
            case 3132: case 3851: case 3852:
                this.cost=max(this.cost-this.effect[2],0)
                this.base.cost=max(this.base.cost-this.effect[2],0)
            break
            case 3365:
                this.effect[1]=0
            break
            case 3827: case 3828: case 3829: case 3830: case 3831: case 3832: case 3833: case 3834: case 3835: case 3836:
            case 3873: case 3874: case 3875: case 4124: case 4125: case 4126: case 4127: case 4128: case 4129:
                if(this.spec.includes(60)){
                    this.discardEffectBuffered.push(1)
                }else{
                    this.discardEffect.push(14)
                }
            break
            case 4130:
                if(this.spec.includes(60)){
                    this.battle.cardManagers[this.player].hand.callInput(6,[1,[this.effect[0]],1,[2,1,1]])
                    this.discardEffectBuffered.push(1)
                }else{
                    this.discardEffect.push(15)
                }
            break
        }
        if(this.battle.modded(94)&&this.battle.cardManagers[this.player].hand.turnPlayed[0]>=6){
            this.battle.cardManagers[this.player].allEffect(2,2)
        }
        this.battle.attackManager.level=this.level
        this.battle.attackManager.color=this.color
        this.retain=false
        this.retain2=false
    }
    anotherPlayed(card){
        if(this.usable){
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(this.spec.includes(9)){
                this.deSize=true
            }
            switch(this.attack){
                case -5:
                    userCombatant.takeDamage(this.effect[0],-1)
                break
                case -42:
                    userCombatant.statusEffect('Poison',this.effect[0])
                break
                case -9:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[0]>=this.effect[0]){
                        this.battle.cardManagers[this.player].allEffect(2,2)
                    }
                break
                case -30:
                    this.battle.cardManagers[this.player].hand.randomEffect(0)
                break
                case 52: case 220: case 594: case 1508: case 3914:
                    this.deSize=true
                break
                case 56:
                    if(this.cost>=0){
                        this.costUp(0,[1])
                    }
                break
                case 414: case 416:
                    if(card.class==1){
                        this.costDown(0,[1])
                    }
                break
                case 415:
                    if(card.class==2){
                        this.costDown(0,[1])
                    }
                break
                case 857:
                    if(card.name=='Spark'){
                        this.costDown(0,[1])
                    }
                break
                case 1040:
                    if(card.basic){
                        this.costDown(0,[1])
                    }
                break
                case 1129:
                    this.battle.addCurrency(this.effect[0],this.player)
                break
                case 1285:
                    if(this.effect[0]>0){
                        this.effect[0]--
                    }
                break
                case 1416:
                    if(this.cost>0){
                        this.cost--
                        this.base.cost--
                    }
                    if(this.effect[0]>0){
                        this.effect[0]=max(0,this.effect[0]-this.effect[1])
                    }
                break
                case 1631:
                    this.effect[0]=floor(random(4+2*this.level,12+6*this.level+1))
                break
                case 1949:
                    let roll=floor(random(0,3))+1
                    this.effect[0]=roll
                    this.target[2]=roll
                break
                case 1992:
                    if(card.basic&&card.class==3){
                        this.costDown(0,[1])
                    }
                break
                case 2006:
                    if(card.basic){
                        this.target[2]++
                    }
                break
                case 2007:
                    if(card.basic){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 2135:
                    if(this.effect[0]>0){
                        this.effect[0]=max(0,this.effect[0]-this.effect[2])
                    }
                    this.effect[1]=this.effect[1]+this.effect[2]
                break
                case 2197:
                    if(card.name=='Shiv'||card.name=='Broken\nShiv'||card.name=='Deluxe\nShiv'){
                        this.costDown(0,[1])
                    }
                break
                case 2754:
                    if(card.class==3){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 2755:
                    if(card.class==4){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 2803: case 3035:
                    if(card.name=='Miracle'){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 2878:
                    if(card.edition==4){
                        this.cost=0
                    }
                break
                case 2931:
                    if(card.class==1){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 2932:
                    if(card.class==2){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 2933:
                    if(card.class==3){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 2934:
                    if(card.class==4){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 2970:
                    if(card.spec.includes(54)){
                        this.costDown(0,[1])
                    }
                break
                case 3052:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[0]>=this.effect[2]){
                        this.cost=0
                    }
                break
                case 3067:
                    if(card.class==3){
                        this.effect[0]=max(this.effect[0]-this.effect[1],1)
                    }
                break
                case 3073:
                    if(card.edition==5){
                        this.cost=0
                    }
                break
                case 3100: case 3101: case 3102:
                    if(card.colorless()){
                        this.cost=0
                    }
                break
                case 3112: case 3221:
                    if(card.name=='Pristine'){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 3120: case 3121:
                    this.deSize=true
                    this.exhaust=true
                break
                case 3177:
                    if(card.name=='Pristine'){
                        this.cost=0
                    }
                break
                case 3349:
                    if(card.class==3){
                        this.effect[0]+=this.effect[2]
                        this.effect[1]+=this.effect[3]
                    }
                break
                case 3401:
                    if(card.class==11){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 3410:
                    if(card.class==11){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 3491:
                    if(card.name=='Pristine'){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 3519:
                    if(card.class==1){
                        this.effect[0]+=this.effect[2]
                    }else if(card.class==2){
                        this.effect[1]+=this.effect[3]
                    }
                break
                case 3677:
                    if(card.class==3){
                        this.effect[1]=this.effect[1]+this.effect[2]
                    }
                break
                case 3704:
                    if(card.class==3){
                        this.effect[0]+=this.effect[2]
                    }
                break
                case 3825:
                    if(card.colorless()&&this.cost>0){
                        this.cost--
                    }
                break
                case 3923:
                    if(card.basic){
                        this.target[2]=min(this.target[2]+this.effect[1],6)
                    }
                break
                case 3943:
                    this.cost=sortNumbers(this.cost.concat(-1))
                break
                case 4122:
                    if(card.basic){
                        if(card.class==1){
                            this.effect[0]+=this.effect[2]
                        }else if(card.class==2){
                            this.effect[1]+=this.effect[3]
                        }
                    }
                break
                case 4126:
                    if(this.spec.includes(60)&&card.basic){
                        this.battle.attackManager.effect[0]*=2
                    }
                break
                case 4127:
                    if(this.spec.includes(60)&&card.basic){
                        this.battle.attackManager.effect[0]=this.battle.attackManager.effect[0]*2+this.effect[0]
                    }
                break
                case 4262:
                    this.deSize=true
                    this.exhaust=true
                break
                
            }
        }
    }
    anotherPlayedAfter(){
        if(this.usable){
            switch(this.attack){
                case 1525:
                    if(this.battle.getEnergy(this.player)<=0){
                        this.effect[0]+=this.effect[1]
                    }
                break
            }
        }
    }
    anotherAmplified(){
        switch(this.attack){
            case 862:
                if(this.cost>0){
                    this.cost=0
                }
            break
            case 3805:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    energyEffect(delta){
        switch(this.attack){
            case 3253:
                if(delta>0&&this.cost>0){
                    this.cost=max(0,this.cost-1)
                    this.base.cost=max(0,this.base.cost-1)
                }
            break
            case 3365:
                if(delta>0){
                    this.effect[1]++
                }
            break
        }
    }
    onHit(){
        switch(this.attack){
            case 1209:
                this.effect[0]=max(0,this.effect[0]-this.effect[1])
            break
            case 1219:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    playable(){
        return !this.spec.includes(5)&&!this.spec.includes(41)||this.battle.relicManager.hasRelic(11,this.player)
    }
    etherealed(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -38:
                this.battle.currency.money[this.player]-=this.effect[0]
            break
            case -50:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Temporary Draw',this.effect[0])
            break
            case -54:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Temporary Draw',-this.effect[0])
            break
            case -57:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case -58:
                this.battle.cardManagers[this.player].randomEffect(2,3,[0])
            break
            case 151:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nDefend',types.card),this.level,this.color)
            break
            case 152:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nStrike',types.card),this.level,this.color)
            break
            case 845:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.effect[1])
            break
            case 2107:
                this.battle.cardManagers[this.player].hand.add(findName('Operational L',types.card),this.level,this.color)
            break
            case 2108:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nStar',types.card),this.level,this.color)
            break
            case 3631:
                userCombatant.statusEffect('Temporary Draw',this.effect[2])
            break
            case 3808:
                this.battle.cardManagers[this.player].hand.add(findName('Dual\nDiscus',types.card),this.level,0)
            break
        }
    }
    retained(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.battle.modded(187)){
            userCombatant.loseHealth(2)
        }
        switch(this.attack){
            case -37: case 1698:
                userCombatant.statusEffect('Temporary Draw',-1)
            break
            case -65:
                if(this.battle.cardManagers[this.player].hand.numberAbstract(0,[[this.name]])>=3){
                    userCombatant.loseHealth(this.effect[0])
                }
            break
            case 757:
                if(this.cost>0){
                    this.cost--
                }
            break
            case 775: case 776: case 1868:
                this.effect[0]+=this.effect[1]
            break
            case 1403:
                if(this.cost>0&&this.battle.turn.total%2==0){
                    this.cost--
                }
            break
            case 1564:
                userCombatant.addBlock(this.effect[0])
            break
            case 1753:
                if(this.cost>0){
                    this.cost--
                }
            break
            case 2245:
                this.deSize=true
                this.discardEffect.push(10)
            break
            case 3893: case 3894:
                if(this.cost>0){
                    this.effect[1]++
                    if(this.effect[1]>=2){
                        this.effect[1]-=2
                        this.cost--
                    }
                }
            break
        }
        if(this.spec.includes(55)){
            switch(this.attack){
                case 3074:
                    this.battle.combatantManager.randomEnemyEffect(10,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player),2])
                break
                case 3075:
                    this.battle.combatantManager.areaAbstract(0,[this.effect[0],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                break
                case 3134:
                    this.battle.combatantManager.randomEnemyEffect(14,[this.effect[0]])
                break
                case 3390:
                    let index=this.battle.cardManagers[this.player].hand.cards.indexOf(this)
                    for(let a=0,la=this.effect[0];a<la;a++){
                        if(index+1+a<this.battle.cardManagers[this.player].hand.cards.length){
                            this.battle.cardManagers[this.player].hand.cards[index+1+a].retain=true
                        }
                    }
                break
                case 3727:
                    this.battle.combatantManager.randomEnemyEffect(10,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player),this.effect[1]+this.battle.cardManagers[this.player].deck.numberAbstract(4,[[6]])])
                break
            }
        }
        if(this.cost>0){
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.status.main[findList('Retain Cost Reduce',userCombatant.status.name)]>0){
                this.cost=max(0,this.cost-userCombatant.status.main[findList('Retain Cost Reduce',userCombatant.status.name)])
            }
        }
    }
    anotherRetained(card){
        switch(this.attack){
            case 2295:
                if(card.id!=this.id){
                    this.costDown(0,[1])
                }
            break
        }
    }
    turnStart(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.spec.includes(55)){
            this.cost++
            this.edited.cost++
            switch(this.attack){
                case 3076:
                    userCombatant.addBlock(this.effect[0])
                break
                case 3078:
                    userCombatant.statusEffect('Temporary Strength',this.battle.cardManagers[this.player].hand.lastTurnPlayed[2]+this.effect[0])
                break
                case 3082:
                    this.battle.cardManagers[this.player].tempCostDown+=this.effect[0]
                break
                case 3135:
                    this.battle.cardManagers[this.player].hand.upgrade(this.effect[0])
                break
                case 3334:
                    this.battle.cardManagers[this.player].deAbstract(0,this.effect[0],[])
                break
                case 3335:
                    userCombatant.addBarrier(this.effect[0])
                break
                case 3381:
                    this.battle.combatantManager.areaAbstract(2,['Take Per Card Played',this.effect[0]],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                break
                case 3382:
                    this.battle.cardManagers[this.player].reserve.basicChange[0]++
                break
                case 3383:
                    this.battle.cardManagers[this.player].reserve.basicChange[0]++
                    this.battle.cardManagers[this.player].reserve.basicChange[1]+=this.effect[0]
                break
                case 3395:
                    this.battle.cardManagers[this.player].draw(this.effect[0])
                    this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                break
                case 3396:
                    userCombatant.statusEffect('Control',this.effect[0])
                break
                case 3397:
                    this.battle.setTurn(this.battle.turn.total+this.effect[0])
                break
                case 3568:
                    userCombatant.statusEffect('Counter All',this.effect[0])
                break
                case 3569:
                    this.battle.combatantManager.damageHighest(this.effect[0],userCombatant.id)
                break
                case 3584:
                    this.battle.overlayManager.overlays[58][this.player].active=true
                    this.battle.overlayManager.overlays[58][this.player].activate([this.effect[0],this.effect[1]])
                break
                case 3585:
                    userCombatant.statusEffect('Temporary Strength',this.effect[0])
                    userCombatant.statusEffect('Temporary Dexterity',this.effect[1])
                break
                case 3586:
                    this.battle.cardManagers[this.player].hand.discardViable(this.effect[0])
                break
                case 3689:
                    this.battle.cardManagers[this.player].draw(this.effect[0])
                    this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                break
                case 3724:
                    this.battle.combatantManager.randomEnemyEffect(16,[this.effect[0]])
                break
                case 3725:
                    this.battle.combatantManager.randomEnemyEffect(17,[this.effect[0]])
                break
                case 3726:
                    userCombatant.statusEffect('Temporary Strength',this.effect[0])
                    this.battle.cardManagers[this.player].randomEffect(2,57,[1])
                break
                case 3908:
                    this.battle.cardManagers[this.player].allEffectArgs(2,39,[4,this.effect[0]])
                break
                case 3909:
                    this.battle.cardManagers[this.player].draw(this.effect[0])
                    this.battle.cardManagers[this.player].hand.rewind(this.effect[1])
                break

            }
        }else if(this.spec.includes(60)){
            if(userCombatant.wish>=this.cost){
                userCombatant.wish-=this.cost
                switch(this.attack){
                    case 3827:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                    break
                    case 3828:
                        this.battle.cardManagers[this.player].hand.upgrade(this.effect[0])
                    break
                    case 3829:
                        if(userCombatant.getStatus('Dodge')==0){
                            userCombatant.statusEffect('Dodge',this.effect[0])
                        }
                    break
                    case 3830:
                        userCombatant.statusEffect('Dodge',this.effect[0])
                    break
                    case 3831:
                        this.battle.cardManagers[this.player].allEffectArgs(2,35,[this.effect[0],59])
                    break
                    case 3832:
                        this.battle.cardManagers[this.player].hand.duplicate(this.effect[0])
                    break
                    case 3833:
                        userCombatant.statusEffect('Damage Taken Down',this.effect[0])
                    break
                    case 3834:
                        userCombatant.statusEffect('Attack Lock On Turn',this.effect[0])
                    break
                    case 3835:
                        userCombatant.statusEffect('Temporary Strength',this.effect[0])
                        this.effect[0]+=this.effect[1]
                    break
                    case 3836:
                        this.battle.combatantManager.areaAbstract(2,['Burn',this.effect[0]],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                        this.battle.combatantManager.areaAbstract(2,['Freeze',this.effect[1]],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                        this.battle.addEnergy(this.effect[2],this.player)
                        this.battle.cardManagers[this.player].draw(this.effect[3])
                    break
                    case 3873:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomAbstract(2,0,0,0,2,[5],[3,[2,11],0,[1]])
                        }
                    break
                    case 3874:
                        userCombatant.statusEffect('Single Damage Up',this.effect[0]*this.battle.cardManagers[this.player].hand.lastTurnPlayed[0])
                    break
                    case 3875:
                        userCombatant.addBlock(this.effect[0])
                        userCombatant.statusEffect('Temporary Dexterity',this.effect[1])
                    break
                    case 4124:
                        this.battle.combatantManager.areaAbstract(0,[this.effect[0],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                    break
                    case 4125:
                        userCombatant.addBlock(this.effect[0]+this.effect[1]*this.battle.combatantManager.getArea(userCombatant.team,userCombatant.tilePosition,1).length)
                    break
                    case 4128:
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[0])
                        this.battle.cardManagers[this.player].hand.duplicate(this.effect[1])
                    break
                    case 4129:
                        userCombatant.statusEffect('Double Damage',this.effect[0])
                    break
                    case 4130:
                        this.effect[0]+=this.effect[1]
                    break
                }
            }else{
                this.deSize=true
                this.discardEffectBuffered.push(2)
            }
        }
    }
    doubleBoth(){
        if(!this.additionalSpec.includes(-3)){
            this.additionalSpec.push(-3)
        }
        this.cost*=2
        if(this.spec.includes(12)){
            for(let a=0,la=this.effect.length;a<la;a++){
                for(let b=0,lb=this.attack[a].length;b<lb;b++){
                    this.effect[a][b]*=2
                }
            }
        }else{
            for(let a=0,la=this.effect.length;a<la;a++){
                this.effect[a]*=2
            }
        }
    }
    display(cancelDesc=false){
        if(this.size>0&&this.fade>0){
            let userCombatant
            if(this.player>=0&&this.player<this.battle.players){
                userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            }else{
                userCombatant=new disabledCombatant()
            }
            this.cancelDesc=cancelDesc
            let attack=0
            let effect=0
            let spec=0
            let rarity=0
            let list=0
            let classT=0
            let reality=0
            let colorDetail=0
            let target=[]
            let cost=0
            if(this.attack==1754){
                if(this.battle.turn.total%2==0){
                    this.colorDetail=types.color.card[7]
                }else{
                    this.colorDetail=types.color.card[2]
                }
            }
            if(this.falsed.trigger){
                name=this.falsed.name
                attack=this.falsed.attack
                effect=this.falsed.effect
                spec=this.falsed.spec
                rarity=this.falsed.rarity
                list=this.falsed.list
                classT=this.falsed.class
                reality=this.falsed.reality
                colorDetail=this.falsed.colorDetail
                target=this.falsed.target
                cost=this.falsed.cost
            }else{
                name=this.name
                attack=this.attack
                effect=this.effect
                spec=this.spec
                rarity=this.rarity
                list=this.list
                classT=this.class
                reality=this.reality
                colorDetail=this.colorDetail
                target=this.target
                cost=this.cost
            }
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size*this.sizeCap)
            if(this.edition==5){
                if(this.attack==1328){
                    this.layer.fill(0,150,255,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(0,41,204,this.fade)
                    this.layer.stroke(0,26,174,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(255,this.fade)
                    this.layer.noStroke()
                    regStar(this.layer,this.width/4,-this.height/2+this.width/4,5,this.width*3/20,this.width*3/20,this.width*3/20/2.62,this.width*3/20/2.62,90)
                    regStar(this.layer,this.width*2/5,-this.height/2+this.width/2,5,this.width/20,this.width/20,this.width/20/2.62,this.width/20/2.62,0)
                    regStar(this.layer,this.width*3/10,-this.height/2+this.width*3/5,5,this.width/20,this.width/20,this.width/20/2.62,this.width/20/2.62,0)
                    regStar(this.layer,this.width*3/20,-this.height/2+this.width*3/5,5,this.width/20,this.width/20,this.width/20/2.62,this.width/20/2.62,0)
                    regStar(this.layer,this.width/20,-this.height/2+this.width/2,5,this.width/20,this.width/20,this.width/20/2.62,this.width/20/2.62,0)
                    this.layer.stroke(0,26,174,this.fade)
                    this.layer.noFill()
                }else if(this.attack==1330){
                    this.layer.fill(30,45,35,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(10,40,20,this.fade)
                    this.layer.stroke(5,35,15,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(10,50,20,this.fade)
                    this.layer.stroke(5,50,15,this.fade)
                    this.layer.quad(-this.width/2,-this.height/4,-this.width/2,-this.height/12,this.width/2,this.height/4,this.width/2,this.height/12,5)
                    this.layer.stroke(5,35,15,this.fade)
                    this.layer.noFill()
                }else if(this.attack==1393){
                    this.layer.fill(255,150,150,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(238,28,37,this.fade)
                    this.layer.stroke(208,8,12,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(255,255,0,this.fade)
                    this.layer.noStroke()
                    let cap=tan(15)
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(30)
                        this.layer.triangle(0,this.width*3/8,-this.width*3/8*cap,0,this.width*3/8*cap,0)
                    }
                    this.layer.fill(238,28,37,this.fade)
                    this.layer.ellipse(0,0,this.width*17/40)
                    this.layer.fill(255,255,0,this.fade)
                    this.layer.ellipse(0,0,this.width*3/8)
                    this.layer.stroke(208,8,12,this.fade)
                    this.layer.noFill()
                }else if(this.attack==1615){
                    this.layer.fill(255,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(0,this.fade)
                    this.layer.stroke(255,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.strokeWeight(4)
                    for(let a=0,la=8;a<la;a++){
                        if(a!=0){
                            this.layer.line(-this.width/2,-this.height/2+this.height*a/la,this.width/2,-this.height/2+this.height*a/la)
                        }
                        for(let b=0,lb=3;b<lb;b++){
                            this.layer.line(-this.width/2+(b+0.25+a%2*0.5)/lb*this.width,-this.height/2+this.height*a/la,-this.width/2+(b+0.25+a%2*0.5)/lb*this.width,-this.height/2+this.height*(a+1)/la)
                        }
                    }
                    this.layer.noFill()
                }else if(this.attack==2064){
                    this.layer.fill(20,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(60,this.fade)
                    this.layer.stroke(100,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.stroke(60,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.noFill()
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noStroke()
                    for(let a=0,la=7;a<la;a++){
                        for(let b=0,lb=7;b<lb;b++){
                            let c=-this.width/2+2+(this.width-4)*(a+0.5)/la
                            let d=-this.height/2+2+(this.height-4)*(b+0.5*(a%2))/(lb-0.5)
                            this.layer.fill(100,this.fade)
                            if(a%2==0&&b==0){
                                this.layer.triangle(c-3,d,c+3,d,c,d+7)
                            }else if(a%2==1&&b==lb-1){
                                this.layer.triangle(c-3,d,c,d-7,c+3,d)
                            }else{
                                this.layer.quad(c-3,d,c,d-7,c+3,d,c,d+7)
                            }
                            this.layer.fill(60,this.fade)
                            if(a%2==0&&b==0){
                                this.layer.triangle(c-2,d,c+2,d,c,d+5)
                            }else if(a%2==1&&b==lb-1){
                                this.layer.triangle(c-2,d,c,d-5,c+2,d)
                            }else{
                                this.layer.quad(c-2,d,c,d-5,c+2,d,c,d+5)
                            }
                            this.layer.fill(100,this.fade)
                            if(a%2==0&&b==0){
                                this.layer.triangle(c-1,d,c+1,d,c,d+3)
                            }else if(a%2==1&&b==lb-1){
                                this.layer.triangle(c-1,d,c,d-3,c+1,d)
                            }else{
                                this.layer.quad(c-1,d,c,d-3,c+1,d,c,d+3)
                            }
                        }
                    }
                    let preColors=[[53,14,235],[67,50,174],[102,83,210],[110,173,240],[57,255,255]]
                    for(let a=0,la=72;a<la;a++){
                        let b=floor(a/la*15)%5
                        let c=a%(la/15)
                        let d=(b+1)%5
                        let e=(la/15)
                        this.layer.fill(
                            255-map(c/e,0,1,preColors[b][0],preColors[d][0]),
                            255-map(c/e,0,1,preColors[b][1],preColors[d][1]),
                            255-map(c/e,0,1,preColors[b][2],preColors[d][2])
                        )
                        this.layer.triangle(0,0,
                            (9+sin(a*50))*cos(a*5),(9+sin(a*50))*-sin(a*5),
                            (9+sin(a*50+70))*cos(a*5+7),(9+sin(a*50+70))*-sin(a*5+7)
                        )
                    }
                    this.layer.fill(255,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('Card',0,15)
                    this.layer.noFill()
                }else if(this.attack==-131||this.attack==-132||this.attack==3454||this.attack==3459||this.attack==3460||this.attack==-1031||this.attack==-1032||this.attack==4225){
                    this.gradient=[new p5.LinearGradient(-5,this.width*0.5-5),new p5.LinearGradient(-5,this.width*0.5-5),new p5.LinearGradient(-5,this.width*0.5-5)]
                    this.gradient[0].colors(0.0,
                        color(51,51,47,this.fade*this.anim.select),1.0,
                        color(47,27,27,this.fade*this.anim.select))
                    this.gradient[1].colors(0.0,
                        color(30,31,20,this.fade),1.0,
                        color(28,13,13,this.fade))
                    this.gradient[2].colors(0.0,
                        color(36,41,27,this.fade),1.0,
                        color(35,16,16,this.fade))
                    
                    this.layer.noStroke()
                    this.layer.fill(51,51,47,this.fade*this.anim.select)
                    this.layer.rect(-20,0,this.width-25,this.height+15,10)
                    this.layer.fill(47,27,27,this.fade*this.anim.select)
                    this.layer.rect(20,0,this.width-25,this.height+15,10)

                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.fillGradient(this.gradient[0])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+15)
                    this.layer.translate(this.width*0.2+2,0)

                    this.layer.strokeWeight(5)
                    this.layer.fill(36,41,27,this.fade)
                    this.layer.stroke(30,31,20,this.fade)
                    this.layer.rect(-20,0,this.width-40,this.height,5)
                    this.layer.fill(35,16,16,this.fade)
                    this.layer.stroke(28,13,13,this.fade)
                    this.layer.rect(20,0,this.width-40,this.height,5)

                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.noStroke()
                    this.layer.fillGradient(this.gradient[1])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+5)
                    this.layer.fillGradient(this.gradient[2])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height-5)
                    this.layer.translate(this.width*0.2+2,0)

                    this.layer.strokeWeight(1.5)
                    for(let a=0,la=12;a<la;a++){
                        for(let b=0,lb=this.height/this.width*6;b<lb-1;b++){
                            this.layer.stroke(33-(a+0.5)/la*2,36-(a+0.5)/la*22,24-(a+0.5)/la*6,this.fade)
                            this.layer.line(
                                -this.width/2+this.width*a/la,-this.height/2+this.height*(b+1)/lb-this.height/lb/4*(b%2*2-1)+a%2*this.height/lb/2*(b%2*2-1),
                                -this.width/2+this.width*(a+1)/la,-this.height/2+this.height*(b+1)/lb+this.height/lb/4*(b%2*2-1)-a%2*this.height/lb/2*(b%2*2-1)
                            )
                            this.layer.line(
                                -this.width/2+this.width*(a+0.5)/la,-this.height/2+this.height*(b+1)/lb,
                                -this.width/2+this.width*(a+a%2)/la,-this.height/2+this.height*(b+1)/lb-this.height/lb/4*(a%2*2-1)*(b%2*2-1)+a%2*this.height/lb/2*(a%2*2-1)*(b%2*2-1)
                            )
                        }
                    }
                    this.layer.strokeWeight(5)
                    this.layer.stroke(28,13,13,this.fade)
                    this.layer.line(this.width/2,-this.height/2+5,this.width/2,this.height/2-5)

                    this.layer.stroke(30,31,20,this.fade)
                    this.layer.line(-this.width/2,-this.height/2+5,-this.width/2,this.height/2-5)
                    this.layer.noFill()
                }else if(this.attack==3629||this.attack==3630||this.attack==3631){
                    this.layer.noStroke()
                    switch(this.attack){
                        case 3629:
                            this.layer.fill(51,51,46,this.fade*this.anim.select)
                        break
                        case 3630:
                            this.layer.fill(28,35,38,this.fade*this.anim.select)
                        break
                        case 3631:
                            this.layer.fill(38,26,41,this.fade*this.anim.select)
                        break
                    }
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.noStroke()
                    switch(this.attack){
                        case 3629:
                            this.layer.fill(23,41,16,this.fade)
                        break
                        case 3630:
                            this.layer.fill(20,29,37,this.fade)
                        break
                        case 3631:
                            this.layer.fill(35,21,36,this.fade)
                        break
                    }
                    this.layer.rect(0,0,this.width,this.height,5)
                    let rt3=sqrt(3)
                    this.layer.strokeWeight(2)
                    switch(this.attack){
                        case 3629:
                            this.layer.stroke(23,35,17,this.fade)
                        break
                        case 3630:
                            this.layer.stroke(18,25,33,this.fade)
                        break
                        case 3631:
                            this.layer.stroke(28,19,29,this.fade)
                        break
                    }
                    let exact=[(this.width-4)/9/rt3,this.height/18]
                    for(let a=0,la=round((this.width-4)/(9*rt3));a<la;a++){
                        for(let b=0,lb=round(this.height/18);b<lb;b++){
                            let mid=[-this.width/2+2+(this.width-4)*(a+0.5)/la,-this.height/2+this.height*(b+0.5+a%2*0.5)/lb]
                            if(b==0&&a%2==0 ){
                                this.layer.line(mid[0],mid[1],mid[0],mid[1]-6*exact[1]/lb)
                            }else{
                                this.layer.line(mid[0],mid[1],mid[0],mid[1]-12*exact[1]/lb)
                            }
                            if(a%2==1){
                                this.layer.line(mid[0],mid[1]-18*exact[1]/lb,mid[0]-6*rt3*exact[0]/la,mid[1]-12*exact[1]/lb)
                                this.layer.line(mid[0],mid[1]-18*exact[1]/lb,mid[0]+6*rt3*exact[0]/la,mid[1]-12*exact[1]/lb)
                            }else{
                                this.layer.line(mid[0],mid[1],mid[0]-6*rt3*exact[0]/la,mid[1]+6*exact[1]/lb)
                                this.layer.line(mid[0],mid[1],mid[0]+6*rt3*exact[0]/la,mid[1]+6*exact[1]/lb)
                            }
                            if(b!=0||a%2==1){
                                this.layer.line(mid[0],mid[1]-12*exact[1]/lb,mid[0]-3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb)
                                this.layer.line(mid[0],mid[1]-12*exact[1]/lb,mid[0]+3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb)
        
                                this.layer.line(mid[0]-6*rt3*exact[0]/la,mid[1]-12*exact[1]/lb,mid[0]-3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb)
                                this.layer.line(mid[0]+6*rt3*exact[0]/la,mid[1]-12*exact[1]/lb,mid[0]+3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb)
                            }
                            this.layer.line(mid[0]-3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb,mid[0]-3*rt3*exact[0]/la,mid[1]-3*exact[1]/lb)
                            this.layer.line(mid[0]+3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb,mid[0]+3*rt3*exact[0]/la,mid[1]-3*exact[1]/lb)
                            if(a==0){
                                this.layer.line(mid[0]-3*rt3*exact[0]/la,mid[1]-3*exact[1]/lb,mid[0]-6*rt3*exact[0]/la,mid[1])
                            }else if(a==la-1){
                                this.layer.line(mid[0]+3*rt3*exact[0]/la,mid[1]-3*exact[1]/lb,mid[0]+6*rt3*exact[0]/la,mid[1])
                            }
                        }
                    }
                    this.layer.noFill()
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                }else if(this.attack>=3694&&this.attack<=3699){
                    this.layer.fill(40,44,48,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(16,20,24,this.fade)
                    this.layer.stroke(12,16,20,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.stroke(150,250,200,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.noFill()
                    this.layer.arc(this.width/2-10,this.height/2-7.5,12,7,60,270)
                    this.layer.arc(this.width/2-10,this.height/2-14,10,6,-270,-60)
                    this.layer.strokeWeight(1)
                    this.layer.ellipse(this.width/2-4,this.height/2-4,3,6)
                    this.layer.line(this.width/2-2,this.height/2-5.5,this.width/2-6,this.height/2-2.5)
                    this.layer.stroke(12,16,20,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.ellipse(0,0,min(this.width*0.4,this.height*0.4))
                    this.layer.ellipse(0,0,min(this.width*0.8,this.height*0.8))
                    this.layer.line(-this.width/2,0,this.width/2,0)
                    this.layer.line(0,-this.height/2,0,this.height/2)
                    this.layer.strokeWeight(5)
                    this.layer.noFill()
                }else if(this.attack==3753||this.attack==3754){
                    this.layer.noStroke()
                    this.layer.fill(50,this.fade*this.anim.select*0.2)
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    for(let a=0,la=20;a<la;a++){
                        this.layer.fill(170+graphics.paperball[a][0],190+graphics.paperball[a][0],215+graphics.paperball[a][0])
                        regPoly(this.layer,lsin((a+0.5)/la*360)*32.5,lcos((a+0.5)/la*360)*32.5,5,6.75,6.75,(a+0.5)/la*360)
                    }
                    for(let a=0,la=50;a<la;a++){
                        this.layer.fill(170+graphics.paperball[a][0],190+graphics.paperball[a][0],215+graphics.paperball[a][0])
                        regPoly(this.layer,lsin(a*137)*sqrt(a)*4.5,lcos(a*137)*sqrt(a)*4.5,5,6.75,6.75,graphics.paperball[a][1])
                    }
                    this.layer.fill(40,this.fade*0.2)
                    this.layer.rect(0,0,this.width+5,this.height+5,7.5)
                    this.layer.fill(48,this.fade*0.2)
                    this.layer.rect(0,0,this.width-5,this.height-5,2.5)
                    this.layer.noFill()
                }else if(this.attack==4048){
                    this.layer.noStroke()
                    this.layer.fill(50,this.fade*this.anim.select*0.2)
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    for(let a=0,la=20;a<la;a++){
                        this.layer.fill(200+graphics.paperball[a][0],180+graphics.paperball[a][0],graphics.paperball[a][0])
                        regPoly(this.layer,lsin((a+0.5)/la*360)*32.5,lcos((a+0.5)/la*360)*32.5,5,6.75,6.75,(a+0.5)/la*360)
                    }
                    for(let a=0,la=50;a<la;a++){
                        this.layer.fill(200+graphics.paperball[a][0],180+graphics.paperball[a][0],graphics.paperball[a][0])
                        regPoly(this.layer,lsin(a*137)*sqrt(a)*4.5,lcos(a*137)*sqrt(a)*4.5,5,6.75,6.75,graphics.paperball[a][1])
                    }
                    this.layer.fill(40,this.fade*0.2)
                    this.layer.rect(0,0,this.width+5,this.height+5,7.5)
                    this.layer.fill(48,this.fade*0.2)
                    this.layer.rect(0,0,this.width-5,this.height-5,2.5)
                    this.layer.noFill()
                }else if(this.colorful){
                    this.layer.fill(255,150,255,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(20,20,20,this.fade)
                    this.layer.stroke(50,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noFill()
                    this.layer.strokeWeight(1)
                    this.layer.stroke(255,50,255,this.fade)
                    this.layer.rect(0,0,this.width-4,this.height-4,3)
                    this.layer.line(-this.width/2+2,-this.height/2+6,-this.width/2+10,-this.height/2+6)
                    this.layer.line(this.width/2-2,-this.height/2+6,this.width/2-10,-this.height/2+6)
                    this.layer.arc(-this.width/2+16,-this.height/2+6,12,8,-180,-90)
                    this.layer.arc(this.width/2-16,-this.height/2+6,12,8,-90,0)
                    this.layer.line(this.width/2-4,this.height/2-12,this.width/2-4,this.height/2-24)
                    this.layer.line(this.width/2-4,this.height/2-12,this.width/2-12,this.height/2-4)
                    this.layer.line(this.width/2-12,this.height/2-4,this.width/2-24,this.height/2-4)
                    this.layer.line(this.width/2-6,this.height/2-6,this.width/2-6,this.height/2-18)
                    this.layer.line(this.width/2-6,this.height/2-6,this.width/2-18,this.height/2-6)
                    this.layer.line(this.width/2-6,this.height/2-18,this.width/2-4,this.height/2-20)
                    this.layer.line(this.width/2-18,this.height/2-6,this.width/2-20,this.height/2-4)
                    this.layer.fill(255,50,255,this.fade)
                    this.layer.ellipse(-this.width/2+6,this.height/2-6,3)
                    this.layer.quad(this.width/2-10,this.height/2-10,this.width/2-14,this.height/2-11,this.width/2-18,this.height/2-18,this.width/2-11,this.height/2-14)
                    this.layer.noFill()
                    this.layer.stroke(50,this.fade)
                    this.layer.strokeWeight(5)
                }else if(this.list==-8){
                    this.layer.fill(110,120,130,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(50,60,70,this.fade)
                    this.layer.stroke(40,50,60,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noStroke()
                    this.layer.fill(50,50,225,this.fade)
                    this.layer.quad(
                        -this.width/2-2.5,-this.height*0.25,
                        -this.width/2-2.5,-this.height*0.15,
                        this.width/2+2.5,this.height*0.25,
                        this.width/2+2.5,this.height*0.15)
                    this.layer.fill(225,this.fade)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.quad(
                            -this.width/2-2.5+(this.width+5)*(a+0.2)/la,-this.height*0.25+this.height*0.4*(a+0.2)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.2)/la,-this.height*0.15+this.height*0.4*(a+0.2)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.7)/la,-this.height*0.15+this.height*0.4*(a+0.7)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.7)/la,-this.height*0.25+this.height*0.4*(a+0.7)/la)
                    }
                    this.layer.fill(200,this.fade)
                    this.layer.quad(
                        -this.width/2-2.5,this.height*0.25,
                        -this.width/2-2.5,this.height*0.15,
                        this.width/2+2.5,-this.height*0.25,
                        this.width/2+2.5,-this.height*0.15)
                    this.layer.fill(25,25,200,this.fade)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.quad(
                            -this.width/2-2.5+(this.width+5)*(a+0.3)/la,this.height*0.25-this.height*0.4*(a+0.3)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.3)/la,this.height*0.15-this.height*0.4*(a+0.3)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.8)/la,this.height*0.15-this.height*0.4*(a+0.8)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.8)/la,this.height*0.25-this.height*0.4*(a+0.8)/la)
                    }
                    this.layer.stroke(40,50,60,this.fade)
                    this.layer.noFill()
                }else if(this.list==-9&&variants.ultraprism){
                    this.layer.fill(120,110,100,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(60,50,40,this.fade)
                    this.layer.stroke(40,30,20,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noStroke()
                    this.layer.fill(25,225,225,this.fade)
                    this.layer.ellipse(0,0,50)
                    this.layer.fill(0,this.fade)
                    this.layer.quad(-15,-10,-10,-15,15,10,10,15)
                    this.layer.quad(15,-10,10,-15,-15,10,-10,15)
                    this.layer.stroke(40,30,20,this.fade)
                    this.layer.noFill()
                }else if(variants.mtg&&colorDetail.length>=2){
                    this.gradient=[new p5.LinearGradient(-15,this.width*0.5-5),new p5.LinearGradient(-15,this.width*0.5-5),new p5.LinearGradient(-15,this.width*0.5-5)]
                    if(colorDetail.length==3){
                        this.gradient[0].colors(0.0,
                            color(colorDetail[0].active[0]*0.2,colorDetail[0].active[1]*0.2,colorDetail[0].active[2]*0.2,this.fade*this.anim.select),0.3,
                            color(colorDetail[2].active[0]*0.2,colorDetail[2].active[1]*0.2,colorDetail[2].active[2]*0.2,this.fade*this.anim.select),0.7,
                            color(colorDetail[2].active[0]*0.2,colorDetail[2].active[1]*0.2,colorDetail[2].active[2]*0.2,this.fade*this.anim.select),1.0,
                            color(colorDetail[1].active[0]*0.2,colorDetail[1].active[1]*0.2,colorDetail[1].active[2]*0.2,this.fade*this.anim.select))
                        this.gradient[1].colors(0.0,
                            color(colorDetail[0].stroke[0]*0.2,colorDetail[0].stroke[1]*0.2,colorDetail[0].stroke[2]*0.2,this.fade),0.3,
                            color(colorDetail[2].stroke[0]*0.2,colorDetail[2].stroke[1]*0.2,colorDetail[2].stroke[2]*0.2,this.fade),0.7,
                            color(colorDetail[2].stroke[0]*0.2,colorDetail[2].stroke[1]*0.2,colorDetail[2].stroke[2]*0.2,this.fade),1.0,
                            color(colorDetail[1].stroke[0]*0.2,colorDetail[1].stroke[1]*0.2,colorDetail[1].stroke[2]*0.2,this.fade))
                        this.gradient[2].colors(0.0,
                            color(colorDetail[0].fill[0]*0.2,colorDetail[0].fill[1]*0.2,colorDetail[0].fill[2]*0.2,this.fade),0.3,
                            color(colorDetail[2].fill[0]*0.2,colorDetail[2].fill[1]*0.2,colorDetail[2].fill[2]*0.2,this.fade),0.7,
                            color(colorDetail[2].fill[0]*0.2,colorDetail[2].fill[1]*0.2,colorDetail[2].fill[2]*0.2,this.fade),1.0,
                            color(colorDetail[1].fill[0]*0.2,colorDetail[1].fill[1]*0.2,colorDetail[1].fill[2]*0.2,this.fade))
                    }else{
                        this.gradient[0].colors(0.0,
                            color(colorDetail[0].active[0]*0.2,colorDetail[0].active[1]*0.2,colorDetail[0].active[2]*0.2,this.fade*this.anim.select),1.0,
                            color(colorDetail[1].active[0]*0.2,colorDetail[1].active[1]*0.2,colorDetail[1].active[2]*0.2,this.fade*this.anim.select))
                        this.gradient[1].colors(0.0,
                            color(colorDetail[0].stroke[0]*0.2,colorDetail[0].stroke[1]*0.2,colorDetail[0].stroke[2]*0.2,this.fade),1.0,
                            color(colorDetail[1].stroke[0]*0.2,colorDetail[1].stroke[1]*0.2,colorDetail[1].stroke[2]*0.2,this.fade))
                        this.gradient[2].colors(0.0,
                            color(colorDetail[0].fill[0]*0.2,colorDetail[0].fill[1]*0.2,colorDetail[0].fill[2]*0.2,this.fade),1.0,
                            color(colorDetail[1].fill[0]*0.2,colorDetail[1].fill[1]*0.2,colorDetail[1].fill[2]*0.2,this.fade))
                    }
                    
                    this.layer.noStroke()
                    this.layer.fill(colorDetail[0].active[0]*0.2,colorDetail[0].active[1]*0.2,colorDetail[0].active[2]*0.2,this.fade*this.anim.select)
                    this.layer.rect(-20,0,this.width-25,this.height+15,10)
                    this.layer.fill(colorDetail[1].active[0]*0.2,colorDetail[1].active[1]*0.2,colorDetail[1].active[2]*0.2,this.fade*this.anim.select)
                    this.layer.rect(20,0,this.width-25,this.height+15,10)

                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.fillGradient(this.gradient[0])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+15)
                    this.layer.translate(this.width*0.2+2,0)

                    this.layer.strokeWeight(5)
                    this.layer.fill(colorDetail[0].fill[0]*0.2,colorDetail[0].fill[1]*0.2,colorDetail[0].fill[2]*0.2,this.fade)
                    this.layer.stroke(colorDetail[0].stroke[0]*0.2,colorDetail[0].stroke[1]*0.2,colorDetail[0].stroke[2]*0.2,this.fade)
                    this.layer.rect(-20,0,this.width-40,this.height,5)
                    this.layer.fill(colorDetail[1].fill[0]*0.2,colorDetail[1].fill[1]*0.2,colorDetail[1].fill[2]*0.2,this.fade)
                    this.layer.stroke(colorDetail[1].stroke[0]*0.2,colorDetail[1].stroke[1]*0.2,colorDetail[1].stroke[2]*0.2,this.fade)
                    this.layer.rect(20,0,this.width-40,this.height,5)

                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.noStroke()
                    this.layer.fillGradient(this.gradient[1])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+5)
                    this.layer.fillGradient(this.gradient[2])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height-5)
                    this.layer.translate(this.width*0.2+2,0)

                    this.layer.stroke(colorDetail[0].stroke[0]*0.2,colorDetail[0].stroke[1]*0.2,colorDetail[0].stroke[2]*0.2,this.fade)
                    this.layer.noFill()
                }else{
                    this.layer.fill(colorDetail.active[0]*0.2,colorDetail.active[1]*0.2,colorDetail.active[2]*0.2,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(colorDetail.fill[0]*0.2,colorDetail.fill[1]*0.2,colorDetail.fill[2]*0.2,this.fade)
                    this.layer.stroke(colorDetail.stroke[0]*0.2,colorDetail.stroke[1]*0.2,colorDetail.stroke[2]*0.2,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noFill()
                }
            }else{
                if(this.attack==1328){
                    this.layer.fill(255,150,150,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(238,28,37,this.fade)
                    this.layer.stroke(208,8,12,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(255,255,0,this.fade)
                    this.layer.noStroke()
                    regStar(this.layer,this.width/4,-this.height/2+this.width/4,5,this.width*3/20,this.width*3/20,this.width*3/20/2.62,this.width*3/20/2.62,90)
                    regStar(this.layer,this.width*2/5,-this.height/2+this.width/2,5,this.width/20,this.width/20,this.width/20/2.62,this.width/20/2.62,0)
                    regStar(this.layer,this.width*3/10,-this.height/2+this.width*3/5,5,this.width/20,this.width/20,this.width/20/2.62,this.width/20/2.62,0)
                    regStar(this.layer,this.width*3/20,-this.height/2+this.width*3/5,5,this.width/20,this.width/20,this.width/20/2.62,this.width/20/2.62,0)
                    regStar(this.layer,this.width/20,-this.height/2+this.width/2,5,this.width/20,this.width/20,this.width/20/2.62,this.width/20/2.62,0)
                    this.layer.stroke(208,8,12,this.fade)
                    this.layer.noFill()
                }else if(this.attack==1330){
                    this.layer.fill(150,225,175,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(50,200,100,this.fade)
                    this.layer.stroke(25,175,75,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(50,255,100,this.fade)
                    this.layer.stroke(25,255,75,this.fade)
                    this.layer.quad(-this.width/2,-this.height/4,-this.width/2,-this.height/12,this.width/2,this.height/4,this.width/2,this.height/12,5)
                    this.layer.stroke(25,175,75,this.fade)
                    this.layer.noFill()
                }else if(this.attack==1393){
                    this.layer.fill(0,150,255,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(0,41,204,this.fade)
                    this.layer.stroke(0,26,174,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(255,this.fade)
                    this.layer.noStroke()
                    let cap=tan(15)
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(30)
                        this.layer.triangle(0,this.width*3/8,-this.width*3/8*cap,0,this.width*3/8*cap,0)
                    }
                    this.layer.fill(0,41,204,this.fade)
                    this.layer.ellipse(0,0,this.width*17/40)
                    this.layer.fill(255,this.fade)
                    this.layer.ellipse(0,0,this.width*3/8)
                    this.layer.stroke(0,26,174,this.fade)
                    this.layer.noFill()
                }else if(this.attack==1615){
                    this.layer.fill(240,120,90,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(180,75,60,this.fade)
                    this.layer.stroke(150,60,45,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.strokeWeight(4)
                    for(let a=0,la=8;a<la;a++){
                        if(a!=0){
                            this.layer.line(-this.width/2,-this.height/2+this.height*a/la,this.width/2,-this.height/2+this.height*a/la)
                        }
                        for(let b=0,lb=3;b<lb;b++){
                            this.layer.line(-this.width/2+(b+0.25+a%2*0.5)/lb*this.width,-this.height/2+this.height*a/la,-this.width/2+(b+0.25+a%2*0.5)/lb*this.width,-this.height/2+this.height*(a+1)/la)
                        }
                    }
                    this.layer.noFill()
                }else if(this.attack==2064){
                    this.layer.fill(255,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(220,this.fade)
                    this.layer.stroke(180,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.stroke(220,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.noFill()
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noStroke()
                    for(let a=0,la=7;a<la;a++){
                        for(let b=0,lb=7;b<lb;b++){
                            let c=-this.width/2+2+(this.width-4)*(a+0.5)/la
                            let d=-this.height/2+2+(this.height-4)*(b+0.5*(a%2))/(lb-0.5)
                            this.layer.fill(180,this.fade)
                            if(a%2==0&&b==0){
                                this.layer.triangle(c-3,d,c+3,d,c,d+7)
                            }else if(a%2==1&&b==lb-1){
                                this.layer.triangle(c-3,d,c,d-5,c+3,d)
                            }else{
                                this.layer.quad(c-3,d,c,d-7,c+3,d,c,d+7)
                            }
                            this.layer.fill(220,this.fade)
                            if(a%2==0&&b==0){
                                this.layer.triangle(c-2,d,c+2,d,c,d+5)
                            }else if(a%2==1&&b==lb-1){
                                this.layer.triangle(c-2,d,c,d-5,c+2,d)
                            }else{
                                this.layer.quad(c-2,d,c,d-5,c+2,d,c,d+5)
                            }
                            this.layer.fill(180,this.fade)
                            if(a%2==0&&b==0){
                                this.layer.triangle(c-1,d,c+1,d,c,d+3)
                            }else if(a%2==1&&b==lb-1){
                                this.layer.triangle(c-1,d,c,d-3,c+1,d)
                            }else{
                                this.layer.quad(c-1,d,c,d-3,c+1,d,c,d+3)
                            }
                        }
                    }
                    let preColors=[[53,14,235],[67,50,174],[102,83,210],[110,173,240],[57,255,255]]
                    for(let a=0,la=72;a<la;a++){
                        let b=floor(a/la*15)%5
                        let c=a%(la/15)
                        let d=(b+1)%5
                        let e=(la/15)
                        this.layer.fill(
                            map(c/e,0,1,preColors[b][0],preColors[d][0]),
                            map(c/e,0,1,preColors[b][1],preColors[d][1]),
                            map(c/e,0,1,preColors[b][2],preColors[d][2])
                        )
                        this.layer.triangle(0,0,
                            (9+sin(a*50))*cos(a*5),(9+sin(a*50))*-sin(a*5),
                            (9+sin(a*50+70))*cos(a*5+7),(9+sin(a*50+70))*-sin(a*5+7)
                        )
                    }
                    this.layer.fill(60,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('Card',0,15)
                    this.layer.noFill()
                }else if(this.attack==-131||this.attack==-132||this.attack==3454||this.attack==3459||this.attack==3460||this.attack==-1031||this.attack==-1032||this.attack==4225){
                    this.gradient=[new p5.LinearGradient(-5,this.width*0.5-5),new p5.LinearGradient(-5,this.width*0.5-5),new p5.LinearGradient(-5,this.width*0.5-5)]
                    this.gradient[0].colors(0.0,
                        color(255,255,233,this.fade*this.anim.select),1.0,
                        color(236,134,134,this.fade*this.anim.select))
                    this.gradient[1].colors(0.0,
                        color(152,155,102,this.fade),1.0,
                        color(138,65,64,this.fade))
                    this.gradient[2].colors(0.0,
                        color(182,205,136,this.fade),1.0,
                        color(176,79,79,this.fade))
                    
                    this.layer.noStroke()
                    this.layer.fill(255,255,233,this.fade*this.anim.select)
                    this.layer.rect(-20,0,this.width-25,this.height+15,10)
                    this.layer.fill(236,134,134,this.fade*this.anim.select)
                    this.layer.rect(20,0,this.width-25,this.height+15,10)

                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.fillGradient(this.gradient[0])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+15)
                    this.layer.translate(this.width*0.2+2,0)

                    this.layer.strokeWeight(5)
                    this.layer.fill(182,205,136,this.fade)
                    this.layer.stroke(152,155,102,this.fade)
                    this.layer.rect(-20,0,this.width-40,this.height,5)
                    this.layer.fill(176,79,79,this.fade)
                    this.layer.stroke(138,65,64,this.fade)
                    this.layer.rect(20,0,this.width-40,this.height,5)

                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.noStroke()
                    this.layer.fillGradient(this.gradient[1])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+5)
                    this.layer.fillGradient(this.gradient[2])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height-5)
                    this.layer.translate(this.width*0.2+2,0)

                    this.layer.strokeWeight(2)
                    for(let a=0,la=12;a<la;a++){
                        for(let b=0,lb=this.height/this.width*6;b<lb-1;b++){
                            this.layer.stroke(167-(a+0.5)/la*10,180-(a+0.5)/la*108,119-(a+0.5)/la*30,this.fade)
                            this.layer.line(
                                -this.width/2+this.width*a/la,-this.height/2+this.height*(b+1)/lb-this.height/lb/4*(b%2*2-1)+a%2*this.height/lb/2*(b%2*2-1),
                                -this.width/2+this.width*(a+1)/la,-this.height/2+this.height*(b+1)/lb+this.height/lb/4*(b%2*2-1)-a%2*this.height/lb/2*(b%2*2-1)
                            )
                            this.layer.line(
                                -this.width/2+this.width*(a+0.5)/la,-this.height/2+this.height*(b+1)/lb,
                                -this.width/2+this.width*(a+a%2)/la,-this.height/2+this.height*(b+1)/lb-this.height/lb/4*(a%2*2-1)*(b%2*2-1)+a%2*this.height/lb/2*(a%2*2-1)*(b%2*2-1)
                            )
                        }
                    }
                    this.layer.strokeWeight(5)
                    this.layer.stroke(138,65,64,this.fade)
                    this.layer.line(this.width/2,-this.height/2+5,this.width/2,this.height/2-5)

                    this.layer.stroke(152,155,102,this.fade)
                    this.layer.line(-this.width/2,-this.height/2+5,-this.width/2,this.height/2-5)
                    this.layer.noFill()
                }else if(this.attack==3629||this.attack==3630||this.attack==3631){
                    this.layer.noStroke()
                    switch(this.attack){
                        case 3629:
                            this.layer.fill(253,253,229,this.fade*this.anim.select)
                        break
                        case 3630:
                            this.layer.fill(142,177,188,this.fade*this.anim.select)
                        break
                        case 3631:
                            this.layer.fill(188,128,204,this.fade*this.anim.select)
                        break
                    }
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.noStroke()
                    switch(this.attack){
                        case 3629:
                            this.layer.fill(117,203,82,this.fade)
                        break
                        case 3630:
                            this.layer.fill(99,143,183,this.fade)
                        break
                        case 3631:
                            this.layer.fill(176,106,178,this.fade)
                        break
                    }
                    this.layer.rect(0,0,this.width,this.height,5)
                    let rt3=sqrt(3)
                    this.layer.strokeWeight(2)
                    switch(this.attack){
                        case 3629:
                            this.layer.stroke(114,175,83,this.fade)
                        break
                        case 3630:
                            this.layer.stroke(89,125,164,this.fade)
                        break
                        case 3631:
                            this.layer.stroke(142,94,145,this.fade)
                        break
                    }
                    let exact=[(this.width-4)/9/rt3,this.height/18]
                    for(let a=0,la=round((this.width-4)/(9*rt3));a<la;a++){
                        for(let b=0,lb=round(this.height/18);b<lb;b++){
                            let mid=[-this.width/2+2+(this.width-4)*(a+0.5)/la,-this.height/2+this.height*(b+0.5+a%2*0.5)/lb]
                            if(b==0&&a%2==0 ){
                                this.layer.line(mid[0],mid[1],mid[0],mid[1]-6*exact[1]/lb)
                            }else{
                                this.layer.line(mid[0],mid[1],mid[0],mid[1]-12*exact[1]/lb)
                            }
                            if(a%2==1){
                                this.layer.line(mid[0],mid[1]-18*exact[1]/lb,mid[0]-6*rt3*exact[0]/la,mid[1]-12*exact[1]/lb)
                                this.layer.line(mid[0],mid[1]-18*exact[1]/lb,mid[0]+6*rt3*exact[0]/la,mid[1]-12*exact[1]/lb)
                            }else{
                                this.layer.line(mid[0],mid[1],mid[0]-6*rt3*exact[0]/la,mid[1]+6*exact[1]/lb)
                                this.layer.line(mid[0],mid[1],mid[0]+6*rt3*exact[0]/la,mid[1]+6*exact[1]/lb)
                            }
                            if(b!=0||a%2==1){
                                this.layer.line(mid[0],mid[1]-12*exact[1]/lb,mid[0]-3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb)
                                this.layer.line(mid[0],mid[1]-12*exact[1]/lb,mid[0]+3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb)
        
                                this.layer.line(mid[0]-6*rt3*exact[0]/la,mid[1]-12*exact[1]/lb,mid[0]-3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb)
                                this.layer.line(mid[0]+6*rt3*exact[0]/la,mid[1]-12*exact[1]/lb,mid[0]+3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb)
                            }
                            this.layer.line(mid[0]-3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb,mid[0]-3*rt3*exact[0]/la,mid[1]-3*exact[1]/lb)
                            this.layer.line(mid[0]+3*rt3*exact[0]/la,mid[1]-9*exact[1]/lb,mid[0]+3*rt3*exact[0]/la,mid[1]-3*exact[1]/lb)
                            if(a==0){
                                this.layer.line(mid[0]-3*rt3*exact[0]/la,mid[1]-3*exact[1]/lb,mid[0]-6*rt3*exact[0]/la,mid[1])
                            }else if(a==la-1){
                                this.layer.line(mid[0]+3*rt3*exact[0]/la,mid[1]-3*exact[1]/lb,mid[0]+6*rt3*exact[0]/la,mid[1])
                            }
                        }
                    }
                    this.layer.noFill()
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                }else if(this.attack>=3694&&this.attack<=3699){
                    this.layer.fill(200,220,240,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(80,100,120,this.fade)
                    this.layer.stroke(60,80,100,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.stroke(150,200,250,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.noFill()
                    this.layer.arc(this.width/2-10,this.height/2-7.5,12,7,60,270)
                    this.layer.arc(this.width/2-10,this.height/2-14,10,6,-270,-60)
                    this.layer.strokeWeight(1)
                    this.layer.ellipse(this.width/2-4,this.height/2-4,3,6)
                    this.layer.line(this.width/2-2,this.height/2-5.5,this.width/2-6,this.height/2-2.5)
                    this.layer.stroke(60,80,100,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.ellipse(0,0,min(this.width*0.4,this.height*0.4))
                    this.layer.ellipse(0,0,min(this.width*0.8,this.height*0.8))
                    this.layer.line(-this.width/2,0,this.width/2,0)
                    this.layer.line(0,-this.height/2,0,this.height/2)
                    this.layer.strokeWeight(5)
                    this.layer.noFill()
                }else if(this.attack==3753||this.attack==3754){
                    this.layer.noStroke()
                    this.layer.fill(250,this.fade*this.anim.select*0.2)
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    for(let a=0,la=20;a<la;a++){
                        this.layer.fill(170+graphics.paperball[a][0],190+graphics.paperball[a][0],215+graphics.paperball[a][0])
                        regPoly(this.layer,lsin((a+0.5)/la*360)*32.5,lcos((a+0.5)/la*360)*32.5,5,6.75,6.75,(a+0.5)/la*360)
                    }
                    for(let a=0,la=50;a<la;a++){
                        this.layer.fill(170+graphics.paperball[a][0],190+graphics.paperball[a][0],215+graphics.paperball[a][0])
                        regPoly(this.layer,lsin(a*137)*sqrt(a)*4.5,lcos(a*137)*sqrt(a)*4.5,5,6.75,6.75,graphics.paperball[a][1])
                    }
                    this.layer.fill(200,this.fade*0.2)
                    this.layer.rect(0,0,this.width+5,this.height+5,7.5)
                    this.layer.fill(240,this.fade*0.2)
                    this.layer.rect(0,0,this.width-5,this.height-5,2.5)
                    this.layer.noFill()
                }else if(this.attack==4048){
                    this.layer.noStroke()
                    this.layer.fill(250,this.fade*this.anim.select*0.2)
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    for(let a=0,la=20;a<la;a++){
                        this.layer.fill(200+graphics.paperball[a][0],180+graphics.paperball[a][0],graphics.paperball[a][0])
                        regPoly(this.layer,lsin((a+0.5)/la*360)*32.5,lcos((a+0.5)/la*360)*32.5,5,6.75,6.75,(a+0.5)/la*360)
                    }
                    for(let a=0,la=50;a<la;a++){
                        this.layer.fill(200+graphics.paperball[a][0],180+graphics.paperball[a][0],graphics.paperball[a][0])
                        regPoly(this.layer,lsin(a*137)*sqrt(a)*4.5,lcos(a*137)*sqrt(a)*4.5,5,6.75,6.75,graphics.paperball[a][1])
                    }
                    this.layer.fill(200,this.fade*0.2)
                    this.layer.rect(0,0,this.width+5,this.height+5,7.5)
                    this.layer.fill(240,this.fade*0.2)
                    this.layer.rect(0,0,this.width-5,this.height-5,2.5)
                    this.layer.noFill()
                }else if(this.colorful){
                    this.layer.fill(255,255,150,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(20,20,20,this.fade)
                    this.layer.stroke(50,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noFill()
                    this.layer.strokeWeight(1)
                    this.layer.stroke(255,255,50,this.fade)
                    this.layer.rect(0,0,this.width-4,this.height-4,3)
                    this.layer.line(-this.width/2+2,-this.height/2+6,-this.width/2+10,-this.height/2+6)
                    this.layer.line(this.width/2-2,-this.height/2+6,this.width/2-10,-this.height/2+6)
                    this.layer.arc(-this.width/2+16,-this.height/2+6,12,8,-180,-90)
                    this.layer.arc(this.width/2-16,-this.height/2+6,12,8,-90,0)
                    this.layer.line(this.width/2-4,this.height/2-12,this.width/2-4,this.height/2-24)
                    this.layer.line(this.width/2-4,this.height/2-12,this.width/2-12,this.height/2-4)
                    this.layer.line(this.width/2-12,this.height/2-4,this.width/2-24,this.height/2-4)
                    this.layer.line(this.width/2-6,this.height/2-6,this.width/2-6,this.height/2-18)
                    this.layer.line(this.width/2-6,this.height/2-6,this.width/2-18,this.height/2-6)
                    this.layer.line(this.width/2-6,this.height/2-18,this.width/2-4,this.height/2-20)
                    this.layer.line(this.width/2-18,this.height/2-6,this.width/2-20,this.height/2-4)
                    this.layer.fill(255,255,50,this.fade)
                    this.layer.ellipse(-this.width/2+6,this.height/2-6,3)
                    this.layer.quad(this.width/2-10,this.height/2-10,this.width/2-14,this.height/2-11,this.width/2-18,this.height/2-18,this.width/2-11,this.height/2-14)
                    this.layer.noFill()
                    this.layer.stroke(50,this.fade)
                    this.layer.strokeWeight(5)
                }else if(this.list==-8){
                    this.layer.fill(230,240,250,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(110,120,130,this.fade)
                    this.layer.stroke(90,100,110,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noStroke()
                    this.layer.fill(200,200,25,this.fade)
                    this.layer.quad(
                        -this.width/2-2.5,-this.height*0.25,
                        -this.width/2-2.5,-this.height*0.15,
                        this.width/2+2.5,this.height*0.25,
                        this.width/2+2.5,this.height*0.15)
                    this.layer.fill(25,this.fade)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.quad(
                            -this.width/2-2.5+(this.width+5)*(a+0.2)/la,-this.height*0.25+this.height*0.4*(a+0.2)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.2)/la,-this.height*0.15+this.height*0.4*(a+0.2)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.7)/la,-this.height*0.15+this.height*0.4*(a+0.7)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.7)/la,-this.height*0.25+this.height*0.4*(a+0.7)/la)
                    }
                    this.layer.fill(50,this.fade)
                    this.layer.quad(
                        -this.width/2-2.5,this.height*0.25,
                        -this.width/2-2.5,this.height*0.15,
                        this.width/2+2.5,-this.height*0.25,
                        this.width/2+2.5,-this.height*0.15)
                    this.layer.fill(225,225,50,this.fade)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.quad(
                            -this.width/2-2.5+(this.width+5)*(a+0.3)/la,this.height*0.25-this.height*0.4*(a+0.3)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.3)/la,this.height*0.15-this.height*0.4*(a+0.3)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.8)/la,this.height*0.15-this.height*0.4*(a+0.8)/la,
                            -this.width/2-2.5+(this.width+5)*(a+0.8)/la,this.height*0.25-this.height*0.4*(a+0.8)/la)
                    }
                    this.layer.stroke(90,100,110,this.fade)
                    this.layer.noFill()
                }else if(this.list==-9&&variants.ultraprism){
                    this.layer.fill(200,190,180,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(120,110,100,this.fade)
                    this.layer.stroke(100,90,80,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noStroke()
                    this.layer.fill(225,25,25,this.fade)
                    this.layer.ellipse(0,0,50)
                    this.layer.fill(255,this.fade)
                    this.layer.quad(-15,-10,-10,-15,15,10,10,15)
                    this.layer.quad(15,-10,10,-15,-15,10,-10,15)
                    this.layer.stroke(100,90,80,this.fade)
                    this.layer.noFill()
                }else if(variants.mtg&&colorDetail.length>=2){
                    this.gradient=[new p5.LinearGradient(-15,this.width*0.5-5),new p5.LinearGradient(-15,this.width*0.5-5),new p5.LinearGradient(-15,this.width*0.5-5)]
                    if(colorDetail.length==3){
                        this.gradient[0].colors(0.0,
                            color(...colorDetail[0].active,this.fade*this.anim.select),0.3,
                            color(...colorDetail[2].active,this.fade*this.anim.select),0.7,
                            color(...colorDetail[2].active,this.fade*this.anim.select),1.0,
                            color(...colorDetail[1].active,this.fade*this.anim.select))
                        this.gradient[1].colors(0.0,
                            color(...colorDetail[0].stroke,this.fade),0.3,
                            color(...colorDetail[2].stroke,this.fade),0.7,
                            color(...colorDetail[2].stroke,this.fade),1.0,
                            color(...colorDetail[1].stroke,this.fade))
                        this.gradient[2].colors(0.0,
                            color(...colorDetail[0].fill,this.fade),0.3,
                            color(...colorDetail[2].fill,this.fade),0.7,
                            color(...colorDetail[2].fill,this.fade),1.0,
                            color(...colorDetail[1].fill,this.fade))
                    }else{
                        this.gradient[0].colors(0.0,
                            color(...colorDetail[0].active,this.fade*this.anim.select),1.0,
                            color(...colorDetail[1].active,this.fade*this.anim.select))
                        this.gradient[1].colors(0.0,
                            color(...colorDetail[0].stroke,this.fade),1.0,
                            color(...colorDetail[1].stroke,this.fade))
                        this.gradient[2].colors(0.0,
                            color(...colorDetail[0].fill,this.fade),1.0,
                            color(...colorDetail[1].fill,this.fade))
                    }
                    
                    this.layer.noStroke()
                    this.layer.fill(...colorDetail[0].active,this.fade*this.anim.select)
                    this.layer.rect(-20,0,this.width-25,this.height+15,10)
                    this.layer.fill(...colorDetail[1].active,this.fade*this.anim.select)
                    this.layer.rect(20,0,this.width-25,this.height+15,10)

                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.fillGradient(this.gradient[0])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+15)
                    this.layer.translate(this.width*0.2+2,0)

                    this.layer.strokeWeight(5)
                    this.layer.fill(...colorDetail[0].fill,this.fade)
                    this.layer.stroke(...colorDetail[0].stroke,this.fade)
                    this.layer.rect(-20,0,this.width-40,this.height,5)
                    this.layer.fill(...colorDetail[1].fill,this.fade)
                    this.layer.stroke(...colorDetail[1].stroke,this.fade)
                    this.layer.rect(20,0,this.width-40,this.height,5)

                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.noStroke()
                    this.layer.fillGradient(this.gradient[1])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+5)
                    this.layer.fillGradient(this.gradient[2])
                    this.layer.rect(this.width*0.2+2,0,this.width-10,this.height-5)
                    this.layer.translate(this.width*0.2+2,0)

                    this.layer.stroke(...colorDetail[0].stroke,this.fade)
                    this.layer.noFill()
                }else{
                    this.layer.fill(...colorDetail.active,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(...colorDetail.fill,this.fade)
                    this.layer.stroke(...colorDetail.stroke,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noFill()
                }
            }
            this.layer.strokeWeight(3)
            if(name.substr(0,2)!='-h'){
                switch(rarity){
                    case -1:
                        this.layer.ellipse(-this.width/2+7.5,this.height/2-7.5,10)
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
                    case -4:
                        this.layer.strokeWeight(1)
                        this.layer.ellipse(-this.width/2+7.5,this.height/2-10,5,5)
                        this.layer.ellipse(-this.width/2+7.5,this.height/2-5,5,5)
                        this.layer.ellipse(-this.width/2+5,this.height/2-7.5,5,5)
                        this.layer.ellipse(-this.width/2+10,this.height/2-7.5,5,5)
                    break
                    case -5:
                        this.layer.strokeWeight(2.5)
                        this.layer.line(-this.width/2+2,this.height/2-2,-this.width/2+14,this.height/2-14)
                        this.layer.line(-this.width/2+10,this.height/2-18,-this.width/2+18,this.height/2-10)
                        this.layer.strokeWeight(2)
                        this.layer.line(-this.width/2+7,this.height/2-16,-this.width/2+13,this.height/2-22)
                        this.layer.line(-this.width/2+16,this.height/2-7,-this.width/2+22,this.height/2-13)
                        this.layer.strokeWeight(1.5)
                        this.layer.line(-this.width/2+4,this.height/2-17,-this.width/2+8,this.height/2-13)
                        this.layer.line(-this.width/2+12,this.height/2-25,-this.width/2+16,this.height/2-21)
                        this.layer.line(-this.width/2+17,this.height/2-4,-this.width/2+13,this.height/2-8)
                        this.layer.line(-this.width/2+25,this.height/2-12,-this.width/2+21,this.height/2-16)
                    break
                    case -6:
                        this.layer.line(-this.width/2+5,this.height/2,-this.width/2+5,this.height/2-15)
                        this.layer.line(-this.width/2,this.height/2-5,-this.width/2+15,this.height/2-5)
                        this.layer.line(-this.width/2+5,this.height/2-15,-this.width/2+15,this.height/2-5)
                    break
                    case -7:
                        this.layer.strokeWeight(2)
                        this.layer.ellipse(-this.width/2+7.5,this.height/2-12,5)
                        this.layer.triangle(-this.width/2+5,this.height/2-17,-this.width/2+10,this.height/2-17,-this.width/2+7.5,this.height/2-22)
                        this.layer.triangle(-this.width/2+5,this.height/2-7,-this.width/2+10,this.height/2-7,-this.width/2+7.5,this.height/2-2)
                    break
                    case -8:
                        this.layer.strokeWeight(2)
                        this.layer.line(-this.width/2+7,this.height/2-7,-this.width/2,this.height/2-9)
                        this.layer.line(-this.width/2+7,this.height/2-7,-this.width/2,this.height/2-5)
                        this.layer.line(-this.width/2+7,this.height/2-7,-this.width/2+5,this.height/2)
                        this.layer.line(-this.width/2+7,this.height/2-7,-this.width/2+9,this.height/2)
                        this.layer.line(-this.width/2+7,this.height/2-7,-this.width/2+8,this.height/2-11)
                        this.layer.line(-this.width/2+7,this.height/2-7,-this.width/2+11,this.height/2-8)
                        this.layer.line(-this.width/2+12,this.height/2-12,-this.width/2+8,this.height/2-11)
                        this.layer.line(-this.width/2+12,this.height/2-12,-this.width/2+11,this.height/2-8)
                    break
                    case -10:
                        this.layer.strokeWeight(2)
                        this.layer.triangle(-this.width/2+2,this.height/2,-this.width/2+8,this.height/2,-this.width/2+5,this.height/2-12)
                        this.layer.triangle(-this.width/2+8,this.height/2,-this.width/2+14,this.height/2,-this.width/2+11,this.height/2-12)
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
                if(variants.mtg&&list>=0&&list<=game.playerNumber){
                    if(colorDetail.length>=2){
                        if(this.colorful){
                            this.layer.stroke(50,this.fade)
                        }else if(this.edition==5){
                            this.layer.stroke(colorDetail[colorDetail.length-1].stroke[0]*0.2,colorDetail[colorDetail.length-1].stroke[1]*0.2,colorDetail[colorDetail.length-1].stroke[2]*0.2,this.fade)
                        }else{
                            this.layer.stroke(...colorDetail[colorDetail.length-1].stroke,this.fade)
                        }
                    }
                    this.layer.strokeWeight(2)
                    this.layer.ellipse(this.width/2-7.5,this.height/2-7.5,5)
                }
            }
            if(spec.includes(12)){
                if(variants.mtg&&colorDetail.length>=2){
                    this.gradient=[new p5.LinearGradient(-15,this.width*0.5-5)]
                    if(this.edition==5){
                        if(corDetail.length==3){
                            this.gradient[0].colors(0.0,
                                color(colorDetail[0].stroke[0]*0.2,colorDetail[0].stroke[1]*0.2,colorDetail[0].stroke[2]*0.2,this.fade),0.3,
                                color(colorDetail[2].stroke[0]*0.2,colorDetail[2].stroke[1]*0.2,colorDetail[2].stroke[2]*0.2,this.fade),0.7,
                                color(colorDetail[2].stroke[0]*0.2,colorDetail[2].stroke[1]*0.2,colorDetail[2].stroke[2]*0.2,this.fade),1.0,
                                color(colorDetail[1].stroke[0]*0.2,colorDetail[1].stroke[1]*0.2,colorDetail[1].stroke[2]*0.2,this.fade))
                        }else{
                            this.gradient[0].colors(0.0,
                                color(colorDetail[0].stroke[0]*0.2,colorDetail[0].stroke[1]*0.2,colorDetail[0].stroke[2]*0.2,this.fade),1.0,
                                color(colorDetail[1].stroke[0]*0.2,colorDetail[1].stroke[1]*0.2,colorDetail[1].stroke[2]*0.2,this.fade))
                        }
                    }else{
                        if(colorDetail.length==3){
                            this.gradient[0].colors(0.0,
                                color(...colorDetail[0].stroke,this.fade),0.3,
                                color(...colorDetail[2].stroke,this.fade),0.7,
                                color(...colorDetail[2].stroke,this.fade),1.0,
                                color(...colorDetail[1].stroke,this.fade))
                        }else{
                            this.gradient[0].colors(0.0,
                                color(...colorDetail[0].stroke,this.fade),1.0,
                                color(...colorDetail[1].stroke,this.fade))
                        }
                    }
                    this.layer.noStroke()
                    this.layer.translate(-this.width*0.2-2,0)
                    this.layer.fill(...colorDetail[0].stroke,this.fade)
                    this.layer.fillGradient(this.gradient[0])
                    this.layer.rect(this.width*0.2+2,16,this.width,3)
                    this.layer.translate(this.width*0.2+2,0)
                }else{
                    this.layer.strokeWeight(3)
                    this.layer.line(-this.width/2,variants.mtg?16:10,this.width/2,variants.mtg?16:10)
                }
            }
            if(this.edition>=1&&this.edition<=8){
                if(this.width==90){
                    this.layer.image(graphics.edition[this.edition-1][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                }else{
                    this.layer.image(graphics.edition[this.edition-1][0],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                }
                if(this.battle.relicManager.hasRelic(249,this.player)&&this.edition==4){
                    if(this.width==90){
                        this.layer.image(graphics.edition[5][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    }else{
                        this.layer.image(graphics.edition[5][0],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    }
                }else if(this.battle.relicManager.hasRelic(249,this.player)&&this.edition==6){
                    if(this.width==90){
                        this.layer.image(graphics.edition[3][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    }else{
                        this.layer.image(graphics.edition[3][0],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    }
                }
            }
            this.layer.noStroke()
            if(this.spec.includes(53)){
                if(this.edition==5){
                    let merge=[255,255,255]
                    this.layer.fill(...merge,this.fade)
                }else if(this.colorful){
                    let merge=[240,240,240]
                    this.layer.fill(...merge,this.fade)
                }else{
                    let merge=[0,0,0]
                    this.layer.fill(...merge,this.fade)
                }
            }else if(variants.mtg&&colorDetail.length>=2){
                if(colorDetail.length>=3){
                    if(this.edition==5){
                        let merge=mergeColor([255,255,255],flipColor(mergeColor3(colorDetail[0].text,colorDetail[1].text,colorDetail[2].text)),this.level/max(1,this.levels-1))
                        this.layer.fill(...merge,this.fade)
                    }else if(this.colorful){
                        let merge=mergeColor([240,240,240],mergeColor3(colorDetail[0].text,colorDetail[1].text,colorDetail[2].text),this.level/max(1,this.levels-1))
                        this.layer.fill(...merge,this.fade)
                    }else{
                        let merge=mergeColor([0,0,0],mergeColor3(colorDetail[0].text,colorDetail[1].text,colorDetail[2].text),this.level/max(1,this.levels-1))
                        this.layer.fill(...merge,this.fade)
                    }
                }else{
                    if(this.edition==5){
                        let merge=mergeColor([255,255,255],flipColor(mergeColor(colorDetail[0].text,colorDetail[1].text,0.5)),this.level/max(1,this.levels-1))
                        this.layer.fill(...merge,this.fade)
                    }else if(this.colorful){
                        let merge=mergeColor([240,240,240],mergeColor(colorDetail[0].text,colorDetail[1].text,0.5),this.level/max(1,this.levels-1))
                        this.layer.fill(...merge,this.fade)
                    }else{
                        let merge=mergeColor([0,0,0],mergeColor(colorDetail[0].text,colorDetail[1].text,0.5),this.level/max(1,this.levels-1))
                        this.layer.fill(...merge,this.fade)
                    }
                }
            }else{
                if(this.edition==5){
                    let merge=mergeColor([255,255,255],flipColor(colorDetail.text),this.level/max(1,this.levels-1))
                    this.layer.fill(...merge,this.fade)
                }else if(this.colorful){
                    let merge=mergeColor([240,240,240],colorDetail.text,this.level/max(1,this.levels-1))
                    this.layer.fill(...merge,this.fade)
                }else{
                    let merge=mergeColor([0,0,0],colorDetail.text,this.level/max(1,this.levels-1))
                    this.layer.fill(...merge,this.fade)
                }
            }
            if(spec.includes(13)){
                this.layer.textSize(24)
                this.layer.text('???',0,0)
            }else if(spec.includes(48)){
                this.layer.textSize(16)
                this.layer.text('Frozen',0,-10)
                this.layer.textSize(8)
                this.layer.text('Gain 1 Freeze\nand Reveal',0,10)
            }else if(spec.includes(39)){
                this.layer.textSize(16)
                this.layer.text('Burning',0,-10)
                this.layer.textSize(8)
                this.layer.text('Gain 1 Burn\nand Reveal',0,10)
            }else if(spec.includes(8)){
                this.layer.textSize(16)
                if(spec.includes(10)){
                    this.layer.text('Slimed',0,-12)
                    this.layer.text('Smoked',0,12)
                }else{
                    this.layer.text('Slimed',0,0)
                }
            }else if(spec.includes(10)){
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
                if(spec.includes(6)&&!variants.mtg){
                    this.layer.fill(138,141,207,this.fade)
                    this.layer.stroke(111,114,178,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.ellipse(-this.width/2+10,-this.height/2+(this.colorful?15:12),20)
                }
                if(spec.includes(11)){
                    this.layer.translate(variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+(this.colorful?15:12))
                    this.layer.noFill()
                    this.layer.stroke(240,240,40,this.fade)
                    this.layer.strokeWeight(variants.mtg?2.4:3)
                    this.layer.strokeCap(SQUARE)
                    if(variants.mtg){
                        this.layer.arc(0.4,-0.4,12,12,-135,45)
                        this.layer.arc(-0.4,0.4,12,12,45,225)
                    }else{
                        this.layer.arc(0.5,-0.5,15,15,-135,45)
                        this.layer.arc(-0.5,0.5,15,15,45,225)
                    }
                    this.layer.strokeCap(ROUND)
                    this.layer.translate(variants.mtg?-this.width/2+8:this.width/2-10,variants.mtg?this.height/2-7.5:this.height/2-(this.colorful?15:12))
                }else if(spec.includes(21)){
                    this.layer.fill(140,120,160,this.fade)
                    this.layer.stroke(120,100,140,this.fade)
                    this.layer.strokeWeight(variants.mtg?1.6:2)
                    if(variants.mtg){
                        regPoly(this.layer,variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+(this.colorful?15:12),8,5.6,5.6,0)
                    }else{
                        regPoly(this.layer,variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+(this.colorful?15:12),8,7,7,0)
                    }
                }else if(spec.includes(35)){
                    if(variants.mtg){
                        let finalCost=this.editCost(cost,1)
                        let totals=[0,0,0,0,0,0,0,0]
                        let pos=0
                        for(let a=0,la=finalCost.length;a<la;a++){
                            totals[finalCost[a]+1]++
                        }
                        for(let a=1,la=totals.length;a<la;a++){
                            if(totals[a]>0){
                                displayMtgManaSymbol(this.layer,this.width/2-6-pos*12.5,-this.height/2+6,a-1,0,0.6,this.fade,1,[this.anim.afford,this.anim.costDown,this.anim.costUp,totals[a]])
                                pos++
                            }
                        }
                        if(totals[0]>0){
                            displayMtgManaSymbol(this.layer,this.width/2-6-pos*12.5,-this.height/2+6,-2,0,0.6,this.fade,1,[this.anim.afford,this.anim.costDown,this.anim.costUp,totals[0]])
                        }
                    }else{
                        this.layer.strokeJoin(ROUND)
                        if(this.colorful){
                            this.layer.fill(200,175,50,this.fade)
                            this.layer.stroke(175,150,25,this.fade)
                            this.layer.strokeWeight(2)
                            this.layer.rect(-this.width/2+6,-this.height/2+11,8)
                            this.layer.arc(-this.width/2+10,-this.height/2+15,16,16,-90,180)
                            this.layer.noStroke()
                            this.layer.ellipse(-this.width/2+10,-this.height/2+15,14)
                        }else{
                            this.layer.fill(150,255,225,this.fade)
                            this.layer.stroke(100,255,225,this.fade)
                            this.layer.strokeWeight(2)
                            this.layer.rect(-this.width/2+6,-this.height/2+8,8)
                            this.layer.arc(-this.width/2+10,-this.height/2+12,16,16,-90,180)
                            this.layer.noStroke()
                            this.layer.ellipse(-this.width/2+10,-this.height/2+12,14)
                        }
                        this.layer.strokeJoin(MITER)
                    }
                }else if(spec.includes(40)){
                    this.layer.noStroke()
                    this.layer.fill(225,this.fade)
                    this.layer.rect(-this.width/2+10,-this.height/2+13,20,20,2)
                    this.layer.fill(40,this.fade)
                    this.layer.ellipse(-this.width/2+5,-this.height/2+8,4)
                    this.layer.ellipse(-this.width/2+15,-this.height/2+18,4)
                }else if(spec.includes(55)){
                    if(this.colorful){
                        this.layer.fill(125,this.fade)
                        this.layer.stroke(100,this.fade)
                        this.layer.strokeWeight(2)
                        regStar(this.layer,-this.width/2+10,-this.height/2+16,5,12,12,4.5,4.5,36)
                    }else{
                        this.layer.fill(255,255,50,this.fade)
                        this.layer.stroke(225,225,50,this.fade)
                        this.layer.strokeWeight(2)
                        regStar(this.layer,-this.width/2+10,-this.height/2+13,5,12,12,4.5,4.5,36)
                    }
                }else if(spec.includes(58)){
                    this.layer.translate(variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+(this.colorful?15:12))
                    this.layer.fill(255,50,50,this.fade)
                    this.layer.stroke(200,0,0,this.fade)
                    this.layer.strokeWeight(variants.mtg?1.6:2)
                    if(variants.mtg){
                        this.layer.quad(
                            0,0,
                            -3.2*sqrt(2),-3.2*sqrt(2),
                            0,-6.4*sqrt(2),
                            3.2*sqrt(2),-3.2*sqrt(2)
                        )
                        this.layer.arc(0,0,12.8,12.8,-45,225)
                        this.layer.noStroke()
                        this.layer.ellipse(0,0,11.2)
                    }else{
                        this.layer.quad(
                            0,0,
                            -4*sqrt(2),-4*sqrt(2),
                            0,-8*sqrt(2),
                            4*sqrt(2),-4*sqrt(2)
                        )
                        this.layer.arc(0,0,16,16,-45,225)
                        this.layer.noStroke()
                        this.layer.ellipse(0,0,14)
                    }
                    this.layer.translate(variants.mtg?-this.width/2+8:this.width/2-10,variants.mtg?this.height/2-7.5:this.height/2-(this.colorful?15:12))
                }else if(spec.includes(59)){
                    this.layer.translate(-this.width/2+10,-this.height/2+12+(this.colorful?3:0))
                    if(!spec.includes(60)){
                        this.layer.fill(90,90,135,this.fade)
                        this.layer.stroke(105,105,150,this.fade)
                    }else if(this.colorful){
                        this.layer.fill(150,this.fade)
                        this.layer.stroke(175,this.fade)
                    }else{
                        this.layer.fill(255,100,150,this.fade)
                        this.layer.stroke(255,125,175,this.fade)
                    }
                    this.layer.strokeWeight(1.5)
                    this.layer.strokeJoin(ROUND)
                    regStarGear(this.layer,0,0,6,2,7,7,9,9,30)  
                    this.layer.strokeJoin(MITER)
                    this.layer.noStroke()
                    if(!spec.includes(60)){
                        this.layer.fill(150,150,195,this.fade)
                    }else if(this.colorful){
                        this.layer.fill(200,this.fade)
                    }else{
                        this.layer.fill(255,150,200,this.fade)
                    }
                    this.layer.ellipse(0,0,6)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.quad(-1.5,-4.25,1.5,-4.25,0.5,-6,-0.5,-6)
                        this.layer.rotate(120)
                    }
                    this.layer.translate(this.width/2-10,this.height/2-12-(this.colorful?3:0))
                }else if(!spec.includes(5)&&!spec.includes(41)){
                    if(variants.mtg){
                        let finalCost=this.editCost(cost,1)
                        if(spec.includes(6)){
                            let preTotalNeutral=0
                            let preTotal=0
                            for(let a=0,la=this.cost.length;a<la;a++){
                                if(finalCost[a]==-1){
                                    preTotalNeutral++
                                }else{
                                    preTotal++
                                }
                            }
                            if(preTotalNeutral>0||preTotal==0){
                                preTotal++
                            }
                            this.layer.fill(138,141,207,this.fade)
                            this.layer.stroke(111,114,178,this.fade)
                            this.layer.strokeWeight(1.5)
                            this.layer.rect(this.width/2-6+6.25-preTotal*6.25,-this.height/2+6,preTotal*12.5+4,8,4)
                        }
                        let totalNeutral=0
                        let total=0
                        for(let a=0,la=finalCost.length;a<la;a++){
                            if(finalCost[a]==-1){
                                totalNeutral++
                            }else{
                                displayMtgManaSymbol(this.layer,this.width/2-6-total*12.5,-this.height/2+6,finalCost[a],0,0.6,this.fade,0,[this.anim.afford,this.anim.costDown,this.anim.costUp])
                                total++
                            }
                        }
                        if(totalNeutral>0||total==0){
                            displayMtgManaSymbol(this.layer,this.width/2-6-total*12.5,-this.height/2+6,-2,0,0.6,this.fade,0,[this.anim.afford,this.anim.costDown,this.anim.costUp,totalNeutral])
                            total++
                        }
                    }else if(this.colorful){
                        this.layer.translate(-this.width/2+10,-this.height/2+15)
                        this.gradient=[new p5.ConicGradient(0,0,0)]
                        this.layer.colorMode(HSB,360,1,1,1)
                        this.gradient[0].colors(0.0,
                            this.layer.color(0,1,1,this.fade),1/6,
                            this.layer.color(60,1,1,this.fade),1/3,
                            this.layer.color(120,1,1,this.fade),1/2,
                            this.layer.color(180,1,1,this.fade),2/3,
                            this.layer.color(240,1,1,this.fade),5/6,
                            this.layer.color(300,1,1,this.fade),1.0,
                            this.layer.color(360,1,1,this.fade))
                        this.layer.noStroke()
                        this.layer.fillGradient(this.gradient[0])
                        this.layer.ellipse(0,0,21.5)
                        this.layer.translate(this.width/2-10,this.height/2-15)
                        this.layer.colorMode(RGB,255,255,255,1)
                        this.layer.text('',0,0)
                    }else{
                        this.layer.fill(225,255,255,this.fade)
                        this.layer.stroke(200,255,255,this.fade)
                        this.layer.strokeWeight(2)
                        this.layer.quad(-this.width/2+2,-this.height/2+12,-this.width/2+10,-this.height/2+2,-this.width/2+18,-this.height/2+12,-this.width/2+10,-this.height/2+22)
                        if(this.anim.costDown>0){
                            this.layer.noStroke()
                            this.layer.fill(100,200,200,this.fade*this.anim.costDown)
                            this.layer.triangle(-this.width/2+6,-this.height/2+14,-this.width/2+10,-this.height/2+19,-this.width/2+14,-this.height/2+14)
                        }
                        if(this.anim.costUp>0){
                            this.layer.noStroke()
                            this.layer.fill(100,200,200,this.fade*this.anim.costUp)
                            this.layer.triangle(-this.width/2+6,-this.height/2+10,-this.width/2+10,-this.height/2+5,-this.width/2+14,-this.height/2+10)
                        }
                    }
                }
                if(variants.polar&&this.player>=0){
                    this.layer.strokeWeight(2)
                    if(this.pole==this.battle.cardManagers[this.player].hand.pole||stage.scene!='battle'){
                        if(this.pole==1){
                            this.layer.fill(90,255,90,this.fade)
                            this.layer.stroke(120,255,120,this.fade)
                            regStar(this.layer,this.width/2-10,this.height/2-10,6,8,8,2,2,0)
                        }else if(this.pole==0){
                            this.layer.fill(90,255,255,this.fade)
                            this.layer.stroke(120,255,255,this.fade)
                            regStar(this.layer,this.width/2-10,this.height/2-10,6,8,8,2,2,30)
                        }
                    }else{
                        this.layer.fill(90,this.fade)
                        this.layer.stroke(120,this.fade)
                        if(this.pole==1){
                            regStar(this.layer,this.width/2-10,this.height/2-10,6,8,8,2,2,0)
                        }else if(this.pole==0){
                            regStar(this.layer,this.width/2-10,this.height/2-10,6,8,8,2,2,30)
                        }

                    }
                }
                this.layer.noStroke()
                if(!spec.includes(5)&&!spec.includes(41)&&(!variants.mtg||this.specialCost)){
                    if(this.colorful){
                        let merge=mergeColor([255,0,0],[240,240,240],this.anim.afford)
                        this.layer.fill(...merge,this.fade)
                    }else if(spec.includes(11)){
                        let merge=mergeColor([255,0,0],[255,255,255],this.anim.afford)
                        this.layer.fill(...merge,this.fade)
                    }else if(spec.includes(21)){
                        let merge=mergeColor([255,0,0],[50,40,60],this.anim.afford)
                        this.layer.fill(...merge,this.fade)
                    }else{
                        let merge=mergeColor([255,0,0],[0,0,0],this.anim.afford)
                        this.layer.fill(...merge,this.fade)
                    }
                    this.layer.textSize(variants.mtg?10:14)
                    let effectiveCost=this.editCost(cost,1)
                    if(this.colorful){
                        this.layer.text(effectiveCost==-1?`X`:effectiveCost,variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+8:-this.height/2+16)
                    }else{
                        this.layer.text(effectiveCost==-1?`X`:effectiveCost,variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+8:-this.height/2+13)
                    }
                }
                if(this.edition==5){
                    this.layer.fill(255,this.fade)
                }else if(this.colorful){
                    this.layer.fill(240,this.fade)
                }else{
                    this.layer.fill(0,this.fade)
                }
                if(name.substr(0,2)!='-h'){
                    let effectiveName=name.replace('$colorcharacter',variants.mtg?'?':types.combatant[this.color].name)
                    if(this.battle.modded(186)){
                        effectiveName=effectiveName.toLowerCase()
                    }
                    if(spec.includes(34)){
                        this.layer.rotate(90)
                        this.layer.textSize(12)
                        if(spec.includes(37)){
                            this.layer.text(effectiveName+":",0,0)
                        }else{
                            this.layer.text(effectiveName+(this.level>=3?`+[${this.level}]`:multiplyString('+',this.level)),0,0)
                        }
                        this.layer.rotate(-90)
                    }else{
                        this.layer.textSize(variants.blind?12:10-((name.length>=24&&name.includes('Discus')||name.length>=23&&this.class==9)&&!name.includes('$colorcharacter')||name=='Cauchy-Riemann\nEquations'||name=='Temptation of\nthe Next World'?3:0))
                        if(spec.includes(37)){
                            this.layer.text(effectiveName+":",0,variants.blind?0:-this.height/2+15+(variants.mtg?10:0))
                        }else{
                            this.layer.text(effectiveName+(this.level>=3?`+[${this.level}]`:multiplyString('+',this.level)),0,variants.blind?0:-this.height/2+15+(variants.mtg?10:0))
                        }
                        if(!variants.blind){
                            if(this.edition==5){
                                this.layer.fill(255,255,255,this.fade)
                            }else if(this.colorful){
                                this.layer.fill(240,this.fade)
                            }else{
                                this.layer.fill(0,this.fade)
                            }
                            this.desc=''
                            if(!spec.includes(12)){
                                this.desc=this.description(attack,effect,spec,target)
                            }
                            if(this.battle.modded(186)){
                                this.desc=this.desc.toLowerCase()
                            }
                            this.layer.textSize(
                                name=='Charred\nLizard'||name=='Flame of\nNirvana'||name=='First\nQuarter'||name=='Last\nQuarter'||name=='Foehn'||name=='Yukari, Boundary\nof Fantasy'||name=='Keystone\nCannon'||name=='Hakurei\nTalisman'||name=='Hakurei\nAmulet'||name=='Shizuha, Symbol\nof Loneliness'||name=='Ran,\nScheming Fox'||name==`Flandre,\nDevil's Sister`||name=='Hina, Ward\nof Misfortune'||
                                !spec.includes(12)&&getIndicesOf(this.desc,'\n',true)>=8?6:7.5)
                            if(spec.includes(12)){
                                this.layer.text(this.description(attack[0],effect[0],reality[0],target),0,variants.mtg?-6:-15)
                                this.layer.text(this.description(attack[1],effect[1],reality[1],target),0,variants.mtg?this.height/2-20:this.height/2-25)
                            }else{
                                this.layer.text(this.desc,0,variants.mtg?16:10)
                            }
                            this.layer.textSize(6)
                            if(options.id){
                                this.layer.text(this.id,this.width/2-8,-this.height/2+8)
                            }
                            if(spec.includes(12)){
                                let classPos=variants.mtg?
                                    [[-this.width/2+15,-this.height/2+6],[-this.width/2+18,21]]:
                                    [[0,4],[0,this.height/2-6]]
                                for(let a=0,la=2;a<la;a++){
                                    switch(classT[a]){
                                        case 1:
                                            this.layer.text('Attack',...classPos[a])
                                        break
                                        case 2:
                                            this.layer.text('Defense',...classPos[a])
                                        break
                                        case 3:
                                            this.layer.text('Movement',...classPos[a])
                                        break
                                        case 4:
                                            this.layer.text('Power',...classPos[a])
                                        break
                                        case 5:
                                            this.layer.text('Status',...classPos[a])
                                        break
                                        case 6:
                                            this.layer.text('Curse',...classPos[a])
                                        break
                                        case 7:
                                            this.layer.text('Blueprint',...classPos[a])
                                        break
                                        case 8:
                                            this.layer.text('Condition',...classPos[a])
                                        break
                                        case 9:
                                            this.layer.text('Ally',...classPos[a])
                                        break
                                        case 10:
                                            this.layer.text('Classless',...classPos[a])
                                        break
                                        case 11:
                                            this.layer.text('Skill',...classPos[a])
                                        break
                                        case 12:
                                            this.layer.text('Wish',...classPos[a])
                                        break
                                    }
                                }
                            }else{
                                let classPos=variants.mtg?[-this.width/2+15,-this.height/2+6]:[0,this.height/2-6]
                                switch(classT){
                                    case 1:
                                        this.layer.text('Attack',...classPos)
                                    break
                                    case 2:
                                        this.layer.text('Defense',...classPos)
                                    break
                                    case 3:
                                        this.layer.text('Movement',...classPos)
                                    break
                                    case 4:
                                        this.layer.text('Power',...classPos)
                                    break
                                    case 5:
                                        this.layer.text('Status',...classPos)
                                    break
                                    case 6:
                                        this.layer.text('Curse',...classPos)
                                    break
                                    case 7:
                                        this.layer.text('Blueprint',...classPos)
                                    break
                                    case 8:
                                        this.layer.text('Condition',...classPos)
                                    break
                                    case 9:
                                        this.layer.text('Ally',...classPos)
                                    break
                                    case 10:
                                        this.layer.text('Classless',...classPos)
                                    break
                                    case 11:
                                        this.layer.text('Skill',...classPos)
                                    break
                                    case 12:
                                        this.layer.text('Wish',...classPos)
                                    break
                                }
                            }
                            this.layer.textSize(5)
                            if(this.battle.modded(155)){
                                switch(this.edition){
                                    case 1:
                                        if(this.battle.relicManager.hasRelic(349,this.player)){
                                            this.layer.text(`Silver: -2(${2+2*this.battle.relicManager.active[349][this.player+1]}) Health`,0,this.height/2)
                                        }else{
                                            this.layer.text(`Silver: -2 Health`,0,this.height/2)
                                        }
                                    break
                                    case 2:
                                        if(this.battle.relicManager.hasRelic(349,this.player)){
                                            this.layer.text(`Foil: -5(${5+5*this.battle.relicManager.active[349][this.player+1]}) Block`,0,this.height/2)
                                        }else{
                                            this.layer.text(`Foil: -5 Block`,0,this.height/2)
                                        }
                                    break
                                    case 3:
                                        this.layer.text(`Holographic: -2 Temporary Strength`,0,this.height/2)
                                    break
                                    case 4:
                                        if(this.battle.relicManager.hasRelic(249,this.player)){
                                            this.layer.text('Polychrome (and Erratic)',0,this.height/2)
                                        }else if(variants.mtg){
                                            this.layer.text(`Polychrome: -1 Random Mana`,0,this.height/2)
                                        }else{
                                            this.layer.text(`Polychrome: -1 Energy`,0,this.height/2)
                                        }
                                    break
                                    case 5:
                                        this.layer.text(`Negative: Discard 2 Random Cards`,0,this.height/2)
                                    break
                                    case 6:
                                        if(this.battle.relicManager.hasRelic(249,this.player)){
                                            this.layer.text('Erratic (and Polychrome)',0,this.height/2)
                                        }else{
                                            this.layer.text(`Erratic: Randomly Decrease Effect 0-1x`,0,this.height/2)
                                        }
                                    break
                                    case 7:
                                        this.layer.text(`Braided: Draw a Card`,0,this.height/2)
                                    break
                                    case 8:
                                        this.layer.text(`Glitched: Discard a Random Card`,0,this.height/2)
                                    break
                                }
                            }else{
                                switch(this.edition){
                                    case 1:
                                        if(this.battle.relicManager.hasRelic(349,this.player)){
                                            this.layer.text(`Silver: 2(${2+2*this.battle.relicManager.active[349][this.player+1]}) Health`,0,this.height/2)
                                        }else{
                                            this.layer.text(`Silver: 2 Health`,0,this.height/2)
                                        }
                                    break
                                    case 2:
                                        if(this.battle.relicManager.hasRelic(349,this.player)){
                                            this.layer.text(`Foil: 5(${5+5*this.battle.relicManager.active[349][this.player+1]}) Block`,0,this.height/2)
                                        }else{
                                            this.layer.text(`Foil: 5 Block`,0,this.height/2)
                                        }
                                    break
                                    case 3:
                                        this.layer.text(`Holographic: 2 Temporary Strength`,0,this.height/2)
                                    break
                                    case 4:
                                        if(this.battle.relicManager.hasRelic(249,this.player)){
                                            this.layer.text('Polychrome (and Erratic)',0,this.height/2)
                                        }else if(variants.mtg){
                                            this.layer.text(`Polychrome: (E)`,0,this.height/2)
                                        }else{
                                            this.layer.text(`Polychrome: 1 Energy`,0,this.height/2)
                                        }
                                    break
                                    case 5:
                                        this.layer.text(`Negative: Draw 2 Cards`,0,this.height/2)
                                    break
                                    case 6:
                                        if(this.battle.relicManager.hasRelic(249,this.player)){
                                            this.layer.text('Erratic (and Polychrome)',0,this.height/2)
                                        }else{
                                            this.layer.text(`Erratic: Randomly Improve Effect 1-2x`,0,this.height/2)
                                        }
                                    break
                                    case 7:
                                        this.layer.text(`Braided: Discard a Random Card`,0,this.height/2)
                                    break
                                    case 8:
                                        this.layer.text(`Glitched: Random Exhausting Card`,0,this.height/2)
                                    break
                                }
                            }
                        }
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
            this.layer.scale(this.size*this.sizeCap)
            this.layer.noFill()
            this.layer.strokeWeight(3)
            let stack=0
            for(let a=0,la=anim.length;a<la;a++){
                if(anim[a]>0){
                    switch(a){
                        case 0: case 23: this.layer.stroke(255,0,0,this.fade*anim[a]); break
                        case 1: case 24: this.layer.stroke(100,255,255,this.fade*anim[a]); break
                        case 2: this.layer.stroke(255,225,0,this.fade*anim[a]); break
                        case 3: this.layer.stroke(255,100,255,this.fade*anim[a]); break
                        case 4: case 21: case 26: case 27: this.layer.stroke(255,200,200,this.fade*anim[a]); break
                        case 5: this.layer.stroke(0,150,255,this.fade*anim[a]); break
                        case 6: this.layer.stroke(200,225,255,this.fade*anim[a]); break
                        case 7: this.layer.stroke(255,255,150,this.fade*anim[a]); break
                        case 8: this.layer.stroke(200,225,50,this.fade*anim[a]); break
                        case 9: this.layer.stroke(255,125,0,this.fade*anim[a]); break
                        case 10: this.layer.stroke(255,0,50,this.fade*anim[a]); break
                        case 11: this.layer.stroke(0,150,0,this.fade*anim[a]); break
                        case 12: this.layer.stroke(100,255,200,this.fade*anim[a]); break
                        case 13: this.layer.stroke(255,150,0,this.fade*anim[a]); break
                        case 14: this.layer.stroke(200,255,100,this.fade*anim[a]); break
                        case 15: this.layer.stroke(200,255,200,this.fade*anim[a]); break
                        case 16: case 25: this.layer.stroke(255,125,50,this.fade*anim[a]); break
                        case 17: this.layer.stroke(200,0,50,this.fade*anim[a]); break
                        case 18: this.layer.stroke(120,135,150,this.fade*anim[a]); break
                        case 19: this.layer.stroke(150,135,120,this.fade*anim[a]); break
                        case 20: this.layer.stroke(175,0,50,this.fade*anim[a]); break
                        case 22: this.layer.stroke(240,this.fade*anim[a]); break
                    }
                    this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                    switch(a){
                        case 21: case 23: case 24:
                            this.layer.stroke(220,this.fade*anim[a])
                            this.layer.strokeWeight(1)
                            this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                        break
                        case 25: case 26:
                            this.layer.stroke(255,255,100,this.fade*anim[a])
                            this.layer.strokeWeight(1)
                            this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                        break
                        case 27:
                            this.layer.stroke(0,0,100,this.fade*anim[a])
                            this.layer.strokeWeight(1)
                            this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                        break
                    }
                    stack++
                }
            }
            this.layer.pop()
        }
    }
    editCost(cost,type,args){
        let effectiveCost=variants.mtg?copyArray(cost):cost
        if(this.player<0){
            return effectiveCost
        }
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        let costChange=0
        if(userCombatant.getStatus('Colorless Cost Up')>0&&this.colorless()){
            costChange+=userCombatant.getStatus('Colorless Cost Up')
        }
        if(userCombatant.getStatus('Colorless Cost Down')>0&&this.colorless()){
            costChange-=userCombatant.getStatus('Colorless Cost Down')
        }
        if(userCombatant.getStatus('Temporary All Cost Up')>0){
            costChange+=userCombatant.getStatus('Temporary All Cost Up')
        }
        if(userCombatant.getStatus('Temporary All Cost Down')>0){
            costChange-=userCombatant.getStatus('Temporary All Cost Down')
        }
        if(userCombatant.getStatus('Skill Cost Down')>0&&(type==2?args[0]:this.class)==11){
            costChange-=userCombatant.getStatus('Skill Cost Down')
        }
        if(userCombatant.getStatus('Combo Cost Down')>0&&spec.includes(11)){
            costChange-=userCombatant.getStatus('Combo Cost Down')
        }
        if(userCombatant.getStatus('All Cost Down')>0){
            costChange-=userCombatant.getStatus('All Cost Down')
        }
        if(userCombatant.getStatus('Defense Cost Down')>0&&(type==2?args[0]:this.class)==2){
            costChange-=userCombatant.getStatus('Defense Cost Down')
        }
        if(costChange!=0){
            if(variants.mtg){
                if(card.specialCost){
                    effectiveCost[0]=max(min(0,effectiveCost[0]),effectiveCost[0]+costChange)
                }else{
                    if(costChange<0){
                        for(let a=0,la=-costChange;a<la;a++){
                            if(effectiveCost.includes(-1)){
                                effectiveCost.splice(effectiveCost.indexOf(-1),1)
                            }
                        }
                    }else{
                        for(let a=0,la=costChange;a<la;a++){
                            effectiveCost.push(-1)
                        }
                    }
                }
            }else{
                effectiveCost=max(min(0,effectiveCost),effectiveCost+costChange)
            }
        }
        if(variants.mtg){
            if(userCombatant.getStatus('Colorless Neutral Convert')>0&&this.cost.includes(0)){
                for(let a=0,la=this.cost.length;a<la;a++){
                    if(this.cost[a]==0){
                        this.cost[a]=-1
                    }
                }
            }
        }
        if(type==1){
            if(
                userCombatant.getStatus('Free Defenses')>0&&(this.class==2||this.spec.includes(12)&&this.class[0]==2&&this.class[1]==2)||
                userCombatant.getStatus('Free Cables')>0&&this.name.includes('Cable')&&this.class==1
            ){
                effectiveCost=variants.mtg?[]:0
            }
        }
        return effectiveCost
    }
    colorless(){
        return this.color==0&&!this.colorful&&this.attack!=1328&&this.attack!=1330&&this.attack!=1393&&this.attack!=1615&&this.attack!=2064&&this.attack!=-131&&this.attack!=-132&&this.attack!=3454&&this.attack!=3459&&this.attack!=3460&&this.attack!=-1031&&this.attack!=-1032&&this.attack!=4225&&this.attack!=3629&&this.attack!=3630&&this.attack!=3631&&!(this.attack>=3694&&this.attack<=3699)&&this.attack!=3753&&this.attack!=3754&&this.attack!=4048&&this.list!=-8&&!(this.list==-9&&variants.ultraprism)
    }
    free(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        return userCombatant.getStatus('Free Card')>0||
            userCombatant.getStatus('Free 1 Cost Card')>0&&cost==1||
            userCombatant.getStatus('Free Attack')>0&&this.class==1||
            userCombatant.getStatus('Free Defense')>0&&this.class==2||
            userCombatant.getStatus('Free Movement')>0&&this.class==3||
            userCombatant.getStatus('Free Skill')>0&&this.class==11||
            userCombatant.getStatus('Temporary Free Non-Rare Colorless')>0&&this.colorless()&&this.rarity!=2||
            userCombatant.getStatus('Free Defenses')>0&&(this.class==2||this.spec.includes(12)&&this.class[0]==2&&this.class[1]==2)||
            userCombatant.getStatus('Free Cables')>0&&this.name.includes('Cable')&&this.class==1||
            this.spec.includes(55)||
            this.spec.includes(58)||
            this.spec.includes(60)
    }
    update(sizeCap=1,diff='nonhand',fattened=false){
        this.time++
        this.sizeCap=sizeCap
        if(this.select){
            this.upSize=true
        }
        if(this.player>=0&&this.player<this.battle.players){
            let cost=this.editCost(this.falsed.trigger?this.falsed.cost:this.cost,0)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            let energyPay=false
            if(!(variants.mtg&&!this.specialCost)){
                let effectiveEnergy=this.battle.getEnergy(this.player)*(this.spec.includes(35)&&userCombatant.getStatus('Double Countdowns')>0?2:1)
                energyPay=effectiveEnergy>=cost
            }else{
                energyPay=mtgAutoCost(this.battle.getSplitEnergy(this.player),cost,0,[],false)!=-1
            }

            this.energyAfford=(
                this.free()||
                energyPay&&!this.spec.includes(11)&&!this.spec.includes(21)&&!this.spec.includes(40)&&!this.spec.includes(59)||
                this.battle.combatantManager.combatants[this.player].combo>=cost&&this.spec.includes(11)||
                this.battle.combatantManager.combatants[this.player].metal>=cost&&this.spec.includes(21)||
                this.battle.combatantManager.combatants[this.player].getStatus('Twos')>=cost&&this.spec.includes(40)||
                this.battle.combatantManager.combatants[this.player].wish>=cost&&this.spec.includes(59)||
                variants.overheat
            )
            
            this.afford=this.energyAfford&&
            !(userCombatant.getStatus('Cannot Move')>0&&this.class==3)&&
            !(userCombatant.stance==3&&this.class==1&&this.attack!=824)&&
            !(this.spec.includes(6)&&!userCombatant.armed&&userCombatant.getStatus('Armament Bypass')<=0)&&
            !(this.spec.includes(25)&&userCombatant.ammo<=0&&this.target[0]!=46)
        }else{
            this.afford=false
            this.energyAfford=false
        }
        for(let a=0,la=game.animRate;a<la;a++){
            if(this.deSize&&this.size>0||this.downSize&&this.size>0.6||!this.upSize&&this.size>1){
                this.size=round(this.size*5-1)/5
            }else if(!this.deSize&&(!this.downSize&&this.size<1||this.size<0.6||this.upSize&&this.size<1.5)){
                this.size=min(round(this.size*5+1)/5,1.5)
            }
        }
        this.fade=smoothAnim(this.fade,!this.deFade,0,1,5)
        this.anim.select=smoothAnim(this.anim.select,this.select,0,1,5)
        this.anim.afford=smoothAnim(this.anim.afford,this.afford,0,1,5)
        this.anim.costDown=smoothAnim(this.anim.costDown,this.costDownTrigger,0,1,5)
        this.anim.costUp=smoothAnim(this.anim.costUp,this.costUpTrigger,0,1,5)
        this.width=90
        if(this.spec.includes(33)){
            this.width+=diff=='hand'?100:0
        }
        if(fattened){
            this.width+=diff=='hand'?50:0
        }
        if(this.spec.includes(34)){
            this.width=50
        }
        if(diff=='hand'){
            if(this.battle.modded(37)&&this.cost==0){
                this.cost=1
            }
            if(this.battle.modded(79)&&this.cost==1&&!(this.class==3||this.spec.includes(12)&&(this.class[0]==3||this.class[1]==3))){
                this.cost=2
                if(this.spec.includes(12)){
                    for(let a=0,la=this.effect.length;a<la;a++){
                        for(let b=0,lb=this.effect.length;b<lb;b++){
                            if(!(b==0&&this.class[a]==3)){
                                this.effect[a][b]*=2
                            }
                        }
                    }
                }else{
                    for(let a=0,la=this.effect.length;a<la;a++){
                        if(!(a==0&&this.class==3)){
                            this.effect[a]*=2
                        }
                    }
                }
            }
            if(this.battle.modded(87)&&!this.upped[0]&&this.color!=this.battle.player[this.player]){
                this.cost++
                this.upped[0]=true
            }
            if(this.battle.modded(117)&&!this.upped[1]){
                if(this.spec.includes(12)){
                    for(let a=0,la=this.effect.length;a<la;a++){
                        for(let b=0,lb=this.effect[a].length;b<lb;b++){
                            if(floor(random(0,20))==0){
                                this.effect[a][b]=0
                            }
                        }
                    }
                }else{
                    for(let a=0,la=this.effect.length;a<la;a++){
                        if(floor(random(0,20))==0){
                            this.effect[a]=0
                        }
                    }
                }
                this.upped[1]=true
            }
            if(this.battle.modded(122)&&!this.upped[2]){
                if(floor(random(0,20))==0){
                    this.spec.push(32)
                }
                this.upped[2]=true
            }
            if(this.battle.modded(138)&&!this.upped[3]){
                if(floor(random(0,4))==0){
                    this.spec.push(9)
                }
                this.upped[3]=true
            }
        }
    }
}