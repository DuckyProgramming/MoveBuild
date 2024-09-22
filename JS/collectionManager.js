class collectionManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.known=[]
        this.saveKey=false
        this.cards=[]
        this.anim={query:{list:[],rarity:[],class:[]}}
        this.level=0
        this.page=0
        this.totals=[0,0]
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

        this.getData()
    }
    executeQuery(){
        this.page=0
        this.totals=[0,0]
        let names=[]
        for(let a=0,la=constants.playerNumber+16;a<la;a++){
            names.push([[],[]])
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
            }else if(cardData.list==-9){
                sublist=-5
                resultlist=constants.playerNumber+10
            }else if(cardData.rarity==-5&&cardData.list==-1){
                sublist=-6
                resultlist=constants.playerNumber+11
            }else if(cardData.rarity==-1&&cardData.list==-8){
                sublist=-7
                resultlist=constants.playerNumber+12
            }else if(cardData.rarity==-2){
                sublist=-8
                resultlist=constants.playerNumber+13
            }else if(cardData.rarity==-3){
                sublist=-9
                resultlist=constants.playerNumber+14
            }else{
                sublist=-10
                resultlist=constants.playerNumber+15
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
                        this.totals[0]++
                    }
                    this.totals[1]++
                    tick++
                }
            }
        }
    }
    activate(name){
        if(!this.known.includes(name)&&!game.dev){
            this.known.push(name)
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
    }
    saveData(){
        storeItem('DP_MOVEBUILD_COLLECTION_KNOWN',JSON.stringify(this.known))
    }
    display(scene){
        switch(scene){
            case 'collection':
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
                this.layer.text(`${this.totals[0]}/${this.totals[1]}`,this.layer.width/2-75,this.layer.height*0.7+42.5)
                this.layer.text(`${this.page+1}/${max(1,ceil(this.cards.length/24))}`,this.layer.width/2+75,this.layer.height*0.7+42.5)
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].fade=1
                    this.cards[a].anim={select:0,afford:1}
                    this.cards[a].display()
                }
            break
            case 'query':
                for(let a=0,la=4;a<la;a++){
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
                }
            break
            case 'listQuery':
                for(let a=0,la=36;a<la;a++){
                    if(this.anim.query.list[a]>0){
                        this.layer.fill(255,this.anim.query.list[a])
                        this.layer.ellipse(this.layer.width/2-215+a%4*190,this.layer.height/2-205+floor(a/4)*40,10)
                    }
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'collection':
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].upSize=a>=this.page*24&&a<this.page*24+24
                    this.cards[a].deSize=!this.cards[a].upSize
                    if(this.cards[a].upSize&&this.cards[a].size<1){
                        this.cards[a].size=round(this.cards[a].size*5+1)/5
                    }else if(this.cards[a].deSize&&this.cards[a].size>0){
                        this.cards[a].size=round(this.cards[a].size*5-1)/5
                    }
                }
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
                for(let a=0,la=36;a<la;a++){
                    this.anim.query.list[a]=smoothAnim(this.anim.query.list[a],this.query.list.includes(a>=constants.playerNumber?lists[a-constants.playerNumber]:a+1),0,1,5)
                }
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'collection':
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
            break
            case 'query':
                for(let a=0,la=12;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215+a%4*190,y:this.layer.height/2-65+(a>=4?30:0)+floor(a/4)*40},width:22.5,height:22.5})){
                        this.query[a>=4?'class':'rarity'][a>=4?a-4:a]=!this.query[a>=4?'class':'rarity'][a>=4?a-4:a]
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-52.5,y:this.layer.height*0.7+25},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='collection'
                    this.executeQuery()
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+52.5,y:this.layer.height*0.7+25},width:62.5,height:62.5})){
                    this.query.rarity=[false,false,false,false]
                    this.query.class=[false,false,false,false,false,false,false,false]
                }
            break
            case 'listQuery':
                let lists=[0,constants.playerNumber+1,constants.playerNumber+2,constants.playerNumber+3,constants.playerNumber+4,constants.playerNumber+5,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]
                for(let a=0,la=36;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215+a%4*190,y:this.layer.height/2-205+floor(a/4)*40},width:22.5,height:22.5})){
                        let value=a>=constants.playerNumber?lists[a-constants.playerNumber]:a+1
                        if(this.query.list.includes(value)){
                            this.query.list.splice(this.query.list.indexOf(value),1)
                        }else{
                            this.query.list.push(value)
                        }
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-52.5,y:this.layer.height*0.7+70},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='collection'
                    this.executeQuery()
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+52.5,y:this.layer.height*0.7+70},width:62.5,height:62.5})){
                    this.query.list=[]
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'collection':
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
                if(key==' '&&int(inputs.lastKey[0])>=1&&int(inputs.lastKey[0])<=9&&int(inputs.lastKey[1])>=1&&int(inputs.lastKey[1])<=4){
                    let index=(int(inputs.lastKey[0])+9)%10*4+int(inputs.lastKey[1])-1
                    let value=index>=constants.playerNumber?lists[index=constants.playerNumber]:index+1
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