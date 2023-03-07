class combatant{
    constructor(layer,x,y,tileX,tileY,type,direction,mode){
        this.layer=layer
        this.position={x:x,y:y}
        this.tilePosition={x:tileX,y:tileY}
        this.type=type
        this.mode=mode
        this.offset={position:{x:0,y:140}}
        this.fade=0

        this.life=types.combatant[this.type].life

        this.base={life:this.life}
        
        switch(this.type){
            case 1:
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},
                    eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                    kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                    legs:[
                        {top:18,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                        {top:18,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
                    ],arms:[
                        {top:27,bottom:9,length:{top:16,bottom:16}},
                        {top:27,bottom:9,length:{top:16,bottom:16}}
                    ]}

                this.hair={
                    main:[
                        {spin:[0,45,45],height:3},
                        {spin:[-45,0,-45],height:3},
                        {spin:[15,150,75],height:10},
                        {spin:[-150,-15,-75],height:10},
                        {spin:[127.5,232.5,180],height:50},
                        {spin:[45,195,120],height:15},
                        {spin:[-195,-45,-120],height:15},
                        {spin:[75,225,142.5],height:20},
                        {spin:[-225,-75,-142.5],height:20},
                    ],inside:[
                        {spin:[24,60,30],height:3.5},
                        {spin:[-60,-24,-30],height:3.5},
                        {spin:[30,150,60],height:8.5},
                        {spin:[-150,-30,-60],height:8.5},
                        {spin:[127.5,232.5,-170],height:25},
                        {spin:[127.5,232.5,170],height:25},
                        {spin:[45,195,120],height:12},
                        {spin:[-195,-45,-120],height:12},
                        {spin:[75,225,150],height:16},
                        {spin:[-225,-75,-150],height:16},
                    ],
                }

                this.tail=[]

                this.kimono={main:[],outside:[],outsideTop:[],decoration:{large:[]}}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    bow:{center:0,loop:[-24,24]},
                    under:{top:[],bottom:[],tanga:24,piece:36,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                    underBow:{top:{center:0,end:[-4,4],loop:[-12,12]},bottom:{center:0,end:[-5,5],loop:[-15,15]}},
                    sandal:[10,-10],eye:[-18,18],flower:[54],button:0,mouth:36}

                this.color={
                    hair:{back:[30,70,40],front:[40,90,50],insideBack:[25,60,35],insideFront:[35,80,45],glow:[50,110,60]},
                    skin:{head:[255,225,200],body:[255,215,190],legs:[255,215,190],arms:[255,215,190],button:[245,180,145]},
                    eye:{back:[40,70,45],front:[10,30,15],glow:[175,255,175]},
                    under:{outside:[50,125,50],fringe:[100,200,100],tanga:[200,210,200],bow:[200,255,200],decoration:[50,175,50],under:{top:[250,195,170],button:[200,145,120],bottom:[[255,228,181],[241,178,131]]}},
                    kimono:{main:{start:[90,110,105],end:[150,170,165]},mainBack:{start:[30,60,40],end:[70,100,80]},decoration:[[75,175,75]],
                    outside:{start:[110,180,120],end:[115,215,180]},outsideBack:{start:[70,120,80],end:[75,155,140]},
                    bow:[125,225,175]},
                    band:[100,165,100],mouth:{in:[225,125,125],out:[0,0,0]},
                }

                this.parts={eyeLevel:-72,flowerLevel:-77.5,mouth:-69,
                    under:{top:-51,bottom:-31,bow:{top:2.75,bottom:-5}},
                    kimono:{main:-58,outside:-59,bow:-53},
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

                this.fades={flower:1,eye:[1,1],band:1,mouth:1,
                    sandal:{back:[1,1],front:[1,1]},
                    skin:{legs:1,arms:1,body:1,head:1,button:1},
                    kimono:{decoration:{fade:{large:1},position:{large:{x:1,y:1}},size:{large:{x:1,y:1}}},
                    main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}},bow:1},
                    under:{top:1,bottom:1,tanga:1,bow:{top:1,bottom:1},under:{top:1,button:1,bottom:1}},
                }

                this.trigger={display:{flower:true,band:true,mouth:true,
                    hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[true,true],front:[true,true]},
                    skin:{legs:true,arms:true,body:true,head:true,button:true},
                    kimono:{main:{back:true,front:true},outside:{back:true,front:true},bow:true,decoration:{large:true}},
                    under:{top:false,bottom:false,tanga:true,bow:{top:false,bottom:false},under:{top:false,button:false,bottom:false}},
                }}

                this.trigger.display.mode={
                    sandal:{edge:0},
                }

                this.trigger.display.extra={sword:false}

                this.calc={int:[0,0,0,0]}

                this.sprites={detail:3,genAmount:0,animDirection:0,spin:0,spinDetail:0,temp:0,hair:{back:[],front:[],tail:[]},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]}}}

                this.generated={parts:[false],sprites:[false,false]}

                this.generateGeneral(0)

                this.animSet={active:false,loop:0,flip:0}

                this.goal={anim:{direction:this.anim.direction}}
            break

        }

        this.size=2
    }
    generateGeneral(type){
        if(this.mode==0){
            this.sprites.genAmount=360/this.sprites.detail
        }else{
            this.sprites.genAmount=1
        }
        if(type==0||type==1){
            switch(this.type){
                case 1:
                    if(this.trigger.display.kimono.main.back||this.trigger.display.kimono.main.front){this.generateParts(0)}
                    if(this.trigger.display.kimono.outside.back||this.trigger.display.kimono.outside.front){this.generateParts(1)}
                    if(this.trigger.display.under.top||this.trigger.display.under.bottom){this.generateParts(2)}
                    if(this.trigger.display.kimono.decoration.large){this.generateParts(3)}
                break
            }
        }
        if(type==0||type==2){
            switch(this.type){
                case 1:
                    if(this.trigger.display.hair.back||this.trigger.display.hair.front){this.generateSprites(0)}
                    if(this.trigger.display.kimono.main.back||this.trigger.display.kimono.main.front){this.generateSprites(1)}
                    if(this.trigger.display.kimono.outside.back||this.trigger.display.kimono.outside.front){this.generateSprites(2)}
                break
            }
        }
    }
    generateParts(type){
        this.generated.parts[type]=true
        /*switch(this.type){
            case 1:
                switch(type){
                    case 0:
                        for(let g=0;g<5;g++){
                            this.kimono.main.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,13.5+g*4.5]})
                            this.kimono.main.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[13.5+g*4.5,0,14+g*4.5]})
                            this.kimono.main.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,16+g*4.5,14+g*4.5]})
                            this.kimono.main.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,16+g*4.5]})
                            this.kimono.main.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[16+g*4.5,0,15.5+g*4.5]})
                            this.kimono.main.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,18+g*4.5,15.5+g*4.5]})
                        }
                        this.kimono.main.push({spin:[117,132,132],y:[0,0,36]})
                        for(let g=0;g<2;g++){
                            this.kimono.main.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,34,36+g*0.5]})
                            this.kimono.main.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,34]})
                            this.kimono.main.push({spin:[146+g*48,156+g*48,156+g*48],y:[34,0,35]})
                            this.kimono.main.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,34,35]})
                            this.kimono.main.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,34]})
                            this.kimono.main.push({spin:[166+g*48,180+g*48,180+g*48],y:[34,0,36.5-g*0.5]})
                        }
                        this.kimono.main.push({spin:[228,243,228],y:[0,0,36]})
                        for(let g=4;g>=-3;g--){
                            this.kimono.main.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,18+g*4.5,15.5+g*4.5]})
                            this.kimono.main.push({spin:[84-g*48,75-g*48,72-g*48],y:[16+g*4.5,0,15.5+g*4.5]})
                            this.kimono.main.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,16+g*4.5]})
                            this.kimono.main.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,16+g*4.5,14+g*4.5]})
                            this.kimono.main.push({spin:[108-g*48,92-g*48,87-g*48],y:[13.5+g*4.5,0,14+g*4.5]})
                            this.kimono.main.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,13.5+g*4.5]})
                        }
                    break
                    case 1:
                        for(let g=1;g<5;g++){
                            this.kimono.outside.push({spin:[-90+g*48,-36+g*48,-48+g*48],y:[0,0,16+g*5.5-15]})
                            this.kimono.outside.push({spin:[-48+g*48,-32+g*48,-27+g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
                            this.kimono.outside.push({spin:[-32+g*48,-24+g*48,-27+g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
                            this.kimono.outside.push({spin:[-32+g*48,-8+g*48,-24+g*48],y:[0,0,17.5+g*5.5-15]})
                            this.kimono.outside.push({spin:[-24+g*48,-15+g*48,-12+g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
                            this.kimono.outside.push({spin:[-15+g*48,g*48,-12+g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
                        }
                        for(let g=4;g>=0;g--){
                            this.kimono.outside.push({spin:[15-g*48,-g*48,12-g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
                            this.kimono.outside.push({spin:[24-g*48,15-g*48,12-g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
                            this.kimono.outside.push({spin:[32-g*48,8-g*48,24-g*48],y:[0,0,17.5+g*5.5-15]})
                            this.kimono.outside.push({spin:[32-g*48,24-g*48,27-g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
                            this.kimono.outside.push({spin:[48-g*48,32-g*48,27-g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
                            this.kimono.outside.push({spin:[60-g*48,36-g*48,48-g*48],y:[0,0,16+g*5.5-15]})
                        }
                        for(let g=0;g<12;g++){
                            this.kimono.outsideTop.push({spin:[-90-g*30,-60-g*30,-75-g*30],y:[0,0,-0.5]})
                        }
                    break
                    case 2:
                        for(let g=0;g<25;g++){
                            this.spin.under.top.push(g*72/5)
                        }
                        for(let g=0;g<20;g++){
                            this.spin.under.bottom.push(g*18)
                        }
                    break
                    case 3:
                        for(let g=0;g<2;g++){
                            this.kimono.decoration.large.push({spin:90-g*47.5,rotate:random(0,360),y:46-g*4.5,width:0.2,height:1,type:0})
                        }
                        this.kimono.decoration.large.push({spin:134,rotate:random(0,360),y:49,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:180,rotate:random(0,360),y:50,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:226,rotate:random(0,360),y:49,width:0.2,height:1,type:0})
                        for(let g=0;g<7;g++){
                            this.kimono.decoration.large.push({spin:270+g*47.5,rotate:random(0,360),y:46-g*4.5,width:0.2,height:1,type:0})
                        }

                        this.kimono.decoration.large.push({spin:78,rotate:random(0,360),y:38,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:118,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:156,rotate:random(0,360),y:44,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:204,rotate:random(0,360),y:44,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:242,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
                        for(let g=0;g<5;g++){
                            this.kimono.decoration.large.push({spin:282+g*47.5,rotate:random(0,360),y:38-g*4.4,width:0.2,height:1,type:0})
                        }

                        this.kimono.decoration.large.push({spin:96,rotate:random(0,360),y:34,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:138,rotate:random(0,360),y:36,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:180,rotate:random(0,360),y:38,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:222,rotate:random(0,360),y:36,width:0.2,height:1,type:0})
                        for(let g=0;g<4;g++){
                            this.kimono.decoration.large.push({spin:264+g*47.5,rotate:random(0,360),y:32.5-g*4.4,width:0.2,height:1,type:0})
                        }

                        this.kimono.decoration.large.push({spin:154,rotate:random(0,360),y:30,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:206,rotate:random(0,360),y:30,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:254,rotate:random(0,360),y:27,width:0.2,height:1,type:0})
                        this.kimono.decoration.large.push({spin:302,rotate:random(0,360),y:22,width:0.2,height:1,type:0})

                        this.kimono.decoration.large.push({spin:218,rotate:random(0,360),y:24,width:0.2,height:1,type:0})
                    break
                }
            break

        }*/
    }
    generateSprites(type){
        this.generated.sprites[type]=true
        /*switch(this.type){
            case 1:
                switch(type){
                    case 0:
                        this.sprites.hair={front:[],back:[]}
                        for(let g=0;g<this.sprites.genAmount;g++){
                            this.sprites.hair.front.push(createGraphics(250,500))
                            setupLayer(this.sprites.hair.front[g])
                            this.sprites.hair.front[g].translate(125,100)
                            this.sprites.hair.front[g].scale(5)
                            this.generateSprite(this.sprites.hair.front[g],0,g*this.sprites.detail)
                            print('Generated HF-'+(g+1))
                            this.sprites.hair.back.push(createGraphics(250,500))
                            setupLayer(this.sprites.hair.back[g])
                            this.sprites.hair.back[g].translate(125,100)
                            this.sprites.hair.back[g].scale(5)
                            this.generateSprite(this.sprites.hair.back[g],1,g*this.sprites.detail)
                            print('Generated HB-'+(g+1))
                        }
                    break
                    case 1:
                        this.sprites.kimono.main={front:[],back:[]}
                        for(let g=0;g<this.sprites.genAmount;g++){
                            this.sprites.kimono.main.front.push(createGraphics(150,330))
                            setupLayer(this.sprites.kimono.main.front[g])
                            this.sprites.kimono.main.front[g].translate(75,0)
                            this.sprites.kimono.main.front[g].scale(5)
                            this.generateSprite(this.sprites.kimono.main.front[g],4,g*this.sprites.detail)
                            print('Generated KMF-'+(g+1))
                            this.sprites.kimono.main.back.push(createGraphics(150,330))
                            setupLayer(this.sprites.kimono.main.back[g])
                            this.sprites.kimono.main.back[g].translate(75,0)
                            this.sprites.kimono.main.back[g].scale(5)
                            this.generateSprite(this.sprites.kimono.main.back[g],5,g*this.sprites.detail)
                            print('Generated KMB-'+(g+1))
                        }
                    break
                    case 2:
                        this.sprites.kimono.outside={front:[],back:[]}
                        for(let g=0;g<this.sprites.genAmount;g++){
                            this.sprites.kimono.outside.front.push(createGraphics(150,330))
                            setupLayer(this.sprites.kimono.outside.front[g])
                            this.sprites.kimono.outside.front[g].translate(75,0)
                            this.sprites.kimono.outside.front[g].scale(5)
                            this.generateSprite(this.sprites.kimono.outside.front[g],2,g*this.sprites.detail)
                            print('Generated KOF-'+(g+1))
                            this.sprites.kimono.outside.back.push(createGraphics(150,330))
                            setupLayer(this.sprites.kimono.outside.back[g])
                            this.sprites.kimono.outside.back[g].translate(75,0)
                            this.sprites.kimono.outside.back[g].scale(5)
                            this.generateSprite(this.sprites.kimono.outside.back[g],3,g*this.sprites.detail)
                            print('Generated KOB-'+(g+1))
                        }
                    break
                }
            break
            
        }*/
    }
    generateSprite(layer,type,direction){
        if(this.mode==0){
            this.sprites.animDirection=direction
        }else{
            this.sprites.animDirection=this.anim.direction
        }
        switch(type){
            case 0:
                this.controlSpin(this.hair.inside,this.sprites.animDirection,0)
                this.displayTrianglesFront(layer,this.hair.inside,this.sprites.animDirection,0,33,1,0.1,this.color.hair.insideFront,1)
                this.controlSpin(this.hair.main,this.sprites.animDirection,0)
                this.displayTrianglesFront(layer,this.hair.main,this.sprites.animDirection,0,35,1,0.1,this.color.hair.front,1)
                layer.arc(0,0,35,34,-180,0)
                layer.line(-17.5,0,17.5,0)
            break
            case 1:
                this.displayTrianglesBack(layer,this.hair.main,this.sprites.animDirection,0,35,1,0.1,this.color.hair.back,1)
                this.displayTrianglesBack(layer,this.hair.inside,this.sprites.animDirection,0,33,1,0.1,this.color.hair.insideBack,1)
            break
            case 2:
                this.controlSpin(this.kimono.outside,this.sprites.animDirection,1)
                this.displayTrianglesFrontMerge(layer,this.kimono.outside,this.sprites.animDirection,20,9,0.5,0.2,this.color.kimono.outside.start,this.color.kimono.outside.end,1)
                this.controlSpin(this.kimono.outsideTop,this.sprites.animDirection,1)
                this.displayTrianglesFrontMerge(layer,this.kimono.outsideTop,this.sprites.animDirection,20,9,0.5,0.2,this.color.kimono.outside.start,this.color.kimono.outside.end,1)
            break
            case 3:
                this.displayTrianglesBackMerge(layer,this.kimono.outside,this.sprites.animDirection,20,9,0.5,0.2,this.color.kimono.outsideBack.start,this.color.kimono.outsideBack.end,1)
            break
            case 4:
                this.controlSpin(this.kimono.main,this.sprites.animDirection,1)
                this.displayTrianglesFrontMerge(layer,this.kimono.main,this.sprites.animDirection,20,9.25,0.5,0.16,this.color.kimono.main.start,this.color.kimono.main.end,1)
            break
            case 5:
                this.displayTrianglesBackMerge(layer,this.kimono.main,this.sprites.animDirection,20,9.25,0.5,0.16,this.color.kimono.mainBack.start,this.color.kimono.mainBack.end,1)
            break
        }
    }
    calculateParts(){
        switch(this.type){
            case 1:
                for(let g=0;g<2;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+sin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+cos(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].bottom.x=this.parts.legs[g].middle.x+sin(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].bottom.y=this.parts.legs[g].middle.y+cos(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].sandal.front.x=this.parts.legs[g].middle.x+sin(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.front
                    this.parts.legs[g].sandal.front.y=this.parts.legs[g].middle.y+cos(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.front
                    this.parts.legs[g].sandal.back.x=this.parts.legs[g].middle.x+sin(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.back
                    this.parts.legs[g].sandal.back.y=this.parts.legs[g].middle.y+cos(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.back

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*sin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*sin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y
                    this.graphics.legs[g].bottom.x=this.parts.legs[g].bottom.x*sin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].bottom.y=this.parts.legs[g].bottom.y
                    this.graphics.legs[g].sandal.front.x=this.parts.legs[g].sandal.front.x*sin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].sandal.front.y=this.parts.legs[g].sandal.front.y
                    this.graphics.legs[g].sandal.back.x=this.parts.legs[g].sandal.back.x*sin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].sandal.back.y=this.parts.legs[g].sandal.back.y

                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+sin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+cos(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].bottom.x=this.parts.arms[g].middle.x+sin(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom
                    this.parts.arms[g].bottom.y=this.parts.arms[g].middle.y+cos(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottom.x=this.parts.arms[g].bottom.x*sin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottom.y=this.parts.arms[g].bottom.y

                    this.graphics.arms[g].topStack.x=(this.parts.arms[g].top.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].topStack.y=this.parts.arms[g].top.y-(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/4
                    this.graphics.arms[g].middleStack.x=(this.parts.arms[g].middle.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middleStack.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottomStack.x=(this.parts.arms[g].bottom.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottomStack.y=this.parts.arms[g].bottom.y
                }
                if(this.mode==0){
                    this.sprites.spin=(((this.anim.direction%360)+360)%360)
                    this.sprites.spinDetail=floor((((this.anim.direction%360)+360)%360)/this.sprites.detail)
                    this.sprites.spinDetailHead=floor((((this.anim.head%360)+360)%360)/this.sprites.detail)
                }else{
                    this.sprites.spin=0
                    this.sprites.spinDetail=0
                    this.sprites.spinDetailHead=0
                }
            break

        }
    }
    displayTrianglesBack(layer,parts,direction,base,width,weight,slant,color,fade){
        layer.fill(color[0],color[1],color[2],fade)
        layer.stroke(color[0],color[1],color[2],fade)
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        for(let part of parts){
            if(cos(part.spin[1]+direction)<=0&&cos(part.spin[0]+direction)>0){
                if(cos(part.spin[2]+direction)>0){
                    layer.triangle(sin(part.spin[1]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])))
                }else{
                    layer.quad(sin(part.spin[1]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])),sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
                }
            }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)>0){
                if(cos(part.spin[2]+direction)>0){
                    layer.triangle(sin(part.spin[0]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])))
                }else{
                    layer.quad(sin(part.spin[0]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])),sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
                }
            }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)<=0&&cos(part.spin[2]+direction)<=0){
                layer.triangle(sin(part.spin[0]+direction)*width/2,base,sin(part.spin[1]+direction)*width/2,base,sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
            }
        }
    }
    displayTrianglesFront(layer,parts,direction,base,width,weight,slant,color,fade){
        if(color==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }else{
            layer.fill(color[0],color[1],color[2],fade)
            layer.stroke(color[0],color[1],color[2],fade)
        }
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        for(let part of parts){
            if(cos(part.spin[1]+direction)<=0&&cos(part.spin[0]+direction)>0){
                if(cos(part.spin[2]+direction)<=0){
                    layer.triangle(sin(part.spin[0]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])))
                }else{
                    layer.quad(sin(part.spin[0]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])),sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
                }
            }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)>0){
                if(cos(part.spin[2]+direction)<=0){
                    layer.triangle(sin(part.spin[1]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])))
                }else{
                    layer.quad(sin(part.spin[1]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])),sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
                }
            }else if(cos(part.spin[0]+direction)>0&&cos(part.spin[1]+direction)>0&&cos(part.spin[2]+direction)>0){
                layer.triangle(sin(part.spin[0]+direction)*width/2,base,sin(part.spin[1]+direction)*width/2,base,sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
            }
        }
    }
    displayTrianglesBackMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        let g=0
        let lg=parts.length
        for(let part of parts){
            g++
            layer.fill(color1[0]*g/lg+color2[0]*(1-g/lg),color1[1]*g/lg+color2[1]*(1-g/lg),color1[2]*g/lg+color2[2]*(1-g/lg),fade)
            layer.stroke(color1[0]*g/lg+color2[0]*(1-g/lg),color1[1]*g/lg+color2[1]*(1-g/lg),color1[2]*g/lg+color2[2]*(1-g/lg),fade)
            if(cos(part.spin[1]+direction)<=0&&cos(part.spin[0]+direction)>0){
                if(cos(part.spin[2]+direction)>0){
                    layer.triangle(sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
                    width/2+(part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
                    base+part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
                    width/2+(part.y[2]*abs(1-(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))+part.y[1]*abs(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))*slant,
                    base+part.y[2]*abs(1-(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))+part.y[1]*abs(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))
                }else{
                    layer.quad(sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
                    sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
                    width/2+(part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
                    base+part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
                    width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
                    base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
                }
            }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)>0){
                if(cos(part.spin[2]+direction)>0){
                    layer.triangle(sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
                    -width/2-(part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
                    base+part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
                    -width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
                    base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
                }else{
                    layer.quad(sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
                    sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
                    -width/2-(part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
                    base+part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
                    -width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
                    base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
                }
            }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)<=0&&cos(part.spin[2]+direction)<=0){
                layer.triangle(sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2])
            }
        }
    }
    displayTrianglesFrontMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        let g=0
        let lg=parts.length
        for(let part of parts){
            g++
            layer.fill(color1[0]*g/lg+color2[0]*(1-g/lg),color1[1]*g/lg+color2[1]*(1-g/lg),color1[2]*g/lg+color2[2]*(1-g/lg),fade)
            layer.stroke(color1[0]*g/lg+color2[0]*(1-g/lg),color1[1]*g/lg+color2[1]*(1-g/lg),color1[2]*g/lg+color2[2]*(1-g/lg),fade)
            if(cos(part.spin[1]+direction)<=0&&cos(part.spin[0]+direction)>0){
                if(cos(part.spin[2]+direction)<=0){
                    layer.triangle(sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
                    width/2+(part.y[0]*(1-abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
                    base+part.y[0]*(1-abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
                    width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
                    base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
                }else{
                    layer.quad(sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
                    sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
                    width/2+(part.y[0]*(1-(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))+part.y[1]*(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))*slant,
                    base+part.y[0]*(1-(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))+part.y[1]*(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]),
                    width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
                    base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
                }
            }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)>0){
                if(cos(part.spin[2]+direction)<=0){
                    layer.triangle(sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
                    -width/2-(part.y[1]*(1-abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
                    base+part.y[1]*(1-abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
                    -width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
                    base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
                }else{
                    layer.quad(sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
                    sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
                    -width/2-(part.y[1]*(1-(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))+part.y[0]*(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))*slant,
                    base+part.y[1]*(1-(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))+part.y[0]*(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]),
                    -width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
                    base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
                }
            }else if(cos(part.spin[0]+direction)>0&&cos(part.spin[1]+direction)>0&&cos(part.spin[2]+direction)>0){
                layer.triangle(sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2])
            }
        }
    }
    minorDisplay(type,key){
        switch(this.type){
            case 1:
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(-atan2(this.graphics.arms[key].bottom.x-this.graphics.arms[key].middle.x,this.graphics.arms[key].bottom.y-this.graphics.arms[key].middle.y)+90)
                        if(this.mode==0){
                            this.layer.scale(1,sin(this.anim.direction))
                        }else{
                            this.layer.scale(1,sign(sin(this.anim.direction))*0.5+sin(this.anim.direction)*0.5)
                        }
                        this.layer.fill(235,245,255,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-25,3,50)
                        this.layer.triangle(-3/2,-50,3/2,-50,0,-65)
                        this.layer.fill(160,170,180,this.fade)
                        this.layer.rect(3/4,-25,3/2,50)
                        this.layer.triangle(3/2,-50,0,-65,0,-50)
                        this.layer.stroke(125,70,80,this.fade)
                        this.layer.strokeWeight(4)
                        this.layer.line(0,-4,0,4)
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
                if(this.anim.eyeStyle[key]==2){
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight(1)
                    this.layer.arc(sin(this.spin.eye[key]+this.anim.direction)*15-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel-1,3,4,30,150)
                }else if(this.anim.eyeStyle[key]==1){
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight(1)
                    this.layer.arc(sin(this.spin.eye[key]+this.anim.direction)*15-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+2,3,4,-150,-30)
                }else{
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(cos(this.spin.eye[key]+this.anim.direction)*5,0,1))
                    this.layer.line(sin(this.spin.eye[key]+this.anim.direction)*15-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel,sin(this.spin.eye[key]+this.anim.direction)*15+(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                    this.layer.line(sin(this.spin.eye[key]+this.anim.direction)*15-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel,sin(this.spin.eye[key]+this.anim.direction)*15+(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(cos(this.spin.eye[key]+this.anim.direction)*5,0,1))
                    this.layer.line(sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5)-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5)+(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5)-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5)+(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    if(this.anim.eye[key]==0){
                        this.layer.stroke(this.color.eye.glow[0],this.color.eye.glow[1],this.color.eye.glow[2],this.fade*this.fades.eye[key]/4)
                        this.layer.strokeWeight(0.6)
                        this.layer.arc(sin(this.spin.eye[key]+this.anim.direction)*15.5,this.parts.eyeLevel,1.8,1.8,-72,-12)
                    }
                }
            break
            case 1:
                this.calc.int=this.anim.mouth.x/this.anim.mouth.y*cos(this.anim.direction)/(0.5+cos(this.anim.direction)*0.5)
                if(this.anim.mouth.open>0){
                    this.sprites.temp=createGraphics(100,50)
                    setupLayer(this.sprites.temp)
                    this.sprites.temp.fill(this.color.mouth.in[0],this.color.mouth.in[1],this.color.mouth.in[2],this.fade*this.fades.mouth)
                    this.sprites.temp.noStroke()
                    this.sprites.temp.arc(50,10,this.anim.mouth.x*cos(this.anim.direction)*5,this.anim.mouth.y*(0.5+cos(this.anim.direction)*0.5)*5,this.spin.mouth,180-this.spin.mouth)
                    this.sprites.temp.erase()
                    this.sprites.temp.rect(50,0,100,19+sin((this.spin.mouth/90)**(1/this.calc.int)*90)*5*this.anim.mouth.x*cos(this.anim.direction)/this.calc.int)
                    this.layer.image(this.sprites.temp,sin(this.anim.direction)*13.5-10,this.parts.mouth-2,20,10)
                }
                this.layer.noFill()
                this.layer.stroke(this.color.mouth.out[0],this.color.mouth.out[1],this.color.mouth.out[2],this.fade*this.fades.mouth)
                this.layer.strokeWeight(0.5-this.anim.mouth.open*0.25)
                this.layer.arc(sin(this.anim.direction)*13.5,this.parts.mouth,this.anim.mouth.x*cos(this.anim.direction),this.anim.mouth.y*(0.5+cos(this.anim.direction)*0.5),this.spin.mouth,180-this.spin.mouth)
                this.layer.strokeWeight(0.25*this.anim.mouth.open)
                this.layer.line(
                    sin(this.anim.direction)*13.5+cos((this.spin.mouth/90)**(1/this.calc.int)*90)*0.5*this.anim.mouth.x*cos(this.anim.direction),
                    (this.parts.mouth-0.1)+sin((this.spin.mouth/90)**(1/this.calc.int)*90)*0.5*this.anim.mouth.x*cos(this.anim.direction)/this.calc.int,
                    sin(this.anim.direction)*13.5-cos((this.spin.mouth/90)**(1/this.calc.int)*90)*0.5*this.anim.mouth.x*cos(this.anim.direction),
                    (this.parts.mouth-0.1)+sin((this.spin.mouth/90)**(1/this.calc.int)*90)*0.5*this.anim.mouth.x*cos(this.anim.direction)/this.calc.int
                )
            break
        }
    }
    display(){
        this.calculateParts()
        if(this.mode==1){
            this.generateGeneral(2)
        }
        this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
        this.layer.scale(this.size)
        if(this.fade>0&&this.size>0){
            switch(this.type){
                case 1:
                    if(this.trigger.display.hair.back){
                        //this.layer.image(this.sprites.hair.back[this.sprites.spinDetailHead],-25*this.fade,-75-20*this.fade,50*this.fade,100*this.fade)
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.extra.sword&&cos(this.spin.arms[g].top+this.anim.direction)<=-0.6&&g==1){
                            this.minorDisplay(0,g)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)<=-0.6){
                            this.layer.stroke(this.color.skin.arms[0],this.color.skin.arms[1],this.color.skin.arms[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].top.x,this.graphics.arms[g].top.y,this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                    }
                    if(this.trigger.display.kimono.outside.back){
                        //this.layer.image(this.sprites.kimono.outside.back[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.outside.back.x,this.parts.kimono.outside-15*this.fades.kimono.outside.back.y,30*this.fade*this.fades.kimono.outside.back.x,66*this.fade*this.fades.kimono.outside.back.y)
                    }
                    if(this.trigger.display.kimono.main.back){
                        //this.layer.image(this.sprites.kimono.main.back[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.main.back.x,this.parts.kimono.main-15*this.fades.kimono.main.back.y,30*this.fade*this.fades.kimono.main.back.x,66*this.fade*this.fades.kimono.main.back.y)
                    }
                    if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[0]+this.anim.direction)<=0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.button,-cos(this.spin.under.under.button[0]+this.anim.direction)/4+0.75),this.fade*this.fades.under.under.button)
                        this.layer.ellipse(sin(this.spin.under.under.button[0]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[0]+this.anim.direction)*0.25+1,1.25)
                    }
                    if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[1]+this.anim.direction)<=0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.button,-cos(this.spin.under.under.button[1]+this.anim.direction)/4+0.75),this.fade*this.fades.under.under.button)
                        this.layer.ellipse(sin(this.spin.under.under.button[1]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[1]+this.anim.direction)*0.25+1,1.25)
                    }
                    if(this.trigger.display.under.under.top&&cos(this.spin.under.under.top[0]+this.anim.direction)<=0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.top,-cos(this.spin.under.under.top[0]+this.anim.direction)),this.fade*this.fades.under.under.top)
                        this.layer.ellipse(sin(this.spin.under.under.top[0]+this.anim.direction)*4.2,-50,cos(this.spin.under.under.top[0]+this.anim.direction)*2.5+3.5,6)
                    }
                    if(this.trigger.display.under.under.top&&cos(this.spin.under.under.top[1]+this.anim.direction)<=0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.top,-cos(this.spin.under.under.top[1]+this.anim.direction)),this.fade*this.fades.under.under.top)
                        this.layer.ellipse(sin(this.spin.under.under.top[1]+this.anim.direction)*4.2,-50,cos(this.spin.under.under.top[1]+this.anim.direction)*2.5+3.5,6)
                    }
                    if(this.trigger.display.skin.body){
                        this.layer.noStroke()
                        this.layer.fill(this.color.skin.body[0],this.color.skin.body[1],this.color.skin.body[2],this.fade*this.fades.skin.body)
                        this.layer.ellipse(0,-46,11,30)
                    }
                    if(this.trigger.display.skin.button){
                        if(cos(this.spin.button+this.anim.direction)>0){
                            this.layer.noStroke()
                            this.layer.fill(this.color.skin.button[0],this.color.skin.button[1],this.color.skin.button[2],this.fade*this.fades.skin.button)
                            this.layer.ellipse(sin(this.spin.button+this.anim.direction)*5.2,-42,1*cos(this.spin.button+this.anim.direction),2)
                        }
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.extra.sword&&cos(this.spin.arms[g].top+this.anim.direction)>-0.6&&cos(this.spin.arms[g].top+this.anim.direction)<0.4&&g==1){
                            this.minorDisplay(0,g)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)<0.4&&cos(this.spin.arms[g].top+this.anim.direction)>-0.6){
                            this.layer.stroke(this.color.skin.arms[0],this.color.skin.arms[1],this.color.skin.arms[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].top.x,this.graphics.arms[g].top.y,this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                        for(let h=0;h<2;h++){
                            if((g==0&&h==0||g==1&&h==1)&&cos(this.spin.legs[0].bottom+this.anim.direction)<=cos(this.spin.legs[1].bottom+this.anim.direction)||(g==0&&h==1||g==1&&h==0)&&cos(this.spin.legs[0].bottom+this.anim.direction)>cos(this.spin.legs[1].bottom+this.anim.direction)){
                                if(this.fades.sandal.back[h]>0&&this.trigger.display.sandal.back[h]){
                                    this.layer.translate(this.graphics.legs[h].sandal.back.x,this.graphics.legs[h].sandal.back.y+1.5)
                                    this.layer.scale(1.2,0.6)
                                    this.layer.rotate(-this.anim.direction+this.spin.sandal[h])
                                    this.layer.image(graphics.minor[1],-4*this.fades.sandal.back[h]*this.fade,-4*this.fades.sandal.back[h]*this.fade,8*this.fades.sandal.back[h]*this.fade,8*this.fades.sandal.back[h]*this.fade)
                                    this.layer.rotate(this.anim.direction-this.spin.sandal[h])
                                    this.layer.scale(5/6,5/3)
                                    this.layer.translate(-this.graphics.legs[h].sandal.back.x,-this.graphics.legs[h].sandal.back.y-1.5)
                                }
                                if(this.fades.sandal.front[h]>0&&this.trigger.display.sandal.front[h]){
                                    this.layer.translate(this.graphics.legs[h].sandal.front.x,this.graphics.legs[h].sandal.front.y+1.5)
                                    this.layer.scale(1.2,0.6)
                                    this.layer.rotate(-this.anim.direction+this.spin.sandal[h])
                                    for(let i=0;i<16;i++){
                                        if(cos(this.anim.direction+(65-floor(i/2)*5*this.trigger.display.mode.sandal.edge)*((i%2)*2-1)-this.spin.sandal[h])<=0.1&&this.trigger.display.mode.sandal.edge<=1||i%2!=h&&this.trigger.display.mode.sandal.edge==2){
                                            this.layer.image(graphics.minor[i+2],-4*this.fades.sandal.front[h]*this.fade,-4*this.fades.sandal.front[h]*this.fade,8*this.fades.sandal.front[h]*this.fade,8*this.fades.sandal.front[h]*this.fade)
                                        }
                                    }
                                    this.layer.rotate(this.anim.direction-this.spin.sandal[h])
                                    this.layer.scale(5/6,5/3)
                                    this.layer.translate(-this.graphics.legs[h].sandal.front.x,-this.graphics.legs[h].sandal.front.y-1.5)
                                }
                                if(this.trigger.display.skin.legs){
                                    this.layer.stroke(this.color.skin.legs[0],this.color.skin.legs[1],this.color.skin.legs[2],this.fade*this.fades.skin.legs)
                                    this.layer.strokeWeight(4)
                                    this.layer.line(this.graphics.legs[h].top.x,this.graphics.legs[h].top.y,this.graphics.legs[h].middle.x,this.graphics.legs[h].middle.y)
                                    this.layer.line(this.graphics.legs[h].middle.x,this.graphics.legs[h].middle.y,this.graphics.legs[h].bottom.x,this.graphics.legs[h].bottom.y)
                                }
                                if(this.trigger.display.band&&h==0){
                                    this.layer.stroke(this.color.band[0],this.color.band[1],this.color.band[2],this.fade*this.fades.band)
                                    this.layer.strokeWeight(1.2)
                                    this.layer.line(
                                        this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5+1.8*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                        this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5+1.8*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                        this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5-1.8*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                        this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5-1.8*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90))
                                    this.layer.strokeWeight(0.8)
                                    this.layer.line(
                                        this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5,this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5,
                                        this.graphics.legs[h].top.x*0.3+this.graphics.legs[h].middle.x*0.7-0.8*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                        this.graphics.legs[h].top.y*0.3+this.graphics.legs[h].middle.y*0.7-0.8*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90))
                                    this.layer.line(
                                        this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5,this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5,
                                        this.graphics.legs[h].top.x*0.3+this.graphics.legs[h].middle.x*0.7+0.8*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                        this.graphics.legs[h].top.y*0.3+this.graphics.legs[h].middle.y*0.7+0.8*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90))
                                }
                                if(this.fades.sandal.front[h]>0&&this.trigger.display.sandal.front[h]){
                                    this.layer.translate(this.graphics.legs[h].sandal.front.x,this.graphics.legs[h].sandal.front.y+1.5)
                                    this.layer.scale(1.2,0.6)
                                    this.layer.rotate(-this.anim.direction+this.spin.sandal[h])
                                    for(let i=0;i<16;i++){
                                        if(cos(this.anim.direction+(65-floor(i/2)*5*this.trigger.display.mode.sandal.edge)*((i%2)*2-1)-this.spin.sandal[h])>0.1&&this.trigger.display.mode.sandal.edge<=1||i%2==h&&this.trigger.display.mode.sandal.edge==2){
                                            this.layer.image(graphics.minor[i+2],-4*this.fades.sandal.front[h]*this.fade,-4*this.fades.sandal.front[h]*this.fade,8*this.fades.sandal.front[h]*this.fade,8*this.fades.sandal.front[h]*this.fade)
                                        }
                                    }
                                    this.layer.rotate(this.anim.direction-this.spin.sandal[h])
                                    this.layer.scale(5/6,5/3)
                                    this.layer.translate(-this.graphics.legs[h].sandal.front.x,-this.graphics.legs[h].sandal.front.y-1.5)
                                }
                            }
                        }
                    }
                    if(this.trigger.display.under.under.top&&cos(this.spin.under.under.top[0]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.top,cos(this.spin.under.under.top[0]+this.anim.direction)),this.fade*this.fades.under.under.top)
                        this.layer.ellipse(sin(this.spin.under.under.top[0]+this.anim.direction)*4.2,-50,cos(this.spin.under.under.top[0]+this.anim.direction)*2.5+3.5,6)
                    }
                    if(this.trigger.display.under.under.top&&cos(this.spin.under.under.top[1]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.top,cos(this.spin.under.under.top[1]+this.anim.direction)),this.fade*this.fades.under.under.top)
                        this.layer.ellipse(sin(this.spin.under.under.top[1]+this.anim.direction)*4.2,-50,cos(this.spin.under.under.top[1]+this.anim.direction)*2.5+3.5,6)
                    }
                    if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[0]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.button,cos(this.spin.under.under.button[0]+this.anim.direction)/4+0.75),this.fade*this.fades.under.under.button)
                        this.layer.ellipse(sin(this.spin.under.under.button[0]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[0]+this.anim.direction)*0.25+1,1.25)
                    }
                    if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[1]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.button,cos(this.spin.under.under.button[1]+this.anim.direction)/4+0.75),this.fade*this.fades.under.under.button)
                        this.layer.ellipse(sin(this.spin.under.under.button[1]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[1]+this.anim.direction)*0.25+1,1.25)
                    }
                    if(this.trigger.display.under.top){
                        this.sprites.temp=createGraphics(80,80)
                        setupLayer(this.sprites.temp)
                        this.sprites.temp.translate(40,0)
                        this.sprites.temp.noStroke()
                        this.sprites.temp.fill(this.color.under.outside[0],this.color.under.outside[1],this.color.under.outside[2],this.fade*this.fades.under.top)
                        for(let g=0;g<2;g++){
                            if(cos(this.spin.under.under.top[g]+this.anim.direction)){
                                if(sin(this.spin.under.under.top[g]+this.anim.direction+27)*9-sin(this.spin.under.under.top[g]+this.anim.direction)*6>0){
                                    this.sprites.temp.arc(sin(this.spin.under.under.top[g]+this.anim.direction)*18,75,sin(this.spin.under.under.top[g]+this.anim.direction+27)*36-sin(this.spin.under.under.top[g]+this.anim.direction)*24,70,-90,0)
                                    this.sprites.temp.ellipse(sin(this.spin.under.under.top[g]+this.anim.direction)*18,75,4,70)
                                }
                                if(sin(this.spin.under.under.top[g]+this.anim.direction)*6-sin(this.spin.under.under.top[g]+this.anim.direction-27)*9>0){
                                    this.sprites.temp.arc(sin(this.spin.under.under.top[g]+this.anim.direction)*18,75,sin(this.spin.under.under.top[g]+this.anim.direction)*24-sin(this.spin.under.under.top[g]+this.anim.direction-27)*36,70,-180,-90)
                                    this.sprites.temp.ellipse(sin(this.spin.under.under.top[g]+this.anim.direction)*18,75,4,70)
                                }
                            }
                        }
                        this.sprites.temp.rect(0,59,44,2)
                        this.sprites.temp.erase()
                        this.sprites.temp.rect(0,70,80,20)
                        this.layer.image(this.sprites.temp,-10*this.anim.under.top.x,this.parts.under.top-12*this.anim.under.top.y,20*this.anim.under.top.x,20*this.anim.under.top.y)
                        this.layer.noStroke()
                        this.layer.fill(this.color.under.outside[0],this.color.under.outside[1],this.color.under.outside[2],this.fade*this.fades.under.top)
                        if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[0]+this.anim.direction)>-0.4){
                            this.layer.ellipse(sin(this.spin.under.under.button[0]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[0]+this.anim.direction)*0.25+1,1.5)
                        }
                        if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[1]+this.anim.direction)>-0.4){
                            this.layer.ellipse(sin(this.spin.under.under.button[1]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[1]+this.anim.direction)*0.25+1,1.5)
                        }
                        this.layer.fill(this.color.under.fringe[0],this.color.under.fringe[1],this.color.under.fringe[2],this.fade)
                        for(let g=0,lg=this.spin.under.top.length;g<lg;g++){
                            if(cos(this.spin.under.top[g]+this.anim.direction)>0){
                                this.layer.arc(5.5*sin(this.spin.under.top[g]+this.anim.direction)*this.anim.under.top.x,this.parts.under.top+3*this.anim.under.top.y,cos(this.spin.under.top[g]+this.anim.direction)*1.4*this.anim.under.top.x,3.5*this.anim.under.top.y,0,180)
                            }
                        }
                        for(let g=0,lg=2;g<lg;g++){
                            if(cos(this.spin.under.under.top[g]+this.anim.direction)>0){
                                this.layer.push()
                                this.layer.translate(5.5*sin(this.spin.under.under.top[g]+this.anim.direction),-50)
                                this.layer.rotate(-10*sin(this.spin.under.under.top[g]+this.anim.direction))
                                this.layer.scale(cos(this.spin.under.under.top[g]+this.anim.direction),1)
                                this.layer.rotate(45+g*45)
                                this.layer.fill(this.color.under.decoration,this.fade*this.fades.under.bottom)
                                for(let h=0;h<6;h++){
                                    this.layer.rotate(60)
                                    this.layer.ellipse(0,-0.6,0.4,1.2)
                                }
                                this.layer.pop()
                            }
                        }
                    }
                    if(this.trigger.display.under.under.bottom&&cos(this.spin.under.under.bottom[0]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.bottom[0],cos(this.spin.under.under.bottom[0]+this.anim.direction)),this.fade*this.fades.under.under.bottom)
                        this.layer.beginShape()
                        this.layer.vertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*3.5,-35)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.75,-33.5,sin(this.spin.under.under.bottom[1]*this.anim.under.under.bottom+this.anim.direction)*2.75,-34,sin(this.spin.under.under.bottom[1]*this.anim.under.under.bottom+this.anim.direction)*2.5,-33)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[1]*this.anim.under.under.bottom+this.anim.direction)*2.25,-32,sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.25,-32.5,sin(this.spin.under.under.bottom[0]+this.anim.direction)*1.5,-31)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.25,-32.5,sin(this.spin.under.under.bottom[2]*this.anim.under.under.bottom+this.anim.direction)*2.25,-32,sin(this.spin.under.under.bottom[2]*this.anim.under.under.bottom+this.anim.direction)*2.5,-33)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[2]*this.anim.under.under.bottom+this.anim.direction)*2.75,-34,sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.75,-33.5,sin(this.spin.under.under.bottom[0]+this.anim.direction)*3.5,-35)
                        this.layer.endShape()
                        this.layer.fill(mergeColor(this.color.skin.body,this.color.under.under.bottom[1],cos(this.spin.under.under.bottom[0]+this.anim.direction)),this.fade*this.fades.under.under.bottom)
                        this.layer.beginShape()
                        this.layer.vertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*3.5,-35)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.75,-33.5,sin(this.spin.under.under.bottom[3]*this.anim.under.under.bottom+this.anim.direction)*2.75,-34,sin(this.spin.under.under.bottom[3]*this.anim.under.under.bottom+this.anim.direction)*2.5,-33)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[3]*this.anim.under.under.bottom+this.anim.direction)*2.25,-32,sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.25,-32.5,sin(this.spin.under.under.bottom[0]+this.anim.direction)*1.5,-31)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.25,-32.5,sin(this.spin.under.under.bottom[4]*this.anim.under.under.bottom+this.anim.direction)*2.25,-32,sin(this.spin.under.under.bottom[4]*this.anim.under.under.bottom+this.anim.direction)*2.5,-33)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[4]*this.anim.under.under.bottom+this.anim.direction)*2.75,-34,sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.75,-33.5,sin(this.spin.under.under.bottom[0]+this.anim.direction)*3.5,-35)
                        this.layer.endShape()
                    }
                    if(this.trigger.display.under.tanga){
                        this.sprites.temp=createGraphics(40,40)
                        setupLayer(this.sprites.temp)
                        this.sprites.temp.noStroke()
                        this.sprites.temp.fill(this.color.under.tanga[0],this.color.under.tanga[1],this.color.under.tanga[2],this.fade*this.fades.under.tanga)
                        if(abs(this.anim.direction)<this.spin.under.tanga){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+this.spin.under.tanga),36,0,90)
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-this.spin.under.tanga),36,90,180)
                        }else if(this.anim.direction>=this.spin.under.tanga&&this.anim.direction<(this.spin.under.tanga+90)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+this.spin.under.tanga),36,0,90)
                        }else if(this.anim.direction<=-this.spin.under.tanga&&this.anim.direction>-(this.spin.under.tanga+90)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-this.spin.under.tanga),36,90,180)
                        }
                        if(abs(this.anim.direction)>=(180-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-(180-this.spin.under.tanga)),36,0,90)
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+(180-this.spin.under.tanga)),36,90,180)
                        }else if(this.anim.direction>=-(180-this.spin.under.tanga)&&this.anim.direction<-(90-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-(180-this.spin.under.tanga)),36,0,90)
                        }else if(this.anim.direction<=(180-this.spin.under.tanga)&&this.anim.direction>(90-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+(180-this.spin.under.tanga)),36,90,180)
                        }
                        this.sprites.temp.erase()
                        this.sprites.temp.rect(20,6,40,11)
                        if(this.anim.direction>=this.spin.under.tanga&&this.anim.direction<(this.spin.under.tanga+90)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-this.spin.under.tanga),36,0,90)
                        }else if(this.anim.direction<=-this.spin.under.tanga&&this.anim.direction>-(this.spin.under.tanga+90)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+this.spin.under.tanga),36,90,180)
                        }
                        if(this.anim.direction>=-(180-this.spin.under.tanga)&&this.anim.direction<-(90-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+(180-this.spin.under.tanga)),36,0,90)
                        }else if(this.anim.direction<=(180-this.spin.under.tanga)&&this.anim.direction>(90-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-(180-this.spin.under.tanga)),36,90,180)
                        }
                        this.sprites.temp.noErase()
                        this.sprites.temp.rect(20,11,16,1/this.anim.under.bottom.y)
                        if(this.anim.under.bottom.y<=0){
                            this.layer.push()
                            this.layer.translate(0,this.parts.under.bottom-6*this.anim.under.bottom.y)
                            this.layer.scale(1,-1)
                            this.layer.image(this.sprites.temp,-10*this.anim.under.bottom.x,-5,20*this.anim.under.bottom.x,20*abs(this.anim.under.bottom.y))
                            this.layer.pop()
                        }else{
                            this.layer.image(this.sprites.temp,-10*this.anim.under.bottom.x,this.parts.under.bottom-5*this.anim.under.bottom.y-5,20*this.anim.under.bottom.x,20*abs(this.anim.under.bottom.y))
                        }
                    }
                    if(this.trigger.display.under.bottom){
                        this.sprites.temp=createGraphics(80,90)
                        setupLayer(this.sprites.temp)
                        this.sprites.temp.scale(2)
                        this.sprites.temp.fill(this.color.under.outside[0],this.color.under.outside[1],this.color.under.outside[2],this.fade*this.fades.under.bottom)
                        this.sprites.temp.noStroke()
                        if(abs(this.anim.direction)<this.spin.under.piece){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+this.spin.under.piece),40,0,90)
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-this.spin.under.piece),40,90,180)
                        }else if(this.anim.direction>=this.spin.under.piece&&this.anim.direction<(this.spin.under.piece+90)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+this.spin.under.piece),40,0,90)
                        }else if(this.anim.direction<=-this.spin.under.piece&&this.anim.direction>-(this.spin.under.piece+90)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-this.spin.under.piece),40,90,180)
                        }
                        if(abs(this.anim.direction)>=(180-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-(180-this.spin.under.piece)),40,0,90)
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+(180-this.spin.under.piece)),40,90,180)
                        }else if(this.anim.direction>=-(180-this.spin.under.piece)&&this.anim.direction<-(90-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-(180-this.spin.under.piece)),40,0,90)
                        }else if(this.anim.direction<=(180-this.spin.under.piece)&&this.anim.direction>(90-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+(180-this.spin.under.piece)),40,90,180)
                        }
                        this.sprites.temp.erase()
                        this.sprites.temp.rect(20,6,40,11)
                        if(this.anim.direction>=this.spin.under.piece&&this.anim.direction<(this.spin.under.piece+90)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-this.spin.under.piece),40,0,90)
                        }else if(this.anim.direction<=-this.spin.under.piece&&this.anim.direction>-(this.spin.under.piece+90)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+this.spin.under.piece),40,90,180)
                        }
                        if(this.anim.direction>=-(180-this.spin.under.piece)&&this.anim.direction<-(90-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+(180-this.spin.under.piece)),40,0,90)
                        }else if(this.anim.direction<=(180-this.spin.under.piece)&&this.anim.direction>(90-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-(180-this.spin.under.piece)),40,90,180)
                        }
                        this.sprites.temp.noErase()
                        this.sprites.temp.rect(20,11,17.5,1/this.anim.under.bottom.y)
                        if(this.anim.under.bottom.y<=0){
                            this.layer.push()
                            this.layer.translate(0,this.parts.under.bottom-7*this.anim.under.bottom.y)
                            this.layer.scale(1,-1)
                            this.layer.image(this.sprites.temp,-10*this.anim.under.bottom.x,-5,20*this.anim.under.bottom.x,22.5*abs(this.anim.under.bottom.y))
                            this.layer.pop()
                        }else{
                            this.layer.image(this.sprites.temp,-10*this.anim.under.bottom.x,this.parts.under.bottom-6*this.anim.under.bottom.y-5,20*this.anim.under.bottom.x,22.5*abs(this.anim.under.bottom.y))
                        }
                        this.layer.fill(this.color.under.fringe[0],this.color.under.fringe[1],this.color.under.fringe[2],this.fade)
                        this.layer.noStroke()
                        for(let g=0,lg=this.spin.under.bottom.length;g<lg;g++){
                            if(cos(this.spin.under.bottom[g]+this.anim.direction)>0){
                                this.layer.arc(4.375*sin(this.spin.under.bottom[g]+this.anim.direction)*this.anim.under.bottom.x,this.parts.under.bottom-5.3*this.anim.under.bottom.y,cos(this.spin.under.bottom[g]+this.anim.direction)*1.4*this.anim.under.bottom.x,3.5*this.anim.under.bottom.y,0,180)
                            }
                        }
                        for(let g=0,lg=2;g<lg;g++){
                            if(cos(g*180+this.anim.direction)>0){
                                this.layer.push()
                                this.layer.translate(3*sin(g*180+this.anim.direction),-34)
                                this.layer.rotate(30*sin(g*180+this.anim.direction))
                                this.layer.scale(cos(g*180+this.anim.direction),1)
                                this.layer.rotate(15+g*25)
                                this.layer.fill(this.color.under.decoration,this.fade*this.fades.under.bottom)
                                for(let h=0;h<6;h++){
                                    this.layer.rotate(60)
                                    this.layer.ellipse(0,-0.6,0.4,1.2)
                                }
                                this.layer.pop()
                            }
                        }
                    }
                    if(this.trigger.display.under.bow.top){
                        this.layer.fill(this.color.under.bow[0],this.color.under.bow[1],this.color.under.bow[2],this.fade*this.fades.under.bow.top)
                        this.layer.stroke(this.color.under.bow[0],this.color.under.bow[1],this.color.under.bow[2],this.fade*this.fades.under.bow.top)
                        this.layer.strokeWeight(0.3)
                        if(cos(this.spin.underBow.top.center/2+this.spin.underBow.top.loop[0]/2+this.anim.direction)>0){
                            this.layer.triangle(
                                sin(this.spin.underBow.top.center+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y,
                                sin(this.spin.underBow.top.loop[0]+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+(this.parts.under.bow.top-0.5)*this.anim.under.bow.top.position.y,
                                sin(this.spin.underBow.top.loop[0]+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+(this.parts.under.bow.top+0.5)*this.anim.under.bow.top.position.y
                            )
                        }
                        if(cos(this.spin.underBow.top.center/2+this.spin.underBow.top.loop[1]/2+this.anim.direction)>0){
                            this.layer.triangle(
                                sin(this.spin.underBow.top.center+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y,
                                sin(this.spin.underBow.top.loop[1]+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+(this.parts.under.bow.top-0.5)*this.anim.under.bow.top.position.y,
                                sin(this.spin.underBow.top.loop[1]+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+(this.parts.under.bow.top+0.5)*this.anim.under.bow.top.position.y
                            )
                        }
                        this.layer.noFill()
                        if(cos(this.spin.underBow.top.center/2+this.spin.underBow.top.end[0]/2+this.anim.direction)>0){
                            this.layer.line(sin(this.spin.underBow.top.center+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y,sin(this.spin.underBow.top.end[0]*this.anim.under.bow.top.size.x/this.anim.under.bow.top.position.x+this.anim.direction)*(5.75*this.anim.under.bow.top.position.x+0.25*this.anim.under.bow.top.size.x),this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y+1.2*this.anim.under.bow.top.size.y)
                        }
                        if(cos(this.spin.underBow.top.center/2+this.spin.underBow.top.end[1]/2+this.anim.direction)>0){
                            this.layer.line(sin(this.spin.underBow.top.center+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y,sin(this.spin.underBow.top.end[1]*this.anim.under.bow.top.size.x/this.anim.under.bow.top.position.x+this.anim.direction)*(5.75*this.anim.under.bow.top.position.x+0.25*this.anim.under.bow.top.size.x),this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y+1.2*this.anim.under.bow.top.size.y)
                        }
                    }
                    if(this.trigger.display.under.bow.bottom){
                        this.layer.fill(this.color.under.bow[0],this.color.under.bow[1],this.color.under.bow[2],this.fade*this.fades.under.bow.bottom)
                        this.layer.stroke(this.color.under.bow[0],this.color.under.bow[1],this.color.under.bow[2],this.fade*this.fades.under.bow.bottom)
                        this.layer.strokeWeight(0.3)
                        if(cos(this.spin.underBow.bottom.center/2+this.spin.underBow.bottom.loop[0]/2+this.anim.direction)>0){
                            this.layer.triangle(
                                sin(this.spin.underBow.bottom.center+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y,
                                sin(this.spin.underBow.bottom.loop[0]+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+(this.parts.under.bow.bottom-0.5)*this.anim.under.bow.bottom.position.y,
                                sin(this.spin.underBow.bottom.loop[0]+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+(this.parts.under.bow.bottom+0.5)*this.anim.under.bow.bottom.position.y
                            )
                        }
                        if(cos(this.spin.underBow.bottom.center/2+this.spin.underBow.bottom.loop[1]/2+this.anim.direction)>0){
                            this.layer.triangle(
                                sin(this.spin.underBow.bottom.center+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y,
                                sin(this.spin.underBow.bottom.loop[1]+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+(this.parts.under.bow.bottom-0.5)*this.anim.under.bow.bottom.position.y,
                                sin(this.spin.underBow.bottom.loop[1]+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+(this.parts.under.bow.bottom+0.5)*this.anim.under.bow.bottom.position.y
                            )
                        }
                        this.layer.noFill()
                        if(cos(this.spin.underBow.bottom.center/2+this.spin.underBow.bottom.end[0]/2+this.anim.direction)>0){
                            this.layer.line(sin(this.spin.underBow.bottom.center+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y,sin(this.spin.underBow.bottom.end[0]*this.anim.under.bow.bottom.size.x/this.anim.under.bow.bottom.position.x+this.anim.direction)*(4.5*this.anim.under.bow.bottom.position.x+0.25*this.anim.under.bow.bottom.size.x),this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y+1.2*this.anim.under.bow.bottom.size.y)
                        }
                        if(cos(this.spin.underBow.bottom.center/2+this.spin.underBow.bottom.end[1]/2+this.anim.direction)>0){
                            this.layer.line(sin(this.spin.underBow.bottom.center+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y,sin(this.spin.underBow.bottom.end[1]*this.anim.under.bow.bottom.size.x/this.anim.under.bow.bottom.position.x+this.anim.direction)*(4.5*this.anim.under.bow.bottom.position.x+0.25*this.anim.under.bow.bottom.size.x),this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y+1.2*this.anim.under.bow.bottom.size.y)
                        }
                    }
                    if(this.trigger.display.kimono.main.front){
                        //this.layer.image(this.sprites.kimono.main.front[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.main.front.x,this.parts.kimono.main-15*this.fades.kimono.main.front.y,30*this.fade*this.fades.kimono.main.front.x,66*this.fade*this.fades.kimono.main.front.y)
                    }
                    if(this.trigger.display.kimono.decoration.large){
                        this.layer.noStroke()
                        for(let g=0,lg=this.kimono.decoration.large.length;g<lg;g++){
                            if(cos(this.kimono.decoration.large[g].spin+this.anim.direction)>0){
                                this.layer.push()
                                this.layer.translate((1.5+this.kimono.decoration.large[g].y*0.16)*sin(this.kimono.decoration.large[g].spin+this.anim.direction)*this.fades.kimono.decoration.position.large.x,this.parts.kimono.main-13*this.fades.kimono.decoration.position.large.y+this.kimono.decoration.large[g].y*this.fades.kimono.decoration.position.large.y)
                                this.layer.rotate(-12*sin(this.kimono.decoration.large[g].spin+this.anim.direction))
                                this.layer.scale(this.fades.kimono.decoration.size.large.x*cos(this.kimono.decoration.large[g].spin+this.anim.direction),this.fades.kimono.decoration.size.large.y)
                                this.layer.rotate(this.kimono.decoration.large[g].rotate)
                                this.layer.fill(this.color.kimono.decoration[this.kimono.decoration.large[g].type][0],this.color.kimono.decoration[this.kimono.decoration.large[g].type][1],this.color.kimono.decoration[this.kimono.decoration.large[g].type][2],this.fade*this.fades.kimono.decoration.fade.large)
                                for(let h=0;h<6;h++){
                                    this.layer.rotate(60)
                                    this.layer.ellipse(0,this.kimono.decoration.large[g].height*0.8,this.kimono.decoration.large[g].width*2.8,this.kimono.decoration.large[g].height*1.6)
                                }
                                this.layer.pop()
                            }
                        }
                    }
                    if(this.trigger.display.kimono.outside.front){
                        //this.layer.image(this.sprites.kimono.outside.front[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.outside.front.x,this.parts.kimono.outside-15*this.fades.kimono.outside.front.y,30*this.fade*this.fades.kimono.outside.front.x,66*this.fade*this.fades.kimono.outside.front.y)
                    }
                    if(this.trigger.display.kimono.bow){
                        this.layer.noFill()
                        this.layer.stroke(this.color.kimono.bow[0],this.color.kimono.bow[1],this.color.kimono.bow[2],this.fade*this.fades.kimono.bow)
                        this.layer.strokeWeight(0.25)
                        if(cos(this.anim.direction+this.spin.bow.loop[0]/2)>0){
                            this.layer.ellipse(sin(this.anim.direction+this.spin.bow.loop[0]/2)*5.4,this.parts.kimono.bow,cos(this.anim.direction+this.spin.bow.loop[0]/2)*2.4,2.4)
                        }
                        if(cos(this.anim.direction+this.spin.bow.loop[1]/2)>0){
                            this.layer.ellipse(sin(this.anim.direction+this.spin.bow.loop[1]/2)*5.4,this.parts.kimono.bow,cos(this.anim.direction+this.spin.bow.loop[1]/2)*2.4,2.4)
                        }
                        if(cos(this.anim.direction)>0){
                            this.layer.ellipse(sin(this.anim.direction)*5.3,this.parts.kimono.bow-1.2,cos(this.anim.direction)*2.4,2.4)
                            this.layer.ellipse(sin(this.anim.direction)*5.5,this.parts.kimono.bow+1.2,cos(this.anim.direction)*2.4,2.4)
                        }
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.extra.sword&&cos(this.spin.arms[g].top+this.anim.direction)>=0.4&&cos(this.spin.arms[g].top+this.anim.direction)<0.6&&g==1){
                            this.minorDisplay(0,g)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)>-0.4&&cos(this.spin.arms[g].top+this.anim.direction)<0.6){
                            this.layer.stroke(this.color.skin.arms[0],this.color.skin.arms[1],this.color.skin.arms[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))
                            this.layer.line(this.graphics.arms[g].topStack.x,this.graphics.arms[g].topStack.y,this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y)
                            this.layer.line(this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y,this.graphics.arms[g].bottomStack.x,this.graphics.arms[g].bottomStack.y)
                        }
                    }
                    if(this.trigger.display.skin.head){
                        this.layer.fill(this.color.skin.head[0],this.color.skin.head[1],this.color.skin.head[2],this.fade*this.fades.skin.head)
                        this.layer.noStroke()
                        this.layer.ellipse(0,-75,30,30)
                    }
                    if(this.trigger.display.mouth&&cos(this.anim.direction)>0){
                        this.minorDisplayGeneral(1,0)
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.extra.sword&&(cos(this.spin.arms[g].top+this.anim.direction)>=0.6||cos(this.spin.arms[g].bottom+this.anim.direction)>=0.2)&&g==1){
                            this.minorDisplay(0,g)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)>=0.6){
                            this.layer.stroke(this.color.skin.arms[0],this.color.skin.arms[1],this.color.skin.arms[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))
                            this.layer.line(this.graphics.arms[g].topStack.x,this.graphics.arms[g].topStack.y,this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y)
                            this.layer.line(this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y,this.graphics.arms[g].bottomStack.x,this.graphics.arms[g].bottomStack.y)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].bottom+this.anim.direction)>=0.2){
                            this.layer.stroke(this.color.skin.arms[0],this.color.skin.arms[1],this.color.skin.arms[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                        if(this.trigger.display.eye[g]){
                            this.minorDisplayGeneral(0,g)
                        }
                    }
                    if(this.trigger.display.hair.front){
                        //this.layer.image(this.sprites.hair.front[this.sprites.spinDetailHead],-25*this.fade,-75-20*this.fade,50*this.fade,100*this.fade)
                    }
                    if(this.trigger.display.hair.glow){
                        this.layer.noFill()
                        this.layer.stroke(this.color.hair.glow[0],this.color.hair.glow[1],this.color.hair.glow[2],this.fade/4)
                        for(let g=0;g<6;g++){
                            this.layer.strokeWeight((3-g/2)*this.fade)
                            this.layer.arc(0,-75,30+g,30+g,-72+g*6,-12-g*6)
                        }
                    }
                    if(this.trigger.display.flower&&this.fades.flower>0){
                        if(constrain((pow(cos(this.spin.flower[0]+this.anim.head),1.5)*2-0.2),0,1)>0){
                            this.layer.image(graphics.minor[0],sin(this.spin.flower[0]+this.anim.head)*18.5-10*this.fade*this.fades.flower*constrain((pow(cos(this.spin.flower[0]+this.anim.head),1.5)*2-0.2),0,1),this.parts.flowerLevel-10*this.fade*this.fades.flower,20*this.fade*this.fades.flower*constrain((pow(cos(this.spin.flower[0]+this.anim.head),1.5)*2-0.2),0,1),20*this.fade*this.fades.flower)
                        }
                    }
                break
                
            }
        }
        this.layer.scale(1/this.size)
        this.layer.translate(-this.position.x-this.offset.position.x,-this.position.y-this.offset.position.y)
    }
    controlSpin(set,direction,spec){
        for(let g=0,lg=set.length;g<lg;g++){
            if(set[g].spin[0]>set[g].spin[1]&&spec==1){
                set[g].spin[1]=set[g].spin[0]+set[g].spin[1]
                set[g].spin[0]=set[g].spin[1]-set[g].spin[0]
                set[g].spin[1]=set[g].spin[1]-set[g].spin[0]
                set[g].y[1]=set[g].y[0]+set[g].y[1]
                set[g].y[0]=set[g].y[1]-set[g].y[0]
                set[g].y[1]=set[g].y[1]-set[g].y[0]
            }
            for(let h=0,lh=set[g].spin.length;h<lh;h++){
                if(direction+set[g].spin[h]>180){
                    set[g].spin[h]-=360
                }else if(direction+set[g].spin[h]<-180){
                    set[g].spin[h]+=360
                }
            }
        }
    }
    update(){
        if(this.life>0&&this.fade<1){
            this.fade=round(this.fade*15+1)/15
        }else{if(this.life<=0&&this.fade>0){
            this.fade=round(this.fade*15-1)/15
        }}
        switch(this.type){
            case 1:
                this.animSet.active=false
                if(this.animSet.active||this.animSet.loop>0){
                    this.animSet.loop++
                    if(this.animSet.loop>=20){
                        this.animSet.loop-=20
                        this.animSet.flip=1-this.animSet.flip
                    }
                }
                if(this.anim.direction>this.goal.anim.direction+3){
                    this.anim.direction-=6
                }
                if(this.anim.direction<this.goal.anim.direction-3){
                    this.anim.direction+=6
                }
                this.anim.head=this.anim.direction
                this.animSet.start=round(this.animSet.start)
                this.animSet.loop=round(this.animSet.loop)
                this.animSet.flip=round(this.animSet.flip)
                this.fades.kimono.main.back.x=1+abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.1
                this.fades.kimono.main.front.x=1+abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.1
                this.fades.kimono.main.back.y=1-abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.05
                this.fades.kimono.main.front.y=1-abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.05
                this.fades.kimono.outside.back.x=1+abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.1
                this.fades.kimono.outside.front.x=1+abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.1
                this.fades.kimono.outside.back.y=1-abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.05
                this.fades.kimono.outside.front.y=1-abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.05
                this.fades.kimono.decoration.position.large.x=1+abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.1
                this.fades.kimono.decoration.position.large.y=1-abs(sin((this.animSet.loop+this.animSet.flip*20)*9))*0.05
                if(this.trigger.animate){
                    for(let g=0;g<2;g++){
                        if(sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)>0){
                            this.anim.legs[g].top=24+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*30
                            this.anim.legs[g].bottom=sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-12
                            this.spin.legs[g].top=(60+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-36)*(g*2-1)
                            this.spin.legs[g].bottom=(120+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-72)*(g*2-1)
                            this.anim.arms[g].top=27+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*3
                            this.anim.arms[g].bottom=9+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*9
                            this.spin.arms[g].top=(93+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*48)*(g*2-1)
                            this.spin.arms[g].bottom=(75+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*45)*(g*2-1)
                            this.spin.arms[g].lock=sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*48
                        }else{
                            this.anim.legs[g].top=24+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*12
                            this.anim.legs[g].bottom=sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-48
                            this.spin.legs[g].top=(60+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-60)*(g*2-1)
                            this.spin.legs[g].bottom=(120+sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-60)*(g*2-1)
                            this.anim.arms[g].top=27-sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*9
                            this.anim.arms[g].bottom=9-sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*18
                            this.spin.arms[g].top=(93-sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-33)*(g*2-1)
                            this.spin.arms[g].bottom=(75-sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-27)*(g*2-1)
                            this.spin.arms[g].lock=-sin((this.animSet.loop+this.animSet.flip*20+g*20)*9)*-33
                        }
                    }
                }
                if(this.anim.direction>180){
                    this.anim.direction-=360
                }else if(this.anim.direction<-180){
                    this.anim.direction+=360
                }
            break
        }
    }
}