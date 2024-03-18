class tileManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.width=0
        this.height=0
        this.diagonal=[0,0]
        this.offset={x:0,y:0}
        this.tiles=[]

        this.center={x:0,y:0}
        this.anim={coordinate:0}
    }
    generateTiles(level){
        for(let a=0,la=this.tiles.length;a<la;a++){
            delete this.tiles[a]
            this.tiles.splice(a,1)
            a--
            la--
        }
        this.tiles=[]
        this.width=level.map[0].length
        this.height=level.map.length
        this.diagonal=[0,0]
        this.offset={x:level.map.length,y:level.map[0].length}
        for(let a=0,la=level.map.length;a<la;a++){
            for(let b=0,lb=level.map[a].length;b<lb;b++){
                if(level.map[a][b].type>=0){
                    this.offset.x=min(this.offset.x,b)
                    this.offset.y=min(this.offset.y,a)
                }
            }
        }
        this.center={x:this.layer.width/2,y:this.layer.height/2-60}
        for(let a=0,la=level.map.length;a<la;a++){
            for(let b=0,lb=level.map[a].length;b<lb;b++){
                if(level.map[a][b].type>=0){
                    this.tiles.push(new tile(this.layer,this.battle,
                        this.layer.width/2-(lb-1)*60+(la-1)*30+b*120-a*60,
                        this.layer.height/2-60-(la-1)*25+a*50,
                        this.layer.width/2-(lb-1)*50+(la-1)*25+b*100-a*50,
                        this.layer.height/2-50-(la-1)*25*sqrt(3)+a*50*sqrt(3),
                        b,a,this.offset,level.map[a][b].type))
                    this.diagonal[0]=min(this.diagonal[0],a-b)
                    this.diagonal[1]=max(this.diagonal[1],a-b)
                }
            }
        }
    }
    getTileIndex(tileX,tileY){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].tilePosition.x==round(tileX)&&this.tiles[a].tilePosition.y==round(tileY)){
                return a
            }
        }
        return -1
    }
    getTilePosition(tileX,tileY){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].tilePosition.x==tileX&&this.tiles[a].tilePosition.y==tileY){
                return this.tiles[a].position
            }
        }
        return {x:0,y:0}
    }
    getTileDirection(tile1X,tile1Y,tile2X,tile2Y){
        return vectorAtan(this.getTilePosition(tile1X,tile1Y),this.getTilePosition(tile2X,tile2Y))
    }
    getTileRelativePosition(tileX,tileY){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].tilePosition.x==tileX&&this.tiles[a].tilePosition.y==tileY){
                return this.tiles[a].relativePosition
            }
        }
        return this.center
    }
    getTileRelativeDirection(tile1X,tile1Y,tile2X,tile2Y){
        return vectorAtan(this.getTileRelativePosition(tile1X,tile1Y),this.getTileRelativePosition(tile2X,tile2Y))
    }
    getRandomTilePosition(){
        this.activate()
        let list=[]
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].occupied==0){
                list.push(a)
            }
        }
        if(list.length>0){
            return this.tiles[list[floor(random(0,list.length))]].tilePosition
        }
        return -1
    }
    getEmptyTiles(){
        let list=[]
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].occupied==0&&!this.tiles[a].reinforce){
                list.push(a)
            }
        }
        return list
    }
    getArea(tilePosition,range){
        let tiles=[]
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].occupied==0&&legalTargetCombatant(0,1,range,{tilePosition:tilePosition},this.tiles[a],this.tiles)){
                tiles.push(this.tiles[a])
            }
        }
        return tiles
    }
    allEffect(type,args){
        for(let a=0,la=this.tiles.length;a<la;a++){
            switch(type){
                case 0:
                    this.tiles[a].addType(args[0])
                break
            }
        }
    }
    randomType(type){
        this.tiles[floor(random(0,this.tiles.length))].addType(type)
    }
    randomClearType(type){
        let tiles=[]
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].type.length==0){
                tiles.push(a)
            }
        }
        this.tiles[floor(random(0,tiles.length))].addType(type)
    }
    typeArea(type,tilePosition){
        for(let a=0,la=this.tiles.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.tiles[a])
            if(distance>0&&distance<=1){
                this.tiles[a].addType(type)
            }
        }
    }
    fireArea(type,power,tilePosition,range){
        for(let a=0,la=this.tiles.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.tiles[a])
            if(distance>=0&&distance<=range){
                this.tiles[a].fire[type]+=power
            }
        }
    }
    fireAreaTrefoil(type,power,tilePosition,range){
        let flip=floor(random(0,2))
        for(let a=0,la=this.tiles.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.tiles[a])
            let direction=targetDirection(0,tilePosition.x-this.tiles[a].tilePosition.x,tilePosition.y-this.tiles[a].tilePosition.y)
            if(distance>=0&&distance<=range&&(direction==-1||direction%2==flip)){
                this.tiles[a].fire[type]+=power
            }
        }
    }
    fireRow(type,power,row){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].tilePosition.x==row){
                this.tiles[a].fire[type]+=power
            }
        }
    }
    fireColumn(type,power,column){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].tilePosition.y==column){
                this.tiles[a].fire[type]+=power
            }
        }
    }
    fireDiagonal(type,power,diagonal){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].tilePosition.y-this.tiles[a].tilePosition.x==diagonal){
                this.tiles[a].fire[type]+=power
            }
        }
    }
    fireRandomRow(type,power){
        this.fireRow(type,power,floor(random(0,this.width)))
    }
    fireRandomColumn(type,power){
        this.fireColumn(type,power,floor(random(0,this.height)))
    }
    fireRandomDiagonal(type,power){
        this.fireDiagonal(type,power,floor(random(this.diagonal[0],this.diagonal[1]+1)))
    }
    fireRandomSet(type,power){
        if(floor(random(0,3))==0){
            this.fireRandomRow(type,power)
        }else if(floor(random(0,2))==0){
            this.fireRandomColumn(type,power)
        }else{
            this.fireRandomDiagonal(type,power)
        }
    }
    fireRandomTarget(type,power,tilePosition){
        if(floor(random(0,3))==0){
            this.fireRow(type,power,tilePosition.x)
        }else if(floor(random(0,2))==0){
            this.fireColumn(type,power,tilePosition.y)
        }else{
            this.fireDiagonal(type,power,tilePosition.y-tilePosition.x)
        }
    }
    fire(){
        this.tiles.forEach(tile=>tile.fireAttack())
    }
    activate(){
        this.tiles.forEach(tile=>tile.occupied=0)
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].life>0||this.battle.combatantManager.combatants[a].team>0&&!this.battle.combatantManager.combatants[a].construct&&!this.battle.combatantManager.combatants[a].support){
                for(let b=0,lb=this.tiles.length;b<lb;b++){
                    if(this.tiles[b].tilePosition.x==this.battle.combatantManager.combatants[a].tilePosition.x&&this.tiles[b].tilePosition.y==this.battle.combatantManager.combatants[a].tilePosition.y){
                        this.tiles[b].occupied=this.battle.combatantManager.combatants[a].getStatus('Invisible')>0?2:1
                    }
                }
            }
        }
    }
    activateTiles(type,id){
        this.tiles.forEach(tile=>tile.activate(type,id))
    }
    customActivate(type,effect){
        this.tiles.forEach(tile=>tile.customActivate(type,effect))
    }
    unTargetTiles(){
        this.tiles.forEach(tile=>tile.unTarget())
    }
    retargetTiles(){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if((this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==31||this.battle.attackManager.targetInfo[0]==32)&&this.tiles[a].occupied==0&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==20)&&this.tiles[a].occupied==0&&legalTargetCombatant(1,this.battle.attackManager.targetInfo[1]+1,this.battle.attackManager.targetInfo[2]+1,this.tiles[a],this.battle.attackManager,this.tiles)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==7)&&this.tiles[a].occupied==0&&
            (legalTargetCombatant(0,1,this.battle.energy.main[this.battle.attackManager.player]+this.battle.attackManager.targetInfo[1]+(this.battle.relicManager.hasRelic(121,this.battle.attackManager.player)?2:0),this.tiles[a],this.battle.attackManager,this.tiles))){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==8)&&
            legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if(this.battle.attackManager.targetInfo[0]==9){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==12||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==47)&&this.tiles[a].occupied==0&&
            !(this.battle.attackManager.targetInfo[0]==47&&this.tiles[a].tilePosition.y-this.tiles[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
            (legalTargetDiagonalCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==16)&&this.tiles[a].occupied==0&&
            this.getTileIndex(this.tiles[a].tilePosition.x+(this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x)/max(abs(this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)),this.tiles[a].tilePosition.y+(this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)/max(abs(this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)))<0&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==17)&&this.tiles[a].occupied==0&&
            this.battle.attackManager.tilePosition.y==this.tiles[a].tilePosition.y&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==18)&&this.tiles[a].occupied==0&&
            this.tiles[a].type.includes(3)&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if(this.battle.attackManager.targetInfo[0]==19&&this.tiles[a].type.includes(3)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==21||this.battle.attackManager.targetInfo[0]==31)&&this.tiles[a].occupied==0&&arrayIncludes(constants.L,[this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==23||this.battle.attackManager.targetInfo[0]==49||this.battle.attackManager.targetInfo[0]==50)&&
            (this.battle.tileManager.tiles[a].type.includes(19)||this.battle.attackManager.targetInfo[0]==50)&&(this.tiles[a].occupied==0||this.battle.attackManager.targetInfo[0]==23||this.battle.attackManager.targetInfo[0]==50&&!this.battle.tileManager.tiles[a].type.includes(19))){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==24)&&this.tiles[a].occupied==0&&
            (this.battle.attackManager.tilePosition.y!=this.tiles[a].tilePosition.y||this.battle.attackManager.tilePosition.x>this.tiles[a].tilePosition.x)&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==25)&&this.tiles[a].occupied==0&&
            (this.battle.attackManager.tilePosition.y!=this.tiles[a].tilePosition.y||this.battle.attackManager.tilePosition.x<this.tiles[a].tilePosition.x)&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==27)&&this.tiles[a].occupied==0&&
            (legalTargetDiagonalCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==32||this.battle.attackManager.targetInfo[0]==40)&&this.tiles[a].occupied==0&&
            (this.tiles[a].type.includes(3)||this.battle.attackManager.targetInfo[0]==40)&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==33)&&this.tiles[a].occupied==0&&
            this.battle.attackManager.tilePosition.y<=this.tiles[a].tilePosition.y&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==34)&&this.tiles[a].occupied==0&&
            this.battle.attackManager.tilePosition.y>=this.tiles[a].tilePosition.y&&
            (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==37)&&this.tiles[a].occupied==0&&arrayIncludes(constants.D1,[this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==38)&&this.tiles[a].occupied==0&&arrayIncludes(constants.D2,[this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==39)&&this.tiles[a].occupied==0&&arrayIncludes(constants.D3,[this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==41)&&this.tiles[a].occupied==0&&arrayIncludes(constants.HG1,[this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])&&
            (legalTargetCombatant(0,1,6,this.tiles[a],this.battle.attackManager,this.tiles)||legalTargetDiagonalCombatant(0,1,6,this.tiles[a],this.battle.attackManager,this.tiles))){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==42)&&this.tiles[a].occupied==0&&arrayIncludes(constants.HG2,[this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])&&
            (legalTargetCombatant(0,1,6,this.tiles[a],this.battle.attackManager,this.tiles)||legalTargetDiagonalCombatant(0,1,6,this.tiles[a],this.battle.attackManager,this.tiles))){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==43)&&this.tiles[a].occupied==0&&arrayIncludes(constants.HG3,[this.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])&&
            (legalTargetCombatant(0,1,6,this.tiles[a],this.battle.attackManager,this.tiles)||legalTargetDiagonalCombatant(0,1,6,this.tiles[a],this.battle.attackManager,this.tiles))){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }else if((this.battle.attackManager.targetInfo[0]==44)&&this.tiles[a].occupied==0&&
            legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.tiles[a],this.battle.attackManager,this.tiles)){
                this.tiles[a].target(0,numeralizeDirection(0,directionCombatant(this.tiles[a],this.battle.attackManager)))
            }
        }
    }
    spawnAmount(amount,tilePosition,type){
        let direction=floor(random(0,6/amount))
        for(let a=0,la=amount;a<la;a++){
            let index=this.getTileIndex(tilePosition.x+transformDirection(0,direction*60+a/la*360-30)[0],tilePosition.y+transformDirection(0,direction*60+a/la*360-30)[1])
            if(index>=0&&this.tiles[index].type.length==0){
                this.tiles[index].addType(type)
            }
        }
    }
    spawnAmountDouble(amount,tilePosition,type){
        let direction=floor(random(0,6/amount))
        for(let a=0,la=amount;a<la;a++){
            let index=this.getTileIndex(tilePosition.x+transformDirection(0,direction*60+a/la*360-30)[0]*2,tilePosition.y+transformDirection(0,direction*60+a/la*360-30)[1]*2)
            if(index>=0&&this.tiles[index].type.length==0){
                this.tiles[index].addType(type)
            }
        }
    }
    tick(){
        this.tiles.forEach(tile=>tile.tick())
    }
    display(scene){
        switch(scene){
            case 'battle':
                this.tiles.forEach(tile=>tile.display())
                this.tiles.forEach(tile=>tile.displayEffects())
            break
            case 'replay':
                this.tiles.forEach(tile=>tile.display())
            break
        }
    }
    displayCoordinate(){
        if(this.anim.coordinate>0){
            this.tiles.forEach(tile=>tile.displayCoordinate(this.anim.coordinate))
        }
    }
    update(scene){
        switch(scene){
            case 'battle': case 'replay':
                this.tiles.forEach(tile=>tile.update())
                this.anim.coordinate=smoothAnim(this.anim.coordinate,this.battle.attackManager.targetInfo[0]!=0,0,1,5)
            break
        }
    }
}