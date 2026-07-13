class card{
    constructor(
        layer,battle,player,x,y,
        type,level,color,id,cost,
        additionalSpec,name,list,effect,attack,
        target,spec,cardClass,limit,falsed,
        retain2=false,colorful=false,edition,baseCost,drawn,
        fuel,editedCost,editedCostComplete,nonCalc,costDownTrigger,
        costUpTrigger,baseCostDownTrigger,baseCostUpTrigger,debut,evolve
    ){
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
                breakcards
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
        this.deSizeDropDraw=false
        this.deFade=false
        this.downSize=false
        this.upSize=false
        this.usable=true
        this.exhaust=false
        this.purge=false
        this.vanish=false
        this.drawMark=false
        this.retain=false
        this.retain2=retain2
        this.select=false
        this.afford=false
        this.energyAfford=false
        this.cancelDesc=false
        this.originated=false
        this.swapped=false
        this.blind=false
        this.discardEffect=[]
        this.discardEffectBuffered=[]
        this.upped=[false,false,false,false]
        this.relIndex=0
        this.characteristic=0
        this.time=0

        this.anim={select:0,afford:0,costDown:0,costUp:0}
        
        try{
            this.name=name||types.card[this.type].name
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
                    this.spec=this.spec==undefined?copyArray(types.card[this.type].mtg.levels[0].spec.concat(this.additionalSpec.filter(item=>item>=0))):copyArray(this.spec)
                    this.effect=effect
                    this.effect=this.effect==undefined?[types.card[this.type].mtg.levels[0].effect[0]+types.card[this.type].mtg.levels[0].effect[1]*this.level,types.card[this.type].mtg.levels[0].effect[1]]:copyArray(this.effect)
                    this.attack=attack||types.card[this.type].mtg.levels[0].attack
                    this.target=target
                    this.target=this.target==undefined?copyArray(types.card[this.type].mtg.levels[0].target):copyArray(this.target)
                    this.class=cardClass||types.card[this.type].mtg.levels[0].class
                }else{
                    this.spec=this.spec==undefined?copyArray(types.card[this.type].mtg.levels[this.level].spec.concat(this.additionalSpec.filter(item=>item>=0))):copyArray(this.spec)
                    this.effect=effect
                    this.effect=this.effect==undefined?(this.spec.includes(12)?copyArrayStack(types.card[this.type].mtg.levels[this.level].effect):copyArray(types.card[this.type].mtg.levels[this.level].effect)):(this.spec.includes(12)?copyArrayStack(this.effect):copyArray(this.effect))
                    this.attack=attack||types.card[this.type].mtg.levels[this.level].attack
                    this.target=target
                    this.target=this.target==undefined?copyArray(types.card[this.type].mtg.levels[this.level].target):copyArray(this.target)
                    this.class=cardClass||types.card[this.type].mtg.levels[this.level].class
                }
                this.specialCost=this.spec.includes(11)||this.spec.includes(21)||this.spec.includes(40)||this.spec.includes(55)||this.spec.includes(58)||this.spec.includes(59)||this.spec.includes(67)
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
                    this.spec=this.spec==undefined?copyArray(types.card[this.type].levels[0].spec.concat(this.additionalSpec.filter(item=>item>=0))):copyArray(this.spec)
                    this.effect=effect
                    this.effect=this.effect==undefined?[types.card[this.type].levels[0].effect[0]+types.card[this.type].levels[0].effect[1]*this.level,types.card[this.type].levels[0].effect[1]]:copyArray(this.effect)
                    this.attack=attack||types.card[this.type].levels[0].attack
                    this.target=target
                    this.target=this.target==undefined?copyArray(types.card[this.type].levels[0].target):copyArray(this.target)
                    this.class=cardClass||types.card[this.type].levels[0].class
                }else{
                    this.spec=this.spec==undefined?copyArray(types.card[this.type].levels[this.level].spec.concat(this.additionalSpec.filter(item=>item>=0))):copyArray(this.spec)
                    this.effect=effect
                    this.effect=this.effect==undefined?(this.spec.includes(12)?copyArrayStack(types.card[this.type].levels[this.level].effect):copyArray(types.card[this.type].levels[this.level].effect)):(this.spec.includes(12)?copyArrayStack(this.effect):copyArray(this.effect))
                    this.attack=attack||types.card[this.type].levels[this.level].attack
                    this.target=target
                    this.target=this.target==undefined?copyArray(types.card[this.type].levels[this.level].target):copyArray(this.target)
                    this.class=cardClass||types.card[this.type].levels[this.level].class
                }
                this.specialCost=this.spec.includes(5)||this.spec.includes(11)||this.spec.includes(35)||this.spec.includes(40)||this.spec.includes(41)||this.spec.includes(55)||this.spec.includes(58)||this.spec.includes(59)||this.spec.includes(67)
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
            this.fuel=fuel
            this.fuel=this.fuel==undefined?0:this.fuel
            this.debut=debut
            this.debut=this.debut==undefined?true:this.debut
            this.evolve=evolve
            this.evolve=this.evolve==undefined?0:this.evolve
            this.nonCalc=nonCalc
            this.nonCalc=this.nonCalc==undefined?false:this.nonCalc
            this.costDownTrigger=costDownTrigger
            this.costDownTrigger=this.costDownTrigger==undefined?false:this.costDownTrigger
            this.costUpTrigger=costUpTrigger
            this.costUpTrigger=this.costUpTrigger==undefined?false:this.costUpTrigger
            this.baseCostDownTrigger=baseCostDownTrigger
            this.baseCostDownTrigger=this.baseCostDownTrigger==undefined?false:this.baseCostDownTrigger
            this.baseCostUpTrigger=baseCostUpTrigger
            this.baseCostUpTrigger=this.baseCostUpTrigger==undefined?false:this.baseCostUpTrigger
            if(!variants.mtg&&this.list==-1){
                this.list=this.color
            }
            this.base={cost:baseCost}
            if(this.base.cost==undefined){
                if(variants.mtg&&types.card[this.type].mtg!=undefined){
                    if(this.specialCost){
                        this.base.cost=copyArray(types.card[this.type].mtg.levels[constrain(this.level,0,types.card[this.type].mtg.levels.length-1)].cost)
                    }else{
                        this.base.cost=sortNumbers(copyArray(types.card[this.type].mtg.levels[constrain(this.level,0,types.card[this.type].mtg.levels.length-1)].cost))
                    }
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
                if(this.edited.cost<=-100){
                    this.setCost(2,[-this.edited.cost-100])
                }else if(this.edited.cost>0){
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
                    if(above.length>=4){
                        this.color=[above[this.id%above.length]]
                        resolve=above[this.id%above.length]
                    }else{
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
            if(this.additionalSpec.includes(-4)){
                if(this.spec.includes(5)){
                    this.spec.splice(this.spec.indexOf(5),1)
                }
            }
            if(doubles>0){
                for(let a=0,la=doubles;a<la;a++){
                    this.doubleBoth()
                }
            }
        }catch(error){
            console.log('!!!',this.type,error)
            this.remove=true
            this.spec=[]
        }
        this.setColorDetail()
    }
    save(){
        let composite={
            player:this.player,
            position:this.position,
            type:this.type,
            level:this.level,
            color:this.color,
            id:this.id,
            cost:this.cost,
            additionalSpec:this.additionalSpec,
            name:this.name,
            list:this.list,
            effect:this.effect,
            attack:this.attack,
            target:this.target,
            spec:this.spec,
            cardClass:this.cardClass,
            limit:this.limit,
            colorful:this.colorful,
            edition:this.edition,
            base:{
                cost:this.base.cost,
            },
            drawn:this.drawn,
            fuel:this.fuel,
            edited:{
                cost:this.edited.cost,
                costComplete:this.edited.costComplete,
            },
            nonCalc:this.nonCalc,
            costDownTrigger:this.costDownTrigger,
            costUpTrigger:this.costUpTrigger,
            baseCostDownTrigger:this.baseCostDownTrigger,
            baseCostUpTrigger:this.baseCostUpTrigger,
            debut:this.debut,
            evolve:this.evolve,
        }
        return composite
    }
    setColorDetail(){
        if(this.attack==1754){
            this.colorDetail=stage.scene=='battle'?types.color.card[7-this.battle.turn.total%2*5]:types.color.card[0]
            if(variants.mtg){
                for(let a=0,la=this.cost.length;a<la;a++){
                    this.cost[a]=5-this.battle.turn.total%2
                }
            }
        }else if(variants.mtg){
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
    getCost(type){
        let totalVariable=0
        let totalNeutral=0
        switch(type){
            case 0:
                if(variants.mtg&&!this.specialCost){
                    for(let a=0,la=this.cost.length;a<la;a++){
                        if(this.cost[a]==-3){
                            totalVariable++
                        }
                    }
                }
                return variants.mtg?(this.specialCost?this.cost[0]:this.cost.length-totalVariable):this.cost
            case 1:
                if(variants.mtg&&!this.specialCost){
                    for(let a=0,la=this.cost.length;a<la;a++){
                        if(this.cost[a]==-1){
                            totalNeutral++
                        }
                    }
                }
                return variants.mtg?(this.specialCost?this.cost[0]:totalNeutral):this.cost
            case 2:
                if(variants.mtg&&!this.specialCost){
                    for(let a=0,la=this.base.cost.length;a<la;a++){
                        if(this.base.cost[a]==-3){
                            totalVariable++
                        }
                    }
                }
                return variants.mtg?(this.specialCost?this.base.cost[0]:this.base.cost.length-totalVariable):this.base.cost
            case 3:
                if(variants.mtg&&!this.specialCost){
                    for(let a=0,la=this.base.cost.length;a<la;a++){
                        if(this.base.cost[a]==-1){
                            totalNeutral++
                        }
                    }
                }
                return variants.mtg?(this.specialCost?this.base.cost[0]:totalNeutral):this.base.cost
            case 4:
                return variants.mtg?this.cost.includes(-3):this.cost==-1
        }
    }
    setCost(type,args){
        let remain=[]
        let preCost=variants.mtg?copyArray(this.cost):this.cost
        let preBaseCost=variants.mtg?copyArray(this.base.cost):this.base.cost
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
            case 3:
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
                this.edited.cost=-args[0]-100
                this.edited.costComplete=true
            break
        }
        this.costDownTrigger=false
        this.costUpTrigger=false
        this.baseCostDownTrigger=false
        this.baseCostUpTrigger=false
        if(variants.mtg?(this.specialCost?this.cost[0]<preCost[0]:this.cost.length<preCost.length):this.cost<preCost){
            this.costDownTrigger=true
            if(this.spec.includes(35)){
                this.onIncrementCountdown()
            }
        }else if(variants.mtg?(this.specialCost?this.cost[0]>preCost[0]:this.cost.length>preCost.length):this.cost>preCost){
            this.costUpTrigger=true
        }
        if(variants.mtg?(this.specialCost?this.base.cost[0]<preBaseCost[0]:this.base.cost.length<preBaseCost.length):this.base.cost<preBaseCost){
            this.baseCostDownTrigger=true
            if(this.spec.includes(35)){
                this.onIncrementCountdown()
            }
        }else if(variants.mtg?(this.specialCost?this.base.cost[0]>preBaseCost[0]:this.base.cost.length>preBaseCost.length):this.base.cost>preBaseCost){
            this.baseCostUpTrigger=true
        }
    }
    costUp(type,args){
        if(this.attack!=5760){
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
                    this.costUpTrigger=true
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
                    this.baseCostUpTrigger=true
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
                    this.costUpTrigger=true
                    this.baseCostUpTrigger=true
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
                    this.costUpTrigger=true
                    this.baseCostUpTrigger=true
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
                    this.costUpTrigger=true
                    this.baseCostUpTrigger=true
                break
            }
        }
    }
    costDown(type,args){
        if(this.spec.includes(35)){
            this.onIncrementCountdown()
        }
        if(args[0]>0){
            switch(this.attack){
                case 7288:
                    this.battle.combatantManager.randomEnemyEffect(3,[this.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
                break
                case 7289:
                    this.battle.cardManagers[this.player].draw(this.effect[1])
                break
            }
        }
        if(this.attack!=5760){
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
                                }else if(this.spec.includes(35)){
                                    this.cost.splice(floor(random(0,this.cost.length)),1)
                                }
                            }
                        }
                    }else if(this.cost>0){
                        this.cost=max(0,this.cost-args[0])
                    }
                    this.costDownTrigger=true
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
                    this.baseCostDownTrigger=true
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
                    this.costDownTrigger=true
                    this.baseCostDownTrigger=true
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
                    this.costDownTrigger=true
                    this.baseCostDownTrigger=true
                break
                case 4:
                    if(variants.mtg){
                        if(this.specialCost){
                            this.cost[0]=round(this.cost[0]/2)
                        }else{
                            let last=-99
                            for(let a=0,la=this.cost.length;a<la;a++){
                                if(this.cost[a]==last){
                                    this.cost.splice(a,1)
                                    a--
                                    la--
                                    last=-99
                                }else{
                                    last=this.cost[a]
                                }
                            }
                        }
                    }else if(this.cost>0){
                        this.cost=round(this.cost/2)
                    }
                    this.costDownTrigger=true
                    this.baseCostDownTrigger=true
                break
                case 5:
                    if(variants.mtg){
                        if(this.specialCost){
                            this.cost[0]=floor(this.cost[0]/2)
                        }else{
                            let last=-99
                            for(let a=0,la=this.cost.length;a<la;a++){
                                if(this.cost[a]!=last){
                                    last=this.cost[a]
                                    this.cost.splice(a,1)
                                    a--
                                    la--
                                }else{
                                    last=-99
                                }
                            }
                        }
                    }else if(this.cost>0){
                        this.cost=floor(this.cost/2)
                    }
                    this.costDownTrigger=true
                    this.baseCostDownTrigger=true
                break
            }
        }
    }
    costVariant(type){
        switch(type){
            case 0:
                for(let a=0,la=this.cost.length;a<la;a++){
                    if(this.cost[a]>=0){
                        this.cost.splice(a,1)
                        this.cost.push(-1)
                        a--
                        la--
                    }
                }
            break
        }
    }
    updateSpecialCost(){
        this.specialCost=this.spec.includes(11)||this.spec.includes(21)||this.spec.includes(35)||this.spec.includes(40)||this.spec.includes(55)||this.spec.includes(58)||this.spec.includes(59)||this.spec.includes(67)
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
            return calculateEffect(effect,user,type,this.player,this.battle.relicManager,true,[this.getBasic(-1),this.spec.includes(70),this.spec.includes(25),this.spec.includes(54),this.getBasic(1),this.getBasic(2),this.spec.includes(52),this.name.includes('Cable')&&this.class==1,this.rarity==0&&this.class==1,this.spec.includes(20),this.spec.includes(82)])
        }else{
            this.cancelDesc=false
            return calculateEffect(effect,this.battle.proxyPlayer,type,-1,new disabledRelicManager(),-1,[false,false,false,false,false,false,false,false,false,false])
        }
    }
    calculateEffectAlly(effect,type){
        if(stage.scene=='battle'&&!this.nonCalc&&!this.cancelDesc){
            let user=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.players-1-this.player)]
            this.cancelDesc=false
            return calculateEffect(effect,user,type,this.player,this.battle.relicManager,true,[this.getBasic(-1),this.spec.includes(70),this.spec.includes(25),this.spec.includes(54),this.getBasic(1),this.getBasic(2),this.spec.includes(52),this.name.includes('Cable')&&this.class==1,this.rarity==0&&this.class==1,this.spec.includes(20),this.spec.includes(82)])
        }else{
            this.cancelDesc=false
            return calculateEffect(effect,this.battle.proxyPlayer,type,-1,new disabledRelicManager(),-1,[false,false,false,false,false,false,false,false,false,false])
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
    callDiscardEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.spec.includes(23)){
            this.battle.cardManagers[this.player].draw(1)
        }
        if(this.spec.includes(70)&&userCombatant.getStatus('Shiv Scatter')>0){
            this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Shiv Scatter'),userCombatant.id])
            this.exhaust=true
        }
        if(this.spec.includes(79)){
            this.discardEffect.push(18)
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
                this.battle.drop(this.player,findName('Refracted\nSunlight',types.card),0,constants.playerNumber+1)
            break
            case -81:
                this.battle.drop(this.player,findName('Quiet\nMoonlight',types.card),0,constants.playerNumber+1)
            break
            case -82:
                this.battle.drop(this.player,findName('Glamorous\nStarlight',types.card),0,constants.playerNumber+1)
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
                userCombatant.charge=max(0,userCombatant.charge-this.effect[0])
            break
            case -95:
                this.battle.turnManager.loadSpecificAttack(userCombatant.id,393,[userCombatant.id,this.effect[0],-1,2])
            break
            case -98:
                userCombatant.takeDamage(this.effect[0],-1)
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                }
            break
            case -96:
                userCombatant.statusEffect(variants.mtg?'Random Mana Next Turn':'Energy Next Turn',-this.effect[0])
            break
            case -106:
                userCombatant.multiplyStatusClass(2,[1,3])
            break
            case -109:
                userCombatant.takeDamage(this.effect[0]*floor(this.battle.currency.money[this.player]/max(1,this.effect[1])),-1)
            break
            case -115:
                if(userCombatant.block==0){
                    userCombatant.takeDamage(this.effect[0],-1)
                }
            break
            case -127:
                this.battle.cardManagers[this.player].swap(1,3)
            break
            case -131:
                userCombatant.takeDamage(this.effect[0],-1)
                userCombatant.statusEffectNext('Claw Up',this.effect[1])
            break
            case -132:
                this.battle.combatantManager.allEffect(7,[this.effect[0]])
            break
            case -133:
                userCombatant.statusEffectNext(['Weak','Vulnerable','Frail'][floor(random(0,3))],this.effect[0])
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
            case 3717: case 4931:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 4558:
                userCombatant.statusEffect('(N) Next Turn',1)
            break
            case 5194:
                userCombatant.addBlock(this.effect[2])
            break
            case 5322:
                if(this.battle.cardManagers[this.player].hand.turnPlayed[1]==0){
                    this.costDown(0,[1])
                }
            break
            case 5324:
                if(userCombatant.block>=this.effect[0]){
                    this.costDown(0,[1])
                }
            break
            case 5855:
                userCombatant.statusEffect('Vigor',this.effect[1])
            break
            case 6647:
                userCombatant.statusEffect('Single Damage Down',this.effect[1])
            break
            case 7728:
                this.battle.cardManagers[this.player].drawAbstract(this.effect[1],-1,5,[])
            break
            case 7738:
                userCombatant.statusEffect('Strength',this.effect[1])
            break
            case 7760: case 7761: case 8348: case 8349:
                userCombatant.addBarrier(this.effect[1])
            break
            case 7813:
                userCombatant.addBounce(this.effect[1])
            break
            case 7978:
                userCombatant.statusEffect('Vigil',this.effect[1])
            break
            case 8262:
                userCombatant.statusEffectNext('Vulnerable',this.effect[2])
            break
        }
    }
    callScryEffect(){
        switch(this.attack){
            case 3207:
                this.costDown(0,[1])
            break
        }
    }
    callScryDiscardEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.getStatus('Scry Discard Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('Scry Discard Block'))
        }
        switch(this.attack){
            case 2913: case 2998:
                this.effect[0]+=this.effect[1]
            break
            case 2953: case 2954: case 2955: case 8388:
                this.setCost(0,[0])
                this.additionalSpec.push(-2)
            break
            case 5005:
                this.battle.combatantManager.areaAbstract(0,[this.effect[1],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 5178:
                this.battle.cardManagers[this.player].draw(this.effect[0])
            break
            case 6268:
                this.battle.combatantManager.highestEffect(0,[this.effect[1],userCombatant.id])
            break
            case 6270:
                userCombatant.addBlock(this.effect[0])
                userCombatant.addBarrier(this.effect[1])
            break
            case 6370:
                this.effect[0]+=this.effect[1]
            break
            case 6510:
                userCombatant.addBarrier(this.effect[1])
            break
            case 7773:
                return this.effect[1]
            case 8348: case 8349:
                userCombatant.addBarrier(this.effect[1])
            break
        }
        return 0
    }
    callStanceChangeEffect(){
        switch(this.attack){
            case 5052: case 5053: case 5125:
                this.setCost(0,[0])
            break
            case 5077: case 5078:
                this.effect[0]+=this.effect[1]
            break
            case 6674:
                this.costDown(0,[1])
            break
        }
    }
    callStatusEffect(statusClass){
        switch(this.attack){
            case 8399:
                if(statusClass==1||statusClass==3){
                    this.effect[0]+=this.effect[1]
                }
            break
        }
    }
    callSpecUpgradeEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case 3828:
                return 1
            case 8553:
                this.battle.combatantManager.areaAbstract(11,[this.effect[0],this.effect[1],this.player,0,userCombatant],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                return 2
        }
        return 0
    }
    callSpecDiscardEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if((this.spec.includes(5)||this.spec.includes(41))&&userCombatant.getStatus('Unplayable Discard Damage Random')>0){
            this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Unplayable Discard Damage Random'),userCombatant.id])
        }
        if(this.class==11&&userCombatant.getStatus('Skill Discard Draw')>0){
            this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Skill Discard Draw'))
        }
        switch(this.attack){
            case -48:
                userCombatant.statusEffect('Double Damage',this.effect[1])
            break
            case -102:
                this.battle.cardManagers[this.player].hand.add(this.type,this.level,this.color,this.edition)
            break
            case -130:
                this.exhaust=true
            break
            case 257: case 6324: case 6886:
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
                this.exhaust=true
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
            case 2224: case 8018:
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
            case 2313: case 4393:
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
                this.discardEffect.push(16)
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
            case 4355:
                this.battle.addSpecificEnergy(1,this.player,6)
                this.battle.addSpecificEnergy(1,this.player,2)
            break
            case 4356:
                this.battle.addSpecificEnergy(2,this.player,6)
                this.battle.addSpecificEnergy(1,this.player,2)
            break
            case 4357:
                this.battle.addSpecificEnergy(2,this.player,6)
                this.battle.addSpecificEnergy(2,this.player,2)
            break
            case 4421:
                userCombatant.statusEffect('(W) Next Turn',1)
                userCombatant.statusEffect('(G) Next Turn',1)
            break
            case 4422:
                userCombatant.statusEffect('(E) Next Turn',1)
                userCombatant.statusEffect('(W) Next Turn',1)
                userCombatant.statusEffect('(G) Next Turn',1)
            break
            case 4423:
                userCombatant.statusEffect('(E) Next Turn',3)
            break
            case 4515:
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Occult',types.card),0,0)
                }
            break
            case 4680:
                userCombatant.statusEffect('(W) Next Turn',1)
                userCombatant.statusEffect('(G) Next Turn',1)
                userCombatant.statusEffect('(N) Next Turn',1)
            break
            case 4681:
                userCombatant.statusEffect('(E) Next Turn',2)
                userCombatant.statusEffect('(W) Next Turn',1)
                userCombatant.statusEffect('(G) Next Turn',1)
            break
            case 4682:
                userCombatant.statusEffect('(E) Next Turn',4)
            break
            case 4683:
                this.battle.cardManagers[this.player].drawAbstract(this.effect[2],0,0,[3])
            break
            case 4924:
                this.battle.combatantManager.allEffect(43,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
                this.battle.combatantManager.allEffect(48,['Vulnerable',this.effect[1]])
            break
            case 4930:
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Throwing\nKnife',types.card),0,0)
                }
            break
            case 4931:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 5107:
                this.battle.itemManager.addRandomItem(this.player)
                this.exhaust=true
            break
            case 5752:
                this.effect[1]+=this.effect[3]
            break
            case 5825:
                userCombatant.heal(this.effect[0])
                this.battle.cardManagers[this.player].draw(this.effect[1])
                this.exhaust=true
            break
            case 5833:
                userCombatant.addBlock(this.effect[2])
            break
            case 6080:
                this.battle.addCurrency(this.effect[1],this.player)
                this.exhaust=true
            break
            case 6382:
                this.battle.overlayManager.overlays[19][this.player].active=true
                this.battle.overlayManager.overlays[19][this.player].activate()
                this.exhaust=true
            break
            case 6865:
                this.setCost(2,[0])
            break
            case 7131:
                this.battle.cardManagers[this.player].draw(this.effect[1])
            break
            case 7397:
                this.battle.addSpecificEnergy(this.effect[2],this.player,6)
            break
            case 7398:
                this.battle.addSpecificEnergy(1,this.player,1)
            break
            case 7908:
                userCombatant.addBlock(this.effect[0])
                this.battle.cardManagers[this.player].hand.upgrade(this.effect[1])
            break
            case 8348: case 8349:
                userCombatant.addBarrier(this.effect[1])
            break
            case 8547:
                this.battle.combatantManager.areaAbstract(11,[this.effect[0],this.effect[1],this.player,0,userCombatant],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 8580:
                userCombatant.statusEffect('Temporary Strength',this.effect[0])
                this.exhaust=true
            break
        }
    }
    callAnotherDrawEffect(number){
        switch(this.attack){
            case 2775: case 3742: case 3743:
                this.setCost(0,[0])
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
            case 5321:
                this.costDown(0,[1])
            break
            case 6454:
                if(!this.deSize){
                    this.battle.addEnergy(this.effect[0],this.player)
                    this.deSize=true
                }
            break
            case 6455:
                if(!this.deSize){
                    this.battle.addSpecificEnergy(1,this.player,4)
                    this.deSize=true
                }
            break
            case 6456:
                if(!this.deSize){
                    this.battle.addSpecificEnergy(1,this.player,6)
                    this.deSize=true
                }
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
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case 3042: case 3815:
                this.setCost(0,[0])
            break
            case 6068:
                userCombatant.statusEffect('Strength',this.effect[1])
            break
            case 7273:
                this.battle.combatantManager.areaAbstract(2,['Vulnerable',this.effect[1]],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
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
            case 7940:
                this.effect[0]+=this.effect[1]
            break
            case 8252:
                this.effect[0]=max(0,this.effect[0]-this.effect[1])
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
    callLowRollEffect(){
        switch(this.attack){
            case 7906:
                this.setCost(0,[0])
            break
        }
    }
    callRewindEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -102:
                this.battle.cardManagers[this.player].hand.add(this.type,this.level,this.color,this.edition)
            break
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
            case 2692: case 4928:
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
            case 4595:
                this.battle.addSpecificEnergy(1,this.player,2)
                this.battle.addSpecificEnergy(1,this.player,4)
                this.battle.cardManagers[this.player].draw(this.effect[0])
                return true
            case 5225:
                userCombatant.statusEffect('History',this.effect[2])
            break
            case 5872:
                userCombatant.statusEffect('Knowledge',this.effect[2])
                userCombatant.statusEffect('Wisdom',this.effect[3])
            break
            case 6798:
                this.battle.cardManagers[this.player].draw(this.effect[0])
            break
            case 7514:
                this.battle.cardManagers[this.player].draw(this.effect[2])
            break
            case 7798:
                userCombatant.addBlock(this.effect[0])
                this.discardEffect.push(19)
            break
            case 7800:
                this.setCost(0,[0])
            break
        }
        if(userCombatant.getStatus('Rewind Cost Down')>0&&this.getCost(0)>0){
            this.costDown(0,[userCombatant.getStatus('Rewind Cost Down')])
        }
        return false
    }
    callExhaustEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.battle.modded(159)){
            userCombatant.loseHealth(2)
        }
        switch(this.attack){
            case -90:
                if(userCombatant.getStatus('Wisp Exhaust Charge')>0){
                    userCombatant.charge+=userCombatant.getStatus('Wisp Exhaust Charge')
                }
            break
            case -102:
                this.battle.cardManagers[this.player].hand.add(this.type,this.level,this.color,this.edition)
            break
            case 202: case 1710:
                userCombatant.combo+=this.effect[1]
            break
            case 303: case 5810:
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
            case 3300: case 3301: case 4933:
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
            case 4290: case 4656:
                this.battle.overlayManager.overlays[86][this.player].active=true
                this.battle.overlayManager.overlays[86][this.player].activate()
            break
            case 4291:
                this.battle.overlayManager.overlays[86][this.player].active=true
                this.battle.overlayManager.overlays[86][this.player].activate()
                userCombatant.addBlock(this.effect[1])
            break
            case 4525:
                this.battle.addSpecificEnergy(1,this.player,6)
            break
            case 4527: 
                this.battle.addSpecificEnergy(2,this.player,6)
            break
            case 4655:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 4657:
                this.battle.overlayManager.overlays[86][this.player].active=true
                this.battle.overlayManager.overlays[86][this.player].activate()
                userCombatant.addBlock(this.effect[0])
            break
            case 4738:
                this.battle.addSpecificEnergy(1,this.player,6)
                this.battle.addSpecificEnergy(1,this.player,2)
            break
            case 4739:
                this.battle.addSpecificEnergy(2,this.player,6)
                this.battle.addSpecificEnergy(1,this.player,2)
            break
            case 4740:
                this.battle.addSpecificEnergy(2,this.player,6)
                this.battle.addSpecificEnergy(2,this.player,2)
            break
            case 5811: case 5812: case 5183:
                this.battle.addSpecificEnergy(this.type-5808,this.player,6)
            break
            case 6020:
                this.battle.combatantManager.allEffect(48,['Lock On',this.effect[2]])
            break
            case 6407:
                userCombatant.addBlock(this.effect[0])
                userCombatant.statusEffect('Block Next Turn',this.effect[1])
            break
            case 6479:
                userCombatant.addBounce(this.effect[0])
            break
            case 6550:
                this.battle.combatantManager.lowestEffect(0,[this.effect[0],userCombatant.id])
            break
            case 6563:
                this.battle.cardManagers[this.player].hand.duplicateSelect(this.effect[0])
            break
            case 6705:
                userCombatant.addBlock(this.effect[0])
            break
            case 6886:
                this.battle.cardManagers[this.player].draw(this.effect[0])
            break
            case 6947:
                this.battle.cardManagers[this.player].hand.addAbstract(findName('White\nFlame',types.card),this.level,this.color,this.edition,[6],[0,this.effect[0]+this.effect[1]])
            break
            case 6959:
                userCombatant.statusEffect('Energy Next Turn',this.effect[1])
            break
            case 6960:
                userCombatant.statusEffect('(G) Next Turn',1)
            break
            case 6961:
                userCombatant.statusEffect('(G) Next Turn',2)
            break
            case 6962:
                userCombatant.statusEffect('(E) Next Turn',2)
            break
            case 6967:
                userCombatant.prime(this.effect[1])
            break
            case 7021:
                this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
                this.battle.cardManagers[this.player].draw(this.effect[1])
            break
            case 7109:
                userCombatant.addBounce(this.effect[0])
                userCombatant.statusEffect('Bounce Next Turn',this.effect[0])
            break
            case 7956:
                userCombatant.statusEffect('Control',this.effect[1])
            break
            case 7967:
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.itemManager.addItem(findInternal(variants.mtg?'9 Random Damage, 1 Mana, Draw 1':'9 Random Damage, 1 Energy, Draw 1',types.item),this.player)
                }
            break

        }
    }
    callAnotherExhaustEffect(card){
        switch(this.attack){
            case 5533:
                this.costDown(0,[1])
            break
            case 6401: case 6531:
                if(card.class==5||card.class==6){
                    this.costDown(0,[1])
                }
            break
            case 8328:
                if(card.class==5&&!card.name.includes('Fatigue')){
                    this.costDown(0,[1])
                }
            break
            case 8483:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    callVanishEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -102:
                this.battle.cardManagers[this.player].hand.add(this.type,this.level,this.color,this.edition)
            break
            case 1238:
                this.battle.cardManagers[this.player].deck.add(findName('Plague',types.card),0,constants.playerNumber+2)
            break
            case 1477:
                this.battle.cardManagers[this.player].deck.add(findName('Skellic\nSlash',types.card),0,0)
            break
            case 1486:
                this.battle.cardManagers[this.player].deck.add(findName('Backfire',types.card),0,constants.playerNumber+2)
            break
            case 1487:
                this.battle.cardManagers[this.player].deck.add(findName('Bear\nMaul',types.card),0,0)
            break
            case 1488:
                this.battle.cardManagers[this.player].deck.add(findName('Bozo',types.card),0,constants.playerNumber+2)
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
            case 3606: case 3607: case 3608: case 3609: case 3610: case 3611: case 3612: case 4205: case 5146: case 5418:
            case 5537: case 5976: case 6103: case 6306: case 6403: case 7246: case 7247: case 7248: case 7275: case 8432:
            case 8433: case 8803:
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([this.level,2,0])
            break
            case 6862:
                this.battle.cardManagers[this.player].deck.add(findName('Card\nSleeve',types.card),0,0)
                this.battle.cardManagers[this.player].deck.add(findName('Worthless\nBaseball Card',types.card),0,0)
            break
            case 7089:
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([0,1,12])
            break
            case 7553:
                this.battle.overlayManager.overlays[14][this.player].active=true
                this.battle.overlayManager.overlays[14][this.player].activate()
            break
            case 7920:
                userCombatant.gainMaxHP(this.effect[0])
            break
        }
    }
    callPullEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case 5447: case 5448:
                if(userCombatant.getStatus('Dark Matter Pull Fuel All')>0){
                    this.battle.cardManagers[this.player].allEffectArgs(2,50,[userCombatant.getStatus('Dark Matter Pull Fuel All')])
                }
                if(userCombatant.getStatus('Dark Matter Pull Radiation')>0){
                    userCombatant.statusEffect('Radiation',userCombatant.getStatus('Dark Matter Pull Radiation'))
                }
            break
            case 5449:
                userCombatant.addBlock(this.effect[1])
            break
            case 5466:
                userCombatant.addBlock(this.effect[0])
            break
            case 5467:
                this.battle.combatantManager.areaAbstract(0,[this.effect[1],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 5468:
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.drop(this.player,findName('Dark\nMatter',types.card),0,0)
                }
            break
            case 5469:
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].randomEffect(2,0,[])
                }
            break
            case 5472:
                userCombatant.statusEffect('Counter All',this.effect[2])
            break
            case 5473:
                if(this.battle.cardManagers[this.player].midDraw){
                    this.battle.cardManagers[this.player].reserve.drawEffects.push([5,this.effect[1]])
                }else{
                    this.battle.cardManagers[this.player].draw(this.effect[1])
                }
            break
            case 5474: case 5475: case 5476:
                if(this.battle.cardManagers[this.player].midDraw){
                    this.battle.cardManagers[this.player].reserve.drawEffects.push([5,this.effect[0]])
                }else{
                    this.battle.cardManagers[this.player].draw(this.effect[0])
                }
            break
            case 5502: case 5657: case 6267:
                this.battle.cardManagers[this.player].hand.add(this.type,this.level,this.color,this.edition)
            break
            case 5537:
                this.battle.cardManagers[this.player].hand.add(findName('Dark\nMatter',types.card),0,0)
            break
            case 5548:
                this.battle.combatantManager.areaAbstract(2,['Vulnerable',this.effect[1]],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 5564:
                this.battle.cardManagers[this.player].hand.add(findName('Stride',types.card),0,0)
            break
            case 5610:
                userCombatant.statusEffect('Buffer',this.effect[1])
            break
            case 5611:
                userCombatant.statusEffect('Buffer',this.effect[2])
            break
            case 5622:
                if(this.battle.cardManagers[this.player].midDraw){
                    this.battle.cardManagers[this.player].reserve.drawEffects.push([5,this.effect[1]])
                }else{
                    this.battle.cardManagers[this.player].draw(this.effect[1])
                }
                this.battle.cardManagers[this.player].hand.transform(this.effect[2])
            break
            case 5623:
                this.battle.addEnergy(this.effect[2],this.player)
            break
            case 5624:
                this.battle.addSepecificEnergy(1,this.player,2)
                this.battle.addSepecificEnergy(1,this.player,4)
            break
            case 5628:
                userCombatant.statusEffect('Temporary Strength',this.effect[1])
            break
            case 5629:
                this.battle.overlayManager.overlays[8][this.player].active=true
                this.battle.overlayManager.overlays[8][this.player].activate()
            break
            case 5630:
                userCombatant.statusEffect('Strength',this.effect[1])
            break
            case 5661:
                this.battle.cardManagers[this.player].allEffect(2,2)
                if(this.battle.cardManagers[this.player].midDraw){
                    this.battle.cardManagers[this.player].reserve.drawEffects.push([5,this.effect[1]])
                }else{
                    this.battle.cardManagers[this.player].draw(this.effect[1])
                }
            break
            case 5674:
                userCombatant.statusEffect('Retain Hand',1)
            break
            case 5689:
                this.effect[0]+=this.effect[1]
            break
            case 5703:
                this.battle.overlayManager.overlays[10][this.player].active=true
                this.battle.overlayManager.overlays[10][this.player].activate([0,1,51])
            break
            case 5711:
                this.battle.cardManagers[this.player].draw(this.effect[1],9)
            break
            case 6013:
                userCombatant.addBlock(this.effect[1])
                for(let a=0,la=this.effect[2];a<la;a++){
                    this.battle.cardManagers[this.player].randomEffect(2,0,[])
                }
            break
            case 6883:
                userCombatant.statusEffect('Strength',this.effect[0])
            break
            case 7161:
                this.battle.overlayManager.overlays[10][this.player].active=true
                this.battle.overlayManager.overlays[10][this.player].activate([this.level,[0,3],57,[0],[[1,1]]])
            break
            case 7604:
                userCombatant.addBlock(this.effect[1])
                this.battle.cardManagers[this.player].draw(this.effect[2])
            break
            case 7624:
                this.battle.cardManagers[this.player].draw(this.effect[0])
                userCombatant.statusEffect('Temporary Strength',this.effect[1])
            break
            case 8411:
                this.battle.cardManagers[this.player].draw(this.effect[0])
                userCombatant.statusEffect('Temporary Strength',this.effect[1])
            break
            case 8562:
                if(this.battle.cardManagers[this.player].midDraw){
                    this.battle.cardManagers[this.player].reserve.drawEffects.push([5,this.effect[1]])
                }else{
                    this.battle.cardManagers[this.player].draw(this.effect[1])
                }
            break
            case 8684:
                this.effect[0]+=this.effect[1]
                for(let a=0,la=this.effect[2];a<la;a++){
                    this.battle.cardManagers[this.player].randomEffect(2,0,[])
                }
            break
            case 8763:
                userCombatant.statusEffect('Buffer',this.effect[1])
                this.exhaust=true
            break
            case 8764:
                userCombatant.statusEffect('Buffer',this.effect[2])
                this.exhaust=true
            break
        }
    }
    callHoldOrbEffect(type){
        if(type>=0){
            switch(this.attack){
                case 7895: case 7896:
                    this.costDown(0,[1])
                break
            }
        }
    }
    callEvokeEffect(type){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(type>=0){
            switch(this.attack){
                case 5942:
                    this.battle.combatantManager.areaAbstract(0,[this.effect[1],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                    this.battle.cardManagers[this.player].draw(this.effect[2])
                    this.deSize=true
                break
                case 5960: case 5961: case 7864: case 7865:
                    this.costDown(0,[1])
                break
            }
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
            case 1612: case 8746:
                userCombatant.statusEffect('Ignore Tile',this.effect[0])
            break
            case 1881:
                userCombatant.statusEffect('Regeneration',this.effect[0])
            break
            case 6710:
                userCombatant.addBlock(this.effect[1])
            break
            case 7096:
                this.battle.addCurrency(this.effect[0],this.player)
            break
            case 7236:
                this.battle.cardManagers[this.player].hand.add(findName('Supporter',types.card),0,0,0)
            break
            case 7237:
                this.battle.cardManagers[this.player].hand.add(findName('Supporter',types.card),0,0,0)
                userCombatant.addBlock(this.effect[0])
            break
            case 7238:
                this.battle.cardManagers[this.player].hand.add(findName('Supporter',types.card),0,0,0)
                userCombatant.addBlock(types.card[findName('Stalin',types.card)].levels[0].effect[0])
                this.battle.cardManagers[this.player].draw(this.effect[0])
            break
            case 7239:
                this.battle.cardManagers[this.player].hand.add(findName('Supporter',types.card),0,0,0)
                userCombatant.addBlock(types.card[findName('Stalin',types.card)].levels[0].effect[0])
                this.battle.cardManagers[this.player].draw(types.card[findName('Malenkov',types.card)].levels[0].effect[0])
                userCombatant.statusEffect('Vigor',this.effect[0])
            break
            case 7240:
                this.battle.cardManagers[this.player].hand.add(findName('Supporter',types.card),0,0,0)
                userCombatant.addBlock(types.card[findName('Stalin',types.card)].levels[0].effect[0])
                this.battle.cardManagers[this.player].draw(types.card[findName('Malenkov',types.card)].levels[0].effect[0])
                userCombatant.statusEffect('Vigor',types.card[findName('Khrushchev',types.card)].levels[0].effect[0])
                userCombatant.heal(this.effect[0])
            break
            case 7241:
                this.battle.cardManagers[this.player].hand.add(findName('Supporter',types.card),0,0,0)
                userCombatant.addBlock(types.card[findName('Stalin',types.card)].levels[0].effect[0])
                this.battle.cardManagers[this.player].draw(types.card[findName('Malenkov',types.card)].levels[0].effect[0])
                userCombatant.statusEffect('Vigor',types.card[findName('Khrushchev',types.card)].levels[0].effect[0])
                userCombatant.heal(types.card[findName('Brezhnev',types.card)].levels[0].effect[0])
                this.battle.combatantManager.randomEnemyEffect(23,['Weak',this.effect[0]])
            break
            case 7242:
                this.battle.cardManagers[this.player].hand.add(findName('Supporter',types.card),0,0,0)
                userCombatant.addBlock(types.card[findName('Stalin',types.card)].levels[0].effect[0])
                this.battle.cardManagers[this.player].draw(types.card[findName('Malenkov',types.card)].levels[0].effect[0])
                userCombatant.statusEffect('Vigor',types.card[findName('Khrushchev',types.card)].levels[0].effect[0])
                userCombatant.heal(types.card[findName('Brezhnev',types.card)].levels[0].effect[0])
                this.battle.combatantManager.randomEnemyEffect(23,['Weak',types.card[findName('Andropov',types.card)].levels[0].effect[0]])
                userCombatant.statusEffect('Control',this.effect[0])
            break
            case 7243: case 7407:
                this.battle.cardManagers[this.player].hand.add(findName('Supporter',types.card),0,0,0)
                userCombatant.addBlock(types.card[findName('Stalin',types.card)].levels[0].effect[0])
                this.battle.cardManagers[this.player].draw(types.card[findName('Malenkov',types.card)].levels[0].effect[0])
                userCombatant.statusEffect('Vigor',types.card[findName('Khrushchev',types.card)].levels[0].effect[0])
                userCombatant.heal(types.card[findName('Brezhnev',types.card)].levels[0].effect[0])
                this.battle.combatantManager.randomEnemyEffect(23,['Weak',types.card[findName('Andropov',types.card)].levels[0].effect[0]])
                userCombatant.statusEffect('Control',types.card[findName('Chernenko',types.card)].levels[0].effect[0])
                this.battle.cardManagers[this.player].hand.upgrade(types.card[findName('Gorbachev',types.card)].levels[0].effect[0])
            break
            case 7554:
                userCombatant.statusEffect('Vulnerable',this.effect[0])
            break
            case 7555:
                userCombatant.statusEffect('Vulnerable',types.card[findName('Nicholas\nII',types.card)].levels[0].effect[0])
                userCombatant.statusEffect('Weak',this.effect[0])
            break
            case 7655:
                userCombatant.metal+=this.effect[0]
            break
            case 8300:
                userCombatant.statusEffect('Temporary Strength',this.effect[1])
            break
            case 8582:
                userCombatant.caffeine+=this.effect[1]
            break
            case 8583: case 8654:
                userCombatant.loseHealth(this.effect[1])
            break
            case 8666:
                userCombatant.wish+=this.effect[0]
            break
            case 8730:
                userCombatant.statusEffect('Weak',this.effect[1])
            break
            case 8812:
                userCombatant.statusEffect('Armor',this.effect[1])
            break
        }
    }
    callPostStartEffect(encounterClass){
        switch(this.attack){
            case 7244:
                this.battle.loseEnergyGen(this.effect[0],this.player)
            break
            case 7245:
                this.battle.loseRandomEnergyGen(this.effect[2],this.player)
            break
            case 7625:
                this.battle.loseCurrency(this.effect[0],this.player)
                this.battle.cardManagers[this.player].deck.randomEffect(21)
                return 1
        }
        return 0
    }
    callEndEffect(encounterClass){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -94:
                if(encounterClass==2){
                    this.spec.splice(this.spec.indexOf(5),1)
                }
            break
            case -124:
                if(encounterClass==1||encounterClass==2){
                    this.spec.splice(this.spec.indexOf(5),1)
                }
            break
            case -125:
                if(encounterClass==2&&this.battle.cardManagers[this.player].deck.cards.indexOf(this)>=0){
                    this.battle.cardManagers[this.player].deck.copySelf(this.battle.cardManagers[this.player].deck.cards.indexOf(this))
                    return true
                }
            break
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
            case 2546: case 8468:
                if(encounterClass==2){
                    this.effect[0]+=this.effect[1]
                }
            break
            case 2605:
                if(encounterClass==2){
                    this.effect[0]*=2
                }
            break
            case 3098: case 3190: case 3493:
                this.battle.addCurrency(this.effect[1],this.player)
            break
            case 3671:
                if(encounterClass==1||encounterClass==2){
                    this.effect[0]+=this.effect[1]
                }
            break
            case 5795:
                if(encounterClass==2){
                    this.effect[1]+=this.effect[2]
                }
            break
            case 7919:
                if(encounterClass==2){
                    this.costDown(2,[1])
                }
            break
            case 7938:
                if(encounterClass==2){
                    this.limit++
                    if(this.limit==2){
                        this.effect[0]*=3
                    }
                }
            break
        }
    }
    callPurchaseEffect(purchase){
        switch(this.attack){
            case 5297:
                if(purchase.type==3){
                    this.effect[0]+=this.effect[1]
                }
            break
        }
    }
    callRemoveEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.battle.relicManager.hasRelic(498,this.player)){
            this.battle.overlayManager.overlays[94][this.player].active=true
            this.battle.overlayManager.overlays[94][this.player].activate([this.level,0])
        }
        switch(this.attack){
            case -10:
                userCombatant.loseMaxHP(this.effect[0])
            break
            case -67:
                this.battle.loseCurrency(this.effect[1],this.player)
            break
            case -110:
                if(this.battle.currency.money[this.player]>this.effect[0]){
                    this.battle.loseCurrency(this.battle.currency.money[this.player]-this.effect[0],this.player)
                }else if(this.battle.currency.money[this.player]<this.effect[0]){
                    this.battle.addCurrency(this.effect[0]-this.battle.currency.money[this.player],this.player)
                }
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
            case 4999:
                userCombatant.loseHealth(this.effect[1])
            break
            case 5155:
                userCombatant.permanentStrength++
            break
            case 5836:
                this.battle.overlayManager.overlays[150][this.player].active=true
                this.battle.overlayManager.overlays[150][this.player].activate([this.level,0])
            break
            case 7911:
                this.battle.addCurrency(this.effect[1],this.player)
            break
            case 8036:
                this.battle.itemManager.addItemSlots(1,this.player)
            break
            case 8446:
                userCombatant.permanent[1]+=this.effect[1]
            break
            case 8558:
                this.battle.cardManagers[this.player].deck.addAbstract(findName('Worker',types.card),0,0,0,[4],[[62]])
            break
            
        }
    }
    callAddEffect(){
        switch(this.attack){
            case -45:
                this.battle.cardManagers[this.player].deck.randomEffect(29,[3])
            break
            case 1461:
                this.battle.cardManagers[this.player].deck.add(findName('Pride',types.card),0,constants.playerNumber+2)
            break
            case 1924:
                this.battle.cardManagers[this.player].deck.add(findName('Bozo',types.card),0,constants.playerNumber+2)
            break
            case 2575:
                this.battle.cardManagers[this.player].deck.add(findName('Normality',types.card),0,constants.playerNumber+2)
            break
            case 2641:
                this.battle.cardManagers[this.player].deck.randomEffect(21)
            break
            case 3195:
                this.battle.cardManagers[this.player].deck.add(findName('Copystrike',types.card),0,constants.playerNumber+2)
            break
            case 3758:
                this.battle.addCurrency(this.effect[1],this.player)
            break
            case 3759:
                this.battle.addCurrency(this.effect[0],this.player)
            break
            case 5454:
                this.battle.overlayManager.overlays[6][this.player].active=true
                this.battle.overlayManager.overlays[6][this.player].activate()
            break
            case 5460:
                this.battle.cardManagers[this.player].deck.randomEffect(30,[2])
            break
            case 6565:
                this.battle.overlayManager.overlays[28][this.player].active=true
                this.battle.overlayManager.overlays[28][this.player].activate()
            break
            case 6646:
                this.battle.cardManagers[this.player].deck.add(findName('Procrastination',types.card),0,constants.playerNumber+2)
            break
            case 6650:
                this.battle.overlayManager.overlays[5][this.player].active=true
                this.battle.overlayManager.overlays[5][this.player].activate()
            break
            case 6892:
                this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,4,0,[],[3])
            break
            case 6899:
                this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,1,0,[],[constants.playerNumber+2,3])
            break
            case 6994: case 7328: case 8473:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].gainMaxHP(this.effect[1])
            break
            case 6995: case 8534:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].loseMaxHP(this.effect[2])
            break
            case 6996: case 7492:
                this.battle.addCurrency(this.effect[2],this.player)
            break
            case 7388:
                this.battle.overlayManager.overlays[62][this.player].active=true
                this.battle.overlayManager.overlays[62][this.player].activate()
            break
            case 7389:
                this.battle.overlayManager.overlays[9][this.player].active=true
                this.battle.overlayManager.overlays[9][this.player].activate()
            break
            case 7497:
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].deck.copySelf(this.battle.cardManagers[this.player].deck.cards.length-1,true)
                }
            break
            case 7544:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].loseMaxHP(this.effect[1])
            break
            case 8790:
                this.battle.overlayManager.overlays[131][this.player].active=true
                this.battle.overlayManager.overlays[131][this.player].activate()
                this.battle.overlayManager.overlays[131][this.player].args[1]=this.effect[1]
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
    callSubAddEffect(){
        switch(this.attack){
            case 5447:
                this.retain=true
            break
            case 5448:
                this.retain2=true
            break
        }
    }
    callTurnEffect(){
        switch(this.attack){
            case 2063: case 2069:
                this.effect[0]+=this.effect[1]
            break
            case 2101: case 4471:
                this.costDown(0,[1])
            break
        }
    }
    callNodeEffect(node){
        switch(this.attack){
            case 2064:
                this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,4,0,[],[0])
            break
            case 3173:
                this.effect[0]+=this.effect[1]
            break
            case 8533:
                if(node==4){
                    this.battle.addCurrency(this.effect[2],this.player)
                }
            break
        }
    }
    callRestOptionEffect(option){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -140:
                if(option!=0&&option!=1){
                    userCombatant.loseHealth(this.effect[0])
                }
            break
        }
    }
    callHealthLossEffect(amount){
        switch(this.attack){
            case 8491: case 8810:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    callRecoverEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case 7055:
                this.battle.cardManagers[this.player].draw(this.effect[0])
            break
            case 7056:
                userCombatant.statusEffect('Strength',this.effect[1])
            break
            case 7293:
                this.battle.addEnergy(this.effect[0],this.player)
            break
            case 7294:
                this.battle.addSpecificEnergy(1,this.player,1)
                this.battle.addSpecificEnergy(1,this.player,0)
            break
            case 7295:
                this.battle.addSpecificEnergy(2,this.player,1)
                this.battle.addSpecificEnergy(1,this.player,0)
            break
            case 7296:
                this.battle.addSpecificEnergy(2,this.player,6)
                this.battle.addSpecificEnergy(1,this.player,1)
            break
            case 7312:
                this.battle.cardManagers[this.player].hand.addAbstract(findName('Hollow\nStream',types.card),this.level,this.color,this.edition,[0],[])
            break
            case 7326:
                this.battle.addEnergy(this.effect[1],this.player)
            break
            case 7327:
                this.battle.addSpecificEnergy(2,this.player,6)
            break
            case 7415:
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Miracle',types.card),0,0)
                }
            break
            case 7417:
                this.battle.combatantManager.allEffect(30,[this.effect[1]])
            break
            case 7418:
                this.battle.combatantManager.lowestEffect(0,[this.effect[1],userCombatant.id])
            break
            case 7480:
                this.effect[1]+=this.effect[3]
            break
            case 7560:
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Miracle',types.card),0,0)
                }
                this.battle.cardManagers[this.player].draw(this.effect[1])
            break
            case 7561:
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Vibrant',types.card),0,0)
                }
            break
            case 7816:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    callEvolveEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.getStatus('Evolve Temporary Strength')>0){
            userCombatant.statusEffect((this.battle.turn.main==this.player?'Temporary Strength':'Temporary Strength Next Turn'),userCombatant.getStatus('Evolve Temporary Strength'))
        }
        switch(this.attack){
            case 7204: case 7441:
                this.costDown(0,[1])
            break
            case 7729:
                userCombatant.addBlock(this.effect[1])
            break
            case 8630:
                userCombatant.addBlock(this.effect[1])
                userCombatant.statusEffect((this.battle.turn.main==this.player?'Temporary Strength':'Temporary Strength Next Turn'),this.effect[2])
            break
        }
    }
    callLeaderEffect(){
        switch(this.attack){
            case 7357: case 7441:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    callAssignEffect(){
        switch(this.attack){
            case 7372:
                this.costDown(2,[1])
            break
        }
    }
    onIncrementCountdown(spent){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        this.battle.cardManagers[this.player].allEffectArgs(2,48,[this.id,'onIncrementAnotherCountdown',[spent]])
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
                this.effect[0]=max(0,this.effect[0]-this.effect[1])
            break
            case 4741: case 4742: case 4743:
                for(let a=0,la=spent.length;a<la;a++){
                    if(userCombatant.manaEquate(spent[a],6)){
                        this.effect[0]+=this.effect[1]
                    }
                }
            break
            case 4808: case 4926:
                for(let a=0,la=spent.length;a<la;a++){
                    if(userCombatant.manaEquate(spent[a],3)){
                        this.effect[1]++
                    }
                }
            break
        }
    }
    onIncrementAnotherCountdown(spent){
        switch(this.attack){
            case 5493:
                this.effect[0]+=this.effect[1]
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
            case 2261: case 6249:
                this.setCost(0,[0])
            break
            case 2554: case 6250:
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
                this.setCost(0,[0])
            break
            case 290:
                this.costDown(0,[1])
            break
            case 1667: case 2092:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    taken(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -47:
                this.effect[0]=max(0,this.effect[0]-this.effect[2])
            break
            case 266:
                this.costUp(2,[1])
            break
            case 282: case 1834: case 5105:
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
            case 5060:
                this.setCost(2,[0])
            break
            case 5254:
                if(!this.deSize){
                    for(let a=0,la=this.effect[0];a<la;a++){
                        userCombatant.holdOrb(13)
                    }
                }
                this.deSize=true
                this.exhaust=true
            break
            case 5323:
                this.costDown(0,[1])
            break
        }
    }
    callDeathEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case -8:
                userCombatant.takeDamage(this.effect[0],-1)
            break
            case -69:
                userCombatant.life=0
            break
            case -111:
                userCombatant.statusEffect('Weak',this.effect[0])
            break
            case -134:
                this.battle.cardManagers[this.player].allEffect(2,2)
            break
            case -139:
                userCombatant.loseHealth(this.effect[0])
            break
            case 1275:
                this.battle.addCurrency(this.effect[0],this.player)
            break
            case 2547:
                this.effect[0]=this.effect[1]
            break
            case 5313:
                this.costDown(0,[1])
            break
        }
    }
    callPrimeEffect(){
        switch(this.attack){
            case 6968:
                this.effect[0]+=this.effect[1]
            break
            case 7350:
                this.effect[1]+=this.effect[2]
            break
            case 7480:
                this.effect[0]+=this.effect[2]
            break
        }
    }
    callUpgradeEffect(){
        switch(this.attack){
            case 7943:
                this.battle.addCurrency(this.effect[1],this.player)
            break
            case 7944:
                this.battle.cardManagers[this.player].randomEffect(0,2,[0])
            break
            case 8250:
                this.battle.loseCurrency(this.effect[1],this.player)
            break
        }
    }
    callForgeEffect(){
        switch(this.attack){
            case 7006:
                this.battle.overlayManager.overlays[165][this.player].active=true
                this.battle.overlayManager.overlays[165][this.player].activate()
            break
            case 7007:
                this.battle.overlayManager.overlays[166][this.player].active=true
                this.battle.overlayManager.overlays[166][this.player].activate()
            break
            case 7008:
                this.battle.overlayManager.overlays[14][this.player].active=true
                this.battle.overlayManager.overlays[14][this.player].activate()
            break
            case 7009:
                this.battle.overlayManager.overlays[162][this.player].active=true
                this.battle.overlayManager.overlays[162][this.player].activate()
            break
            case 7010:
                this.battle.overlayManager.overlays[163][this.player].active=true
                this.battle.overlayManager.overlays[163][this.player].activate()
            break
            case 7011:
                this.battle.overlayManager.overlays[164][this.player].active=true
                this.battle.overlayManager.overlays[164][this.player].activate()
            break
        }
    }
    played(){
        this.fuel=0
        if(variants.transcend){
            this.cost=max(this.cost-1,0)
            this.base.cost=max(this.base.cost-1,0)
        }
        if(this.additionalSpec.includes(-2)){
            this.additionalSpec.splice(this.additionalSpec.indexOf(-2))
        }
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(this.attack){
            case 107: case 255: case 2617: case 2665: case 4765: case 5272: case 5273: case 8272:
                this.effect[0]=max(this.effect[0]-this.effect[1],0)
            break
            case 108: case 1635: case 2419: case 4455: case 5166: case 5606: case 5654: case 6078:
                this.costDown(2,[1])
            break
            case 118: case 619: case 1479: case 1480: case 1697: case 1740: case 1746: case 1788: case 2283: case 2471:
            case 2501: case 3198: case 3647: case 3915: case 4013: case 4178: case 4457: case 4658: case 4727: case 4771:
            case 5208: case 5559: case 5560: case 5750: case 6114: case 6334: case 6657: case 6658: case 6901: case 7027:
            case 7028: case 7216: case 7224: case 7378: case 7754: case 7755: case 7811: case 7812: case 7893: case 8801:
            case 8802:
                this.effect[0]+=this.effect[1]
            break
            case 866: case 908: case 1893: case 2356: case 2482: case 5428: case 5429: case 5430: case 5431: case 8056:
            case 8728:
                this.effect[1]+=this.effect[2]
            break
            case 937: case 7750: case 8217: case 8516: case 8766:
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
            case 1640: case 4881:
                this.effect[0]=1+floor(random(0,3))*2
            break
            case 1654: case 1909: case 5103: case 5104: case 5792: case 6130: case 6169: case 6998: case 8697:
                this.costUp(2,[1])
            break
            case 1739:
                this.effect[0]+=this.effect[1]
                this.costUp(2,[this.effect[2]])
            break
            case 2053:
                this.effect[0]=max(this.effect[0]-this.effect[1],0)
                this.costUp(2,[this.effect[2]])
            break
            case 2653: case 6743:
                this.effect[0]=0
                this.effect[1]=0
            break
            case 2735:
                if(userCombatant.elemental){
                    this.setCost(2,[0])
                    this.discardEffect.push(6)
                    userCombatant.activateRewind()
                }
            break
            case 3074: case 3075: case 3076: case 3078: case 3082: case 3134: case 3135: case 3334: case 3335: case 3381:
            case 3382: case 3383: case 3390: case 3395: case 3396: case 3397: case 3568: case 3569: case 3584: case 3585:
            case 3586: case 3689: case 3724: case 3725: case 3726: case 3727: case 3908: case 3909: case 4626: case 4627:
            case 4628: case 4629: case 4630: case 4631: case 4632: case 5164: case 5543: case 5544: case 6243: case 6262:
            case 6263: case 6264: case 7189: case 7190: case 7345: case 7740: case 8313: case 8314: case 8315: case 8354:
            case 8355:
                if(!this.spec.includes(55)){
                    this.discardEffect.push(13)
                }
            break
            case 3132: case 3851: case 3852:
                this.costDown(2,[this.effect[2]])
            break
            case 3365:
                this.effect[1]=0
            break
            case 3827: case 3828: case 3829: case 3830: case 3831: case 3832: case 3833: case 3834: case 3835: case 3836:
            case 3873: case 3874: case 3875: case 4124: case 4125: case 4126: case 4127: case 4128: case 4129: case 4770:
            case 4972: case 5002: case 5003: case 5080: case 8338: case 8339: case 8340: case 8442:
                if(this.spec.includes(60)){
                    this.discardEffectBuffered.push(1)
                }else{
                    this.discardEffect.push(14)
                }
            break
            case 4130:
                if(this.spec.includes(60)){
                    this.battle.cardManagers[this.player].hand.selfCall(6,[1,[this.effect[0]],1,[2,1,1]])
                    this.effect[0]=0
                    this.discardEffectBuffered.push(1)
                }else{
                    this.discardEffect.push(15)
                }
            break
            case 4808:
                this.effect[1]=0
            break
            case 4997: case 8798:
                if(this.limit%4==0){
                    this.exhaust=true
                }
            break
            case 4998: case 8799:
                if(this.limit%3==0){
                    this.exhaust=true
                }
            break
            case 5001:
                if(this.spec.includes(60)){
                    userCombatant.addBlock(this.effect[0])
                    this.effect[0]=0
                    this.discardEffectBuffered.push(1)
                }else{
                    this.discardEffect.push(15)
                }
            break
            case 5421: case 5422: case 5423:
                this.edition=2
            break
            case 5498: case 6923:
                if(this.getCost(1)){
                    this.effect[0]=ceil(this.effect[0]/2)
                    this.costDown(2,[1])
                }
            break
            case 5752:
                this.effect[0]+=this.effect[2]
            break
            case 5973:
                this.effect[0]+=this.effect[1]
                this.costUp(2,[1])
            break
            case 5974:
                this.effect[0]=max(this.effect[0]-this.effect[1],0)
                this.costUp(2,[1])
            break
            case 6576: case 6577:
                this.effect[2]+=this.effect[3]
            break
            case 6925:
                this.effect[0]=0
            break
            case 7033: case 7255: case 8423:
                if(this.debut){
                    this.costDown(2,[1])
                }
            break
            case 7631:
                if(userCombatant.luckCheck()||!userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                    this.costDown(2,[1])
                    userCombatant.highRoll()
                }else{
                    this.costUp(2,[1])
                    userCombatant.lowRoll()
                }
            break
            case 7897: case 7898:
                this.effect[0]=this.effect[2]
            break
            case 7935: case 7936:
                if(!this.spec.includes(62)){
                    this.spec.push(62)
                    this.additionalSpec.push(62)
                }
            break
            case 8008:
                if(!this.spec.includes(2)){
                    this.spec.push(2)
                    this.additionalSpec.push(2)
                }
            break
        }
        if(this.battle.modded(94)&&this.battle.cardManagers[this.player].hand.turnPlayed[0]>=5){
            this.battle.cardManagers[this.player].allEffect(2,2)
        }
        if(this.battle.modded(205)&&this.battle.cardManagers[this.player].hand.turnPlayed[0]>=3){
            userCombatant.takeDamage(4,-1)
        }
        this.battle.attackManager.level=this.level
        this.battle.attackManager.color=this.color
        this.retain=false
        this.retain2=false
        this.debut=false
    }
    anotherPlayed(card,cardClass){
        if(this.usable){
            this.fuel++
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(this.spec.includes(9)||this.spec.includes(72)){
                this.deSize=true
            }
            switch(this.attack){
                case -5:
                    userCombatant.takeDamage(this.effect[0],-1)
                break
                case -9:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[0]>=this.effect[0]){
                        this.battle.cardManagers[this.player].allEffect(2,2)
                    }
                break
                case -30:
                    this.battle.cardManagers[this.player].hand.randomEffect(0)
                break
                case -42:
                    userCombatant.statusEffect('Poison',this.effect[0])
                break
                case -93:
                    if(cardClass==11){
                        userCombatant.loseHealth(this.effect[0])
                    }
                break
                case -97:
                    this.battle.cardManagers[this.player].hand.randomEffect(43,[])
                break
                case -99:
                    if(cardClass==1){
                        this.deSize=true
                        this.exhaust=true
                    }else{
                        this.battle.cardManagers[this.player].allEffect(2,2)
                    }
                break
                case -100:
                    if(cardClass==2){
                        this.deSize=true
                        this.exhaust=true
                    }else{
                        this.battle.cardManagers[this.player].allEffect(2,2)
                    }
                break
                case -108:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[0]>=this.effect[0]){
                        this.deSize=true
                        this.discardEffect.push(1)
                    }
                break
                case -118:
                    if(cardClass==3){
                        this.deSize=true
                        this.exhaust=true
                    }else{
                        this.battle.cardManagers[this.player].allEffect(2,2)
                    }
                break
                case -119:
                    if(cardClass==11){
                        this.deSize=true
                        this.exhaust=true
                    }else{
                        this.battle.cardManagers[this.player].allEffect(2,2)
                    }
                break
                case -122:
                    userCombatant.statusEffect('Freeze',this.effect[0])
                break
                case -129:
                    if(card.edition!=0){
                        this.deSize=true
                        this.exhaust=true
                    }
                break
                case 52: case 220: case 594: case 1508: case 3914: case 7530: case 7531: case 8268:
                    this.deSize=true
                break
                case 56:
                    if(this.getCost(0)>=0){
                        this.costUp(0,[1])
                    }
                break
                case 414: case 416:
                    if(cardClass==1){
                        this.costDown(0,[1])
                    }
                break
                case 415: case 5933:
                    if(cardClass==2){
                        this.costDown(0,[1])
                    }
                break
                case 857:
                    if(card.name=='Spark'){
                        this.costDown(0,[1])
                    }
                break
                case 1040:
                    if(card.getBasic(-1)){
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
                    this.costDown(0,[1])
                    if(this.effect[0]>0){
                        this.effect[0]=max(0,this.effect[0]-this.effect[1])
                    }
                break
                case 1631:
                    this.effect[0]=floor(random(this.effect[1],this.effect[2]+1))
                break
                case 1949:
                    let roll=floor(random(0,3))+1
                    this.effect[0]=roll
                    this.target[2]=roll
                break
                case 1992:
                    if(card.basic&&cardClass==3){
                        this.costDown(0,[1])
                    }
                break
                case 2006:
                    if(card.getBasic(-1)){
                        this.target[2]++
                    }
                break
                case 2007:
                    if(card.getBasic(-1)){
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
                    if(card.spec.includes(70)){
                        this.costDown(0,[1])
                    }
                break
                case 2754:
                    if(cardClass==3){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 2755:
                    if(cardClass==4){
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
                        this.setCost(0,[0])
                    }
                break
                case 2931:
                    if(cardClass==1){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 2932:
                    if(cardClass==2){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 2933:
                    if(cardClass==3){
                        this.effect[0]=min(this.effect[0]+this.effect[1],3)
                        this.target[2]=min(this.target[2]+this.effect[1],3)
                    }
                break
                case 2934:
                    if(cardClass==4){
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
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[0]>=this.effect[2]-1){
                        this.setCost(0,[0])
                    }
                break
                case 3067:
                    if(cardClass==3){
                        this.effect[0]=max(this.effect[0]-this.effect[1],1)
                    }
                break
                case 3073:
                    if(card.edition==5){
                        this.setCost(0,[0])
                    }
                break
                case 3100: case 3101: case 3102:
                    if(card.colorless()){
                        this.setCost(0,[0])
                    }
                break
                case 3112: case 3221: case 8522:
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
                        this.setCost(0,[0])
                    }
                break
                case 3349:
                    if(cardClass==3){
                        this.effect[0]+=this.effect[2]
                        this.effect[1]+=this.effect[3]
                    }
                break
                case 3401:
                    if(cardClass==11){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 3410:
                    if(cardClass==11){
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
                    if(cardClass==1){
                        this.effect[0]+=this.effect[2]
                    }else if(cardClass==2){
                        this.effect[1]+=this.effect[3]
                    }
                break
                case 3677:
                    if(cardClass==3){
                        this.effect[1]=this.effect[1]+this.effect[2]
                    }
                break
                case 3704: case 4743:
                    if(cardClass==3){
                        this.effect[0]+=this.effect[2]
                    }
                break
                case 3825:
                    if(card.colorless()&&this.getCost(0)>0){
                        this.costDown(0,[1])
                    }
                break
                case 3923:
                    if(card.getBasic(-1)){
                        this.target[2]=min(this.target[2]+this.effect[1],6)
                    }
                break
                case 3943:
                    this.cost=sortNumbers(this.cost.concat(-1))
                break
                case 4122:
                    if(card.getBasic(1)){
                        this.effect[0]+=this.effect[2]
                    }
                    if(card.getBasic(2)){
                        this.effect[1]+=this.effect[3]
                    }
                break
                case 4126:
                    if(this.spec.includes(60)&&card.getBasic(-1)){
                        this.battle.attackManager.effect[0]*=2
                    }
                break
                case 4127:
                    if(this.spec.includes(60)&&card.getBasic(-1)){
                        this.battle.attackManager.effect[0]=this.battle.attackManager.effect[0]*2+this.effect[0]
                    }
                break
                case 4262:
                    this.deSize=true
                    this.exhaust=true
                break
                case 5014: case 5372:
                    if(cardClass==3){
                        this.costDown(0,[1])
                    }
                break
                case 5022: case 7390: case 7391: case 7392: case 7393:
                    if(cardClass==4){
                        this.setCost(0,[0])
                    }
                break
                case 5290: case 5291: case 5575:
                    if(card.getCost(4)){
                        this.setCost(0,[0])
                    }
                break
                case 5305:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[1]==this.effect[0]-1){
                        this.costDown(0,[1])
                    }
                break
                case 5306:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[2]==this.effect[0]-1){
                        this.costDown(0,[1])
                    }
                break
                case 5307:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[11]==this.effect[0]-1){
                        this.costDown(0,[1])
                    }
                break
                case 5308: case 5309: case 5310:
                    if(card.edition!=0){
                        this.costDown(0,[1])
                    }
                break
                case 5311:
                    if(card.rarity==2){
                        this.costDown(0,[1])
                    }
                break
                case 5314:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[0]==this.effect[0]-1){
                        this.costDown(0,[1])
                    }
                break
                case 5315:
                    if(cardClass==1){
                        this.costDown(0,[1])
                    }
                break
                case 5316:
                    if(cardClass==2){
                        this.costDown(0,[1])
                    }
                break
                case 5317: case 7348:
                    if(cardClass==3){
                        this.costDown(0,[1])
                    }
                break
                case 5318:
                    if(cardClass==11){
                        this.costDown(0,[1])
                    }
                break
                case 5319:
                    if(card.getCost(0)==0){
                        this.costDown(0,[1])
                    }
                break
                case 5320:
                    if(card.getCost(0)==2){
                        this.costDown(0,[1])
                    }
                break
                case 5331: case 5332:
                    if(card.getCost(4)){
                        this.costDown(0,[1])
                    }
                break
                case 5333:
                    if(card.getCost(0)!=0){
                        this.costDown(0,[1])
                    }
                break
                case 5376:
                    if(card.edition==2){
                        this.costDown(0,[1])
                    }
                break
                case 5384: case 5385:
                    if(this.battle.cardManagers[this.player].hand.turnPlayedEdition[2]==this.effect[0]-1){
                        this.costDown(0,[1])
                    }
                break
                case 5388:
                    if(card.edition==6){
                        this.setCost(0,[0])
                    }
                break
                case 5484:
                    this.effect[0]+=this.effect[2]
                    this.effect[1]+=this.effect[2]
                break
                case 5485: case 6018:
                    this.effect[0]+=this.effect[1]
                break
                case 5538:
                    if(cardClass==7){
                        this.deSize=true
                        this.exhaust=true
                        this.battle.cardManagers[this.player].hand.cards.push(copyCard(card))
                        this.battle.cardManagers[this.player].hand.postCopyAbstract(1)
                    }
                break
                case 5539:
                    if(card.spec.includes(35)){
                        this.deSize=true
                        this.exhaust=true
                        this.battle.cardManagers[this.player].hand.cards.push(copyCard(card))
                        this.battle.cardManagers[this.player].hand.postCopyAbstract(1)
                    }
                break
                case 5540:
                    userCombatant.addBlock(this.effect[1])
                break
                case 5552: case 5553: case 5554: case 5555:
                    this.costDown(0,[1])
                break
                case 5592:
                    if(this.battle.cardManagers[this.player].hand.turnPlayed[3]==this.effect[0]-1){
                        this.costDown(0,[1])
                    }
                break
                case 5593: case 5594:
                    if(cardClass==4){
                        this.costDown(0,[1])
                    }
                break
                case 5621:
                    userCombatant.statusEffect('Counter All',this.effect[1])
                break
                case 5714: case 5715:
                    if(card.spec.includes(35)){
                        this.setCost(0,[0])
                    }
                break
                case 5744:
                    if(cardClass==12&&card.spec.includes(60)){
                        this.costDown(0,[1])
                    }
                break
                case 5748:
                    this.battle.combatantManager.areaAbstract(0,[this.effect[1],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                break
                case 5749:
                    userCombatant.statusEffect('Vigor',this.effect[1])
                break
                case 5874: case 6331:
                    if(card.spec.includes(52)){
                        this.effect[0]+=this.effect[1]
                    }
                break
                case 5945:
                    if(cardClass==13){
                        this.costDown(0,[1])
                    }
                break
                case 6164:
                    this.battle.combatantManager.allEffect(48,['Counter All',this.effect[1]])
                break
                case 6977:
                    if(card.rarity==2){
                        this.setCost(0,[0])
                    }
                break
                case 7279: case 7280:
                    if(cardClass==4){
                        this.deSize=true
                    }
                break
                case 7646: case 7993: case 8490:
                    this.costDown(0,[1])
                break
                case 7976:
                    userCombatant.statusEffect('Vigil',this.effect[1])
                break
                case 8114:
                    if(card.getCost(0)>=2){
                        this.costDown(0,[1])
                    }
                break
                case 8422:
                    userCombatant.statusEffect('Temporary Strength',this.effect[2])
                break
                case 8496:
                    if(cardClass==11){
                        this.costDown(0,[1])
                    }
                break
                case 8574:
                    if(cardClass==7){
                        this.effect[1]+=this.effect[2]
                    }
                break
                case 8716:
                    if(cardClass==11&&card.name!='Pristine'){
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Pristine',types.card),0,0)
                        }
                    }
                break
                case 8758:
                    if(card.spec.includes(84)){
                        userCombatant.statusEffect('Temporary Strength',this.effect[1])
                    }
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
            case 862: case 4299:
                if(this.getCost(0)>0){
                    this.setCost(0,[0])
                }
            break
            case 3805:
                this.effect[0]+=this.effect[1]
            break
        }
    }
    energyEffect(delta){
        switch(this.attack){
            case 3253: case 4903: case 5312:
                if(delta>0){
                    this.costDown(0,[1])
                }
            break
            case 3365:
                if(delta>0){
                    this.effect[1]++
                }
            break
            case 4724:
                if(delta>0){
                    this.effect[0]+=this.effect[1]
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
        this.battle.cardManagers[this.player].hand.allEffectArgs(55,['anotherEtherealed',[this.id]])
        switch(this.attack){
            case -38:
                this.battle.currency.money[this.player]-=this.effect[0]
            break
            case -50:
                userCombatant.statusEffect('Temporary Draw',this.effect[0])
            break
            case -54:
                userCombatant.statusEffect('Temporary Draw',-this.effect[0])
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
            case 845: case 6267:
                userCombatant.addBlock(this.effect[1])
            break
            case 2107:
                this.battle.cardManagers[this.player].hand.add(findName('Operational L',types.card),this.level,this.color)
            break
            case 2108: case 4448:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nStar',types.card),this.level,this.color)
            break
            case 3631:
                userCombatant.statusEffect('Temporary Draw',this.effect[2])
            break
            case 3808:
                this.battle.cardManagers[this.player].hand.add(findName('Dual\nDiscus',types.card),this.level,0)
            break
            case 5761: case 6046:
                userCombatant.statusEffect('Temporary Draw',this.effect[1])
            break
            case 5765:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nContact',types.card),this.level,this.color)
            break
            case 5766:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nAccess',types.card),this.level,this.color)
            break
            case 5854:
                userCombatant.statusEffect('Temporary Strength Next Turn',this.effect[1])
            break
            case 6146:
                this.battle.cardManagers[this.player].hand.add(findName('Trough',types.card),this.level,constants.playerNumber+1)
            break
            case 6488: case 6555:
                userCombatant.statusEffect('Pure',this.effect[2])
            break
            case 6548:
                userCombatant.statusEffect('Strength',this.effect[1])
            break
            case 7035:
                this.battle.addCurrency(this.effect[1],this.player)
            break
            case 7080:
                userCombatant.statusEffect('Armor',this.effect[2])
            break
        }
    }
    anotherEtherealed(id){
        if(this.id!=id){
            switch(this.attack){
                case 8519:
                    this.costDown(0,[1])
                break
            }
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
            case 757: case 1753:
                this.costDown(0,[1])
            break
            case 775: case 776: case 1868: case 6875: case 7897: case 7898:
                this.effect[0]+=this.effect[1]
            break
            case 1403:
                if(this.battle.turn.total%2==0){
                    this.costDown(0,[1])
                }
            break
            case 1564:
                userCombatant.addBlock(this.effect[0])
            break
            case 2245:
                this.deSize=true
                this.discardEffect.push(10)
            break
            case 3893: case 3894:
                this.effect[1]++
                if(this.effect[1]>=2){
                    this.effect[1]-=2
                    this.costDown(0,[1])
                }
            break
            case 5516:
                this.effect[0]=max(0,this.effect[0]-this.effect[1])
            break
            case 5563:
                userCombatant.statusEffect('Counter All',this.effect[1])
            break
            case 5612:
                this.battle.combatantManager.randomEnemyEffect(10,[this.effect[0],userCombatant.id,this.effect[1]])
                this.battle.cardManagers[this.player].tempDraw.exhaustRandom+=this.effect[2]
                this.effect[1]+=this.effect[3]
                this.effect[2]+=this.effect[3]
            break
            case 5969: case 8580:
                this.effect[0]+=this.effect[1]
            break
            case 6932:
                this.effect[1]+=this.effect[2]
            break
            case 7116:
                userCombatant.statusEffect('Energy Next Turn',-this.effect[2])
            break
            case 7117:
                userCombatant.statusEffect('Random Mana Next Turn',-this.effect[2])
            break
            case 7281: case 7282:
                this.effect[0]+=this.effect[2]
                this.effect[1]+=this.effect[3]
            break
            case 7525:
                if(userCombatant.totalUniqueStatus(1)>0){
                    this.effect[0]+=this.effect[1]
                }
            break
        }
        if(this.spec.includes(55)){
            switch(this.attack){
                case 3074: case 8354:
                    this.battle.combatantManager.randomEnemyEffect(21,[this.effect[0],this.battle.combatantManager.getPlayerCombatantIndex(this.player),2])
                break
                case 3075:
                    this.battle.turnManager.loadSpecificAttack(this.battle.combatantManager.getPlayerCombatantIndex(this.player),416,[this.effect[0]])
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
            this.costUp(0,[1])
            this.edited.cost++
            switch(this.attack){
                case 3076: case 6243:
                    userCombatant.addBlock(this.effect[0])
                    this.battle.particleManager.particlesBack.push(new particle(this.layer,userCombatant.position.x,userCombatant.position.y-30,245,[5]))
                break
                case 3078:
                    userCombatant.statusEffect('Temporary Strength',this.battle.cardManagers[this.player].hand.lastTurnPlayed[2]+this.effect[0])
                break
                case 3082:
                    this.battle.cardManagers[this.player].tempCostDown+=this.effect[0]
                break
                case 3135: case 7345:
                    this.battle.cardManagers[this.player].hand.upgrade(this.effect[0])
                break
                case 3334:
                    this.battle.cardManagers[this.player].deAbstract(0,this.effect[0],[])
                break
                case 3335: case 7189:
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
                    this.battle.combatantManager.highestEffect(0,[this.effect[0],userCombatant.id])
                break
                case 3584: case 8355:
                    this.battle.overlayManager.overlays[58][this.player].active=true
                    this.battle.overlayManager.overlays[58][this.player].activate([this.effect[0],this.effect[1]])
                break
                case 3585: case 4627: case 4628: case 4629:
                    userCombatant.statusEffect('Temporary Strength',this.effect[0])
                    userCombatant.statusEffect('Temporary Dexterity',this.effect[1])
                break
                case 3586: case 7190:
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
                case 3909: case 4630: case 4631: case 4632:
                    this.battle.cardManagers[this.player].draw(this.effect[0])
                    this.battle.cardManagers[this.player].hand.rewind(this.effect[1])
                break
                case 4626:
                    this.battle.addSpecificEnergy(1,this.player,4)
                break
                case 5164:
                    this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0]*userCombatant.diceRoll(1,6),this.id])
                break
                case 5543: case 5544:
                    this.battle.combatantManager.areaAbstract(0,[this.effect[0],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                    this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                break
                case 6262:
                    this.battle.cardManagers[this.player].drawAbstract(this.effect[0],0,0,[11])
                break
                case 6263:
                    if(userCombatant.getStatus('Armor')==0){
                        userCombatant.statusEffect('Armor',this.effect[0])
                    }
                break
                case 6264:
                    this.battle.combatantManager.randomEnemyEffect(23,['Weak',this.effect[0]])
                break
                case 7740:
                    for(let a=0,la=this.effect[0];a<la;a++){
                        this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                    }
                break
                case 8313:
                    this.battle.cardManagers[this.player].hand.exhaust(this.effect[0])
                break
                case 8314:
                    this.battle.combatantManager.randomEnemyEffect(23,['Frail',this.effect[0]])
                break
                case 8315:
                    this.battle.tileManager.fireRandom(0,this.effect[0])
                break

            }
        }else if(this.spec.includes(60)){
            if(userCombatant.wish>=(variants.mtg?this.cost[0]:this.cost)){
                userCombatant.wish-=variants.mtg?this.cost[0]:this.cost
                this.triggerWish()
            }else{
                this.deSize=true
                this.discardEffectBuffered.push(2)
            }
        }
    }
    triggerWish(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
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
                userCombatant.statusEffect('Temporary Damage Taken Down',this.effect[0])
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
                    this.battle.cardManagers[this.player].addRandomAbstract(2,0,0,0,2,[5],[3,[2,11],0,[[1]]])
                }
            break
            case 3874:
                userCombatant.statusEffect('Vigor',this.effect[0]*this.battle.cardManagers[this.player].hand.lastTurnPlayed[0])
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
            case 4130: case 5001:
                this.effect[0]+=this.effect[1]
            break
            case 4770:
                this.battle.combatantManager.areaAbstract(2,['Burn',this.effect[0]],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                this.battle.combatantManager.areaAbstract(2,['Freeze',this.effect[1]],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                this.battle.addSpecificEnergy(1,this.player,6)
                this.battle.cardManagers[this.player].draw(this.effect[2])
            break
            case 4972:
                userCombatant.statusEffect('Temporary Strength',this.effect[0])
                this.battle.cardManagers[this.player].drawAbstract(this.effect[1],0,0,[1])
            break
            case 5002:
                this.battle.combatantManager.randomEnemyEffect(22,[this.effect[0],userCombatant.id,this.effect[1]])
            break
            case 5003:
                this.battle.overlayManager.overlays[7][this.player].active=true
                this.battle.overlayManager.overlays[7][this.player].activate()
            break
            case 5080:
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.battle.cardManagers[this.player].hand.addAbstract(findName('Strike',types.card),this.level,this.color,0,[9],[])
                }
            break
            case 8338:
                this.battle.cardManagers[this.player].drawAbstract(this.effect[0],20,5,[1])
            break
            case 8339:
                this.battle.cardManagers[this.player].drawAbstract(this.effect[0],20,13,[1])
            break
            case 8340:
                this.battle.cardManagers[this.player].drawAbstract(this.effect[0],20,7,[1])
            break
            case 8442:
                this.battle.overlayManager.overlays[10][this.player].active=true
                this.battle.overlayManager.overlays[10][this.player].activate([this.level,[2,3],57,[0],[]])
            break
        }
    }
    doubleBoth(){
        if(variants.mtg){
            if(this.specialCost){
                this.cost[0]*=2
                this.base.cost[0]*=2
            }else{
                for(let a=0,la=this.cost.length;a<la;a++){
                    this.cost.splice(a,0,this.cost[a])
                    a++
                    la++
                }
                for(let a=0,la=this.base.cost.length;a<la;a++){
                    this.base.cost.splice(a,0,this.base.cost[a])
                    a++
                    la++
                }
            }
        }else{
            this.cost*=2
            this.base.cost*=2
        }
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
    confuse(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        this.setCost(0,
            this.attack==6805||this.attack==7384||this.attack==7481||this.attack==7504||this.attack==7505?[0]:
            [max(0,floor(random(0,variants.mtg?6:4))-userCombatant.getStatus('Confuse Cost Down'))]
        )
        switch(this.attack){
            case 7382:
                this.battle.combatantManager.allEffect(30,[this.effect[1]])
            break
        }
    }
    display(cancelDesc=false){
        if(this.battle.modded(232)){
            this.height=110
        }
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
            if(this.battle.modded(236)){
                if(attack%3==0){
                    name+=' Pro'
                }
                if(attack%5==0){
                    name+=' Max'
                }
                if(attack%7==0){
                    name+=' Plus'
                }
                if(attack%11==0){
                    name+=' Deluxe'
                }
                if(attack%13==0){
                    name+=' Ultimate'
                }
                if(attack%17==0){
                    name+=' Supreme'
                }
                if(attack%19==0){
                    name+=' 2'
                }
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
                }else if(this.attack==3454||this.attack==3459||this.attack==3460||this.attack==-1031||this.attack==-1032||this.attack==4225){
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
                }else if(this.attack==3629||this.attack==3630||this.attack==3631||this.attack==4223||this.attack==4224){
                    this.layer.noStroke()
                    switch(this.attack){
                        case 3629: case 4223: case 4224:
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
                        case 3629: case 4223: case 4224:
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
                    let rt3=constants.sqrt3
                    this.layer.strokeWeight(2)
                    switch(this.attack){
                        case 3629: case 4223: case 4224:
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
                }else if(this.attack==3753||this.attack==3754||this.attack==4048||this.attack==5992){
                    this.layer.noStroke()
                    this.layer.fill(50,this.fade*this.anim.select*0.2)
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    let bar=[]
                    switch(this.attack){
                        case 3753: case 3754:
                            bar=[170,190,215]
                        break
                        case 4048:
                            bar=[200,180,0]
                        break
                        case 5992:
                            bar=[40,200,220]
                        break
                    }
                    for(let a=0,la=20;a<la;a++){
                        this.layer.fill(bar[0]+graphics.paperball[a][0],bar[1]+graphics.paperball[a][0],bar[2]+graphics.paperball[a][0])
                        regPoly(this.layer,lsin((a+0.5)/la*360)*32.5,lcos((a+0.5)/la*360)*32.5,5,6.75,6.75,(a+0.5)/la*360)
                    }
                    for(let a=0,la=50;a<la;a++){
                        this.layer.fill(bar[0]+graphics.paperball[a][0],bar[1]+graphics.paperball[a][0],bar[2]+graphics.paperball[a][0])
                        regPoly(this.layer,lsin(a*137)*sqrt(a)*4.5,lcos(a*137)*sqrt(a)*4.5,5,6.75,6.75,graphics.paperball[a][1])
                    }
                    this.layer.fill(40,this.fade*0.2)
                    this.layer.rect(0,0,this.width+5,this.height+5,7.5)
                    this.layer.fill(48,this.fade*0.2)
                    this.layer.rect(0,0,this.width-5,this.height-5,2.5)
                    this.layer.noFill()
                }else if(this.attack==7138){
                    this.layer.fill(255,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(255,this.fade)
                    this.layer.stroke(0,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(50,this.fade)
                    this.layer.strokeWeight(3)
                    for(let a=0,la=this.width/15-1;a<la;a++){
                        this.layer.rect(-this.width/2-3+(a+1)/(la+1)*(this.width+6),0,5,this.height)
                    }
                    this.layer.noFill()
                }else if(this.attack==8717){
                    this.layer.fill(10,30,40,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(8,21,35,this.fade)
                    this.layer.stroke(5,18,32,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(255,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(30)
                    this.layer.text(':(',-25,-35)
                    this.layer.textSize(10)
                    this.layer.textAlign(LEFT,CENTER)
                    this.layer.text('This card ran into a problem and needs to restart.',10,10,this.width-10)
                    this.layer.textAlign(CENTER,CENTER)
                    this.layer.textSize(4)
                    this.layer.text('EXITED WITH ERROR CODE 1',0,45)
                    this.layer.noFill()
                }else if(this.attack==8718){
                    this.layer.fill(20,25,30,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(0,this.fade)
                    this.layer.rect(0,0,this.width,this.height)
                    this.layer.rotate(180)
                    this.layer.image(graphics.minor[1],-this.width*0.5,-this.height*0.5,this.width,this.height)
                    this.layer.rotate(-180)
                    this.layer.noFill()
                    this.layer.stroke(20,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
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
                    if(this.type<findName('-h Prison',types.card)){
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
                    }
                    this.layer.stroke(40,50,60,this.fade)
                    this.layer.noFill()
                }else if(this.list==-9&&variants.ultraprism&&false){
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
                    if(colorDetail.length>=4){
                        this.gradient=[new p5.LinearGradient(0,this.width-10),new p5.LinearGradient(0,this.width-10),new p5.LinearGradient(0,this.width-10)]
                        this.gradient[0].colors(0.0,
                            color(51,37,37,this.fade*this.anim.select),0.25,
                            color(51,51,37,this.fade*this.anim.select),0.5,
                            color(37,51,37,this.fade*this.anim.select),0.75,
                            color(37,37,51,this.fade*this.anim.select),1.0,
                            color(51,37,51,this.fade*this.anim.select))
                        this.gradient[1].colors(0.0,
                            color(40,13,13,this.fade),0.25,
                            color(40,40,13,this.fade),0.5,
                            color(13,40,13,this.fade),0.75,
                            color(13,13,40,this.fade),1.0,
                            color(40,13,40,this.fade))
                        this.gradient[2].colors(0.0,
                            color(51,17,17,this.fade),0.25,
                            color(51,51,17,this.fade),0.5,
                            color(17,51,17,this.fade),0.75,
                            color(17,17,51,this.fade),1.0,
                            color(51,17,51,this.fade))
                    
                        this.layer.noStroke()
                        this.layer.fill(51,37,37,this.fade*this.anim.select)
                        this.layer.rect(-20,0,this.width-25,this.height+15,10)
                        this.layer.fill(51,37,51,this.fade*this.anim.select)
                        this.layer.rect(20,0,this.width-25,this.height+15,10)

                        this.layer.translate(-this.width*0.4-4,0)
                        this.layer.fillGradient(this.gradient[0])
                        this.layer.rect(this.width*0.4+4,0,this.width-10,this.height+15)
                        this.layer.translate(this.width*0.4+4,0)

                        this.layer.strokeWeight(5)
                        this.layer.fill(51,17,17,this.fade)
                        this.layer.stroke(40,13,13,this.fade)
                        this.layer.rect(-20,0,this.width-40,this.height,5)
                        this.layer.fill(51,17,51,this.fade)
                        this.layer.stroke(40,13,40,this.fade)
                        this.layer.rect(20,0,this.width-40,this.height,5)

                        this.layer.translate(-this.width*0.4-4,0)
                        this.layer.noStroke()
                        this.layer.fillGradient(this.gradient[1])
                        this.layer.rect(this.width*0.4+4,0,this.width-10,this.height+5)
                        this.layer.fillGradient(this.gradient[2])
                        this.layer.rect(this.width*0.4+4,0,this.width-10,this.height-5)
                        this.layer.translate(this.width*0.4+4,0)

                        this.layer.stroke(40,13,13,this.fade)
                        this.layer.noFill()
                    }else{
                        this.gradient=[new p5.LinearGradient(-15,this.width*0.5-5),new p5.LinearGradient(-15,this.width*0.5-5),new p5.LinearGradient(-15,this.width*0.5-5)]
                        if(colorDetail.length==3){
                            this.gradient[0].colors(0.0,
                                color(colorDetail[0].active[0]*0.2,colorDetail[0].active[1]*0.2,colorDetail[0].active[2]*0.2,this.fade*this.anim.select),0.3,
                                color(colorDetail[2].active[0]*0.2,colorDetail[1].active[1]*0.2,colorDetail[1].active[2]*0.2,this.fade*this.anim.select),0.7,
                                color(colorDetail[2].active[0]*0.2,colorDetail[1].active[1]*0.2,colorDetail[1].active[2]*0.2,this.fade*this.anim.select),1.0,
                                color(colorDetail[1].active[0]*0.2,colorDetail[2].active[1]*0.2,colorDetail[2].active[2]*0.2,this.fade*this.anim.select))
                            this.gradient[1].colors(0.0,
                                color(colorDetail[0].stroke[0]*0.2,colorDetail[0].stroke[1]*0.2,colorDetail[0].stroke[2]*0.2,this.fade),0.3,
                                color(colorDetail[2].stroke[0]*0.2,colorDetail[1].stroke[1]*0.2,colorDetail[1].stroke[2]*0.2,this.fade),0.7,
                                color(colorDetail[2].stroke[0]*0.2,colorDetail[1].stroke[1]*0.2,colorDetail[1].stroke[2]*0.2,this.fade),1.0,
                                color(colorDetail[1].stroke[0]*0.2,colorDetail[2].stroke[1]*0.2,colorDetail[2].stroke[2]*0.2,this.fade))
                            this.gradient[2].colors(0.0,
                                color(colorDetail[0].fill[0]*0.2,colorDetail[0].fill[1]*0.2,colorDetail[0].fill[2]*0.2,this.fade),0.3,
                                color(colorDetail[2].fill[0]*0.2,colorDetail[1].fill[1]*0.2,colorDetail[2].fill[2]*0.2,this.fade),0.7,
                                color(colorDetail[2].fill[0]*0.2,colorDetail[1].fill[1]*0.2,colorDetail[2].fill[2]*0.2,this.fade),1.0,
                                color(colorDetail[1].fill[0]*0.2,colorDetail[2].fill[1]*0.2,colorDetail[1].fill[2]*0.2,this.fade))
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
                        this.layer.fill(colorDetail[colorDetail.length-1].active[0]*0.2,colorDetail[colorDetail.length-1].active[1]*0.2,colorDetail[colorDetail.length-1].active[2]*0.2,this.fade*this.anim.select)
                        this.layer.rect(20,0,this.width-25,this.height+15,10)

                        this.layer.translate(-this.width*0.2-2,0)
                        this.layer.fillGradient(this.gradient[0])
                        this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+15)
                        this.layer.translate(this.width*0.2+2,0)

                        this.layer.strokeWeight(5)
                        this.layer.fill(colorDetail[0].fill[0]*0.2,colorDetail[0].fill[1]*0.2,colorDetail[0].fill[2]*0.2,this.fade)
                        this.layer.stroke(colorDetail[0].stroke[0]*0.2,colorDetail[0].stroke[1]*0.2,colorDetail[0].stroke[2]*0.2,this.fade)
                        this.layer.rect(-20,0,this.width-40,this.height,5)
                        this.layer.fill(colorDetail[colorDetail.length-1].fill[0]*0.2,colorDetail[colorDetail.length-1].fill[1]*0.2,colorDetail[colorDetail.length-1].fill[2]*0.2,this.fade)
                        this.layer.stroke(colorDetail[colorDetail.length-1].stroke[0]*0.2,colorDetail[colorDetail.length-1].stroke[1]*0.2,colorDetail[colorDetail.length-1].stroke[2]*0.2,this.fade)
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
                    }
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
                                this.layer.triangle(c-3,d,c,d-7,c+3,d)
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
                }else if(this.attack==3454||this.attack==3459||this.attack==3460||this.attack==-1031||this.attack==-1032||this.attack==4225){
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
                }else if(this.attack==3629||this.attack==3630||this.attack==3631||this.attack==4223||this.attack==4224){
                    this.layer.noStroke()
                    switch(this.attack){
                        case 3629: case 4223: case 4224:
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
                        case 3629: case 4223: case 4224:
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
                    let rt3=constants.sqrt3
                    this.layer.strokeWeight(2)
                    switch(this.attack){
                        case 3629: case 4223: case 4224:
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
                }else if(this.attack==3753||this.attack==3754||this.attack==4048||this.attack==5992){
                    this.layer.noStroke()
                    this.layer.fill(250,this.fade*this.anim.select*0.2)
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    let bar=[]
                    switch(this.attack){
                        case 3753: case 3754:
                            bar=[170,190,215]
                        break
                        case 4048:
                            bar=[200,180,0]
                        break
                        case 5992:
                            bar=[40,200,220]
                        break
                    }
                    for(let a=0,la=20;a<la;a++){
                        this.layer.fill(bar[0]+graphics.paperball[a][0],bar[1]+graphics.paperball[a][0],bar[2]+graphics.paperball[a][0])
                        regPoly(this.layer,lsin((a+0.5)/la*360)*32.5,lcos((a+0.5)/la*360)*32.5,5,6.75,6.75,(a+0.5)/la*360)
                    }
                    for(let a=0,la=50;a<la;a++){
                        this.layer.fill(bar[0]+graphics.paperball[a][0],bar[1]+graphics.paperball[a][0],bar[2]+graphics.paperball[a][0])
                        regPoly(this.layer,lsin(a*137)*sqrt(a)*4.5,lcos(a*137)*sqrt(a)*4.5,5,6.75,6.75,graphics.paperball[a][1])
                    }
                    this.layer.fill(200,this.fade*0.2)
                    this.layer.rect(0,0,this.width+5,this.height+5,7.5)
                    this.layer.fill(240,this.fade*0.2)
                    this.layer.rect(0,0,this.width-5,this.height-5,2.5)
                    this.layer.noFill()
                }else if(this.attack==7138){
                    this.layer.fill(240,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(40,this.fade)
                    this.layer.stroke(100,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(120,this.fade)
                    this.layer.strokeWeight(3)
                    for(let a=0,la=this.width/15-1;a<la;a++){
                        this.layer.rect(-this.width/2-3+(a+1)/(la+1)*(this.width+6),0,5,this.height)
                    }
                    this.layer.noFill()
                }else if(this.attack==8717){
                    this.layer.fill(50,150,200,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(31,103,177,this.fade)
                    this.layer.stroke(26,88,162,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.fill(255,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(30)
                    this.layer.text(':(',-25,-35)
                    this.layer.textSize(10)
                    this.layer.textAlign(LEFT,CENTER)
                    this.layer.text('This card ran into a problem and needs to restart.',10,10,this.width-10)
                    this.layer.textAlign(CENTER,CENTER)
                    this.layer.textSize(4)
                    this.layer.text('EXITED WITH ERROR CODE 1',0,45)
                    this.layer.noFill()
                }else if(this.attack==8718){
                    this.layer.fill(255,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(240,this.fade)
                    this.layer.rect(0,0,this.width,this.height)
                    this.layer.image(graphics.minor[1],-this.width*0.5,-this.height*0.5,this.width,this.height)
                    this.layer.noFill()
                    this.layer.stroke(225,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
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
                    if(this.type<findName('-h Prison',types.card)){
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
                    }
                    this.layer.stroke(90,100,110,this.fade)
                    this.layer.noFill()
                }else if(this.list==-9&&variants.ultraprism&&false){
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
                }else if(this.list==-10){
                    if(this.anim.select>0){
                        this.layer.noStroke()
                        this.layer.fill(100,this.fade)
                        this.layer.rect(-this.width/4-3.75,-this.height/4-3.75,this.width/2+7.5,this.height/2+7.5,10)
                        this.layer.rect(this.width/4+3.75,this.height/4+3.75,this.width/2+7.5,this.height/2+7.5,10)
                        this.layer.fill(255,150,255,this.fade)
                        this.layer.rect(-this.width/4-3.75,this.height/4+3.75,this.width/2+7.5,this.height/2+7.5,10)
                        this.layer.rect(this.width/4+3.75,-this.height/4-3.75,this.width/2+7.5,this.height/2+7.5,10)
                        for(let a=0,la=4;a<la;a++){
                            let set=a%2
                            this.layer.fill(100+(1-set)*155,100+(1-set)*50,100+(1-set)*155,this.fade)
                            this.layer.rect(((a+1.5)/(la+2)-0.5)*this.width,-this.height/2-5,this.width/(la+2),5)
                            this.layer.fill(100+set*155,100+set*50,100+set*155,this.fade)
                            this.layer.rect(((a+1.5)/(la+2)-0.5)*this.width,this.height/2+5,this.width/(la+2),5)
                        }
                        for(let a=0,la=6;a<la;a++){
                            let set=a%2
                            this.layer.fill(100+(1-set)*155,100+(1-set)*50,100+(1-set)*155,this.fade)
                            this.layer.rect(-this.width/2-5,((a+1.5)/(la+2)-0.5)*this.height,5,this.height/(la+2))
                            this.layer.fill(100+set*155,100+set*50,100+set*155,this.fade)
                            this.layer.rect(this.width/2+5,((a+1.5)/(la+2)-0.5)*this.height,5,this.height/(la+2))
                        }
                    }
                    this.layer.fill(50,this.fade)
                    this.layer.stroke(25,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(-this.width/4,-this.height/4,this.width/2,this.height/2,5)
                    this.layer.rect(this.width/4,this.height/4,this.width/2,this.height/2,5)
                    this.layer.fill(255,0,255,this.fade)
                    this.layer.stroke(225,0,225,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(-this.width/4,this.height/4,this.width/2,this.height/2,5)
                    this.layer.rect(this.width/4,-this.height/4,this.width/2,this.height/2,5)

                    this.layer.noStroke()
                    for(let a=0,la=6;a<la;a++){
                        for(let b=0,lb=8;b<lb;b++){
                            if(a!=0&&a!=la-1||b!=0&&b!=lb-1){
                                let set=(a+b)%2
                                this.layer.fill(50+set*205,50-set*50,50+set*205,this.fade)
                                this.layer.rect(((a+0.5)/la-0.5)*this.width,((b+0.5)/lb-0.5)*this.height,this.width/la,this.height/lb)
                            }
                        }
                    }
                    for(let a=0,la=4;a<la;a++){
                        let set=a%2
                        this.layer.fill(25+(1-set)*200,25-(1-set)*50,25+(1-set)*200,this.fade)
                        this.layer.rect(((a+1.5)/(la+2)-0.5)*this.width,-this.height/2,this.width/(la+2),5)
                        this.layer.fill(25+set*200,25-set*50,25+set*200,this.fade)
                        this.layer.rect(((a+1.5)/(la+2)-0.5)*this.width,this.height/2,this.width/(la+2),5)
                    }
                    for(let a=0,la=6;a<la;a++){
                        let set=a%2
                        this.layer.fill(25+(1-set)*200,25-(1-set)*50,25+(1-set)*200,this.fade)
                        this.layer.rect(-this.width/2,((a+1.5)/(la+2)-0.5)*this.height,5,this.height/(la+2))
                        this.layer.fill(25+set*200,25-set*50,25+set*200,this.fade)
                        this.layer.rect(this.width/2,((a+1.5)/(la+2)-0.5)*this.height,5,this.height/(la+2))
                    }

                    this.layer.stroke(225,0,225,this.fade)
                    this.layer.noFill()

                    /*3x4:
                    this.layer.fill(50,this.fade)
                    this.layer.stroke(25,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,-this.height/4,this.width,this.height/2,5)
                    this.layer.fill(255,0,255,this.fade)
                    this.layer.stroke(225,0,225,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,this.height/4,this.width,this.height/2,5)

                    this.layer.noStroke()
                    this.layer.fill(225,0,225,this.fade)
                    this.layer.rect(0,-this.height/8,this.width+5,this.height/4)
                    this.layer.rect(0,-this.height*0.375-1.25,this.width/3,this.height/4+2.5)
                    this.layer.fill(255,0,255,this.fade)
                    this.layer.rect(0,-this.height/8,this.width-5,this.height/4)
                    this.layer.rect(0,-this.height*0.375+1.25,this.width/3,this.height/4-2.5)
                    this.layer.fill(25,this.fade)
                    this.layer.rect(0,this.height/8,this.width+5,this.height/4)
                    this.layer.rect(0,this.height*0.375+1.25,this.width/3,this.height/4+2.5)
                    this.layer.fill(50,this.fade)
                    this.layer.rect(0,this.height/8,this.width-5,this.height/4)
                    this.layer.rect(0,this.height*0.375-1.25,this.width/3,this.height/4-2.5)

                    this.layer.rect(0,-this.height/8,this.width/3,this.height/4)
                    this.layer.fill(255,0,255,this.fade)
                    this.layer.rect(0,this.height/8,this.width/3,this.height/4)

                    this.layer.stroke(225,0,225,this.fade)
                    this.layer.noFill()
                    */
                    
                    /*5x5:
                    this.layer.fill(100,this.fade*this.anim.select)
                    this.layer.noStroke()
                    this.layer.rect(0,0,this.width+15,this.height+15,10)
                    this.layer.fill(255,100,255,this.fade*this.anim.select)
                    this.layer.rect(0,-this.height*2/5,this.width+15,this.height/5)
                    this.layer.rect(0,0,this.width+15,this.height/5)
                    this.layer.rect(0,this.height*2/5,this.width+15,this.height/5)
                    this.layer.rect(-this.width*2/5,0,this.width/5,this.height+15)
                    this.layer.rect(0,0,this.width/5,this.height+15)
                    this.layer.rect(this.width*2/5,0,this.width/5,this.height+15)
                    this.layer.fill(50,this.fade)
                    this.layer.stroke(25,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,this.width,this.height,5)
                    this.layer.noStroke()
                    this.layer.fill(225,0,225,this.fade)
                    this.layer.rect(0,-this.height/5,this.width+5,this.height/5)
                    this.layer.rect(0,this.height/5,this.width+5,this.height/5)
                    this.layer.rect(-this.width/5,0,this.width/5,this.height+5)
                    this.layer.rect(this.width/5,0,this.width/5,this.height+5)
                    this.layer.fill(255,0,255,this.fade)
                    this.layer.rect(0,-this.height/5,this.width-5,this.height/5)
                    this.layer.rect(0,this.height/5,this.width-5,this.height/5)
                    this.layer.rect(-this.width/5,0,this.width/5,this.height-5)
                    this.layer.rect(this.width/5,0,this.width/5,this.height-5)
                    this.layer.fill(50,this.fade)
                    this.layer.rect(-this.width/5,-this.height/5,this.width/5,this.height/5)
                    this.layer.rect(this.width/5,-this.height/5,this.width/5,this.height/5)
                    this.layer.rect(-this.width/5,this.height/5,this.width/5,this.height/5)
                    this.layer.rect(this.width/5,this.height/5,this.width/5,this.height/5)
                    this.layer.stroke(100,this.fade)
                    this.layer.noFill()*/
                }else if(variants.mtg&&colorDetail.length>=2){
                    if(colorDetail.length>=4){
                        this.gradient=[new p5.LinearGradient(0,this.width-10),new p5.LinearGradient(0,this.width-10),new p5.LinearGradient(0,this.width-10)]
                        this.gradient[0].colors(0.0,
                            color(255,185,185,this.fade*this.anim.select),0.25,
                            color(255,255,185,this.fade*this.anim.select),0.5,
                            color(185,255,185,this.fade*this.anim.select),0.75,
                            color(185,185,255,this.fade*this.anim.select),1.0,
                            color(255,185,255,this.fade*this.anim.select))
                        this.gradient[1].colors(0.0,
                            color(200,65,65,this.fade),0.25,
                            color(200,200,65,this.fade),0.5,
                            color(65,200,65,this.fade),0.75,
                            color(65,65,200,this.fade),1.0,
                            color(200,65,200,this.fade))
                        this.gradient[2].colors(0.0,
                            color(255,85,85,this.fade),0.25,
                            color(255,255,85,this.fade),0.5,
                            color(85,255,85,this.fade),0.75,
                            color(85,85,255,this.fade),1.0,
                            color(255,85,255,this.fade))
                    
                        this.layer.noStroke()
                        this.layer.fill(255,185,185,this.fade*this.anim.select)
                        this.layer.rect(-20,0,this.width-25,this.height+15,10)
                        this.layer.fill(255,185,255,this.fade*this.anim.select)
                        this.layer.rect(20,0,this.width-25,this.height+15,10)

                        this.layer.translate(-this.width*0.4-4,0)
                        this.layer.fillGradient(this.gradient[0])
                        this.layer.rect(this.width*0.4+4,0,this.width-10,this.height+15)
                        this.layer.translate(this.width*0.4+4,0)

                        this.layer.strokeWeight(5)
                        this.layer.fill(255,85,85,this.fade)
                        this.layer.stroke(200,65,65,this.fade)
                        this.layer.rect(-20,0,this.width-40,this.height,5)
                        this.layer.fill(255,85,255,this.fade)
                        this.layer.stroke(200,65,200,this.fade)
                        this.layer.rect(20,0,this.width-40,this.height,5)

                        this.layer.translate(-this.width*0.4-4,0)
                        this.layer.noStroke()
                        this.layer.fillGradient(this.gradient[1])
                        this.layer.rect(this.width*0.4+4,0,this.width-10,this.height+5)
                        this.layer.fillGradient(this.gradient[2])
                        this.layer.rect(this.width*0.4+4,0,this.width-10,this.height-5)
                        this.layer.translate(this.width*0.4+4,0)

                        this.layer.stroke(200,65,65,this.fade)
                        this.layer.noFill()
                    }else{
                        this.gradient=[new p5.LinearGradient(-15,this.width*0.5-5),new p5.LinearGradient(-15,this.width*0.5-5),new p5.LinearGradient(-15,this.width*0.5-5)]
                        if(colorDetail.length==3){
                            this.gradient[0].colors(0.0,
                                color(...colorDetail[0].active,this.fade*this.anim.select),0.3,
                                color(...colorDetail[1].active,this.fade*this.anim.select),0.7,
                                color(...colorDetail[1].active,this.fade*this.anim.select),1.0,
                                color(...colorDetail[2].active,this.fade*this.anim.select))
                            this.gradient[1].colors(0.0,
                                color(...colorDetail[0].stroke,this.fade),0.3,
                                color(...colorDetail[1].stroke,this.fade),0.7,
                                color(...colorDetail[1].stroke,this.fade),1.0,
                                color(...colorDetail[2].stroke,this.fade))
                            this.gradient[2].colors(0.0,
                                color(...colorDetail[0].fill,this.fade),0.3,
                                color(...colorDetail[1].fill,this.fade),0.7,
                                color(...colorDetail[1].fill,this.fade),1.0,
                                color(...colorDetail[2].fill,this.fade))
                        }else{
                            try{
                                this.gradient[0].colors(0.0,
                                    color(...colorDetail[0].active,this.fade*this.anim.select),1.0,
                                    color(...colorDetail[1].active,this.fade*this.anim.select))
                            }catch(error){
                                print(error,this.name)
                            }
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
                        this.layer.fill(...colorDetail[colorDetail.length-1].active,this.fade*this.anim.select)
                        this.layer.rect(20,0,this.width-25,this.height+15,10)

                        this.layer.translate(-this.width*0.2-2,0)
                        this.layer.fillGradient(this.gradient[0])
                        this.layer.rect(this.width*0.2+2,0,this.width-10,this.height+15)
                        this.layer.translate(this.width*0.2+2,0)

                        this.layer.strokeWeight(5)
                        this.layer.fill(...colorDetail[0].fill,this.fade)
                        this.layer.stroke(...colorDetail[0].stroke,this.fade)
                        this.layer.rect(-20,0,this.width-40,this.height,5)
                        this.layer.fill(...colorDetail[colorDetail.length-1].fill,this.fade)
                        this.layer.stroke(...colorDetail[colorDetail.length-1].stroke,this.fade)
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
                    }
                }else{
                    try{
                        this.layer.fill(...colorDetail.active,this.fade*this.anim.select)
                        this.layer.noStroke()
                        this.layer.rect(0,0,this.width+15,this.height+15,10)
                        this.layer.fill(...colorDetail.fill,this.fade)
                        this.layer.stroke(...colorDetail.stroke,this.fade)
                        this.layer.strokeWeight(5)
                        this.layer.rect(0,0,this.width,this.height,5)
                        this.layer.noFill()
                    }catch(error){
                        print(error,this.name)
                    }
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
                    case 3:
                        this.layer.line(-this.width/2,this.height/2-15,-this.width/2+5,this.height/2-5)
                        this.layer.line(-this.width/2+15,this.height/2,-this.width/2+5,this.height/2-5)
                    break
                }
                if(spec.includes(12)){
                    if(variants.mtg&&list>=0&&colorDetail.length>=2){
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
            }
            if(variants.mtg&&list>=0&&list<=constants.playerNumber){
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
            if(variants.collection&&!this.battle.collectionManager.knownKey[this.type]){
                this.layer.stroke(255,25,25,this.fade)
                this.layer.strokeWeight(2)
                this.layer.ellipse(this.width/2-7.5,-this.height/2+7.5,5)
            }
            if(this.edition>=1&&this.edition<=9){
                if(this.width==90){
                    this.layer.image(graphics.edition[this.edition-1][0][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    if(this.battle.relicManager.hasRelic(249,this.player)&&this.edition==4){
                        this.layer.image(graphics.edition[5][0][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    }else if(this.battle.relicManager.hasRelic(249,this.player)&&this.edition==6){
                        this.layer.image(graphics.edition[3][0][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,100-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    }
                }else{
                    let graphicKey=0
                    for(let a=1,la=graphics.edition[this.edition-1].length;a<la;a++){
                        if(graphics.edition[this.edition-1][a][0]==this.width){
                            graphicKey=a
                        }
                    }
                    if(graphicKey==0){
                        setupSingleEditionGraphic(this.edition,this.width)
                        graphicKey=graphics.edition[this.edition-1].length-1
                    }
                    this.layer.image(graphics.edition[this.edition-1][graphicKey][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,300-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    if(this.battle.relicManager.hasRelic(249,this.player)&&this.edition==4){
                        this.layer.image(graphics.edition[5][graphicKey][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,300-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
                    }else if(this.battle.relicManager.hasRelic(249,this.player)&&this.edition==6){
                        this.layer.image(graphics.edition[3][graphicKey][1],-this.width/2-2.5,-this.height/2-2.5,this.width+5,this.height+5,300-this.width/2-2.5,75-this.height/2-2.5,this.width+5,this.height+5)
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
                    if(this.edition==5){
                        switch(this.color){
                            case constants.playerNumber+3:
                                this.layer.fill(51,20,20,this.fade)
                            break
                            default:
                                this.layer.fill(30,this.fade)
                            break
                        }
                    }else{
                        switch(this.color){
                            case constants.playerNumber+3:
                                this.layer.fill(255,100,100,this.fade)
                            break
                            default:
                                this.layer.fill(150,this.fade)
                            break
                        }
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
                                displayMtgManaSymbol(this.layer,this.width/2-6-pos*12.5,-this.height/2+6,a-1,0,0.6,this.fade,1,[this.anim.afford,this.anim.costDown,this.anim.costUp,totals[a]>1?totals[a]:``])
                                pos++
                            }
                        }
                        if(totals[0]>0||pos==0){
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
                    if(variants.mtg){
                        this.layer.rect(this.width/2-8,-this.height/2+7.5,12,12,2)
                        this.layer.fill(40,this.fade)
                        this.layer.ellipse(this.width/2-11,-this.height/2+4.5,2.4)
                        this.layer.ellipse(this.width/2-5,-this.height/2+10.5,2.4)
                    }else{
                        this.layer.rect(-this.width/2+10,-this.height/2+13,15,15,2)
                        this.layer.fill(40,this.fade)
                        this.layer.ellipse(-this.width/2+6.25,-this.height/2+9.25,3)
                        this.layer.ellipse(-this.width/2+13.75,-this.height/2+16.75,3)
                    }
                }else if(spec.includes(55)){
                    if(this.colorful){
                        this.layer.fill(125,this.fade)
                        this.layer.stroke(100,this.fade)
                        this.layer.strokeWeight(variants.mtg?1.6:2)
                        regStar(this.layer,variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+16,5,variants.mtg?9.6:12,variants.mtg?9.6:12,variants.mtg?3.6:4.5,variants.mtg?3.6:4.5,36)
                    }else{
                        this.layer.fill(255,255,50,this.fade)
                        this.layer.stroke(225,225,50,this.fade)
                        this.layer.strokeWeight(variants.mtg?1.6:2)
                        regStar(this.layer,variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+13,5,variants.mtg?9.6:12,variants.mtg?9.6:12,variants.mtg?3.6:4.5,variants.mtg?3.6:4.5,36)
                    }
                }else if(spec.includes(58)){
                    this.layer.translate(variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+(this.colorful?15:12))
                    this.layer.fill(255,50,50,this.fade)
                    this.layer.stroke(200,0,0,this.fade)
                    this.layer.strokeWeight(variants.mtg?1.6:2)
                    if(variants.mtg){
                        this.layer.quad(
                            0,0,
                            -3.2*constants.sqrt2,-3.2*constants.sqrt2,
                            0,-6.4*constants.sqrt2,
                            3.2*constants.sqrt2,-3.2*constants.sqrt2
                        )
                        this.layer.arc(0,0,12.8,12.8,-45,225)
                        this.layer.noStroke()
                        this.layer.ellipse(0,0,11.2)
                    }else{
                        this.layer.quad(
                            0,0,
                            -4*constants.sqrt2,-4*constants.sqrt2,
                            0,-8*constants.sqrt2,
                            4*constants.sqrt2,-4*constants.sqrt2
                        )
                        this.layer.arc(0,0,16,16,-45,225)
                        this.layer.noStroke()
                        this.layer.ellipse(0,0,14)
                    }
                    this.layer.translate(variants.mtg?-this.width/2+8:this.width/2-10,variants.mtg?this.height/2-7.5:this.height/2-(this.colorful?15:12))
                }else if(spec.includes(59)){
                    this.layer.translate(variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+12+(this.colorful?3:0))
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
                    this.layer.strokeWeight(variants.mtg?1.2:1.5)
                    this.layer.strokeJoin(ROUND)
                    regStarGear(this.layer,0,0,6,2,variants.mtg?5.4:7,variants.mtg?5.4:7,variants.mtg?7.2:9,variants.mtg?7.2:9,30)
                    this.layer.strokeJoin(MITER)
                    this.layer.noStroke()
                    if(!spec.includes(60)){
                        this.layer.fill(150,150,195,this.fade)
                    }else if(this.colorful){
                        this.layer.fill(200,this.fade)
                    }else{
                        this.layer.fill(255,150,200,this.fade)
                    }
                    this.layer.ellipse(0,0,variants.mtg?4.8:6)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.quad(variants.mtg?-1.2:-1.5,variants.mtg?-3.2:-4.25,variants.mtg?1.2:1.5,variants.mtg?-3.2:-4.25,variants.mtg?0.375:0.5,variants.mtg?-4.8:-6,variants.mtg?-0.375:-0.5,variants.mtg?-4.8:-6)
                        this.layer.rotate(120)
                    }
                    this.layer.translate(variants.mtg?-this.width/2+8:this.width/2-10,variants.mtg?this.height/2-7.5:this.height/2-12-(this.colorful?3:0))
                }else if(spec.includes(67)){
                    this.layer.translate(variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+7.5:-this.height/2+12+(this.colorful?3:0))
                    this.layer.fill(50,225,125,this.fade)
                    this.layer.stroke(25,200,100,this.fade)
                    this.layer.strokeWeight(variants.mtg?1.2:1.5)
                    this.layer.strokeJoin(ROUND)
                    regStar(this.layer,0,0,6,variants.mtg?5.4:7,variants.mtg?5.4:7,variants.mtg?8:10,variants.mtg?8:10,30)
                    this.layer.strokeJoin(MITER)
                    this.layer.noStroke()
                    this.layer.fill(125,255,175,this.fade)
                    this.layer.ellipse(0,0,variants.mtg?4.8:6)
                    regStar(this.layer,0,0,6,variants.mtg?2.4:3,variants.mtg?2.4:3,variants.mtg?4:5,variants.mtg?4:5,30)
                    this.layer.translate(variants.mtg?-this.width/2+8:this.width/2-10,variants.mtg?this.height/2-7.5:this.height/2-12-(this.colorful?3:0))
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
                    if(variants.mtg&&spec.includes(11)&&this.anim.afford>0){
                        this.layer.stroke(0,this.fade)
                        this.layer.strokeWeight(this.anim.afford)
                    }
                    this.layer.textSize(variants.mtg?10:14)
                    let effectiveCost=this.editCost(cost,1)
                    if(this.colorful){
                        this.layer.text(effectiveCost==-1?`X`:effectiveCost,variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+8:-this.height/2+16)
                    }else{
                        this.layer.text(effectiveCost==-1?`X`:effectiveCost,variants.mtg?this.width/2-8:-this.width/2+10,variants.mtg?-this.height/2+8:-this.height/2+13)
                    }
                    if(variants.mtg&&spec.includes(11)&&this.anim.afford>0){
                        this.layer.noStroke()
                    }
                }
                if(this.edition==5){
                    this.layer.fill(255,this.fade)
                }else if(this.colorful||this.attack>=3694&&this.attack<=3699){
                    this.layer.fill(240,this.fade)
                }else{
                    this.layer.fill(0,this.fade)
                }
                if(name.substr(0,2)!='-h'){
                    let effectiveName=name.replace('$colorcharacter',variants.mtg?'?':this.color==0?'Colorless':types.combatant[this.color].name)
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
                        this.layer.textSize(variants.blind||this.blind?12:10-((name.length>=22&&name.includes('Discus')||name.length>=24&&this.class==9&&name!='Sunny, Glowing\nSunlight'&&name!='Star, Showering\nStarlight')&&!name.includes('$colorcharacter')||name=='Cauchy-Riemann\nEquations'||name=='Temptation of\nthe Next World'||name=='Youmu, Phantom\nGardener'||name=='Discus of Moon\nand Sky'||name=='Discus of Truth\nand Lie'?3:0))
                        if(spec.includes(37)){
                            this.layer.text(effectiveName+":",0,variants.blind||this.blind?0:-this.height/2+15+(variants.mtg?10:0))
                        }else{
                            this.layer.text(effectiveName+(this.level>=3?`+[${this.level}]`:multiplyString('+',this.level)),0,variants.blind||this.blind?0:-this.height/2+15+(variants.mtg?10:0))
                        }
                        if(!variants.blind&&!this.blind){
                            if(this.edition==5){
                                this.layer.fill(255,255,255,this.fade)
                            }else if(this.colorful||this.attack>=3694&&this.attack<=3699){
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
                                name=='Charred\nLizard'||name=='Flame of\nNirvana'||name=='First\nQuarter'||name=='Foehn'||name=='Yukari, Boundary\nof Fantasy'||name=='Keystone\nLaunch'||name=='Hakurei\nTalisman'||name=='Hakurei\nAmulet'||name=='Shizuha, Symbol\nof Loneliness'||name=='Ran,\nScheming Fox'||name==`Flandre,\nDevil's Sister`||name=='Hina, Ward\nof Misfortune'||name=='Diamond\nRing'||name=='Clay\nRing'||name=='Shimmering\nPath'||name=='Carbon\nRing'||name=='Open\nWindow'||
                                !spec.includes(12)&&getIndicesOf(this.desc,'\n',true)>=8?6:7.5
                            )
                            if(spec.includes(12)){
                                this.layer.text(this.description(attack[0],effect[0],reality[0],target),0,variants.mtg?-6:-16)
                                if(attack[1]==6367||attack[1]==6378||attack[1]==6410){
                                    this.layer.textSize(6)
                                    this.layer.text(this.description(attack[1],effect[1],reality[1],target),0,variants.mtg?this.height/2-20:this.height/2-28)
                                }else{
                                    this.layer.text(this.description(attack[1],effect[1],reality[1],target),0,variants.mtg?this.height/2-20:this.height/2-26)
                                }
                            }else{
                                this.layer.text(this.desc,0,variants.mtg?16:10)
                            }
                            this.layer.textSize(6)
                            if(options.id){
                                this.layer.text(this.id,this.width/2-8,-this.height/2+8)
                            }
                            if(spec.includes(12)){
                                if(variants.mtg){
                                    this.layer.textAlign(LEFT,CENTER)
                                }
                                let classPos=variants.mtg?
                                    [[-this.width/2+6,-this.height/2+6],[-this.width/2+6,21]]:
                                    [[0,5],[0,this.height/2-6]]
                                for(let a=0,la=2;a<la;a++){
                                    switch(classT[a]){
                                        case -1:
                                            this.layer.text('?',...classPos[a])
                                        break
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
                                        case 13:
                                            this.layer.text('Quest',...classPos[a])
                                        break
                                        case 14:
                                            this.layer.text('Grand Quest',...classPos[a])
                                        break
                                    }
                                }
                                if(variants.mtg){
                                    this.layer.textAlign(CENTER,CENTER)
                                }
                            }else{
                                let classPos=variants.mtg?[-this.width/2+15,-this.height/2+6]:[0,this.height/2-6]
                                switch(classT){
                                    case -1:
                                        this.layer.text('?',...classPos)
                                    break
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
                                    case 13:
                                        this.layer.text('Quest',...classPos)
                                    break
                                    case 14:
                                        this.layer.text('Grand Quest',...classPos)
                                    break
                                }
                            }
                            this.layer.textSize(5)
                            if(this.battle.modded(155)){
                                switch(this.edition){
                                    case 1:
                                        if(this.battle.relicManager.hasRelic(349,this.player)){
                                            this.layer.text(`Shiny: -1(${2+2*this.battle.relicManager.active[349][this.player+1]}) Health`,0,this.height/2)
                                        }else{
                                            this.layer.text(`Shiny: -1 Health`,0,this.height/2)
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
                                    case 9:
                                        this.layer.text(`Golden: -25 Currency and Exhaust`,0,this.height/2)
                                    break
                                }
                            }else{
                                switch(this.edition){
                                    case 1:
                                        if(this.battle.relicManager.hasRelic(349,this.player)){
                                            this.layer.text(`Shiny: 1(${2+2*this.battle.relicManager.active[349][this.player+1]}) Health`,0,this.height/2)
                                        }else{
                                            this.layer.text(`Shiny: 1 Health`,0,this.height/2)
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
                                    case 9:
                                        this.layer.text(`Golden: 25 Currency and Exhaust`,0,this.height/2)
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
                        case 1: case 24: case 28: case 29: case 31: this.layer.stroke(100,255,255,this.fade*anim[a]); break
                        case 2: this.layer.stroke(255,225,0,this.fade*anim[a]); break
                        case 3: this.layer.stroke(255,100,255,this.fade*anim[a]); break
                        case 4: case 21: case 26: case 27: case 33: case 36: this.layer.stroke(255,200,200,this.fade*anim[a]); break
                        case 5: this.layer.stroke(0,150,255,this.fade*anim[a]); break
                        case 6: case 42: this.layer.stroke(200,225,255,this.fade*anim[a]); break
                        case 7: case 34: case 37: this.layer.stroke(255,255,150,this.fade*anim[a]); break
                        case 8: this.layer.stroke(200,225,50,this.fade*anim[a]); break
                        case 9: case 32: case 39: case 40: case 53: this.layer.stroke(255,125,0,this.fade*anim[a]); break
                        case 10: this.layer.stroke(255,0,50,this.fade*anim[a]); break
                        case 11: this.layer.stroke(0,150,0,this.fade*anim[a]); break
                        case 12: this.layer.stroke(100,255,200,this.fade*anim[a]); break
                        case 13: this.layer.stroke(255,150,0,this.fade*anim[a]); break
                        case 14: this.layer.stroke(200,255,100,this.fade*anim[a]); break
                        case 15: case 35: this.layer.stroke(200,255,200,this.fade*anim[a]); break
                        case 16: case 25: this.layer.stroke(255,125,50,this.fade*anim[a]); break
                        case 17: this.layer.stroke(200,0,50,this.fade*anim[a]); break
                        case 18: this.layer.stroke(120,135,150,this.fade*anim[a]); break
                        case 19: this.layer.stroke(150,135,120,this.fade*anim[a]); break
                        case 20: this.layer.stroke(175,0,50,this.fade*anim[a]); break
                        case 22: case 30: this.layer.stroke(240,this.fade*anim[a]); break
                        case 38: this.layer.stroke(25,225,175,this.fade*anim[a]); break
                        case 41: this.layer.stroke(255,175,255,this.fade*anim[a]); break
                    }
                    this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                    switch(a){
                        case 21: case 23: case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31:
                        case 32: case 33: case 34: case 35: case 37: case 39: case 40: case 42:
                            switch(a){
                                case 21: case 23: case 24:
                                    this.layer.stroke(220,this.fade*anim[a])
                                break
                                case 25: case 26:
                                    this.layer.stroke(255,255,100,this.fade*anim[a])
                                break
                                case 27:
                                    this.layer.stroke(0,0,100,this.fade*anim[a])
                                break
                                case 28:
                                    this.layer.stroke(50,255,50,this.fade*anim[a])
                                break
                                case 29:
                                    this.layer.stroke(150,255,50,this.fade*anim[a])
                                break
                                case 30:
                                    this.layer.stroke(120,this.fade*anim[a])
                                break
                                case 31:
                                    this.layer.stroke(200,255,100,this.fade*anim[a])
                                break
                                case 32:
                                    this.layer.stroke(255,255,150,this.fade*anim[a])
                                break
                                case 33:
                                    this.layer.stroke(100,0,100,this.fade*anim[a])
                                break
                                case 34:
                                    this.layer.stroke(150,255,255,this.fade*anim[a])
                                break
                                case 35:
                                    this.layer.stroke(50,175,50,this.fade*anim[a])
                                break
                                case 36:
                                    this.layer.stroke(100,255,100,this.fade*anim[a])
                                break
                                case 37:
                                    this.layer.stroke(150,255,150,this.fade*anim[a])
                                break
                                case 39:
                                    this.layer.stroke(175,255,255,this.fade*anim[a])
                                break
                                case 40:
                                    this.layer.stroke(255,175,255,this.fade*anim[a])
                                break
                                case 42:
                                    this.layer.stroke(200,225,50,this.fade*anim[a])
                                break
                            }
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
        if(this.player<0||stage.scene!='battle'){
            return effectiveCost
        }
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        let costChange=0
        if(!this.nonCalc){
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
            if(userCombatant.getStatus('Combo Cost Down')>0&&this.spec.includes(11)){
                costChange-=userCombatant.getStatus('Combo Cost Down')
            }
            if(userCombatant.getStatus('All Cost Down')>0){
                costChange-=userCombatant.getStatus('All Cost Down')
            }
            if(userCombatant.getStatus('Defense Cost Down')>0&&(type==2?args[0]:this.class)==2){
                costChange-=userCombatant.getStatus('Defense Cost Down')
            }
            if(userCombatant.getStatus('All Cost Up')>0){
                costChange+=userCombatant.getStatus('All Cost Up')
            }
            if(userCombatant.getStatus('Blueprint Cost Down')>0&&(type==2?args[0]:this.class)==7){
                costChange-=userCombatant.getStatus('Blueprint Cost Down')
            }
            if(userCombatant.getStatus('Power Cost Up')>0&&(type==2?args[0]:this.class)==4){
                costChange+=userCombatant.getStatus('Power Cost Up')
            }
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
        if(type==1&&!this.nonCalc){
            if(
                userCombatant.getStatus('Free Card')>0&&this.class!=13||
                userCombatant.getStatus('Free 1 Cost Card')>0&&this.getCost([0])==1||
                (userCombatant.getStatus('Free Attack')>0||userCombatant.getStatus('Cycle Attack')>0)&&this.class==1||
                (userCombatant.getStatus('Free Defense')>0||userCombatant.getStatus('Cycle Defense')>0)&&this.class==2||
                (userCombatant.getStatus('Free Movement')>0||userCombatant.getStatus('Cycle Movement')>0)&&this.class==3||
                userCombatant.getStatus('Cycle Power')>0&&this.class==4||
                (userCombatant.getStatus('Free Skill')>0||userCombatant.getStatus('Cycle Skill')>0)&&this.class==11||
                userCombatant.getStatus('Temporary Free Non-Rare Colorless')>0&&this.colorless()&&this.rarity!=2||
                userCombatant.getStatus('Free Defenses')>0&&(this.class==2||this.spec.includes(12)&&this.class[0]==2&&this.class[1]==2)||
                userCombatant.getStatus('Free Cables')>0&&this.name.includes('Cable')&&this.class==1||
                userCombatant.getStatus('Free Minerals')>0&&this.spec.includes(52)
            ){
                effectiveCost=variants.mtg?[]:0
            }
        }
        return effectiveCost
    }
    colorless(){
        return this.color==0&&!this.colorful&&!(this.list==-9&&variants.ultraprism)&&
            this.attack!=1328&&this.attack!=1330&&this.attack!=1393&&this.attack!=1615&&this.attack!=2064&&this.attack!=3454&&this.attack!=3459&&this.attack!=3460&&this.attack!=-1031&&this.attack!=-1032&&
            this.attack!=4225&&this.attack!=3629&&this.attack!=3630&&this.attack!=3631&&!(this.attack>=3694&&this.attack<=3699)&&this.attack!=3753&&this.attack!=3754&&this.attack!=4048&&this.attack!=4223&&
            this.attack!=4224&&this.attack!=5992&&this.attack!=8717&&this.attack!=8718&&this.list!=-8
    }
    getBasic(cardClass){
        return this.basic&&(this.class==cardClass||cardClass==-1)||this.attack==5045&&(cardClass==1||cardClass==2||cardClass==-1)||(this.attack==6928||this.attack==7128||this.attack==7129)&&(cardClass==1||cardClass==-1)
    }
    getBasicMultiple(cardClasses){
        return this.basic&&cardClasses.includes(this.class)||this.attack==5045&&(cardClasses.includes(1)||cardClasses.includes(2))||(this.attack==6928||this.attack==7128||this.attack==7129)&&cardClasses.includes(1)
    }
    free(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        return userCombatant.getStatus('Free Card')>0&&this.class!=13||
            userCombatant.getStatus('Free 1 Cost Card')>0&&this.getCost([0])==1||
            (userCombatant.getStatus('Free Attack')>0||userCombatant.getStatus('Cycle Attack')>0)&&this.class==1||
            (userCombatant.getStatus('Free Defense')>0||userCombatant.getStatus('Cycle Defense')>0)&&this.class==2||
            (userCombatant.getStatus('Free Movement')>0||userCombatant.getStatus('Cycle Movement')>0)&&this.class==3||
            userCombatant.getStatus('Cycle Power')>0&&this.class==4||
            (userCombatant.getStatus('Free Skill')>0||userCombatant.getStatus('Cycle Skill')>0)&&this.class==11||
            userCombatant.getStatus('Temporary Free Non-Rare Colorless')>0&&this.colorless()&&this.rarity!=2||
            userCombatant.getStatus('Free Defenses')>0&&(this.class==2||this.spec.includes(12)&&this.class[0]==2&&this.class[1]==2)||
            userCombatant.getStatus('Free Cables')>0&&this.name.includes('Cable')&&this.class==1||
            userCombatant.getStatus('Free Minerals')>0&&this.spec.includes(52)||
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
                let effectiveEnergy=copyArray(this.battle.getSplitEnergy(this.player))
                if(this.spec.includes(35)&&userCombatant.getStatus('Double Countdowns')>0){
                    for(let a=0,la=effectiveEnergy.length;a<la;a++){
                        effectiveEnergy[a]*=2
                    }
                }
                energyPay=mtgAutoCost(effectiveEnergy,cost,0,[],false)!=-1
            }

            this.energyAfford=this.free()||
                energyPay&&!this.spec.includes(11)&&!this.spec.includes(21)&&!this.spec.includes(40)&&!this.spec.includes(59)&&!this.spec.includes(67)||
                this.battle.combatantManager.combatants[this.player].combo>=cost&&this.spec.includes(11)||
                this.battle.combatantManager.combatants[this.player].metal>=cost&&this.spec.includes(21)||
                this.battle.combatantManager.combatants[this.player].getStatus('Twos')>=cost&&this.spec.includes(40)||
                this.battle.combatantManager.combatants[this.player].wish>=cost&&this.spec.includes(59)||
                cost==0&&this.spec.includes(67)||
                variants.overheat
            
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
        this.anim.costDown=smoothAnim(this.anim.costDown,this.costDownTrigger||this.baseCostDownTrigger,0,1,5)
        this.anim.costUp=smoothAnim(this.anim.costUp,this.costUpTrigger||this.baseCostUpTrigger,0,1,5)
        this.width=90
        if(this.spec.includes(33)){
            this.width+=diff=='hand'?100:0
        }
        if(this.spec.includes(66)){
            this.width+=diff=='hand'?300:0
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
            if(this.battle.modded(87)&&!this.upped[0]&&(variants.mtg&&!arrayCompareLoose(this.color,this.battle.player[this.player])||!variants.mtg&&this.color!=this.battle.player[this.player])){
                this.costUp(0,[1])
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