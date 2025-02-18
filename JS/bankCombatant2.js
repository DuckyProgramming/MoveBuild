combatant.prototype.setupGraphics=function(direction){
    switch(this.name){
        case 'Joe':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-78,mouth:-70,minor:15,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},logo:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},logo:true}}
            this.trigger.display.extra={damage:false}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{head:[240,220,180],body:[180,170,160],legs:[160,150,140],arms:[100,180,200],upperBody:[120,200,220]},logo:[0,255,50],belt:[180,100,20],eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
        break
        case 'George':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:18,bottom:18}},{top:9,bottom:0,length:{top:18,bottom:18}}],
                arms:[{top:24,bottom:9,length:{top:18,bottom:18}},{top:24,bottom:9,length:{top:18,bottom:18}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216,sword:0}
            this.color={skin:{head:[240,220,180],body:[35,40,40],legs:[25,30,30],arms:[30,35,35]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},helmet:[40,45,45],visor:[200,200,200],belt:[30,25,0],badge:[[240,240,200],[240,240,40]]}
            this.parts={eyeLevel:-81,mouth:-73,minor:15,
                legs:[{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-64},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-64},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},helmet:1,visor:1,belt:1,badge:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},helmet:true,visor:true,belt:true,badge:true,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Lira':
            if(graphics.combatant[0]==-1){
                setupCombatantGraphics(0)
                graphics.combatant.splice(0,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,head:direction,sword:1,mouth:{x:8,y:5,open:0},
                eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                legs:[
                    {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                    {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
                ],arms:[
                    {top:24,bottom:9,length:{top:16,bottom:16}},
                    {top:24,bottom:9,length:{top:16,bottom:16}}
                ]}

            this.kimono={decoration:[]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                bow:{center:0,loop:[-24,24]},
                under:{top:[],bottom:[],tanga:24,piece:36,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                underBow:{top:{center:0,end:[-4,4],loop:[-12,12]},bottom:{center:0,end:[-5,5],loop:[-15,15]}},
                sandal:[6,-6],eye:[-18,18],flower:[54,48,56],button:0,sword:75,mouth:216}

            this.color=graphics.combatant[0].color

            this.parts={eyeLevel:-72,flowerLevel:[-77.5,-75,-71.5],mouth:-65,
                under:{top:-51,bottom:-31,bow:{top:2.75,bottom:-5}},
                kimono:{main:-58,outside:-59,bow:-53},
                minor:15,
                legs:[
                    {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                    {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                ],arms:[
                    {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={flower:[1,1,1],eye:[1,1],band:[1,1],mouth:1,
                sandal:{back:[1,1],front:[1,1]},
                skin:{legs:1,arms:1,body:1,head:1,button:1},
                kimono:{decoration:{fade:1,position:{x:1,y:1},size:{x:1,y:1}},
                main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}},bow:1},
                under:{top:1,bottom:1,tanga:1,bow:{top:1,bottom:1},under:{top:1,button:1,bottom:1}},
            }

            if(options.alt){
                this.trigger={display:{flower:[true,true,true],band:[false,true],mouth:true,
                    hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[false,false],front:[false,false]},
                    skin:{legs:true,arms:true,body:true,head:true,button:false},
                    kimono:{main:{back:false,front:false},outside:{back:false,front:false},bow:false,decoration:false},
                    under:{top:true,bottom:true,tanga:false,bow:{top:true,bottom:true},under:{top:true,button:false,bottom:false}},
                }}
            }else{
                this.trigger={display:{flower:[true,true,true],band:[true,true],mouth:true,
                    hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[true,true],front:[true,true]},
                    skin:{legs:true,arms:true,body:true,head:true,button:false},
                    kimono:{main:{back:true,front:true},outside:{back:true,front:true},bow:true,decoration:true},
                    under:{top:false,bottom:false,tanga:false,bow:{top:false,bottom:false},under:{top:true,button:false,bottom:false}},
                }}
            }

            this.trigger.display.mode={
                sandal:{edge:0},
            }

            this.trigger.display.extra={sword:true,damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:1,foot:1}

            this.goal={anim:{direction:this.anim.direction,sword:true}}

            for(let g=0;g<25;g++){
                this.spin.under.top.push(g*72/5)
            }
            for(let g=0;g<20;g++){
                this.spin.under.bottom.push(g*18)
            }
            for(let g=0;g<2;g++){
                this.kimono.decoration.push({spin:90-g*47.5,rotate:random(0,360),y:46-g*4.5,width:0.2,height:1,type:0})
            }
            this.kimono.decoration.push({spin:134,rotate:random(0,360),y:49,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:180,rotate:random(0,360),y:50,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:226,rotate:random(0,360),y:49,width:0.2,height:1,type:0})
            for(let g=0;g<7;g++){
                this.kimono.decoration.push({spin:270+g*47.5,rotate:random(0,360),y:46-g*4.5,width:0.2,height:1,type:0})
            }
        
            this.kimono.decoration.push({spin:78,rotate:random(0,360),y:38,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:118,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:156,rotate:random(0,360),y:44,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:204,rotate:random(0,360),y:44,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:242,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
            for(let g=0;g<5;g++){
                this.kimono.decoration.push({spin:282+g*47.5,rotate:random(0,360),y:38-g*4.4,width:0.2,height:1,type:0})
            }
        
            this.kimono.decoration.push({spin:96,rotate:random(0,360),y:34,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:138,rotate:random(0,360),y:36,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:180,rotate:random(0,360),y:38,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:222,rotate:random(0,360),y:36,width:0.2,height:1,type:0})
            for(let g=0;g<4;g++){
                this.kimono.decoration.push({spin:264+g*47.5,rotate:random(0,360),y:32.5-g*4.4,width:0.2,height:1,type:0})
            }
        
            this.kimono.decoration.push({spin:154,rotate:random(0,360),y:30,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:206,rotate:random(0,360),y:30,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:254,rotate:random(0,360),y:27,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:302,rotate:random(0,360),y:22,width:0.2,height:1,type:0})
        
            this.kimono.decoration.push({spin:218,rotate:random(0,360),y:24,width:0.2,height:1,type:0})
        break
        case 'Sakura':
            if(graphics.combatant[1]==-1){
                setupCombatantGraphics(1)
                graphics.combatant.splice(1,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,head:direction,sword:1,sword2:0,mouth:{x:8,y:5,open:0},
                eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                wrap:{bow:{position:{x:1,y:1}}},
                legs:[
                    {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                    {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
                ],arms:[
                    {top:27,bottom:9,length:{top:16,bottom:16}},
                    {top:27,bottom:9,length:{top:16,bottom:16}}
                ]}

            this.kimono={decoration:{large:[],small:[]},string:[]}

            this.under={dressDecoration:{large:[]}}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                bow:{center:0,end:[-5,5],loop:[-20,20]},
                under:{top:[[],[]],bottom:[[],[]],tanga:30,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                underBow:{top:{center:0,end:[-4,4],loop:[-16,16]},bottom:{center:0,end:[-4,4],loop:[-16,16]}},
                necklaceBow:{center:180,end:[172,-172],loop:[160,-160]},
                wrap:{bow:180,bar:33,center:0},
                sleeve:{decoration:[]},
                sandal:[10,-10],eye:[-18,18],flower:[-48,-30],necklace:[-45,45,0],button:0,tail:108,sword:75,mouth:36}

            this.color=graphics.combatant[1].color

            this.parts={eyeLevel:-71.5,flowerLevel:-77.5,necklaceBow:-59,mouth:-68.5,
                under:{dress:-58,top:-50,bottom:-31,bow:{top:3,bottom:-6.25}},
                kimono:{main:-58,outside:-62,fringe:-38,shadow:-37.5,bow:-51.5,string:9,flowerLevel:-44},
                wrap:{bow:-44,bar:7.5},
                minor:15,
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

            this.fades={flower:1,flower2:1,eye:[1,1],mouth:1,
                sandal:{back:[1,1],front:[1,1]},necklace:{back:1,front:1},sleeve:1,sleeveDecoration:1,
                skin:{legs:1,arms:1,body:1,head:1,button:1},
                kimono:{decoration:{fade:{large:1,small:1},position:{large:{x:1,y:1},small:{x:1,y:1}},size:{large:{x:1,y:1},small:{x:1,y:1}}},
                main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}},fringe:{back:{x:1,y:1},front:{x:1,y:1}},shadow:{x:1,y:1},bow:1,string:1,flower:1},
                under:{dress:{back:{x:1,y:1},front:{x:1,y:1},decoration:{fade:{large:1},position:{large:{x:1,y:1}},size:{large:{x:1,y:1}}}},towel:1,top:1,bottom:1,tanga:1,bow:{top:1,bottom:1},under:{top:1,button:1,bottom:1}},
                wrap:{round:1,bow:1,bar:1,sleeve:1},
            }

            if(options.alt){
                this.trigger={display:{flower:true,flower2:false,mouth:true,
                    hair:{back:true,front:true,tail:true,glow:true},eye:[true,true],sandal:{back:[false,false],front:[false,false]},sleeve:false,sleeveDecoration:false,necklace:{back:true,front:true},
                    skin:{legs:true,arms:true,body:true,head:true,button:true},
                    kimono:{main:{back:false,front:false},outside:{back:false,front:false},fringe:{back:false,front:false},decoration:{large:false,small:false},shadow:false,bow:false,string:false,flower:false},
                    wrap:{round:false,bow:false,bar:false,sleeve:false},
                    under:{dress:{back:false,front:false,decoration:{large:false}},towel:false,top:true,bottom:true,tanga:false,bow:{top:true,bottom:true},under:{top:true,button:false,bottom:false}},
                }}
            }else{
                this.trigger={display:{flower:true,flower2:false,mouth:true,
                    hair:{back:true,front:true,tail:true,glow:true},eye:[true,true],sandal:{back:[true,true],front:[true,true]},sleeve:true,sleeveDecoration:true,necklace:{back:true,front:true},
                    skin:{legs:true,arms:true,body:true,head:true,button:false},
                    kimono:{main:{back:true,front:true},outside:{back:true,front:true},fringe:{back:true,front:true},decoration:{large:true,small:true},shadow:true,bow:true,string:true,flower:true},
                    wrap:{round:true,bow:true,bar:true,sleeve:true},
                    under:{dress:{back:false,front:false,decoration:{large:false}},towel:false,top:false,bottom:false,tanga:false,bow:{top:false,bottom:false},under:{top:true,button:false,bottom:false}},
                }}
            }

            this.trigger.display.mode={
                kimono:{main:1},
                sandal:{edge:0},
            }

            this.trigger.display.extra={sword:true,sword2:false,damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction,sword:true,sword2:true}}

            for(let g=0;g<2;g++){
                this.kimono.decoration.large.push({spin:90-g*47.5,rotate:24,y:50-g*5,width:0.35,height:1})
            }
            this.kimono.decoration.large.push({spin:134,rotate:12,y:54,width:0.35,height:1})
            this.kimono.decoration.large.push({spin:180,rotate:0,y:55,width:0.35,height:1})
            this.kimono.decoration.large.push({spin:226,rotate:-12,y:54,width:0.35,height:1})
            for(let g=0;g<7;g++){
                this.kimono.decoration.large.push({spin:270+g*47.5,rotate:-24,y:50-g*5,width:0.35,height:1})
            }
            for(let g=0;g<2;g++){
                this.kimono.decoration.small.push({spin:66-g*47.5,rotate:24,y:47-g*5,width:0.6,height:0.8})
            }
            this.kimono.decoration.small.push({spin:112,rotate:21,y:52,width:0.6,height:0.8})
            this.kimono.decoration.small.push({spin:156,rotate:6,y:54.5,width:0.6,height:0.8})
            this.kimono.decoration.small.push({spin:204,rotate:-6,y:54.5,width:0.6,height:0.8})
            this.kimono.decoration.small.push({spin:248,rotate:-21,y:52,width:0.6,height:0.8})
            for(let g=0;g<7;g++){
                this.kimono.decoration.small.push({spin:294+g*47.5,rotate:-24,y:47-g*5,width:0.6,height:0.8})
            }
            for(let g=0;g<15;g++){
                this.spin.under.top[0].push(g*24)
                this.spin.under.bottom[0].push(g*24+12)
            }
            for(let g=0;g<20;g++){
                this.spin.under.top[1].push(g*18)
                this.spin.under.bottom[1].push(g*18+9)
            }
            for(let g=0;g<21;g++){
                this.kimono.string.push(g*120/7)
            }
            for(let g=0;g<4;g++){
                this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:0,length:0.3,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:1,length:0.3,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:0,length:0.65,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:1,length:0.65,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:0,length:1,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:1,length:1,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:0,length:1.45,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:1,length:1.45,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:0,length:1.8,type:floor(random(0,this.color.sleeve.decoration.length))})
                this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:1,length:1.8,type:floor(random(0,this.color.sleeve.decoration.length))})
            }
            for(let h=0;h<2;h++){
                for(let g=0,lg=8+h*2;g<lg;g++){
                    this.under.dressDecoration.large.push({spin:360*g/lg+10,rotate:random(0,360),y:22+(g%2)+h*10,width:0.3,height:1.5,type:0})
                    this.under.dressDecoration.large.push({spin:360*g/lg+180/lg+10,rotate:random(0,360),y:27+(g%2)+h*10,width:0.3,height:1.5,type:0})
                }
            }
        break
        case 'Certes':
            if(graphics.combatant[2]==-1){
                setupCombatantGraphics(2)
                graphics.combatant.splice(2,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,head:direction,mouth:{x:8,y:4,open:0},
                eye:[0,0],eyeStyle:[0,0],under:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                legs:[
                    {top:9,bottom:0,length:{top:16,bottom:16}},
                    {top:9,bottom:0,length:{top:16,bottom:16}}
                ],arms:[
                    {top:27,bottom:9,length:{top:16,bottom:16}},
                    {top:27,bottom:9,length:{top:16,bottom:16}}
                ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                bow:{center:0,end:[-5,5],loop:[-20,20]},
                eye:[-18,18],mouth:36}

            this.color=graphics.combatant[2].color

            this.parts={eyeLevel:-71.5,mouth:-68.5,
                under:{dress:-58,bow:3},
                minor:15,
                legs:[
                    {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ]}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={eye:[1,1],mouth:1,
                skin:{legs:1,arms:1,body:1,head:1},
                under:{dress:{back:{x:1,y:1},front:{x:1,y:1}},bow:1},
            }

            this.trigger={display:{mouth:true,
                hair:{back:true,front:true,glow:true},eye:[true,true],
                skin:{legs:true,arms:true,body:true,head:true},
                under:{dress:{back:true,front:true},bow:true},
            }}

            this.trigger.display.extra={damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Azis':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:16.5,bottom:16.5}},{top:9,bottom:0,length:{top:16.5,bottom:16.5}}],
                arms:[{top:24,bottom:9,length:{top:16.5,bottom:16.5}},{top:24,bottom:9,length:{top:16.5,bottom:16.5}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216,sword:0}
            this.color={skin:{head:[230,220,185],body:[85,75,65],legs:[80,70,60],arms:[80,70,60]},eye:{back:[80,0,0],front:[100,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},button:[70,60,50],hood:[60,50,40],hoodBack:[40,35,30],cape:[30,25,20]}
            this.hood=[{spin:[0,180,105],height:16},{spin:[-180,0,-105],height:16}]
            this.parts={eyeLevel:-75,mouth:-66,minor:15,
                legs:[{top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:3.5,y:-58},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-58},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},button:1,hood:1,cape:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},button:true,hood:true,cape:true,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:1}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Donakho':
            this.anim={direction:direction,fat:1,eye:[0,0],eyeStyle:[0,0],legs:[{top:24,length:{top:12.5}},{top:24,length:{top:12.5}}],arms:[{top:54,length:{top:12.5}},{top:54,length:{top:12.5}}]}
            this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1},hat:1,coat:1}
            this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
            this.color={eye:{back:[0,0,0],front:[0,20,30],glow:[200,255,255]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,250,200],body:[120,130,130],legs:[255,235,175],arms:[255,240,180]},hat:[200,200,75],coat:[165,155,45]}
            this.parts={eyeLevel:-48,beakLevel:-41,minor:13,legs:[{top:{x:4,y:-18},middle:{x:0,y:0}},{top:{x:4,y:-18},middle:{x:0,y:0}}],arms:[{top:{x:3.75,y:-30.5},middle:{x:0,y:0}},{top:{x:3.75,y:-30.5},middle:{x:0,y:0}}]}
            this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true},hat:true,coat:true,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Setsuna':
            if(graphics.combatant[3]==-1){
                setupCombatantGraphics(3)
                graphics.combatant.splice(3,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,head:direction,sword:1,mouth:{x:8,y:4,open:0},
                eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                legs:[
                    {top:9,bottom:0,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
                    {top:9,bottom:0,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
                ],arms:[
                    {top:24,bottom:9,length:{top:17,bottom:17}},
                    {top:24,bottom:9,length:{top:17,bottom:17}}
                ]}

            this.kimono={decoration:[]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                bow:{center:0,loop:[-24,24]},
                under:{top:[],bottom:[],tanga:24,piece:36,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                underBow:{top:{center:0,end:[-4,4],loop:[-12,12]},bottom:{center:0,end:[-5,5],loop:[-15,15]}},
                sandal:[6,-6],eye:[-18,18],flower:[-57,-60,-42],button:0,sword:75,mouth:216}

            this.color=graphics.combatant[3].color

            this.parts={eyeLevel:-78,flowerLevel:[-85,-81,-84],mouth:-71,
                under:{top:-55,bottom:-34,bow:{top:2.75,bottom:-5}},
                kimono:{main:-63,outside:-64,bow:-57},
                minor:15,
                legs:[
                    {top:{x:3,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                    {top:{x:3,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                ],arms:[
                    {top:{x:3.5,y:-59},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3.5,y:-59},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={flower:[1,1,1],eye:[1,1],band:[1,1],mouth:1,
                sandal:{back:[1,1],front:[1,1]},
                skin:{legs:1,arms:1,body:1,head:1,button:1},
                kimono:{decoration:{fade:1,position:{x:1,y:1},size:{x:1,y:1}},
                main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}},bow:1,ribbon:1},
                under:{top:1,bottom:1,tanga:1,bow:{top:1,bottom:1},under:{top:1,button:1,bottom:1}},
            }

            if(options.alt){
                this.trigger={display:{flower:[true,true,true],band:[false,true],mouth:true,
                    hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[false,false],front:[false,false]},
                    skin:{legs:true,arms:true,body:true,head:true,button:false},
                    kimono:{main:{back:false,front:false},outside:{back:false,front:false},bow:false,decoration:false,ribbon:true},
                    under:{top:true,bottom:true,tanga:false,bow:{top:true,bottom:true},under:{top:true,button:false,bottom:false}},
                }}
            }else{
                this.trigger={display:{flower:[true,true,true],band:[true,true],mouth:true,
                    hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[true,true],front:[true,true]},
                    skin:{legs:true,arms:true,body:true,head:true,button:false},
                    kimono:{main:{back:true,front:true},outside:{back:true,front:true},bow:true,decoration:true,ribbon:true},
                    under:{top:false,bottom:false,tanga:false,bow:{top:false,bottom:false},under:{top:true,button:false,bottom:false}},
                }}
            }

            this.trigger.display.mode={
                sandal:{edge:0},
            }

            this.trigger.display.extra={sword:true,damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction,sword:true}}

            for(let g=0;g<2;g++){
                this.kimono.decoration.push({spin:90-g*47.5,rotate:random(0,360),y:50-g*6,width:0.2,height:1,type:0})
            }
            this.kimono.decoration.push({spin:134,rotate:random(0,360),y:57,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:180,rotate:random(0,360),y:59,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:226,rotate:random(0,360),y:57,width:0.2,height:1,type:0})
            for(let g=0;g<7;g++){
                this.kimono.decoration.push({spin:270+g*47.5,rotate:random(0,360),y:50-g*6,width:0.2,height:1,type:0})
            }
        
            this.kimono.decoration.push({spin:78,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:118,rotate:random(0,360),y:48,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:156,rotate:random(0,360),y:51,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:204,rotate:random(0,360),y:51,width:0.2,height:1,type:0})
            this.kimono.decoration.push({spin:242,rotate:random(0,360),y:48,width:0.2,height:1,type:0})
            for(let g=0;g<5;g++){
                this.kimono.decoration.push({spin:282+g*47.5,rotate:random(0,360),y:42-g*5.9,width:0.2,height:1,type:0})
            }
        break
        case 'Airi':
            if(graphics.combatant[4]==-1){
                setupCombatantGraphics(4)
                graphics.combatant.splice(4,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,head:direction,mouth:{x:6,y:4,open:0},
                eye:[0,0],eyeStyle:[0,0],
                legs:[
                    {top:9,bottom:0,length:{top:16,bottom:16}},
                    {top:9,bottom:0,length:{top:16,bottom:16}}
                ],arms:[
                    {top:27,bottom:9,length:{top:16,bottom:16}},
                    {top:27,bottom:9,length:{top:16,bottom:16}}
                ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                hair:{pin:[-85,85]},
                eye:[-18,18],blush:[-17,17],button:0,sword:75,mouth:36}

            this.color=graphics.combatant[4].color

            this.parts={eyeLevel:-72,mouth:-69,blush:-68.5,
                minor:15,
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

            this.fades={eye:[1,1],mouth:1,halo:1,sock:1,shoe:1,
                hair:{pin:1},
                uniform:{shirt:1,skirt:1,stripeShirt:1,stripeSkirt:1,collar:1,bow:1,belt:1},
                skin:{legs:1,arms:1,body:1,head:1,button:1,blush:1},
            }

            this.trigger={display:{mouth:true,halo:true,sock:true,shoe:true,
                hair:{back:true,front:true,pin:true,glow:true},eye:[true,true],
                uniform:{shirt:true,skirt:true,stripeShirt:true,stripeSkirt:true,collar:true,bow:true,belt:true},
                skin:{legs:true,arms:true,body:true,head:true,button:true,blush:true},
            }}

            this.trigger.display.extra={damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:1}

            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Edgar':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.color={skin:{head:[250,225,125],body:[30,40,50],legs:[20,30,40],arms:[25,35,45]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},tie:[[80,120,200],[200,80,40]],belt:[[120,60,20],[120,140,160],[80,100,120]],monocle:[[200,210,220],[40,50,60]]}
            this.parts={eyeLevel:-78,mouth:-70,minor:15,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},tie:1,belt:1,monocle:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},tie:true,belt:true,monocle:true,briefcase:true,extra:{damage:false,sword:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Chip':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.color={skin:{head:[240,220,180],body:[220,220,220],upperBody:[240,240,240],legs:[210,210,210],arms:[230,230,230]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},rose:[[50,200,50],[200,50,50]],bowtie:[[200,200,120],[100,100,100]],hat:[240,240,240]}
            this.parts={eyeLevel:-78,mouth:-70,minor:15,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},rose:1,bowtie:1,hat:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},rose:true,bowtie:true,hat:true,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:1,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Shiru':
            if(graphics.combatant[5]==-1){
                setupCombatantGraphics(5)
                graphics.combatant.splice(5,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,mouth:{x:8,y:3.5,open:0},
                eye:[0,0],eyeStyle:[0,0],
                legs:[
                    {top:9,bottom:0,length:{top:15.5,bottom:15.5}},
                    {top:9,bottom:0,length:{top:15.5,bottom:15.5}}
                ],arms:[
                    {top:27,bottom:9,length:{top:15.5,bottom:15.5}},
                    {top:27,bottom:9,length:{top:15.5,bottom:15.5}}
                ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                hair:{bow:[-96,96]},
                eye:[-18,18],tail:[-114,114],button:0,mouth:36}

            this.color=graphics.combatant[5].color

            this.parts={eyeLevel:-68,mouth:-65,minor:15,
                legs:[
                    {top:{x:3,y:-31},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3,y:-31},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:3.5,y:-53},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3.5,y:-53},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ]}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={eye:[1,1],mouth:1,
                skin:{legs:1,arms:1,body:1,head:1},
                dress:{main:1,bow:1,sleeve:1}
            }

            this.trigger={display:{mouth:true,
                hair:{back:true,front:true,tail:true,glow:true,bow:true},eye:[true,true],
                skin:{legs:true,arms:true,body:true,head:true},
                dress:{main:true,bow:true,sleeve:true},
            }}

            this.trigger.display.extra={damage:false}

            this.calc={int:[0,0,0,0]}
            
            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'DD-610':
            this.anim={direction:direction,head:direction,eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18]}
            this.color={
                skin:{head:{in:[174,177,192],out:[202,195,202]},bodyUpper:{in:[184,187,202],out:[212,205,212]},bodyLower:{in:[94,94,102],out:[126,125,131]},legs:[116,115,121],arms:[159,164,183]},
                wire:[65,52,61],seal:[171,65,87],antenna:[192,89,106],lowAntenna:[182,70,95],ring:[180,72,96],belt:[158,75,91],stripe:[70,57,66],dots:[[140,125,144],[162,143,163]],
                eye:{back:[164,77,120],front:[114,54,82],glow:[255,140,203]}}
            this.parts={eyeLevel:-78,minor:15,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:8,y:-56},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:8,y:-56},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],skin:{legs:1,arms:1,body:1,head:1},antenna:1,seal:1,belt:1}
            this.trigger={display:{eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},antenna:true,seal:true,belt:true,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Prehextorica':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-78,mouth:-70,minor:15,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.trigger.display.extra={damage:false}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{head:[225,180,45],body:[215,170,35],legs:[205,160,25],arms:[195,150,15],node:[150,135,75],rock:[165,135,15],crack:[195,162,39]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
        break
        case 'Vincent':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-79.5,mouth:-71.5,minor:15,
                legs:[{top:{x:3,y:-34.5},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-34.5},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:3.5,y:-62},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-62},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},glasses:1,belt:1,pocket:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},glasses:true,belt:true,pocket:1}}
            this.trigger.display.extra={damage:false}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:1,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{head:[240,230,160],body:[140,130,120],legs:[120,110,100],arms:[120,160,180],upperBody:[140,180,200]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0],teeth:[[65,65,65],[245,245,245]]},belt:[60,50,35],glasses:[[85,85,85],[230,235,240]],pocket:[[160,200,220],[170,210,230]]}
        break
        case 'Daiyousei':
            if(graphics.combatant[6]==-1){
                setupCombatantGraphics(6)
                graphics.combatant.splice(6,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,mouth:{x:8,y:4,open:0},
                eye:[0,0],eyeStyle:[0,0],
                legs:[
                    {top:9,bottom:0,length:{top:15,bottom:15}},
                    {top:9,bottom:0,length:{top:15,bottom:15}}
                ],arms:[
                    {top:27,bottom:9,length:{top:15,bottom:15}},
                    {top:27,bottom:9,length:{top:15,bottom:15}}
                ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                hair:{bow:[-96,96]},
                eye:[-18,18],flower:[93],blush:[-21,21],button:0,mouth:36}

            this.color=graphics.combatant[6].color

            this.parts={eyeLevel:-67.5,mouth:-64.5,flowerLevel:[-76],blush:-64.75,minor:15,
                legs:[
                    {top:{x:2.5,y:-31},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:2.5,y:-31},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:3,y:-51},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3,y:-51},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ]}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={flower:[1],eye:[1,1],mouth:1,
                skin:{legs:1,arms:1,body:1,head:1,blush:1},
                dress:{main:1,sleeve:1},wing:true,
            }

            this.trigger={display:{flower:[true],mouth:true,
                hair:{back:true,front:true,glow:true},eye:[true,true],
                skin:{legs:true,arms:true,body:true,head:true,blush:true},
                dress:{main:true,sleeve:true},wing:true,
            }}

            this.trigger.display.extra={damage:false}

            this.calc={int:[0,0,0,0]}
            
            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Sanae':
            if(graphics.combatant[7]==-1){
                setupCombatantGraphics(7)
                graphics.combatant.splice(7,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,head:direction,sword:1,mouth:{x:8,y:4.5,open:0},
                eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                legs:[
                    {top:9,bottom:0,length:{top:16.5,bottom:16.5}},
                    {top:9,bottom:0,length:{top:16.5,bottom:16.5}}
                ],arms:[
                    {top:24,bottom:9,length:{top:16.5,bottom:16.5}},
                    {top:24,bottom:9,length:{top:16.5,bottom:16.5}}
                ]}

            this.dress={flaps:[
                {spin:[0,90,30],height:4},
                {spin:[-90,0,-30],height:4},
                {spin:[90,180,150],height:4},
                {spin:[-180,-90,-150],height:4}
            ],top:[
                {spin:[0,90,30],height:3},
                {spin:[-90,0,-30],height:3},
                {spin:[90,180,150],height:3},
                {spin:[-180,-90,-150],height:3}
            ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                hair:{pin:66},
                eye:[-18,18],button:0,tail:84,sword:75,mouth:39}

            this.color=graphics.combatant[7].color

            this.parts={eyeLevel:-75,mouth:-72,
                minor:15,
                legs:[
                    {top:{x:3,y:-33},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3,y:-33},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:3.5,y:-57},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3.5,y:-57},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={eye:[1,1],mouth:1,sock:1,shoe:1,
                hair:{pin:1},
                skin:{legs:1,arms:1,body:1,head:1,button:1},
                dress:{main:1,sleeve:1},
            }

            this.trigger={display:{mouth:true,sock:true,shoe:true,
                hair:{back:true,front:true,glow:true,tail:true,pin:true},eye:[true,true],
                skin:{legs:true,arms:true,body:true,head:true,button:false},
                dress:{main:true,sleeve:true},
            }}

            this.trigger.display.extra={sword:true,damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction,sword:true}}
        break
        case 'Shinmyoumaru':
            if(graphics.combatant[8]==-1){
                setupCombatantGraphics(8)
                graphics.combatant.splice(8,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,mouth:{x:8,y:4,open:0},
                eye:[0,0],eyeStyle:[0,0],sword:1,
                legs:[
                    {top:9,bottom:0,length:{top:15,bottom:15}},
                    {top:9,bottom:0,length:{top:15,bottom:15}}
                ],arms:[
                    {top:27,bottom:9,length:{top:15,bottom:15}},
                    {top:27,bottom:9,length:{top:15,bottom:15}}
                ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                wrap:{bow:180},
                eye:[-18,18],button:0,sword:75,mouth:45}

            this.color=graphics.combatant[8].color

            this.kimono={decoration:graphics.combatant[8].parts.kimono.decoration}

            this.parts={eyeLevel:-65,mouth:-61.5,
                kimono:{main:-56.5,outside:-56},
                wrap:{bow:-44,decoration:[],bowDecoration:[]},
                sleeve:{decoration:[]},
                minor:15,
                legs:[
                    {top:{x:3,y:-29},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3,y:-29},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:4,y:-47},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:4,y:-47},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ]}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={eye:[1,1],mouth:1,
                sleeve:1,sleeveDecoration:1,
                skin:{legs:1,arms:1,body:1,head:1},
                kimono:{decoration:[1,1,1],main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}}},
                wrap:{round:1,bow:1},
            }

            this.trigger={display:{mouth:true,
                sleeve:true,sleeveDecoration:true,
                hair:{back:true,front:true,glow:true},eye:[true,true],
                skin:{legs:true,arms:true,body:true,head:true},
                kimono:{main:{back:true,front:true},outside:{back:true,front:true},decoration:[true,true,true]},
                wrap:{round:true,bow:true},
            }}

            this.trigger.display.extra={sword:true,damage:false}

            this.calc={int:[0,0,0,0]}
            
            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:1}

            this.goal={anim:{direction:this.anim.direction,sword:true}}

            for(let a=0,la=24;a<la;a++){
                this.parts.wrap.decoration.push([random(0.15,0.3)+a%2*0.55,random(0.6,1),random(0,0.8)])
            }
            this.parts.wrap.bowDecoration.push([-0.8,-0.6,random(0.6,1)])
            this.parts.wrap.bowDecoration.push([-0.85,-0.1,random(0.6,1)])
            this.parts.wrap.bowDecoration.push([-0.5,-0.3,random(0.6,1)])
            this.parts.wrap.bowDecoration.push([-0.6,0.4,random(0.6,1)])
            this.parts.wrap.bowDecoration.push([0.9,0.8,random(0.6,1)])
            this.parts.wrap.bowDecoration.push([0.7,0.4,random(0.6,1)])
            this.parts.wrap.bowDecoration.push([0.75,-0.55,random(0.6,1)])
            this.parts.wrap.bowDecoration.push([0.9,-0.1,random(0.6,1)])
            this.parts.wrap.bowDecoration.push([0.35,-0.25,random(0.6,1)])
            for(let a=0,la=2;a<la;a++){
                this.parts.sleeve.decoration.push([])
                for(let b=0,lb=20;b<lb;b++){
                    this.parts.sleeve.decoration[a].push(
                        {
                            type:floor(random(0,3)),spin:360*b/lb,rotate:random(0,360),size:random(1,1.5),
                            y:1+b%2*3+(b%4==1?1:0)*3+random(0,2)
                        }
                    )
                }
            }
        break
        case 'Merlin':
            if(graphics.combatant[9]==-1){
                setupCombatantGraphics(9)
                graphics.combatant.splice(9,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,mouth:{x:8,y:3.5,open:0},
                eye:[0,0],eyeStyle:[0,0],
                legs:[
                    {top:9,bottom:0,length:{top:16.5,bottom:16.5}},
                    {top:9,bottom:0,length:{top:16.5,bottom:16.5}}
                ],arms:[
                    {top:24,bottom:9,length:{top:16.5,bottom:16.5}},
                    {top:24,bottom:9,length:{top:16.5,bottom:16.5}}
                ]}

            this.dress={top:[
                {spin:[0,90,45],height:4},
                {spin:[-90,0,-45],height:4},
                {spin:[90,180,135],height:4},
                {spin:[-180,-90,-135],height:4}
            ],trim:[
                {spin:[0,90,57],height:4},
                {spin:[-90,0,-57],height:4},
                {spin:[90,180,123],height:4},
                {spin:[-180,-90,-123],height:4}
            ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                eye:[-18,18],button:0,mouth:36}

            this.color=graphics.combatant[9].color

            this.parts={eyeLevel:-75,mouth:-71,minor:15,
                legs:[
                    {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:3.5,y:-57},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3.5,y:-57},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ]}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={eye:[1,1],mouth:1,sock:1,shoe:1,
                skin:{legs:1,arms:1,body:1,head:1},
                dress:{main:1,sleeve:1},
                hat:{main:1},
            }

            this.trigger={display:{mouth:true,sock:true,shoe:true,
                hair:{back:true,front:true,glow:true},eye:[true,true],
                skin:{legs:true,arms:true,body:true,head:true},
                dress:{main:true,sleeve:true},
                hat:{main:true},
                star:true,
            }}

            this.trigger.display.extra={damage:false}

            this.calc={int:[0,0,0,0]}
            
            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Ducopo':
            this.anim={direction:direction,fat:1,eye:[0,0],eyeStyle:[0,0],legs:[{top:24,length:{top:12.5}},{top:24,length:{top:12.5}}],arms:[{top:54,length:{top:12.5}},{top:54,length:{top:12.5}}]}
            this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1},hat:1,belt:1}
            this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
            this.color={eye:{back:[0,0,0],front:[30,20,0],glow:[255,255,200]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[175,235,115],body:[165,225,105],legs:[150,210,90],arms:[155,215,95]},hat:[180,140,80],belt:[180,145,120]}
            this.parts={eyeLevel:-48,beakLevel:-41,minor:13,legs:[{top:{x:4,y:-18},middle:{x:0,y:0}},{top:{x:4,y:-18},middle:{x:0,y:0}}],arms:[{top:{x:3.75,y:-30.5},middle:{x:0,y:0}},{top:{x:3.75,y:-30.5},middle:{x:0,y:0}}]}
            this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true},hat:true,belt:true,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Randy':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.color={skin:{head:[240,220,40],body:[225,205,35],legs:[205,195,30],arms:[215,185,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},belt:[40,45,40],goggles:[[40,40,35],[240,240,240]],mark:[80,80,20],band:[100,95,80]}
            this.parts={eyeLevel:-78,mouth:-70,minor:15,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},belt:1,goggles:0.8,mark:1,band:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},belt:true,goggles:true,mark:true,band:true,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Sagume':
            if(graphics.combatant[10]==-1){
                setupCombatantGraphics(10)
                graphics.combatant.splice(10,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,head:direction,sword:1,mouth:{x:8,y:4,open:0},
                eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                legs:[
                    {top:9,bottom:0,length:{top:16.75,bottom:16.75}},
                    {top:9,bottom:0,length:{top:16.75,bottom:16.75}}
                ],arms:[
                    {top:24,bottom:9,length:{top:16.75,bottom:16.75}},
                    {top:24,bottom:9,length:{top:16.75,bottom:16.75}}
                ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                hair:{pin:66},
                eye:[-18,18],button:0,mouth:39}

            this.color=graphics.combatant[10].color

            this.dress={main:[]}

            for(let a=0,la=13;a<la;a++){
                this.dress.main.push({spin:[-180+a/la*360,-120+a/la*360,-150+a/la*360],y:[0,0,20]})
                this.dress.main.push({spin:[-153+a/la*360,-138+a/la*360,-150+a/la*360],y:[16,16,20]})
            }

            this.braid=[]

            for(let a=0,la=26;a<la;a++){
                let spin=180+a*10-la*5+5+(a<la/2?-1:1)
				this.braid.push({spin:spin>180?spin-360:spin,rotate:a<la/2?random(-30,-20):random(20,30),size:random(1.2,1.5),down:-1.2*lcos(spin)})
			}

            this.parts={eyeLevel:-77,mouth:-73,
                minor:15,
                legs:[
                    {top:{x:3,y:-33.5},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3,y:-33.5},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:3.5,y:-59},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3.5,y:-59},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={eye:[1,1],mouth:1,wing:1,
                skin:{legs:1,arms:1,body:1,head:1,button:1},
                dress:{main:1,sleeve:1,bow:1},
                jacket:{main:1,sleeve:1}
            }

            this.trigger={display:{mouth:true,wing:true,
                hair:{back:true,front:true,glow:true,braid:true},eye:[true,true],
                skin:{legs:true,arms:true,body:true,head:true,button:false},
                dress:{main:true,sleeve:true,bow:true},
                jacket:{main:true,sleeve:true}
            }}

            this.trigger.display.extra={damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Fernando':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:13,bottom:13}},{top:9,bottom:0,length:{top:13,bottom:13}}],
                arms:[{top:24,bottom:9,length:{top:13,bottom:13}},{top:24,bottom:9,length:{top:13,bottom:13}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.color={skin:{head:[240,220,180],body:[200,160,200],legs:[120,80,40],arms:[180,140,170]},overall:[125,85,45],hat:[15,30,45],glasses:[[55,45,55],[180,160,180]],button:[30,15,30],eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
            this.parts={eyeLevel:-63,mouth:-55,minor:15,
                legs:[{top:{x:7.5,y:-26},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:7.5,y:-26},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:16,y:-41},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:16,y:-41},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},overall:1,hat:1,glasses:1,button:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},overall:true,hat:true,glasses:true,button:true,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Decratite':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-78,mouth:-70,minor:15,
                head:[
                    [
                        [constants.phi,-1,0],
                        [constants.phi,1,0],
                        [1,0,constants.phi],
                    ],[
                        [constants.phi,-1,0],
                        [constants.phi,1,0],
                        [1,0,-constants.phi],
                    ],[
                        [-constants.phi,-1,0],
                        [-constants.phi,1,0],
                        [-1,0,constants.phi],
                    ],[
                        [-constants.phi,-1,0],
                        [-constants.phi,1,0],
                        [-1,0,-constants.phi],
                    ],[
                        [0,constants.phi,-1],
                        [0,constants.phi,1],
                        [constants.phi,1,0],
                    ],[
                        [0,constants.phi,-1],
                        [0,constants.phi,1],
                        [-constants.phi,1,0],
                    ],[
                        [0,-constants.phi,-1],
                        [0,-constants.phi,1],
                        [constants.phi,-1,0],
                    ],[
                        [0,-constants.phi,-1],
                        [0,-constants.phi,1],
                        [-constants.phi,-1,0],
                    ],[
                        [-1,0,constants.phi],
                        [1,0,constants.phi],
                        [0,constants.phi,1],
                    ],[
                        [-1,0,constants.phi],
                        [1,0,constants.phi],
                        [0,-constants.phi,1],
                    ],[
                        [-1,0,-constants.phi],
                        [1,0,-constants.phi],
                        [0,constants.phi,-1],
                    ],[
                        [-1,0,-constants.phi],
                        [1,0,-constants.phi],
                        [0,-constants.phi,-1],
                    ],[
                        [1,0,constants.phi],
                        [0,constants.phi,1],
                        [constants.phi,1,0],
                    ],[
                        [-1,0,constants.phi],
                        [0,constants.phi,1],
                        [-constants.phi,1,0],
                    ],[
                        [1,0,constants.phi],
                        [0,-constants.phi,1],
                        [constants.phi,-1,0],
                    ],[
                        [-1,0,constants.phi],
                        [0,-constants.phi,1],
                        [-constants.phi,-1,0],
                    ],[
                        [1,0,-constants.phi],
                        [0,constants.phi,-1],
                        [constants.phi,1,0],
                    ],[
                        [-1,0,-constants.phi],
                        [0,constants.phi,-1],
                        [-constants.phi,1,0],
                    ],[
                        [1,0,-constants.phi],
                        [0,-constants.phi,-1],
                        [constants.phi,-1,0],
                    ],[
                        [-1,0,-constants.phi],
                        [0,-constants.phi,-1],
                        [-constants.phi,-1,0],
                    ],
                ],
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                head:[
                ],
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.trigger.display.extra={damage:false}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{head:[205,200,195],body:[200,195,190],legs:[190,185,180],arms:[195,190,185],glow:[240,250,230]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
        break
        case 'Dukelis':
            this.anim={direction:direction,fat:1,eye:[0,0],eyeStyle:[0,0],legs:[{top:24,length:{top:12.5}},{top:24,length:{top:12.5}}],arms:[{top:54,length:{top:12.5}},{top:54,length:{top:12.5}}]}
            this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1},helmet:1,medal:1}
            this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
            this.color={eye:{back:[0,0,0],front:[30,20,0],glow:[255,255,200]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,145,125],body:[225,135,115],legs:[210,120,100],arms:[215,125,105]},helmet:[[100,25,25],[225,200,50]],medal:[[225,25,25],[225,225,225],[225,175,50]]}
            this.parts={eyeLevel:-48,beakLevel:-41,minor:13,legs:[{top:{x:4,y:-18},middle:{x:0,y:0}},{top:{x:4,y:-18},middle:{x:0,y:0}}],arms:[{top:{x:3.75,y:-30.5},middle:{x:0,y:0}},{top:{x:3.75,y:-30.5},middle:{x:0,y:0}}]}
            this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true},helmet:true,medal:1,extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        //mark p
        case 'Ume':
            if(graphics.combatant[20]==-1){
                setupCombatantGraphics(20)
                graphics.combatant.splice(6,1,graphics.combatant[graphics.combatant.length-1])
                delete graphics.combatant[graphics.combatant.length-1]
                graphics.combatant.splice(graphics.combatant.length-1,1)
            }
            this.anim={direction:direction,head:direction,sword:1,mouth:{x:6,y:4,open:0},
                eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{
                    top:[{position:{x:1,y:1},size:{x:1,y:1}},{position:{x:1,y:1},size:{x:1,y:1}}],
                    bottom:[{position:{x:1,y:1},size:{x:1,y:1}},{position:{x:1,y:1},size:{x:1,y:1}}],
                    extra:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                wrap:{bow:{position:{x:1,y:1}}},
                legs:[
                    {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                    {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
                ],arms:[
                    {top:27,bottom:9,length:{top:16,bottom:16}},
                    {top:27,bottom:9,length:{top:16,bottom:16}}
                ]}

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                bow:{center:-36},
                under:{top:[[[],[]],[[],[]],[[],[]],[[],[]],[[],[]]],bottom:[[],[],[],[],[]],shawl:[],piece:54,tanga:30,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                underBow:{top:[{center:-40,end:[-43,-37],loop:[-49,-31]},{center:40,end:[37,43],loop:[31,49]}],bottom:[{center:-90,loop:[-120,-60]},{center:90,loop:[60,120]}],extra:{center:0,end:[-5,5],loop:[-15,15]}},
                necklaceBow:{center:180,end:[172,-172],loop:[160,-160]},
                hair:{pin:[-85,85]},
                wrap:{bow:24,center:0},
                sleeve:{decoration:[]},
                sandal:[10,-10],eye:[-18,18],blush:[-17,17],button:0,sword:75,mouth:216}

            this.color=graphics.combatant[20].color

            this.parts={eyeLevel:-72,mouth:-65,blush:-68.5,
                under:{top:-51,bottom:-31,bow:{top:[-1.8,-1.8],bottom:[-5.8,-5.8],extra:2.5}},
                kimono:{main:-58,bow:-42},
                wrap:{bow:-45.5},
                minor:15,
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

            this.fades={eye:[1,1],mouth:1,
                sandal:{back:[1,1],front:[1,1]},
                hair:{pin:1},
                sleeve:1,sleeveDecoration:1,
                skin:{legs:1,arms:1,body:1,head:1,button:1,blush:1},
                kimono:{main:{back:{x:1,y:1},front:{x:1,y:1}},decoration:{fade:{large:1},position:{large:{x:1,y:1}},size:{large:{x:1,y:1}}},bow:1},
                under:{top:1,bottom:1,shawl:1,bow:{top:[1,1],bottom:[1,1],extra:1},tanga:1,under:{top:1,button:1,bottom:1}},
                wrap:{round:1,bow:1,sleeve:1},
            }

            if(options.alt){
                this.trigger={display:{mouth:true,
                    hair:{back:true,front:true,pin:true,glow:true},eye:[true,true],sleeve:false,sleeveDecoration:false,sandal:{back:[false,false],front:[false,false]},
                    skin:{legs:true,arms:true,body:true,head:true,button:true,blush:true},
                    kimono:{main:{back:false,front:false},decoration:{large:false},bow:false},
                    wrap:{round:false,bow:false,sleeve:false},
                    under:{top:true,bottom:true,shawl:true,bow:{top:[true,true],bottom:[true,true],extra:true},tanga:false,under:{top:true,button:false,bottom:false}},
                }}
            }else{
                this.trigger={display:{mouth:true,
                    hair:{back:true,front:true,pin:true,glow:true},eye:[true,true],sleeve:true,sleeveDecoration:true,sandal:{back:[true,true],front:[true,true]},
                    skin:{legs:true,arms:true,body:true,head:true,button:true,blush:true},
                    kimono:{main:{back:true,front:true},decoration:{large:true},bow:true},
                    wrap:{round:true,bow:true,sleeve:true},
                    under:{top:false,bottom:false,shawl:false,bow:{top:[false,false],bottom:[false,false],extra:false},tanga:false,under:{top:true,button:false,bottom:false}},
                }}
            }

            this.trigger.display.mode={
                kimono:{main:1},
                sandal:{edge:0},
            }

            this.trigger.display.extra={sword:true,damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:1}

            this.goal={anim:{direction:this.anim.direction,sword:true}}

            this.spin.sleeve.decoration.push({spin:0,rotate:random(0,360),part:0,length:0.4,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:120,rotate:random(0,360),part:0,length:0.4,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:240,rotate:random(0,360),part:0,length:0.4,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:60,rotate:random(0,360),part:0,length:0.95,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:180,rotate:random(0,360),part:0,length:0.95,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:300,rotate:random(0,360),part:0,length:0.95,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:0,rotate:random(0,360),part:0,length:1.35,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:120,rotate:random(0,360),part:0,length:1.35,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:240,rotate:random(0,360),part:0,length:1.35,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:60,rotate:random(0,360),part:0,length:1.7,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:180,rotate:random(0,360),part:0,length:1.7,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:300,rotate:random(0,360),part:0,length:1.7,type:floor(random(0,15))})

            this.spin.sleeve.decoration.push({spin:60,rotate:random(0,360),part:1,length:0.4,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:180,rotate:random(0,360),part:1,length:0.4,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:300,rotate:random(0,360),part:1,length:0.4,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:0,rotate:random(0,360),part:1,length:0.95,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:120,rotate:random(0,360),part:1,length:0.95,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:240,rotate:random(0,360),part:1,length:0.95,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:60,rotate:random(0,360),part:1,length:1.35,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:180,rotate:random(0,360),part:1,length:1.35,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:300,rotate:random(0,360),part:1,length:1.35,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:0,rotate:random(0,360),part:1,length:1.7,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:120,rotate:random(0,360),part:1,length:1.7,type:floor(random(0,15))})
            this.spin.sleeve.decoration.push({spin:240,rotate:random(0,360),part:1,length:1.7,type:floor(random(0,15))})

            for(let h=0;h<5;h++){
                for(let g=0,lg=3-h/2;g<lg;g++){
                    if(lg==1){
                        this.spin.under.top[h][1].push(-40)
                        this.spin.under.top[h][1].push(40)
                    }else{
                        this.spin.under.top[h][0].push(-40-(lg-1)*8+g/(ceil(lg-1))*(lg-1)*16)
                        this.spin.under.top[h][1].push(40-(lg-1)*8+g/ceil(lg-1)*(lg-1)*16)
                    }
                }
            }
            for(let g=0;g<12;g++){
                for(let h=0;h<5;h++){
                    this.spin.under.bottom[h].push(g*30+h*18)
                }
            }
        break
        //mark e
        case 'Drunk Boss': case 'Enforcer': case 'Bomber Boy': case 'Chief Engineering Officer': case 'Gangmaster': case 'Paramilitary': case 'Nerfmaster': case 'Big Bounce':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:19,bottom:19}},{top:9,bottom:0,length:{top:19,bottom:19}}],
                arms:[{top:24,bottom:9,length:{top:19,bottom:19}},{top:24,bottom:9,length:{top:19,bottom:19}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-87,mouth:-79,minor:15,
                legs:[{top:{x:4,y:-38},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-38},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:7,y:-67},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:7,y:-67},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Drunk Boss':
                    this.color={skin:{head:[240,220,180],body:[120,60,20],legs:[120,60,20],arms:[120,60,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[90,45,15]
                    this.color.bottle=[60,30,15]
                    this.fades.belt=1
                    this.fades.bottle=1
                    this.trigger.display.belt=true
                    this.trigger.display.bottle=true
                break
                case 'Enforcer':
                    this.color={skin:{head:[240,220,180],body:[125,200,125],legs:[120,200,120],arms:[115,195,115]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.button=[75,150,75]
                    this.color.glasses=[[40,40,40],[255,255,255]]
                    this.fades.button=1
                    this.fades.glasses=1
                    this.trigger.display.button=true
                    this.trigger.display.glasses=true
                break
                case 'Bomber Boy':
                    this.color={skin:{head:[240,220,180],body:[180,60,60],legs:[175,55,55],arms:[170,50,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.helmet=[120,40,40]
                    this.color.logo=[135,45,45]
                    this.color.emblem=[220,220,220]
                    this.fades.helmet=1
                    this.fades.logo=1
                    this.fades.emblem=1
                    this.trigger.display.helmet=true
                    this.trigger.display.logo=true
                    this.trigger.display.emblem=true
                break
                case 'Chief Engineering Officer':
                    this.color={skin:{head:[240,220,180],body:[70,70,70],legs:[60,60,60],arms:[255,200,25]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[20,60,100]
                    this.color.tie=[[160,200,220],[255,150,0]]
                    this.color.coat=[255,225,50]
                    this.color.hat=[255,255,100]
                    this.color.belt=[160,100,20]
                    this.fades.tie=1
                    this.fades.coat=1
                    this.fades.hat=1
                    this.fades.belt=1
                    this.trigger.display.tie=true
                    this.trigger.display.coat=true
                    this.trigger.display.hat=true
                    this.trigger.display.belt=true
                break
                case 'Gangmaster':
                    this.color={skin:{head:[240,220,180],body:[60,20,50],legs:[50,10,40],arms:[50,10,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.tie=[[240,240,240],[40,0,30]]
                    this.color.pocket=[220,220,220]
                    this.color.beard=[60,60,60]
                    this.fades.tie=1
                    this.fades.pocket=1
                    this.fades.beard=1
                    this.trigger.display.tie=true
                    this.trigger.display.pocket=true
                    this.trigger.display.beard=true
                break
                case 'Paramilitary':
                    this.color={skin:{head:[240,220,180],body:[40,40,40],legs:[35,35,35],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[240,240,240]
                    this.color.badge=[40,40,40]
                    this.color.belt=[240,240,240]
                    this.fades.badge=1
                    this.fades.belt=1
                    this.trigger.display.badge=true
                    this.trigger.display.belt=true
                break
                case 'Nerfmaster':
                    this.color={skin:{head:[240,220,180],body:[200,150,150],legs:[190,140,140],arms:[180,130,130]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.arrows=[[200,0,0],[0,150,255],[255,255,50]]
                    this.color.belt=[150,125,125]
                    this.fades.arrows=1
                    this.fades.belt=1
                    this.trigger.display.arrows=true
                    this.trigger.display.belt=true
                break
                case 'Big Bounce':
                    this.color={skin:{head:[240,220,180],body:[200,200,200],legs:[195,195,195],arms:[205,205,205]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[255,50,50]
                    this.color.hat=[180,180,180]
                    this.fades.belt=1
                    this.fades.hat=1
                    this.trigger.display.belt=true
                    this.trigger.display.hat=true
                break
            }
        break
        case 'Pointy': case 'Little Guy': case 'Rich Kid': case 'Latency': case 'Speedrunner':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:12,bottom:0,length:{top:14,bottom:14}},{top:12,bottom:0,length:{top:14,bottom:14}}],
                arms:[{top:27,bottom:12,length:{top:14,bottom:14}},{top:27,bottom:12,length:{top:14,bottom:14}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-69,mouth:-61,minor:15,
                legs:[{top:{x:3.5,y:-31},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-31},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Pointy':
                    this.color={skin:{head:[240,220,150],body:[50,150,200],legs:[50,150,200],arms:[200,50,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[200,50,50]
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Little Guy':
                    this.color={skin:{head:[240,220,150],body:[120,80,40],legs:[110,70,30],arms:[150,200,200]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[150,200,200]
                break
                case 'Rich Kid':
                    this.color={skin:{head:[240,220,180],body:[60,80,120],legs:[55,75,115],arms:[105,145,165]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[100,140,160]
                    this.color.tie=[[180,160,60],[200,255,50]]
                    this.color.chocolate=[80,50,10]
                    this.fades.tie=1
                    this.fades.chocolate=1
                    this.trigger.display.tie=true
                    this.trigger.display.chocolate=true
                    this.anim.eyeStyle=[4,4]
                break
                case 'Latency':
                    this.color={eye:{back:[255,150,150],front:[255,50,50],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                break
                case 'Speedrunner':
                    this.color={skin:{head:[240,220,150],body:[200,180,160],legs:[190,170,150],arms:[230,150,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0],teeth:[[65,65,65],[245,245,245]]}}
                    this.color.skin.upperBody=[240,160,40]
                    this.color.glasses=[[40,40,40],[255,255,255]]
                    this.fades.glasses=1
                    this.trigger.display.glasses=true
                break
            }
        break
        case 'Duck': case 'Fungal Duck': case 'Duckforce': case 'Blue Duck': case 'Void Duck': case 'Golden Duck': case 'Bowler Duck': case 'Ducky Donka': case 'Ducky McDuff': case 'Sick Duck': case 'Zombie Duck': case 'Pistol Duck':
            this.anim={direction:direction,eye:[0,0],legs:[{top:24,length:{top:10}},{top:24,length:{top:10}}],arms:[{top:54,length:{top:10}},{top:54,length:{top:10}}]}
            this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1}}
            this.spin={legs:[{top:90},{top:-90}],arms:[{top:90},{top:-90}],eye:[-18,18]}
            this.parts={eyeLevel:-40,beakLevel:-33,legs:[{top:{x:3,y:-15},middle:{x:0,y:0}},{top:{x:3,y:-15},middle:{x:0,y:0}}],arms:[{top:{x:3.5,y:-25},middle:{x:0,y:0}},{top:{x:3.5,y:-25},middle:{x:0,y:0}}]}
            this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                break
                case 'Fungal Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                    this.color.fungus=[[200,160,120],[180,170,160]]
                    this.fades.fungus=1
                    this.trigger.display.fungus=true
                break
                case 'Duckforce':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[66,22,22],legs:[72,24,24],arms:[78,26,26]}}
                    this.color.helmet=[60,20,20]
                    this.fades.helmet=1
                    this.trigger.display.helmet=true
                break
                case 'Blue Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[90,0,255],body:[75,0,215],legs:[60,0,175],arms:[65,0,180]}}
                break
                case 'Void Duck':
                    this.color={eye:{back:[240,120,240]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[50,0,50],body:[40,0,40],legs:[30,0,30],arms:[35,0,35]}}
                    this.color.outline=[160,40,200]
                    this.fades.outline=1
                    this.trigger.display.outline=true
                break
                case 'Golden Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,235,160],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,215,85],body:[255,205,75],legs:[255,190,60],arms:[255,195,65]}}
                    this.color.shine=[255,245,145]
                    this.fades.shine=1
                    this.trigger.display.shine=true
                break
                case 'Bowler Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                    this.color.hat=[30,30,35]
                    this.fades.hat=1
                    this.trigger.display.hat=true  
                break
                case 'Ducky Donka':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,195,25],body:[255,185,15],legs:[255,170,0],arms:[255,175,5]}}
                    this.color.hat=[160,100,20]
                    this.color.bowtie=[120,30,180]
                    this.fades.hat=1
                    this.fades.bowtie=1
                    this.trigger.display.hat=true
                    this.trigger.display.bowtie=true
                break
                case 'Ducky McDuff':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,65],body:[255,225,55],legs:[255,210,40],arms:[255,215,45]}}
                    this.color.hat=[120,30,180]
                    this.color.bowtie=[160,100,20]
                    this.fades.hat=1
                    this.fades.bowtie=1
                    this.trigger.display.hat=true
                    this.trigger.display.bowtie=true
                break
                case 'Sick Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,255,25],body:[225,255,15],legs:[210,255,0],arms:[215,255,5]}}
                break
                case 'Zombie Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[205,160,25],body:[205,150,15],legs:[205,135,0],arms:[205,150,5]}}
                    this.anim.eye[1]=1
                break
                case 'Pistol Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                    this.color.hat=[210,155,60]
                    this.fades.hat=1
                    this.trigger.display.hat=true
                break
            }
        break
        case 'Big Duck': case 'Agent Duck': case 'General Duckion':
            this.anim={direction:direction,eye:[0,0],legs:[{top:24,length:{top:15}},{top:24,length:{top:15}}],arms:[{top:54,length:{top:15}},{top:54,length:{top:15}}]}
            this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1}}
            this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
            this.parts={eyeLevel:-56,beakLevel:-49,legs:[{top:{x:5,y:-21},middle:{x:0,y:0}},{top:{x:5,y:-21},middle:{x:0,y:0}}],arms:[{top:{x:4,y:-36},middle:{x:0,y:0}},{top:{x:4,y:-36},middle:{x:0,y:0}}]}
            this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Big Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                break
                case 'Agent Duck':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[60,60,60],legs:[255,210,0],arms:[255,215,5]}}
                    this.color.tie=[[240,240,240],[100,150,255]]
                    this.color.hat=[40,40,40]
                    this.color.sunglasses=[0,0,0]
                    this.fades.tie=1
                    this.fades.hat=1
                    this.fades.sunglasses=1
                    this.trigger.display.tie=true
                    this.trigger.display.hat=true
                    this.trigger.display.sunglasses=true
                break
                case 'General Duckion':
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[66,22,22],legs:[72,24,24],arms:[78,26,26]}}
                    this.color.helmet=[60,20,20]
                    this.color.badge=[[200,200,200],[255,255,150]]
                    this.fades.helmet=1
                    this.fades.badge=1
                    this.trigger.display.helmet=true
                    this.trigger.display.badge=true
                break
            }
        break
        case 'Monkey': case 'Monkey Gangster': case 'AllyMonkey':
            this.anim={direction:direction,head:direction,mouth:{x:12,y:8,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:9,bottom:9}},{top:9,bottom:0,length:{top:9,bottom:9}}],
                arms:[{top:24,bottom:9,length:{top:9,bottom:9}},{top:24,bottom:9,length:{top:9,bottom:9}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-60,mouth:-48,minor:20,
                legs:[{top:{x:4,y:-18},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-18},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:8,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:8,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Monkey':
                    this.color={skin:{head:[190,95,0],body:[170,85,0],legs:[160,80,0],arms:[160,80,0]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                break
                case 'Monkey Gangster':
                    this.color={skin:{head:[190,95,0],body:[225,225,225],legs:[220,220,220],arms:[215,215,215]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.tie=[[250,250,250],[100,200,200]]
                    this.color.hat=[210,210,210]
                    this.fades.tie=1
                    this.fades.hat=1
                    this.trigger.display.tie=true
                    this.trigger.display.hat=true
                break
                case 'AllyMonkey':
                    this.color={skin:{head:[190,155,0],body:[170,145,0],legs:[160,140,0],arms:[160,140,0]},eye:{back:[0,50,0],front:[0,25,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.spin.eye=[-27,27]
                    this.parts.eyeLevel+=3
                    this.trigger.display.sprig=true
                break
            }
        break
        case 'Orb Walker':
            this.anim={direction:direction,legs:[{top:39,length:{top:36}},{top:39,length:{top:36}},{top:39,length:{top:36}},{top:39,length:{top:36}}]}
            this.fades={body:1,cover:1,legs:1}
            this.spin={legs:[{top:-45},{top:-135},{top:135},{top:45}]}
            this.color={body:[[30,120,110],[30,210,200]],cover:[200,180,120],outer:[130,110,75]}
            this.parts={legs:[{top:{x:0,y:-30},middle:{x:0,y:0}},{top:{x:0,y:-30},middle:{x:0,y:0}},{top:{x:0,y:-30},middle:{x:0,y:0}},{top:{x:0,y:-30},middle:{x:0,y:0}}]}
            this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{body:true,cover:true,legs:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Modicum':
            this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:6}},{top:54,length:{top:6}}]}
            this.fades={eye:[1,1],skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
            this.parts={eyeLevel:-18,arms:[{top:{x:14,y:-14},middle:{x:0,y:0}},{top:{x:14,y:-14},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={eye:{back:[0,0,0]},skin:{body:[240,240,220],arms:[235,235,215]}}
        break
        case 'Slime': case 'Spike Slime': case 'Slimoid': case 'Rainbow Slime':
            this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:10}},{top:54,length:{top:10}}]}
            this.fades={eye:[1,1],skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
            this.parts={eyeLevel:-30,arms:[{top:{x:30,y:-20},middle:{x:0,y:0}},{top:{x:30,y:-20},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Slime':
                    this.color={eye:{back:[0,0,0]},skin:{body:[150,255,50],arms:[140,245,40]}}
                break
                case 'Spike Slime':
                    this.color={eye:{back:[0,0,0]},skin:{body:[150,100,50],arms:[145,95,45]}}
                break
                case 'Slimoid':
                    this.color={eye:{back:[0,0,0]},skin:{body:[240,240,220],arms:[235,235,215]}}
                break
                case 'Rainbow Slime':
                    this.color={eye:{back:[0,0,0]},skin:{body:[[225,25,25],[225,125,25],[225,225,25],[25,225,25],[25,125,255],[125,25,255]],arms:[[215,15,15],[215,115,15],[215,215,15],[15,215,15],[15,115,245],[115,15,245]]}}
                break
            }
        break
        case 'Big Slime': case 'Big Spike Slime': case 'Big Slimoid': case 'Big Rainbow Slime':
            this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:15}},{top:54,length:{top:15}}]}
            this.fades={eye:[1,1],skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
            this.parts={eyeLevel:-45,arms:[{top:{x:45,y:-30},middle:{x:0,y:0}},{top:{x:45,y:-30},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Big Slime':
                    this.color={eye:{back:[0,0,0]},skin:{body:[150,255,50],arms:[140,245,40]}}
                break
                case 'Big Spike Slime':
                    this.color={eye:{back:[0,0,0]},skin:{body:[150,100,50],arms:[145,95,45]}}
                break
                case 'Big Slimoid':
                    this.color={eye:{back:[0,0,0]},skin:{body:[240,240,220],arms:[235,235,215]}}
                break
                case 'Big Rainbow Slime':
                    this.color={eye:{back:[0,0,0]},skin:{body:[[225,25,25],[225,125,25],[225,225,25],[25,225,25],[25,125,255],[125,25,255]],arms:[[215,15,15],[215,115,15],[215,215,15],[15,215,15],[15,115,245],[115,15,245]]}}
                break
            }
        break
        case 'Slime Boss':
            this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:22.5}},{top:54,length:{top:22.5}}]}
            this.fades={eye:[1,1],skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
            this.parts={eyeLevel:-67.5,arms:[{top:{x:67.5,y:-45},middle:{x:0,y:0}},{top:{x:67.5,y:-45},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={eye:{back:[0,0,0]},skin:{body:[150,255,50],arms:[140,245,40]}}
        break
        case 'Spheron':
            this.anim={direction:direction}
            this.fades={body:1,balls:1}
            this.color={body:[225,220,200],balls:[220,215,195],highlight:[235,120,110]}
            this.trigger={display:{body:true,balls:true}}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Rock Golem': case 'Shield Particle': case 'Lead Brick':
            this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:36}},{top:54,length:{top:36}}]}
            this.fades={eye:[1,1],skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-36,36]}
            this.parts={eyeLevel:-46,arms:[{top:{x:0,y:-48},middle:{x:0,y:0}},{top:{x:0,y:-48},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Rock Golem':
                    this.color={eye:{back:[32,30,28]},skin:{body:[80,75,70]}}
                break
                case 'Shield Particle':
                    this.color={eye:{back:[90,10,60]},skin:{body:[180,20,120]}}
                break
                case 'Lead Brick':
                    this.color={eye:{back:[20,20,20]},skin:{body:[100,100,100],mortar:[50,50,50]}}
                break
            }
        break
        case 'Goblin': case 'Sneaky Gremlin': case 'Fat Gremlin': case 'Angry Gremlin': case 'Gremlin': case 'Elf Archer':
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            switch(this.name){
                case 'Goblin':
                    this.color={skin:{head:[150,200,50],body:[100,150,50],legs:[95,145,45],arms:[90,140,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.trigger.display.ear=true
                    this.anim={direction:direction,head:direction,thick:4,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                        legs:[{top:9,bottom:0,length:{top:9,bottom:9}},{top:9,bottom:0,length:{top:9,bottom:9}}],
                        arms:[{top:24,bottom:9,length:{top:9,bottom:9}},{top:24,bottom:9,length:{top:9,bottom:9}}]}
                    this.parts={eyeLevel:-44,mouth:-36,minor:12,
                        legs:[{top:{x:3.5,y:-18},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-18},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                        arms:[{top:{x:4,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                break
                case 'Sneaky Gremlin':
                    this.color={skin:{head:[175,75,125],body:[150,50,100],legs:[145,45,95],arms:[140,40,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.trigger.display.ear=true
                    this.anim={direction:direction,head:direction,thick:3,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                        legs:[{top:9,bottom:0,length:{top:10,bottom:10}},{top:9,bottom:0,length:{top:10,bottom:10}}],
                        arms:[{top:24,bottom:9,length:{top:10,bottom:10}},{top:24,bottom:9,length:{top:10,bottom:10}}]}
                    this.parts={eyeLevel:-52,mouth:-44,minor:12,
                        legs:[{top:{x:3,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                        arms:[{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                break
                case 'Fat Gremlin':
                    this.color={skin:{head:[175,100,75],body:[150,75,50],legs:[145,70,45],arms:[140,65,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.trigger.display.ear=true
                    this.anim={direction:direction,head:direction,thick:5,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                        legs:[{top:9,bottom:0,length:{top:7,bottom:7}},{top:9,bottom:0,length:{top:7,bottom:7}}],
                        arms:[{top:24,bottom:9,length:{top:7,bottom:7}},{top:24,bottom:9,length:{top:7,bottom:7}}]}
                    this.parts={eyeLevel:-46,mouth:-38,minor:15,
                        legs:[{top:{x:5,y:-14},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:5,y:-14},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                        arms:[{top:{x:6,y:-24},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:6,y:-24},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                break
                case 'Angry Gremlin':
                    this.color={skin:{head:[175,50,50],body:[150,25,25],legs:[145,20,20],arms:[140,15,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.trigger.display.ear=true
                    this.anim={direction:direction,head:direction,thick:4,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                        legs:[{top:9,bottom:0,length:{top:14,bottom:14}},{top:9,bottom:0,length:{top:14,bottom:14}}],
                        arms:[{top:24,bottom:9,length:{top:14,bottom:14}},{top:24,bottom:9,length:{top:14,bottom:14}}]}
                    this.parts={eyeLevel:-64,mouth:-56,minor:12,
                        legs:[{top:{x:3,y:-28},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-28},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                        arms:[{top:{x:4,y:-48},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-48},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                break
                case 'Gremlin':
                    this.color={skin:{head:[50,200,150],body:[50,150,100],legs:[45,145,95],arms:[40,140,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.trigger.display.ear=true
                    this.anim={direction:direction,head:direction,thick:3,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                        legs:[{top:9,bottom:0,length:{top:10,bottom:10}},{top:9,bottom:0,length:{top:10,bottom:10}}],
                        arms:[{top:24,bottom:9,length:{top:10,bottom:10}},{top:24,bottom:9,length:{top:10,bottom:10}}]}
                    this.parts={eyeLevel:-58,mouth:-50,minor:13.5,
                        legs:[{top:{x:3,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                        arms:[{top:{x:3.5,y:-40},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-40},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                break
                case 'Elf Archer':
                    this.color={skin:{head:[255,225,220],body:[160,220,230],legs:[255,225,220],arms:[255,220,215]},eye:{back:[115,55,45],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[155,170,110]
                    this.color.hair=[150,70,60]
                    this.color.waistband=[220,225,235]
                    this.color.bows=[100,90,90]
                    this.color.belt=[55,50,60]
                    this.fades.hair=1
                    this.fades.waistband=1
                    this.fades.bows=1
                    this.fades.belt=1
                    this.trigger.display.hair=true
                    this.trigger.display.waistband=true
                    this.trigger.display.bows=true
                    this.trigger.display.belt=true
                    this.trigger.display.ear=true
                    this.anim={direction:direction,head:direction,thick:4,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                        legs:[{top:9,bottom:0,length:{top:14,bottom:14}},{top:9,bottom:0,length:{top:14,bottom:14}}],
                        arms:[{top:24,bottom:9,length:{top:14,bottom:14}},{top:24,bottom:9,length:{top:14,bottom:14}}]}
                    this.parts={eyeLevel:-62.5,mouth:-54.5,minor:13.5,
                        legs:[{top:{x:3.5,y:-28},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-28},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                        arms:[{top:{x:4,y:-44},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-44},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                break
            }
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Fat Scrapper': case 'Lalex':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:13,bottom:13}},{top:9,bottom:0,length:{top:13,bottom:13}}],
                arms:[{top:24,bottom:9,length:{top:13,bottom:13}},{top:24,bottom:9,length:{top:13,bottom:13}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-63,mouth:-55,minor:15,
                legs:[{top:{x:7.5,y:-26},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:7.5,y:-26},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:16,y:-41},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:16,y:-41},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Fat Scrapper':
                    this.color={skin:{head:[240,220,180],body:[120,120,120],legs:[115,115,115],arms:[110,110,110]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[[100,100,100],[60,60,60],[80,80,80]]
                    this.color.goggles=[200,200,200]
                    this.fades.belt=1
                    this.fades.goggles=0.6
                    this.trigger.display.belt=true
                    this.trigger.display.goggles=true
                break
                case 'Lalex':
                    this.color={skin:{head:[240,220,180],body:[120,120,130],legs:[115,115,125],arms:[45,195,45]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[50,200,50]
                    this.color.logo=[240,240,240]
                    this.fades.logo=1
                    this.trigger.display.logo=true
                break
            }
        break
        case 'Donu': case 'Deca':
            this.anim={direction:direction,
                legs:[{top:9,bottom:0,length:{top:10,bottom:10}},{top:9,bottom:0,length:{top:10,bottom:10}}],
                arms:[{top:24,bottom:9,length:{top:10,bottom:10}},{top:24,bottom:9,length:{top:10,bottom:10}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]}
            this.parts={
                legs:[{top:{x:5,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:5,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:30,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:30,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={skin:{legs:1,arms:1,body:1}}
            this.trigger={display:{skin:{legs:true,arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Donu':
                    this.color={skin:{body:[[135,175,130],[80,110,85]],legs:[90,125,95],arms:[90,125,95]}}
                break
                case 'Deca':
                    this.color={skin:{body:[[250,235,155],[235,140,70],[235,180,100],[185,115,70]],legs:[235,170,100],arms:[235,170,100]}}
                break
            }
        break
        case 'Flame':
            this.anim={direction:direction,glow:1}
            this.color=[150,255,50]
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Hexaghost Orb':
            this.anim={direction:direction,glow:1}
            this.color=[150,255,50]
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Hexaghost Core':
            this.anim={direction:direction,glow:1}
            this.color={glow:[[130,55,110],[150,70,130],[170,85,150],[190,100,170],[210,115,190],[230,130,210]],base:[[225,220,185],[245,240,205]]}
            this.fades={glow:1,base:1}
            this.trigger={display:{glow:true,base:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Bronze Automaton':
            this.anim={direction:direction,
                legs:[{top:9,bottom:0,length:{top:15,bottom:15}},{top:9,bottom:0,length:{top:15,bottom:15}}],
                arms:[{top:24,bottom:9,length:{top:15,bottom:15}},{top:24,bottom:9,length:{top:15,bottom:15}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]}
            this.parts={
                legs:[{top:{x:9,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:9,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:12,y:-72},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:12,y:-72},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.color={skin:{legs:[100,70,30],arms:[100,70,30]},gear:[80,50,10],main:[[120,90,50],[180,150,130]],diamond:[[200,150,100],[250,200,150]]}
            this.fades={skin:{legs:1,arms:1},gear:1,main:1,diamond:1}
            this.trigger={display:{skin:{legs:true,arms:true},gear:true,main:true,diamond:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Bronze Orb C': case 'Bronze Orb A':
            this.anim={direction:direction}
            this.color={gear:[80,50,10],main:[[120,90,50],[180,150,130]],diamond:[[200,150,100],[250,200,150]]}
            this.fades={gear:1,main:1,diamond:1}
            this.trigger={display:{gear:true,main:true,diamond:true}}
            this.calc={int:[0,0,0,0]}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Management Robot': case 'Management Prototype': case 'Destructor Bot': case 'Purge X02': case 'Carbonado Robot': case 'Management Robot Commander': case 'Lockdown': case 'Rocket Launcher Management Robot': case 'Shotgun Management Robot': case 'Rammer Robot': case 'Management Experimental Robot':
            this.anim={direction:direction,head:direction,eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18]}
            this.parts={eyeLevel:-78,minor:15,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:7.5,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:7.5,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Management Prototype':
                    this.color={skin:{in:[80,120,120],out:[60,100,100],limb:[55,95,95]},eye:{back:[200,50,200],front:[225,75,225],glow:[150,150,255]}}
                break
                case 'Destructor Bot':
                    this.color={skin:{in:[160,120,120],out:[140,100,100],limb:[135,95,95]},eye:{back:[200,50,200],front:[225,75,225],glow:[150,150,255]}}
                    this.color.bomb=[125,25,0]
                    this.fades.bomb=1
                    this.trigger.display.bomb=true
                break
                case 'Purge X02':
                    this.color={skin:{in:[20,25,30],out:[30,35,40],limb:[25,30,35]},eye:{back:[150,25,25],front:[200,50,50],glow:[255,150,150]}}
                    this.color.hat=[80,60,80]
                    this.fades.hat=1
                    this.trigger.display.hat=true
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Carbonado Robot':
                    this.color={skin:{in:[200,210,220],out:[180,190,200],limb:[175,185,195]},eye:{back:[200,200,50],front:[175,175,25],glow:[255,255,100]}}
                    this.color.light=[255,255,200]
                    this.fades.light=1
                    this.trigger.display.light=true
                break
                case 'Management Robot Commander':
                    this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
                    this.color.badge=[[50,200,200],[75,225,225]]
                    this.fades.badge=1
                    this.trigger.display.badge=true
                break
                case 'Lockdown':
                    this.color={skin:{in:[240,240,40],out:[200,200,40],limb:[180,180,40]},eye:{back:[50,50,100],front:[75,75,125],glow:[150,150,255]}}
                    this.color.skin.bar=[[220,220,40],[170,170,40]]
                break
                case 'Rocket Launcher Management Robot':
                    this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
                    this.color.armor=[120,120,40]
                    this.fades.armor=1
                    this.trigger.display.armor=true
                break
                case 'Shotgun Management Robot':
                    this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
                    this.color.panel=[120,40,120]
                    this.fades.panel=1
                    this.trigger.display.panel=true
                break
                case 'Rammer Robot':
                    this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
                    this.color.hex=[[60,60,60],[100,175,225]]
                    this.fades.hex=1
                    this.trigger.display.hex=true
                break
                case 'Management Experimental Robot':
                    this.color={skin:{in:[120,120,140],out:[100,100,120],limb:[95,95,115]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
                    this.color.visor=[200,200,255]
                    this.fades.visor=1
                    this.trigger.display.visor=true
                break
                default:
                    this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
                break
            }
        break
        case 'Sentry':
            this.anim={direction:direction}
            this.color={leg:[100,100,100],body:[140,140,140],turret:[180,180,180]}
            this.graphics={arms:[{bottom:{x:0,y:-20}},{bottom:{x:0,y:-20}}]}
            this.fades={leg:1,body:1,turret:1}
            this.trigger={display:{leg:true,body:true,turret:true}}
            this.calc={int:[0,0,0,0]}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Flying Rock':
            this.anim={direction:direction,head:direction,eye:[0],eyeStyle:0}
            this.spin={eye:[0]}
            this.parts={eyeLevel:-46,minor:12}
            this.color={body:[80,75,70],eye:{back:[32,30,28],front:[48,45,42],glow:[240,225,210]}}
            this.fades={body:1,eye:[1]}
            this.trigger={display:{body:true,eye:[true]}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Repulsor':
            this.anim={direction:direction,body:direction}
            this.fades={skin:{body:1}}
            this.trigger={display:{skin:{body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{body:[[150,200,100],[100,150,75],[50,150,0],[100,175,50],[200,255,200],[175,200,150],[175,225,125]]}}
        break
        case 'Management Autoduck':
            this.anim={direction:direction,eye:[0,0],legs:[{top:24,length:{top:10}},{top:24,length:{top:10}}],arms:[{top:54,length:{top:10}},{top:54,length:{top:10}}]}
            this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1}}
            this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
            this.parts={eyeLevel:-40,beakLevel:-31,legs:[{top:{x:3,y:-15},middle:{x:0,y:0}},{top:{x:3,y:-15},middle:{x:0,y:0}}],arms:[{top:{x:3.5,y:-25},middle:{x:0,y:0}},{top:{x:3.5,y:-25},middle:{x:0,y:0}}]}
            this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
        break
        case 'Bush Thing': case 'Puffball': case 'Graphite Block':
            this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:15}},{top:54,length:{top:15}}]}
            this.fades={eye:[1,1],skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
            this.parts={eyeLevel:-24,arms:[{top:{x:15,y:-21},middle:{x:0,y:0}},{top:{x:15,y:-21},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Bush Thing':
                    this.color={eye:{back:[255,0,0]},skin:{body:[40,120,40],arms:[30,90,30]}}
                break
                case 'Puffball':
                    this.color={eye:{back:[75,125,150]},skin:{body:[160,200,220],arms:[120,160,180]}}
                break
                case 'Graphite Block':
                    this.color={eye:{back:[150,150,150]},skin:[[35,35,35],[48,48,48],[61,61,61],[74,74,74],[87,87,87],[100,100,100]]}
                break
            }
        break
        case 'Fireball':
            this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:10}},{top:54,length:{top:10}}]}
            this.fades={eye:[1,1],skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
            this.parts={eyeLevel:-24,arms:[{top:{x:12,y:-21},middle:{x:0,y:0}},{top:{x:12,y:-21},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={eye:{back:[50,0,0]},skin:{body:[240,140,40],arms:[235,135,35]}}
        break
        case 'Dead Shell':
            this.anim={direction:direction,head:direction,mouth:{x:30,y:18,open:1}}
            this.spin={legs:[-120,-60,60,120],mouth:180}
            this.parts={mouth:-21,minor:30}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,body:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{body:[175,180,120],legs:[210,120,95]},mouth:{in:[90,40,75],out:[0,0,0]}}
        break
        case 'Management Drone':
            this.anim={direction:direction,head:direction,eye:[0,0],eyeStyle:[0,0]}
            this.spin={eye:[-18,18]}
            this.parts={eyeLevel:-63,minor:22}
            this.fades={eye:[1,1],skin:{body:1}}
            this.trigger={display:{eye:[true,true],skin:{body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
        break
        case 'Personnel Carrier':
            this.anim={direction:direction}
            this.fades={wheel:1,body:1,window:1}
            this.trigger={display:{wheel:true,body:true,window:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[120,120,120],out:[100,100,100],window:[75,75,225]}
        break
        case 'Executive':
            this.anim={direction:direction,head:direction,mouth:{x:11,y:7,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-84,mouth:-73,minor:21,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{head:[240,220,180],body:[20,60,80],legs:[15,55,75],arms:[215,215,215]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
            this.color.skin.upperBody=[220,220,220]
            this.color.tie=[[80,100,160]]
            this.fades.tie=1
            this.trigger.display.tie=true
        break
        case 'Mechanized':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-84,mouth:-76,minor:15,
                legs:[{top:{x:4.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:12,y:-66},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:12,y:-66},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95],head:[240,220,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
        break
        case 'Louse':
            this.anim={direction:direction}
            this.fades={antenna:1,body:1}
            this.trigger={display:{antenna:true,body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={antenna:[225,120,100],body:[[145,170,85],[215,230,5]]}
        break
        case 'Fungling':
            this.anim={direction:direction,head:direction,eye:[1,1],eyeStyle:[1,1],arms:[{top:54,length:{top:14}},{top:54,length:{top:14}}],mouth:{x:8,y:5,open:0}}
            this.fades={eye:[1,1],mouth:1,skin:{arms:1,body:1,tumor:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-33,33],mouth:216}
            this.parts={eyeLevel:-24,mouth:-15,minor:18,arms:[{top:{x:12,y:-21},middle:{x:0,y:0}},{top:{x:12,y:-21},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],mouth:true,skin:{arms:true,body:true,tumor:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},skin:{body:[165,160,150],arms:[125,130,125],tumor:[50,70,80]}}
        break
        case 'Hwurmp': case 'Antihwurmp':
            this.fades={eye:[1,1],mouth:1,body:1}
            this.parts={eyeLevel:-27}
            this.trigger={display:{eye:[true,true],mouth:true,body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.color={eye:{back:[205,135,55]},mouth:[255,155,65],body:[255,205,65]}
            switch(this.name){
                case 'Hwurmp':
                    this.anim={direction:direction,eye:[0,0],body:1}
                    this.spin={eye:[-24,24]}
                break
                case 'Antihwurmp':
                    this.anim={direction:direction,eye:[0,0],body:2}
                    this.spin={eye:[-36,36]}
                break
            }
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Bee':
            this.anim={direction:direction,arms:[{top:54,length:{top:3}},{top:54,length:{top:3}}]}
            this.fades={skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}]}
            this.parts={arms:[{top:{x:3,y:-18},middle:{x:0,y:0}},{top:{x:3,y:-18},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{body:[250,200,50],arms:[20,20,20]}}
        break
        case 'Pixie':
            this.anim={direction:direction,arms:[{top:54,length:{top:4}},{top:54,length:{top:4}}]}
            this.fades={skin:{arms:1,body:1},glow:1}
            this.spin={arms:[{top:-90},{top:90}]}
            this.parts={arms:[{top:{x:4,y:-23},middle:{x:0,y:0}},{top:{x:4,y:-23},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{skin:{arms:true,body:true},glow:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{body:[100,200,230],arms:[150,200,230]},glow:[200,230,255]}
        break
        case 'Glimmerrer':
            this.anim={direction:direction,eye:[0,0]}
            this.spin={eye:[-12,12]}
            this.fades={crystal:1,body:1,eye:[1,1]}
            this.parts={eyeLevel:-10}
            this.trigger={display:{crystal:true,body:true,eye:[true,true]}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={crystal:[[180,125,205],[240,170,225],[250,190,240]],body:[[20,25,50],[30,50,70]],eye:{back:[235,105,65]}}
        break
        case 'Host': case 'Host Drone':
            this.anim={direction:direction,body:0}
            this.fades={body:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={body:[190,235,255]}
        break
        case 'Darkblot':
            this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:12}},{top:54,length:{top:12}}]}
            this.fades={eye:[1,1],skin:{arms:1,body:1}}
            this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
            this.parts={eyeLevel:-6,arms:[{top:{x:12,y:-12},middle:{x:0,y:0}},{top:{x:12,y:-12},middle:{x:0,y:0}}]}
            this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={eye:{back:[120,240,60]},skin:{body:[40,60,40],arms:[30,45,30]}}
            this.progress=0
        break
        case 'Managerial':
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:20,bottom:20}},{top:9,bottom:0,length:{top:20,bottom:20}}],
                arms:[{top:24,bottom:9,length:{top:20,bottom:20}},{top:24,bottom:9,length:{top:20,bottom:20}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216,sword:0}
            this.color={skin:{head:[240,220,180],body:[10,10,10],legs:[15,15,15],arms:[15,15,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
            this.parts={eyeLevel:-81,mouth:-73,minor:15,
                legs:[{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-64},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-64},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},helmet:1,visor:1,belt:1,badge:1}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},extra:{damage:false}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction,sword:false}}
        break
        case 'Thornvine':
            this.anim={direction:direction,glow:1}
            this.fades={body:1}
            this.trigger={display:{body:true}}
            this.color=[[25,150,25],[200,200,200]]
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Fat Duck':
            this.anim={direction:direction,eye:[0,0],legs:[{top:24,length:{top:14}},{top:24,length:{top:14}}],arms:[{top:54,length:{top:20}},{top:54,length:{top:20}}]}
            this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1}}
            this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
            this.parts={eyeLevel:-40,beakLevel:-33,legs:[{top:{x:3,y:-18},middle:{x:0,y:0}},{top:{x:3,y:-18},middle:{x:0,y:0}}],arms:[{top:{x:3.5,y:-27},middle:{x:0,y:0}},{top:{x:3.5,y:-27},middle:{x:0,y:0}}]}
            this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
            this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
        break
        case 'Wall': case 'Exploding Wall':
            this.anim={direction:direction}
            this.fades={body:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Wall':
                    this.color={in:[120,120,120],out:[100,100,100]}
                break
                case 'Exploding Wall':
                    this.color={in:[120,120,120],out:[100,100,100],bomb:[[180,180,180],[180,0,0]]}
                break
            }
        break
        case 'Spike Pillar':
            this.anim={direction:direction}
            this.fades={body:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[200,195,190],out:[160,155,150]}
        break
        case 'Projector':
            this.anim={direction:direction,light:1}
            this.fades={body:1,light:1}
            this.trigger={display:{body:true,light:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[120,120,120],out:[100,100,100],light:[100,200,255]}
        break
        case 'Turret': case 'Explosive Turret': case 'Multiturret': case 'Repulse Turret': case 'Machine Gun': case 'Armored Turret': case 'Shotgun':
            this.anim={direction:direction}
            this.fades={base:1,body:1,dot:1}
            this.graphics={arms:[{bottom:{x:0,y:-25}},{bottom:{x:0,y:-25}}]}
            this.trigger={display:{base:true,body:true,dot:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Turret':
                    this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,0,200],out:[0,0,240]},dot:{in:[125,125,125],out:[105,105,105]}}
                break
                case 'Explosive Turret':
                    this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[200,0,0],out:[240,0,0]},dot:{in:[125,125,125],out:[105,105,105]}}
                break
                case 'Multiturret':
                    this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,200,200],out:[0,240,240]},dot:{in:[125,125,125],out:[105,105,105]}}
                break
                case 'Repulse Turret':
                    this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[200,0,200],out:[240,0,240]},dot:{in:[125,125,125],out:[105,105,105]}}
                break
                case 'Machine Gun':
                    this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,200,0],out:[0,240,0]},dot:{in:[125,125,125],out:[105,105,105]}}
                break
                case 'Armored Turret':
                    this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[150,150,0],out:[180,180,0]},dot:{in:[125,125,125],out:[105,105,105]}}
                break
                case 'Shotgun':
                    this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[200,100,0],out:[240,120,0]},dot:{in:[125,125,125],out:[105,105,105]}}
                break
            }
        break
        case 'Readout':
            this.anim={direction:direction,light:1}
            this.fades={body:1,light:1,glow:1}
            this.trigger={display:{body:true,light:true,glow:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[120,120,120],out:[100,100,100],light:[100,200,255],glow:[255,255,255]}
        break
        case 'Strengthener':
            this.anim={direction:direction,light:1}
            this.fades={body:1,light:1}
            this.trigger={display:{body:true,light:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[120,120,120],out:[100,100,100],light:[255,100,100]}
        break
        case 'Barbed Pillar':
            this.anim={direction:direction}
            this.fades={body:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[220,200,180],out:[180,160,140]}
        break
        case 'Gun Rack':
            this.anim={direction:direction,light:1}
            this.fades={body:1,gun:1}
            this.trigger={display:{body:true,gun:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[120,120,120],out:[100,100,100],gun:[40,40,40]}
        break
        case 'Miniturret':
            this.anim={direction:direction}
            this.fades={base:1,body:1,dot:1}
            this.graphics={arms:[{bottom:{x:0,y:-15}},{bottom:{x:0,y:-15}}]}
            this.trigger={display:{base:true,body:true,dot:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,0,200],out:[0,0,240]},dot:{in:[125,125,125],out:[105,105,105]}}
        break
        case 'Metal Box':
            this.anim={direction:direction,light:1}
            this.fades={body:1,metal:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[120,120,120],out:[100,100,100],metal:[140,120,160]}
        break
        case 'Upgrader': case 'Transformer': case 'Doubler': case 'Exhauster':
            this.anim={direction:direction,light:1}
            this.fades={body:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Upgrader':
                    this.color={in:[120,120,120],out:[100,100,100],lightIn:[200,225,255],lightOut:[150,200,255]}
                break
                case 'Transformer':
                    this.color={in:[120,120,120],out:[100,100,100],lightIn:[255,255,150],lightOut:[255,255,100]}
                break
                case 'Doubler':
                    this.color={in:[120,120,120],out:[100,100,100],lightIn:[255,100,255],lightOut:[255,25,255]}
                break
                case 'Exhauster':
                    this.color={in:[120,120,120],out:[100,100,100],lightIn:[100,255,255],lightOut:[25,255,255]}
                break
            }
        break
        case 'Teleporter Start': case 'Teleporter End':
            this.anim={direction:direction}
            this.fades={body:1,metal:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Teleporter Start':
                    this.color={in:[120,120,120],out:[100,100,100],light:[50,200,50]}
                break
                case 'Teleporter End':
                    this.color={in:[120,120,120],out:[100,100,100],light:[200,50,50]}
                break
            }
        break
        case 'Antizone':
            this.anim={direction:direction}
            this.fades={body:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[100,255,255]}
        break
        case 'Mirror Shield':
            this.anim={direction:direction}
            this.fades={body:1}
            this.trigger={display:{body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={in:[120,120,120],out:[100,100,100],shieldIn:[200,220,240],shieldOut:[160,180,200]}
        break
        case 'Keystone':
            this.anim={direction:direction,spin:0}
            this.fades={body:1,rope:1,paper:1}
            this.color={body:[75,70,80],rope:[165,105,45],paper:[220,220,220]}
            this.trigger={display:{body:true,rope:true,paper:true}}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Daughter of Heaven':
            this.anim={direction:direction,head:direction,sword:1,mouth:{x:8,y:4,open:0},
                eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                legs:[
                    {top:9,bottom:0,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
                    {top:9,bottom:0,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
                ],arms:[
                    {top:24,bottom:9,length:{top:17,bottom:17}},
                    {top:24,bottom:9,length:{top:17,bottom:17}}
                ]}

            this.hair={
                main:[
                    {spin:[-30,0,-15],height:1},
                    {spin:[-60,-24,-48],height:6},
                    {spin:[-90,-54,-78],height:13},
                    {spin:[-120,-84,-108],height:18},
                    {spin:[-150,-114,-138],height:21},
                    {spin:[-180,-144,-168],height:22},
                    {spin:[0,30,15],height:1},
                    {spin:[24,60,48],height:6},
                    {spin:[54,90,78],height:13},
                    {spin:[84,120,108],height:18},
                    {spin:[114,150,138],height:21},
                    {spin:[144,180,168],height:22},
                ],inside:[
                    {spin:[-75,-39,-63],height:5},
                    {spin:[-105,-69,-93],height:11},
                    {spin:[-135,-99,-123],height:15},
                    {spin:[-165,-129,-153],height:17},
                    {spin:[39,75,63],height:5},
                    {spin:[69,105,93],height:11},
                    {spin:[99,135,123],height:15},
                    {spin:[129,165,153],height:17},
                    {spin:[162,-162,180],height:18},
                ],
            }

            this.spin={
                legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                eye:[-18,18],sword:75,mouth:216}

            this.color={
                hair:{back:[73,79,123],front:[78,112,165],insideBack:[69,70,109],insideFront:[103,121,167],glow:[132,167,205]},
                skin:{head:[246,227,216],body:[223,184,182],legs:[242,215,204],arms:[241,222,214]},
                eye:{back:[238,156,143],front:[80,32,28],glow:[253,253,255]},
                mouth:{in:[225,125,125],out:[0,0,0]},
            }

            this.parts={eyeLevel:-78,mouth:-71,
                minor:15,
                legs:[
                    {top:{x:3,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:3.5,y:-59},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:3.5,y:-59},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],}

            this.graphics={
                legs:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                ],arms:[
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                    {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                ]}

            this.fades={flower:[1,1,1],eye:[1,1],mouth:1,
                skin:{legs:1,arms:1,body:1,head:1},
            }

            this.trigger={display:{band:[true,true],mouth:true,
                hair:{back:true,front:true,glow:true},eye:[true,true],
                skin:{legs:true,arms:true,body:true,head:true,button:false},
                dress:true,hat:true
            }}

            this.trigger.display.extra={sword:true,damage:false}

            this.calc={int:[0,0,0,0]}

            this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

            this.animSet={loop:0,flip:0,hand:0,foot:0}

            this.goal={anim:{direction:this.anim.direction,sword:true}}
        break
        case 'Spirit of Wealth': case 'Spirit of Elegance':
            this.anim={direction:direction}
            this.fades={body:1}
            this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Spirit of Wealth':
                    this.color=[[255,245,125],[255,255,235]]
                break
                case 'Spirit of Elegance':
                    this.color=[[255,125,125],[255,235,235]]
                break
            }
        break
        case 'Thoughtless':
            this.anim={direction:direction,head:direction,
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]}
            this.parts={
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{skin:{legs:true,arms:true,body:true,head:true},muscles:true}}
            this.trigger.display.extra={damage:false}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={skin:{head:[[40,40,40],[240,240,240]],body:[50,50,50],legs:[40,40,40],arms:[45,45,45]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
        break
        case 'Half Spikeball':
            this.fades={eye:[1,1],body:1}
            this.parts={eyeLevel:-27}
            this.trigger={display:{eye:[true,true],body:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.color={eye:{back:[0,0,0]},body:[[40,40,40],[255,100,255],[100,255,255]]}
            this.anim={direction:direction,eye:[0,0],body:[1,1]}
            this.spin={eye:[-24,24]}
            this.goal={anim:{direction:this.anim.direction}}
        break
        case 'Swarm Turret':
            this.anim={direction:direction}
            this.fades={base:1,body:1,dot:1}
            this.graphics={arms:[{bottom:{x:0,y:-15}},{bottom:{x:0,y:-15}}]}
            this.trigger={display:{base:true,body:true,dot:true}}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0}
            this.goal={anim:{direction:this.anim.direction}}
            this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,100,200],out:[0,120,240]},dot:{in:[125,125,125],out:[105,105,105]}}
        break
        //mark n
        default:
            this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
            this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
            this.parts={eyeLevel:-78,mouth:-70,minor:15,
                legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
            this.graphics={
                legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
            this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
            this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
            this.trigger.display.extra={damage:false}
            this.calc={int:[0,0,0,0]}
            this.animSet={loop:0,flip:0,hand:0,foot:0}
            this.goal={anim:{direction:this.anim.direction}}
            switch(this.name){
                case 'Bouncer':
                    this.color={skin:{head:[240,220,180],body:[200,200,200],legs:[195,195,195],arms:[205,205,205]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[255,50,50]
                    this.fades.belt=1
                    this.trigger.display.belt=true
                break
                case 'Thug':
                    this.color={skin:{head:[160,60,60],body:[150,50,50],legs:[145,45,45],arms:[155,55,55]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[240,220,180]
                break
                case 'Biker':
                    this.color={skin:{head:[240,220,180],body:[225,25,25],legs:[220,20,20],arms:[230,30,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.hat=[200,0,0]
                    this.color.goggles=[255,255,255]
                    this.fades.hat=1
                    this.fades.goggles=0.6
                    this.trigger.display.hat=true
                    this.trigger.display.goggles=true
                break
                case 'Drunk':
                    this.color={skin:{head:[240,220,180],body:[120,60,20],legs:[120,60,20],arms:[120,60,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[90,45,15]
                    this.color.bottle=[60,30,15]
                    this.fades.belt=1
                    this.fades.bottle=1
                    this.trigger.display.belt=true
                    this.trigger.display.bottle=true
                break
                case 'Trenchcoat': case 'Trenchcoat Gunner':
                    this.color={skin:{head:[240,220,180],body:[25,25,25],legs:[20,20,20],arms:[120,100,60]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.tie=[[240,240,240],[200,50,50]]
                    this.color.coat=[115,95,55]
                    this.color.hat=[10,10,10]
                    this.fades.tie=1
                    this.fades.coat=1
                    this.fades.hat=1
                    this.trigger.display.tie=true
                    this.trigger.display.coat=true
                    this.trigger.display.hat=true
                break
                case 'Goon':
                    this.color={skin:{head:[160,60,60],body:[150,50,50],legs:[145,45,45],arms:[155,55,55]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[240,220,180]
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Slaver':
                    this.color={skin:{head:[240,220,180],body:[50,125,150],legs:[40,115,140],arms:[35,110,135]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Romeo':
                    this.color={skin:{head:[240,220,180],body:[50,150,200],legs:[50,150,200],arms:[200,50,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[200,50,50]
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Billy Beatup':
                    this.color={skin:{head:[240,220,180],body:[60,80,100],legs:[60,80,100],arms:[240,220,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[160,160,160]
                    this.color.logo=[150,50,50]
                    this.color.band=[100,75,75]
                    this.fades.logo=1
                    this.fades.band=1
                    this.trigger.display.logo=true
                    this.trigger.display.band=true
                break
                case 'Cartel':
                    this.color={skin:{head:[240,220,180],body:[200,160,80],legs:[190,150,70],arms:[195,155,75]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.neck=[150,75,75]
                    this.color.bandana=[200,100,100]
                    this.color.sunglasses=[0,0,0]
                    this.fades.neck=1
                    this.fades.bandana=1
                    this.fades.sunglasses=1
                    this.trigger.display.neck=true
                    this.trigger.display.bandana=true
                    this.trigger.display.sunglasses=true
                break
                case 'Gangster': case 'Gangster Gunner':
                    this.color={skin:{head:[240,220,180],body:[240,240,240],legs:[75,55,75],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.overall=[80,60,80]
                    this.color.hat=[70,50,70]
                    this.fades.overall=1
                    this.fades.hat=1
                    this.trigger.display.overall=true
                    this.trigger.display.hat=true
                break
                case 'Ninja':
                    this.color={skin:{head:[130,205,130],body:[125,200,125],legs:[120,200,120],arms:[115,195,115]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[240,220,180]
                    this.color.belt=[75,150,75]
                    this.fades.belt=1
                    this.trigger.display.belt=true
                break
                case 'Red':
                    this.color={skin:{head:[240,220,180],body:[120,110,100],legs:[115,105,95],arms:[110,100,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[80,70,60]
                    this.color.hat=[[60,50,40],[200,25,25],[255,225,25],[200,25,25]]
                    this.fades.belt=1
                    this.fades.hat=1
                    this.trigger.display.belt=true
                    this.trigger.display.hat=true
                break
                case 'Batter':
                    this.color={skin:{head:[240,220,180],body:[240,240,240],legs:[75,55,75],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.overall=[80,60,80]
                    this.color.hat=[70,50,70]
                    this.fades.overall=1
                    this.fades.hat=1
                    this.trigger.display.overall=true
                    this.trigger.display.hat=true
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Slippery Gangster':
                    this.color={skin:{head:[240,220,180],body:[80,60,80],legs:[75,55,75],arms:[70,50,70]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.sunglasses=[0,0,0]
                    this.fades.sunglasses=1
                    this.trigger.display.sunglasses=true
                break
                case 'Moss Creature':
                    this.color={skin:{head:[45,85,45],body:[40,80,40],legs:[35,75,35],arms:[35,75,35]},eye:{back:[200,150,0],front:[225,150,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[0,0,0]
                    this.fades.eyeHole=1
                    this.trigger.display.eyeHole=true
                break
                case 'Roger Reviv':
                    this.color={skin:{head:[240,220,180],body:[80,160,200],legs:[70,150,190],arms:[75,155,195]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.neck=[75,75,150]
                    this.color.bandana=[100,100,200]
                    this.color.sunglasses=[0,0,0]
                    this.color.headset=[100,100,100]
                    this.fades.neck=1
                    this.fades.bandana=1
                    this.fades.sunglasses=1
                    this.fades.headset=1
                    this.trigger.display.neck=true
                    this.trigger.display.bandana=true
                    this.trigger.display.sunglasses=true
                    this.trigger.display.headset=true
                break
                case 'Sharpshot':
                    this.color={skin:{head:[240,220,180],body:[180,180,180],legs:[170,170,170],arms:[175,175,175]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.hat=[230,160,40]
                    this.color.belt=[[120,80,40],[60,40,20]]
                    this.fades.hat=1
                    this.fades.belt=1
                    this.trigger.display.hat=true
                    this.trigger.display.belt=true
                break
                case 'Slow King':
                    this.size=1.2
                    this.color={skin:{head:[20,75,20],body:[25,25,25],legs:[20,20,20],arms:[15,15,15]},eye:{back:[160,0,100],front:[180,20,120],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.cape=[5,5,5]
                    this.color.shield=[180,20,120]
                    this.fades.cape=1
                    this.fades.shield=0
                    this.trigger.display.cape=true
                    this.trigger.display.tumor=true
                    this.trigger.display.shield=true
                break
                case 'Nerfer':
                    this.color={skin:{head:[240,220,180],body:[200,150,150],legs:[190,140,140],arms:[180,130,130]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.arrows=[[200,0,0],[0,150,255],[255,255,50]]
                    this.fades.arrows=1
                    this.trigger.display.arrows=true
                break
                case 'Buffer':
                    this.color={skin:{head:[240,220,180],body:[150,200,200],legs:[140,190,190],arms:[130,180,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.arrows=[[200,0,0],[0,150,255],[255,255,50]]
                    this.fades.arrows=1
                    this.trigger.display.arrows=true
                break
                case 'Scrapper':
                    this.color={skin:{head:[240,220,180],body:[120,120,120],legs:[115,115,115],arms:[110,110,110]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[[100,100,100],[60,60,60],[80,80,80]]
                    this.color.goggles=[200,200,200]
                    this.fades.belt=1
                    this.fades.goggles=0.6
                    this.trigger.display.belt=true
                    this.trigger.display.goggles=true
                break
                case 'Looter':
                    this.color={skin:{head:[240,220,180],body:[40,60,80],legs:[50,75,100],arms:[50,75,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.bandana=[[200,100,50],[160,80,40]]
                    this.fades.bandana=1
                    this.trigger.display.bandana=1
                break
                case 'Mugger':
                    this.color={skin:{head:[30,35,40],body:[80,60,40],legs:[100,75,50],arms:[100,75,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[240,220,180]
                break
                case 'Capitalist':
                    this.color={skin:{head:[240,220,180],body:[20,20,20],legs:[15,15,15],arms:[15,15,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.tie=[[200,200,200],[200,100,50]]
                    this.color.hat=[40,40,40]
                    this.fades.tie=1
                    this.fades.hat=1
                    this.trigger.display.tie=true
                    this.trigger.display.hat=true
                break
                case 'Bodyguard':
                    this.color={skin:{head:[240,220,180],body:[20,20,20],legs:[15,15,15],arms:[15,15,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.tie=[[200,200,200],[200,100,50]]
                    this.color.sunglasses=[0,0,0]
                    this.fades.tie=1
                    this.fades.sunglasses=1
                    this.trigger.display.tie=true
                    this.trigger.display.sunglasses=true
                break
                case 'Management Soldier':
                    this.color={skin:{head:[240,220,180],body:[95,105,110],legs:[65,85,85],arms:[85,135,195]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[30,25,0]
                    this.color.helmet=[80,85,90]
                    this.color.visor=[65,130,140]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Management Officer':
                    this.color={skin:{head:[240,220,180],body:[100,100,100],legs:[95,95,95],arms:[95,95,95]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[60,60,60]
                    this.color.badge=[[50,50,200],[75,75,225]]
                    this.color.glasses=[[40,40,40],[255,255,255]]
                    this.fades.belt=1
                    this.fades.badge=1
                    this.fades.glasses=1
                    this.trigger.display.belt=true
                    this.trigger.display.badge=true
                    this.trigger.display.glasses=true
                break
                case 'Management Special Forces':
                    this.color={skin:{head:[240,220,180],body:[85,90,90],legs:[75,80,80],arms:[80,85,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[80,75,50]
                    this.color.helmet=[50,55,60]
                    this.color.visor=[100,150,200]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Deployer':
                    this.color={skin:{head:[240,220,180],body:[10,50,10],legs:[15,55,15],arms:[20,60,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[50,45,50]
                    this.color.glasses=[[60,60,60],[200,200,200]]
                    this.fades.belt=1
                    this.fades.glasses=1
                    this.trigger.display.belt=true
                    this.trigger.display.glasses=true
                break
                case 'Chief Deployer':
                    this.color={skin:{head:[240,220,180],body:[20,30,40],legs:[25,35,45],arms:[30,40,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[60,70,80]
                    this.color.glasses=[[60,60,60],[255,150,150]]
                    this.fades.belt=1
                    this.fades.glasses=1
                    this.trigger.display.belt=true
                    this.trigger.display.glasses=true
                break
                case 'Lunar Dust':
                    this.color={skin:{head:[180,125,255],body:[150,95,225],legs:[145,90,220],arms:[145,90,220]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.outline=[30,15,35]
                    this.fades.outline=1
                    this.trigger.display.outline=true
                    this.size=0.8
                break
                case 'Lunar Shard':
                    this.color={skin:{head:[50,25,55],body:[35,20,40],legs:[30,15,35],arms:[30,15,35]},eye:{back:[225,75,225],front:[255,90,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.moon=[[255,255,255],[255,235,235]]
                    this.color.band=[255,120,255]
                    this.fades.moon=1
                    this.fades.band=1
                    this.trigger.display.moon=true
                    this.trigger.display.band=true
                break
                case 'Solar Shard':
                    this.color={skin:{head:[80,55,85],body:[65,50,70],legs:[60,45,65],arms:[60,45,65]},eye:{back:[225,135,225],front:[255,150,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.sun=[255,145,70]
                    this.color.band=[255,180,255]
                    this.fades.sun=1
                    this.fades.band=1
                    this.trigger.display.sun=true
                    this.trigger.display.band=true
                    this.size=1.1
                break
                case 'Management Sniper':
                    this.color={skin:{head:[240,220,180],body:[125,140,135],legs:[95,115,115],arms:[115,225,165]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[30,25,0]
                    this.color.helmet=[80,90,95]
                    this.color.visor=[240,230,65]
                    this.color.monocle=[150,255,150]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.fades.monocle=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                    this.trigger.display.monocle=true
                break
                case 'Management Caller':
                    this.color={skin:{head:[240,220,180],body:[200,200,200],legs:[195,195,195],arms:[195,195,195]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[160,160,160]
                    this.color.badge=[[200,200,50],[225,225,75]]
                    this.color.glasses=[[40,40,40],[255,255,255]]
                    this.fades.belt=1
                    this.fades.badge=1
                    this.fades.glasses=1
                    this.trigger.display.belt=true
                    this.trigger.display.badge=true
                    this.trigger.display.glasses=true
                break
                case 'Management Custodian':
                    this.color={skin:{head:[240,220,180],body:[160,160,160],legs:[85,85,65],arms:[195,135,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[120,120,120]
                    this.color.hat=[220,220,60]
                    this.fades.belt=1
                    this.fades.hat=1
                    this.trigger.display.belt=true
                    this.trigger.display.hat=true
                break
                case 'Walker Driver':
                    this.color={skin:{head:[240,220,180],body:[185,180,165],legs:[180,175,160],arms:[180,175,160]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[30,25,0]
                    this.color.helmet=[120,135,95]
                    this.color.visor=[10,10,10]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Prisoner':
                    this.color={skin:{head:[240,220,180],body:[225,155,25],legs:[220,150,20],arms:[215,145,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[230,230,230]
                    this.fades.belt=1
                    this.trigger.display.belt=true
                break
                case 'Prison Guard':
                    this.color={skin:{head:[240,220,180],body:[175,100,0],legs:[170,95,0],arms:[165,90,0]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[[70,70,70],[60,60,60]]
                    this.color.armor=[80,80,80]
                    this.color.helmet=[100,100,100]
                    this.color.visor=[200,200,200]
                    this.fades.belt=1
                    this.fades.armor=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.belt=true
                    this.trigger.display.armor=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Lightspeed':
                    this.color={skin:{head:[40,80,120],body:[20,40,60],legs:[15,35,55],arms:[15,35,55]},eye:{back:[100,200,255],front:[150,225,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.wing=[200,255,255]
                    this.fades.wing=1
                    this.trigger.display.wing=true
                break
                case 'Swordmaster':
                    this.color={skin:{head:[240,220,180],body:[50,100,75],legs:[40,80,60],arms:[40,80,60]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.helmet=[60,120,90]
                    this.color.belt=[70,140,105]
                    this.fades.helmet=1
                    this.fades.belt=1
                    this.trigger.display.helmet=true
                    this.trigger.display.belt=true
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Gas Man':
                    this.color={skin:{head:[240,220,180],body:[160,140,120],legs:[150,130,110],arms:[145,125,105]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[120,100,80]
                    this.color.helmet=[80,40,40]
                    this.color.visor=[200,50,50]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.can=true
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Champion':
                    this.color={skin:{head:[200,200,200],body:[160,160,160],legs:[150,150,150],arms:[140,140,140]},eye:{back:[255,255,255],front:[255,255,255],glow:[0,0,0]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.anim.eye=[1,1]
                    this.anim.eyeStyle=[3,3]
                    this.color.hat=[180,180,180]
                    this.color.band=[240,240,240]
                    this.fades.hat=1
                    this.fades.band=1
                    this.trigger.display.hat=true
                    this.trigger.display.band=true
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Ninja Master':
                    this.color={skin:{head:[50,125,50],body:[45,120,45],legs:[40,120,40],arms:[35,115,35]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[240,220,180]
                    this.color.belt=[[240,240,240],[0,0,0]]
                    this.fades.belt=1
                    this.trigger.display.belt=true
                break
                case 'Intern':
                    this.size=0.7
                    this.color={skin:{head:[240,220,180],body:[80,60,40],legs:[70,50,30],arms:[170,200,230]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[180,210,240]
                    this.color.glasses=[[120,120,120],[220,220,220]]
                    this.fades.glasses=1
                    this.trigger.display.glasses=true
                break
                case 'Assistant Hiring Officer':
                    this.color={skin:{head:[240,220,180],body:[180,150,120],legs:[170,140,110],arms:[50,70,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[40,60,80]
                    this.color.tie=[[180,200,220],[255,225,50]]
                    this.fades.tie=1
                    this.trigger.display.clipboard=true
                    this.trigger.display.tie=true
                break
                case 'Gangster Machinegunner':
                    this.color={skin:{head:[240,220,180],body:[240,240,240],legs:[75,55,75],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.overall=[80,60,80]
                    this.color.hat=[70,50,70]
                    this.color.sunglasses=[60,50,40]
                    this.fades.overall=1
                    this.fades.hat=1
                    this.fades.sunglasses=1
                    this.trigger.display.overall=true
                    this.trigger.display.hat=true
                    this.trigger.display.sunglasses=true
                break
                case 'Bolt':
                    this.color={skin:{head:[200,255,255],body:[175,255,255],legs:[125,255,255],arms:[150,255,255]},eye:{back:[255,255,255],front:[255,255,255],glow:[0,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.size=0.8
                    this.color.shock=[100,255,255]
                    this.trigger.display.shock=true
                    this.shocks=[]
                break
                case 'Jet':
                    this.color={skin:{head:[240,220,180],body:[240,240,200],legs:[220,220,180],arms:[230,230,190]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[120,70,20]
                    this.color.goggles=[50,150,200]
                    this.color.pack=[[160,160,160]]
                    this.fades.belt=1
                    this.fades.goggles=0.4
                    this.fades.pack=1
                    this.trigger.display.belt=true
                    this.trigger.display.goggles=true
                    this.trigger.display.pack=true
                    this.offset.position.y-=10
                break
                case 'Armored Ninja':
                    this.color={skin:{head:[30,75,30],body:[25,70,25],legs:[20,65,20],arms:[15,60,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[240,220,180]
                    this.color.belt=[0,40,0]
                    this.color.helmet=[40,100,40]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                break
                case 'Assistant Fitness Officer':
                    this.color={skin:{head:[240,220,180],body:[120,140,160],legs:[110,130,150],arms:[20,40,60]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[15,35,55]
                    this.color.tie=[[235,210,160],[200,125,50]]
                    this.fades.tie=1
                    this.trigger.display.tie=true
                    this.trigger.display.muscles=true
                    this.size=0.75
                break
                case 'Corrupt Detective':
                    this.color={skin:{head:[240,220,180],body:[60,60,55],legs:[55,55,50],arms:[115,105,95]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[110,115,100]
                    this.color.tie=[[190,190,180],[110,110,110]]
                    this.color.coat=[120,110,100]
                    this.color.hat=[[85,80,70],[170,160,150]]
                    this.fades.tie=1
                    this.fades.coat=1
                    this.fades.hat=1
                    this.trigger.display.tie=true
                    this.trigger.display.coat=true
                    this.trigger.display.hat=true
                break
                case 'Riot Police':
                    this.color={skin:{head:[240,220,180],body:[50,50,60],legs:[40,40,50],arms:[45,45,55]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[20,60,120]
                    this.color.helmet=[40,50,80]
                    this.color.visor=[240,150,60]
                    this.color.shield=[[20,20,30],[50,150,255]]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.fades.shield=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                    this.trigger.display.shield=true
                break
                case 'Reichswehr':
                    this.color={skin:{head:[240,220,180],body:[80,100,80],legs:[70,90,70],arms:[75,95,75]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.pocket=[60,80,60]
                    this.color.helmet=[[30,30,30],[240,240,240]]
                    this.fades.pocket=1
                    this.fades.helmet=1
                    this.trigger.display.pocket=true
                    this.trigger.display.helmet=true
                break
                case 'Beekeeper':
                    this.color={skin:{head:[240,220,180],body:[200,160,20],legs:[180,140,0],arms:[190,150,10]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.helmet=[[200,200,0],[180,180,160]]
                    this.color.belt=[120,120,40]
                    this.fades.helmet=1
                    this.fades.belt=1
                    this.trigger.display.helmet=true
                    this.trigger.display.belt=true
                break
                case 'PhD':
                    this.color={skin:{head:[240,220,180],body:[80,60,40],legs:[70,50,30],arms:[110,140,170]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[120,150,180]
                    this.color.glasses=[[40,40,40],[160,200,240]]
                    this.color.button=[120,120,60]
                    this.color.coat=[190,200,190]
                    this.fades.glasses=1
                    this.fades.button=1
                    this.fades.coat=1
                    this.trigger.display.glasses=true
                    this.trigger.display.button=true
                    this.trigger.display.coat=true
                break
                case 'Prestige':
                    this.color={skin:{head:[80,90,100],body:[60,70,80],legs:[50,60,70],arms:[70,80,90]},eye:{back:[255,255],front:[255,255,255],glow:[0,0,0]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.hex=[255,255,255]
                    this.fades.hex=1
                    this.trigger.display.hex=true
                break
                case 'Junkie':
                    this.color={skin:{head:[240,220,180],body:[90,60,30],legs:[120,80,40],arms:[120,80,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.coat=[150,100,50]
                    this.color.hat=[170,170,170]
                    this.fades.coat=1
                    this.fades.hat=1
                    this.trigger.display.coat=true
                    this.trigger.display.hat=true
                break
                case 'Coffee Commander':
                    this.color={skin:{head:[240,220,180],body:[40,40,40],legs:[30,30,30],arms:[30,30,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.helmet=[40,40,40]
                    this.color.visor=[255,125,50]
                    this.color.tie=[[200,200,200],[0,0,0]]
                    this.color.belt=[180,180,180]
                    this.color.badge=[240,240,240]
                    this.color.band=[160,80,0]
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.fades.tie=1
                    this.fades.belt=1
                    this.fades.badge=1
                    this.fades.band=1
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                    this.trigger.display.tie=true
                    this.trigger.display.belt=true
                    this.trigger.display.badge=true
                    this.trigger.display.band=true
                break
                case 'Comrade':
                    this.color={skin:{head:[240,220,180],body:[120,110,100],legs:[115,105,95],arms:[110,100,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[80,70,60]
                    this.color.hat=[[60,50,40],[200,25,25],[255,225,25],[200,25,25]]
                    this.color.moustache=[120,120,120]
                    this.color.badge=[[255,175,0],[255,225,0]]
                    this.fades.belt=1
                    this.fades.hat=1
                    this.fades.moustache=1
                    this.fades.badge=1
                    this.trigger.display.belt=true
                    this.trigger.display.hat=true
                    this.trigger.display.moustache=true
                    this.trigger.display.badge=true
                break
                case 'Councilman':
                    this.color={skin:{head:[140,125,120],body:[35,40,45],legs:[25,30,35],arms:[30,35,40]},eye:{back:[255,250,220]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.halo=[250,240,230]
                    this.color.wing=[250,235,210]
                    this.fades.halo=1
                    this.fades.wing-1
                    this.trigger.display.halo=true
                    this.trigger.display.wing-true
                    this.size=1.2
                break
                case 'Shadow Trooper':
                    this.color={skin:{head:[0,0,0],body:[0,0,0],legs:[0,0,0],arms:[0,0,0]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.fades.skin.head=0.2
                    this.fades.skin.body=0.2
                    this.fades.skin.legs=0.2
                    this.fades.skin.arms=0.2
                    this.trigger.display.mouth=false
                break
                case 'Dark Priest':
                    this.color={skin:{head:[200,210,210],body:[180,190,190],legs:[70,65,30],arms:[160,170,170]},eye:{back:[255,225,150],front:[255,250,215],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[0,0,0]
                    this.color.band=[195,185,145]
                    this.fades.eyeHole=1
                    this.fades.band=1
                    this.trigger.display.eyeHole=true
                    this.trigger.display.band=true
                break
                case 'Soul':
                    this.color={skin:{head:[255,255,255],body:[255,255,255],legs:[255,255,255],arms:[255,255,255]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.fades.skin.head=0.5
                    this.fades.skin.body=0.4
                    this.fades.skin.legs=0.3
                    this.fades.skin.arms=0.3
                break
                case 'Glitch':
                    this.colorChances=[[200,0,255],[0,100,200],[0,150,255],[255,150,50],[255,75,255],[50,255,50],[125,255,125],[255,255,100],[180,180,180],[255,100,100]]
                    this.color={skin:{head:this.colorChances[floor(random(0,this.colorChances.length))],body:this.colorChances[floor(random(0,this.colorChances.length))],legs:[this.colorChances[floor(random(0,this.colorChances.length))],this.colorChances[floor(random(0,this.colorChances.length))]],arms:[this.colorChances[floor(random(0,this.colorChances.length))],this.colorChances[floor(random(0,this.colorChances.length))]]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[255,255,255]}}
                    this.size=0.8
                break
                case 'Glitched Giant':
                    this.colorChances=[[200,0,255],[0,100,200],[0,150,255],[255,150,50],[255,75,255],[50,255,50],[125,255,125],[255,255,100],[180,180,180],[255,100,100]]
                    this.color={skin:{head:this.colorChances[floor(random(0,this.colorChances.length))],body:this.colorChances[floor(random(0,this.colorChances.length))],legs:[this.colorChances[floor(random(0,this.colorChances.length))],this.colorChances[floor(random(0,this.colorChances.length))]],arms:[this.colorChances[floor(random(0,this.colorChances.length))],this.colorChances[floor(random(0,this.colorChances.length))]]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[255,255,255]}}
                    this.color.armor=[195,115,35]
                    this.color.belt=[225,145,65]
                    this.fades.armor=1
                    this.fades.belt=1
                    this.trigger.display.armor=true
                    this.trigger.display.belt=true
                break
                case 'Nil':
                    this.color={skin:{head:[75,75,85],body:[20,20,25],legs:[10,10,15],arms:[10,10,15]},eye:{back:[255,255,255],front:[255,255,255],glow:[100,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.cape=[[170,230,235],[250,250,250]]
                    this.fades.cape=1
                    this.trigger.display.cape=true
                    this.trigger.display.mouth=false
                break
                case 'Rewriter':
                    this.color={skin:{head:[220,220,225],body:[80,90,110],legs:[70,80,100],arms:[70,80,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.bowtie=[[150,160,180],[10,25,40]]
                    this.color.goggles=[[245,245,250],[30,30,40]]
                    this.color.hat=[170,170,175]
                    this.fades.bowtie=1
                    this.fades.goggles=1
                    this.fades.hat=1
                    this.trigger.display.bowtie=true
                    this.trigger.display.goggles=true
                    this.trigger.display.hat=true
                break
                case 'Buried':
                    this.color={skin:{head:[120,150,250],body:[110,70,60],legs:[100,60,50],arms:[110,140,240]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.bone=[220,220,220]
                    this.fades.bone=1
                    this.trigger.display.bone=true
                break
                case 'Wiz':
                    this.color={skin:{head:[240,220,180],body:[80,40,100],legs:[70,30,90],arms:[70,30,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[180,180,180]
                    this.color.hat=[60,20,80]
                    this.color.moustache=[90,90,90]
                    this.fades.belt=1
                    this.fades.hat=1
                    this.fades.moustache=1
                    this.trigger.display.belt=true
                    this.trigger.display.hat=true
                    this.trigger.display.moustache=true
                break
                case 'Rusty':
                    this.color={skin:{head:[132,72,40],body:[126,68,38],legs:[120,65,36],arms:[120,65,36]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.bar=[96,51,28]
                    this.color.rust=[[140,78,43],[150,86,47]]
                    this.fades.bar=1
                    this.fades.rust=1
                    this.trigger.display.bar=true
                    this.trigger.display.rust=true
                break
                case 'Tech Support':
                    this.color={skin:{head:[240,220,180],body:[30,30,30],legs:[20,20,20],arms:[20,20,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.sunglasses=[0,0,0]
                    this.color.headset=[80,80,80]
                    this.color.hat=[40,40,40]
                    this.color.logo=[150,150,150]
                    this.fades.sunglasses=1
                    this.fades.headset=1
                    this.fades.hat=1
                    this.fades.logo=1
                    this.trigger.display.sunglasses=true
                    this.trigger.display.headset=true
                    this.trigger.display.hat=true
                    this.trigger.display.logo=true
                break
                case 'Vengeful':
                    this.color={skin:{head:[30,35,45],body:[30,50,125],legs:[20,40,115],arms:[20,40,115]},eye:{back:[0,125,255],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.hat=[[145,150,235],[20,25,50]]
                    this.fades.hat=1
                    this.trigger.display.hat=true
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Lunaria':
                    this.color={skin:{head:[150,120,200],body:[50,20,55],legs:[40,10,45],arms:[40,10,45]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.halo=[255,245,200]
                    this.color.stars=[255,255,235]
                    this.fades.halo=1
                    this.fades.stars=1
                    this.trigger.display.halo=true
                    this.trigger.display.stars=true
                    this.color.under={under:{top:[70,40,75]}}
                    this.spin.under={under:{top:[-40,40]}}
                    this.fades.under={under:{top:1}}
                    this.trigger.display.under={under:{top:true}}
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Divine Guard':
                    this.color={skin:{head:[195,195,150],body:[140,140,130],legs:[130,130,120],arms:[130,130,120]},eye:{back:[255,255,220],front:[255,255,220],glow:[255,255,255]},mouth:{in:[200,100,100],out:[255,255,220]}}
                    this.color.sphere=[255,150,150]
                    this.color.band=[150,150,140]
                    this.color.hat=[175,175,160]
                    this.fades.sphere=1
                    this.fades.band=1
                    this.fades.hat=1
                    this.trigger.display.sphere=1
                    this.trigger.display.band=1
                    this.trigger.display.hat=1
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Avant Guard':
                    this.color={skin:{head:[25,30,35],body:[20,25,25],legs:[15,20,20],arms:[15,20,20]},eye:{back:[175,170,190],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.wing=[210,215,225]
                    this.color.band=[245,195,150]
                    this.color.helmet=[30,33,366]
                    this.fades.wing=1
                    this.fades.band=1
                    this.fades.helmet=1
                    this.trigger.display.wing=true
                    this.trigger.display.band=true
                    this.trigger.display.helmet=true
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Medic':
                    this.color={skin:{head:[240,220,180],body:[175,175,175],legs:[170,170,170],arms:[180,180,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.logo=[255,50,50]
                    this.color.mask=[150,200,200]
                    this.fades.logo=1
                    this.fades.mask=1
                    this.trigger.display.logo=true
                    this.trigger.display.mask=true
                    this.anim.eyeStyle=[4,4]
                break
                case 'Smith':
                    this.color={skin:{head:[240,220,180],body:[75,85,95],legs:[70,80,90],arms:[80,90,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[75,25,0]
                    this.color.apron=[220,220,220]
                    this.color.hammer=[100,90,80]
                    this.fades.belt=1
                    this.fades.apron=1
                    this.fades.hammer=1
                    this.trigger.display.belt=true
                    this.trigger.display.apron=true
                    this.trigger.display.hammer=true
                    this.anim.eyeStyle=[4,4]
                break
                case 'Navigator':
                    this.color={skin:{head:[240,220,180],body:[80,70,60],legs:[75,65,55],arms:[85,75,65]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.goggles=[[50,76,80],[120,100,0]]
                    this.color.midshirt=[180,190,200]
                    this.fades.goggles=1
                    this.fades.midshirt=1
                    this.trigger.display.goggles=true
                    this.trigger.display.clipboard=true
                    this.trigger.display.midshirt=true
                    this.anim.eyeStyle=[4,4]
                break
                case 'MobMan':
                    this.color={skin:{head:[240,220,180],body:[160,160,160],legs:[150,150,150],arms:[145,145,145]},eye:{back:[100,100,100],front:[80,80,80],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.spin.eye=[-30,30]
                    this.anim.mouth={x:9,y:1,open:0}
                    this.parts.mouth-=2
                    this.spin.mouth=186
                    this.color.tie=[[170,170,170],[60,60,60]]
                    this.fades.tie=1
                    this.trigger.display.tie=true
                break
                case 'NumberDummy':
                    this.color={skin:{head:[240,220,180],body:[70,80,90],legs:[60,70,80],arms:[65,75,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.logo=[255,255,0]
                    this.fades.logo=1
                    this.trigger.display.logo=true
                break
                case 'AttackDummy':
                    this.color={skin:{head:[240,220,180],body:[70,80,90],legs:[60,70,80],arms:[65,75,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.logo=[255,0,0]
                    this.fades.logo=1
                    this.trigger.display.logo=true
                break
                case 'BlockDummy':
                    this.color={skin:{head:[240,220,180],body:[70,80,90],legs:[60,70,80],arms:[65,75,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.logo=[0,0,255]
                    this.fades.logo=1
                    this.trigger.display.logo=true
                break
                case 'MoveDummy':
                    this.color={skin:{head:[240,220,180],body:[70,80,90],legs:[60,70,80],arms:[65,75,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.logo=[255,0,255]
                    this.fades.logo=1
                    this.trigger.display.logo=true
                break
                case '💀':
                    this.color={skin:{head:[230,230,210],body:[220,220,200],legs:[210,210,190],arms:[205,205,185]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[0,0,0],out:[0,0,0]}}
                    this.anim.eyeStyle=[5,5]
                    this.parts.legs[0].top.x=3
                    this.parts.legs[1].top.x=3
                    this.parts.arms[0].top.x=3.5
                    this.parts.arms[1].top.x=3.5
                    this.size=0.9
                break
                case 'L':
                    this.color={skin:{head:[240,220,180],body:[0,100,0],legs:[0,40,0],arms:[180,180,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.tie=[0,80,0]
                    this.color.coat=[210,210,210]
                    this.fades.tie=1
                    this.fades.coat=1
                    this.trigger.display.tie=true
                    this.trigger.display.coat=true
                    this.size=0.95
                break
                case 'Inconsistent':
                    this.color={eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                break
                case 'Unknown':
                    this.color={skin:{head:[200,200,200],body:[190,190,190],legs:[180,180,180],arms:[185,185,185]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                break
                case 'Jester':
                    this.color={skin:{head:[240,220,180],body:[0,50,100],legs:[0,45,90],arms:[240,245,250]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[225,0,0]
                    this.color.hat=[[225,0,0],[150,0,0],[200,160,0]]
                    this.fades.hat=1
                    this.trigger.display.hat=true
                break
                case 'Man':
                    this.color={skin:{head:[240,220,180],body:[160,160,160],legs:[150,150,150],arms:[145,145,145]},eye:{back:[100,100,100],front:[80,80,80],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                break
                case 'Normal1':
                    this.color={skin:{head:[65,160,65],body:[150,75,0],legs:[140,70,0],arms:[45,140,45]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[55,150,55]
                    this.size=0.8
                break
                case 'Boss1':
                    this.color={skin:{head:[75,150,75],body:[55,55,55],legs:[45,45,45],arms:[55,130,55]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[65,140,65]
                    this.size=1.05
                    this.color.band=[50,50,50]
                    this.fades.band=1
                    this.trigger.display.band=true
                break
                case 'Danger':
                    this.color={skin:{head:[200,225,215],body:[200,225,215],legs:[200,225,215],arms:[200,225,215]},eye:{back:[120,130,120],front:[140,150,140],glow:[200,225,215]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.fades.skin.head=0.75
                    this.fades.skin.body=0.6
                    this.fades.skin.legs=0.45
                    this.fades.skin.arms=0.45
                break
                case 'Obstruction':
                    this.color={skin:{head:[0,0,0],body:[5,235,255],legs:[5,235,255],arms:[0,0,0]},eye:{back:[50,50,50],front:[50,50,50],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[0,0,0]
                    this.color.hat=[0,0,0]
                    this.fades.hat=1
                    this.trigger.display.hat=true
                break
                case 'Structural Energy':
                    this.color={skin:{head:[155,245,210],body:[125,190,165],legs:[120,185,160],arms:[145,235,200]},eye:{back:[95,150,125],front:[115,170,145],glow:[255,255,255]},mouth:{in:[200,100,100],out:[115,170,145]}}
                    this.color.skin.upperBody=[150,240,205]
                    this.color.horn=[[150,240,205],[150,240,205]]
                    this.fades.horn=1
                    this.trigger.display.horn=true
                break
                case 'Disorder Energy':
                    this.color={skin:{head:[255,195,195],body:[45,65,90],legs:[40,60,85],arms:[245,185,185]},eye:{back:[225,75,95],front:[245,95,115],glow:[255,255,255]},mouth:{in:[200,100,100],out:[45,95,115]}}
                    this.color.skin.upperBody=[250,190,190]
                    this.color.horn=[[250,190,190],[85,55,165]]
                    this.fades.horn=1
                    this.trigger.display.horn=true
                break
                case 'Kugelblitz':
                    this.color={skin:{head:[40,135,255],body:[65,145,255],legs:[115,165,255],arms:[90,135,255]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[255,255,255]}}
                    this.color.loop=[90,210,255]
                    this.fades.loop=1
                    this.trigger.display.loop=true
                break
                case 'Voidglass':
                    this.color={skin:{head:[15,15,17],body:[13,13,14],legs:[10,10,10],arms:[12,12,13]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.outline=[100,10,240]
                    this.color.sunglasses=[[60,35,125],[220,180,240]]
                    this.fades.outline=1
                    this.fades.sunglasses=1
                    this.trigger.display.outline=true
                    this.trigger.display.sunglasses=true
                break
                case 'Intruder':
                    this.color={skin:{head:[65,110,145],body:[50,55,50],legs:[40,45,40],arms:[55,100,135]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.arrow=[30,35,30]
                    this.color.logo=[25,30,25]
                    this.fades.arrow=1
                    this.fades.logo=1
                    this.trigger.display.arrow=true
                    this.trigger.display.logo=true
                break
                case 'Regen Balloon':
                    this.color={skin:{head:[7,111,223],body:[133,88,49],legs:[123,78,39],arms:[143,98,59]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.rope=[120,100,80]
                    this.color.balloon=[20,60,180]
                    this.fades.rope=1
                    this.fades.balloon=1
                    this.trigger.display.rope=true
                    this.trigger.display.balloon=true
                    this.offset.position.y=-10
                break
                case 'Precision':
                    this.color={skin:{head:[24,70,35],body:[19,60,30],legs:[115,220,115],arms:[125,240,125]},eye:{back:[10,45,20],front:[15,50,25],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.headPlating=[30,85,45]
                    this.color.bodyPlating=[25,80,40]
                    this.fades.headPlating=1
                    this.fades.bodyPlating=1
                    this.trigger.display.headPlating=true
                    this.trigger.display.bodyPlating=true
                break
                case 'Relic':
                    this.color={skin:{head:[60,50,25],body:[30,30,25],legs:[15,20,25],arms:[45,40,25]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.crack=[255,245,235]
                    this.color.chain=[125,115,105]
                    this.fades.crack=1
                    this.fades.chain=1
                    this.trigger.display.crack=true
                    this.trigger.display.chain=true
                break
                case 'Legacy':
                    this.color={skin:{head:[105,105,110],body:[50,50,55],legs:[35,35,40],arms:[40,40,45]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeBeam=[255,245,250]
                    this.fades.eyeBeam=1
                    this.trigger.display.eyeBeam=true
                break
                case 'Anomaly':
                    this.color={skin:{head:[110,115,75],body:[35,60,45],legs:[15,40,25],arms:[25,50,35]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.wing=[15,230,40]
                    this.fades.wing=1
                    this.trigger.display.wing=true
                break
                case 'Recollection':
                    this.color={skin:{head:[200,230,200],body:[195,225,195],legs:[210,240,210],arms:[205,235,205]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.dots=[230,255,230]
                    this.fades.dots=1
                    this.trigger.display.dots=true
                break
                case 'Concentric':
                    this.color={skin:{head:[255,240,255],body:[255,230,255],legs:[255,220,255],arms:[255,225,255]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.loops=[255,240,255]
                    this.fades.loops=1
                    this.trigger.display.loops=true
                break
                case 'Embodimental Destabilization': case 'Embodimental Element':
                    this.color={skin:{head:[225,225,225],body:[220,220,220],legs:[215,215,215],arms:[210,210,210]},eye:{back:[180,180,180],front:[160,160,160],glow:[255,255,255]},mouth:{in:[200,100,100],out:[150,150,150]}}
                    this.size=0.8
                break
                case 'Dimension Wanderer':
                    this.color={skin:{head:[200,195,185],body:[15,20,15],legs:[10,15,10],arms:[190,185,175]},eye:{back:[255,250,225],front:[255,250,225],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[195,190,180]
                    this.color.diamond=[255,255,250]
                    this.color.circlet=[[40,35,30],[220,220,210],[0,0,0]]
                    this.fades.diamond=1
                    this.fades.circlet=1
                    this.trigger.display.diamond=true
                    this.trigger.display.circlet=true
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Crusader':
                    this.color={skin:{head:[240,220,180],body:[110,120,130],legs:[120,130,140],arms:[120,130,140]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[200,195,190]
                    this.color.logo=[240,225,75]
                    this.color.band=[120,90,60]
                    this.color.helmet=[60,65,70]
                    this.color.eyeHole=[240,220,180]
                    this.fades.logo=1
                    this.fades.band=1
                    this.fades.helmet=1
                    this.trigger.display.logo=true
                    this.trigger.display.band=true
                    this.trigger.display.helmet=true
                break
                case 'Archivist':
                    this.color={skin:{head:[240,220,180],body:[160,100,40],legs:[150,90,30],arms:[150,90,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.tie=[[240,240,240],[0,80,40]]
                    this.color.pocket=[180,120,60]
                    this.color.beard=[80,70,60]
                    this.color.coat=[60,15,0]
                    this.color.glasses=[[20,15,10],[240,200,160]]
                    this.fades.tie=1
                    this.fades.pocket=1
                    this.fades.beard=1
                    this.fades.glasses=1
                    this.fades.coat=1
                    this.trigger.display.tie=true
                    this.trigger.display.pocket=true
                    this.trigger.display.beard=true
                    this.trigger.display.glasses=true
                    this.trigger.display.coat=true
                break
                case 'Eternal Judge':
                    this.color={skin:{head:[55,60,75],body:[65,15,25],legs:[55,5,15],arms:[45,50,65]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.anim.eye=[1,1]
                    this.anim.eyeStyle=[6,6]
                    this.color.skin.upperBody=[45,50,65]
                    this.color.icosahedron=[[245,245,250],[10,15,25]]
                    this.color.circlet=[[10,15,30],[225,225,230],[0,5,20]]
                    this.color.logo=[240,235,230]
                    this.fades.icosahedron=true
                    this.fades.circlet=true
                    this.fades.logo=true
                    this.trigger.display.icosahedron=true
                    this.trigger.display.circlet=true
                    this.trigger.display.logo=true
                break
                case 'Management Shotgunner':
                    this.color={skin:{head:[240,220,180],body:[95,105,95],legs:[65,85,65],arms:[85,135,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[30,25,0]
                    this.color.helmet=[80,85,90]
                    this.color.visor=[45,85,45]
                    this.color.armor=[40,50,40]
                    this.color.badge=[[180,190,220],[60,150,60]]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.fades.armor=1
                    this.fades.badge=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                    this.trigger.display.armor=true
                    this.trigger.display.badge=true
                break
                case 'Yes Man':
                    this.color={skin:{head:[240,220,180],body:[220,220,40],legs:[200,200,40],arms:[210,210,49]},eye:{back:[60,60,0],front:[40,40,0],glow:[255,255,150]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.spin.eye=[-24,24]
                    this.anim.mouth={x:9,y:1,open:0}
                    this.parts.mouth-=2
                    this.spin.mouth=186
                    this.color.tie=[[160,160,100],[80,80,40]]
                    this.fades.tie=1
                    this.trigger.display.tie=true
                    this.spin.mouth+=180
                    this.parts.mouth-=2
                    this.anim.mouth.x-=1
                    this.anim.mouth.y+=1.5
                break
                case 'Management Light Infantry':
                    this.color={skin:{head:[240,220,180],body:[95,115,110],legs:[65,95,85],arms:[85,145,195]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[[30,25,0],[240,220,80]]
                    this.fades.belt=1
                    this.trigger.display.belt=true
                    this.color.sunglasses=[[0,0,0],[220,200,40],[120,240,60]]
                    this.fades.sunglasses=1
                    this.trigger.display.sunglasses=true
                break
                case 'Rebel Negotiator':
                    this.color={skin:{head:[240,220,180],body:[225,225,45],legs:[210,210,42],arms:[200,200,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.monocle=[[240,240,220],[30,30,20]]
                    this.color.bowtie=[[210,210,180],[120,120,40]]
                    this.color.coat=[150,150,30]
                    this.fades.monocle=1
                    this.fades.bowtie=1
                    this.fades.coat=1
                    this.trigger.display.monocle=true
                    this.trigger.display.bowtie=true
                    this.trigger.display.coat=true
                break
                case 'Gangster Assassin':
                    this.color={skin:{head:[60,40,70],body:[40,20,50],legs:[35,15,45],arms:[30,10,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.eyeHole=[240,220,180]
                    this.color.button=[200,180,200]
                    this.color.belt=[240,230,240]
                    this.fades.button=1
                    this.fades.belt=1
                    this.trigger.display.button=true
                    this.trigger.display.belt=true
                break
                case 'Prisoner Informant':
                    this.color={skin:{head:[240,220,180],body:[205,205,25],legs:[200,200,20],arms:[195,195,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[230,230,230]
                    this.fades.belt=1
                    this.trigger.display.belt=true
                break
                case 'Kugelblitz Particle':
                    this.color={skin:{head:[40,255,135],body:[65,255,145],legs:[115,255,165],arms:[90,255,135]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[255,255,255]}}
                    this.color.loop=[90,255,210]
                    this.fades.loop=1
                    this.trigger.display.loop=true
                    this.size=0.7
                break
                case 'Pure Swordsman':
                    this.color={skin:{head:[200,200,200],body:[160,160,160],legs:[150,150,150],arms:[140,140,140]},eye:{back:[255,255,255],front:[255,255,255],glow:[0,0,0]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.anim.eye=[1,1]
                    this.anim.eyeStyle=[3,3]
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                    this.size=0.9
                break
                case 'Pistol Biker':
                    this.color={skin:{head:[240,220,180],body:[175,25,25],legs:[170,20,20],arms:[180,30,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.hat=[150,0,0]
                    this.color.goggles=[255,255,255]
                    this.color.belt=[240,220,220]
                    this.fades.hat=1
                    this.fades.goggles=0.6
                    this.fades.belt=1
                    this.trigger.display.hat=true
                    this.trigger.display.goggles=true
                    this.trigger.display.belt=true
                break
                case 'Brawler':
                    this.color={skin:{head:[240,220,180],body:[225,115,25],legs:[220,110,20],arms:[215,105,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[230,230,230]
                    this.fades.belt=1
                    this.trigger.display.belt=true
                    this.trigger.display.muscles=true
                break
                case 'Mailman':
                    this.color={skin:{head:[240,220,180],body:[220,190,130],legs:[180,160,120],arms:[180,185,190]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[195,200,205]
                    this.color.hat=[[80,140,180],[190,185,180]]
                    this.color.tie=[[140,120,100],[0,40,100]]
                    this.fades.hat=1
                    this.fades.tie=1
                    this.trigger.display.hat=true
                    this.trigger.display.tie=true
                break
                case 'Guard':
                    this.color={skin:{head:[80,80,80],body:[45,45,54],legs:[35,35,53],arms:[55,55,55]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.metal=[24,24,42]
                    this.fades.metal=1
                    this.trigger.display.metal=true
                break
                case 'Bar Security':
                    this.color={skin:{head:[240,220,180],body:[80,60,60],legs:[75,55,55],arms:[70,50,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.sunglasses=[0,0,0]
                    this.color.belt=[180,160,160]
                    this.fades.sunglasses=1
                    this.fades.belt=1
                    this.trigger.display.sunglasses=true
                    this.trigger.display.belt=true
                break
                case 'Bartender':
                    this.color={skin:{head:[240,220,180],body:[240,240,240],legs:[75,55,75],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.overall=[80,60,80]
                    this.color.bowtie=[60,40,60]
                    this.color.button=[125,100,125]
                    this.fades.overall=1
                    this.fades.bowtie=1
                    this.fades.button=1
                    this.trigger.display.overall=true
                    this.trigger.display.bowtie=true
                    this.trigger.display.button=true
                break
                case 'Cutthroat':
                    this.color={skin:{head:[240,220,180],body:[160,130,100],legs:[140,110,80],arms:[130,100,70]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.neck=[200,60,60]
                    this.color.bandana=[150,120,90]
                    this.color.glasses=[[30,30,30],[200,215,230]]
                    this.color.belt=[[240,200,160],[50,40,30]]
                    this.fades.neck=1
                    this.fades.bandana=1
                    this.fades.glasses=1
                    this.fades.belt=1
                    this.trigger.display.neck=true
                    this.trigger.display.bandana=true
                    this.trigger.display.glasses=true
                    this.trigger.display.belt=true
                break
                case 'Renegade Agent':
                    this.color={skin:{head:[240,220,180],body:[40,40,40],legs:[35,35,35],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[240,240,240]
                    this.color.tie=[50,50,50]
                    this.color.belt=[240,240,240]
                    this.fades.tie=1
                    this.fades.belt=1
                    this.trigger.display.tie=true
                    this.trigger.display.belt=true
                break
                case 'Psychologist':
                    this.color={skin:{head:[240,220,180],body:[40,45,50],legs:[45,50,55],arms:[170,140,110]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.skin.upperBody=[180,150,120]
                    this.color.glasses=[[40,40,40],[160,200,240]]
                    this.color.button=[60,80,100]
                    this.color.coat=[220,230,240]
                    this.fades.glasses=1
                    this.fades.button=1
                    this.fades.coat=1
                    this.trigger.display.glasses=true
                    this.trigger.display.button=true
                    this.trigger.display.coat=true
                break
                case 'Adrian Kane':
                    this.color={skin:{head:[240,220,180],body:[200,120,40],legs:[190,110,30],arms:[195,115,35]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[100,90,80]
                    this.color.tie=[240,80,40]
                    this.color.beard=[60,60,60]
                    this.color.goggles=[200,200,80]
                    this.fades.belt=1
                    this.fades.tie=1
                    this.fades.beard=1
                    this.fades.goggles=0.8
                    this.trigger.display.belt=true
                    this.trigger.display.tie=true
                    this.trigger.display.beard=true
                    this.trigger.display.goggles=true
                break
                case 'Gangster Machinegunner Informant':
                    this.color={skin:{head:[240,220,180],body:[240,240,240],legs:[200,200,20],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.overall=[205,205,25]
                    this.color.hat=[225,225,45]
                    this.color.sunglasses=[100,90,60]
                    this.fades.overall=1
                    this.fades.hat=1
                    this.fades.sunglasses=1
                    this.trigger.display.overall=true
                    this.trigger.display.hat=true
                    this.trigger.display.sunglasses=true
                break
                case 'Walker Driver Informant':
                    this.color={skin:{head:[240,220,180],body:[205,205,25],legs:[200,200,20],arms:[195,195,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[100,90,80]
                    this.color.helmet=[160,160,40]
                    this.color.visor=[240,240,240]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Armored Biker':
                    this.color={skin:{head:[200,10,10],body:[225,25,25],legs:[220,20,20],arms:[230,30,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.goggles=[[240,220,180],[255,255,255]]
                    this.fades.goggles=0.6
                    this.trigger.display.goggles=true
                break
                case 'Prison Guard Gunner':
                    this.color={skin:{head:[240,220,180],body:[0,175,100],legs:[0,170,95],arms:[0,165,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[[70,70,70],[60,60,60]]
                    this.color.armor=[80,80,80]
                    this.color.helmet=[100,100,100]
                    this.color.visor=[200,200,200]
                    this.fades.belt=1
                    this.fades.armor=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.belt=true
                    this.trigger.display.armor=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Shield Prison Guard':
                    this.color={skin:{head:[240,220,180],body:[100,175,100],legs:[95,170,95],arms:[90,165,0]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[[70,70,70],[60,60,60]]
                    this.color.armor=[80,80,80]
                    this.color.helmet=[100,100,100]
                    this.color.visor=[200,200,200]
                    this.fades.belt=1
                    this.fades.armor=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.belt=true
                    this.trigger.display.armor=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Hit Squad':
                    this.color={skin:{head:[240,220,180],body:[180,170,160],legs:[120,115,110],arms:[170,160,150]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.overall=[130,125,120]
                    this.color.button=[40,40,35]
                    this.color.hat=[[180,170,160],[60,55,50]]
                    this.fades.overall=1
                    this.fades.button=1
                    this.fades.hat=1
                    this.trigger.display.overall=true
                    this.trigger.display.button=true
                    this.trigger.display.hat=true
                break
                case 'Old Konaian':
                    this.color={skin:{head:[240,220,180],body:[50,75,100],legs:[40,60,80],arms:[40,60,80]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.helmet=[60,90,120]
                    this.fades.helmet=1
                    this.trigger.display.helmet=true
                    this.anim.sword=1
                    this.spin.sword=75
                    this.fades.sword=1
                    this.trigger.display.extra={sword:true}
                break
                case 'Caporegime':
                    this.color={skin:{head:[240,220,180],body:[120,110,100],legs:[80,75,70],arms:[110,100,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.tie=[[240,235,230],[30,30,30]]
                    this.color.coat=[60,60,60]
                    this.color.pocket=[220,225,230]
                    this.fades.tie=1
                    this.fades.coat=1
                    this.fades.pocket=1
                    this.trigger.display.tie=true
                    this.trigger.display.coat=true
                    this.trigger.display.pocket=true
                break
                case 'MMIS Agent':
                    this.color={skin:{head:[240,220,180],body:[35,40,40],legs:[25,30,30],arms:[30,35,35]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.helmet=[40,45,45]
                    this.color.visor=[200,200,200]
                    this.color.belt=[30,25,0]
                    this.color.badge=[[240,200,200],[240,40,40]]
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.fades.belt=1
                    this.fades.badge=1
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                    this.trigger.display.belt=true
                    this.trigger.display.badge=true
                break
                case 'HVM Contractor':
                    this.color={skin:{head:[240,220,180],body:[75,125,90],legs:[45,105,65],arms:[125,95,75]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.belt=[[25,60,25],[0,20,0]]
                    this.color.helmet=[120,125,130]
                    this.color.visor=[200,255,200]
                    this.fades.belt=1
                    this.fades.helmet=1
                    this.fades.visor=1
                    this.trigger.display.belt=true
                    this.trigger.display.helmet=true
                    this.trigger.display.visor=true
                break
                case 'Warning Man':
                    this.color={skin:{head:[240,220,180],body:[80,200,160],legs:[70,190,150],arms:[75,195,155]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.neck=[75,150,75]
                    this.color.bandana=[100,200,100]
                    this.color.talkie=[100,100,100]
                    this.fades.neck=1
                    this.fades.bandana=1
                    this.fades.talkie=1
                    this.trigger.display.neck=true
                    this.trigger.display.bandana=true
                    this.trigger.display.talkie=true
                break
                case 'Pinstripe':
                    this.color={skin:{head:[240,220,180],body:[190,170,190],legs:[150,140,150],arms:[180,160,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    this.color.overall=[160,150,160]
                    this.color.hat=[[50,40,50],[200,180,200]]
                    this.color.tie=[[40,40,40],[220,220,220]]
                    this.fades.overall=1
                    this.fades.hat=1
                    this.fades.tie=1
                    this.trigger.display.overall=true
                    this.trigger.display.hat=true
                    this.trigger.display.tie=true
                break
                default:
                    this.color={skin:{head:[240,220,180],body:[95,95,95],legs:[90,90,90],arms:[100,100,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                break
                //mark d
            }
        break
    }
}
combatant.prototype.minorDisplay=function(type,key){
    let dir
    switch(this.name){
        case 'Lira':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom-75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(235,245,255,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-20,3,40)
                    this.layer.triangle(-3/2,-40,3/2,-40,0,-55)
                    this.layer.fill(160,170,180,this.fade)
                    this.layer.rect(3/4,-20,3/2,40)
                    this.layer.triangle(3/2,-40,0,-55,0,-40)
                    for(let g=0;g<4;g++){
                        this.layer.stroke(125+g*10,70+g*10,80+g*10,this.fade)
                        this.layer.strokeWeight(4-g)
                        this.layer.line(0,-3+g/2,0,2-g/2)
                    }
                    this.layer.pop()
                break
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(this.color.band[1][0],this.color.band[1][1],this.color.band[1][2],this.fade*this.fades.band[0])
                    this.layer.strokeWeight(0.5)
                    if(this.trigger.display.extra.damage){
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.1*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.1*lcos(dir+90),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(dir+90))
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(dir+90),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.1*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.1*lcos(dir+90))
                    }else{
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(dir+90),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(dir+90))
                    }
                    this.layer.stroke(this.color.band[2][0],this.color.band[2][1],this.color.band[2][2],this.fade*this.fades.band[0])
                    this.layer.strokeWeight(0.6)
                    for(let g=0;g<4;g++){
                        if(!this.trigger.display.extra.damage||g<1||g>3){
                            this.layer.point(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+(-1.8+g*1.2)*lsin(dir+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+(-1.8+g*1.2)*lcos(dir+90))
                        }
                    }
                break
            }
        break
        case 'Sakura':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(-1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.image(graphics.minor[17],-27*this.fade,-15-27*this.fade,54*this.fade,54*this.fade)
                    this.layer.pop()
                break
                case 1:
                    if(this.anim.sword2>0){
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75)))
                        this.layer.scale(-0.5,-0.5*constrain(lsin(this.anim.direction+this.spin.arms[key].bottom-75)*2,-1,1)*this.anim.sword2)
                        this.layer.strokeCap(SQUARE)
                        this.layer.noFill()
                        this.layer.stroke(207,217,220,this.fade)
                        this.layer.strokeWeight(0.4)
                        this.layer.beginShape()
                        this.layer.vertex(45,45)
                        this.layer.bezierVertex(25,40,-25,40,-45,45)
                        this.layer.endShape()
                        this.layer.strokeCap(ROUND)
                        this.layer.fill(237,155,140,this.fade)
                        this.layer.noStroke()
                        this.layer.beginShape()
                        this.layer.vertex(-45,45)
                        this.layer.vertex(0,65)
                        this.layer.vertex(45,45)
                        this.layer.bezierVertex(25,40,-25,40,-45,45)
                        this.layer.endShape()
                        this.layer.stroke(104,78,95,this.fade)
                        this.layer.strokeWeight(1.5)
                        this.layer.line(0,-5,0,50)
                        this.layer.image(graphics.minor[24],-75*this.fade,50-30*this.fade,150*this.fade,60*this.fade)
                        this.layer.fill(246,209,161,this.fade)
                        this.layer.noStroke()
                        this.layer.beginShape()
                        this.layer.vertex(-45,45)
                        this.layer.vertex(0,65)
                        this.layer.vertex(45,45)
                        this.layer.bezierVertex(25,50,-25,50,-45,45)
                        this.layer.endShape()
                        this.layer.image(graphics.minor[25],-50*this.fade,60-20*this.fade,100*this.fade,40*this.fade)
                        this.layer.push()
                        this.layer.fill(239,230,231,this.fade)
                        this.layer.ellipse(0,65,3,3)
                        this.layer.translate(0,65)
                        this.layer.rotate(95-165*3/4)
                        for(let a=0;a<4;a++){
                            this.layer.arc(0,0,12.5,2.5,-90,90)
                            this.layer.rotate(-165/4)
                        }
                        this.layer.pop()
                        this.layer.fill(225,202,187,this.fade)
                        this.layer.rect(0,65.5,3.5,0.4)
                        this.layer.strokeCap(SQUARE)
                        this.layer.noFill()
                        this.layer.stroke(207,217,220,this.fade)
                        this.layer.strokeWeight(0.4)
                        this.layer.beginShape()
                        this.layer.vertex(45.5,45)
                        this.layer.bezierVertex(25,50,-25,50,-45.5,45)
                        this.layer.endShape()
                        this.layer.strokeCap(ROUND)
                        this.layer.pop()
                    }
                break
            }
        break
        case 'Setsuna':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(245,250,255,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-25,2.5,50)
                    this.layer.triangle(-1.25,-50,1.25,-50,0,-70)
                    this.layer.fill(160,170,180,this.fade)
                    this.layer.rect(0.625,-25,1.25,50)
                    this.layer.triangle(1.25,-50,0,-70,0,-50)
                    for(let g=0;g<4;g++){
                        this.layer.stroke(75+g*10,40+g*10,50+g*10,this.fade)
                        this.layer.strokeWeight(3.6-g*0.9)
                        this.layer.line(0,-4+g/2,0,2-g/2)
                    }
                    this.layer.pop()
                break
                case 1:
                    this.layer.stroke(this.color.band[1][0],this.color.band[1][1],this.color.band[1][2],this.fade*this.fades.band[0])
                    this.layer.strokeWeight(0.3)
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    if(this.trigger.display.extra.damage){
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.1*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.1*lcos(dir+90),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(dir+90))
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(dir+90),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.1*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.1*lcos(dir+90))
                    }else{
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(dir+90),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(dir+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(dir+90))
                    }
                    this.layer.stroke(this.color.band[2][0],this.color.band[2][1],this.color.band[2][2],this.fade*this.fades.band[0])
                    this.layer.strokeWeight(0.55)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+0.8*lsin(dir+60),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+0.8*lcos(dir+60),
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-0.8*lsin(dir+60),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-0.8*lcos(dir+60))
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+0.8*lsin(dir),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+0.8*lcos(dir),
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-0.8*lsin(dir),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-0.8*lcos(dir))
                    if(!this.trigger.display.extra.damage){
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+0.8*lsin(dir-60),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+0.8*lcos(dir-60),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-0.8*lsin(dir-60),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-0.8*lcos(dir-60))
                    }
                    this.layer.stroke(this.color.band[3][0],this.color.band[3][1],this.color.band[3][2],this.fade*this.fades.band[0])
                    this.layer.strokeWeight(0.25)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+0.8*lsin(dir+60),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+0.8*lcos(dir+60),
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-0.8*lsin(dir+60),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-0.8*lcos(dir+60))
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+0.8*lsin(dir),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+0.8*lcos(dir),
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-0.8*lsin(dir),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-0.8*lcos(dir))
                    if(!this.trigger.display.extra.damage){
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+0.8*lsin(dir-60),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+0.8*lcos(dir-60),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-0.8*lsin(dir-60),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-0.8*lcos(dir-60))
                    }
                break
            }
        break
        case 'Edgar':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom-75)*2,-1,1))
                    this.layer.fill(60,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-14,24,16,2)
                    this.layer.stroke(60,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.noFill()
                    this.layer.arc(0,-6,8,8,0,180)
                    this.layer.pop()
                break
            }
        break
        case 'Shiru':
            switch(type){
                case 0:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.color.dress.sleeve),this.fade*this.fades.dress.sleeve)
                    this.layer.beginShape()
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x+2.1*sin(dir+90),
                        this.graphics.arms[key].middle.y+2.1*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.45+this.graphics.arms[key].bottom.x*0.55+3.6*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.45+this.graphics.arms[key].bottom.y*0.55+3.6*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.3+this.graphics.arms[key].bottom.x*0.7+2.4*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.3+this.graphics.arms[key].bottom.y*0.7+2.4*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85+2.7*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85+2.7*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.25+this.graphics.arms[key].bottom.x*0.75+0.9*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.25+this.graphics.arms[key].bottom.y*0.75+0.9*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85,
                        this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85)
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.25+this.graphics.arms[key].bottom.x*0.75-0.9*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.25+this.graphics.arms[key].bottom.y*0.75-0.9*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85-2.7*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85-2.7*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.3+this.graphics.arms[key].bottom.x*0.7-2.4*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.3+this.graphics.arms[key].bottom.y*0.7-2.4*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.45+this.graphics.arms[key].bottom.x*0.55-3.6*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.45+this.graphics.arms[key].bottom.y*0.55-3.6*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x-2.1*sin(dir+90),
                        this.graphics.arms[key].middle.y-2.1*cos(dir+90))
                    this.layer.endShape()
                    this.layer.ellipse(this.graphics.arms[key].middle.x,this.graphics.arms[key].middle.y,4.5)
                    dir=atan2(this.graphics.arms[key].top.x-this.graphics.arms[key].middle.x,this.graphics.arms[key].top.y-this.graphics.arms[key].middle.y)
                    this.layer.quad(
                        this.graphics.arms[key].middle.x-2.1*sin(dir+90),
                        this.graphics.arms[key].middle.y-2.1*cos(dir+90),
                        this.graphics.arms[key].middle.x+2.1*sin(dir+90),
                        this.graphics.arms[key].middle.y+2.1*cos(dir+90),
                        this.graphics.arms[key].top.x+2.1*sin(dir+90),
                        this.graphics.arms[key].top.y+2.1*cos(dir+90),
                        this.graphics.arms[key].top.x-2.1*sin(dir+90),
                        this.graphics.arms[key].top.y-2.1*cos(dir+90)
                    )
                    dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.flashColor(this.color.dress.tie),this.fade*this.fades.dress.sleeve)
                    this.layer.strokeWeight(0.5)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.3+this.graphics.arms[key].bottom.x*0.7+2.4*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.3+this.graphics.arms[key].bottom.y*0.7+2.4*cos(dir+90),
                        this.graphics.arms[key].middle.x*0.3+this.graphics.arms[key].bottom.x*0.7-2.4*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.3+this.graphics.arms[key].bottom.y*0.7-2.4*cos(dir+90))
                break
            }
        break
        case 'DD-610':
            switch(type){
                case 0:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(this.flashColor(this.color.ring)[0],this.flashColor(this.color.ring)[1],this.flashColor(this.color.ring)[2],this.fade*this.fades.skin.arms)
                    this.layer.strokeWeight(0.75)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.9*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.9*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.9*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.9*lcos(dir+90))
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.04+this.graphics.arms[key].bottom.x*0.96,
                        this.graphics.arms[key].middle.y*0.04+this.graphics.arms[key].bottom.y*0.96,
                        this.graphics.arms[key].middle.x*0.16+this.graphics.arms[key].bottom.x*0.84,
                        this.graphics.arms[key].middle.y*0.16+this.graphics.arms[key].bottom.y*0.84)
                break
                case 1:
                    this.layer.stroke(this.flashColor(this.color.stripe)[0],this.flashColor(this.color.stripe)[1],this.flashColor(this.color.stripe)[2],this.fade*this.fades.skin.legs)
                    this.layer.strokeWeight(0.6)
                    this.layer.line(
                        this.graphics.legs[key].top.x*0.54+this.graphics.legs[key].middle.x*0.46+1.9*lsin(atan2(this.graphics.legs[key].top.x-this.graphics.legs[key].middle.x,this.graphics.legs[key].top.y-this.graphics.legs[key].middle.y)+90),
                        this.graphics.legs[key].top.y*0.54+this.graphics.legs[key].middle.y*0.46+1.9*lcos(atan2(this.graphics.legs[key].top.x-this.graphics.legs[key].middle.x,this.graphics.legs[key].top.y-this.graphics.legs[key].middle.y)+90),
                        this.graphics.legs[key].top.x*0.54+this.graphics.legs[key].middle.x*0.46-1.9*lsin(atan2(this.graphics.legs[key].top.x-this.graphics.legs[key].middle.x,this.graphics.legs[key].top.y-this.graphics.legs[key].middle.y)+90),
                        this.graphics.legs[key].top.y*0.54+this.graphics.legs[key].middle.y*0.46-1.9*lcos(atan2(this.graphics.legs[key].top.x-this.graphics.legs[key].middle.x,this.graphics.legs[key].top.y-this.graphics.legs[key].middle.y)+90))
                    this.layer.line(
                        this.graphics.legs[key].top.x*0.61+this.graphics.legs[key].middle.x*0.39+1.9*lsin(atan2(this.graphics.legs[key].top.x-this.graphics.legs[key].middle.x,this.graphics.legs[key].top.y-this.graphics.legs[key].middle.y)+90),
                        this.graphics.legs[key].top.y*0.61+this.graphics.legs[key].middle.y*0.39+1.9*lcos(atan2(this.graphics.legs[key].top.x-this.graphics.legs[key].middle.x,this.graphics.legs[key].top.y-this.graphics.legs[key].middle.y)+90),
                        this.graphics.legs[key].top.x*0.61+this.graphics.legs[key].middle.x*0.39-1.9*lsin(atan2(this.graphics.legs[key].top.x-this.graphics.legs[key].middle.x,this.graphics.legs[key].top.y-this.graphics.legs[key].middle.y)+90),
                        this.graphics.legs[key].top.y*0.61+this.graphics.legs[key].middle.y*0.39-1.9*lcos(atan2(this.graphics.legs[key].top.x-this.graphics.legs[key].middle.x,this.graphics.legs[key].top.y-this.graphics.legs[key].middle.y)+90))
                break
                case 2:
                    this.layer.noStroke()
                    this.layer.push()
                    this.layer.translate(this.graphics.legs[key].bottom.x+2*lsin(this.anim.direction),this.graphics.legs[key].bottom.y)
                    this.layer.scale(lcos(this.anim.direction))
                    this.layer.fill(this.flashColor(this.color.lowAntenna)[0],this.flashColor(this.color.lowAntenna)[1],this.flashColor(this.color.lowAntenna)[2],this.fade*this.fades.skin.legs)
                    this.layer.quad(0,0,-3*abs(lcos(this.anim.direction)),-2,-5*abs(lcos(this.anim.direction)),-5,-2*abs(lcos(this.anim.direction)),-3)
                    this.layer.quad(0,0,3*abs(lcos(this.anim.direction)),-2,5*abs(lcos(this.anim.direction)),-5,2*abs(lcos(this.anim.direction)),-3)
                    this.layer.pop()
                break
            }
        break
        case 'Daiyousei':
            switch(type){
                case 0:
                    let dir=atan2(this.graphics.arms[key].top.x-this.graphics.arms[key].middle.x,this.graphics.arms[key].top.y-this.graphics.arms[key].middle.y)
                    this.layer.noStroke()
                    this.layer.fill(this.flashColor(this.color.dress.under)[0],this.flashColor(this.color.dress.under)[1],this.flashColor(this.color.dress.under)[2],this.fade*this.fades.dress.sleeve)
                    this.layer.beginShape()
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.5+this.graphics.arms[key].top.x*0.5-3.9*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.5+this.graphics.arms[key].top.y*0.5-3.9*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.575+this.graphics.arms[key].top.x*0.425-2.7*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.575+this.graphics.arms[key].top.y*0.425-2.7*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.65+this.graphics.arms[key].top.x*0.35-2.8*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.65+this.graphics.arms[key].top.y*0.35-2.8*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.65+this.graphics.arms[key].top.x*0.35+2.8*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.65+this.graphics.arms[key].top.y*0.35+2.8*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.575+this.graphics.arms[key].top.x*0.425+2.7*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.575+this.graphics.arms[key].top.y*0.425+2.7*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.5+this.graphics.arms[key].top.x*0.5+3.9*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.5+this.graphics.arms[key].top.y*0.5+3.9*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].top.x+2.3*sin(dir+90),
                        this.graphics.arms[key].top.y+2.3*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].top.x-2.3*sin(dir+90),
                        this.graphics.arms[key].top.y-2.3*cos(dir+90))
                    this.layer.endShape()
                    this.layer.ellipse(this.graphics.arms[key].top.x,this.graphics.arms[key].top.y,4.6)
                break
            }
        break
        case 'Sanae':
            let colors
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.noStroke()
                    this.layer.fill(153,169,185,this.fade)
                    this.layer.quad(-2,-9.25,2,-9,3,-22.25,-1,-22.5)
                    this.layer.fill(196,211,218,this.fade)
                    this.layer.quad(-2,-9.25,2,-9.5,1,-24,-3,-23.75)
                    this.layer.fill(131,119,112,this.fade)
                    this.layer.rect(-0.4,0,0.8,20)
                    this.layer.fill(69,67,68,this.fade)
                    this.layer.rect(0.4,0,0.8,20)
                    this.layer.fill(127,149,165,this.fade)
                    this.layer.rect(0,-7,2,0.5)
                    this.layer.pop()
                break
                case 1:
                    colors=[this.flashColor(this.color.dress.sleeveHighlight),this.flashColor(this.color.dress.sleeve),this.flashColor(this.color.dress.dot)]
                    dir=atan2(this.graphics.arms[key].top.x-this.graphics.arms[key].middle.x,this.graphics.arms[key].top.y-this.graphics.arms[key].middle.y)
                    this.layer.noStroke()
                    this.layer.fill(...colors[0],this.fade*this.fades.dress.sleeve)
                    this.layer.quad(
                        this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5+3.6*sin(dir+90),
                        this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5+3.6*cos(dir+90),
                        this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5-3.6*sin(dir+90),
                        this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5-3.6*cos(dir+90),
                        this.graphics.arms[key].top.x*0.55+this.graphics.arms[key].middle.x*0.45-3.84*sin(dir+90),
                        this.graphics.arms[key].top.y*0.55+this.graphics.arms[key].middle.y*0.45-3.84*cos(dir+90),
                        this.graphics.arms[key].top.x*0.55+this.graphics.arms[key].middle.x*0.45+3.84*sin(dir+90),
                        this.graphics.arms[key].top.y*0.55+this.graphics.arms[key].middle.y*0.45+3.84*cos(dir+90)
                    )

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].top.x*0.55+this.graphics.arms[key].middle.x*0.45,this.graphics.arms[key].top.y*0.55+this.graphics.arms[key].middle.y*0.45)
                    this.layer.rotate(-dir)
                    this.layer.arc(0,0,7.68,2.56,0,180)
                    this.layer.ellipse(0,0,7.68,1)
                    this.layer.pop()

                    this.layer.fill(...colors[1],this.fade*this.fades.dress.sleeve)
                    this.layer.quad(
                        this.graphics.arms[key].middle.x-2.2*sin(dir+90),
                        this.graphics.arms[key].middle.y-2.2*cos(dir+90),
                        this.graphics.arms[key].middle.x+2.2*sin(dir+90),
                        this.graphics.arms[key].middle.y+2.2*cos(dir+90),
                        this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5+3.6*sin(dir+90),
                        this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5+3.6*cos(dir+90),
                        this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5-3.6*sin(dir+90),
                        this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5-3.6*cos(dir+90)
                    )

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5,this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5)
                    this.layer.rotate(-dir)
                    this.layer.arc(0,0,7.2,2.2,0,180)
                    this.layer.ellipse(0,0,7.2,1)
                    this.layer.pop()

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].top.x*0.525+this.graphics.arms[key].middle.x*0.475,this.graphics.arms[key].top.y*0.525+this.graphics.arms[key].middle.y*0.475)
                    this.layer.rotate(-dir)
                    this.layer.stroke(...colors[2],this.fade*this.fades.dress.sleeve)
                    this.layer.strokeWeight(0.4)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.point(3.72*lcos(a*30+15),1.19*lsin(a*30+15))
                    }
                    this.layer.noStroke()
                    this.layer.pop()

                    this.layer.ellipse(this.graphics.arms[key].middle.x,this.graphics.arms[key].middle.y,4.4)
                    dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.fill(colors[0][0],colors[0][1],colors[0][2],this.fade*this.fades.dress.sleeve)
                    this.layer.quad(
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25+6*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25+6*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25-6*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25-6*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.8+this.graphics.arms[key].middle.x*0.2-6.24*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.8+this.graphics.arms[key].middle.y*0.2-6.24*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.8+this.graphics.arms[key].middle.x*0.2+6.24*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.8+this.graphics.arms[key].middle.y*0.2+6.24*cos(dir+90)
                    )

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.8+this.graphics.arms[key].middle.x*0.2,this.graphics.arms[key].bottom.y*0.8+this.graphics.arms[key].middle.y*0.2)
                    this.layer.rotate(-dir)
                    this.layer.arc(0,0,12.48,4.16,-180,0)
                    this.layer.ellipse(0,0,12.48,1)
                    this.layer.pop()

                    this.layer.fill(colors[1][0],colors[1][1],colors[1][2],this.fade*this.fades.dress.sleeve)
                    this.layer.quad(
                        this.graphics.arms[key].middle.x-2.2*sin(dir+90),
                        this.graphics.arms[key].middle.y-2.2*cos(dir+90),
                        this.graphics.arms[key].middle.x+2.2*sin(dir+90),
                        this.graphics.arms[key].middle.y+2.2*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25+6*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25+6*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25-6*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25-6*cos(dir+90)
                    )

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25,this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25)
                    this.layer.rotate(-dir)
                    this.layer.arc(0,0,12,4,-180,0)
                    this.layer.ellipse(0,0,12,1)
                    this.layer.pop()

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.775+this.graphics.arms[key].middle.x*0.225,this.graphics.arms[key].bottom.y*0.775+this.graphics.arms[key].middle.y*0.225)
                    this.layer.rotate(-dir)
                    this.layer.stroke(colors[2][0],colors[2][1],colors[2][2],this.fade*this.fades.dress.sleeve)
                    this.layer.strokeWeight(0.4)
                    for(let a=0,la=9;a<la;a++){
                        this.layer.point(6.12*lcos(a*20+10),-2.04*lsin(a*20+10))
                    }
                    this.layer.noStroke()
                    this.layer.pop()
                break
                case 2:
                    colors=[this.flashColor(this.color.dress.sleeveHighlight),this.flashColor(this.color.dress.sleeve),this.flashColor(this.color.dress.dot)]
                    dir=atan2(this.graphics.arms[key].top.x-this.graphics.arms[key].middle.x,this.graphics.arms[key].top.y-this.graphics.arms[key].middle.y)
                    this.layer.noStroke()
                    this.layer.fill(...colors[0],this.fade*this.fades.dress.sleeve)
                    this.layer.quad(
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25+6*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25+6*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25-6*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25-6*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.8+this.graphics.arms[key].middle.x*0.2-6.24*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.8+this.graphics.arms[key].middle.y*0.2-6.24*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.8+this.graphics.arms[key].middle.x*0.2+6.24*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.8+this.graphics.arms[key].middle.y*0.2+6.24*cos(dir+90)
                    )

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.8+this.graphics.arms[key].middle.x*0.2,this.graphics.arms[key].bottom.y*0.8+this.graphics.arms[key].middle.y*0.2)
                    this.layer.rotate(-dir)
                    this.layer.arc(0,0,12.48,4.16,-180,0)
                    this.layer.ellipse(0,0,12.48,1)
                    this.layer.pop()

                    this.layer.fill(...colors[1],this.fade*this.fades.dress.sleeve)
                    this.layer.ellipse(this.graphics.arms[key].middle.x,this.graphics.arms[key].middle.y,4.4)
                    this.layer.quad(
                        this.graphics.arms[key].middle.x-2.2*sin(dir+90),
                        this.graphics.arms[key].middle.y-2.2*cos(dir+90),
                        this.graphics.arms[key].middle.x+2.2*sin(dir+90),
                        this.graphics.arms[key].middle.y+2.2*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25+6*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25+6*cos(dir+90),
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25-6*sin(dir+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25-6*cos(dir+90)
                    )

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25,this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25)
                    this.layer.rotate(-dir)
                    this.layer.arc(0,0,12,4,-180,0)
                    this.layer.ellipse(0,0,12,1)
                    this.layer.pop()

                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.775+this.graphics.arms[key].middle.x*0.225,this.graphics.arms[key].bottom.y*0.775+this.graphics.arms[key].middle.y*0.225)
                    this.layer.rotate(-dir)
                    this.layer.stroke(...colors[2],this.fade*this.fades.dress.sleeve)
                    this.layer.strokeWeight(0.4)
                    for(let a=0,la=9;a<la;a++){
                        this.layer.point(6.12*lcos(a*20+10),-2.04*lsin(a*20+10))
                    }
                    this.layer.noStroke()
                    this.layer.pop()
                break
            }
        break
        case 'Shinmyoumaru':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*1.1+this.graphics.arms[key].middle.x*-0.1,this.graphics.arms[key].bottom.y*1.1+this.graphics.arms[key].middle.y*-0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.noFill()
                        this.layer.stroke(map((a+1)/la,0,1,102,187),map((a+1)/la,0,1,85,181),map((a+1)/la,0,1,118,185),this.fade)
                        this.layer.strokeWeight(2.8-a*0.8)
                        this.layer.line(-3,-2,-3,2)
                        this.layer.line(3,-2,3,2)
                        this.layer.arc(0,-2,6,10,-180,0)
                        this.layer.arc(0,2,6,10,0,180)
                        this.layer.noStroke()
                        this.layer.fill(map((a+1)/la,0,1,102,187),map((a+1)/la,0,1,85,181),map((a+1)/la,0,1,118,185),this.fade)
                        this.layer.quad(-1.4+a*0.4,-7,1.4-a*0.4,-7,0.35-a*0.1,-50,-0.35+a*0.1,-50)
                        this.layer.triangle(0.35-a*0.1,-50,-0.35+a*0.1,-50,0,-52-a*0.5)
                    }
                    this.layer.pop()
                break
                case 1:
                    this.layer.fill(...this.color.kimono.decoration[0])
                    for(let a=0,la=5;a<la;a++){
                        this.layer.beginShape()
                        this.layer.vertex(0,0)
                        this.layer.bezierVertex(-3,-2,-3,-6,-2,-8)
                        this.layer.vertex(0,-6)
                        this.layer.vertex(2,-8)
                        this.layer.bezierVertex(3,-6,3,-2,0,0)
                        this.layer.endShape()
                        this.layer.rotate(360/la)
                    }
                break
                case 2:
                    this.layer.noStroke()
                    this.layer.fill(...this.color.kimono.decoration[1])
                    for(let a=0,la=5;a<la;a++){
                        this.layer.beginShape()
                        this.layer.vertex(0,0)
                        this.layer.bezierVertex(-3,-3,-3,-6,-3,-8)
                        this.layer.vertex(-1.5,-6)
                        this.layer.vertex(0,-8)
                        this.layer.vertex(1.5,-6)
                        this.layer.vertex(3,-8)
                        this.layer.bezierVertex(3,-6,3,-3,0,0)
                        this.layer.endShape()
                        this.layer.rotate(360/la)
                    }
                break
                case 3:
                    this.layer.noFill()
                    this.layer.stroke(...this.color.kimono.decoration[2])
                    this.layer.strokeWeight(0.4)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.beginShape()
                        this.layer.vertex(0,0)
                        this.layer.bezierVertex(-2.5,-4,-4,-8,-2.5,-11)
                        this.layer.vertex(-1,-9.5)
                        this.layer.endShape()
                        this.layer.beginShape()
                        this.layer.vertex(0,0)
                        this.layer.bezierVertex(2.5,-4,4,-8,2.5,-11)
                        this.layer.vertex(1,-9.5)
                        this.layer.endShape()
                        this.layer.rotate(360/la)
                    }
                break
            }
        break
        case 'Merlin':
            switch(type){
                case 0:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.color.dress.sleeve),this.fade*this.fades.dress.sleeve)
                    this.layer.beginShape()
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x+2.1*sin(dir+90),
                        this.graphics.arms[key].middle.y+2.1*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.4+this.graphics.arms[key].bottom.x*0.6+3.6*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.4+this.graphics.arms[key].bottom.y*0.6+3.6*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.25+this.graphics.arms[key].bottom.x*0.75+2.5*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.25+this.graphics.arms[key].bottom.y*0.75+2.5*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85+2.4*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85+2.4*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85-2.4*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85-2.4*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.25+this.graphics.arms[key].bottom.x*0.75-2.5*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.25+this.graphics.arms[key].bottom.y*0.75-2.5*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x*0.4+this.graphics.arms[key].bottom.x*0.6-3.6*sin(dir+90),
                        this.graphics.arms[key].middle.y*0.4+this.graphics.arms[key].bottom.y*0.6-3.6*cos(dir+90))
                    this.layer.vertex(
                        this.graphics.arms[key].middle.x-2.1*sin(dir+90),
                        this.graphics.arms[key].middle.y-2.1*cos(dir+90))
                    this.layer.endShape()
                    this.layer.ellipse(this.graphics.arms[key].middle.x,this.graphics.arms[key].middle.y,4.5)
                    dir=atan2(this.graphics.arms[key].top.x-this.graphics.arms[key].middle.x,this.graphics.arms[key].top.y-this.graphics.arms[key].middle.y)
                    this.layer.quad(
                        this.graphics.arms[key].middle.x-2.1*sin(dir+90),
                        this.graphics.arms[key].middle.y-2.1*cos(dir+90),
                        this.graphics.arms[key].middle.x+2.1*sin(dir+90),
                        this.graphics.arms[key].middle.y+2.1*cos(dir+90),
                        this.graphics.arms[key].top.x+2.1*sin(dir+90),
                        this.graphics.arms[key].top.y+2.1*cos(dir+90),
                        this.graphics.arms[key].top.x-2.1*sin(dir+90),
                        this.graphics.arms[key].top.y-2.1*cos(dir+90)
                    )
                    this.layer.fill(...this.flashColor(this.color.dress.main),this.fade*this.fades.dress.sleeve)
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].top.x,this.graphics.arms[key].top.y)
                    this.layer.rotate(-dir)
                    this.layer.arc(0,0,4.5,4,0,180)
                    this.layer.pop()
                    this.layer.triangle(
                        this.graphics.arms[key].top.x*0.95+this.graphics.arms[key].middle.x*0.05+2.1*sin(dir+90),
                        this.graphics.arms[key].top.y*0.95+this.graphics.arms[key].middle.y*0.05+2.1*cos(dir+90),
                        this.graphics.arms[key].top.x+2.1*sin(dir+90),
                        this.graphics.arms[key].top.y+2.1*cos(dir+90),
                        this.graphics.arms[key].top.x+0.7*sin(dir+90),
                        this.graphics.arms[key].top.y+0.7*cos(dir+90)
                    )
                    this.layer.triangle(
                        this.graphics.arms[key].top.x*0.95+this.graphics.arms[key].middle.x*0.05-2.1*sin(dir+90),
                        this.graphics.arms[key].top.y*0.95+this.graphics.arms[key].middle.y*0.05-2.1*cos(dir+90),
                        this.graphics.arms[key].top.x-2.1*sin(dir+90),
                        this.graphics.arms[key].top.y-2.1*cos(dir+90),
                        this.graphics.arms[key].top.x-0.7*sin(dir+90),
                        this.graphics.arms[key].top.y-0.7*cos(dir+90)
                    )
                    this.layer.triangle(
                        this.graphics.arms[key].top.x*0.95+this.graphics.arms[key].middle.x*0.05,
                        this.graphics.arms[key].top.y*0.95+this.graphics.arms[key].middle.y*0.05,
                        this.graphics.arms[key].top.x+0.7*sin(dir+90),
                        this.graphics.arms[key].top.y+0.7*cos(dir+90),
                        this.graphics.arms[key].top.x-0.7*sin(dir+90),
                        this.graphics.arms[key].top.y-0.7*cos(dir+90)
                    )
                break
            }
        break
        case 'Randy':
            switch(type){
                case 0:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(2.4)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.line(
                            this.graphics.arms[key].middle.x*(0.25+a*0.2)+this.graphics.arms[key].bottom.x*(0.75-a*0.2)+1.8*lsin(dir+90),
                            this.graphics.arms[key].middle.y*(0.25+a*0.2)+this.graphics.arms[key].bottom.y*(0.75-a*0.2)+1.8*lcos(dir+90),
                            this.graphics.arms[key].middle.x*(0.25+a*0.2)+this.graphics.arms[key].bottom.x*(0.75-a*0.2)-1.8*lsin(dir+90),
                            this.graphics.arms[key].middle.y*(0.25+a*0.2)+this.graphics.arms[key].bottom.y*(0.75-a*0.2)-1.8*lcos(dir+90))
                    }
                break
            }
        break
        case 'Sagume':
            dir=[]
            switch(type){
                case 0:
                    dir.push(
                        atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y),
                        atan2(this.graphics.arms[key].top.x-this.graphics.arms[key].middle.x,this.graphics.arms[key].top.y-this.graphics.arms[key].middle.y)
                    )
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.color.dress.sleeve),this.fade*this.fades.dress.sleeve)
                    this.layer.ellipse(this.graphics.arms[key].middle.x,this.graphics.arms[key].middle.y,4.8)
                    this.layer.ellipse(this.graphics.arms[key].top.x,this.graphics.arms[key].top.y,4.3)
                    this.layer.quad(
                        this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1-2.7*sin(dir[0]+90),
                        this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1-2.7*cos(dir[0]+90),
                        this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1+2.7*sin(dir[0]+90),
                        this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1+2.7*cos(dir[0]+90),
                        this.graphics.arms[key].middle.x+2.4*sin(dir[0]+90),
                        this.graphics.arms[key].middle.y+2.4*cos(dir[0]+90),
                        this.graphics.arms[key].middle.x-2.4*sin(dir[0]+90),
                        this.graphics.arms[key].middle.y-2.4*cos(dir[0]+90)
                    )
                    this.layer.quad(
                        this.graphics.arms[key].middle.x-2.4*sin(dir[1]+90),
                        this.graphics.arms[key].middle.y-2.4*cos(dir[1]+90),
                        this.graphics.arms[key].middle.x+2.4*sin(dir[1]+90),
                        this.graphics.arms[key].middle.y+2.4*cos(dir[1]+90),
                        this.graphics.arms[key].top.x+2.15*sin(dir[1]+90),
                        this.graphics.arms[key].top.y+2.15*cos(dir[1]+90),
                        this.graphics.arms[key].top.x-2.15*sin(dir[1]+90),
                        this.graphics.arms[key].top.y-2.15*cos(dir[1]+90)
                    )
                    this.layer.fill(...this.flashColor(this.color.jacket.sleeve),this.fade*this.fades.jacket.sleeve)
                    this.layer.ellipse(this.graphics.arms[key].middle.x,this.graphics.arms[key].middle.y,5.1)
                    this.layer.ellipse(this.graphics.arms[key].top.x,this.graphics.arms[key].top.y,4.5)
                    this.layer.quad(
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25-3*sin(dir[0]+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25-3*cos(dir[0]+90),
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25+3*sin(dir[0]+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25+3*cos(dir[0]+90),
                        this.graphics.arms[key].middle.x+2.55*sin(dir[0]+90),
                        this.graphics.arms[key].middle.y+2.55*cos(dir[0]+90),
                        this.graphics.arms[key].middle.x-2.55*sin(dir[0]+90),
                        this.graphics.arms[key].middle.y-2.55*cos(dir[0]+90)
                    )
                    this.layer.quad(
                        this.graphics.arms[key].middle.x-2.55*sin(dir[1]+90),
                        this.graphics.arms[key].middle.y-2.55*cos(dir[1]+90),
                        this.graphics.arms[key].middle.x+2.55*sin(dir[1]+90),
                        this.graphics.arms[key].middle.y+2.55*cos(dir[1]+90),
                        this.graphics.arms[key].top.x+2.25*sin(dir[1]+90),
                        this.graphics.arms[key].top.y+2.25*cos(dir[1]+90),
                        this.graphics.arms[key].top.x-2.25*sin(dir[1]+90),
                        this.graphics.arms[key].top.y-2.25*cos(dir[1]+90)
                    )
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.color.dress.detail),this.fade*this.fades.dress.sleeve)
                    this.layer.strokeWeight(0.1)
                    for(let a=0,la=4;a<la;a++){
                        let size=dist(
                            this.graphics.arms[key].middle.x*0.12+this.graphics.arms[key].bottom.x*0.88,
                            this.graphics.arms[key].middle.y*0.12+this.graphics.arms[key].bottom.y*0.88,
                            this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85,
                            this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85
                        )
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.12+this.graphics.arms[key].bottom.x*0.88+(-2.7+(a+0.5)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.12+this.graphics.arms[key].bottom.y*0.88+(-2.7+(a+0.5)/la*5.4)*cos(dir[0]+90),
                            this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85+(-2.7+a/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85+(-2.7+a/la*5.4)*cos(dir[0]+90)
                        )
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.18+this.graphics.arms[key].bottom.x*0.82+(-2.7+(a+0.5)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.18+this.graphics.arms[key].bottom.y*0.82+(-2.7+(a+0.5)/la*5.4)*cos(dir[0]+90),
                            this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85+(-2.7+(a+1)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85+(-2.7+(a+1)/la*5.4)*cos(dir[0]+90)
                        )
                        this.layer.arc(
                            this.graphics.arms[key].middle.x*0.135+this.graphics.arms[key].bottom.x*0.865+(-2.7+(a+0.5)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.135+this.graphics.arms[key].bottom.y*0.865+(-2.7+(a+0.5)/la*5.4)*cos(dir[0]+90),
                            size,size,-dir[0]-90,-dir[0]+90
                        )
                        this.layer.arc(
                            this.graphics.arms[key].middle.x*0.165+this.graphics.arms[key].bottom.x*0.835+(-2.7+(a+0.5)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.165+this.graphics.arms[key].bottom.y*0.835+(-2.7+(a+0.5)/la*5.4)*cos(dir[0]+90),
                            size,size,-dir[0]+90,-dir[0]+270
                        )
                    }
                break
                case 1:
                    dir.push(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y))
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.color.dress.sleeve),this.fade*this.fades.dress.sleeve)
                    this.layer.ellipse(this.graphics.arms[key].middle.x,this.graphics.arms[key].middle.y,4.8)
                    this.layer.quad(
                        this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1-2.7*sin(dir[0]+90),
                        this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1-2.7*cos(dir[0]+90),
                        this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1+2.7*sin(dir[0]+90),
                        this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1+2.7*cos(dir[0]+90),
                        this.graphics.arms[key].middle.x+2.4*sin(dir[0]+90),
                        this.graphics.arms[key].middle.y+2.4*cos(dir[0]+90),
                        this.graphics.arms[key].middle.x-2.4*sin(dir[0]+90),
                        this.graphics.arms[key].middle.y-2.4*cos(dir[0]+90)
                    )
                    this.layer.fill(...this.flashColor(this.color.jacket.sleeve),this.fade*this.fades.jacket.sleeve)
                    this.layer.ellipse(this.graphics.arms[key].middle.x,this.graphics.arms[key].middle.y,5.1)
                    this.layer.quad(
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25-3*sin(dir[0]+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25-3*cos(dir[0]+90),
                        this.graphics.arms[key].bottom.x*0.75+this.graphics.arms[key].middle.x*0.25+3*sin(dir[0]+90),
                        this.graphics.arms[key].bottom.y*0.75+this.graphics.arms[key].middle.y*0.25+3*cos(dir[0]+90),
                        this.graphics.arms[key].middle.x+2.55*sin(dir[0]+90),
                        this.graphics.arms[key].middle.y+2.55*cos(dir[0]+90),
                        this.graphics.arms[key].middle.x-2.55*sin(dir[0]+90),
                        this.graphics.arms[key].middle.y-2.55*cos(dir[0]+90)
                    )
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.color.dress.detail),this.fade*this.fades.dress.sleeve)
                    this.layer.strokeWeight(0.1)
                    for(let a=0,la=4;a<la;a++){
                        let size=dist(
                            this.graphics.arms[key].middle.x*0.12+this.graphics.arms[key].bottom.x*0.88,
                            this.graphics.arms[key].middle.y*0.12+this.graphics.arms[key].bottom.y*0.88,
                            this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85,
                            this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85
                        )
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.12+this.graphics.arms[key].bottom.x*0.88+(-2.7+(a+0.5)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.12+this.graphics.arms[key].bottom.y*0.88+(-2.7+(a+0.5)/la*5.4)*cos(dir[0]+90),
                            this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85+(-2.7+a/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85+(-2.7+a/la*5.4)*cos(dir[0]+90)
                        )
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.18+this.graphics.arms[key].bottom.x*0.82+(-2.7+(a+0.5)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.18+this.graphics.arms[key].bottom.y*0.82+(-2.7+(a+0.5)/la*5.4)*cos(dir[0]+90),
                            this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85+(-2.7+(a+1)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85+(-2.7+(a+1)/la*5.4)*cos(dir[0]+90)
                        )
                        this.layer.arc(
                            this.graphics.arms[key].middle.x*0.135+this.graphics.arms[key].bottom.x*0.865+(-2.7+(a+0.5)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.135+this.graphics.arms[key].bottom.y*0.865+(-2.7+(a+0.5)/la*5.4)*cos(dir[0]+90),
                            size,size,-dir[0]-90,-dir[0]+90
                        )
                        this.layer.arc(
                            this.graphics.arms[key].middle.x*0.165+this.graphics.arms[key].bottom.x*0.835+(-2.7+(a+0.5)/la*5.4)*sin(dir[0]+90),
                            this.graphics.arms[key].middle.y*0.165+this.graphics.arms[key].bottom.y*0.835+(-2.7+(a+0.5)/la*5.4)*cos(dir[0]+90),
                            size,size,-dir[0]+90,-dir[0]+270
                        )
                    }
                break
            }
        break
        case 'Ume':
            switch(type){
                case -1:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom-75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(225,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-12,1,24)
                    this.layer.fill(50,255,200)
                    this.layer.ellipse(0,-24,3,3)
                    this.layer.pop()
                break
                default:
                    //minorGraphicDisplay(this.layer,type)
                break
            }
        case 'Goon':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(150,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-18,3,36)
                    this.layer.pop()
                break
            }
        break
        case 'Slaver':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.noFill()
                    this.layer.stroke(200,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.line(0,12,0,-36)
                    this.layer.arc(0,-36,12,24,0,180)
                    this.layer.pop()
                break
            }
        break
        case 'Pointy':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75-key*150))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75-key*150)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75-key*150)*2,-1,1)*this.anim.sword)
                    this.layer.fill(200,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-12,1.5,24)
                    this.layer.pop()
                break
            }
        break
        case 'Romeo':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(80,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-20,2,40)
                    this.layer.pop()
                break
            }
        break
        case 'Batter':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(220,180,60,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-18,6,36)
                    this.layer.arc(0,-36,6,4,-180,0)
                    this.layer.pop()
                break
            }
        break
        case 'Billy Beatup':
            switch(type){
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(1)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(dir+90))
                break
            }
        break
        case 'Lunar Shard': case 'Solar Shard':
            switch(type){
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(2)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.85*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.85*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.85*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.85*lcos(dir+90))
                break
            }
        break
        case 'Coffee Commander':
            switch(type){
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(1.5)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.2+this.graphics.arms[key].bottom.x*0.8+1.8875*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.2+this.graphics.arms[key].bottom.y*0.8+1.8875*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.2+this.graphics.arms[key].bottom.x*0.8-1.8875*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.2+this.graphics.arms[key].bottom.y*0.8-1.8875*lcos(dir+90))
                break
            }
        break
        case 'Swordmaster':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(175,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-25,4,50)
                    this.layer.triangle(-2,-50,2,-50,0,-70)
                    this.layer.fill(125,this.fade)
                    this.layer.rect(1,-25,2,50)
                    this.layer.triangle(2,-50,0,-70,0,-50)
                    for(let g=0;g<4;g++){
                        this.layer.stroke(100+g*10,50+g*10,25+g*10,this.fade)
                        this.layer.strokeWeight(4-g)
                        this.layer.line(0,-4+g/2,0,3-g/2)
                    }
                    this.layer.pop()
                break
            }
        break
        case 'Gas Man':
            switch(type){
                case 1:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x,this.graphics.arms[key].bottom.y)
                    this.layer.fill(100,70,35,this.fade)
                    this.layer.noStroke()
                    this.layer.quad(10,-1,8,-3,4,1,6,3)
                    this.layer.fill(120,90,45,this.fade)
                    this.layer.rect(0,10,12,18,2)
                    this.layer.fill(110,80,40,this.fade)
                    this.layer.rect(0,10,2,18)
                    this.layer.rect(0,10,12,2)
                    this.layer.pop()
                break
            }
        break
        case 'Champion':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(240,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-16,2,32)
                    this.layer.pop()
                break
                case 1:
                    this.layer.fill(...this.color.band,this.fade*this.fades.band)
                    this.layer.noStroke()
                    let dir=atan2(this.graphics.arms[key].top.x-this.graphics.arms[key].middle.x,this.graphics.arms[key].top.y-this.graphics.arms[key].middle.y)
                    this.layer.quad(
                        this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5+2*lsin(dir),
                        this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5+2*lcos(dir),
                        this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5+2*lcos(dir),
                        this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5-2*lsin(dir),
                        this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5-2*lsin(dir),
                        this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5-2*lcos(dir),
                        this.graphics.arms[key].top.x*0.5+this.graphics.arms[key].middle.x*0.5-2*lcos(dir),
                        this.graphics.arms[key].top.y*0.5+this.graphics.arms[key].middle.y*0.5+2*lsin(dir)
                    )
                    dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.quad(
                        this.graphics.arms[key].middle.x*0.5+this.graphics.arms[key].bottom.x*0.5+2*lsin(dir),
                        this.graphics.arms[key].middle.y*0.5+this.graphics.arms[key].bottom.y*0.5+2*lcos(dir),
                        this.graphics.arms[key].middle.x*0.5+this.graphics.arms[key].bottom.x*0.5+2*lcos(dir),
                        this.graphics.arms[key].middle.y*0.5+this.graphics.arms[key].bottom.y*0.5-2*lsin(dir),
                        this.graphics.arms[key].middle.x*0.5+this.graphics.arms[key].bottom.x*0.5-2*lsin(dir),
                        this.graphics.arms[key].middle.y*0.5+this.graphics.arms[key].bottom.y*0.5-2*lcos(dir),
                        this.graphics.arms[key].middle.x*0.5+this.graphics.arms[key].bottom.x*0.5-2*lcos(dir),
                        this.graphics.arms[key].middle.y*0.5+this.graphics.arms[key].bottom.y*0.5+2*lsin(dir)
                    )
                break
            }
        break
        case 'Assistant Hiring Officer':
            switch(type){
                case 1:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x,this.graphics.arms[key].bottom.y)
                    this.layer.noStroke()
                    this.layer.fill(90,60,30,this.fade)
                    this.layer.rect(0,10,12,18,2)
                    this.layer.fill(220,this.fade)
                    this.layer.rect(0,10,10,16)
                    this.layer.fill(0,this.fade)
                    this.layer.rect(0,4,8,1)
                    this.layer.rect(0,6,8,1)
                    this.layer.pop()
                break
            }
        break
        case 'Purge X02':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.85+this.graphics.arms[key].middle.x*0.15,this.graphics.arms[key].bottom.y*0.85+this.graphics.arms[key].middle.y*0.15)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.stroke(175,75,175,this.fade/2)
                    this.layer.strokeWeight(12)
                    this.layer.line(0,0,0,-36)
                    this.layer.stroke(175,75,175,this.fade)
                    this.layer.strokeWeight(6)
                    this.layer.line(0,0,0,-36)
                    this.layer.pop()
                break
            }
        break
        case 'Billy Beatup':
            switch(type){
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(1.5)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.35+this.graphics.arms[key].bottom.x*0.65+1.9*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.35+this.graphics.arms[key].bottom.y*0.65+1.9*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.35+this.graphics.arms[key].bottom.x*0.65-1.9*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.35+this.graphics.arms[key].bottom.y*0.65-1.9*lcos(dir+90))
                break
            }
        break
        case 'Vengeful':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.stroke(60,145,255,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.line(0,0,0,-32)
                    this.layer.pop()
                break
            }
        break
        case 'Lunaria':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.stroke(90,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.fill(135,this.fade/2)
                    this.layer.line(0,10,0,-30)
                    this.layer.line(0,-30,-3,-27)
                    this.layer.line(0,-30,3,-27)
                    this.layer.ellipse(-5,-20,10,10)
                    this.layer.ellipse(5,-20,10,10)
                    this.layer.fill(255,this.fade)
                    this.layer.stroke(255,235,235,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.beginShape()
                    this.layer.vertex(-5,-18)
                    this.layer.bezierVertex(-4,-19,-4,-21,-5,-22)
                    this.layer.bezierVertex(-4.5,-21,-4.5,-19,-5,-18)
                    this.layer.bezierVertex(-4,-19,-4,-21,-5,-22)
                    this.layer.bezierVertex(-4.5,-21,-4.5,-19,-5,-18)
                    this.layer.endShape()
                    this.layer.noFill()
                    this.layer.stroke(255,145,70,this.fade)
                    this.layer.ellipse(5,-20,5,5)
                    for(g=0,lg=8;g<lg;g++){
                        this.layer.line(5+2.5*lsin(g/lg*360),-20+2.5*lcos(g/lg*360),5+3.5*lsin(g/lg*360),-20+3.5*lcos(g/lg*360))
                    }
                    this.layer.pop()
                break
            }
        break
        case 'Divine Guard':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.stroke(255,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.line(4,-32,-4,-34)
                    this.layer.line(4,-28,-4,-30)
                    this.layer.stroke(180,150,60,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.line(0,7,0,-38)
                    this.layer.stroke(255,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.line(-4,-34,4,-36)
                    this.layer.line(-4,-30,4,-32)
                    this.layer.line(-4,-26,4,-28)
                    this.layer.noStroke()
                    this.layer.fill(255,250,220,this.fade)
                    this.layer.triangle(-6,-40,6,-40,0,-52)
                    this.layer.pop()
                break
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(1.5)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.35+this.graphics.arms[key].bottom.x*0.65+1.8875*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.35+this.graphics.arms[key].bottom.y*0.65+1.8875*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.35+this.graphics.arms[key].bottom.x*0.65-1.8875*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.35+this.graphics.arms[key].bottom.y*0.65-1.8875*lcos(dir+90))
                break
            }
        break
        case 'Avant Guard':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.noStroke()
                    this.layer.fill(10,12,14,this.fade)
                    this.layer.rect(0,-11,4,44)
                    this.layer.fill(30,36,42,this.fade)
                    this.layer.arc(0,-33,36,36,-45,45)
                    this.layer.arc(0,-33,36,36,135,225)
                    this.layer.fill(255,250,215,this.fade)
                    this.layer.arc(0,-33,24,24,-45,45)
                    this.layer.arc(0,-33,24,24,135,225)
                    this.layer.fill(30,36,42,this.fade)
                    this.layer.arc(0,-33,21,21,-45,45)
                    this.layer.arc(0,-33,21,21,135,225)
                    this.layer.ellipse(0,-33,6,6)
                    this.layer.pop()
                break
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(1)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.275+this.graphics.arms[key].bottom.x*0.725+1.9*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.275+this.graphics.arms[key].bottom.y*0.725+1.9*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.275+this.graphics.arms[key].bottom.x*0.725-1.9*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.275+this.graphics.arms[key].bottom.y*0.725-1.9*lcos(dir+90))
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85+1.9*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85+1.9*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85-1.9*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85-1.9*lcos(dir+90))
                break
            }
        break
        case 'Navigator':
            switch(type){
                case 1:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x,this.graphics.arms[key].bottom.y)
                    this.layer.noStroke()
                    this.layer.fill(200,180,40,this.fade)
                    this.layer.rect(0,10,12,18,2)
                    this.layer.fill(200,160,20,this.fade)
                    this.layer.rect(0,10,10,16)
                    this.layer.fill(160,120,0,this.fade)
                    this.layer.rect(0,6,1,6)
                    this.layer.rect(0,14,1,6)
                    this.layer.rect(-3,10,1,6)
                    this.layer.rect(3,10,1,6)
                    this.layer.pop()
                break
            }
        break
        case 'Rich Kid':
            switch(type){
                case 1:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x,this.graphics.arms[key].bottom.y)
                    this.layer.noStroke()
                    this.layer.fill(this.color.chocolate[0],this.color.chocolate[1],this.color.chocolate[2],this.fade*this.fades.chocolate)
                    this.layer.rect(0,4,13,9)
                    this.layer.fill(this.color.chocolate[0]-20,this.color.chocolate[1]-20,this.color.chocolate[2]-20,this.fade*this.fades.chocolate)
                    this.layer.rect(-4,2,3,3)
                    this.layer.rect(-4,6,3,3)
                    this.layer.rect(0,2,3,3)
                    this.layer.rect(0,6,3,3)
                    this.layer.rect(4,2,3,3)
                    this.layer.rect(4,6,3,3)
                    this.layer.pop()
                break
            }
        break
        case 'Boss1':
            switch(type){
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(1.2)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.375+this.graphics.arms[key].bottom.x*0.625+1.925*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.375+this.graphics.arms[key].bottom.y*0.625+1.925*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.375+this.graphics.arms[key].bottom.x*0.625-1.925*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.375+this.graphics.arms[key].bottom.y*0.625-1.925*lcos(dir+90))
                break
            }
        break
        case 'Legacy':
            switch(type){
                case 1:
                    this.layer.stroke(this.color.eyeBeam[0],this.color.eyeBeam[1],this.color.eyeBeam[2],this.fade*this.fades.eyeBeam)
                    this.layer.strokeWeight((8+2*lsin(this.time*2)-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    if(this.anim.eye[key]==0){
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    }else{
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                    }
                break
            }
        break
        case 'Dimension Wanderer':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.noStroke()
                    this.layer.fill(250,250,240,this.fade)
                    this.layer.rect(0,-16,1,32)
                    this.layer.fill(225,250,200,this.fade)
                    this.layer.ellipse(0,-38,6,6)
                    this.layer.stroke(250,250,240,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.noFill()
                    this.layer.ellipse(0,-38,12,12)
                    this.layer.line(0,-32,0,-44)
                    this.layer.pop()
                break
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.noStroke()
                    this.layer.fill(this.color.diamond[0],this.color.diamond[1],this.color.diamond[2],this.fade*this.fades.diamond)
                    this.layer.quad(
                        this.graphics.arms[key].middle.x*0.5+this.graphics.arms[key].bottom.x*0.5-3.5*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.5+this.graphics.arms[key].bottom.y*0.5-3.5*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.3+this.graphics.arms[key].bottom.x*0.7,
                        this.graphics.arms[key].middle.y*0.3+this.graphics.arms[key].bottom.y*0.7,
                        this.graphics.arms[key].middle.x*0.5+this.graphics.arms[key].bottom.x*0.5+3.5*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.5+this.graphics.arms[key].bottom.y*0.5+3.5*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.7+this.graphics.arms[key].bottom.x*0.3,
                        this.graphics.arms[key].middle.y*0.7+this.graphics.arms[key].bottom.y*0.3
                    )
                break
            }
        break
        case 'Crusader':
            switch(type){
                case 1:
                    let dir=atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)
                    this.layer.stroke(...this.color.band,this.fade*this.fades.band)
                    this.layer.strokeWeight(1)
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.3+this.graphics.arms[key].bottom.x*0.7+1.925*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.3+this.graphics.arms[key].bottom.y*0.7+1.925*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.3+this.graphics.arms[key].bottom.x*0.7-1.925*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.3+this.graphics.arms[key].bottom.y*0.7-1.925*lcos(dir+90))
                    this.layer.line(
                        this.graphics.arms[key].middle.x*0.4+this.graphics.arms[key].bottom.x*0.6+1.925*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.4+this.graphics.arms[key].bottom.y*0.6+1.925*lcos(dir+90),
                        this.graphics.arms[key].middle.x*0.4+this.graphics.arms[key].bottom.x*0.6-1.925*lsin(dir+90),
                        this.graphics.arms[key].middle.y*0.4+this.graphics.arms[key].bottom.y*0.6-1.925*lcos(dir+90))
                break
            }
        break
        case 'Daughter of Heaven':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.noStroke()
                    for(let a=0,la=10;a<la;a++){
                        let merge=mergeColor([192,115,110],[228,222,215],a/la)
                        this.layer.fill(...merge,this.fade)
                        pentagon(this.layer,-2*(1-a/la),0,-2*(1-a/la),-45,0,-60,2*(1-a/la),-45,2*(1-a/la),0)
                    }
                    this.layer.fill(98,85,82)
                    this.layer.rect(0,-6,4,12)
                    this.layer.quad(-4,-12,4,-12,2,-9,-2,-9)
                    this.layer.fill(73,61,62)
                    this.layer.rect(0,-6,2,12)
                    this.layer.quad(-3,-12,3,-12,1,-9,-1,-9)
                    this.layer.fill(159,21,37)
                    this.layer.ellipse(0,0,6)
                    this.layer.pop()
                break
            }
        break
        case 'Pure Swordsman':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(240,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-16,2,32)
                    this.layer.pop()
                break
            }
        break
        case 'Old Konaian':
            switch(type){
                case 0:
                    this.layer.push()
                    this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                    this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                    this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                    this.layer.fill(175,this.fade)
                    this.layer.noStroke()
                    this.layer.rect(0,-20,3,40)
                    this.layer.triangle(-2,-45,2,-45,0,-60)
                    this.layer.quad(-2,-45,2,-45,1.5,-40,-1.5,-40)
                    this.layer.fill(125,this.fade)
                    this.layer.rect(0.75,-20,1.5,40)
                    this.layer.triangle(2,-45,0,-60,0,-45)
                    this.layer.quad(0,-45,2,-45,1.5,-40,0,-40)
                    for(let g=0;g<4;g++){
                        this.layer.stroke(100+g*10,50+g*10,25+g*10,this.fade)
                        this.layer.strokeWeight(4-g)
                        this.layer.line(0,-4+g/2,0,3-g/2)
                    }
                    this.layer.pop()
                break
            }
        break
    }
}
combatant.prototype.minorDisplayGeneral=function(type,key){
    switch(type){
        case 0:
            this.layer.noFill()
            if(this.anim.eyeStyle[key]==6&&this.anim.eye[key]>0){
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*4,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2+this.anim.eye[key]*4,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2+this.anim.eye[key]*2)
            }else if(this.anim.eyeStyle[key]==5){
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((6-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                if(this.anim.eye[key]==0){
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                }else{
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                }
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((6-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                if(this.anim.eye[key]==0){
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                }else{
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                }
                if(this.anim.eye[key]==0&&constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1)>0){
                    this.layer.stroke(...this.color.eye.glow,this.fade*this.fades.eye[key]/4)
                    this.layer.strokeWeight(0.6)
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*(this.parts.minor+0.5),this.parts.eyeLevel,2.7*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),2.7*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-72,-12)
                    if(this.anim.eyeStyle[key]==4){
                        this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                        this.layer.strokeWeight(0.5)
                        this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,10*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),10*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-165+key*90,-105+key*90)
                    }
                }
            }else if(this.anim.eyeStyle[key]==3&&this.anim.eye[key]>0){
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
            }else if(this.anim.eyeStyle[key]==2&&this.anim.eye[key]>0){
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
            }else if(this.anim.eyeStyle[key]==1&&this.anim.eye[key]>0){                    
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
            }else if(this.name=='Decratite'){
                for(let c=0,lc=8;c<lc;c++){
                    this.layer.stroke(...upColor(this.color.eye.back,50,[[1,1,1],[2,1,2],[1,1,2],[1,2,1],[2,2,1],[2,1.5,1],[2,1,1],[1.5,2,2]][c]),this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1)*(1-c/lc*0.5))
                    if(this.anim.eye[key]==0){
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    }else{
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                    }
                }
                if(this.anim.eye[key]==0&&constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1)>0){
                    this.layer.stroke(...this.color.eye.glow,this.fade*this.fades.eye[key]/4)
                    this.layer.strokeWeight(0.6)
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*(this.parts.minor+0.5),this.parts.eyeLevel,1.8*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),1.8*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-72,-12)
                    if(this.anim.eyeStyle[key]==4){
                        this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                        this.layer.strokeWeight(0.5)
                        this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,6.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),6.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-165+key*90,-105+key*90)
                    }
                }
            }else{
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                if(this.anim.eye[key]==0){
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                }else{
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                }
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                if(this.anim.eye[key]==0){
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                }else{
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                }
                if(this.anim.eye[key]==0&&constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1)>0){
                    this.layer.stroke(...this.color.eye.glow,this.fade*this.fades.eye[key]/4)
                    this.layer.strokeWeight(0.6)
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*(this.parts.minor+0.5),this.parts.eyeLevel,1.8*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),1.8*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-72,-12)
                    if(this.anim.eyeStyle[key]==4){
                        this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                        this.layer.strokeWeight(0.5)
                        this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,6.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),6.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-165+key*90,-105+key*90)
                    }
                }
            }
        break
        case 1:
            this.calc.int=this.anim.mouth.x/this.anim.mouth.y*lcos(this.anim.direction)/(0.5+lcos(this.anim.direction)*0.5)
            if(this.anim.mouth.open>0){
                this.layer.fill(this.color.mouth.in[0],this.color.mouth.in[1],this.color.mouth.in[2],this.fade*this.fades.mouth)
            }else{
                this.layer.noFill()
            }
            this.layer.stroke(this.color.mouth.out[0],this.color.mouth.out[1],this.color.mouth.out[2],this.fade*this.fades.mouth)
            this.layer.strokeWeight(0.5-this.anim.mouth.open*0.25)
            this.layer.arc(lsin(this.anim.direction)*(this.parts.minor-2),this.parts.mouth,this.anim.mouth.x*lcos(this.anim.direction),this.anim.mouth.y*(0.5+lcos(this.anim.direction)*0.5),this.spin.mouth,180-this.spin.mouth)
            this.layer.strokeWeight(0.25*this.anim.mouth.open)
            this.layer.line(lsin(this.anim.direction)*(this.parts.minor-2)-this.anim.mouth.x/2*lcos(this.anim.direction),this.parts.mouth,lsin(this.anim.direction)*(this.parts.minor-2)+this.anim.mouth.x/2*lcos(this.anim.direction),this.parts.mouth)
        break
        case 2:
            this.layer.noFill()
            if(this.anim.eyeStyle[key]==3&&this.anim.eye[key]>0){
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((2.5-this.anim.eye[key]*1.75)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((2-this.anim.eye[key]*1.25)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
            }else if(this.anim.eyeStyle[key]==2&&this.anim.eye[key]>0){
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((2.5-this.anim.eye[key]*1.75)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((2-this.anim.eye[key]*1.25)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
            }else if(this.anim.eyeStyle[key]==1&&this.anim.eye[key]>0){                    
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((2.5-this.anim.eye[key]*1.75)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((2-this.anim.eye[key]*1.25)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
            }else{
                this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((2.5-this.anim.eye[key]*1.75)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                if(this.anim.eye[key]==0){
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                }else{
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                }
                this.layer.stroke(...this.color.eye.front,this.fade*this.fades.eye[key])
                this.layer.strokeWeight((2-this.anim.eye[key]*1.25)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                if(this.anim.eye[key]==0){
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                    this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                }else{
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                }
                if(this.anim.eye[key]==0&&constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1)>0){
                    this.layer.stroke(...this.color.eye.glow,this.fade*this.fades.eye[key]/4)
                    this.layer.strokeWeight(0.4)
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*(this.parts.minor+0.5),this.parts.eyeLevel,1.2*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),1.2*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-72,-12)
                    if(this.anim.eyeStyle[key]==4){
                        this.layer.stroke(...this.color.eye.back,this.fade*this.fades.eye[key])
                        this.layer.strokeWeight(0.3)
                        this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,4.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),4.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-165+key*90,-105+key*90)
                    }
                }
            }
        break
    }
}