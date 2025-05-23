class collectionManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.known=[]
        this.knownKey=[]
        this.saveKey=false
        this.cards=[]
        this.anim={query:{list:[],rarity:[],class:[]},variant:0}
        this.level=0
        this.page=0
        this.totals={query:[0,0],list:[]}
        this.query={
            name:'',
            list:[],
            rarity:[],
            class:[],
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
    executeQuery(){
        this.page=0
        this.totals={query:[0,0],list:[]}
        let names=[]
        for(let a=0,la=constants.playerNumber+16;a<la;a++){
            names.push([[],[]])
            this.totals.list.push([0,0])
        }
        for(let a=0,la=types.card.length;a<la;a++){
            let cardData=types.card[a]
            let sublist=0
            let resultlist=0
            if(cardData.rarity>=0&&cardData.list>=0&&cardData.list<=constants.playerNumber+5){
                sublist=cardData.list
                resultlist=cardData.list==0?constants.playerNumber:cardData.list<=constants.playerNumber?cardData.list-1:cardData.list
            }else if(cardData.rarity<0&&cardData.list==constants.playerNumber+5){
                sublist=-1
                resultlist=constants.playerNumber+6
            }else if(cardData.rarity==-10){
                sublist=-2
                resultlist=constants.playerNumber+7
            }else if(cardData.rarity==-6){
                sublist=-3
                resultlist=constants.playerNumber+8
            }else if(cardData.rarity==-8){
                sublist=-4
                resultlist=constants.playerNumber+9
            }/*else if(cardData.list==-9){
                sublist=-5
                resultlist=constants.playerNumber+10
            }*/else if(cardData.rarity==-5&&cardData.list==-1){
                sublist=-5
                resultlist=constants.playerNumber+10
            }else if(cardData.rarity==-1&&cardData.list==-8){
                sublist=-6
                resultlist=constants.playerNumber+11
            }else if(cardData.rarity==-2){
                sublist=-7
                resultlist=constants.playerNumber+12
            }else if(cardData.rarity==-3){
                sublist=-8
                resultlist=constants.playerNumber+13
            }else{
                sublist=-9
                resultlist=constants.playerNumber+14
            }
            this.totals.list[resultlist][0]++
            if(this.knownKey[a]){
                this.totals.list[resultlist][1]++
            }
            if(
                (this.query.name==''||cardData.name.toLowerCase().replace('\n',' ').includes(this.query.name.toLowerCase().replace('\n',' ')))&&
                (this.query.list.includes(sublist))&&
                (cardData.rarity>=0&&cardData.rarity<=2&&this.query.rarity[cardData.rarity]||(cardData.rarity<0||cardData.rarity>=3)&&this.query.rarity[3])&&
                (
                    cardData.levels[this.level].class==1&&this.query.class[0]||
                    cardData.levels[this.level].class==2&&this.query.class[1]||
                    cardData.levels[this.level].class==3&&this.query.class[2]||
                    cardData.levels[this.level].class==11&&this.query.class[3]||
                    cardData.levels[this.level].class==4&&this.query.class[4]||
                    cardData.levels[this.level].class==5&&this.query.class[5]||
                    cardData.levels[this.level].class==6&&this.query.class[6]||
                    ![1,2,3,4,5,6,11].includes(cardData.levels[this.level].class)&&this.query.class[7]
                )
            ){
                names[resultlist][this.query.name.toLowerCase().replace('\n',' ')!=''&&cardData.name.toLowerCase().replace('\n',' ').substr(0,this.query.name.length)!=this.query.name.toLowerCase().replace('\n',' ')?1:0].push(cardData.name)
            }
        }
        names.forEach(sub1=>sub1.forEach(sub2=>sub2=sub2.sort()))
        this.cards=[]
        let tick=0
        for(let a=0,la=names.length;a<la;a++){
            for(let b=0,lb=names[a].length;b<lb;b++){
                for(let c=0,lc=names[a][b].length;c<lc;c++){
                    let selector=findName(names[a][b][c],types.card)
                    this.cards.push(new card(this.layer,this.battle,0,this.layer.width/2-350+tick%8*100,this.layer.height/2-200+floor(tick/8)%3*130,selector,this.level,this.battle.standardColorize(selector),-1))
                    if(!this.known.includes(names[a][b][c])){
                        this.cards[this.cards.length-1].blind=true
                    }else{
                        this.totals.query[0]++
                    }
                    this.totals.query[1]++
                    tick++
                }
            }
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
        for(let a=0,la=types.card.length;a<la;a++){
            this.knownKey.push(false)
        }
        this.known.forEach(name=>this.knownKey[findName(name,types.card)]=true)
    }
    saveData(){
        this.known=this.known.filter(item=>!(typeof item=='object'&&item.length==0))
        storeItem('DP_MOVEBUILD_COLLECTION_KNOWN',JSON.stringify(this.known))
    }
    display(scene){
        switch(scene){
            case 'collection':
                this.layer.noStroke()
                this.layer.fill(240*this.anim.variant)
                this.layer.rect(this.layer.width/2+225,this.layer.height*0.7+38.75,135,22.5)
                this.layer.fill(240*(1-this.anim.variant))
                this.layer.textSize(10)
			    this.layer.text('MARK INGAME',this.layer.width/2+225,this.layer.height*0.7+38.75)
                //this.layer.fill(255,this.anim.variant)
                //this.layer.ellipse(this.layer.width/2+295,this.layer.height*0.7+38.75,10)
                this.layer.fill(0)
                this.layer.stroke(120)
                this.layer.strokeWeight(3)
                this.layer.rect(180,515,240,30,5)
                this.layer.textAlign(LEFT,CENTER)
                this.layer.fill(255)
                this.layer.noStroke()
                this.layer.textSize(12)
                this.layer.text(this.query.name,65,515)
                this.layer.textAlign(CENTER,CENTER)
                this.layer.textSize(10)
                this.layer.text(`${this.totals.query[0]}/${this.totals.query[1]}`,this.layer.width/2-75,this.layer.height*0.7+42.5)
                this.layer.text(`${this.page+1}/${max(1,ceil(this.cards.length/24))}`,this.layer.width/2+75,this.layer.height*0.7+42.5)
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].fade=1
                    this.cards[a].anim={select:0,afford:1}
                    this.cards[a].display()
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
                        this.layer.ellipse(this.layer.width/2-215+a%4*190,this.layer.height/2-65+floor(a/4)*40,10)
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
                let names2=['COLORLESS','STATUS','CURSE','PARTNER','ARCANA','SPECTRAL','SUBSPECTRAL','JUNKYARD','SUBCARD','EVENT','DEVELOPER','REMOVED','BASIC','PACK','MISC']
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
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].upSize=a>=this.page*24&&a<this.page*24+24
                    this.cards[a].deSize=!this.cards[a].upSize
                    if(this.cards[a].upSize&&this.cards[a].size<1){
                        this.cards[a].size=round(this.cards[a].size*5+1)/5
                    }else if(this.cards[a].deSize&&this.cards[a].size>0){
                        this.cards[a].size=round(this.cards[a].size*5-1)/5
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
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225,y:this.layer.height*0.7+38.75},width:135,height:22.5})){
                        variants.collection=!variants.collection
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-75,y:this.layer.height*0.7+95},width:62.5,height:62.5})&&this.page>0){
                        this.page--
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+75,y:this.layer.height*0.7+95},width:62.5,height:62.5})&&this.page<ceil(this.cards.length/24)-1){
                        this.page++
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.7+57.5},width:62.5,height:62.5})&&this.level<2){
                        this.level++
                        let holdPage=this.page
                        this.executeQuery()
                        this.page=holdPage
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.7+132.5},width:62.5,height:62.5})&&this.level>0){
                        this.level--
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
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }
                    if(code==RIGHT_ARROW&&this.page<ceil(this.cards.length/24)-1){
                        this.page++
                    }
                    if(code==UP_ARROW&&this.level<2){
                        this.level++
                        let holdPage=this.page
                        this.executeQuery()
                        this.page=holdPage
                    }
                    if(code==DOWN_ARROW&&this.level>0){
                        this.level--
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