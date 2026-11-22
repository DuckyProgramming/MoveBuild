class collectionManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.known=[]
        this.knownKey=[]
        this.won=[]
        this.saveKey=false
        //this.cards=[]
        this.cards={front:[],back:[]}
        this.anim={query:{list:[],rarity:[],class:[]},variant:0,desc:0}
        this.page=0
        this.totals={query:[0,0],list:[]}
        this.query={
            name:'',
            desc:false,
            level:0,
            list:[],
            rarity:[],
            class:[],
        }
        for(let a=0,la=constants.playerNumber+1;a<la;a++){
            this.won.push(-1)
        }
        for(let a=-10,la=constants.playerNumber+6;a<la;a++){
            this.anim.query.list.push(0)
            if(a>=0){
                this.query.list.push(a)
            }
        }
        for(let a=0,la=4;a<la;a++){
            this.anim.query.rarity.push(0)
            this.query.rarity.push(true)
        }
        for(let a=0,la=8;a<la;a++){
            this.anim.query.class.push(0)
            this.query.class.push(true)
        }
        this.overlayManager=new overlayManager(this.layer,this.battle,2)
        this.getData()
    }
    reset(){
        this.cards={front:[],back:[]}
    }
    overListing(cardData){
        if(cardData.rarity>=0&&cardData.list>=0&&cardData.list<=constants.playerNumber+5){
            return [
                cardData.list,
                cardData.list==0?constants.playerNumber:cardData.list<=constants.playerNumber?cardData.list-1:cardData.list
            ]
        }/*else if(cardData.rarity<0&&cardData.list==constants.playerNumber+5){
            sublist=-1
            resultlist=constants.playerNumber+6
        }else if(cardData.rarity==-10){
            return [
                -1,
                constants.playerNumber+6
            ]
        }*/else if(cardData.rarity==-6){
            return [
                -1,
                constants.playerNumber+6
            ]
        }else if(cardData.rarity==-8){
            return [
                -2,
                constants.playerNumber+7
            ]
        }else if(cardData.list==-9){
            /*sublist=-4
            resultlist=constants.playerNumber+9*/
            return [
                -3,
                constants.playerNumber+8
            ]
        }else if(cardData.rarity==-5&&cardData.list==-1){
            return [
                -4,
                constants.playerNumber+9
            ]
        }else if(cardData.rarity==-1&&cardData.list==-8||cardData.rarity==-1&&cardData.list==-10){
        //}else if(cardData.rarity==-1&&cardData.list==-8){
            return [
                -5,
                constants.playerNumber+10
            ]
        }else if(cardData.rarity==-2){
            return [
                -6,
                constants.playerNumber+11
            ]
        }else if(cardData.rarity==-3){
            return [
                -7,
                constants.playerNumber+12
            ]
        }else{
            return [
                -8,
                constants.playerNumber+13
            ]
        }
    }
    executeQuery(){
        this.page=0
        this.totals={query:[0,0],list:[]}
        /*let names=[]
        for(let a=0,la=constants.playerNumber+16;a<la;a++){
            names.push([[],[]])
            this.totals.list.push([0,0])
        }*/
        let preCards=[]
        for(let a=0,la=constants.playerNumber+16;a<la;a++){
            this.totals.list.push([0,0])
            preCards.push([])
        }
        let minim=this.query.name.toLowerCase().replace('\n',' ')
        for(let a=0,la=types.card.length;a<la;a++){
            let cardData=types.card[a]
            //if(cardData.list!=-10){
            let res=this.overListing(cardData)
            let sublist=res[0]
            let resultlist=res[1]
            
            this.totals.list[resultlist][0]++
            if(this.knownKey[a]){
                this.totals.list[resultlist][1]++
            }
            preCards[resultlist].push([a,sublist])
            /*if(
                (
                    this.query.name==''||
                    cardData.name.toLowerCase().replaceAll('\n',' ').includes(minim)&&!this.query.desc||
                    this.query.desc
                )&&
                (this.query.list.includes(sublist))&&
                (
                    cardData.rarity>=0&&cardData.rarity<=2&&this.query.rarity[cardData.rarity]||
                    (cardData.rarity<0||cardData.rarity>=3)&&this.query.rarity[3]
                )&&
                (
                    cardData.levels[this.query.level].class==1&&this.query.class[0]||
                    cardData.levels[this.query.level].class==2&&this.query.class[1]||
                    cardData.levels[this.query.level].class==3&&this.query.class[2]||
                    cardData.levels[this.query.level].class==11&&this.query.class[3]||
                    cardData.levels[this.query.level].class==4&&this.query.class[4]||
                    cardData.levels[this.query.level].class==5&&this.query.class[5]||
                    cardData.levels[this.query.level].class==6&&this.query.class[6]||
                    ![1,2,3,4,5,6,11].includes(cardData.levels[this.query.level].class)&&this.query.class[7]
                )
            ){
                names[resultlist][minim!=''&&cardData.name.toLowerCase().replaceAll('\n',' ').substr(0,this.query.name.length)!=minim?1:0].push(cardData.name)
            }*/
            //}
        }
        /*names.forEach(sub1=>sub1.forEach(sub2=>sub2=sub2.sort()))
        this.cards=[]
        let tick=0
        for(let a=0,la=names.length;a<la;a++){
            for(let b=0,lb=names[a].length;b<lb;b++){
                for(let c=0,lc=names[a][b].length;c<lc;c++){
                    let selector=findName(names[a][b][c],types.card)
                    this.cards.push(new card(this.layer,this.battle,0,this.layer.width/2-350+tick%8*100,this.layer.height/2-200+floor(tick/8)%3*130,selector,this.query.level,this.battle.standardColorize(selector),-1))
                    if(!this.known.includes(names[a][b][c])&&!game.dev){
                        this.cards[this.cards.length-1].blind=true
                    }else{
                        this.totals.query[0]++
                    }
                    this.totals.query[1]++
                    tick++
                }
            }
        }*/
        preCards.forEach(set=>set.sort((a,b)=>types.card[a[0]].name.localeCompare(types.card[b[0]].name)))
        if(this.cards.back.length==[]){
            for(let a=0,la=preCards.length;a<la;a++){
                for(let b=0,lb=preCards[a].length;b<lb;b++){
                    this.cards.back.push(new card(this.layer,this.battle,0,0,0,preCards[a][b][0],this.query.level,this.battle.standardColorize(preCards[a][b][0]),-1))
                    this.cards.back[this.cards.back.length-1].sublist=preCards[a][b][1]
                    if(!this.known.includes(types.card[preCards[a][b][0]].name)&&!game.dev){
                        this.cards.back[this.cards.back.length-1].blind=true
                    }else{
                        this.totals.query[0]++
                    }
                    this.totals.query[1]++
                }
            }
        }else{
            this.cards.back.forEach(card=>card.size=0)
        }
        let tick=0
        this.totals.query=[0,0]
        this.cards.front=this.query.name==''?
            this.cards.back.slice():
            this.query.desc?
            this.cards.back.filter(card=>card.getDesc().toLowerCase().replaceAll('\n',' ').includes(minim)):
            this.cards.back.filter(card=>card.name.toLowerCase().replaceAll('\n',' ').includes(minim))
        this.cards.front=this.cards.front.filter(card=>{
            return this.query.list.includes(card.sublist)&&
            (
                card.rarity>=0&&card.rarity<=2&&this.query.rarity[card.rarity]||
                (card.rarity<0||card.rarity>=3)&&this.query.rarity[3]
            )&&
            (
                card.spec.includes(12)?card.class:[card.class].some(a=>{
                    return a==1&&this.query.class[0]||
                        a==2&&this.query.class[1]||
                        a==3&&this.query.class[2]||
                        a==11&&this.query.class[3]||
                        a==4&&this.query.class[4]||
                        a==5&&this.query.class[5]||
                        a==6&&this.query.class[6]||
                        ![1,2,3,4,5,6,11].includes(a)&&this.query.class[7]
                })
            )
        })
        //print(this.cards.front.length,this.cards.back.length,fail.map(card=>card.name.replaceAll('\n',' ')).join('\n'))
        for(let a=0,la=this.cards.front.length;a<la;a++){
            this.cards.front[a].position.x=this.layer.width/2-350+tick%8*100
            this.cards.front[a].position.y=this.layer.height/2-200+floor(tick/8)%3*130
            if(!this.cards.front[a].blind){
                this.totals.query[0]++
            }
            this.totals.query[1]++
            tick++
        }
    }
    activate(name){
        if(!this.known.includes(name)&&!game.dev){
            this.known.push(name)
            this.knownKey[findName(name,types.card)]=true
            this.saveKey=true
        }
    }
    execute(){
        if(this.saveKey){
            this.saveData()
            this.saveKey=false
        }
    }
    getData(){
        let result=getItem('DP_MOVEBUILD_COLLECTION_KNOWN')
        this.known=result==null?[]:JSON.parse(result)
        result=getItem('DP_MOVEBUILD_COLLECTION_WON')
        if(result!=null){
            this.won=JSON.parse(result)
        }
        
        for(let a=0,la=types.card.length;a<la;a++){
            this.knownKey.push(false)
        }
        this.known.forEach(name=>this.knownKey[findName(name,types.card)]=true)
    }
    saveData(){
        this.known=this.known.filter(item=>!(typeof item=='object'&&item.length==0))
        storeItem('DP_MOVEBUILD_COLLECTION_KNOWN',JSON.stringify(this.known))
    }
    saveWon(){
        storeItem('DP_MOVEBUILD_COLLECTION_WON',JSON.stringify(this.won))
    }
    display(scene){
        switch(scene){
            case 'collection':
                this.layer.noStroke()
                this.layer.fill(240*this.anim.variant)
                //this.layer.rect(this.layer.width/2+225,this.layer.height*0.7+38.75,135,22.5)
                this.layer.rect(this.layer.width/2+262.5,this.layer.height*0.7+38.75,135,22.5)
                this.layer.fill(240*this.anim.desc)
                this.layer.rect(180,this.layer.height*0.7+52.5,135,22.5)
                this.layer.textSize(10)
			    //this.layer.text('MARK INGAME',this.layer.width/2+225,this.layer.height*0.7+38.75)
                this.layer.fill(255*(1-this.anim.variant))
                this.layer.text('MARK INGAME',this.layer.width/2+262.5,this.layer.height*0.7+38.75)
                this.layer.fill(255*(1-this.anim.desc))
                this.layer.text('SEARCH DESCRIPTIONS',180,this.layer.height*0.7+52.5)
                //this.layer.fill(255,this.anim.variant)
                //this.layer.ellipse(this.layer.width/2+295,this.layer.height*0.7+38.75,10)
                /*this.layer.fill(0)
                this.layer.stroke(120)
                //this.layer.strokeWeight(3)
                this.layer.strokeWeight(6.25)
                this.layer.rect(180,515,240,30,5)*/
                this.layer.textAlign(LEFT,CENTER)
                this.layer.fill(255)
                this.layer.noStroke()
                this.layer.textSize(12)
                //this.layer.text(this.query.name,65,515)
                this.layer.text(this.query.name,72,515)
                this.layer.textAlign(CENTER,CENTER)
                this.layer.textSize(10)
                this.layer.text(`${this.totals.query[0]}/${this.totals.query[1]}`,this.layer.width/2-75,this.layer.height*0.7+42.5)
                this.layer.text(`${this.page+1}/${max(1,ceil(this.cards.front.length/24))}`,this.layer.width/2+75,this.layer.height*0.7+42.5)
                this.layer.text('CHANGE LEVEL',180,this.layer.height*0.7+137.5)
                for(let a=0,la=this.cards.front.length;a<la;a++){
                    this.cards.front[a].fade=1
                    this.cards.front[a].anim={select:0,afford:1}
                    this.cards.front[a].display()
                }
                this.overlayManager.display()
            break
            case 'query':
                let names4=['COMMON','UNCOMMON','RARE','OTHER','ATTACK','DEFENSE','MOVEMENT','SKILL','POWER','STATUS','CURSE','OTHER']
			    this.layer.textSize(10)
                for(let a=0,la=4;a<la;a++){
                    this.layer.fill(240*this.anim.query.rarity[a])
                    this.layer.rect(this.layer.width/2-243.75+a%4*162.5,this.layer.height/2-65+floor(a/4)*40,135,22.5)
                    this.layer.fill(240*(1-this.anim.query.rarity[a]))
                    this.layer.text(names4[a],this.layer.width/2-243.75+a%4*162.5,this.layer.height/2-65+floor(a/4)*40)
                }
                for(let a=0,la=8;a<la;a++){
                    this.layer.fill(240*this.anim.query.class[a])
                    this.layer.rect(this.layer.width/2-243.75+a%4*162.5,this.layer.height/2+5+floor(a/4)*40,135,22.5)
                    this.layer.fill(240*(1-this.anim.query.class[a]))
                    this.layer.text(names4[a+4],this.layer.width/2-243.75+a%4*162.5,this.layer.height/2+5+floor(a/4)*40)
                }
                /*for(let a=0,la=4;a<la;a++){
                    if(this.anim.query.rarity[a]>0){
                        this.layer.fill(255,this.anim.query.rarity[a])
                        this.layer.ellipse(this.layer.width/2-215+a%4*190,this.layer.height/s2-65+floor(a/4)*40,10)
                    }
                }
                for(let a=0,la=8;a<la;a++){
                    if(this.anim.query.class[a]>0){
                        this.layer.fill(255,this.anim.query.class[a])
                        this.layer.ellipse(this.layer.width/2-215+a%4*190,this.layer.height/2+5+floor(a/4)*40,10)
                    }
                }*/
            break
            case 'listQuery':
                //let names2=['COLORLESS','STATUS','CURSE','PARTNER','ARCANA','SPECTRAL','JUNKYARD','SUBCARD','EVENT'/*,'RESERVE'*/,'DEVELOPER','REMOVED','BASIC','PACK','MISC']
                let names2=['COLORLESS','STATUS','CURSE','PARTNER','ARCANA','SPECTRAL','SUBCARD','EVENT','RESERVE','DEVELOPER','REMOVED','BASIC','PACK','MISC']
			    this.layer.textSize(10)
                for(let a=0,la=40;a<la;a++){
                    this.layer.fill(240*this.anim.query.list[a])
                    this.layer.rect(this.layer.width/2-325+a%5*162.5,this.layer.height/2-195+floor(a/5)*40,135,22.5)
                    this.layer.fill(240*(1-this.anim.query.list[a]))
                    this.layer.text(`${a>=constants.playerNumber?names2[a-constants.playerNumber]:types.combatant[a+1].name.toUpperCase()} (${this.totals.list[a][1]}/${this.totals.list[a][0]})`,this.layer.width/2-325+a%5*162.5,this.layer.height/2-195+floor(a/5)*40)
                }
                /*for(let a=0,la=40;a<la;a++){
                    if(this.anim.query.list[a]>0){
                        this.layer.fill(255,this.anim.query.list[a])
                        this.layer.ellipse(this.layer.width/2-215+a%4*190,this.layer.height/2-225+floor(a/4)*40,10)
                    }
                }
                this.layer.fill(255)
			    this.layer.textSize(10)
                let names2=['COLORLESS','STATUS','CURSE','PARTNER','ARCANA','SPECTRAL','SUBSPECTRAL','JUNKYARD','SUBCARD','EVENT','RESERVE','DEVELOPER','REMOVED','BASIC','PACK','MISC']
                for(let a=0,la=40;a<la;a++){
                    this.layer.text(`${a>=constants.playerNumber?names2[a-constants.playerNumber]:types.combatant[a+1].name.toUpperCase()} (${this.totals.list[a][1]}/${this.totals.list[a][0]})`,this.layer.width/2-298.75+a%4*190,this.layer.height/2-225+floor(a/4)*40)
                }*/
            break
        }
    }
    update(scene){
        switch(scene){
            case 'collection':
                this.anim.variant=smoothAnim(this.anim.variant,variants.collection,0,1,5)
                this.anim.desc=smoothAnim(this.anim.desc,this.query.desc,0,1,5)
                for(let a=0,la=this.cards.front.length;a<la;a++){
                    this.cards.front[a].upSize=a>=this.page*24&&a<this.page*24+24
                    this.cards.front[a].deSize=!this.cards.front[a].upSize
                    if(this.cards.front[a].upSize&&this.cards.front[a].size<1){
                        this.cards.front[a].size=round(this.cards.front[a].size*5+1)/5
                    }else if(this.cards.front[a].deSize&&this.cards.front[a].size>0){
                        this.cards.front[a].size=round(this.cards.front[a].size*5-1)/5
                    }
                }
                this.overlayManager.update()
            break
            case 'query':
                for(let a=0,la=4;a<la;a++){
                    this.anim.query.rarity[a]=smoothAnim(this.anim.query.rarity[a],this.query.rarity[a],0,1,5)
                }
                for(let a=0,la=8;a<la;a++){
                    this.anim.query.class[a]=smoothAnim(this.anim.query.class[a],this.query.class[a],0,1,5)
                }
            break
            case 'listQuery':
                let lists=[0,constants.playerNumber+1,constants.playerNumber+2,constants.playerNumber+3,constants.playerNumber+4,constants.playerNumber+5,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]
                for(let a=0,la=40;a<la;a++){
                    this.anim.query.list[a]=smoothAnim(this.anim.query.list[a],this.query.list.includes(a>=constants.playerNumber?lists[a-constants.playerNumber]:a+1),0,1,5)
                }
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'collection':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    //if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+295,y:this.layer.height*0.7+38.75},width:22.5,height:22.5})){
                    //if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225,y:this.layer.height*0.7+38.75},width:135,height:22.5})){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+262.5,y:this.layer.height*0.7+38.75},width:135,height:22.5})){
                        variants.collection=!variants.collection
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:180,y:this.layer.height*0.7+52.5},width:135,height:22.5})){
                        this.query.desc=!this.query.desc
                        this.executeQuery()
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:180,y:this.layer.height*0.7+137.5},width:135,height:22.5})){
                        this.query.level=(this.query.level+1)%3
                        this.reset()
                        this.executeQuery()
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-75,y:this.layer.height*0.7+95},width:62.5,height:62.5})&&this.page>0){
                        this.page--
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+75,y:this.layer.height*0.7+95},width:62.5,height:62.5})&&this.page<ceil(this.cards.front.length/24)-1){
                        this.page++
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.7+57.5},width:62.5,height:62.5})&&this.query.level<2){
                        this.query.level++
                        let holdPage=this.page
                        this.executeQuery()
                        this.page=holdPage
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.7+132.5},width:62.5,height:62.5})&&this.query.level>0){
                        this.query.level--
                        let holdPage=this.page
                        this.executeQuery()
                        this.page=holdPage
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+150,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                        transition.trigger=true
                        transition.scene='title'
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                        transition.trigger=true
                        transition.scene='query'
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+300,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                        transition.trigger=true
                        transition.scene='listQuery'
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+375,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                        this.overlayManager.overlays[0][0].active=true
                        this.overlayManager.overlays[0][0].activate([])
                    }
                }
            break
            case 'query':
                for(let a=0,la=12;a<la;a++){
                    //if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215+a%4*190,y:this.layer.height/2-65+(a>=4?30:0)+floor(a/4)*40},width:22.5,height:22.5})){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-243.75+a%4*162.5,y:this.layer.height/2-65+(a>=4?30:0)+floor(a/4)*40},width:135,height:22.5})){
                        this.query[a>=4?'class':'rarity'][a>=4?a-4:a]=!this.query[a>=4?'class':'rarity'][a>=4?a-4:a]
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-105,y:this.layer.height*0.7+25},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='collection'
                    this.executeQuery()
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.7+25},width:62.5,height:62.5})){
                    this.query.rarity=[false,false,false,false]
                    this.query.class=[false,false,false,false,false,false,false,false]
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+105,y:this.layer.height*0.7+25},width:62.5,height:62.5})){
                    this.query.rarity=[true,true,true,true]
                    this.query.class=[true,true,true,true,true,true,true,true]
                }
            break
            case 'listQuery':
                let lists=[0,constants.playerNumber+1,constants.playerNumber+2,constants.playerNumber+3,constants.playerNumber+4,constants.playerNumber+5,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]
                for(let a=0,la=40;a<la;a++){
                    //if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215+a%4*190,y:this.layer.height/2-225+floor(a/4)*40},width:22.5,height:22.5})){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-325+a%5*162.5,y:this.layer.height/2-190+floor(a/5)*40},width:135,height:22.5})){
                        let value=a>=constants.playerNumber?lists[a-constants.playerNumber]:a+1
                        if(this.query.list.includes(value)){
                            this.query.list.splice(this.query.list.indexOf(value),1)
                        }else{
                            this.query.list.push(value)
                        }
                    }
                }
                //if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-105,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-105,y:this.layer.height*0.7+45},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='collection'
                    this.executeQuery()
                }
                //if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.7+45},width:62.5,height:62.5})){
                    this.query.list=[]
                }
                //if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+105,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+105,y:this.layer.height*0.7+45},width:62.5,height:62.5})){
                    this.query.list=[]
                    for(let a=-10,la=constants.playerNumber+6;a<la;a++){
                        this.query.list.push(a)
                    }
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'collection':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    if(key=='~'){
                        variants.collection=!variants.collection
                    }
                    if(key=='`'){
                        this.query.desc=!this.query.desc
                        this.executeQuery()
                    }
                    if(key=='+'){
                        this.query.level=(this.query.level+1)%3
                        this.reset()
                        this.executeQuery()
                    }
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }
                    if(code==RIGHT_ARROW&&this.page<ceil(this.cards.front.length/24)-1){
                        this.page++
                    }
                    if(code==UP_ARROW&&this.query.level<2){
                        this.query.level++
                        let holdPage=this.page
                        this.executeQuery()
                        this.page=holdPage
                    }
                    if(code==DOWN_ARROW&&this.query.level>0){
                        this.query.level--
                        let holdPage=this.page
                        this.executeQuery()
                        this.page=holdPage
                    }
                    if(code==ENTER){
                        transition.trigger=true
                        transition.scene='title'
                    }else if(key=='['){
                        transition.trigger=true
                        transition.scene='query'
                    }else if(key==']'){
                        transition.trigger=true
                        transition.scene='listQuery'
                    }else{
                        this.possible=` ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678990+=-_<>,./?;':"{}`
                        if(this.possible.includes(key)&&this.query.name.length<30){
                            this.query.name+=key
                            this.executeQuery()
                        }else if(code==BACKSPACE&&this.query.name.length>0){
                            this.query.name=this.query.name.substring(0,this.query.name.length-1)
                            this.executeQuery()
                        }
                    }
                }
            break
            case 'query':
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='collection'
                    this.executeQuery()
                }
                if(code==BACKSPACE){
                    this.query.rarity=[false,false,false,false]
                    this.query.class=[false,false,false,false,false,false,false,false]
                }
            break
            case 'listQuery':
                let lists=[0,constants.playerNumber+1,constants.playerNumber+2,constants.playerNumber+3,constants.playerNumber+4,constants.playerNumber+5,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]
                if(key==' '&&int(inputs.lastKey[0])>=0&&int(inputs.lastKey[0])<=7/*9*/&&int(inputs.lastKey[1])>=1&&int(inputs.lastKey[1])<=4){
                    let index=(int(inputs.lastKey[0])+9)%10*5+int(inputs.lastKey[1])-1
                    //let index=(int(inputs.lastKey[0])+9)%10*4+int(inputs.lastKey[1])-1
                    let value=index>=constants.playerNumber?lists[index-constants.playerNumber]:index+1
                    if(this.query.list.includes(value)){
                        this.query.list.splice(this.query.list.indexOf(value),1)
                    }else{
                        this.query.list.push(value)
                    }
                }
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='collection'
                    this.executeQuery()
                }
                if(code==BACKSPACE){
                    this.query.list=[]
                }
            break
        }
    }
}