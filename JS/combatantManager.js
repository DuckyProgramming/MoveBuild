class combatantManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.id=0

        this.combatants=[]
        this.bank=[]
        this.bankHP=[]
        this.playerCombatantIndex=[]
        this.sorted=[]

        this.rewriterSwitch=0
    }
    assignPlayer(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0&&!this.combatants[a].construct){
                this.playerCombatantIndex[this.combatants[a].id]=a
            }
        }
    }
    clearCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            delete this.combatants[a]
            this.combatants.splice(a,1)
            a--
            la--
        }
        this.combatants=[]
        this.battle.turnManager.turns=[]
        this.battle.turnManager.turnsBack=[]
    }
    resetCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0||this.combatants[a].construct||this.combatants[a].support){
                switch(this.combatants[a].name){
                    case 'Lira':
                        delete graphics.combatant[0]
                        graphics.combatant.splice(0,1,-1)
                    break
                    case 'Sakura':
                        delete graphics.combatant[1]
                        graphics.combatant.splice(1,1,-1)
                    break
                    case 'Certes':
                        delete graphics.combatant[2]
                        graphics.combatant.splice(2,1,-1)
                    break
                    case 'Setsuna':
                        delete graphics.combatant[3]
                        graphics.combatant.splice(3,1,-1)
                    break
                    case 'Airi':
                        delete graphics.combatant[4]
                        graphics.combatant.splice(4,1,-1)
                    break
                    case 'Shiru':
                        delete graphics.combatant[5]
                        graphics.combatant.splice(5,1,-1)
                    break
                    case 'Daiyousei':
                        delete graphics.combatant[6]
                        graphics.combatant.splice(6,1,-1)
                    break
                    case 'Sanae':
                        delete graphics.combatant[7]
                        graphics.combatant.splice(7,1,-1)
                    break
                }
                delete this.combatants[a]
                this.combatants.splice(a,1)
                a--
                la--
            }else{
                this.combatants[a].reset()
            }
        }
        this.battle.tileManager.activate()
        this.reID()
    }
    resetCombatantsAnim(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].life>0){
                this.combatants[a].resetAnim()
            }
        }
    }
    reID(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            this.combatants[a].id=a
            this.bankHP.push(this.combatants[a].life)
        }
        this.assignPlayer()
        this.sort()
        this.id=this.combatants.length
    }
    setupCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0||this.combatants[a].construct){
                this.combatants[a].setIntent(0)
            }else{
                this.combatants[a].endBlock()
            }
        }
        this.assignPlayer()
    }
    enableCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct)&&this.combatants[a].life>0){
                this.combatants[a].endBlock()
            }
        }
    }
    unmoveCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct)&&this.combatants[a].life>0){
                this.combatants[a].moved=false
                this.combatants[a].activated=types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==2||types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==4||types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==5
            }
        }
    }
    setTargets(){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0&&!this.combatants[a].construct&&this.combatants[a].life>0){
                list.push(a)
            }
        }
        if(list==[]){
            list.push(0)
        }
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct)){
                let minimum=1000
                for(let b=0,lb=list.length;b<lb;b++){
                    minimum=min(minimum,dist(this.combatants[a].relativePosition.x,this.combatants[a].relativePosition.y,this.combatants[list[b]].relativePosition.x,this.combatants[list[b]].relativePosition.y))
                }
                let available=[]
                for(let b=0,lb=list.length;b<lb;b++){
                    if(dist(this.combatants[a].relativePosition.x,this.combatants[a].relativePosition.y,this.combatants[list[b]].relativePosition.x,this.combatants[list[b]].relativePosition.y)<minimum+100){
                        available.push(list[b])
                    }
                }
                if(available.length>0){
                    this.combatants[a].target=available[floor(random(0,available.length))]
                }
            }
        }
    }
    setSpecificTarget(id){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0&&!this.combatants[a].construct&&this.combatants[a].life>0){
                list.push(a)
            }
        }
        if(list==[]){
            list.push(0)
        }
        this.combatants[id].target=list[floor(random(0,list.length))]
    }
    bossHeal(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0){
                this.combatants[a].healLifable(game.ascend>=5?(this.combatants[a].base.life-this.combatants[a].life)*0.75:(this.combatants[a].base.life-this.combatants[a].life))
            }
        }
    }
    equalize(){
        let maximum=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                maximum=max(maximum,this.combatants[a].base.life)
            }
        }
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].base.life<maximum&&this.combatants[a].team==0){
                this.combatants[a].gainMaxHP(maximum-this.combatants[a].base.life)
            }
        }
    }
    activateCombatants(type,id){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct)&&this.combatants[a].life>0){
                this.combatants[a].activate(type,id)
            }
        }
    }
    targetCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct)&&this.combatants[a].life>0){
                this.combatants[a].markTarget()
            }
            if((this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==22||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53)&&
            this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team||(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)&&
            !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
            !(this.battle.attackManager.targetInfo[0]==22&&this.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
            (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||
            (this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)){
                if(this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y){
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].indescriptTarget(0,numeralizeDirection(0))
                }else{
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].target(0,numeralizeDirection(0,directionCombatant(this.combatants[a],this.combatants[this.battle.attackManager.user])))
                }
            }
            if((this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==48||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53)&&
            this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team||this.battle.attackManager.targetInfo[0]==10&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)&&
            !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
            !(this.battle.attackManager.targetInfo[0]==48&&this.combatants[a].tilePosition.y-this.combatants[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
            (legalTargetDiagonalCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||
            (this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)){
                if(this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y){
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].indescriptTarget(0,numeralizeDirection(0))
                }else{
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].target(0,numeralizeDirection(0,directionCombatant(this.combatants[a],this.combatants[this.battle.attackManager.user])))
                }
            }
            if((this.battle.attackManager.targetInfo[0]==28||this.battle.attackManager.targetInfo[0]==29)&&
            this.combatants[a].life>0&&this.combatants[a].team==this.combatants[this.battle.attackManager.user].team&&this.combatants[a].construct&&
            !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
            (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==28)){
                if(this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y){
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].indescriptTarget(0,numeralizeDirection(0))
                }else{
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].target(0,numeralizeDirection(0,directionCombatant(this.combatants[a],this.combatants[this.battle.attackManager.user])))
                }
            }
            if((this.battle.attackManager.targetInfo[0]==30)&&
            this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team||(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)&&
            !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
            !(this.battle.attackManager.targetInfo[0]==22&&this.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
            (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[4],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||
            (this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)){
                if(this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y){
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].indescriptTarget(0,numeralizeDirection(0))
                }else{
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].target(0,numeralizeDirection(0,directionCombatant(this.combatants[a],this.combatants[this.battle.attackManager.user])))
                }
            }
            if((this.battle.attackManager.targetInfo[0]==35||this.battle.attackManager.targetInfo[0]==36)&&
            this.combatants[a].life>0&&
            !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
            this.combatants[a].name==this.battle.attackManager.targetInfo[1]&&
            (legalTargetCombatant(0,this.battle.attackManager.targetInfo[2],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[3],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==36||
            (this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)){
                if(this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y){
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].indescriptTarget(0,numeralizeDirection(0))
                }else{
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].target(0,numeralizeDirection(0,directionCombatant(this.combatants[a],this.combatants[this.battle.attackManager.user])))
                }
            }
            if(this.battle.attackManager.targetInfo[0]==45&&this.combatants[a].life>0){
                if(this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y){
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].indescriptTarget(0,numeralizeDirection(0))
                }else{
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].target(0,numeralizeDirection(0,directionCombatant(this.combatants[a],this.combatants[this.battle.attackManager.user])))
                }
            }
            if((this.battle.attackManager.targetInfo[0]==46)&&
            this.combatants[a].life>0&&
            !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
            (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||
            legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.attackManager.player)].ammo>0)){
                if(this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y){
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].indescriptTarget(0,numeralizeDirection(0))
                }else{
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].target(0,numeralizeDirection(0,directionCombatant(this.combatants[a],this.combatants[this.battle.attackManager.user])))
                }
            }
        }
    }
    deTargetCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0&&this.combatants[a].tilePosition.x==-1&&this.combatants[a].tilePosition.y==-1){
                this.combatants[a].deTarget()
            }
        }
    }
    clearBlockCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0){
                this.combatants[a].block=0
            }
        }
    }
    clearStatusCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0){
                this.combatants[a].clearStatus()
            }
        }
    }
    randomizeCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].goal.anim.direction=-150+floor(random(0,6))*60
                this.combatants[a].activated=true
            }
        }
        this.battle.updateTargetting()
    }
    randomEnemyEffect(effect,args){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                list.push(a)
            }
        }
        if(list.length>0){
            let index=list[floor(random(0,list.length))]
            switch(effect){
                case 0:
                    this.combatants[index].takeDamage(args[0],-1)
                break
                case 1:
                    this.combatants[index].takeDamage(args[0],-1)
                    this.combatants[index].statusEffect('Weak',args[1])
                break
                case 2:
                    this.combatants[index].takeDamage(args[0],-1)
                    return this.combatants[index].life<=0
                case 3:
                    this.combatants[index].takeDamage(args[0],args[1])
                break
                case 4:
                    this.combatants[index].statusEffect('Jinx',args[0])
                break
                case 5:
                    this.combatants[index].addBlock(args[0])
                break
                case 6:
                    this.combatants[index].statusEffect('Strength',args[0])
                break
                case 7:
                    for(let a=0,la=args[1];a<la;a++){
                        this.combatants[index].takeDamage(args[0],-1)
                    }
                break
                case 8:
                    this.combatants[index].takeDamage(args[0],-1)
                    this.combatants[index].statusEffect('Vulnerable',args[1])
                break
            }
        }
    }
    randomPlayerEffect(effect,args){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0&&this.combatants[a].life>0){
                list.push(a)
            }
        }
        if(list.length>0){
            let index=list[floor(random(0,list.length))]
            switch(effect){
                case 0:
                    this.combatants[index].takeDamage(args[0],-1)
                break
            }
        }
    }
    randomAnyEffect(effect,args){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].life>0){
                list.push(a)
            }
        }
        if(list.length>0){
            let index=list[floor(random(0,list.length))]
            switch(effect){
                case 0:
                    this.combatants[index].takeDamage(args[0],-1)
                break
                case 1:
                    this.combatants[index].takeDamage(args[0],-1)
                    return this.combatants[index].life<=0
            }
        }
    }
    hasDupe(name){
        let total=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].name==name&&(this.combatants[a].team==0||this.combatants[a].construct)){
                total++
            }
        }
        return total>=2
    }
    killDupes(){
        let names=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct)&&this.combatants[a].life>0){
                if(names.includes(this.combatants[a].name)){
                    this.combatants[a].life=0
                }else{
                    names.push(this.combatants[a].name)
                }
            }
        }
    }
    statusDupes(name,value){
        let names=[]
        let numbers=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct)&&this.combatants[a].life>0){
                if(names.includes(this.combatants[a].name)){
                    numbers[names.indexOf(this.combatants[a].name)]++
                }else{
                    names.push(this.combatants[a].name)
                    numbers.push(1)
                }
            }
        }
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0||this.combatants[a].construct){
                if(names.includes(this.combatants[a].name)&&numbers[names.indexOf(this.combatants[a].name)]>=2){
                    this.combatants[a].statusEffect(name,value)
                }
            }
        }
    }
    multiplyStatus(name,multiplier){
        this.combatants.forEach(combatant=>combatant.multiplyStatus(name,multiplier))
    }
    dead(){
        this.combatants.forEach(combatant=>combatant.anotherDead())
    }
    summonCombatant(tilePosition,type,direction){
        let list=[]
        for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
            let length=distTargetCombatant(0,{tilePosition:tilePosition},this.battle.tileManager.tiles[a])
            if(length<=1&&length>=0&&this.battle.tileManager.tiles[a].occupied==0){
                list.push(a)
            }
        }
        if(list.length==0){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                let length=distTargetCombatant(0,{tilePosition:tilePosition},this.battle.tileManager.tiles[a])
                if(length==2&&this.battle.tileManager.tiles[a].occupied==0){
                    list.push(a)
                }
            }
        }
        if(list.length>0){
            let tile=this.battle.tileManager.tiles[list[floor(random(0,list.length))]]
            this.addCombatant(tile.position.x,tile.position.y,tile.relativePosition.x,tile.relativePosition.y,tile.tilePosition.x,tile.tilePosition.y,type,0,direction,false)
            if(this.battle.modded(73)){
                this.combatants[this.combatants.length-1].life*=1.5
                this.combatants[this.combatants.length-1].base.life*=1.5
                this.combatants[this.combatants.length-1].collect.life*=1.5
            }
            this.battle.tileManager.activate()
            this.battle.updateTargetting()
            this.battle.counter.enemy++
        }
    }
    summonConstruct(tilePosition,type,team,direction,builder){
        let index=this.battle.tileManager.getTileIndex(tilePosition.x,tilePosition.y)
        if(index>=0){
            let tile=this.battle.tileManager.tiles[index]
            this.addCombatantConstruct(tile.position.x,tile.position.y,tile.relativePosition.x,tile.relativePosition.y,tile.tilePosition.x,tile.tilePosition.y,type,team,direction,false,builder)
            this.battle.updateTargetting()
            this.battle.tileManager.activate()
        }
    }
    summonCombatantDefinite(tilePosition,type,direction){
        let index=this.battle.tileManager.getTileIndex(tilePosition.x,tilePosition.y)
        if(index>=0){
            let tile=this.battle.tileManager.tiles[index]
            this.addCombatant(tile.position.x,tile.position.y,tile.relativePosition.x,tile.relativePosition.y,tile.tilePosition.x,tile.tilePosition.y,type,0,direction,false)
            this.battle.updateTargetting()
            this.battle.tileManager.activate()
            this.battle.counter.enemy++
        }
    }
    summonConstructRandom(tilePosition,type,team,direction,builder){
        let list=[]
        for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
            let length=distTargetCombatant(0,{tilePosition:tilePosition},this.battle.tileManager.tiles[a])
            if(length<=1&&length>=0&&this.battle.tileManager.tiles[a].occupied==0){
                list.push(a)
            }
        }
        if(list.length>0){
            let tile=this.battle.tileManager.tiles[list[floor(random(0,list.length))]]
            this.addCombatantConstruct(tile.position.x,tile.position.y,tile.relativePosition.x,tile.relativePosition.y,tile.tilePosition.x,tile.tilePosition.y,type,team,direction,false,builder)
            this.battle.updateTargetting()
            this.battle.tileManager.activate()
        }
    }
    allEffect(effect,args){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                switch(effect){
                    case 1:
                        this.combatants[a].life*=args[0]
                    break
                    case 2:
                        this.combatants[a].life=args[0]
                    break
                    case 3:
                        this.combatants[a].statusEffect('Strength',args[0])
                    break
                    case 4:
                        this.combatants[a].statusEffect('Counter All',args[0])
                    break
                    case 5:
                        this.combatants[a].life*=args[0]
                        this.combatants[a].base.life*=args[0]
                    break
                    case 6:
                        this.combatants[a].addBlock(args[0])
                    break
                    case 7:
                        this.combatants[a].heal(args[0])
                    break
                    case 8:
                        this.combatants[a].statusEffect('Dexterity',args[0])
                    break
                    case 9:
                        this.combatants[a].statusEffect('Retain Block',args[0])
                    break
                    case 10:
                        if(this.combatants[a].name==args[1]){
                            this.combatants[a].heal(args[0])
                        }
                    break
                    case 11:
                        this.combatants[a].statusEffect('Regeneration',args[0])
                    break
                    case 12:
                        this.combatants[a].statusEffect('Buffer',args[0])
                    break
                    case 13:
                        this.combatants[a].statusEffect('Armor',args[0])
                    break
                    case 14:
                        this.combatants[a].statusEffect('Confusion',args[0])
                    break
                    case 15:
                        this.combatants[a].takeDamage(args[0],-1)
                        this.combatants[a].statusEffect('Burn',args[1])
                    break
                    case 16:
                        this.combatants[a].statusEffect('Vulnerable',args[0])
                    break
                    case 17:
                        if(this.combatants[a].team==0){
                            this.combatants[a].life=0
                        }
                    break
                    case 18:
                        if(this.combatants[a].team==0&&this.combatants[a].id!=args[0]){
                            this.battle.turnManager.loadEnemyRotate(a)
                            this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,a,false))
                            this.battle.turnManager.turns[this.battle.turnManager.turns.length-1].target=[args[0]]
                            this.battle.turnManager.turns[this.battle.turnManager.turns.length-1].auxiliary=true
                            this.battle.turnManager.loadEnemyAttack(a)
                        }
                    break
                    case 19:
                        this.combatants[a].takeDamage(args[0],-1)
                    break
                    case 20:
                        if(this.combatants[a].life>0){
                            this.combatants[a].statusEffect('Cannot Die',args[0])
                        }
                    break
                    case 21:
                        this.combatants[a].statusEffect('Invisible',args[0])
                    break
                    case 22:
                        this.combatants[a].statusEffect('Wet',args[0])
                    break
                    case 23:
                        this.combatants[a].takeDamage(args[0],-1)
                        this.combatants[a].statusEffect('Freeze',args[1])
                    break
                    case 24:
                        this.combatants[a].life*=args[0]
                        this.combatants[a].base.life*=args[0]
                        this.combatants[a].collect.life*=args[0]
                    break
                    case 25:
                        this.combatants[a].statusEffect('Fragile Heal',args[0])
                    break
                    case 26:
                        this.combatants[a].pareidolia()
                    break
                    case 27:
                        this.combatants[a].statusEffect('Speed Up',args[0])
                    break
                    case 28:
                        if(this.combatants[a].life<this.combatants[a].base.life){
                            this.combatants[a].statusEffect('Jinx',args[0])
                        }
                    break
                    case 29:
                        this.combatants[a].statusEffect('Double Damage Turn',args[0])
                    break
                    case 30:
                        this.combatants[a].statusEffect('Weak',args[0])
                    break
                    case 31:
                        if(this.combatants[a].name==args[0]&&this.combatants[a].id!=args[2]){
                            this.combatants[a].takeDamage(args[1],-1)
                        }
                    break
                    case 32:
                        if(this.combatants[a].name==args[0]&&this.combatants[a].id!=args[1]){
                            this.combatants[a].life=0
                        }
                    break
                    case 33:
                        this.combatants[a].removeAllStatuses([0,2])
                    break
                    case 34:
                        this.combatants[a].statusEffect('Freeze',args[0])
                    break
                    case 35:
                        this.combatants[a].statusEffect(['Burn','Freeze','Shock'][floor(random(0,3))],args[0])
                    break
                    case 36:
                        this.combatants[a].statusEffect('Dodge',args[0])
                    break
                    case 37:
                        this.combatants[a].statusEffect('Strength',args[0])
                        this.combatants[a].statusEffect('Dexterity',args[1])
                    break
                    case 38:
                        this.combatants[a].statusEffect('Double Damage',args[0])
                    break
                }
            }
        }
    }
    fullAllEffect(effect,args){
        for(let a=0,la=this.combatants.length;a<la;a++){
            switch(effect){
                case 1:
                    this.combatants[a].heal(args[0])
                break
                case 2:
                    this.combatants[a].statusEffect('Burn',args[0])
                break
                case 3:
                    this.combatants[a].statusEffect('Poison',args[0])
                break
                case 4:
                    if(this.combatants[a].id!=args[1]){
                        this.combatants[a].statusEffect('Poison',args[0])
                    }
                break
                case 5:
                    this.combatants[a].life=args[0]
                break
                case 6:
                    this.combatants[a].statusEffect('Miss',args[0])
                break
                case 7:
                    this.combatants[a].statusEffect('Weak',args[0])
                break
                case 8:
                    this.combatants[a].statusEffect('Freeze',args[0])
                break
                case 9:
                    this.combatants[a].statusEffect('Cannot Move',args[0])
                break
                
            }
        }
    }
    randomEffect(effect,args){
        if(this.combatants.length>0){
            let list=[]
            for(let a=0,la=this.combatants.length;a<la;a++){
                if(this.combatants[a].team==0&&this.combatants[a].life>0){
                    list.push(a)
                }
            }
            if(list.length>0){
                let index=list[floor(random(0,list.length))]
                switch(effect){
                    case 0:
                        this.combatants[index].baseDuplicate()
                    break
                    case 1:
                        this.combatants[index].statusEffect('Stun',args[0])
                    break
                }
            }
        }
    }
    killAll(name){
        let total=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].name==name){
                total+=this.combatants[a].life
                this.combatants[a].life=0
            }
        }
        return total
    }
    addCombatant(x,y,relativeX,relativeY,tileX,tileY,type,team,direction,minion){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30,minion))
        if(this.id<this.battle.players){
            this.playerCombatantIndex[this.id]=this.combatants.length-1
        }
        this.setSpecificTarget(this.combatants.length-1)
        this.id++
        this.sort()
        this.reorder()
    }
    addCombatantSupport(x,y,relativeX,relativeY,tileX,tileY,type,team,direction,minion){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30,minion))
        this.combatants[this.combatants.length-1].support=true
        if(this.id<this.battle.players){
            this.playerCombatantIndex[this.id]=this.combatants.length-1
        }
        this.id++
        this.sort()
        this.reorder()
    }
    addCombatantConstruct(x,y,relativeX,relativeY,tileX,tileY,type,team,direction,minion,builder){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30,minion))
        this.combatants[this.combatants.length-1].construct=true
        this.combatants[this.combatants.length-1].builder=builder
        this.combatants[this.combatants.length-1].activated=
            types.attack[this.combatants[this.combatants.length-1].attack[this.combatants[this.combatants.length-1].intent].type].class==2||
            types.attack[this.combatants[this.combatants.length-1].attack[this.combatants[this.combatants.length-1].intent].type].class==4||
            types.attack[this.combatants[this.combatants.length-1].attack[this.combatants[this.combatants.length-1].intent].type].class==5
        if(this.combatants[this.combatants.length-1].spec.includes(17)){
            this.combatants[this.combatants.length-1].autoAim()
        }
        if(!options.oldUnbuild&&this.combatants[this.combatants.length-1].move.speed==0&&this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players){
            if(this.battle.cardManagers[this.battle.turn.main].hand.cardNumber('Unbuild')==0){
                this.battle.cardManagers[this.battle.turn.main].hand.add(findName('Unbuild',types.card),0,0)
            }
        }
        if(this.id<this.battle.players){
            this.playerCombatantIndex[this.id]=this.combatants.length-1
        }
        this.setSpecificTarget(this.combatants.length-1)
        this.id++
        this.sort()
        this.reorder()
        this.battle.updateTargetting()
    }
    constructAlive(team){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].construct&&this.combatants[a].team==team&&this.combatants[a].move.speed==0&&this.combatants[a].life>0){
                return true
            }
        }
        return false
    }
    getCombatantIndex(tileX,tileY){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].tilePosition.x==tileX&&this.combatants[a].tilePosition.y==tileY&&this.combatants[a].life>0){
                return a
            }
        }
        return -1
    }
    getCombatantIndexBarrier(tileX,tileY){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].tilePosition.x==tileX&&this.combatants[a].tilePosition.y==tileY&&(this.combatants[a].life>0||this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support)){
                return a
            }
        }
        return -1
    }
    resetIntents(type){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==type){
                this.combatants[a].intent=floor(random(0,this.combatants[a].attack.length))
            }
        }
        this.battle.updateTargetting()
    }
    playCard(){
        this.combatants.forEach(combatant=>combatant.playCard())
    }
    playCardFront(cardClass){
        this.combatants.forEach(combatant=>combatant.playCardFront(cardClass))
    }
    getRandomNonplayerCombatantIndex(){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                list.push(a)
            }
        }
        return list.length>0?list[floor(random(0,list.length))]:-1
    }
    getPlayerCombatantIndex(id){
        return this.playerCombatantIndex[id]
    }
    getCombatant(id){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].id==id){
                return this.combatants[a]
            }
        }
    }
    proxyCombatants(){
        try{
            this.bank=[]
            for(let a=0,la=this.combatants.length;a<la;a++){
                if(this.combatants[a].life>0){
                    this.bank.push(this.combatants[a])
                    if(this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support){
                        this.combatants.splice(a,1,new combatant(this.layer,this.battle,this.combatants[a].position.x,this.combatants[a].position.y,this.combatants[a].relativePosition.x,this.combatants[a].relativePosition.y,this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y,this.combatants[a].type,this.combatants[a].team,this.combatants[a].id,this.combatants[a].goal.anim.direction,this.combatants[a].minion))
                        this.combatants[a].life=this.bankHP[a]
                    }else{
                        this.combatants.splice(a,1)
                    }
                }
            }
        }catch(error){
            stage.scene='battle'
        }
    }
    deproxyCombatants(){
        this.combatants=[]
        for(let a=0,la=this.bank.length;a<la;a++){
            if(this.bank[a].life>0){
                this.combatants.push(this.bank[a])
                this.bank.splice(a,1)
                a--
                la--
            }
        }
    }
    recount(){
        this.bank=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(!this.combatants[a].construct){
                this.bank.push(this.combatants[a])
                this.combatants.splice(a,1)
                a--
                la--
            }
        }
        let id=0
        while(this.bank.length>0){
            let minimum=64
            for(let a=0,la=this.bank.length;a<la;a++){
                minimum=min(minimum,(this.bank[a].team+63)%64)
            }
            for(let a=0,la=this.bank.length;a<la;a++){
                if((this.bank[a].team+63)%64==minimum){
                    this.bank[a].id=id
                    id++
                    this.combatants.push(this.bank[a])
                    this.bank.splice(a,1)
                    a--
                    la--
                }
            }
        }
        this.bank=[]
        this.assignPlayer()
    }
    damageArea(damage,user,team,tilePosition,spec){
        let total=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].team!=team&&distance>=0&&distance<=1||this.battle.modded(121)){
                this.combatants[a].takeDamage(damage,user,spec)
                total++
            }
        }
        return total
    }
    damageArea2(damage,user,team,tilePosition,spec){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].team!=team&&distance>=0&&distance<=2||this.battle.modded(121)){
                this.combatants[a].takeDamage(damage,user,spec)
            }
        }
    }
    damageAreaID(damage,user,id,tilePosition,spec){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&distance>=0&&distance<=1||this.battle.modded(121)){
                this.combatants[a].takeDamage(damage,user,spec)
            }
        }
    }
    damageAreaRuleless(damage,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(distance>=0&&distance<=1||this.battle.modded(121)){
                this.combatants[a].takeDamage(damage,-1)
            }
        }
    }
    damageAreaRulelessID(damage,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&distance>=0&&distance<=1||this.battle.modded(121)){
                this.combatants[a].takeDamage(damage,-1)
            }
        }
    }
    damageAreaReverse(damage,user,team,tilePosition,spec){
        let total=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].team==team&&distance>=0&&distance<=1||this.battle.modded(121)){
                this.combatants[a].takeDamage(damage,user,spec)
                total++
            }
        }
        return total
    }
    healAreaRuleless(effect,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(distance>=0&&distance<=1||this.battle.modded(121)){
                this.combatants[a].heal(effect)
            }
        }
    }
    statusAreaIDBlock(name,amount,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&this.combatants[a].block<=0&&distance>=0&&distance<=1||this.battle.modded(121)){
                this.combatants[a].statusEffect(name,amount)
            }
        }
    }
    statusAreaID(name,amount,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&distance>=0&&distance<=1||this.battle.modded(121)){
                this.combatants[a].statusEffect(name,amount)
            }
        }
    }
    statusAreaID2(name,amount,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&distance>=0&&distance<=2||this.battle.modded(121)){
                this.combatants[a].statusEffect(name,amount)
            }
        }
    }
    dropAreaID(variant,type,level,color,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if((this.combatants[a].id!=id&&(variant==0||this.combatants[a].blocked>0)&&distance>=0&&distance<=1||this.battle.modded(121))&&this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support){
                this.battle.drop(this.combatants[a].id,type,level,color)
            }
        }
    }
    energyDownAreaID(effect,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if((this.combatants[a].id!=id&&distance>=0&&distance<=1||this.battle.modded(121))&&this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support){
                this.battle.energy.temp[this.combatants[a].id]-=effect
            }
        }
    }
    intentNerfArea(intent,effect,user,team,tilePosition,spec){
        let total=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].team!=team&&distance>=0&&distance<=1||this.battle.modded(121)){
                if(types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==intent){
                    this.combatants[a].attack[this.combatants[a].intent].effect[0]=max(0,this.combatants[a].attack[this.combatants[a].intent].effect[0]-effect)
                }
                total++
            }
        }
        return total
    }
    getArea(team,tilePosition,range){
        let combatants=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].life>0&&(this.combatants[a].team!=team&&legalTargetCombatant(0,0,range,{tilePosition:tilePosition},this.combatants[a],this.battle.tileManager.tiles)||this.battle.modded(121))){
                combatants.push(this.combatants[a])
            }
        }
        return combatants
    }
    getAreaCapped(team,tilePosition,range){
        let combatants=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].life>0&&(this.combatants[a].team!=team&&legalTargetCombatant(0,0,range,{tilePosition:tilePosition},this.combatants[a],this.battle.tileManager.tiles)||this.battle.modded(121))){
                combatants.push(this.combatants[a])
                return combatants
            }
        }
    }
    randomEffectArea(loop,type,args,team,tilePosition){
        for(let b=0,lb=loop;b<lb;b++){
            for(let a=0,la=this.combatants.length;a<la;a++){
                let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
                if(this.combatants[a].team!=team&&distance>=0&&distance<=1&&this.combatants[a].id<this.battle.players||this.battle.modded(121)){
                    if(this.battle.cardManagers[this.combatants[a].id].reserve.cards.length>0){
                        this.battle.cardManagers[this.combatants[a].id].randomEffect(1,type,args)
                    }else{
                        this.battle.cardManagers[this.combatants[a].id].randomEffect(3,type,args)
                    }
                }
            }
        }
    }
    clearTile(tile){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].tilePosition.x==tile.tilePosition.x&&this.combatants[a].tilePosition.y==tile.tilePosition.y){
                this.combatants[a].life=0
            }
        }
    }
    tick(){
        this.combatants.forEach(combatant=>combatant.tick(false))
    }
    tickSub(){
        this.combatants.forEach(combatant=>combatant.tick(true))
    }
    tickA(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].tick(false)
            }
        }
    }
    tickB(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0){
                this.combatants[a].tick(false)
            }
        }
    }
    tickEarly(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0){
                this.combatants[a].tickEarly()
            }
        }
    }
    tickLate(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].tickLate()
            }
        }
    }
    reorder(){
        let order=1
        let left=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                left.push(a)
            }
        }
        while(left.length<=0&&this.battle.reinforce.front.length==0&&this.battle.reinforce.back.length>0){
            this.battle.turn.accelerate++
            this.battle.loadReinforce()
        }
        while(left.length>0){
            let minimum=this.combatants[left[0]].id
            for(let a=1,la=left.length;a<la;a++){
                minimum=min(minimum,this.combatants[left[a]].id)
            }
            for(let a=0,la=left.length;a<la;a++){
                if(this.combatants[left[a]].id==minimum){
                    this.combatants[left[a]].order=order
                    left.splice(a,1)
                    a--
                    la--
                    order++
                }
            }
        }
    }
    sort(){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(!list.includes(this.combatants[a].position.y)){
                list.push(this.combatants[a].position.y)
            }
        }
        this.sorted=list.sort(function(a,b){return a-b})
    }
    display(scene){
        switch(scene){
            case 'battle': case 'replay':
                for(let a=0,la=this.sorted.length;a<la;a++){
                    for(let b=0,lb=this.combatants.length;b<lb;b++){
                        if(this.combatants[b].position.y==this.sorted[a]){
                            this.combatants[b].display()
                        }
                    }
                }
            break
        }
    }
    displayInfo(scene){
        switch(scene){
            case 'battle':
                this.combatants.forEach(combatant=>combatant.displayInfo('battle'))
                this.combatants.forEach(combatant=>combatant.displayInfo('overlay'))
            break
            case 'rest': case 'event':
                for(let a=0,la=this.combatants.length;a<la;a++){
                    if(this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support){
                        this.combatants[a].displayInfo(scene)
                    }
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle': case 'replay':
                for(let a=0,la=this.combatants.length;a<la;a++){
                    for(let b=0;b<game.animRate;b++){
                        this.combatants[a].update()
                    }
                    this.combatants[a].infoAnim.upSize=dist(inputs.rel.x,inputs.rel.y,this.combatants[a].position.x,this.combatants[a].position.y)<game.targetRadius&&!this.battle.overlayManager.anyActive
                }
            break
            case 'rest': case 'event':
                for(let a=0,la=this.combatants.length;a<la;a++){
                    for(let b=0;b<game.animRate;b++){
                        this.combatants[a].updatePassive()
                    }
                }
            break
        }
    }
}