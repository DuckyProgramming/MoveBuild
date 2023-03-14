function displayTrianglesBack(layer,parts,direction,base,width,weight,slant,color,fade){
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
		if(color1==-1){
			layer.fill(0,fade)
			layer.stroke(0,fade)
			layer.erase(fade,fade)
		}else{
			layer.fill(color1[0]*g/lg+color2[0]*(1-g/lg),color1[1]*g/lg+color2[1]*(1-g/lg),color1[2]*g/lg+color2[2]*(1-g/lg),fade)
			layer.stroke(color1[0]*g/lg+color2[0]*(1-g/lg),color1[1]*g/lg+color2[1]*(1-g/lg),color1[2]*g/lg+color2[2]*(1-g/lg),fade)
		}
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
		if(color1==-1){
			layer.fill(0,fade)
			layer.stroke(0,fade)
			layer.erase(fade,fade)
		}else{
			layer.fill(color1[0]*g/lg+color2[0]*(1-g/lg),color1[1]*g/lg+color2[1]*(1-g/lg),color1[2]*g/lg+color2[2]*(1-g/lg),fade)
			layer.stroke(color1[0]*g/lg+color2[0]*(1-g/lg),color1[1]*g/lg+color2[1]*(1-g/lg),color1[2]*g/lg+color2[2]*(1-g/lg),fade)
		}
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
			controlSpin(graphics.combatant[graphics.combatant.length-1].parts.hair.inside,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.hair.inside,direction,0,33,1,-0.05,graphics.combatant[graphics.combatant.length-1].color.hair.insideFront,1)
			controlSpin(graphics.combatant[graphics.combatant.length-1].parts.hair.main,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.hair.main,direction,0,35,1,-0.05,graphics.combatant[graphics.combatant.length-1].color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
		break
		case 1:
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.hair.main,direction,0,35,1,-0.05,graphics.combatant[graphics.combatant.length-1].color.hair.back,1)
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.hair.inside,direction,0,33,1,-0.05,graphics.combatant[graphics.combatant.length-1].color.hair.insideBack,1)
		break
		case 2:
			controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.main,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.main,direction,20,9.25,0.5,0.16,graphics.combatant[graphics.combatant.length-1].color.kimono.main.start,graphics.combatant[graphics.combatant.length-1].color.kimono.main.end,1)
		break
		case 3:
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.main,direction,20,9.25,0.5,0.16,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.start,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.end,1)
		break
		case 4:
			controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.outside,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outside,direction,20,9,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,1)
			controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop,direction,20,9,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,1)
		break
		case 5:
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outside,direction,20,9,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideBack.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideBack.end,1)
		break
		case 6:
			controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage,direction,20,9.25,0.5,0.16,graphics.combatant[graphics.combatant.length-1].color.kimono.main.start,graphics.combatant[graphics.combatant.length-1].color.kimono.main.end,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainAnti,direction,20,9.25,0.5,0.16,-1,-1,1)
		break
		case 7:
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage,direction,20,9.25,0.5,0.16,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.start,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.end,1)
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainAnti,direction,20,9.25,0.5,0.16,-1,-1,1)
		break
		case 8:
			controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage,direction,20,9,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,1)
			controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop,direction,20,9,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideAnti,direction,20,9,0.5,0.2,-1,-1,1)
		break
		case 9:
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage,direction,20,9,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideBack.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideBack.end,1)
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideAnti,direction,20,9,0.5,0.2,-1,-1,1)
		break
	}
}
function setupCombatantGraphics(type){
	switch(type){
		case 0:
			graphics.combatant.push({
				sprites:{detail:3,genAmount:0,animDirection:0,hair:{back:[],front:[],tail:[]},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]},mainDamage:{back:[],front:[]},outsideDamage:{back:[],front:[]}}},
				parts:{tail:[],kimono:{main:[],outside:[],outsideTop:[],mainDamage:[],outsideDamage:[],mainAnti:[],outsideAnti:[]}},
				color:{
					hair:{back:[30,70,40],front:[40,90,50],insideBack:[25,60,35],insideFront:[35,80,45],glow:[50,110,60]},
					skin:{head:[255,225,200],body:[255,215,190],legs:[255,215,190],arms:[255,215,190],button:[245,180,145]},
					eye:{back:[40,70,45],front:[10,30,15],glow:[175,255,175]},
					under:{outside:[50,125,50],fringe:[100,200,100],tanga:[200,210,200],bow:[200,255,200],decoration:[50,175,50],under:{top:[250,195,170],button:[200,145,120],bottom:[[255,228,181],[241,178,131]]}},
					kimono:{main:{start:[90,110,105],end:[150,170,165]},mainBack:{start:[30,60,40],end:[70,100,80]},decoration:[[75,175,75],[100,250,100]],
					outside:{start:[110,180,120],end:[115,215,180]},outsideBack:{start:[70,120,80],end:[75,155,140]},
					bow:[125,225,175]},
					band:[[100,165,100],[150,200,150],[100,225,100]],mouth:{in:[225,125,125],out:[0,0,0]},
				}
			})
		
			graphics.combatant[graphics.combatant.length-1].parts.hair={
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

			for(let g=0;g<23;g++){
				graphics.minor.push(createGraphics(160,160))
				setupLayer(graphics.minor[graphics.minor.length-1])
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

			graphics.minor[18].translate(80,80)
			for(let g=0,lg=8;g<lg;g++){
				graphics.minor[18].rotate(19-g)
				graphics.minor[18].fill(100+g*20,50+g*15,150+g*5)
				for(let h=0;h<12;h++){
					graphics.minor[18].rotate(30)
					graphics.minor[18].ellipse(0,(24-g)*(1-g/lg),15*(1-g/lg),30*(1-g/lg))
				}
			}
			graphics.minor[18].rotate(12)
			graphics.minor[18].fill(50,0,100)
			for(let h=0;h<5;h++){
				graphics.minor[18].rotate(72)
				graphics.minor[18].rect(0,-6,2,12)
				graphics.minor[18].ellipse(0,-12,4,4)
			}

			graphics.minor[19].translate(80,80)
			for(let g=0,lg=8;g<lg;g++){
				graphics.minor[19].rotate(26-g)
				graphics.minor[19].fill(125+g*15,50+g*15,125+g*10)
				for(let h=0;h<8;h++){
					graphics.minor[19].rotate(45)
					graphics.minor[19].ellipse(0,(24-g)*(1-g/lg),18*(1-g/lg),30*(1-g/lg))
				}
			}
			graphics.minor[19].rotate(48)
			graphics.minor[19].fill(75,0,75)
			for(let h=0;h<5;h++){
				graphics.minor[19].rotate(72)
				graphics.minor[19].rect(0,-6,2,12)
				graphics.minor[19].ellipse(0,-12,4,4)
			}

			graphics.minor[20].translate(80,80)
			for(let g=0;g<4;g+=0.25){
				graphics.minor[20].fill(80+g*32,200+g*20,80+g*32)
				graphics.minor[20].triangle(0,0,15+g*2,45-g*5,45-g*5,15+g*2)
				graphics.minor[20].triangle(0,0,-15-g*2,-45+g*5,-45+g*5,-15-g*2)
			}
			graphics.minor[20].erase()
			graphics.minor[20].triangle(15,20,40,30,20,55)
			graphics.minor[20].triangle(-15,-60,-40,-20,-20,-25)

			graphics.minor[21].noStroke()
			graphics.minor[21].fill(150,160,196)
			graphics.minor[21].rect(80,80,100,20)
			graphics.minor[21].ellipse(80,70,100,100)
			graphics.minor[21].ellipse(80,90,100,100)
			graphics.minor[21].fill(105,112,137)
			graphics.minor[21].rect(80,70,100,6)
			graphics.minor[21].rect(80,90,100,6)
			graphics.minor[21].quad(36,47,124,47,127,53,33,53)
			graphics.minor[21].quad(36,113,124,113,127,107,33,107)
			graphics.minor[21].quad(54,27,106,27,114,33,46,33)
			graphics.minor[21].quad(54,133,106,133,114,127,46,127)
			graphics.minor[21].erase()
			graphics.minor[21].triangle(90,70,65,20,115,20)
			graphics.minor[21].triangle(65,100,95,140,35,140)

			graphics.minor[22].noStroke()
			graphics.minor[22].fill(150,160,196)
			graphics.minor[22].rect(80,80,100,20)
			graphics.minor[22].ellipse(80,70,100,100)
			graphics.minor[22].ellipse(80,90,100,100)
			graphics.minor[22].fill(105,112,137)
			graphics.minor[22].rect(80,70,100,6)
			graphics.minor[22].rect(80,90,100,6)
			graphics.minor[22].quad(36,47,124,47,127,53,33,53)
			graphics.minor[22].quad(36,113,124,113,127,107,33,107)
			graphics.minor[22].quad(54,27,106,27,114,33,46,33)
			graphics.minor[22].quad(54,133,106,133,114,127,46,127)
			graphics.minor[22].erase()
			graphics.minor[22].triangle(70,50,25,20,115,20)
			graphics.minor[22].triangle(95,85,75,140,115,140)
		
			graphics.combatant[graphics.combatant.length-1].sprites.genAmount=360/graphics.combatant[graphics.combatant.length-1].sprites.detail
		
			for(let g=0;g<5;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,13.5+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[13.5+g*4.5,0,14+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,16+g*4.5,14+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,16+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[16+g*4.5,0,15.5+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,18+g*4.5,15.5+g*4.5]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[117,132,132],y:[0,0,36]})
			for(let g=0;g<2;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,34,36+g*0.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,34]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[146+g*48,156+g*48,156+g*48],y:[34,0,35]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,34,35]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,34]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[166+g*48,180+g*48,180+g*48],y:[34,0,36.5-g*0.5]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[228,243,228],y:[0,0,36]})
			for(let g=4;g>=-3;g--){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,18+g*4.5,15.5+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[84-g*48,75-g*48,72-g*48],y:[16+g*4.5,0,15.5+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,16+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,16+g*4.5,14+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[108-g*48,92-g*48,87-g*48],y:[13.5+g*4.5,0,14+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,13.5+g*4.5]})
			}
			for(let g=1;g<5;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[-90+g*48,-36+g*48,-48+g*48],y:[0,0,16+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[-48+g*48,-32+g*48,-27+g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[-32+g*48,-24+g*48,-27+g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[-32+g*48,-8+g*48,-24+g*48],y:[0,0,17.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[-24+g*48,-15+g*48,-12+g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[-15+g*48,g*48,-12+g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
			}
			for(let g=4;g>=0;g--){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[15-g*48,-g*48,12-g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[24-g*48,15-g*48,12-g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[32-g*48,8-g*48,24-g*48],y:[0,0,17.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[32-g*48,24-g*48,27-g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[48-g*48,32-g*48,27-g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[60-g*48,36-g*48,48-g*48],y:[0,0,16+g*5.5-15]})
			}
			for(let g=0;g<12;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop.push({spin:[-90-g*30,-60-g*30,-75-g*30],y:[0,0,-0.5]})
			}
			for(let g=0;g<5;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,13.5+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[13.5+g*4.5,0,14+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,16+g*4.5,14+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,16+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[16+g*4.5,0,15.5+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,18+g*4.5,15.5+g*4.5]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[117,132,132],y:[0,0,36]})
			for(let g=0;g<2;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,34,36+g*0.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,34]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[146+g*48,156+g*48,156+g*48],y:[34,0,35]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,34,35]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,34]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[166+g*48,180+g*48,180+g*48],y:[34,0,36.5-g*0.5]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[228,243,228],y:[0,0,36]})
			for(let g=4;g>=-3;g--){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,18+g*4.5,15.5+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[84-g*48,75-g*48,72-g*48],y:[16+g*4.5,0,15.5+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,16+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,16+g*4.5,14+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[108-g*48,92-g*48,87-g*48],y:[13.5+g*4.5,0,14+g*4.5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,13.5+g*4.5]})
			}
			for(let g=1;g<5;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[-90+g*48,-36+g*48,-48+g*48],y:[0,0,16+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[-48+g*48,-32+g*48,-27+g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[-32+g*48,-24+g*48,-27+g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[-32+g*48,-8+g*48,-24+g*48],y:[0,0,17.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[-24+g*48,-15+g*48,-12+g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[-15+g*48,g*48,-12+g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
			}
			for(let g=4;g>=0;g--){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[15-g*48,-g*48,12-g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[24-g*48,15-g*48,12-g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[32-g*48,8-g*48,24-g*48],y:[0,0,17.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[32-g*48,24-g*48,27-g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[48-g*48,32-g*48,27-g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[60-g*48,36-g*48,48-g*48],y:[0,0,16+g*5.5-15]})
			}
			for(let g=0,lg=graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.length;g<lg;g++){
				for(let h=0,lh=graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage[g].y.length;h<lh;h++){
					graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage[g].y[h]=max(0,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage[g].y[h]-(g*4+h*1.5)**1.25%6)
				}
			}
			for(let g=0,lg=graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.length;g<lg;g++){
				for(let h=0,lh=graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage[g].y.length;h<lh;h++){
					graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage[g].y[h]=max(0,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage[g].y[h]-(g*4+h*1.5)**1.5%6)
				}
			}
			for(let g=0;g<18;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainAnti.push({spin:[-96-g*20,-64-g*20,-80-g*20],y:[-1,-1,6+((g+2)**3%6)/2-cos(-80-g*20)*5]})
			}
			for(let g=0;g<12;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideAnti.push({spin:[-84-g*30,-36-g*30,-60-g*30],y:[-1,-1,6+((g+1)**2%6)/2-cos(-60-g*30)*5]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideAnti.push({spin:[-36,36,0],y:[-1,-1,11]})
		
			graphics.combatant[graphics.combatant.length-1].sprites.hair={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.hair.front.push(createGraphics(250,500))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.hair.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.hair.front[g].translate(125,100)
				graphics.combatant[graphics.combatant.length-1].sprites.hair.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.hair.front[g],0,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated HF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back.push(createGraphics(250,500))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g].translate(125,100)
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g],1,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated HB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.main={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g],2,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated KMF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g],3,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated KMB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g],4,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated KOF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g],5,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated KOB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g],6,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated DMF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g],7,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated DMB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g],8,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated DOF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g],9,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated DOB-'+(g+1))
			}
		break
	}
}
function setupBackground(type,layer){
	switch(type){
		case 0:
			layer.noStroke()
            for(let a=0,la=layer.height*4/5;a<la;a++){
                layer.fill(130-50*a/la,195-50*a/la,230-50*a/la)
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
            for(let a=0,la=height/50;a<la;a++){
                c=random(1,1.2)
                d=250
                e=random(0,d)
                f=a+random(0,1)
                layer.fill(90-30*f/la,150-30*f/la,180-30*f/la)
                for(let b=0,lb=width/d;b<lb;b++){
                    f=random(-50,50)
                    g=random(0,10)
                    layer.triangle(layer.width*b/lb+e+f-30*c,layer.height,layer.width*b/lb+e+f+30*c,layer.height,layer.width*b/lb+e+f,layer.height*0.7+layer.height*2/5*a/la+g-400*random(0.8,1.2)*c)
                }
            }
            for(let a=0;a<1000;a++){
                b=random(0,2)
                c=random(15,20)
                d=random(layer.height*0.65+sin((-50+(a*12)%(layer.width+100))*1.2)*50,layer.height*0.8)
                e=random(0,360)
                f=random(b/4,b)
				layer.push()
                layer.translate(-50+(a*12)%(layer.width+100),d)
                layer.rotate(e)
                for(h=0;h<5;h++){
                    for(g=0;g<5;g++){
                        layer.rotate(72)
                        layer.fill(105+b*70-h*10,170+f*65-h*10,170+f*95-h*10)
                        layer.ellipse(c*(1-h/5)*0.9,0,c*1.8*(1-h/5),c*0.6*(1-h/5))
                    }
                }
                layer.rotate(-e)
                layer.pop()
            }
            for(a=0,la=layer.width/100+1;a<la;a++){
                for(b=0,lb=layer.height/100+1;b<lb;b++){
                    let c=random(0,2)
                    let d=a*100+random(20,80)
                    let e=b*100+random(20,80)
                    let f=random(0,360)
                	let g=random(c/4,c)
                    let h=random(10,15)
                    layer.fill(125+c*70,190+g*65,190+g*95,0.25)
                    layer.quad(d+sin(f)*h,e+cos(f)*h,d+sin(f+90)*h*3,e+cos(f+90)*h*3,d+sin(f+180)*h,e+cos(f+180)*h,d+sin(f+270)*h*3,e+cos(f+270)*h*3)
                }
            }
            for(let a=0,la=layer.height/5+30;a<la;a++){
                layer.fill(130-100*a/la,155-100*a/la,175-100*a/la)
                for(let b=0,lb=20;b<lb;b++){
                    layer.quad(layer.width*(b+b%2)/lb,a+0.5+layer.height*4/5,layer.width*(b+b%2)/lb,a+0.5+layer.height*4/5+30,layer.width*(b+1-b%2)/lb,a+0.5+layer.height*4/5,layer.width*(b+1-b%2)/lb,a+0.5+layer.height*4/5-30)
                }
            }
            for(let a=0,la=layer.height*0.1+30;a<la;a++){
                layer.fill(70-50*a/la,95-50*a/la,115-50*a/la)
                for(let b=0,lb=20;b<lb;b++){
                    layer.quad(layer.width*(b+1-b%2)/lb,a+0.5+layer.height*0.9,layer.width*(b+1-b%2)/lb,a+0.5+layer.height*0.9+30,layer.width*(b+b%2)/lb,a+0.5+layer.height*0.9,layer.width*(b+b%2)/lb,a+0.5+layer.height*0.9-30)
                }
            }
			let p1=new combatant(layer,new battle(layer,1),1200,1070,0,0,0,0,1,0,0,-36)
			p1.parts.mouth-=4
			p1.spin.mouth-=180
			p1.size=5
			p1.fade=1
			p1.anim.sword=36
			p1.trigger.display.extra.sword=true
            p1.anim.legs=[
                {top:24,bottom:12,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                {top:12,bottom:36,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
            ]
            p1.anim.arms=[
                {top:36,bottom:-6,length:{top:16,bottom:16}},
                {top:27,bottom:108,length:{top:16,bottom:16}}
            ]
            p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:60,bottom:60,lock:0}]
            p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:120,bottom:141,lock:0}]
			p1.display()
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

	setupCombatantGraphics(0)

	//setupBackground(0,graphics.backgrounds[0])
}