function displayTrianglesBack(layer,parts,direction,base,width,weight,slant,color,fade){
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
function displayTrianglesFront(layer,parts,direction,base,width,weight,slant,color,fade){
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
function displayTrianglesBackMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
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
function displayTrianglesFrontMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
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
function controlSpin(set,direction,spec){
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
function generateSprite(layer,type,direction){
	switch(type){
		case 0:
			controlSpin(graphics.combatant[0].parts.hair.inside,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[0].parts.hair.inside,direction,0,33,1,0.1,graphics.combatant[0].color.hair.insideFront,1)
			controlSpin(graphics.combatant[0].parts.hair.main,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[0].parts.hair.main,direction,0,35,1,0.1,graphics.combatant[0].color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
		break
		case 1:
			this.displayTrianglesBack(layer,graphics.combatant[0].parts.hair.main,direction,0,35,1,0.1,graphics.combatant[0].color.hair.back,1)
			this.displayTrianglesBack(layer,graphics.combatant[0].parts.hair.inside,direction,0,33,1,0.1,graphics.combatant[0].color.hair.insideBack,1)
		break
		case 2:
			controlSpin(graphics.combatant[0].parts.kimono.outside,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[0].parts.kimono.outside,direction,20,9,0.5,0.2,graphics.combatant[0].color.kimono.outside.start,graphics.combatant[0].color.kimono.outside.end,1)
			controlSpin(graphics.combatant[0].parts.kimono.outsideTop,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[0].parts.kimono.outsideTop,direction,20,9,0.5,0.2,graphics.combatant[0].color.kimono.outside.start,graphics.combatant[0].color.kimono.outside.end,1)
		break
		case 3:
			this.displayTrianglesBackMerge(layer,graphics.combatant[0].parts.kimono.outside,direction,20,9,0.5,0.2,graphics.combatant[0].color.kimono.outsideBack.start,graphics.combatant[0].color.kimono.outsideBack.end,1)
		break
		case 4:
			controlSpin(graphics.combatant[0].parts.kimono.main,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[0].parts.kimono.main,direction,20,9.25,0.5,0.16,graphics.combatant[0].color.kimono.main.start,graphics.combatant[0].color.kimono.main.end,1)
		break
		case 5:
			this.displayTrianglesBackMerge(layer,graphics.combatant[0].parts.kimono.main,direction,20,9.25,0.5,0.16,graphics.combatant[0].color.kimono.mainBack.start,graphics.combatant[0].color.kimono.mainBack.end,1)
		break
	}
}
function setupGraphics(){
	angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
	graphics.main=createGraphics(900,600)
	setupLayer(graphics.main)
	graphics.backgrounds=[]
	for(let a=0;a<10;a++){
		graphics.backgrounds.push(createGraphics(1800,1200))
		setupLayer(graphics.backgrounds[a])
	}
	graphics.minor=[]
    for(let g=0;g<86;g++){
		graphics.minor.push(createGraphics(160,160))
	}
	for(let a=0,la=graphics.minor.length;a<la;a++){
		setupLayer(graphics.minor[a])
	}

	graphics.combatant.push({
		sprites:{detail:3,genAmount:0,animDirection:0,hair:{back:[],front:[],tail:[]},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]}}},
		parts:{tail:[],kimono:{main:[],outside:[],outsideTop:[]}},
		color:{
			hair:{back:[30,70,40],front:[40,90,50],insideBack:[25,60,35],insideFront:[35,80,45],glow:[50,110,60]},
			skin:{head:[255,225,200],body:[255,215,190],legs:[255,215,190],arms:[255,215,190],button:[245,180,145]},
			eye:{back:[40,70,45],front:[10,30,15],glow:[175,255,175]},
			under:{outside:[50,125,50],fringe:[100,200,100],tanga:[200,210,200],bow:[200,255,200],decoration:[50,175,50],under:{top:[250,195,170],button:[200,145,120],bottom:[[255,228,181],[241,178,131]]}},
			kimono:{main:{start:[90,110,105],end:[150,170,165]},mainBack:{start:[30,60,40],end:[70,100,80]},decoration:[[75,175,75],[100,250,100]],
			outside:{start:[110,180,120],end:[115,215,180]},outsideBack:{start:[70,120,80],end:[75,155,140]},
			bow:[125,225,175]},
			band:[100,165,100],mouth:{in:[225,125,125],out:[0,0,0]},
		}
	})

	graphics.combatant[0].parts.hair={
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

    graphics.minor[0].translate(80,80)
    for(let g=0;g<4;g+=0.25){
        graphics.minor[0].fill(80+g*32,200+g*20,80+g*32)
        graphics.minor[0].triangle(0,0,15+g*2,45-g*5,45-g*5,15+g*2)
        graphics.minor[0].triangle(0,0,-15-g*2,-45+g*5,-45+g*5,-15-g*2)
    }

    graphics.minor[1].noStroke()
	graphics.minor[1].fill(150,160,196)
	graphics.minor[1].rect(80,80,100,20)
    graphics.minor[1].ellipse(80,70,100,100)
    graphics.minor[1].ellipse(80,90,100,100)
	graphics.minor[1].fill(105,112,137)
    graphics.minor[1].rect(80,70,100,6)
    graphics.minor[1].rect(80,90,100,6)
	graphics.minor[1].quad(36,47,124,47,127,53,33,53)
	graphics.minor[1].quad(36,113,124,113,127,107,33,107)
    graphics.minor[1].quad(54,27,106,27,114,33,46,33)
	graphics.minor[1].quad(54,133,106,133,114,127,46,127)

	for(let g=0;g<8;g++){
		graphics.minor[g*2+2].stroke(95,55,65)
		graphics.minor[g*2+2].strokeWeight(20)
		graphics.minor[g*2+2].line(24+g*7,46+g*13,31+g*7,59+g*13)
		graphics.minor[g*2+3].stroke(95,55,65)
		graphics.minor[g*2+3].strokeWeight(20)
		graphics.minor[g*2+3].line(136-g*7,46+g*13,129-g*7,59+g*13)
	}

	graphics.combatant[0].sprites.genAmount=360/graphics.combatant[0].sprites.detail

	for(let g=0;g<5;g++){
		graphics.combatant[0].parts.kimono.main.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,13.5+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[13.5+g*4.5,0,14+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,16+g*4.5,14+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,16+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[16+g*4.5,0,15.5+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,18+g*4.5,15.5+g*4.5]})
	}
	graphics.combatant[0].parts.kimono.main.push({spin:[117,132,132],y:[0,0,36]})
	for(let g=0;g<2;g++){
		graphics.combatant[0].parts.kimono.main.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,34,36+g*0.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,34]})
		graphics.combatant[0].parts.kimono.main.push({spin:[146+g*48,156+g*48,156+g*48],y:[34,0,35]})
		graphics.combatant[0].parts.kimono.main.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,34,35]})
		graphics.combatant[0].parts.kimono.main.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,34]})
		graphics.combatant[0].parts.kimono.main.push({spin:[166+g*48,180+g*48,180+g*48],y:[34,0,36.5-g*0.5]})
	}
	graphics.combatant[0].parts.kimono.main.push({spin:[228,243,228],y:[0,0,36]})
	for(let g=4;g>=-3;g--){
		graphics.combatant[0].parts.kimono.main.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,18+g*4.5,15.5+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[84-g*48,75-g*48,72-g*48],y:[16+g*4.5,0,15.5+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,16+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,16+g*4.5,14+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[108-g*48,92-g*48,87-g*48],y:[13.5+g*4.5,0,14+g*4.5]})
		graphics.combatant[0].parts.kimono.main.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,13.5+g*4.5]})
	}
	for(let g=1;g<5;g++){
		graphics.combatant[0].parts.kimono.outside.push({spin:[-90+g*48,-36+g*48,-48+g*48],y:[0,0,16+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[-48+g*48,-32+g*48,-27+g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[-32+g*48,-24+g*48,-27+g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[-32+g*48,-8+g*48,-24+g*48],y:[0,0,17.5+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[-24+g*48,-15+g*48,-12+g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[-15+g*48,g*48,-12+g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
	}
	for(let g=4;g>=0;g--){
		graphics.combatant[0].parts.kimono.outside.push({spin:[15-g*48,-g*48,12-g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[24-g*48,15-g*48,12-g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[32-g*48,8-g*48,24-g*48],y:[0,0,17.5+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[32-g*48,24-g*48,27-g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[48-g*48,32-g*48,27-g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
		graphics.combatant[0].parts.kimono.outside.push({spin:[60-g*48,36-g*48,48-g*48],y:[0,0,16+g*5.5-15]})
	}
	for(let g=0;g<12;g++){
		graphics.combatant[0].parts.kimono.outsideTop.push({spin:[-90-g*30,-60-g*30,-75-g*30],y:[0,0,-0.5]})
	}

	graphics.combatant[0].sprites.hair={front:[],back:[]}
	for(let g=0;g<graphics.combatant[0].sprites.genAmount;g++){
		graphics.combatant[0].sprites.hair.front.push(createGraphics(250,500))
		setupLayer(graphics.combatant[0].sprites.hair.front[g])
		graphics.combatant[0].sprites.hair.front[g].translate(125,100)
		graphics.combatant[0].sprites.hair.front[g].scale(5)
		generateSprite(graphics.combatant[0].sprites.hair.front[g],0,g*graphics.combatant[0].sprites.detail)
		print('Generated HF-'+(g+1))
		graphics.combatant[0].sprites.hair.back.push(createGraphics(250,500))
		setupLayer(graphics.combatant[0].sprites.hair.back[g])
		graphics.combatant[0].sprites.hair.back[g].translate(125,100)
		graphics.combatant[0].sprites.hair.back[g].scale(5)
		generateSprite(graphics.combatant[0].sprites.hair.back[g],1,g*graphics.combatant[0].sprites.detail)
		print('Generated HB-'+(g+1))
	}
	graphics.combatant[0].sprites.kimono.main={front:[],back:[]}
	for(let g=0;g<graphics.combatant[0].sprites.genAmount;g++){
		graphics.combatant[0].sprites.kimono.main.front.push(createGraphics(150,330))
		setupLayer(graphics.combatant[0].sprites.kimono.main.front[g])
		graphics.combatant[0].sprites.kimono.main.front[g].translate(75,0)
		graphics.combatant[0].sprites.kimono.main.front[g].scale(5)
		generateSprite(graphics.combatant[0].sprites.kimono.main.front[g],4,g*graphics.combatant[0].sprites.detail)
		print('Generated KMF-'+(g+1))
		graphics.combatant[0].sprites.kimono.main.back.push(createGraphics(150,330))
		setupLayer(graphics.combatant[0].sprites.kimono.main.back[g])
		graphics.combatant[0].sprites.kimono.main.back[g].translate(75,0)
		graphics.combatant[0].sprites.kimono.main.back[g].scale(5)
		generateSprite(graphics.combatant[0].sprites.kimono.main.back[g],5,g*graphics.combatant[0].sprites.detail)
		print('Generated KMB-'+(g+1))
	}
	graphics.combatant[0].sprites.kimono.outside={front:[],back:[]}
	for(let g=0;g<graphics.combatant[0].sprites.genAmount;g++){
		graphics.combatant[0].sprites.kimono.outside.front.push(createGraphics(150,330))
		setupLayer(graphics.combatant[0].sprites.kimono.outside.front[g])
		graphics.combatant[0].sprites.kimono.outside.front[g].translate(75,0)
		graphics.combatant[0].sprites.kimono.outside.front[g].scale(5)
		generateSprite(graphics.combatant[0].sprites.kimono.outside.front[g],2,g*graphics.combatant[0].sprites.detail)
		print('Generated KOF-'+(g+1))
		graphics.combatant[0].sprites.kimono.outside.back.push(createGraphics(150,330))
		setupLayer(graphics.combatant[0].sprites.kimono.outside.back[g])
		graphics.combatant[0].sprites.kimono.outside.back[g].translate(75,0)
		graphics.combatant[0].sprites.kimono.outside.back[g].scale(5)
		generateSprite(graphics.combatant[0].sprites.kimono.outside.back[g],3,g*graphics.combatant[0].sprites.detail)
		print('Generated KOB-'+(g+1))
	}
}