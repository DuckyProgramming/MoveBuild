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
		case 10:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.hair.inside,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.hair.inside,direction,0,33,1,0.1,graphics.combatant[graphics.combatant.length-1].color.hair.insideFront,1)
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.hair.main,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.hair.main,direction,0,35,1,0.1,graphics.combatant[graphics.combatant.length-1].color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
			layer.strokeWeight(0.75)
			for(let g=0,lg=graphics.combatant[graphics.combatant.length-1].parts.hair.strand.length;g<lg;g++){
				if(cos(graphics.combatant[graphics.combatant.length-1].parts.hair.strand[g]+direction)>0){
					layer.line(sin(graphics.combatant[graphics.combatant.length-1].parts.hair.strand[g]+direction)*15.5,0,sin(graphics.combatant[graphics.combatant.length-1].parts.hair.strand[g]+direction)*14,18)
				}
			}
			layer.strokeWeight(0.5)
			layer.noFill()
			layer.arc(cos(direction+graphics.combatant[graphics.combatant.length-1].parts.hair.top)*-5,-10,16*cos(direction+graphics.combatant[graphics.combatant.length-1].parts.hair.top),12,-180,0)
		break
		case 11:
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.hair.main,direction,0,35,1,0.1,graphics.combatant[graphics.combatant.length-1].color.hair.back,1)
			layer.strokeWeight(0.75)
			for(let g=0,lg=graphics.combatant[graphics.combatant.length-1].parts.hair.strand.length;g<lg;g++){
				if(cos(graphics.combatant[graphics.combatant.length-1].parts.hair.strand[g]+direction)<=0){
					layer.line(sin(graphics.combatant[graphics.combatant.length-1].parts.hair.strand[g]+direction)*15.5,0,sin(graphics.combatant[graphics.combatant.length-1].parts.hair.strand[g]+direction)*14,18)
				}
			}
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.hair.inside,direction,0,33,1,0.1,graphics.combatant[graphics.combatant.length-1].color.hair.insideBack,1)
		break
		case 12:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.main,direction,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.main,direction,20,9,0.5,0.15,graphics.combatant[graphics.combatant.length-1].color.kimono.main.start,graphics.combatant[graphics.combatant.length-1].color.kimono.main.end,1)
			layer.erase()
			layer.fill(0)
			layer.rect(0,layer.height*0.825/5,layer.width/5,layer.height*0.35/5)
			graphics.combatant[graphics.combatant.length-1].sprites.temp=createGraphics(200,330)
			setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.temp)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.translate(100,0)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.scale(5,2)
			this.displayTrianglesFrontMerge(graphics.combatant[graphics.combatant.length-1].sprites.temp,graphics.combatant[graphics.combatant.length-1].parts.kimono.main,direction,87,3,0.5,0.36,graphics.combatant[graphics.combatant.length-1].color.kimono.main.start,graphics.combatant[graphics.combatant.length-1].color.kimono.main.end,1)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.erase()
			graphics.combatant[graphics.combatant.length-1].sprites.temp.rect(0,52,40,104)
			layer.image(graphics.combatant[graphics.combatant.length-1].sprites.temp,-layer.width/10,0,layer.width/5,layer.height/5)
		break
		case 13:
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.main,direction,20,9,0.5,0.15,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.start,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.end,1)
			layer.erase()
			layer.fill(0)
			layer.rect(0,layer.height*0.825/5,layer.width/5,layer.height*0.35/5)
			graphics.combatant[graphics.combatant.length-1].sprites.temp=createGraphics(200,330)
			setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.temp)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.translate(100,0)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.scale(5,2)
			this.displayTrianglesBackMerge(graphics.combatant[graphics.combatant.length-1].sprites.temp,graphics.combatant[graphics.combatant.length-1].parts.kimono.main,direction,87,3,0.5,0.36,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.start,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.end,1)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.erase()
			graphics.combatant[graphics.combatant.length-1].sprites.temp.rect(0,52,40,104)
			layer.image(graphics.combatant[graphics.combatant.length-1].sprites.temp,-layer.width/10,0,layer.width/5,layer.height/5)
		break
		case 14:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.outside,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outside,direction,27,18,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,1)
			for(let g=0;g<36;g++){
				layer.fill(mergeColor(graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,g/36))
				layer.stroke(mergeColor(graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,g/36))
				layer.quad(-5-g/9,9+g/2,5+g/9,9+g/2,5+(g+1)/9,9.5+g/2,-5-(g+1)/9,9.5+g/2)
			}
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop,direction,9,10,0.25,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,1)
		break
		case 15:
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outside,direction,27,18,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideBack.end,1)
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop,direction,9,10,0.25,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideBack.start,1)
		break
		case 16:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.fringe,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.fringe,direction,0,18,0.3,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.fringe,1)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideFringe,direction,0,18,0.15,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideFringe,1)
		break
		case 17:
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.fringe,direction,0,18,0.3,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.fringeBack,1)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideFringe,direction,0,18,0.15,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideFringeBack,1)
		break
		case 18:
			for(let g=0,lg=graphics.combatant[graphics.combatant.length-1].parts.tail.length;g<lg;g++){
				this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.tail[g][0],direction,0)
				this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.tail[g][1],direction,0)
				layer.translate(sin(direction*6+g*135)*0.6,0)
				this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.tail[g][0],direction,30-g*5,3.2+min(g,4)*1.2,1,0.4*(0.8+min(g,4)*0.3),
					upColor(mergeColor(graphics.combatant[graphics.combatant.length-1].color.hair.tail.start,graphics.combatant[graphics.combatant.length-1].color.hair.tail.end,g/lg),cos(direction+graphics.combatant[graphics.combatant.length-1].spin.tail)*20,[0,1,1]),
					upColor(mergeColor(graphics.combatant[graphics.combatant.length-1].color.hair.tail.start,graphics.combatant[graphics.combatant.length-1].color.hair.tail.end,(g+1)/lg),cos(direction+graphics.combatant[graphics.combatant.length-1].spin.tail)*20,[0,1,1]),1),
				this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.tail[g][1],direction,30-g*5,3.2+min(g,4)*1.2,1,-0.4*(0.8+min(g,4)*0.3),
					upColor(mergeColor(graphics.combatant[graphics.combatant.length-1].color.hair.tail.start,graphics.combatant[graphics.combatant.length-1].color.hair.tail.end,g/lg),cos(direction+graphics.combatant[graphics.combatant.length-1].spin.tail)*20,[0,1,1]),
					upColor(mergeColor(graphics.combatant[graphics.combatant.length-1].color.hair.tail.start,graphics.combatant[graphics.combatant.length-1].color.hair.tail.end,(g+1)/lg),cos(direction+graphics.combatant[graphics.combatant.length-1].spin.tail)*20,[0,1,1]),1)
				layer.translate(sin(direction*6+g*135)*-0.6,0)
			}
			layer.noStroke()
			layer.fill(111,23,27)
			layer.rect(sin(direction*6)*0.3+sin(direction*6+135)*0.3,27.1,abs(sin(direction*6)*0.57-sin(direction*6+135)*0.57)+3.8,0.3)
			layer.rect(sin(direction*6)*0.3+sin(direction*6+135)*0.3,27.9,abs(sin(direction*6)*0.57-sin(direction*6+135)*0.57)+3.8,0.3)
		break
		case 19:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.under.dress,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.under.dress,direction,41,16,0.5,0.5,graphics.combatant[graphics.combatant.length-1].color.under.dress,1)
			layer.quad(-5,21,5,21,8,41,-8,41)
		break
		case 20:
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.under.dress,direction,41,16,0.5,0.5,graphics.combatant[graphics.combatant.length-1].color.under.dressBack,1)
		break
		case 21:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.shadow,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.shadow,direction,3,15,0.5,0.15,graphics.combatant[graphics.combatant.length-1].color.kimono.shadow,1)
		break
		case 22:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage,direction,1)
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.mainAnti,direction,0)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage,direction,20,9,0.5,0.15,graphics.combatant[graphics.combatant.length-1].color.kimono.main.start,graphics.combatant[graphics.combatant.length-1].color.kimono.main.end,1)
			this.displayTrianglesFrontMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainAnti,direction,20,9,0.5,0.15,-1,-1,1)
			layer.erase()
			layer.fill(0)
			layer.rect(0,layer.height*0.825/5,layer.width/5,layer.height*0.35/5)
			graphics.combatant[graphics.combatant.length-1].sprites.temp=createGraphics(200,330)
			setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.temp)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.translate(100,0)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.scale(5,2)
			this.displayTrianglesFrontMerge(graphics.combatant[graphics.combatant.length-1].sprites.temp,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage,direction,87,3,0.5,0.36,graphics.combatant[graphics.combatant.length-1].color.kimono.main.start,graphics.combatant[graphics.combatant.length-1].color.kimono.main.end,1)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.erase()
			graphics.combatant[graphics.combatant.length-1].sprites.temp.rect(0,52,40,104)
			layer.image(graphics.combatant[graphics.combatant.length-1].sprites.temp,-layer.width/10,0,layer.width/5,layer.height/5)
		break
		case 23:
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage,direction,20,9,0.5,0.15,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.start,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.end,1)
			this.displayTrianglesBackMerge(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainAnti,direction,20,9,0.5,0.15,-1,-1,1)
			layer.erase()
			layer.fill(0)
			layer.rect(0,layer.height*0.825/5,layer.width/5,layer.height*0.35/5)
			graphics.combatant[graphics.combatant.length-1].sprites.temp=createGraphics(200,330)
			setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.temp)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.translate(100,0)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.scale(5,2)
			this.displayTrianglesBackMerge(graphics.combatant[graphics.combatant.length-1].sprites.temp,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage,direction,87,3,0.5,0.36,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.start,graphics.combatant[graphics.combatant.length-1].color.kimono.mainBack.end,1)
			graphics.combatant[graphics.combatant.length-1].sprites.temp.erase()
			graphics.combatant[graphics.combatant.length-1].sprites.temp.rect(0,52,40,104)
			layer.image(graphics.combatant[graphics.combatant.length-1].sprites.temp,-layer.width/10,0,layer.width/5,layer.height/5)
		break
		case 24:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage,direction,0)
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideAnti,direction,0)
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTopAnti,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage,direction,27,18,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,1)
			for(let g=0;g<36;g++){
				layer.fill(mergeColor(graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,g/36))
				layer.stroke(mergeColor(graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,g/36))
				layer.quad(-5-g/9,9+g/2,5+g/9,9+g/2,5+(g+1)/9,9.5+g/2,-5-(g+1)/9,9.5+g/2)
			}
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideAnti,direction,31,20,0.5,0.2,-1,1)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTopAnti,direction,7,9.5,0.25,0.2,-1,1)
		break
		case 25:
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage,direction,27,18,0.5,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideBack.end,1)
			for(let g=0;g<36;g++){
				layer.fill(mergeColor(graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,g/36))
				layer.stroke(mergeColor(graphics.combatant[graphics.combatant.length-1].color.kimono.outside.start,graphics.combatant[graphics.combatant.length-1].color.kimono.outside.end,g/36))
				layer.quad(-5-g/9,9+g/2,5+g/9,9+g/2,5+(g+1)/9,9.5+g/2,-5-(g+1)/9,9.5+g/2)
			}
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideAnti,direction,31,20,0.5,0.2,-1,1)
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTopAnti,direction,7,9.5,0.25,0.2,-1,1)
		break
		case 26:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.fringeDamage,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.fringeDamage,direction,0,18,0.3,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.fringe,1)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideFringeDamage,direction,0,18,0.15,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideFringe,1)
		break
		case 27:
			this.displayTrianglesBack(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.fringeDamage,direction,0,18,0.3,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.fringeBack,1)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideFringeDamage,direction,0,18,0.15,0.2,graphics.combatant[graphics.combatant.length-1].color.kimono.outsideFringeBack,1)
		break
		case 28:
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.shadowDamage,direction,0)
			this.controlSpin(graphics.combatant[graphics.combatant.length-1].parts.kimono.shadowAnti,direction,0)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.shadowDamage,direction,3,15,0.5,0.15,graphics.combatant[graphics.combatant.length-1].color.kimono.shadow,1)
			this.displayTrianglesFront(layer,graphics.combatant[graphics.combatant.length-1].parts.kimono.shadowAnti,direction,7,19,0.5,0.15,-1,1)
		break
	}
}
function setupGeneralGraphics(){
	for(let g=0;g<61;g++){
		if(g==56||g==58){
			graphics.minor.push(createGraphics(160,240))
		}else{
			graphics.minor.push(createGraphics(160,160))
		}
		setupLayer(graphics.minor[graphics.minor.length-1])
	}

	graphics.minor[0].translate(80,80)
	for(let g=0;g<4;g+=0.25){
		graphics.minor[0].fill(80+g*32,200+g*20,80+g*32)
		graphics.minor[0].triangle(0,0,15+g*2,45-g*5,45-g*5,15+g*2)
		graphics.minor[0].triangle(0,0,-15-g*2,-45+g*5,-45+g*5,-15-g*2)
	}

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

	graphics.minor[23].fill(151,119,103)
	graphics.minor[23].rect(80,80,100,20)
	graphics.minor[23].ellipse(80,70,100,100)
	graphics.minor[23].ellipse(80,90,100,100)
	graphics.minor[23].fill(122,94,90)
	graphics.minor[23].rect(80,70,100,6)
	graphics.minor[23].rect(80,90,100,6)
	graphics.minor[23].quad(36,47,124,47,127,53,33,53)
	graphics.minor[23].quad(36,113,124,113,127,107,33,107)
	graphics.minor[23].quad(54,27,106,27,114,33,46,33)
	graphics.minor[23].quad(54,133,106,133,114,127,46,127)

	for(let g=0;g<8;g++){
		graphics.minor[g*2+24].stroke(201,61,96)
		graphics.minor[g*2+24].strokeWeight(20)
		graphics.minor[g*2+24].line(24+g*7,46+g*13,31+g*7,59+g*13)
		graphics.minor[g*2+25].stroke(201,61,96)
		graphics.minor[g*2+25].strokeWeight(20)
		graphics.minor[g*2+25].line(136-g*7,46+g*13,129-g*7,59+g*13)
		if(g%2==1){
			graphics.minor[g*2+40].stroke(233,216,194)
			graphics.minor[g*2+40].strokeWeight(8)
			graphics.minor[g*2+40].point(31+g*7,53+g*13)
			graphics.minor[g*2+41].stroke(233,216,194)
			graphics.minor[g*2+41].strokeWeight(8)
			graphics.minor[g*2+41].point(129-g*7,53+g*13)
		}
	}

	graphics.minor[56].translate(80,140)
	graphics.minor[56].scale(0.4)
	graphics.minor[56].strokeWeight(0.6)
	graphics.minor[56].strokeJoin(ROUND)
	for(let a=0,la=100;a<la;a++){
		for(let b=0;b<5;b++){
			graphics.minor[56].fill(136+59*a/la,61+7*a/la,92-5*a/la)
			graphics.minor[56].stroke(136+59*a/la,61+7*a/la,92-5*a/la)
			if(a<la/2){
				graphics.minor[56].beginShape()
				graphics.minor[56].vertex(0,0)
				graphics.minor[56].bezierVertex(-21*(1-a/la*2),-20,-28*(1-a/la*2),-50,-3,-70)
				graphics.minor[56].vertex(-7*(1-(a+1)/la*2),-64)
				graphics.minor[56].endShape()
			}
			graphics.minor[56].rotate(-72)
			graphics.minor[56].beginShape()
			graphics.minor[56].vertex(0,0)
			graphics.minor[56].bezierVertex(21,-20,28,-50,3,-70)
			if(a>=la/2){
				graphics.minor[56].vertex(7*(-1+a/la*2),-64)
				graphics.minor[56].bezierVertex(7*(-1+a/la*2),-50,28*(-1+a/la*2),-14,0,0)
			}else{
				graphics.minor[56].vertex(0,-64)
			}
			graphics.minor[56].endShape(CLOSE)
		}
	}
	graphics.minor[56].noStroke()
		graphics.minor[56].fill(124,41,51)
		for(let a=0;a<5;a++){
		graphics.minor[56].rotate(72)
		graphics.minor[56].rotate(-12)
		graphics.minor[56].quad(0,-4,3,-16,0,-24,-3,-16)
		graphics.minor[56].rotate(12)
	}
	graphics.minor[56].fill(211,153,120)
	graphics.minor[56].ellipse(0,0,12,12)
	graphics.minor[56].scale(2.5)
	graphics.minor[56].translate(0,-30)
	graphics.minor[56].scale(0.5)
	graphics.minor[56].strokeWeight(0.6)
	graphics.minor[56].strokeJoin(ROUND)
	for(let a=0,la=100;a<la;a++){
		for(let b=0;b<5;b++){
			graphics.minor[56].fill(136+59*a/la,61+7*a/la,92-5*a/la)
			graphics.minor[56].stroke(136+59*a/la,61+7*a/la,92-5*a/la)
			if(a<la/2){
				graphics.minor[56].beginShape()
				graphics.minor[56].vertex(0,0)
				graphics.minor[56].bezierVertex(-21*(1-a/la*2),-30,-28*(1-a/la*2),-40,-6,-70)
				graphics.minor[56].vertex(-7*(1-(a+1)/la*2),-56)
				graphics.minor[56].endShape()
			}
			graphics.minor[56].rotate(-72)
			graphics.minor[56].beginShape()
			graphics.minor[56].vertex(0,0)
			graphics.minor[56].bezierVertex(21,-30,28,-40,6,-70)
			if(a>=la/2){
				graphics.minor[56].vertex(7*(-1+a/la*2),-56)
				graphics.minor[56].bezierVertex(7*(-1+a/la*2),-40,28*(-1+a/la*2),-14,0,0)
			}else{
				graphics.minor[56].vertex(0,-60)
			}
			graphics.minor[56].endShape(CLOSE)
		}
	}
	graphics.minor[56].noStroke()
	graphics.minor[56].fill(124,41,51)
	for(let a=0;a<5;a++){
		graphics.minor[56].rotate(72)
		graphics.minor[56].rotate(-12)
		graphics.minor[56].quad(0,-4,3,-16,0,-24,-3,-16)
		graphics.minor[56].rotate(12)
	}
	graphics.minor[56].fill(211,153,120)
	graphics.minor[56].ellipse(0,0,12,12)

	graphics.minor[57].translate(80,80)
	graphics.minor[57].scale(0.5)
	graphics.minor[57].strokeWeight(0.6)
	graphics.minor[57].strokeJoin(ROUND)
	for(let a=0,la=100;a<la;a++){
		for(let b=0;b<5;b++){
			graphics.minor[57].fill(241+9*a/la,170+52*a/la,189+37*a/la)
			graphics.minor[57].stroke(241+9*a/la,170+52*a/la,189+37*a/la)
			if(a<la/2){
				graphics.minor[57].beginShape()
				graphics.minor[57].vertex(0,0)
				graphics.minor[57].bezierVertex(-20*(1-a/la*2),-30,-40*(1-a/la*2),-40,-12,-70)
				graphics.minor[57].vertex(-12*(1-(a+1)/la*2),-54)
				graphics.minor[57].endShape()
			}
			graphics.minor[57].rotate(-72)
			graphics.minor[57].beginShape()
			graphics.minor[57].vertex(0,0)
			graphics.minor[57].bezierVertex(20,-30,40,-40,12,-70)
			if(a>=la/2){
				graphics.minor[57].vertex(12*(-1+a/la*2),-54)
				graphics.minor[57].bezierVertex(40*(-1+a/la*2),-40,20*(-1+a/la*2),-30,0,0)
			}else{
				graphics.minor[57].vertex(0,-54)
			}
			graphics.minor[57].endShape(CLOSE)
		}
	}
	graphics.minor[57].noStroke()
	graphics.minor[57].fill(240,207,211)
	for(let a=0;a<5;a++){
		graphics.minor[57].rotate(72)
		graphics.minor[57].rotate(-12)
		graphics.minor[57].quad(0,-4,4,-16,0,-24,-4,-16)
		graphics.minor[57].rotate(12)
	}
	graphics.minor[57].fill(254,228,232)
	graphics.minor[57].ellipse(0,0,12,12)

	graphics.minor[58].translate(80,160)
	graphics.minor[58].scale(0.3)
    graphics.minor[58].rotate(36)
    for(let a=0;a<5;a++){
        for(let b=0,lb=100;b<lb;b++){
            graphics.minor[58].fill(mergeColor([216,112,124],[247,225,225],1-b/lb))
            graphics.minor[58].beginShape()
            graphics.minor[58].vertex(0,0)
            graphics.minor[58].bezierVertex(-30*(1-b/lb),-15*(1-b/lb),-30*(1-b/lb),-55*(1-b/lb),-4*(1-b/lb),-70*(1-b/lb))
            graphics.minor[58].vertex(0,-62*(1-0.75*b/lb))
            graphics.minor[58].endShape(CLOSE)
        }
        graphics.minor[58].rotate(-72)
        for(let b=0,lb=100;b<lb;b++){
            graphics.minor[58].fill(mergeColor([216,112,124],[247,225,225],1-b/lb))
            graphics.minor[58].beginShape()
            graphics.minor[58].vertex(0,0)
            graphics.minor[58].bezierVertex(30*(1-b/lb),-15*(1-b/lb),30*(1-b/lb),-55*(1-b/lb),4*(1-b/lb),-70*(1-b/lb))
            graphics.minor[58].vertex(0,-62*(1-0.75*b/lb))
            graphics.minor[58].endShape(CLOSE)
        }
    }
    graphics.minor[58].fill(220,160,180)
    for(let a=0;a<5;a++){
        graphics.minor[58].rotate(72)
        graphics.minor[58].rotate(-12)
        graphics.minor[58].quad(0,-4,4,-16,0,-24,-4,-16)
        graphics.minor[58].rotate(12)
    }
    graphics.minor[58].fill(240,180,200)
    graphics.minor[58].ellipse(0,0,12,12)
    graphics.minor[58].rotate(-36)
    graphics.minor[58].scale(10/3)
	graphics.minor[58].translate(0,-30)
	graphics.minor[58].scale(0.5)
    for(let a=0;a<5;a++){
        for(let b=0,lb=100;b<lb;b++){
            graphics.minor[58].fill(mergeColor([216,112,124],[247,225,225],1-b/lb))
            graphics.minor[58].beginShape()
            graphics.minor[58].vertex(0,0)
            graphics.minor[58].bezierVertex(-30*(1-b/lb),-15*(1-b/lb),-30*(1-b/lb),-55*(1-b/lb),-4*(1-b/lb),-70*(1-b/lb))
            graphics.minor[58].vertex(0,-62*(1-0.75*b/lb))
            graphics.minor[58].endShape(CLOSE)
        }
        graphics.minor[58].rotate(-72)
        for(let b=0,lb=100;b<lb;b++){
            graphics.minor[58].fill(mergeColor([216,112,124],[247,225,225],1-b/lb))
            graphics.minor[58].beginShape()
            graphics.minor[58].vertex(0,0)
            graphics.minor[58].bezierVertex(30*(1-b/lb),-15*(1-b/lb),30*(1-b/lb),-55*(1-b/lb),4*(1-b/lb),-70*(1-b/lb))
            graphics.minor[58].vertex(0,-62*(1-0.75*b/lb))
            graphics.minor[58].endShape(CLOSE)
        }
    }
    for(let a=0;a<5;a++){
        graphics.minor[58].rotate(72)
        graphics.minor[58].rotate(-12)
        graphics.minor[58].noStroke()
        graphics.minor[58].fill(255,200,220)
        graphics.minor[58].quad(0,-4,4,-16,0,-24,-4,-16)
        graphics.minor[58].rotate(12)
    }
    graphics.minor[58].fill(240,180,200)
    graphics.minor[58].ellipse(0,0,12,12)

	graphics.minor[59].fill(151,119,103)
	graphics.minor[59].rect(80,80,100,20)
	graphics.minor[59].ellipse(80,70,100,100)
	graphics.minor[59].ellipse(80,90,100,100)
	graphics.minor[59].fill(122,94,90)
	graphics.minor[59].rect(80,70,100,6)
	graphics.minor[59].rect(80,90,100,6)
	graphics.minor[59].quad(36,47,124,47,127,53,33,53)
	graphics.minor[59].quad(36,113,124,113,127,107,33,107)
	graphics.minor[59].quad(54,27,106,27,114,33,46,33)
	graphics.minor[59].quad(54,133,106,133,114,127,46,127)
	graphics.minor[59].erase()
	graphics.minor[59].triangle(90,70,65,20,115,20)
	graphics.minor[59].triangle(65,100,95,140,35,140)

	graphics.minor[60].fill(151,119,103)
	graphics.minor[60].rect(80,80,100,20)
	graphics.minor[60].ellipse(80,70,100,100)
	graphics.minor[60].ellipse(80,90,100,100)
	graphics.minor[60].fill(122,94,90)
	graphics.minor[60].rect(80,70,100,6)
	graphics.minor[60].rect(80,90,100,6)
	graphics.minor[60].quad(36,47,124,47,127,53,33,53)
	graphics.minor[60].quad(36,113,124,113,127,107,33,107)
	graphics.minor[60].quad(54,27,106,27,114,33,46,33)
	graphics.minor[60].quad(54,133,106,133,114,127,46,127)
	graphics.minor[60].erase()
	graphics.minor[60].triangle(70,50,25,20,115,20)
	graphics.minor[60].triangle(95,85,75,140,115,140)
}
function setupCombatantGraphics(type){
	switch(type){
		case 0:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{back:[],front:[]},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]},mainDamage:{back:[],front:[]},outsideDamage:{back:[],front:[]}},under:{dress:{back:[],front:[]},dressDamage:{back:[],front:[]}}},
				parts:{kimono:{main:[],outside:[],outsideTop:[],mainDamage:[],outsideDamage:[],mainAnti:[],outsideAnti:[]}},
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
				print('Generated L-HF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back.push(createGraphics(250,500))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g].translate(125,100)
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g],1,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-HB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.main={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g],2,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-KMF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g],3,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-KMB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g],4,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-KOF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g],5,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-KOB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g],6,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-DMF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g],7,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-DMB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g],8,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-DOF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back.push(createGraphics(150,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g].scale(5)
				generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g],9,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated L-DOB-'+(g+1))
			}
		break
		case 1:
			graphics.combatant.push({
				spin:{tail:108},
				sprites:{detail:15,genAmount:0,animDirection:0,temp:0,hair:{back:[],front:[],tail:[]},under:{dress:{back:[],front:[]}},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]},fringe:{back:[],front:[]},fringeDamage:{back:[],front:[]},outsideFringeDamage:{back:[],front:[]},shadow:[],shadowDamage:[]}},
				parts:{tail:[],kimono:{main:[],outside:[],outsideTop:[],fringe:[],outsideFringe:[],shadow:[],mainDamage:[],outsideDamage:[],fringeDamage:[],outsideFringeDamage:[],shadowDamage:[],mainAnti:[],outsideAnti:[],outsideTopAnti:[],fringeAnti:[],outsideFringeAnti:[],shadowAnti:[]},under:{dress:[]}},
				color:{
                    hair:{back:[243,134,143],front:[250,181,196],insideBack:[233,155,172],insideFront:[241,152,190],tail:{start:[231,146,154],end:[255,206,214]},glow:[254,214,213]},
                    skin:{head:[255,239,224],body:[254,238,223],legs:[255,235,217],arms:[255,233,216],button:[250,188,173]},
                    eye:{back:[201,108,113],front:[48,4,7],glow:[255,166,168]},
                    sleeve:{back:[230,183,193],front:[255,223,221],decoration:[[212,143,172],[227,168,186],[235,181,183],[206,156,193],[207,116,140]]},
                    under:{dress:[252,204,229],dressBack:[206,168,182],dressDecoration:[[234,165,192]],towel:[230,225,190],outside:[255,171,220],tanga:[230,215,220],fringe:[255,117,150],bow:[172,44,53],under:{top:[251,223,202],button:[234,166,156],bottom:[[255,188,181],[241,138,131]]}},
                    kimono:{fringe:[246,215,217],fringeBack:[254,229,243],outsideFringe:[255,234,231],outsideFringeBack:[252,228,223],shadow:[201,137,180],bow:[158,57,60],decoration:[114,40,119],
                    outside:{start:[245,228,237],end:[235,175,193]},outsideBack:{start:[244,220,232],end:[204,143,185]},
                    main:{start:[232,164,199],end:[255,246,249]},mainBack:{start:[176,108,132],end:[255,228,236]},string:[168,74,94]},
                    wrap:{in:[209,80,84],out:[202,51,60],center:[249,155,138]},
                    necklace:[207,90,101],mouth:{in:[235,146,132],out:[0,0,0]},
                }
			})

			graphics.combatant[graphics.combatant.length-1].parts.hair={
				main:[
                    {spin:[5,60,20],height:2},{spin:[-80,-10,-25],height:4},{spin:[-110,-40,-75],height:8},{spin:[-110,-25,-45],height:6},{spin:[0,90,60],height:3},{spin:[25,105,55],height:7},
                    {spin:[-160,-100,-125],height:14},{spin:[-160,-70,-105],height:10},{spin:[-15,5,-5],height:1},{spin:[150,-120,-180],height:21},{spin:[120,-120,-180],height:23},{spin:[160,-120,-160],height:17},
                    {spin:[120,-160,155],height:21},{spin:[60,130,90],height:4},{spin:[75,180,110],height:11},{spin:[105,-140,130],height:16},{spin:[40,110,80],height:6},{spin:[-120,-70,-90],height:9}
                ],inside:[
                ],strand:[-66,66],top:15
			}
			
			graphics.combatant[graphics.combatant.length-1].sprites.genAmount=360/graphics.combatant[graphics.combatant.length-1].sprites.detail
			
			for(let g=0;g<16;g++){
				graphics.combatant[graphics.combatant.length-1].parts.hair.inside.push({spin:[-graphics.combatant[graphics.combatant.length-1].parts.hair.main[g].spin[1],-graphics.combatant[graphics.combatant.length-1].parts.hair.main[g].spin[0],-graphics.combatant[graphics.combatant.length-1].parts.hair.main[g].spin[2]],height:graphics.combatant[graphics.combatant.length-1].parts.hair.main[g].height*0.75})
			}
			for(let g=0;g<5;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,16+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[16+g*5,0,15.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,17.5+g*5,15.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,17.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[17.5+g*5,0,17+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,21+g*5,17+g*5]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[117,132,132],y:[0,0,41]})
			for(let g=0;g<2;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,39,41+g]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,39]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[146+g*48,156+g*48,156+g*48],y:[39,0,40]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,39,40]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,39]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[166+g*48,180+g*48,180+g*48],y:[39,0,42-g]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[228,243,228],y:[0,0,41]})
			for(let g=4;g>=-3;g--){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,21+g*5,17+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[84-g*48,75-g*48,72-g*48],y:[17.5+g*5,0,17+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,17.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,17.5+g*5,15.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[108-g*48,92-g*48,87-g*48],y:[16+g*5,0,15.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.main.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,16+g*5]})
			}
			for(let g=0;g<15;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[-177+g*24,-159+g*24,-168+g*24],height:3})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outside.push({spin:[-187+g*24,-173+g*24,-180+g*24],height:1.5})
			}
			for(let g=0;g<9;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop.push({spin:[-195+g*40,-165+g*40,-180+g*40],height:-1.5})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTop.push({spin:[-172+g*40,-148+g*40,-160+g*40],height:-0.75})
			}
			for(let g=0;g<30;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.fringe.push({spin:[-186+g*12,-174+g*12,-180+g*12],height:-2})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.fringe.push({spin:[-186+g*12,-174+g*12,-180+g*12],height:2})
			}
			for(let g=0;g<30;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideFringe.push({spin:[-180+g*12,-168+g*12,-174+g*12],height:-1.5})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideFringe.push({spin:[-180+g*12,-168+g*12,-174+g*12],height:1.5})
			}
			for(let g=0;g<6;g++){
				graphics.combatant[graphics.combatant.length-1].parts.tail.push([[],[]])
				for(let h=0;h<12;h++){
					graphics.combatant[graphics.combatant.length-1].parts.tail[g][0].push({spin:[g*15+h*30-15,g*15+h*30+15,g*15+h*30],y:[0,0,-5]})
					graphics.combatant[graphics.combatant.length-1].parts.tail[g][1].push({spin:[g*15+h*30-15,g*15+h*30+15,g*15+h*30],y:[0,0,5]})
				}
			}
			for(let g=0;g<12;g++){
				graphics.combatant[graphics.combatant.length-1].parts.under.dress.push({spin:[-171+g*30,-159+g*30,-165+g*30],height:5})
				graphics.combatant[graphics.combatant.length-1].parts.under.dress.push({spin:[-189+g*30,-171+g*30,-180+g*30],height:7})
			}
			for(let g=0;g<15;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.shadow.push({spin:[-177+g*24,-159+g*24,-168+g*24],height:3})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.shadow.push({spin:[-187+g*24,-173+g*24,-180+g*24],height:1.5})
			}

			for(let g=0;g<5;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,16+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[16+g*5,0,15.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,17.5+g*5,15.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,17.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[17.5+g*5,0,17+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,21+g*5,17+g*5]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[117,132,132],y:[0,0,41]})
			for(let g=0;g<2;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,39,41+g]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,39]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[146+g*48,156+g*48,156+g*48],y:[39,0,40]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,39,40]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,39]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[166+g*48,180+g*48,180+g*48],y:[39,0,42-g]})
			}
			graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[228,243,228],y:[0,0,41]})
			for(let g=4;g>=-3;g--){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,21+g*5,17+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[84-g*48,75-g*48,72-g*48],y:[17.5+g*5,0,17+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,17.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,17.5+g*5,15.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[108-g*48,92-g*48,87-g*48],y:[16+g*5,0,15.5+g*5]})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,16+g*5]})
			}
			for(let g=0;g<15;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[-177+g*24,-159+g*24,-168+g*24],height:3-(g*4)**1.5%4})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideDamage.push({spin:[-187+g*24,-173+g*24,-180+g*24],height:1.5-(g*4+2)**1.5%4})
			}
			for(let g=0;g<30;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.fringeDamage.push({spin:[-186+g*12+(g*3)**1.75%5,-174+g*12-(g*3)**1.75%5,-180+g*12],height:-2+(g*3)**1.5%1.5})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.fringeDamage.push({spin:[-186+g*12+(g*3)**1.75%5,-174+g*12-(g*3)**1.75%5,-180+g*12],height:2-(g*3+2)**1.5%1.5})
			}
			for(let g=0;g<30;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideFringeDamage.push({spin:[-180+g*12+(g*2.25+1)**1.75%6,-168+g*12-(g*2.25*1)**1.75%6,-174+g*12],height:-1.5+(g*2.5)**1.5%1.25})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideFringeDamage.push({spin:[-180+g*12+(g*2.25+1)**1.75%6,-168+g*12-(g*2.25*1)**1.75%6,-174+g*12],height:1.5-(g*2.5+1.5)**1.5%1.25})
			}
			for(let g=0;g<15;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.shadowDamage.push({spin:[-177+g*24,-159+g*24,-168+g*24],height:3-(g*4)**1.5%4})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.shadowDamage.push({spin:[-187+g*24,-173+g*24,-180+g*24],height:1.5-(g*4+2)**1.5%4})
			}
			for(let g=0,lg=graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage.length;g<lg;g++){
				for(let h=0,lh=graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage[g].y.length;h<lh;h++){
					graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage[g].y[h]=max(0,graphics.combatant[graphics.combatant.length-1].parts.kimono.mainDamage[g].y[h]-(g*4+h*1.5)**1.25%12)
				}
			}
			for(let g=0;g<18;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.mainAnti.push({spin:[-96-g*20,-64-g*20,-80-g*20],y:[-1,-1,5+((g+2)**3%6)/2-cos(-80-g*20)*5]})
			}
			for(let g=0;g<12;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideAnti.push({spin:[-84-g*30,-36-g*30,-60-g*30],height:-3-((g+2)**2.5%6)/2})
				graphics.combatant[graphics.combatant.length-1].parts.kimono.shadowAnti.push({spin:[-84-g*30,-36-g*30,-60-g*30],height:-3-((g+2)**2.5%6)/2})
			}
			for(let g=0;g<15;g++){
				graphics.combatant[graphics.combatant.length-1].parts.kimono.outsideTopAnti.push({spin:[-90-g*24,-48-g*24,-69-g*24],height:3+((g+1)**2.7%7)/2})
			}

			graphics.combatant[graphics.combatant.length-1].sprites.hair={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.hair.front.push(createGraphics(200,300))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.hair.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.hair.front[g].translate(100,100)
				graphics.combatant[graphics.combatant.length-1].sprites.hair.front[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.hair.front[g],10,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-HF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back.push(createGraphics(200,300))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g].translate(100,100)
				graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.hair.back[g],11,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-HB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.main={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front.push(createGraphics(200,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g].translate(100,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.front[g],12,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-KMF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back.push(createGraphics(200,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g].translate(100,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.main.back[g],13,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-KMB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside={front:[],back:[]}
			for(let g=0;g<24;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front.push(createGraphics(150,200))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.front[g],14,g)
				print('Generated S-KOF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back.push(createGraphics(150,200))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outside.back[g],15,g)
				print('Generated S-KOB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe={front:[],back:[]}
			for(let g=0;g<12;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.front.push(createGraphics(150,50))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.front[g].translate(75,25)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.front[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.front[g],16,g)
				print('Generated S-KFF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.back.push(createGraphics(150,50))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.back[g].translate(75,25)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.back[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringe.back[g],17,g)
				print('Generated S-KFB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.hair.tail=[]
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.hair.tail.push(createGraphics(120,300))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.hair.tail[g])
				graphics.combatant[graphics.combatant.length-1].sprites.hair.tail[g].translate(60,0)
				graphics.combatant[graphics.combatant.length-1].sprites.hair.tail[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.hair.tail[g],18,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-HT-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.under.dress={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.under.dress.front.push(createGraphics(150,250))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.under.dress.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.under.dress.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.under.dress.front[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.under.dress.front[g],19,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-UDF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.under.dress.back.push(createGraphics(150,250))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.under.dress.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.under.dress.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.under.dress.back[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.under.dress.back[g],20,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-UDB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadow=[]
			for(let g=0;g<24;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadow.push(createGraphics(150,50))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadow[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadow[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadow[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadow[g],21,g)
				print('Generated S-KS-'+(g+1))
			}

			graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage={front:[],back:[]}
			for(let g=0;g<graphics.combatant[graphics.combatant.length-1].sprites.genAmount;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front.push(createGraphics(200,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g].translate(100,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.front[g],22,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-DMF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back.push(createGraphics(200,330))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g].translate(100,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.mainDamage.back[g],23,g*graphics.combatant[graphics.combatant.length-1].sprites.detail)
				print('Generated S-DMB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage={front:[],back:[]}
			for(let g=0;g<24;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front.push(createGraphics(150,200))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.front[g],24,g)
				print('Generated S-DOF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back.push(createGraphics(150,200))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.outsideDamage.back[g],25,g)
				print('Generated S-DOB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage={front:[],back:[]}
			for(let g=0;g<12;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.front.push(createGraphics(150,50))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.front[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.front[g].translate(75,25)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.front[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.front[g],26,g)
				print('Generated S-DFF-'+(g+1))
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.back.push(createGraphics(150,50))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.back[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.back[g].translate(75,25)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.back[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.fringeDamage.back[g],27,g)
				print('Generated S-DFB-'+(g+1))
			}
			graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadowDamage=[]
			for(let g=0;g<24;g++){
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadowDamage.push(createGraphics(150,50))
				setupLayer(graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadowDamage[g])
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadowDamage[g].translate(75,0)
				graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadowDamage[g].scale(5)
				this.generateSprite(graphics.combatant[graphics.combatant.length-1].sprites.kimono.shadowDamage[g],28,g)
				print('Generated S-DS-'+(g+1))
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
			p1=new combatant(layer,new battle(layer,1),1200,1070,0,0,0,0,1,0,0,-30)
			p1.parts.mouth-=4
			p1.spin.mouth-=180
			p1.size=5
			p1.fade=1
			p1.spin.sword=36
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
		case 1:
			layer.noStroke()
            for(let a=0,la=layer.height*4/5;a<la;a++){
                layer.fill(120-75*a/la)
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
			for(let a=0,la=layer.height*4/5;a<la;a++){
                layer.fill(105-75*a/la)
				for(let b=0,lb=12;b<lb;b++){
                	layer.rect(layer.width*(b+0.5)/lb,a+0.5,30,2)
				}
            }
			for(let a=0,la=layer.height*4/5;a<la;a++){
                layer.fill(135-45*a/la)
				if(floor(a/60+0.5)%2==1){
					for(let b=0,lb=13;b<lb;b++){
              			layer.rect(layer.width*b/(lb-1),a+0.5,20,2)
					}
				}
            }
			for(let a=0,la=layer.height/5;a<la;a++){
                layer.fill(90-60*a/la)
                layer.rect(layer.width/2,a+0.5+layer.height*4/5,layer.width,2)
            }
			p1=new combatant(layer,new battle(layer,1),950,940,0,0,0,0,1,0,0,-45)
			p1.trigger.display.extra.damage=true
			p1.anim.eye=[1,1]
			p1.anim.mouth.y++
			p1.size=5
			p1.fade=1
			p1.trigger.display.extra.sword=false
        	p1.anim.legs=[
                {top:30,bottom:-60,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                {top:6,bottom:-24,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
            ]
            p1.anim.arms=[
                {top:36,bottom:12,length:{top:16,bottom:16}},
                {top:36,bottom:60,length:{top:16,bottom:16}}
            ]
            p1.spin.legs=[{top:-45,bottom:-45,lock:0},{top:-30,bottom:-45,lock:0}]
            p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
			p1.direction=84
			p1.display()
		break
		case 2:
			/**/
		break
		case 3: case 4:
			layer.noStroke()
			for(let a=0,la=layer.height*4/5;a<la;a++){
                layer.fill(50-20*a/la,40-20*a/la,50-20*a/la)
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
			for(let a=0,la=layer.height/5;a<la;a++){
                layer.fill(90-40*a/la,95-40*a/la,100-40*a/la)
                layer.rect(layer.width/2,a+0.5+layer.height*4/5,layer.width,2)
            }
			for(let a=0,la=layer.height*0.1;a<la;a++){
				layer.fill(random(200,255),random(200,255),255,1-0.6*a/la)
				layer.ellipse(random(0,layer.width),a*8,4)
			}
			layer.stroke(125,75,25)
			layer.strokeWeight(20)
			layer.line(780,940,1020,1020)
            layer.line(1020,940,780,1020)
			layer.strokeWeight(10)
			layer.line(810,970,990,990)
            layer.line(960,930,840,1030)
			layer.noStroke()
			layer.fill(255,125,0,0.025)
			for(let a=0,la=10;a<la;a++){
            	layer.arc(900,920,(240-a*10),(240-a*10),-20,200)
            	layer.quad(900+cos(20)*(120-a*5),920-sin(20)*(120-a*5),900,920,900-cos(20)*(120-a*5),920-sin(20)*(120-a*5),900,600+a*12.5)
			}
			for(let a=0,la=20;a<la;a++){
            	layer.fill(255,125+a*5,0,0.15)
				layer.arc(900,920,(120-a*5),(120-a*5),-20,200)
            	layer.quad(900+cos(20)*(60-a*2.5),920-sin(20)*(60-a*2.5),900,920,900-cos(20)*(60-a*2.5),920-sin(20)*(60-a*2.5),900,760+a*6.25)
			}

			p1=new combatant(layer,new battle(layer,1),700,1040,0,0,0,0,1,0,0,30)
			p1.parts.mouth-=4
			p1.spin.mouth-=180
			p1.anim.eye=[1,1]
			p1.anim.eyeStyle=[2,2]
			p1.fades.kimono.main.front={x:1,y:0.975}
			p1.fades.kimono.main.back={x:1,y:0.975}
			p1.size=5
			p1.fade=1
			p1.trigger.display.extra.sword=false
            p1.anim.legs=[
                {top:30,bottom:87,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                {top:30,bottom:87,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
            ]
            p1.anim.arms=[
                {top:24,bottom:60,length:{top:16,bottom:16}},
                {top:24,bottom:60,length:{top:16,bottom:16}}
            ]
            p1.spin.legs=[{top:-60,bottom:-150,lock:0},{top:60,bottom:150,lock:0}]
            p1.spin.arms=[{top:-75,bottom:-12,lock:0},{top:75,bottom:-30,lock:0}]
			if(type==4){
				p1.trigger.display.extra.damage=true
			}
			p1.display()

			graphic=createGraphics(layer.width,layer.height)
			setupLayer(graphic)
			graphic.fill(0)
			graphic.rect(graphic.width/2,graphic.height/2,graphic.width,graphic.height)
			graphic.erase(0.2)
			graphic.rect(graphic.width/2,graphic.height/2,graphic.width,graphic.height)
			graphic.noErase()
			graphic.erase(0.025)
			for(let a=0,la=100;a<la;a++){
				graphic.arc(900,920,1440-a*24,1080-a*18,-180,0)
				graphic.arc(900,920,1440-a*24,360-a*6,0,180)
			}
			layer.image(graphic,0,0,layer.width,layer.height)
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

	setupGeneralGraphics()
	setupCombatantGraphics(0)
	setupCombatantGraphics(1)

	//setupBackground(0,graphics.backgrounds[0])
	setupBackground(1,graphics.backgrounds[1])
	setupBackground(3,graphics.backgrounds[3])
	/*
	0-Title (L)
	1-Loss (L)
	2-Win (L) //
	3-Rest (L)
	*/
}