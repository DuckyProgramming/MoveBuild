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
        this.summons=[]
        this.allies=[]
        for(let a=0,la=this.battle.players;a<la;a++){
            this.allies.push([])
        }
        this.finalBossSwitch=0
    }
    save(){
        let composite={
            combatants:[],
            allies:this.allies,
            finalBossSwitch:this.finalBossSwitch,
        }
        for(let a=0,la=this.battle.players;a<la;a++){
            composite.combatants.push(this.combatants[a].save())
        }
        return composite
    }
    load(composite){
        this.allies=composite.allies
        this.finalBossSwitch=composite.finalBossSwitch
        for(let a=0,la=composite.combatants.length;a<la;a++){
            this.combatants[a].load(composite.combatants[a])
        }
    }
    sendAllies(){
        for(let a=0,la=this.allies.length;a<la;a++){
            for(let b=0,lb=this.allies[a].length;b<lb;b++){
                this.battle.tileManager.activate()
                let tiles=this.battle.tileManager.getArea(this.combatants[this.getPlayerCombatantIndex(a)].tilePosition,1,1)
                if(tiles.length>0){
                    this.battle.addCombatantAbstract(tiles[floor(random(0,tiles.length))].tilePosition,this.allies[a][b],a+1,this.combatants[this.getPlayerCombatantIndex(a)].goal.anim.direction,false,0)
                    this.combatants[this.combatants.length-1].ally=a
                    if(this.combatants[this.combatants.length-1].spec.includes(0)){
                        this.combatants[this.combatants.length-1].spec.splice(this.combatants[this.combatants.length-1].spec.indexOf(0),1)
                    }
                }
            }
        }
    }
    lastAlly(){
        this.combatants[this.combatants.length-1].ally=floor(random(0,this.battle.players))
        if(this.combatants[this.combatants.length-1].spec.includes(0)){
            this.combatants[this.combatants.length-1].spec.splice(this.combatants[this.combatants.length-1].spec.indexOf(0),1)
        }
    }
    purgeAlly(player,type){
        for(let a=0,la=this.allies[player].length;a<la;a++){
            if(this.allies[player]==type){
                this.allies[player].splice(a,1)
                a=la
            }
        }
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
            if(this.combatants[a].team==0||this.combatants[a].construct||this.combatants[a].support){
                this.combatants[a].setIntent(0)
            }else{
                this.combatants[a].endBlock()
            }
        }
        this.assignPlayer()
    }
    enableCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                this.combatants[a].endBlock()
            }
        }
    }
    enableCombatantsAlt(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].construct||this.combatants[a].support)&&this.combatants[a].life>0){
                this.combatants[a].endBlock()
            }
        }
    }
    unmoveCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct||this.combatants[a].support)&&this.combatants[a].life>0){
                this.combatants[a].moved=false
                this.combatants[a].activated=types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==2||types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==4||types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==5||this.battle.modded(202)
            }
        }
    }
    subSetTarget(a,list,priority){
        let minimum=1000
        for(let b=0,lb=list.length;b<lb;b++){
            minimum=min(minimum,round(
                dist(this.combatants[a].relativePosition.x,this.combatants[a].relativePosition.y,this.combatants[list[b]].relativePosition.x,this.combatants[list[b]].relativePosition.y)-
                (list[b]==priority?10:0)+
                (distTargetCombatant(0,this.combatants[a],this.combatants[list[b]])<=0?100:0)
            ))
        }
        let available=[]
        for(let b=0,lb=list.length;b<lb;b++){
            if(round(
                dist(this.combatants[a].relativePosition.x,this.combatants[a].relativePosition.y,this.combatants[list[b]].relativePosition.x,this.combatants[list[b]].relativePosition.y)-
                (list[b]==priority?10:0)+
                (distTargetCombatant(0,this.combatants[a],this.combatants[list[b]])<=0?100:0)
            )<minimum+5&&this.combatants[list[b]].life>0){
                available.push(list[b])
            }
        }
        if(available.length>0){
            this.combatants[a].target=available[floor(random(0,available.length))]
        }
    }
    setSingleTarget(index,priority){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(
                this.combatants[a].life>0&&(
                    this.combatants[index].team==0&&this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support||this.combatants[a].support&&this.combatants[a].life>0||
                    (this.combatants[index].construct||this.combatants[index].support)&&this.combatants[a].team==0
                )
            ){
                list.push(a)
            }
        }
        this.subSetTarget(index,list,priority)
    }
    setTargets(){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].life>0&&this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support||this.combatants[a].support&&this.combatants[a].life>0){
                list.push(a)
            }
        }
        if(list.length>0){
            for(let a=0,la=this.combatants.length;a<la;a++){
                if(this.combatants[a].team==0){
                    this.subSetTarget(a,list,-1)
                }
            }
        }
        list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].life>0&&this.combatants[a].team==0){
                list.push(a)
            }
        }
        if(list.length>0){
            for(let a=0,la=this.combatants.length;a<la;a++){
                if(this.combatants[a].construct||this.combatants[a].support){
                    this.subSetTarget(a,list,-1)
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
            if(this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support){
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
            if((this.combatants[a].team==0&&this.battle.turnManager.phase!=2||this.combatants[a].construct||this.combatants[a].support)&&this.combatants[a].life>0){
                this.combatants[a].activate(type,id)
            }
        }
    }
    subTarget(index){
        let tile=this.battle.tileManager.getTileIndex(this.combatants[index].tilePosition.x,this.combatants[index].tilePosition.y)
        if(tile>=0){
            if(this.combatants[index].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[index].tilePosition.y==this.battle.attackManager.tilePosition.y){
                this.battle.tileManager.tiles[tile].indescriptTarget(0,numeralizeDirection(0))
            }else{
                this.battle.tileManager.tiles[tile].target(0,numeralizeDirection(0,directionCombatant(this.combatants[index],this.combatants[this.battle.attackManager.user])))
            }
        }
    }
    targetCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if((this.combatants[a].team==0||this.combatants[a].construct||this.combatants[a].support)&&this.combatants[a].life>0){
                this.combatants[a].markTarget()
            }
            if(
                (this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==22||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53||this.battle.attackManager.targetInfo[0]==62||this.battle.attackManager.targetInfo[0]==63)&&
                this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team||(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)&&
                !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
                !(this.battle.attackManager.targetInfo[0]==22&&this.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
                (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||
                (this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)
            ){
                this.subTarget(a)
            }
            if(
                (this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==48||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53||this.battle.attackManager.targetInfo[0]==59)&&
                this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team||(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==59)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)&&
                !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
                !(this.battle.attackManager.targetInfo[0]==48&&this.combatants[a].tilePosition.y-this.combatants[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
                (legalTargetDiagonalCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||
                (this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==59)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)
            ){
                this.subTarget(a)
            }
            if(
                (this.battle.attackManager.targetInfo[0]==28||this.battle.attackManager.targetInfo[0]==29)&&
                this.combatants[a].life>0&&this.combatants[a].team==this.combatants[this.battle.attackManager.user].team&&this.combatants[a].construct&&
                !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
                (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==28)
            ){
                this.subTarget(a)
            }
            if(
                (this.battle.attackManager.targetInfo[0]==30)&&
                this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team||(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)&&
                !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
                !(this.battle.attackManager.targetInfo[0]==22&&this.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
                (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[4],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||
                (this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)
            ){
                this.subTarget(a)
            }
            if(
                (this.battle.attackManager.targetInfo[0]==35||this.battle.attackManager.targetInfo[0]==36)&&
                this.combatants[a].life>0&&
                !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
                this.combatants[a].name==this.battle.attackManager.targetInfo[1]&&
                (legalTargetCombatant(0,this.battle.attackManager.targetInfo[2],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[3],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==36||
                (this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26)&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)
            ){
                this.subTarget(a)
            }
            if(this.battle.attackManager.targetInfo[0]==45&&this.combatants[a].life>0){
                this.subTarget(a)
            }
            if(
                (this.battle.attackManager.targetInfo[0]==46)&&
                this.combatants[a].life>0&&
                !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
                (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||
                legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.attackManager.player)].ammo>0)
            ){
                this.subTarget(a)
            }
            if(
                (this.battle.attackManager.targetInfo[0]==54)&&
                this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team)&&
                !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
                (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))&&
                this.battle.tileManager.getTileIndex(
                    this.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.combatants[a],this.battle.attackManager)-60)[0],
                    this.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.combatants[a],this.battle.attackManager)-60)[1]
                )>=0&&
                this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(
                    this.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.combatants[a],this.battle.attackManager)-60)[0],
                    this.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.combatants[a],this.battle.attackManager)-60)[1]
                )].occupied==0
            ){
                this.subTarget(a)
            }
            if(
                (this.battle.attackManager.targetInfo[0]==55)&&
                this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team)&&
                !((this.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
                (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))&&
                this.battle.tileManager.getTileIndex(
                    this.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.combatants[a],this.battle.attackManager)+60)[0],
                    this.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.combatants[a],this.battle.attackManager)+60)[1]
                )>=0&&
                this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(
                    this.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.combatants[a],this.battle.attackManager)+60)[0],
                    this.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.combatants[a],this.battle.attackManager)+60)[1]
                )].occupied==0
            ){
                this.subTarget(a)
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
            if(this.combatants[a].team==0&&this.combatants[a].life>0
                &&!(effect==16&&this.combatants[a].getStatus('Lose Per Turn')>0)
                &&!(effect==18&&this.combatants[a].id==args[2])
                &&!(effect==20&&this.combatants[a].id==args[0])
            ){
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
                    this.combatants[index].statusEffect('Strength',-args[1])
                break
                case 2:
                    this.combatants[index].takeDamage(args[0],-1)
                    return this.combatants[index].life<=0
                case 3: case 18:
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
                case 9:
                    this.combatants[index].takeDamage(args[0],args[1])
                    return this.combatants[index].life<=0
                case 10:
                    for(let a=0,la=args[2];a<la;a++){
                        this.combatants[index].takeDamage(args[0],args[1])
                    }
                break
                case 11:
                    this.combatants[index].takeDamage(args[0],args[1],args[2])
                break
                case 12:
                    this.combatants[index].baseDuplicate()
                break
                case 13:
                    this.combatants[index].statusEffect('Stun',args[0])
                break
                case 14:
                    this.combatants[index].statusEffect('Poison',args[0])
                break
                case 15:
                    this.combatants[index].statusEffect('Protected Invisible',args[0])
                break
                case 16:
                    this.combatants[index].statusEffect('Lose Per Turn',args[0])
                break
                case 17:
                    this.combatants[index].statusEffect('Lock On',args[0])
                break
                case 19:
                    this.combatants[index].takeDamage(args[0],args[1])
                    this.combatants[index].statusEffect('Weak',args[2])
                break
                case 20:
                    for(let b=0,lb=floor((args.length-1)/2);b<lb;b++){
                        this.combatants[index].statusEffect(args[b*2+1],args[b*2+2])
                    }
                break
                case 21:
                    this.battle.turnManager.loadSpecificAttack(args[1],393,[index,args[0],args[1],args[2]])
                break
                case 22:
                    this.combatants[index].takeDamage(args[0],args[1])
                    this.combatants[index].statusEffect('Lock On',args[2])
                break
                case 23:
                    for(let b=0,lb=floor(args.length/2);b<lb;b++){
                        this.combatants[index].statusEffect(args[b*2],args[b*2+1])
                    }
                break
            }
        }
    }
    randomNumberEffect(number,effect,args){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                list.push(a)
            }
        }
        for(let a=0,la=number;a<la;a++){
            if(list.length>0){
                let index=floor(random(0,list.length))
                switch(effect){
                    case 0:
                        this.combatants[list[index]].takeDamage(args[0],args[1])
                        this.combatants[list[index]].statusEffect('Freeze',args[2])
                        this.combatants[list[index]].statusEffect('Poison',args[3])
                    break
                }
                list.splice(index,1)
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
                case 2:
                    this.combatants[index].takeDamage(args[0],args[1])
                break
                case 3:
                    this.combatants[index].takeDamage(args[0],args[1])
                    return this.combatants[index].life<=0
            }
        }
    }
    damageHighest(effect,user){
        let maximum=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                maximum=max(maximum,this.combatants[a].life)
            }
        }
        let possible=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life==maximum){
                possible.push(a)
            }
        }
        if(possible.length>0){
            this.combatants[possible[floor(random(0,possible.length))]].takeDamage(effect,user)
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
    holdSummonCombatant(tilePosition,type,direction){
        this.summons.push([tilePosition,type,direction])
        this.battle.counter.enemy++
    }
    outSummons(){
        this.summons.forEach(summon=>this.summonCombatant(summon[0],summon[1],summon[2]))
        this.battle.counter.enemy-=this.summons.length
        this.summons=[]
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
    summonCombatantDefinite(tilePosition,type,direction){
        let index=this.battle.tileManager.getTileIndex(tilePosition.x,tilePosition.y)
        if(index>=0){
            let tile=this.battle.tileManager.tiles[index]
            if(tile.occupied==0){
                this.addCombatant(tile.position.x,tile.position.y,tile.relativePosition.x,tile.relativePosition.y,tile.tilePosition.x,tile.tilePosition.y,type,0,direction,false)
                this.battle.updateTargetting()
                this.battle.tileManager.activate()
                this.battle.counter.enemy++
            }
        }
    }
    summonConstruct(tilePosition,type,team,direction,builder){
        let index=this.battle.tileManager.getTileIndex(tilePosition.x,tilePosition.y)
        if(index>=0){
            let tile=this.battle.tileManager.tiles[index]
            this.addCombatantConstruct(tile.position.x,tile.position.y,tile.relativePosition.x,tile.relativePosition.y,tile.tilePosition.x,tile.tilePosition.y,type,team,direction,false,builder)
            this.battle.activate(1,this.combatants.length-1)
            this.battle.updateTargetting()
            this.battle.tileManager.activate()
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Speed Up')>0){
                this.combatants[this.combatants.length-1].statusEffect('Speed Up',this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Speed Up'))
                this.combatants[this.getPlayerCombatantIndex(builder)].status.main[findList('Construct Speed Up',this.combatants[this.getPlayerCombatantIndex(builder)].status.name)]=0
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Low Health Construct')>0){
                this.combatants[this.combatants.length-1].life=round(this.combatants[this.combatants.length-1].life*5)/10
                this.combatants[this.getPlayerCombatantIndex(builder)].status.main[findList('Low Health Construct',this.combatants[this.getPlayerCombatantIndex(builder)].status.name)]--
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Turn')>0){
                for(let a=0,la=this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Turn');a<la;a++){
                    this.battle.turnManager.loadEnemyAttackRepeatBack(this.combatants.length-1)
                }
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dual Block')>0){
                this.combatants[this.getPlayerCombatantIndex(builder)].addBlock(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dual Block'))
                this.combatants[this.combatants.length-1].addBlock(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dual Block'))
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('All Construct Speed Up')>0){
                this.combatants[this.combatants.length-1].statusEffect('Speed Up',this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('All Construct Speed Up'))
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Strength')>0){
                this.combatants[this.combatants.length-1].statusEffect('Strength',this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Strength'))
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dexterity')>0){
                this.combatants[this.combatants.length-1].statusEffect('Dexterity',this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dexterity'))
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Metal')>0){
                this.combatants[this.getPlayerCombatantIndex(builder)].metal+=this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Metal')
            }
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
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Speed Up')>0){
                this.combatants[this.combatants.length-1].statusEffect('Speed Up',this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Speed Up'))
                this.combatants[this.getPlayerCombatantIndex(builder)].status.main[findList('Construct Speed Up',this.combatants[this.getPlayerCombatantIndex(builder)].status.name)]=0
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Low Health Construct')>0){
                this.combatants[this.combatants.length-1].life=round(this.combatants[this.combatants.length-1].life*5)/10
                this.combatants[this.getPlayerCombatantIndex(builder)].status.main[findList('Low Health Construct',this.combatants[this.getPlayerCombatantIndex(builder)].status.name)]--
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Turn')>0){
                for(let a=0,la=this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Turn');a<la;a++){
                    this.battle.turnManager.loadEnemyAttackRepeatBack(this.combatants.length-1)
                }
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dual Block')>0){
                this.combatants[this.getPlayerCombatantIndex(builder)].addBlock(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dual Block'))
                this.combatants[this.combatants.length-1].addBlock(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dual Block'))
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('All Construct Speed Up')>0){
                this.combatants[this.combatants.length-1].statusEffect('Speed Up',this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('All Construct Speed Up'))
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Strength')>0){
                this.combatants[this.combatants.length-1].statusEffect('Strength',this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Strength'))
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dexterity')>0){
                this.combatants[this.combatants.length-1].statusEffect('Dexterity',this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Dexterity'))
            }
            if(this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Metal')>0){
                this.combatants[this.getPlayerCombatantIndex(builder)].metal+=this.combatants[this.getPlayerCombatantIndex(builder)].getStatus('Construct Metal')
            }
        }
    }
    numberAbstract(type,args){
        let total=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(
                type==0&&this.combatants[a].construct&&this.combatants[a].life<=0||
                type==1&&this.combatants[a].team==0&&this.combatants[a].life>0||
                type==2&&this.combatants[a].team==0&&this.combatants[a].life>0&&!this.combatants[a].spec.includes(args[0])||
                type==3&&this.combatants[a].construct&&this.combatants[a].life>0
            ){
                total++
            }
        }
        return total
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
                            this.battle.turnManager.loadEnemyRotate(a,args[0])
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
                        this.combatants[a].statusEffect('Burn',args[0])
                        this.combatants[a].statusEffect('Freeze',args[0])
                        this.combatants[a].statusEffect('Shock',args[0])
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
                    case 39:
                        if(this.combatants[a].id!=args[1]){
                            this.combatants[a].takeDamage(args[0],-1)
                        }
                    break
                    case 40:
                        this.combatants[a].removeAllStatuses(args[0])
                    break
                    case 41:
                        this.combatants[a].statusEffect('Poison',args[0])
                        this.combatants[a].loseHealth(this.combatants[a].getStatus('Poison'))
                    break
                    case 42:
                        this.combatants[a].heal(args[0])
                        this.combatants[a].statusEffect('Poison',args[1])
                    break
                    case 43:
                        this.combatants[a].takeDamage(args[0],args[1])
                    break
                    case 44:
                        if(this.combatants[a].id!=args[2]){
                            this.combatants[a].takeDamage(args[0],args[1])
                        }
                    break
                    case 45:
                        this.combatants[a].takeDamage(args[0],args[1])
                        this.combatants[a].statusEffect('Burn',args[2])
                    break
                    case 46:
                        this.combatants[a].takeDamage(args[0],args[1])
                        this.combatants[a].statusEffect('Freeze',args[2])
                    break
                    case 47:
                        this.combatants[a].block=0
                    break
                    case 48:
                        for(let b=0,lb=floor(args.length/2);b<lb;b++){
                            this.combatants[a].statusEffect(args[b*2],args[b*2+1])
                        }
                    break
                    case 49:
                        this.combatants[a].loseHealth(args[0])
                    break
                    case 50:
                        if(this.combatants[a].life<this.combatants[a].base.life){
                            for(let b=0,lb=floor(args.length/2);b<lb;b++){
                                this.combatants[a].statusEffect(args[b*2],args[b*2+1])
                            }
                        }
                    break
                    case 51:
                        for(let b=0,lb=floor(args.length/2);b<lb;b++){
                            this.combatants[a].status.main[findList(args[b*2],this.combatants[a].status.name)]=max(0,this.combatants[a].status.main[findList(args[b*2],this.combatants[a].status.name)]-args[b*2+1])
                        }
                    break
                    case 52:
                        this.combatants[a].loseHealth(this.combatants[a].getStatus(args[0]))
                    break
                }
            }
        }
    }
    allConstructEffect(builder,effect,args){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].construct&&this.combatants[a].builder==builder){
                switch(effect){
                    case 0:
                        for(let b=0,lb=floor(args.length/2);b<lb;b++){
                            this.combatants[a].statusEffect(args[b*2],args[b*2+1])
                        }
                    break
                    case 1:
                        this.combatants[a].addBlock(args[0])
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
                case 10:
                    this.combatants[a].callEndEffect()
                break
                case 11:
                    for(let b=0,lb=this.combatants[a].status.name.length;b<lb;b++){
                        if(this.combatants[a].status.name[b].includes('Counter')&&this.combatants[a].status.main[b]!=0){
                            this.combatants[a].status.main[b]=0
                        }
                    }
                break
                case 12:
                    for(let b=0,lb=floor(args.length/2);b<lb;b++){
                        this.combatants[a].statusEffect(args[b*2],args[b*2+1])
                    }
                break
                
            }
        }
    }
    getRandom(number,reject){
        if(this.combatants.length>0){
            let list=[]
            let result=[]
            for(let a=0,la=this.combatants.length;a<la;a++){
                if(this.combatants[a].team==0&&this.combatants[a].life>0&&!reject.includes(this.combatants[a].id)){
                    list.push(a)
                }
            }
            for(let a=0,la=number;a<la;a++){
                if(list.length>0){
                    let index=floor(random(0,list.length))
                    result.push(list[index])
                    list.splice(index,1)
                }
            }
            return result
        }
    }
    getRandomNonexistingPlayer(){
        let list=[]
        for(let a=0,la=constants.playerNumber;a<la;a++){
            list.push(a+1)
        }
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].type>0&&this.combatants[a].type<=constants.playerNumber&&list.includes(this.combatants[a].type)){
                list.splice(list.indexOf(this.combatants[a].type),1)
            }
        }
        if(list.length>=0){
            return list[floor(random(0,list.length))]
        }
        return -1
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
        this.combatants[this.combatants.length-1].setIntent()
        this.setSpecificTarget(this.combatants.length-1)
        this.id++
        this.sort()
        this.reorder()
    }
    addCombatantAbstract(x,y,relativeX,relativeY,tileX,tileY,type,team,direction,minion,spec){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30,minion))
        switch(spec){
            case 0:
                this.combatants[this.combatants.length-1].support=true
            break
        }
        if(this.id<this.battle.players){
            this.playerCombatantIndex[this.id]=this.combatants.length-1
        }
        this.combatants[this.combatants.length-1].setIntent()
        this.id++
        this.sort()
        this.reorder()
    }
    addCombatantConstruct(x,y,relativeX,relativeY,tileX,tileY,type,team,direction,minion,builder){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30,minion))
        this.combatants[this.combatants.length-1].construct=true
        this.combatants[this.combatants.length-1].builder=builder
        if(this.combatants[this.combatants.length-1].spec.includes(17)){
            this.combatants[this.combatants.length-1].autoAim()
        }else{
            this.combatants[this.combatants.length-1].activated=true
        }
        if(!options.oldUnbuild&&this.combatants[this.combatants.length-1].move.speed==0&&this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players){
            if(this.battle.cardManagers[this.battle.turn.main].hand.numberAbstract(0,[['Unbuild']])==0){
                this.battle.cardManagers[this.battle.turn.main].hand.add(findName('Unbuild',types.card),0,0)
            }
        }
        if(this.id<this.battle.players){
            this.playerCombatantIndex[this.id]=this.combatants.length-1
        }
        this.combatants[this.combatants.length-1].setIntent()
        this.setSpecificTarget(this.combatants.length-1)
        this.id++
        this.sort()
        this.reorder()
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
    playCardFront(cardClass,card){
        this.combatants.forEach(combatant=>combatant.playCardFront(cardClass,card))
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
    areaAbstract(effect,values,tilePosition,targetter,range,diagonal,output){
        let total=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=diagonal?distTargetDiagonalCombatant(0,{tilePosition:tilePosition},this.combatants[a]):distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].life>0&&((
                    targetter[0]==0||
                    targetter[0]==1&&this.combatants[a].team!=targetter[1]||
                    targetter[0]==2&&this.combatants[a].team==targetter[1]||
                    targetter[0]==3&&this.combatants[a].id!=targetter[1]||
                    targetter[0]==4&&this.combatants[a].id==targetter[1]||
                    targetter[0]==5&&this.combatants[a].id!=targetter[1]&&this.combatants[a].block<=0||
                    targetter[0]==6&&this.combatants[a].id==targetter[1]&&this.combatants[a].block<=0||
                    targetter[0]==7&&(this.combatants[a].team<=0||this.combatants[a].team>this.battle.players)
                )&&distance>=range[0]&&distance<=range[1]
                &&!(effect==0&&distance>0&&!(
                    diagonal&&legalTargetDiagonalCombatant(0,range[0],range[1],{tilePosition:tilePosition},this.combatants[a],this.battle.tileManager.tiles)||
                    !diagonal&&legalTargetCombatant(0,range[0],range[1],{tilePosition:tilePosition},this.combatants[a],this.battle.tileManager.tiles)
                ))
                ||this.battle.modded(121))
            ){
                switch(effect){
                    case 0:
                        if(values[1]>=0&&values[1]<this.combatants.length&&this.combatants[values[1]].getStatus('Splash Boost')>0){
                            this.combatants[a].takeDamage(values[0]+this.combatants[values[1]].getStatus('Splash Boost'),values[1],values[2])
                        }else{
                            this.combatants[a].takeDamage(values[0],values[1],values[2])
                        }
                        if(values[1]>=0&&values[1]<this.combatants.length&&this.combatants[values[1]].getStatus('Splash Attach Poison')>0){
                            this.combatants[a].statusEffect('Poison',this.combatants[values[1]].getStatus('Splash Attach Poison'))
                        }
                    break
                    case 1:
                        this.combatants[a].heal(values[0])
                    break
                    case 2:
                        this.combatants[a].statusEffect(values[0],values[1])
                    break
                    case 3:
                        this.combatants[a].statusEffectNext(values[0],values[1])
                    break
                    case 4:
                        if(this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support){
                            this.battle.drop(this.combatants[a].id,values[0],values[1],values[2])
                        }
                    break
                    case 5:
                        if(this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support){
                            this.combatants[a].statusEffect(variants.mtg?'Random Mana Next Turn':'Energy Next Turn',values[0])
                        }
                    break
                    case 6:
                        if(types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==values[0]){
                            this.combatants[a].attack[this.combatants[a].intent].effect[0]=max(0,this.combatants[a].attack[this.combatants[a].intent].effect[0]-values[1])
                        }
                    break
                    case 7:
                        if(this.combatants[a].team>0&&!this.combatants[a].construct&&!this.combatants[a].support){
                            for(let b=0,lb=values[0];b<lb;b++){
                                this.battle.cardManagers[this.combatants[a].id].randomEffect(this.battle.cardManagers[this.combatants[a].id].reserve.cards.length>0?1:this.battle.cardManagers[this.combatants[a].id].discard.cards.length>0?3:2,values[1],values[2])
                            }
                        }
                    break
                    case 8:
                        if(values[1]>=0&&values[1]<this.combatants.length&&this.combatants[values[1]].getStatus('Splash Boost')>0){
                            this.combatants[a].takeDamage((values[0]+this.combatants[values[1]].getStatus('Splash Boost'))*(this.combatants[a].block>0?values[3]:1),values[1],values[2])
                        }else{
                            this.combatants[a].takeDamage(values[0]*(this.combatants[a].block>0?values[3]:1),values[1],values[2])
                        }
                        if(values[1]>=0&&values[1]<this.combatants.length&&this.combatants[values[1]].getStatus('Splash Attach Poison')>0){
                            this.combatants[a].statusEffect('Poison',this.combatants[values[1]].getStatus('Splash Attach Poison'))
                        }
                    break
                }
                if(
                    output==0||
                    output==1&&this.combatants[a].life<=0
                ){
                    total++
                }
            }
        }
        switch(output){
            case 0: case 1:
                return total
        }
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
    getAreaAbstract(type,args,team,tilePosition,range){
        let combatants=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(
                this.combatants[a].life>0&&(this.combatants[a].team!=team&&legalTargetCombatant(0,0,range,{tilePosition:tilePosition},this.combatants[a],this.battle.tileManager.tiles)||this.battle.modded(121))&&
                !(type==0&&tilePosition.y!=this.combatants[a].tilePosition.y)
            ){
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
    getAreaId(id,tilePosition,range){
        let combatants=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].life>0&&(this.combatants[a].id!=id&&legalTargetCombatant(0,0,range,{tilePosition:tilePosition},this.combatants[a],this.battle.tileManager.tiles)||this.battle.modded(121))){
                combatants.push(this.combatants[a])
            }
        }
        return combatants
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
            if(this.combatants[a].team==0||this.combatants[a].construct||this.combatants[a].support){
                this.combatants[a].tickEarly()
            }
        }
    }
    tickLate(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0||this.combatants[a].construct||this.combatants[a].support){
                this.combatants[a].tick()
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
            case 'map': case 'rest': case 'event':
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
                    this.combatants[a].update()
                    this.combatants[a].infoAnim.upSize=dist(inputs.rel.x,inputs.rel.y,this.combatants[a].position.x,this.combatants[a].position.y)<constants.targetRadius&&!this.battle.overlayManager.anyActive
                }
                if(this.battle.attackManager.attacks.length==0&&this.battle.turnManager.turns.length==0&&this.summons.length>0){
                    this.outSummons()
                }
            break
            case 'map': case 'rest': case 'event':
                for(let a=0,la=this.combatants.length;a<la;a++){
                    for(let b=0;b<game.animRate;b++){
                        this.combatants[a].updatePassive()
                    }
                }
            break
        }
    }
    onClick(scene,args){
        switch(scene){
            case 'battle':
                this.combatants[this.getPlayerCombatantIndex(args[0])].onClick(scene)
            break
        }
    }
}