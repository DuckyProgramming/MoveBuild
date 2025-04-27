function isCyclic(obj){
	var seenObjects=[]
	function detect(obj){
		if(obj&&typeof obj=='object'){
			if(seenObjects.indexOf(obj)!==-1){
				return true
			}
			seenObjects.push(obj)
			for(var key in obj){
				if(obj.hasOwnProperty(key)&&detect(obj[key])){
					console.log(obj,'cycle at'+key)
					return true
		  		}
			}
		}
		return false
	}
	return detect(obj)
}
function isInt(value){
	return !isNaN(value)&&parseInt(Number(value))==value&&!isNaN(parseInt(value,10))
}
//mark s
function setupConstants(){
	constants.sqrt2=sqrt(2)
	constants.sqrt3=sqrt(3)
	constants.phi=0.5*sqrt(5)+0.5
}
function setupLayer(layer){
	layer.noStroke()
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
}
function displayTransition(layer,transition){
	layer.noStroke()
	layer.fill(0)
	layer.rect(transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width-transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width/2,transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	layer.rect(layer.width/2,layer.height-transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	if(transition.trigger){
		if(variants.speedmove){
			transition.anim=round(transition.anim*5+1)/5
		}else{
			transition.anim=round(transition.anim*10+1)/10
		}
		if(transition.anim>=1.1){
			transition.trigger=false
			current.sceneChange(stage.scene,transition.scene)
			stage.scene=transition.scene
			if(transition.convert){
				transition.convert=false
				current.convert(stage.scene)
			}
			switch(stage.scene){
				case 'title':
					graphics.staticBackground.clear()
					setupBackground(8,graphics.staticBackground)
				break
				case 'menu':
					graphics.staticBackground.clear()
					setupBackground(9,graphics.staticBackground)
				break
				case 'menu2':
					graphics.staticBackground.clear()
					setupBackground(10,graphics.staticBackground)
				break
				case 'variants':
					graphics.staticBackground.clear()
					setupBackground(11,graphics.staticBackground)
				break
				case 'custom':
					graphics.staticBackground.clear()
					setupBackground(12,graphics.staticBackground)
				break
				case 'tutorial':
					graphics.staticBackground.clear()
					setupBackground(13,graphics.staticBackground)
				break
				case 'collection':
					graphics.staticBackground.clear()
					setupBackground(14,graphics.staticBackground)
				break
				case 'query':
					graphics.staticBackground.clear()
					setupBackground(15,graphics.staticBackground)
				break
				case 'listQuery':
					graphics.staticBackground.clear()
					setupBackground(16,graphics.staticBackground)
				break
				case 'rest':
					graphics.staticBackground.clear()
					setupBackground(3,graphics.staticBackground)
				break
				case 'victory':
					graphics.staticBackground.clear()
					setupBackground(2,graphics.staticBackground)
				break
				case 'defeat':
					graphics.staticBackground.clear()
					setupBackground(1,graphics.staticBackground)
				break
				case 'stash':
					graphics.staticBackground.clear()
					setupBackground(4,graphics.staticBackground)
				break
				case 'bossstash':
					graphics.staticBackground.clear()
					setupBackground(6,graphics.staticBackground)
				break
				case 'pack':
					graphics.staticBackground.clear()
					setupBackground(7,graphics.staticBackground)
				break
				case 'perk':
					graphics.staticBackground.clear()
					setupBackground(0,graphics.staticBackground)
				break
				case 'event':
					graphics.staticBackground.clear()
					setupBackground(5,graphics.staticBackground)
				break
			}
		}
	}
	else if(transition.anim>0){
		if(variants.speedmove){
			transition.anim=round(transition.anim*5-1)/5
		}else{
			transition.anim=round(transition.anim*10-1)/10
		}
	}
}
function regTriangle(layer,x,y,radiusX,radiusY,direction){
	layer.triangle(x+lsin(direction)*radiusX,y+lcos(direction)*radiusY,x+lsin(direction+120)*radiusX,y+lcos(direction+120)*radiusY,x+lsin(direction+240)*radiusX,y+lcos(direction+240)*radiusY)
}
function regPoly(layer,x,y,sides,radiusX,radiusY,direction){
	layer.beginShape()
	for(k=0;k<sides;k++){
		layer.vertex(x+lsin(direction+k*360/sides)*radiusX,y+lcos(direction+k*360/sides)*radiusY)
	}
	layer.endShape(CLOSE)
}
function regPolyStellate(layer,x,y,sides,stellate,radiusX,radiusY,direction){
	layer.beginShape()
	for(k=0;k<sides;k++){
		layer.vertex(x+lsin(direction+k*360/sides*stellate)*radiusX,y+lcos(direction+k*360/sides*stellate)*radiusY)
	}
	layer.endShape(CLOSE)
}
function regPolyBroken(layer,x,y,sides,radiusX,radiusY,direction){
	layer.beginShape()
	for(k=0;k<sides;k++){
		layer.vertex(x+lsin(direction+(k-k%2*0.5)*360/sides)*radiusX,y+lcos(direction+(k-k%2*0.5)*360/sides)*radiusY)
	}
	layer.endShape(CLOSE)
}
function regStar(layer,x,y,sides,radiusX,radiusY,radius2X,radius2Y,direction){
	layer.beginShape()
	for(k=0;k<sides*2;k++){
		layer.vertex(x+lsin(direction+k*180/sides)*(k%2==0?radiusX:radius2X),y+lcos(direction+k*180/sides)*(k%2==0?radiusY:radius2Y))
	}
	layer.endShape(CLOSE)
}
function regStarGear(layer,x,y,sides,gear,radiusX,radiusY,radius2X,radius2Y,direction){
	layer.beginShape()
	for(k=0;k<sides*(1+gear);k++){
		layer.vertex(x+lsin(direction+k*360/(1+gear)/sides)*(k%(1+gear)==0?radiusX:radius2X),y+lcos(direction+k*360/(1+gear)/sides)*(k%(1+gear)==0?radiusY:radius2Y))
	}
	layer.endShape(CLOSE)
}
function halfRegStar(layer,x,y,sides,radiusX,radiusY,radius2X,radius2Y,direction){
	layer.beginShape()
	for(k=0;k<sides*2+1;k++){
		layer.vertex(x+lsin(direction+k*90/sides)*(k%2==0?radiusX:radius2X),y+lcos(direction+k*90/sides)*(k%2==0?radiusY:radius2Y))
	}
	layer.endShape(CLOSE)
}
function regStarFlower(layer,x,y,sides,radiusX,radiusY,radius2X,radius2Y,direction){
	layer.beginShape()
	layer.vertex(x+lsin(direction)*radiusX,y+lcos(direction)*radiusY)
	for(k=0;k<sides;k++){
		layer.bezierVertex(
			x+lsin(direction+(k+1/6)*360/sides)*(radiusX*0.3+radius2X*0.7),y+lcos(direction+(k+1/6)*360/sides)*(radiusY*0.3+radius2Y*0.7),
			x+lsin(direction+(k+1/3)*360/sides)*(radiusX*0.1+radius2X*0.9),y+lcos(direction+(k+1/3)*360/sides)*(radiusY*0.1+radius2Y*0.9),
			x+lsin(direction+(k+0.5)*360/sides)*radius2X,y+lcos(direction+(k+0.5)*360/sides)*radius2Y
		)
		layer.bezierVertex(
			x+lsin(direction+(k+2/3)*360/sides)*(radiusX*0.1+radius2X*0.9),y+lcos(direction+(k+2/3)*360/sides)*(radiusY*0.1+radius2Y*0.9),
			x+lsin(direction+(k+5/6)*360/sides)*(radiusX*0.3+radius2X*0.7),y+lcos(direction+(k+5/6)*360/sides)*(radiusY*0.3+radius2Y*0.7),
			x+lsin(direction+(k+1)*360/sides)*radiusX,y+lcos(direction+(k+1)*360/sides)*radiusY
		)
	}
	layer.endShape(CLOSE)
}
function diamond(layer,x,y,width,height,direction){
	layer.quad(x-width*lcos(direction),y-width*lsin(direction),x-height*lsin(direction),y-height*lcos(direction),x+width*lcos(direction),y+width*lsin(direction),x+height*lsin(direction),y+height*lcos(direction))
}
function pentagon(layer,x1,y1,x2,y2,x3,y3,x4,y4,x5,y5){
	layer.beginShape()
	layer.vertex(x1,y1)
	layer.vertex(x2,y2)
	layer.vertex(x3,y3)
	layer.vertex(x4,y4)
	layer.vertex(x5,y5)
	layer.endShape(CLOSE)
}
function plus(layer,size){
	layer.line(-size,-size*4,size,-size*4)
	layer.line(-size,-size*4,-size,-size)
	layer.line(size,-size*4,size,-size)
	layer.line(-size,size*4,size,size*4)
	layer.line(-size,size*4,-size,size)
	layer.line(size,size*4,size,size)
	layer.line(-size*4,-size,-size*4,size)
	layer.line(-size*4,-size,-size,-size)
	layer.line(-size*4,size,-size,size)
	layer.line(size*4,-size,size*4,size)
	layer.line(size*4,-size,size,-size)
	layer.line(size*4,size,size,size)
}
function flower(layer,size,color,width,height,fade,extent){
	layer.push()
	layer.scale(size)
	layer.strokeWeight(0.6)
	layer.strokeJoin(ROUND)
	for(let a=0,la=extent;a<la;a++){
		for(let b=0,lb=5;b<lb;b++){
			layer.fill(...mergeColor(color[0],color[1],a/la),fade)
			layer.stroke(...mergeColor(color[0],color[1],a/la),fade)
			if(a<la/2){
				layer.beginShape()
				layer.vertex(0,0)
				layer.bezierVertex(-width[0]*(1-a/la*2),-30,-width[1]*(1-a/la*2),-40,-width[2],-70)
				layer.vertex(-width[2]*(1-(a+1)/la*2),-height[0])
				layer.endShape(CLOSE)
			}
			layer.rotate(-72)
			layer.beginShape()
			layer.vertex(0,0)
			layer.bezierVertex(width[0],-30,width[1],-40,width[2],-70)
			if(a>=la/2){
				layer.vertex(width[2]*(-1+a/la*2),-height[0])
				layer.bezierVertex(width[1]*(-1+a/la*2),-40,width[0]*(-1+a/la*2),-30,0,0)
			}else{
				layer.vertex(0,-height[0])
			}
			layer.endShape(CLOSE)
		}
	}
	layer.noStroke()
	layer.fill(...color[2],fade)
	for(let a=0,la=5;a<la;a++){
		layer.rotate(60)
		layer.quad(0,-4,width[3],-16,0,-24,-width[3],-16)
		layer.rotate(12)
	}
	layer.fill(...color[3],fade)
	layer.ellipse(0,0,12,12)
	layer.pop()
}
function crystalFlower(layer,size,direction,color,width,height,fade){
	layer.push()
	layer.scale(size)
    layer.rotate(direction)
    for(let a=0,la=5;a<la;a++){
        for(let b=0,lb=100;b<lb;b++){
            layer.fill(...mergeColor(color[0],color[1],1-b/lb),fade)
            layer.beginShape()
            layer.vertex(0,0)
            layer.bezierVertex(-width[0]*(1-b/lb),-15*(1-b/lb),-width[0]*(1-b/lb),-55*(1-b/lb),-width[1]*(1-b/lb),-70*(1-b/lb))
            layer.vertex(0,-height[0]*(1-0.75*b/lb))
            layer.endShape(CLOSE)
        }
        layer.rotate(-72)
        for(let b=0,lb=100;b<lb;b++){
            layer.fill(...mergeColor([216,112,124],[247,225,225],1-b/lb),fade)
            layer.beginShape()
            layer.vertex(0,0)
            layer.bezierVertex(width[0]*(1-b/lb),-15*(1-b/lb),width[0]*(1-b/lb),-55*(1-b/lb),width[1]*(1-b/lb),-70*(1-b/lb))
            layer.vertex(0,-height[0]*(1-0.75*b/lb))
            layer.endShape(CLOSE)
        }
    }
    layer.fill(...color[2],fade)
    for(let a=0;a<5;a++){
        layer.rotate(60)
        layer.quad(0,-4,width[2],-16,0,-24,-width[2],-16)
        layer.rotate(12)
    }
    layer.fill(...color[3],fade)
    layer.ellipse(0,0,12,12)
    layer.pop()
}
function mergeColor(color1,color2,value){
	return [color1[0]*(1-value)+color2[0]*value,color1[1]*(1-value)+color2[1]*value,color1[2]*(1-value)+color2[2]*value]
}
function mergeColor3(color1,color2,color3){
	return [(color1[0]+color2[0]+color3[0])/3,(color1[1]+color2[1]+color3[1])/3,(color1[2]+color2[2]+color3[2])/3]
}
function upColor(color,value,key){
	return [color[0]+value*key[0],color[1]+value*key[1],color[2]+value*key[2]]
}
function flipColor(color){
	return [255-color[0],255-color[1],255-color[2]]
}
function RGBtoHSV(r,g,b){
	let minV=min(r,g,b)
	let maxV=max(r,g,b)
    let h,s=0
    let v=maxV
	let delta=maxV-minV
	if(maxV!=0&&delta!=0){
		s=delta/maxV
		if(r==maxV){
			h=(g-b)/delta
		}else if(g==maxV){
			h=2+(b-r)/delta
		}else{
			h=4+(r-g)/delta
		}
        h*=60
        if(h<0){
            h+=360
        }
    }else{
		s=0
		h=-1
	}
    return [h,s,v]
}
function HSVtoRGB(h,s,v){
	let i,f,p,q,t,r,g,b=0
	if(s==0){
		r,g,b=v
	}else{
		h/=60
		i=floor(h)
		f=h-i
		p=v*(1-s)
		q=v*(1-s*f)
		t=v*(1-s*(1-f))
		switch(i){
			case 0:
				r=v
				g=t
				b=p
			break
			case 1:
				r=q
				g=v
				b=p
			break
			case 2:
				r=p
				g=v
				b=t
			break
			case 3:
				r=p
				g=q
				b=v
			break
			case 4:
				r=t
				g=p
				b=v
			break
			default:
				r=v
				g=p
				b=q
			break
		}
	}
    return [r,g,b]
}
function mergeColorHSV(color1,color2,value){
	let color1f=RGBtoHSV(color1[0],color1[1],color1[2])
	let color2f=RGBtoHSV(color2[0],color2[1],color2[2])
    if(abs(color1f[0]-color2f[0])<90){
        return HSVtoRGB(color1f[0]*(1-value)+color2f[0]*value,color1f[1]*(1-value)+color2f[1]*value,color1f[2]*(1-value)+color2f[2]*value)
    }else if(color2f[0]>color1f[0]){
        return HSVtoRGB((color1f[0]*(1-value)+(color2f[0]-360)*value+360)%360,color1f[1]*(1-value)+color2f[1]*value,color1f[2]*(1-value)+color2f[2]*value)
    }else if(color2f[0]<color1f[0]){
        return HSVtoRGB((color1f[0]*(1-value)+(color2f[0]+360)*value)%360,color1f[1]*(1-value)+color2f[1]*value,color1f[2]*(1-value)+color2f[2]*value)
    }
}
function toggle(bool){
	return bool?false:true
}
function bezierArc(x,y,width,height,angle1,angle2){
	let x1=x+lsin(angle1)*width/2
	let y1=y-lcos(angle1)*height/2
	let x2=x+lsin(angle2)*width/2
	let y2=y-lcos(angle2)*height/2
	let ax=x1-x
	let ay=y1-y
	let bx=x2-x
	let by=y2-x
	q1=ax**2+ay**2
	q2=q1+ax*bx+ay*by
	k2=4/3*(sqrt(2*q1*q2)-q2)/(ax*by-ay*bx)
	x3=xc+ax-k2*ay
	y3=yc+ay+k2*ax
	x4=xc+bx+k2*by
	y4=yc+by-k2*bx
	return [x1,y1,x3,y3,x4,y4,x2,y2]
}
function sign(value){
	return value<0?-1:1
}
function pointInsideBox(point,box){
	return point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2
}
function arrayPurge(array,purge){
	let base=copyArray(array)
	for(let a=0,la=array.length;a<la;a++){
		for(let b=0,lb=purge.length;b<lb;b++){
			if(array[a]==purge[b]){
				array.splice(a,1)
				a--
				la--
				b=lb
			}
		}
	}
	return base
}
function occurences(array,item){
	let total=0
	for(let a=0,la=array.length;a<la;a++){
		if(array[a]==item){
			total++
		}
	}
	return total
}
function arrayIncludes(array,includes){
	for(let a=0,la=array.length;a<la;a++){
		let lb=includes.length
		for(let b=0;b<lb;b++){
			if(includes[b]!=array[a][b]){
				lb=0
			}
		}
		if(lb>0){
			return true
		}
	}
	return false
}
function arrayCompare(array1,array2){
	if(array1.length!=array2.length){
		return false
	}
	for(let a=0,la=array1.length;a<la;a++){
		if(array1[a]!=array2[a]){
			return false
		}
	}
	return true
}
function arrayCompareLoose(array1,array2){
	for(let a=0,la=array1.length;a<la;a++){
		if(!array2.includes(array1[a])){
			return false
		}
	}
	return true
}
function calculateEffect(effect,user,type,player,relicManager,variant,args){
	switch(type){
		case 0: case 2: case 5: case 7: case 8: case 10: case 11: case 12: case 13: case 20:
			let damage=effect
			let bonus=0
			let totalStr=0
			if(variant&&args[0]&&relicManager.hasRelic(50,player)){
				bonus+=2
			}
			if(variant&&args[1]&&user.status.main[76]>0){
				bonus+=user.status.main[76]
			}
			if(variant&&args[2]&&user.status.main[166]>0){
				bonus+=user.status.main[166]
			}
			if(variant&&args[3]&&user.status.main[340]>0){
				bonus+=user.status.main[340]
			}
			if(variant&&args[4]&&user.status.main[402]!=0){
				bonus+=user.status.main[402]
			}
			if(variant&&args[6]&&user.status.main[403]>0){
				bonus+=user.status.main[403]
			}
			if(variant&&args[7]&&user.status.main[404]>0){
				bonus+=user.status.main[404]
			}
			if(variant&&args[8]&&user.status.main[413]>0){
				bonus+=user.status.main[413]
			}
			if(variant&&args[9]&&user.status.main[544]>0){
				bonus+=user.status.main[544]
			}
			if(variant&&args[10]&&user.status.main[797]>0){
				bonus+=user.status.main[797]
			}
			if(user.status.main[12]>0){
				bonus+=user.status.main[12]
			}
			if(user.status.main[40]>0){
				bonus+=user.status.main[40]
			}
			if(user.status.main[186]>0){
				bonus+=user.status.main[186]
			}
			if(user.status.main[75]>0){
				bonus-=user.status.main[75]
			}
			if(user.status.main[175]>0){
				bonus-=user.status.main[175]
			}
			if(user.status.main[231]>0){
				bonus+=user.status.main[231]
			}
			if(user.status.main[236]>0&&effect<=10){
				bonus+=user.status.main[236]
			}
			if(user.status.main[264]>0){
				bonus-=user.status.main[264]
			}
			if(user.status.main[353]>0){
				bonus+=user.status.main[353]
			}
			if(user.status.main[6]!=0){
				totalStr+=user.status.main[6]
			}
			if(user.status.main[17]!=0){
				totalStr+=user.status.main[17]
			}
			if(user.status.main[163]!=0){
				totalStr+=user.status.main[163]
			}
			if(user.status.main[195]!=0){
				totalStr+=user.status.main[195]
			}
			if(totalStr>0){
				damage*=1+totalStr*0.1
				bonus*=1+totalStr*0.1
			}else if(totalStr<0){
				damage*=max(0.2,1+totalStr*0.1)
				bonus*=max(0.2,1+totalStr*0.1)
			}
			if(user.status.main[0]>0){
				damage*=2
				bonus*=2
			}
			if(user.status.main[8]>0&&user.status.main[779]<=0){
				damage*=user.battle.modded(213)&&user.id<user.battle.players?0:user.status.main[381]>0?1.25:0.75
				bonus*=user.battle.modded(213)&&user.id<user.battle.players?0:user.status.main[381]>0?1.25:0.75
			}
			if(user.status.main[82]>0){
				damage*=2
				bonus*=2
			}
			if(user.status.main[154]>0){
				damage*=3
				bonus*=3
			}
			if(user.status.main[159]>0){
				damage*=1.5
				bonus*=1.5
			}
			if(user.status.main[198]>0){
				damage/=2
				bonus/=2
			}
			if(user.status.main[201]>0){
				damage=damage*2-1
				bonus*=2
			}
			if(user.status.main[216]>0){
				damage=damage*1.5+1
				bonus*=1.5
			}
			if(user.status.main[238]>0&&effect%2==1){
				damage*=2
				bonus*=2
			}
			if(user.status.main[239]>0&&effect<=10){
				damage*=2
				bonus*=2
			}
			if(user.status.main[242]>0&&effect>=20){
				damage*=2
				bonus*=2
			}
			if(user.status.main[271]>0){
				damage*=0.75
				bonus*=0.75
			}
			if(user.status.main[215]>0){
				damage=0
				bonus=0
			}
			if(user.status.main[301]>0){
				damage*=2
				bonus*=2
			}
			if(user.status.main[320]>0){
				damage*=2
				bonus*=2
			}
			if(user.status.main[357]>0){
				damage=0
				bonus=0
			}
			if(user.status.main[363]>0){
				damage*=2
				bonus*=2
			}
			if(user.stance==1){
				damage*=user.status.main[478]>0?3:2
				bonus*=user.status.main[478]>0?3:2
			}
			if(user.stance==4){
				damage*=0.5
				bonus*=0.5
			}
			if(user.stance==5){
				damage*=3
				bonus*=3
			}
			switch(type){
				case 0: return damage==effect&&bonus==0?tennify(effect):tennify(effect)+`(${tennify(damage+bonus)})`
				case 2: return (damage==effect?(effect==1?``:tennify(effect))+'X':tennify(effect)+`(${tennify(damage)})X`)+(bonus>0?`(+${tennify(bonus)})`:``)
				case 5: return (damage==effect?(effect==1?``:tennify(effect))+'XX':tennify(effect)+`(${tennify(damage)})XX`)+(bonus>0?`(+${tennify(bonus)})`:``)
				case 7: return effect==1?(damage==effect?`Combo`:`1(${tennify(damage)})*Combo`):(damage==effect?tennify(effect)+'*Combo':tennify(effect)+`(${tennify(damage)})*Combo`)
				case 8: return effect==1?(damage==effect&&bonus==0?tennify(effect)+'1*Combo':tennify(effect)+`1(${tennify(damage)})*Combo`)+(bonus>0?`(+${tennify(bonus)})`:``):(damage==effect&&bonus==0?tennify(effect)+'*Combo':tennify(effect)+`(${tennify(damage)})*Combo`)+(bonus>0?`(+${tennify(bonus)})`:``)
				case 10: return damage==effect?tennify(effect):tennify(effect)+`(${tennify(damage)})`
				case 11: return (damage==effect?(effect==1?``:`${tennify(effect)}`)+'X':tennify(effect)+`(${tennify(damage)})X`)
				case 12: return effect==1?(damage==effect?'Faith':`1(${tennify(damage)})*Faith`):(damage==effect?tennify(effect)+'*Faith':tennify(effect)+`(${tennify(damage)})*Faith`)
				case 13: return effect==1?(damage==effect?'':`1(${tennify(damage)})*`):(damage==effect?tennify(effect)+'*':tennify(effect)+`(${tennify(damage)})*`)
				case 20: return (damage==effect?(effect==1?``:tennify(effect))+'XY':tennify(effect)+`(${tennify(damage)})XY`)+(bonus>0?`(+${tennify(bonus)})`:``)

			}
		case 1: case 3: case 6: case 14: case 15: case 16: case 21:
			let block=effect
			let bonusB=0
			let totalDex=0
			if(variant&&args[5]&&user.status.main[585]!=0){
				bonusB+=user.status.main[585]
			}
			if(variant&&args[9]&&user.status.main[544]>0){
				bonusB+=user.status.main[544]
			}
			if(variant&&args[10]&&user.status.main[797]>0){
				bonusB+=user.status.main[797]
			}
			if(user.status.main[168]>0){
				bonusB+=user.status.main[168]
			}
			if(user.status.main[185]>0){
				bonusB+=user.status.main[185]
			}
			if(user.status.main[187]>0){
				bonusB-=user.status.main[187]
			}
			if(user.status.main[7]!=0){
				totalDex+=user.status.main[7]
			}
			if(user.status.main[18]!=0){
				totalDex+=user.status.main[18]
			}
			if(totalDex>0){
				block*=1+totalDex*0.1
			}else if(totalDex<0){
				block*=max(0.2,1+totalDex*0.1)
			}
			if(user.status.main[9]>0&&user.status.main[779]<=0){
				block*=user.battle.modded(217)&&user.id<user.battle.players?0:0.75
			}
			if(user.status.main[65]>0){
				block*=2
			}
			if(user.status.main[138]>0){
				block*=3
			}
			if(user.status.main[160]>0){
				block*=1.5
			}
			if(user.status.main[273]>0){
				block=0
			}
			block=float(tennify(block))
			switch(type){
				case 1: return block==effect&&bonusB==0?tennify(effect):tennify(effect)+`(${tennify(block+bonusB)})`
				case 3: return (block==effect?(effect==1?``:tennify(effect))+'X':(effect==1?``:tennify(effect))+`(${tennify(block)})X`)+(bonusB>0?`(+${tennify(bonusB)})`:``)
				case 6: return effect==1?(block==effect?'Combo':`1(${tennify(block)})*Combo`):(block==effect?tennify(effect)+'*Combo':tennify(effect)+`(${tennify(block)})*Combo`)
				case 14: return block==effect?tennify(effect):tennify(effect)+`(${tennify(block)})`
				case 15: return effect==1?(block==effect?'':`1(${tennify(block)})*`):(block==effect?tennify(effect)+'*':tennify(effect)+`(${tennify(block)})*C`)
				case 16: return (block==effect?(effect==1?``:tennify(effect))+'X':tennify(effect)+`(${tennify(block)})X`)
				case 21: return (block==effect?(effect==1?``:tennify(effect))+'XX':(effect==1?``:tennify(effect))+`(${tennify(block)})XX`)+(bonusB>0?`(+${tennify(bonusB)})`:``)

			}
		case 4: case 9:
			let health=effect
			if(relicManager.hasRelic(53,player)){
				health*=1.5
			}
			if(relicManager.hasRelic(284,player)){
				health*=0.5
			}
			health=float(tennify(health))
			switch(type){
				case 4: return health==effect?tennify(effect):tennify(effect)+` (${tennify(health)})`
				case 9: return health==effect?(effect==1?``:tennify(effect))+`X`:tennify(effect)+` (${tennify(health)})X`
			}
		case 17: case 18:
			let barrier=effect
			let bonusBA=0
			let totalDexBA=0
			if(user.status.main[7]!=0){
				totalDexBA+=user.status.main[7]
			}
			if(user.status.main[18]!=0){
				totalDexBA+=user.status.main[18]
			}
			if(totalDexBA>0){
				barrier*=1+totalDexBA*0.1
			}else if(totalDexBA<0){
				barrier*=max(0.2,1+totalDexBA*0.1)
			}
			barrier=tennify(barrier)
			switch(type){
				case 17: return barrier==effect&&bonusBA==0?tennify(effect):tennify(effect)+`(${tennify(barrier+bonusBA)})`
				case 18: return (barrier==effect?(effect==1?``:tennify(effect))+'X':(effect==1?``:tennify(effect))+`(${tennify(barrier)})X`)+(bonusBA>0?`(+${tennify(bonusBA)})`:``)

			}
		case 19:
			let range=effect
			if(variant&&args[0]&&user.status.main[407]>0){
				range+=user.status.main[407]
			}
			if(variant&&args[5]&&user.status.main[412]>0){
				range+=user.status.main[412]
			}
			if(variant&&args[6]&&user.status.main[411]>0){
				range+=user.status.main[411]
			}
			return range==effect?`${effect}`:`${effect}(${range})`
	}
}
function calculateIntent(effect,user,type){
	return calculateEffect(effect,user,type,-1,new disabledRelicManager(),false,[])
}
function intentDescription(attack,user,info){
	try{
		switch(attack.type){
			case 1: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-1`
			case 2: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-1`
			case 3: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-1`
			case 4: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block`
			case 5: return `Add ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[0])}`
			case 6: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2`
			case 7: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-2`
			case 8: return `Add ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[0])}\nRange 1-2`
			case 9: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-1`
			case 10: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies`
			case 11: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\nRange 1-1`
			case 12: case 80: case 115: case 161: case 165: case 245: case 283: case 362: case 425:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6\nNo Movement`
			case 13: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-1`
			case 14: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-2`
			case 15: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-2`
			case 16: case 416:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Directions\nRange 1-1`
			case 17: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Directions\nTargets Cannot Move\nFor ${info?attack.effect[1]:`?`} Turn${pl(attack.effect[1])}\nRange 1-1`
			case 18: return `Gain ${info?attack.effect[0]:`?`} Strength`
			case 19: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-2`
			case 20: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-2`
			case 21: return `Do Nothing`
			case 22: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-1`
			case 23: return `Apply ${info?attack.effect[0]:`?`} Weak\nRange 1-1`
			case 24: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bleed\nRange 1-2`
			case 25: return `Heal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nFor All Enemies`
			case 26: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Strength`
			case 27: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Frail\nRange 1-2`
			case 28: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-2`
			case 29: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 1 Turn`
			case 30: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\nRange 1-2`
			case 31: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-1`
			case 32: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-2`
			case 33: return `Apply ${info?attack.effect[0]:`?`} Weak\nRange 1-2`
			case 34: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nGain 1 Combo Per Hit\nRange 1-1`
			case 35: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nGain 1 Combo\nRange 1-1`
			case 36: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain 1 Combo Per Hit\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-1`
			case 37: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage+${info?calculateIntent(attack.effect[1],user,0):`?`}*Combo\nRange 1-1`
			case 38: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6`
			case 39: return `Spawn ${info?attack.effect[0]:`?`} ${info?attack.effect[1]+(pl(attack.effect[0])):`?`}`
			case 40: return `Create ${info?attack.effect[0]:`?`} Landmine${pl(attack.effect[0])}`;
			case 41: return `Create ${info?attack.effect[0]:`?`} Spike${pl(attack.effect[0])}`;
			case 42: return `Create ${info?attack.effect[0]:`?`} Trenche${pl(attack.effect[0])}`;
			case 43: return `Create Target Zone\nfor ${info?attack.effect[0]:`?`} Damage`
			case 44: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bleed\n3 Tiles Wide\nRange 1-2`
			case 45: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-6`
			case 46: return `Create Target Line\nfor ${info?attack.effect[0]:`?`} Damage`
			case 47: case 173:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-6\nNo Movement`
			case 48: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 2 Turns`
			case 49: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-6\nNo Movement`
			case 50: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turn${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 51: return `Create ${info?attack.effect[0]:`?`} Trap${pl(attack.effect[0])}`;
			case 52: return `Create ${info?attack.effect[0]:`?`} Slime Tile${pl(attack.effect[0])}`;
			case 53: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\n3 Tiles Wide\nRange 1-2`
			case 54: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nin All Directions\nRange 1-1`
			case 55: return `Apply ${info?attack.effect[0]:`?`} Weak\nin All Directions\nRange 1-2`
			case 56: return `Create ${info?attack.effect[0]:`?`} Shield Particle${pl(attack.effect[0])}`
			case 57: return `Gain Block Equal\nto Health of\nShield Particles`
			case 58: return `Apply ${info?attack.effect[0]:`?`} Bleed\nRange 1-1`
			case 59: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-6`
			case 60: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\n3 Tiles Wide\nRange 1-1`
			case 61: return `Apply ${info?attack.effect[0]:`?`} Frail\nRange 1-2`
			case 62: return `Apply ${info?attack.effect[0]:`?`} Vulnerable\nRange 1-2`
			case 63: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Dexterity`
			case 64: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nIgnore Block\nRange 1-1`
			case 65: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Retain Block\nFor 1 Turn`
			case 66: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-2`
			case 67: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSteal ${info?attack.effect[1]:`?`} Currency\nRange 1-2`
			case 68: return `Leave Battle`
			case 69: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\n3 Tiles Wide\nRange 1-1`
			case 70: return `Heal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nFor Core`
			case 71: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-3`
			case 72: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Strength`
			case 73: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-3`
			case 74: return `Add ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[0])}\nUpgrade All ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}s\nRange 1-3`
			case 75: return `Create Currency on All Tiles`
			case 76: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-2`
			case 77: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 4 Times\nRange 1-2`
			case 78: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nBetween Self and\nOther Bronze Orbs`
			case 79: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-3`
			case 81: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 82: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\n3 Tiles Wide\nRange 1-1`
			case 83: case 463:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6`
			case 84: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\n3 Tiles Wide\nRange 1-1`
			case 85: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n2 Tiles Forward,\n1 Tile to the Side,\nor 1 Tile Diagonally`
			case 86: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n2 Tiles Forward,\n1 Tile to the Side,\nor 1 Tile Diagonally`
			case 87: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nin All Directions\nRange 1-1`
			case 88: return `You Cannot Move\nFor ${info?attack.effect[0]:`?`} Turn${pl(attack.effect[0])}`
			case 89: case 145: case 338:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 90: case 235:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-6\nNo Movement`
			case 91: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 92: return `Draw ${info?attack.effect[0]:`?`} Less\nCard${pl(attack.effect[0])} Next Turn`
			case 93: return `Target Loses ${info?attack.effect[0]:`?`} ${variants.mtg?`Random Mana`:`Energy`}`
			case 94: return `Apply ${info?attack.effect[0]:`?`} Anti-Control`
			case 95: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 4 Times\n3 Tiles Wide\nRange 1-1`
			case 96: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPulls at Range 2\nRange 1-2`
			case 97: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nPush 1 Tile\nRange 1-1`
			case 98: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-6`
			case 99: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-3`
			case 100: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-4`
			case 101: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 4 Times\nRange 1-1`
			case 102: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 3 Turns`
			case 103: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-1`
			case 104: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\n3 Tiles Wide\nRange 1-1`
			case 105: return `Add ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[0])}\n3 Tiles Wide\nRange 1-2`
			case 106: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush to End\nRange 1-6`
			case 107: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nGain ${info?attack.effect[1]:`?`} Strength\nRange 1-2`
			case 108: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nCounter ${info?calculateIntent(attack.effect[1],user,0):`?`}`
			case 109: return `Heal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health`
			case 110: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nRetain Block\nFor 1 Turn\nCounter ${info?calculateIntent(attack.effect[1],user,0):`?`}`
			case 111: return `Gain ${info?attack.effect[0]:`?`} Metallicize`
			case 112: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Strength\nRange 1-2`
			case 113: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHeal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nRange 1-1`
			case 114: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Frail\n3 Tiles Wide\nRange 1-1`
			case 116: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMove 1 Tile Away\nRange 1-1`
			case 117: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap`
			case 118: case 236:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-6\nNo Movement`
			case 119: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDraw ${info?attack.effect[1]:`?`} Less\nCard${pl(attack.effect[1])} Next Turn\nRange 1-6\nNo Movement`
			case 120: return `Apply ${info?attack.effect[0]:`?`} Distracted\nin All Directions\nRange 1-1`
			case 121: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Right\nRange 1-1`
			case 122: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Left\nRange 1-1`
			case 123: return `Apply ${info?attack.effect[0]:`?`} Bleed\nRange 1-6\nNo Movement`
			case 124: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} ${variants.mtg?`Random Mana`:`Energy`}\n3 Tiles Wide\nRange 1-1`
			case 125: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSwap With Target\nRange 1-6`
			case 126: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Retain Block\nFor 2 Turns`
			case 127: case 363:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nRange 2-2`
			case 128: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-1`
			case 129: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\nRange 1-6\nNo Movement`
			case 130: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-6\nNo Movement`
			case 131: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Directions Wide\nRange 1-6\nNo Movement`
			case 132: return `Add ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[0])}\nin All Directions\nRange 1-1`
			case 133: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nin All Directions\nRange 1-1`
			case 134: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6\nNo Movement\nIf No Target,\nCreate Target Zone`
			case 135: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nand Add ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nto All Targets and Swap`
			case 136: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Directions\nKill Self\nRange 1-1`
			case 137: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2\nTargets Adjacent Diagonals`
			case 138: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Back Left\nRange 1-2`
			case 139: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Back Right\nRange 1-2`
			case 140: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Move\nFor ${info?attack.effect[1]:`?`} Turn${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 141: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} ${variants.mtg?`Random Mana`:`Energy`}\nRange 1-6\nNo Movement`
			case 142: return `Gain ${info?attack.effect[0]:`?`} Strength\nDeal ${info?calculateIntent(attack.effect[1],user,0):`?`} Damage\nPush 1 Tile\nin All Directions\nRange 1-1`
			case 143: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 2 Tiles\nRange 1-3`
			case 144: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nStaple ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 146: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\n3 Tiles Wide\nRange 1-2`
			case 147: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nin All Directions\nRange 1-1`
			case 148: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Poison\nRange 1-6\nNo Movement`
			case 149: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Bleed\nRange 1-2`
			case 150: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nSmoke ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])}\nRange 2-2`
			case 151: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\nRange 1-6\nNo Movement`
			case 152: return `Apply ${info?attack.effect[0]:`?`} Weak\nRange 1-6`
			case 153: return `Apply ${info?attack.effect[0]:`?`} Weak\n3 Tiles Wide\nRange 1-1`
			case 154: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nSpawn Line of Poison Tiles`
			case 155: return `Spawn ${info?attack.effect[0]:`?`} ${info?attack.effect[1]+(pl(attack.effect[0])):`?`} Nearby`
			case 156: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nPulls at Range 2\nRange 1-2`
			case 157: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nPush 1 Tile\nin All Directions\nRange 1-1`
			case 158: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Exhausts ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 159: return `Gain ${info?attack.effect[0]:`?`} Stack${pl(attack.effect[0])} of\na Random Buff or Nerf`
			case 160: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPull to 1 Range\nRange 1-1`
			case 162: return `Move until Collision,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage`
			case 163: return `Heal ${info?attack.effect[0]:`?`} Health\nNext ${info?attack.effect[1]:`?`} Attack${pl(attack.effect[1])}\nDeal${attack.effect[1]==1?`s`:``} Double Damage`;
			case 164: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-2`
			case 166: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nPulls at 2 Range\nin All Directions\nRange 1-2`
			case 167: return `Gain ${info?attack.effect[0]:`?`}-${info?attack.effect[1]:`?`} Stacks of\n5 Random Buffs or Nerfs`
			case 168: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\n3 Tiles Wide\nRange 1-2`
			case 169: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Regeneration`
			case 170: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Buffer`
			case 171: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Bleed\n3 Tiles Wide\nRange 1-2`
			case 172: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Percent Health as Damage\nRange 1-3`
			case 174: return `Take Half Damage\nFor ${info?attack.effect[0]:`?`} Turns`
			case 175: return `Move up to 3 Tiles,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap`
			case 176: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin 12 Directions\nRange 1-2`
			case 177: return `Become Invisible for ${info?attack.effect[0]:`?`} Turns`
			case 178: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6`
			case 179: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 180: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPulls at Range 2\nand Above\nRange 1-6`
			case 181: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 2-2`
			case 182: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 6 Turns`
			case 183: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd (3-Range)x${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-2`
			case 184: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n6 Times\nRange 1-6`
			case 185: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-6`
			case 186: return `Respawn All Defeated\nAllies Nearby`
			case 187: return `Gain ${info?attack.effect[0]:`?`} Buffer\nGain ${info?attack.effect[1]:`?`} Strength`
			case 188: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`}xRange Damage\nRange 1-6\nNo Movement`
			case 189: return `Spawn ${info?attack.effect[0]:`?`} ${info?attack.effect[1]+(attack.effect[0]>0?`s`:``):`?`} at Corners\nHas Chance to Spawn ${info?attack.effect[2]+(attack.effect[0]>0?`s`:``):`?`}`
			case 190: return `Add ${info?attack.effect[0]:`?`} Block\nGain ${info?attack.effect[1]:`?`} Armor\nGain ${info?attack.effect[2]:`?`} Strength`
			case 191: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\nRange 1-6\nNo Movement`
			case 192: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nin All Directions\nRange 1-2`
			case 193: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turn${pl(attack.effect[1])}\nRange 1-6`
			case 194: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6`
			case 195: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nUsable in 3 Directions`
			case 196: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6`
			case 197: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Armor`
			case 198: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Directions\nTargets Lose ${info?attack.effect[1]:`?`} ${variants.mtg?`Random Mana`:`Energy`}\nRange 1-1`
			case 199: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTransform ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])}\nRange 1-6`
			case 200: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHeal Health Equal to\nUnblocked Damage Dealt\nRange 1-6`
			case 201: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSet Values of ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])} to 1\nRange 1-6`
			case 202: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nClear Target Statuses\nRange 1-6`
			case 203: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile in a Random Direction\nRange 1-2`
			case 204: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n5 Tiles Wide\nRange 1-1`
			case 205: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin 3 Directions\nRange 1-6`
			case 206: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nSwap With Target\nRange 1-6`
			case 207: return `Gain ${info?attack.effect[0]:`?`} Strength\nGains Double When Below Half Health`
			case 208: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nRange 1-6`
			case 209: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nRange 1-1`
			case 210: return `Move ${info?attack.effect[0]:`?`} More Time${pl(attack.effect[0])} Per Turn`
			case 211: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPushes at Range 1\nPulls at Range 2\nRange 1-2`
			case 212: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nIf Successful, Repeats Once\nRange 1-1`
			case 213: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Left\nin All Directions\nRange 1-1`
			case 214: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2\nTargets 2 Adjacent Tiles`
			case 215: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Dissipate\nin All Directions\nRange 1-2`
			case 216: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage to Self\nHeal Health to Boss\nEqual to Damage Dealt`
			case 217: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Directions\nSpawn ${info?attack.effect[1]:`?`} ${info?attack.effect[2]+(attack.effect[1]>0?`s`:``):`?`}\nOn Hit\nRange 1-1`
			case 218: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Diagonal Directions\nRange 1-6\nNo Movement`
			case 219: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Directions\nRange 1-6\nNo Movement`
			case 220: return `Take Third Damage\nFor ${info?attack.effect[0]:`?`} Turns`
			case 221: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-3\nTargets 2 Adjacent Tiles\nTargets Adjacent Diagonals`
			case 222: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin a 60 Degree Field\nRange 1-3`
			case 223: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHits All Targets in Range\nPush 1 Tile Right\nRange 1-2`
			case 224: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHits All Targets in Range\nPush 1 Tile Left\nRange 1-2`
			case 225: return `Kill Self\nReturn Next Turn,\nHealed to Full`
			case 228: return `Counter ${info?calculateIntent(attack.effect[0],user,0):`?`} All This Combat`
			case 229: return `Apply ${info?calculateIntent(attack.effect[0],user,0):`?`} Take Per Turn`
			case 230: return `Add ${info?attack.effect[0]:`?`} Block\nto Builder`
			case 231: return `Builder Draws ${info?attack.effect[0]:`?`}\nCard${pl(attack.effect[0])}`
			case 232: return `Builder and Allied Constructs\nGain ${info?attack.effect[0]:`?`}\nTemporary Strength`
			case 233: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTo Targets in\nAll Directions`
			case 234: return `Builder Adds ${info?attack.effect[0]:`?`}\nRevolver${pl(attack.effect[0])} to Hand`
			case 237: return `Builder Gains ${info?attack.effect[0]:`?`}\nMetal`
			case 238: return `Builder Upgrades ${info?attack.effect[0]:`?`}\nCard${pl(attack.effect[0])}`
			case 239: return `Builder Transforms ${info?attack.effect[0]:`?`}\nCard${pl(attack.effect[0])}`
			case 240: return `Builder Duplicates ${info?attack.effect[0]:`?`}\nCard${pl(attack.effect[0])}`
			case 241: return `Builder Exhausts ${info?attack.effect[0]:`?`}\nCard${pl(attack.effect[0])}\nBuilder Draws ${info?attack.effect[1]:`?`}\nCard${pl(attack.effect[1])}`
			case 242: return `Apply ${info?attack.effect[0]:`?`} Burn\nRange 1-1`
			case 243: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage to Self`
			case 244: return `Randomly Edit the Map,\nAdding in Mines`
			case 246: return `Apply ${info?attack.effect[0]:`?`} Freeze\nRange 1-1`
			case 247: return `Apply ${info?attack.effect[0]:`?`} Burn, Freeze, or Shock\nRange 1-1`
			case 248: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`}-${info?calculateIntent(attack.effect[1],user,0):`?`} Damage\nRange 1-2`
			case 249: return `Apply ${info?attack.effect[0]:`?`} Weak\nto Everybody Else`
			case 250: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Vulnerable to Self\nRange 1-2`
			case 251: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nand Take ${info?attack.effect[1]:`?`} Damage\n3 Times\nRange 1-1`
			case 252: return `Apply ${info?attack.effect[0]:`?`} Dissipating\nPush 1 Tile\nRange 1-1`
			case 253: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bruise\nRange 1-2`
			case 254: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nAll Enemies\nGain ${info?attack.effect[1]:`?`} Strength`
			case 255: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nin All Directions\nRange 1-2`
			case 256: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Vulnerable\nin All Directions\nRange 1-2`
			case 257: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies\nGain ${info?attack.effect[1]:`?`} Dexterity`
			case 258: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\nRange 1-2`
			case 259: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\n1 Less Range Forward\nRange 1-2`
			case 260: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMove ${info?attack.effect[1]:`?`} More Time${pl(attack.effect[1])} Per Turn\nRange 1-2`
			case 261: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nMove ${info?attack.effect[1]:`?`} More Time${pl(attack.effect[1])} Per Turn`
			case 262: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Shock\nRange 1-6`
			case 263: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\nRange 1-6`
			case 264: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Shock\n3 Tiles Wide\nRange 1-1`
			case 265: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\n3 Tiles Wide\nRange 1-1`
			case 266: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Ichor\nRange 1-6\nNo Movement`
			case 267: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Ichor`
			case 268: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMove ${info?attack.effect[1]:`?`} More Time${pl(attack.effect[1])} Per Turn\nRange 1-6`
			case 269: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Strength\nMove ${info?attack.effect[2]:`?`} More Time${attack.effect[2]>0?`s`:``} Per Turn`
			case 270: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDraw ${info?attack.effect[1]:`?`} Less\nCard${pl(attack.effect[1])} Next Turn\nRange 1-1`
			case 271: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} ${variants.mtg?`Random Mana`:`Energy`}\nRange 1-1`
			case 272: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2\nNo Movement`
			case 273: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-2\nNo Movement`
			case 274: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDiscard ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])} Next Turn\nRange 1-1`
			case 275: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd a Miracle to\nYour Hand Next Turn\nRange 1-2`
			case 276: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd a Smite to\nYour Hand Next Turn\nRange 1-2`
			case 277: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd a Safety to\nYour Hand Next Turn\nRange 1-2`
			case 278: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nGain ${info?attack.effect[1]:`?`} Deprecating Armor\nRange 1-1`
			case 279: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Deprecating Armor\nRange 1-6`
			case 280: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Deprecating Armor\nRange 1-6`
			case 281: return `Heal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nFor All Enemies\nThey Move ${info?attack.effect[1]:`?`} More Time${pl(attack.effect[1])} Per Turn`
			case 282: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nHeal ${info?calculateIntent(attack.effect[1],user,4):`?`} Health\nRange 1-1`
			case 284: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Random Debuff\nRange 1-6\nNo Movement`
			case 285: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Random Debuff\nRange 1-6\nNo Movement`
			case 286: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin 4 Directions\nRange 1-6\nNo Movement`
			case 287: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Intangible\nRange 1-6`
			case 288: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nApply ${info?attack.effect[1]:`?`} Miss\nRange 1-2`
			case 289: return `Gain ${info?attack.effect[0]:`?`} Buffer`
			case 290: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Regeneration\nRange 1-6`
			case 291: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin 4 Directions\nRange 1-1`
			case 292: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nin 4 Directions\nRange 1-1`
			case 293: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nCounter ${info?calculateIntent(attack.effect[1],user,0):`?`} Twice`
			case 294: return `Gain ${info?attack.effect[0]:`?`} Strength\nGain ${info?attack.effect[1]:`?`} Dexterity`
			case 295: return `Apply ${info?attack.effect[0]:`?`} Burn\nApply ${info?attack.effect[1]:`?`} Freeze\nApply ${info?attack.effect[2]:`?`} Shock\nApply ${info?attack.effect[3]:`?`} Poison\nRange 1-1`
			case 296: case 446:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAnywhere`
			case 297: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Burn\nRange 1-2`
			case 298: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Freeze\nRange 1-2`
			case 299: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Shock\nRange 1-2`
			case 300: return `Take Third Damage\nFor ${info?attack.effect[0]:`?`} Turns`
			case 301: return `Randomly Edit the Map,\nAdding in Delayed Death Tiles`
			case 302: return `Randomly Edit the Map,\nAdding in Glitch Tiles`
			case 303: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`}-${info?calculateIntent(attack.effect[1],user,14):`?`}*Range Damage\nRange 1-6\nNo Movement`
			case 304: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain 1 Combo\nRange 1-1`
			case 305: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Poison\nRange 1-1`
			case 306: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nFatigues Cost 1 More\nRange 1-6`
			case 307: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Dodge`
			case 308: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nDeals Double Damage\nto Targets With Block\nRange 1-1`
			case 309: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 7 Times\nRange 1-1`
			case 310: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Random Debuff\nRange 1-2`
			case 311: return `Hold ${info?attack.effect[0]:`?`} Random Orb${pl(attack.effect[0])}`
			case 312: return `Inflict:\n${info?attack.effect[0]:`?`} Poison, ${info?attack.effect[1]:`?`} Shock, ${info?attack.effect[2]:`?`} Freeze, \n${info?attack.effect[3]:`?`} Burn, ${info?attack.effect[4]:`?`} Weak, ${info?attack.effect[5]:`?`} Vulnerable, \n${info?attack.effect[6]:`?`} Frail, ${info?attack.effect[7]:`?`} Anti-Control, ${info?attack.effect[8]:`?`} Jinx\nRange 1-3`
			case 313: return `Evoke All Orbs\non Target or Self\nRange 1-3`
			case 314: return `Build a Shotgun`; break
            case 315: return `Build a Repulse Turret`; break
			case 316: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTransform ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])}\nRange 1-6`
			case 317: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nEnter Wrath\nRange 1-2`
			case 318: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 2 Turns\nEnter Sturdy`
			case 319: return `Move up to 3 Tiles,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nEnter Haste`
			case 320: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Charge\nRange 1-6\nNo Movement`
			case 321: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nGain ${info?attack.effect[3]:`?`} Charge\nRange 1-6\nNo Movement`
			case 322: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMore than or Equal to 5 Charge:\nDeals Double`; break
			case 323: return `Apply ${info?attack.effect[0]:`?`} Burn\nAnywhere`
			case 324: return `Apply ${info?attack.effect[0]:`?`} Miss\nAnywhere`
			case 325: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damagec\nRange 1-2`
			case 326: return `Replace ${info?attack.effect[0]:`?`} Card${pl(attack.effect[0])}\nWith${attack.effect[0]!=1?``:` a`} Strike${pl(attack.effect[0])}\nReplace ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])}\nWith${attack.effect[1]!=1?``:` a`} Defend${pl(attack.effect[1])}`
			case 327: return `Apply ${info?attack.effect[0]:`?`} Jinx\nRange 1-6`
			case 328: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDiscard ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])}\nRange 1-6`
			case 329: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} ${variants.mtg?`Random Mana`:`Energy`}\nRange 1-2`
			case 330: return `Apply ${info?attack.effect[0]:`?`} Shock\n3 Tiles Wide\nRange 1-1`
			case 331: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nTargets Lose ${info?attack.effect[1]:`?`} ${variants.mtg?`Random Mana`:`Energy`}\nRange 2-2`
			case 332: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-1\nIncreases by ${info?attack.effect[1]:`?`}`
			case 333: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Strength\nAnd ${info?attack.effect[1]:`?`} Dexterity`
			case 334: return `All Enemies Deal Double Damage\nFor Their Next ${info?attack.effect[0]:`?`} Attack${pl(attack.effect[0])}`
			case 335: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nReplace Target Items\nWith Mundane Dust\nRange 1-6`
			case 336: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRewind ${info?attack.effect[1]:`?`} Card${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 337: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDraw ${info?attack.effect[1]:`?`} Less Card${pl(attack.effect[1])} Next Turn\nRange 1-6\nNo Movement`
			case 339: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Barrier\nRange 1-3`
			case 340: return `Gain ${info?attack.effect[0]:`?`} Dexterity\nRemove ${info?attack.effect[1]:`?`} Dexterity`
			case 341: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 9 Times\nGain ${info?attack.effect[1]:`?`} Intangible\nRange 1-1`
			case 342: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turn${pl(attack.effect[1])}\nRange 1-2`
			case 343: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Anti-Control\nRange 1-2`
			case 344: return `Move up to 4 Tiles Backward,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nEnter Haste`
			case 345: return `Remove All Self Debuffs`
			case 346: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 2 Turns\nGain ${info?attack.effect[1]:`?`} Strength`
			case 347: return `Move up to 4 Tiles,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nEnter Haste`
			case 348: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Vulnerable\nApply ${info?attack.effect[2]:`?`} Frail\nRange 1-3`
			case 349: return `Gain ${info?attack.effect[0]:`?`} Intangible\nGain ${info?attack.effect[1]:`?`} Strength`
			case 350: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nPush 1 Tile Left\nin All Directions\nRange 1-1`
			case 351: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nPush 1 Tile Right\nin All Directions\nRange 1-1`
			case 352: return `Spawn a Random\nPlayer Character Form`
			case 353: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-6`
			case 354: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Vulnerable\nRange 1-2`
			case 355: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Vulnerable\nRange 1-1`
			case 356: return `${user.sins.length<7?`Create a Random Sin`:`Create the Next Horseman`}`
			case 357: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\n3 Tiles Wide\nRange 1-2`
			case 358: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6`
			case 359: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 3 Turns\nRemove All Self Debuffs`
			case 360: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 (10) Times\n3 Tiles Wide\nRange 1-2`
			case 361: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 (4) Times\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6`
			case 364: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`}-${info?calculateIntent(attack.effect[1],user,14):`?`}*Range Damage\nIf Unblocked,\nAdd ${info?attack.effect[2]:'?'} ${info?attack.effect[3].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[2])}\nRange 1-6\nNo Movement`
			case 365: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Gain ${info?attack.effect[1]:`?`} Armor`
			case 366: return `Next ${info?attack.effect[0]:`?`} Attack${pl(attack.effect[0])}\nFrom Builder\nDeal Double Damage`
			case 367: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-3`
			case 368: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Vulnerable\n3 Tiles Wide\nRange 1-1`
			case 369: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bleed\nRange 1-1`
			case 370: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Vulnerable\nRange 1-1`
			case 371: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-1`
			case 372: return `Apply ${info?attack.effect[0]:`?`} Poison\nRange 1-1`
			case 373: return `Remove ${info?attack.effect[0]:`?`} Dexterity\nRange 1-1`
			case 374: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Shock\nRange 1-2`
			case 375: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\nRange 1-2`
			case 376: return `Add ${info?attack.effect[0]:`?`} Block\nGain ${info?attack.effect[1]:`?`} Dexterity`
			case 377: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-1`
			case 378: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\nRange 1-1`
			case 379: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nApply ${info?attack.effect[2]:`?`} Vulnerable\n2 Tiles Forward,\n1 Tile to the Side,\nor 1 Tile Diagonally`
			case 380: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-4`
			case 381: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\n3 Tiles Wide\nRange 1-2`
			case 382: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Right\nRange 1-2`
			case 383: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Left\nRange 1-2`
			case 384: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\n3 Directions Wide\nRange 1-6\nNo Movement`
			case 385: return `Apply ${info?attack.effect[0]:`?`} Burn, Freeze, or Shock\nRange 1-3`
			case 386: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Miss\nRange 1-2`
			case 387: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Shock\n3 Tiles Wide\nRange 1-2`
			case 388: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\n3 Tiles Wide\nRange 1-2`
			case 389: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Shock\nRange 1-3`
			case 390: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\nRange 1-3`
			case 391: return `Gain Block Equal\nto Double Health of\nShield Particles`
			case 392: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Retain Block\nFor 1 Turn\nAll Enemies Gain ${info?attack.effect[1]:`?`} Armor`
			case 393: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nAnywhere`
			case 394: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Frail\nRange 1-2`
			case 395: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nGain ${info?attack.effect[1]:`?`} Strength\nRange 1-1`
			case 396: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Directions\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\nRange 1-1`
			case 397: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Poison\nRange 1-3`
			case 398: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\nRange 1-6`
			case 399: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\nPush 1 Tile\nRange 1-1`
			case 400: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nIf Unblocked,\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 401: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Gain ${info?attack.effect[1]:`?`} Strength`
			case 402: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Vulnerable\nRange 1-6`
			case 403: return `Move up to 2 Tiles,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap`
			case 404: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\n3 Tiles Wide\nRange 1-2`
			case 405: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Armor\nRange 1-6`
			case 406: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\n3 Tiles Wide\nRange 1-6\nNo Movement`
			case 407: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 4 Times\nRange 1-6`
			case 408: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nCounter ${info?calculateIntent(attack.effect[1],user,0):`?`} Damage\nand Push 1 Tile\nin All Directions`
			case 409: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\n3 Tiles Wide\nRange 1-2`
			case 410: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\n50%: Adds Double`
			case 411: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Buffer\nRange 1-6`
			case 412: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Lock On\nRange 1-1`
			case 413: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Dodge`
			case 414: return `Shuffle in ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[0])}`
			case 415: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nin All Directions\nRange 1-2`
			case 417: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nto the Left\nRange 1-1`
			case 418: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nto the Right\nRange 1-1`
			case 419: return `Apply ${info?attack.effect[0]:`?`} Bleed\nRange 1-6`
			case 420: return `Apply ${info?attack.effect[0]:`?`} Freeze\nRange 1-6`
			case 421: return `Gain ${info?attack.effect[0]:`?`} Chocolate Chip`
			case 422: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block 3 Times`
			case 423: return `Gain ${info?attack.effect[0]:`?`} Radiation`
			case 424: return `Target Loses ${info?attack.effect[0]:`?`} Health\nin 2 Turns`
			case 426: return `Deal ${info?calculateIntent(attack.effect[0],user,2):`?`} Damage\nWhere X = Armor\nRange 1-1`
			case 427: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-6\nNo Movement`
			case 428: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Vulnerable\nRange 1-6\nNo Movement`
			case 429: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 2-2\nNo Movement`
			case 430: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Vulnerable\nRange 2-2\nNo Movement`
			case 431: return `Leave Battle\nSpawn ${info?attack.effect[0]:`?`} ${info?attack.effect[1]+(pl(attack.effect[0])):`?`}`
			case 432: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Temporary Strength`
			case 433: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDraw ${info?attack.effect[1]:`?`} Less\nCard${pl(attack.effect[1])} Next Turn\nRange 1-2`
			case 434: return `Apply ${info?attack.effect[0]:`?`} Weak\nApply ${info?attack.effect[1]:`?`} Vulnerable\nApply ${info?attack.effect[2]:`?`} Frail\nRange 1-1`
			case 435: return `Apply ${info?attack.effect[0]:`?`} Weak\nApply ${info?attack.effect[1]:`?`} Vulnerable\nApply ${info?attack.effect[2]:`?`} Frail\nRange 1-2`
			case 436: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`}-${info?calculateIntent(attack.effect[1],user,14):`?`}*Range Damage 2 Times\nRange 1-6\nNo Movement`
			case 437: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nGain 1 Combo Per Hit\nRange 1-1`
			case 438: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nCounter Gun ${info?calculateIntent(attack.effect[1],user,0):`?`}`
			case 439: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Frail\nRange 1-6\nNo Movement`
			case 440: return `Move up to 1 Tile,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap`
			case 441: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Anti-Control\n3 Tiles Wide\nRange 1-2`
			case 442: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nAll Enemies\nApply ${info?attack.effect[1]:`?`} Anti-Control`
			case 443: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nAdd ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[1])}\nRange 1-6\nNo Movement`
			case 444: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\n3 Tiles Wide\nRange 1-6\nNo Movement`
			case 445: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-1\nAdvance Only 1 Tile`
			case 447: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush to End\nRange 1-3`
			case 448: return `Apply ${info?attack.effect[0]:`?`} Weak\nApply ${info?attack.effect[1]:`?`} Vulnerable\nApply ${info?attack.effect[2]:`?`} Frail\nRange 1-6`
			case 449: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-3`
			case 450: return `Create Target Zigzag\nfor ${info?attack.effect[0]:`?`} Damage`
			case 451: return `Apply ${info?attack.effect[0]:`?`} Weak\nin All Directions\nRange 1-1`
			case 452: return `Apply ${info?attack.effect[0]:`?`} Vulnerable\nin All Directions\nRange 1-1`
			case 453: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Bounce\nRange 1-3`
			case 454: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Weak\nRange 1-6`
			case 455: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Vulnerable\nRange 1-6`
			case 456: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Pity`
			case 457: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Barrier`
			case 458: return `All Cards Cost\n${info?attack.effect[0]:`?`} More Next Turn`
			case 459: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} ${variants.mtg?`Random Mana`:`Energy`}\nRange 1-6`
			case 460: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Regeneration`
			case 461: return `Gain ${info?attack.effect[0]:`?`} Intangible\nGain ${info?attack.effect[1]:`?`} Control`
			case 462: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAnywhere\nTarget Cannot Move\nFor ${info?attack.effect[1]:`?`} Turn${pl(attack.effect[1])}`
			case 464: return `Add ${info?attack.effect[0]:`?`} Block\nto Allied Constructs`

			/*
			case 1: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-1`
			case 2: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-1`
			case 3: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-1`
			case 4: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block`
			case 5: return `Add ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}${pl(attack.effect[0])}`
			case 9: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-1`
			case 15: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-2`
			*/

			default: return `INVALID`
		}
	}catch(error){
		return `error-${attack.type}-${attack.effect}`
	}
}
function tennify(value){
	if(round(value)==value){
		return value
	}else{
		let pre=round(value*10).toString()
		let mid=pre.substr(0,pre.length-1)+'.'+pre[pre.length-1]
		return float(mid[mid.length-1]=='0'&&mid.includes('.')?mid.substr(0,mid.indexOf('.')):mid)
	}
}
function pl(value){
	return value!=1?`s`:``
}
function vceil(value){
	return value%1<0.1?round(value):ceil(value)
}
function vectorAtan(point1,point2){
	return atan2(point2.x-point1.x,point2.y-point1.y)
}
function stringMatch(string1,string2){
	let total=0
	for(let a=0,la=min(string1.length,string2.length);a<la;a++){
		if(string1[a]==string2[a]){
			total++
		}
	}
	return total
}
function findList(entry,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a]==entry){
			return a
		}
	}
	return -1
}
function findName(name,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].name==name){
			return a
		}
	}
	return -1
}
function findNameApprox(name,list){
	name=name.toLowerCase()
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].name.toLowerCase()==name){
			return a
		}
	}
	let closest=0
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].name.toLowerCase().length==name.length){
			closest=max(closest,stringMatch(list[a].name.toLowerCase(),name))
		}
	}
	if(closest>=name.length-1&&closest>=1){
		for(let a=0,la=list.length;a<la;a++){
			if(list[a].name.toLowerCase().length==name.length&&closest==stringMatch(list[a].name.toLowerCase(),name)){
				return a
			}
		}
	}
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].name.toLowerCase().includes(name.toLowerCase())){
			return a
		}
	}
	for(let a=0,la=name.length;a<la;a++){
		for(let b=0,lb=list.length;b<lb;b++){
			if(list[b].name.toLowerCase().length>=name.length&&list[b].name.toLowerCase().substr(0,name.length-a)==name.substr(0,name.length-a)){
				return b
			}
		}
	}
	for(let a=0,la=name.length-1;a<la;a++){
		if(closest>=name.length-a-1){
			for(let b=0,lb=list.length;b<lb;b++){
				if(list[b].name.toLowerCase().length==name.length&&closest==stringMatch(list[b].name.toLowerCase(),name)){
					return b
				}
			}
		}
	}
	return -1
}
function findInternal(internal,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].internal==internal){
			return a
		}
	}
	return -1
}
function multiplyString(base,multiply){
	if(multiply==0){
		return ''
	}else{
		let string=''
		for(let a=0;a<multiply;a++){
			string+=base
		}
		return string
	}
}
function relicSellValue(rarity){
	switch(rarity){
		case -1: return 60
		case 0: return 80
		case 1: return 120
		case 2: return 200
		case 3: return 100
		case 4: return 600
		case 5: return 0
	}
}
function copyCard(base){
	return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,base.level,base.color,base.id,base.cost,base.additionalSpec,base.name,base.list,base.effect,base.attack,base.target,base.spec,base.cardClass,base.limit,base.falsed,base.retain2,base.colorful,base.edition,base.base.cost,base.drawn,base.fuel,base.edited.cost,base.edited.costComplete,base.nonCalc,base.costDownTrigger,base.costUpTrigger,base.baseCostDownTrigger,base.baseCostUpTrigger,base.debut,base.evolve)
}
function copyCardNew(base){
	game.id++
	return new card(base.layer,base.battle,base.player,1200,500,base.type,base.level,base.color,game.id,base.cost,base.additionalSpec,base.name,base.list,base.effect,base.attack,base.target,base.spec,base.cardClass,base.limit,base.falsed,base.retain2,base.colorful,base.edition,base.base.cost,base.drawn,base.fuel,base.edited.cost,base.edited.costComplete,base.nonCalc,base.costDownTrigger,base.costUpTrigger,base.baseCostDownTrigger,base.baseCostUpTrigger,base.debut,base.evolve)
}
function copyCardNewAbstract(base,type,args){
	game.id++
	let result=new card(base.layer,base.battle,base.player,1200,500,base.type,base.level,base.color,game.id,base.cost,base.additionalSpec,base.name,base.list,base.effect,base.attack,base.target,base.spec,base.cardClass,base.limit,base.falsed,base.retain2,base.colorful,base.edition,base.base.cost,base.drawn,base.fuel,base.edited.cost,base.edited.costComplete,base.nonCalc,base.costDownTrigger,base.costUpTrigger,base.baseCostDownTrigger,base.baseCostUpTrigger,base.debut,base.evolve)
	switch(type){
		case 0:
			result.cost=copyArray(args[0])
			result.base.cost=copyArray(args[0])
		break
		case 1:
			result.setCost(2,[0])
		break
	}
	return result
}
function upgradeCard(base,nonlimiting=false){
	if(base.spec.includes(37)){
		return copyCard(base)
	}else{
		let result=new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,base.spec.includes(53)?base.level+1:min(types.card[base.type].levels.length-1,base.level+1),base.color,base.id,null,base.additionalSpec,base.name,base.list,base.spec.includes(53)?[base.effect[0]+base.effect[1],base.effect[1]]:undefined,undefined,undefined,undefined,undefined,undefined,base.falsed,base.retain2,base.colorful,base.edition,undefined,base.drawn,base.fuel,base.edited.cost,false,base.nonCalc,undefined,base.costDownTrigger,base.costUpTrigger,base.baseCostDownTrigger,base.baseCostUpTrigger,base.debut,base.evolve)
		if(base.attack==1352||nonlimiting){
			result.limit=base.limit
		}
		return result
	}
}
function unupgradeCard(base,nonlimiting=false){
	if(base.spec.includes(37)){
		return copyCard(base)
	}else{
		let result=new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,max(0,base.level-1),base.color,base.id,null,base.additionalSpec,base.name,base.list,base.spec.includes(53)?[base.effect[0]-base.effect[1],base.effect[1]]:undefined,undefined,undefined,undefined,undefined,undefined,base.falsed,base.retain2,base.colorful,base.edition,undefined,base.drawn,base.fuel,base.edited.cost,false,base.nonCalc,undefined,base.costDownTrigger,base.costUpTrigger,base.baseCostDownTrigger,base.baseCostUpTrigger,base.debut,base.evolve)
		if(base.attack==1352||nonlimiting){
			result.limit=base.limit
		}
		return result
	}
}
function getIndicesOf(searchString,string,caseSensitive){
    if(string.length==0){
        return []
    }
    let startIndex=0
	let index=0
	let indices=[]
    if(!caseSensitive){
        string=string.toLowerCase()
        searchString=searchString.toLowerCase()
    }
    while((index=searchString.indexOf(string,startIndex))>-1){
        indices.push(index)
        startIndex=index+string.length
    }
    return indices.length
}
function range(start,end){
    return [...Array(end-start).keys()].map(a=>a+start)
}
function quadroArray(base){
	return [base,base,base,base]
}
function elementArray(base,number){
	let result=[]
	for(let a=0,la=number;a<la;a++){
		result.push(base)
	}
	return result
}
function multiplyArray(base,number){
	let result=[]
	for(let a=0,la=number;a<la;a++){
		result.push(copyArray(base))
	}
	return result
}
function copyArray(base){
	/*let list=[]
	for(let a=0,la=base.length;a<la;a++){
		list.push(base[a])
	}
	return list*/
	return typeof base=='number'?base:base.slice()
}
function copyArrayCard(base){
	let list=[]
	for(let a=0,la=base.length;a<la;a++){
		list.push(copyCard(base[a]))
	}
	return list
}
function copyArrayStack(base){
	let list=[]
	for(let a=0,la=base.length;a<la;a++){
		list.push([])
		for(let b=0,lb=base[a].length;b<lb;b++){
			list[a].push(base[a][b])
		}
	}
	return list
}
function copyArrayLastPlayed(base){
	let list=[]
	for(let a=0,la=base.length;a<la;a++){
		list.push([])
		for(let b=0,lb=base[a].length;b<lb;b++){
			list[a].push(b==4?base[a][b].slice():base[a][b])
		}
	}
	return list
}
function copyArrayAttack(base){
	let list=[]
	for(let a=0,la=base.length;a<la;a++){
		let proxy={type:base[a].type,effect:[],baseEffect:[]}
		for(let b=0,lb=base[a].effect.length;b<lb;b++){
			proxy.effect.push(base[a].effect[b])
		}
		for(let b=0,lb=base[a].effect.length;b<lb;b++){
			proxy.baseEffect.push(base[a].effect[b])
		}
		list.push(proxy)
	}
	return list
}
function copyFalsed(base){
	return {trigger:base.trigger,name:base.name,attack:base.attack,effect:base.effect,spec:base.spec,rarity:base.rarity,list:base.list,class:base.class,reality:base.reality,colorDetail:base.colorDetail,target:base.target,cost:base.cost}
}
function normalDistribution(){
	let u=random(0,1),v=random(0,1),s=0.449871,t=-0.386595,a=0.19600,b=0.25472,r1=0.27597,r2=0.27846
	v=1.7156*(v-0.5)
	let x=u-s,y=abs(v)-t
	let Q=x**2+y*(a*y-b*x)
	if(Q<0.27597){
		return v/u
	}else if(Q>0.27846||v^2>-4*u^2){
		return normalDistribution()
	}else{
		return v/u
	}
}
function matrixDet3(matrix){
	return matrix[0][0]*(matrix[1][1]*matrix[2][2]-matrix[2][1]*matrix[1][2])-
		matrix[0][1]*(matrix[1][0]*matrix[2][2]-matrix[2][0]*matrix[1][2])+
		matrix[0][2]*(matrix[1][0]*matrix[2][1]-matrix[2][0]*matrix[1][1])
}
function matrixInv3(matrix){
	let det=matrixDet3(matrix)
	if(det==0){
		return [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		]
	}else{
		return [
			[
				(matrix[1][1]*matrix[2][2]-matrix[2][1]*matrix[1][2])/det,
				-(matrix[0][1]*matrix[2][2]-matrix[2][1]*matrix[0][2])/det,
				(matrix[0][1]*matrix[1][2]-matrix[1][1]*matrix[0][2])/det
			],[
				-(matrix[1][0]*matrix[2][2]-matrix[2][0]*matrix[1][2])/det,
				(matrix[0][0]*matrix[2][2]-matrix[2][0]*matrix[0][2])/det,
				-(matrix[0][0]*matrix[1][2]-matrix[1][0]*matrix[0][2])/det
			],[
				(matrix[1][0]*matrix[2][1]-matrix[2][0]*matrix[1][1])/det,
				-(matrix[0][0]*matrix[2][1]-matrix[2][0]*matrix[0][1])/det,
				(matrix[0][0]*matrix[1][1]-matrix[1][0]*matrix[0][1])/det
			]
		]
	}
}
function matrixMult3313(matrix1,matrix2){
	let result=[]
	for(let a=0,la=3;a<la;a++){
		result.push(
			matrix1[a][0]*matrix2[0]+
			matrix1[a][1]*matrix2[1]+
			matrix1[a][2]*matrix2[2]
		)
	}
	return result
}
function circleMid(x1,y1,x2,y2,x3,y3){
	result=matrixMult3313(matrixInv3([
		[2*x1,2*y1,1],
		[2*x2,2*y2,1],
		[2*x3,2*y3,1],
	]),[-(x1**2+y1**2),-(x2**2+y2**2),-(x3**2+y3**2)])
	return [-result[0],-result[1],sqrt(result[0]**2+result[1]**2-result[2])]
}
function arcMid3(layer,keypoints,side){
	let mid=circleMid(...keypoints)
	if(side==0){
		layer.arc(mid[0],mid[1],mid[2]*2,mid[2]*2,
			-90+atan2(keypoints[0]-mid[0],-keypoints[1]+mid[1]),
			-90+atan2(keypoints[4]-mid[0],-keypoints[5]+mid[1])
		)
	}else{
		layer.arc(mid[0],mid[1],mid[2]*2,mid[2]*2,
			-90+atan2(keypoints[4]-mid[0],-keypoints[5]+mid[1]),
			-90+atan2(keypoints[0]-mid[0],-keypoints[1]+mid[1])
		)
	}
}
function specialCost(card){
	return card.spec.includes(5)||card.spec.includes(11)||card.spec.includes(21)||card.spec.includes(35)||card.spec.includes(40)||card.spec.includes(41)||card.spec.includes(55)||card.spec.includes(58)||card.spec.includes(59)||card.spec.includes(67)
}
function legalTarget(type,lengthStart,lengthEnd,x,y){
	switch(type){
		case 0:
			if((x==y&&abs(x)>=lengthStart&&abs(x)<=lengthEnd||y==0&&abs(x)>=lengthStart&&abs(x)<=lengthEnd||x==0&&abs(y)>=lengthStart&&abs(y)<=lengthEnd)&&(x!=0||y!=0)){
				return true
			}
			return false
	}
}
function legalTargetDiagonal(type,lengthStart,lengthEnd,x,y){
	switch(type){
		case 0:
			if((x==-y&&abs(x)>=lengthStart&&abs(x)<=lengthEnd||x==y/2&&abs(x)>=lengthStart&&abs(x)<=lengthEnd||y==x/2&&abs(y)>=lengthStart&&abs(y)<=lengthEnd)&&(x!=0||y!=0)){
				return true
			}
			return false
	}
}
function distTarget(type,x,y){
	switch(type){
		case 0:
			if(x==y&&x!=0){
				return abs(x)
			}
			if(y==0&&x!=0){
				return abs(x)
			}
			if(x==0&&y!=0){
				return abs(y)
			}
			if(x==0&&y==0){
				return 0
			}
			return -1
	}
}
function distTargetDiagonal(type,x,y){
	switch(type){
		case 0:
			if(x==-y&&x!=0){
				return abs(x)
			}
			if(x==y/2&&x!=0){
				return abs(x)
			}
			if(y==x/2&&y!=0){
				return abs(y)
			}
			if(x==0&&y==0){
				return 0
			}
			return -1
	}
}
function targetDirection(type,x,y){
	switch(type){
		case 0:
			if(y==0&&x<0){
				return 0
			}
			if(x==y&&x<0){
				return 1
			}
			if(x==0&&y<0){
				return 2
			}
			if(y==0&&x>0){
				return 3
			}
			if(x==y&&x>0){
				return 4
			}
			if(x==0&&y>0){
				return 5
			}
			return -1
	}
}
function targetDirectionCombatant(type,combatant1,combatant2){
	return targetDirection(type,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)
}
function legalTargetCombatant(type,lengthStart,lengthEnd,combatant1,combatant2,tiles){
	switch(type){
		case 0:
			if(legalTarget(0,lengthStart,lengthEnd,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)){
				let length=distTarget(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)-1
				let valid=[]
				for(let a=0,la=length;a<la;a++){
					valid.push(false)
				}
				for(let a=0,la=tiles.length;a<la;a++){
					for(let b=0,lb=valid.length;b<lb;b++){
						if(tiles[a].occupied==0&&tiles[a].tilePosition.x==map((b+1)/(length+1),0,1,combatant1.tilePosition.x,combatant2.tilePosition.x)&&tiles[a].tilePosition.y==map((b+1)/(length+1),0,1,combatant1.tilePosition.y,combatant2.tilePosition.y)){
							valid[b]=true
						}
					}
				}
				for(let a=0,la=valid.length;a<la;a++){
					if(!valid[a]){
						return false
					}
				}
				return true
			}
		break
		case 1:
			if(legalTarget(0,lengthStart,lengthEnd,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)){
				let length=distTarget(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)-1
				for(a=0,la=tiles.length;a<la;a++){
					if(tiles[a].occupied==1&&legalTarget(0,0,length,tiles[a].tilePosition.x-combatant2.tilePosition.x,tiles[a].tilePosition.y-combatant2.tilePosition.y)&&targetDirection(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)==targetDirection(0,tiles[a].tilePosition.x-combatant2.tilePosition.x,tiles[a].tilePosition.y-combatant2.tilePosition.y)){
						return true
					}
				}
				return false
			}
		break
		case 2:
			return legalTarget(0,lengthStart,lengthEnd,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)
		case 3:
			if(legalTarget(0,lengthStart,lengthEnd,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)){
				let length=distTarget(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)-1
				for(a=0,la=tiles.length;a<la;a++){
					if(legalTarget(0,0,length,tiles[a].tilePosition.x-combatant2.tilePosition.x,tiles[a].tilePosition.y-combatant2.tilePosition.y)&&targetDirection(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)==targetDirection(0,tiles[a].tilePosition.x-combatant2.tilePosition.x,tiles[a].tilePosition.y-combatant2.tilePosition.y)){
						return false
					}
				}
				return true
			}
		break
	}
	return false
}
function legalTargetDiagonalCombatant(type,lengthStart,lengthEnd,combatant1,combatant2,tiles){
	switch(type){
		case 0:
			if(legalTargetDiagonal(0,lengthStart,lengthEnd,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)){
				let length=distTargetDiagonal(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)-1
				let valid=[]
				for(let a=0,la=length;a<la;a++){
					valid.push(false)
				}
				for(let a=0,la=tiles.length;a<la;a++){
					for(let b=0,lb=valid.length;b<lb;b++){
						if(tiles[a].occupied==0&&tiles[a].tilePosition.x==map((b+1)/(length+1),0,1,combatant1.tilePosition.x,combatant2.tilePosition.x)&&tiles[a].tilePosition.y==map((b+1)/(length+1),0,1,combatant1.tilePosition.y,combatant2.tilePosition.y)){
							valid[b]=true
						}
					}
				}
				for(let a=0,la=valid.length;a<la;a++){
					if(!valid[a]){
						return false
					}
				}
				return true
			}
		break
		case 1:
			if(legalTargetDiagonal(0,lengthStart,lengthEnd,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)){
				let length=distTargetDiagonal(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)-1
				for(a=0,la=tiles.length;a<la;a++){
					if(tiles[a].occupied==1&&legalTargetDiagonal(0,0,length,tiles[a].tilePosition.x-combatant2.tilePosition.x,tiles[a].tilePosition.y-combatant2.tilePosition.y)&&targetDirection(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)==targetDirection(0,tiles[a].tilePosition.x-combatant2.tilePosition.x,tiles[a].tilePosition.y-combatant2.tilePosition.y)){
						return true
					}
				}
				return false
			}
		break
		case 2:
			return legalTargetDiagonal(0,lengthStart,lengthEnd,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)
	}
	return false
}
function distTargetCombatant(type,combatant1,combatant2){
	return distTarget(type,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)
}
function distTargetDiagonalCombatant(type,combatant1,combatant2){
	return distTargetDiagonal(type,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)
}
function transformDirection(type,direction){
	switch(type){
		case 0:
			let actualDirection=(direction%360+540)%360-180
			if(abs(actualDirection+30)<=30){
				return [0,1]
			}else if(abs(actualDirection-30)<=30){
				return [1,1]
			}else if(abs(actualDirection+90)<=30){
				return [-1,0]
			}else if(abs(actualDirection-90)<=30){
				return [1,0]
			}else if(abs(actualDirection+150)<=30){
				return [-1,-1]
			}else if(abs(actualDirection-150)<=30){
				return [0,-1]
			}else{
				return [0,0]
			}
	}
}
function numeralizeDirection(type,direction){
	switch(type){
		case 0:
			let actualDirection=(direction%360+540)%360-180
			if(abs(actualDirection+60)<=15){
				return 11
			}else if(abs(actualDirection+30)<=15){
				return 10
			}else if(abs(actualDirection)<=15){
				return 9
			}else if(abs(actualDirection-30)<=15){
				return 8
			}else if(abs(actualDirection-60)<=15){
				return 7
			}else if(abs(actualDirection-90)<=15){
				return 6
			}else if(abs(actualDirection-120)<=15){
				return 5
			}else if(abs(actualDirection-150)<=15){
				return 4
			}else if(abs(actualDirection-180)<=15||abs(actualDirection+180)<=15){
				return 3
			}else if(abs(actualDirection+150)<=15){
				return 2
			}else if(abs(actualDirection+120)<=15){
				return 1
			}else if(abs(actualDirection+90)<=15){
				return 0
			}else{
				return -1
			}
	}
}
function directionCombatant(combatant1,combatant2){
	return atan2(combatant1.relativePosition.x-combatant2.relativePosition.x,combatant1.relativePosition.y-combatant2.relativePosition.y)
}
function sortNumbers(numbers){
	return numbers.length<=1?numbers:mergeNumbers(sortNumbers(numbers.slice(0,floor(numbers.length/2))),sortNumbers(numbers.slice(floor(numbers.length/2),numbers.length)))
}
function mergeNumbers(left,right){
	let result=[]
	while(left.length>0&&right.length>0){
		result.push((left[0]<=right[0]?left:right).shift())
	}
	return [...result,...left,...right]
}
function sortNumbersBad(numbers){
	return numbers.length<=1?numbers:[Math.min.apply(null,numbers),...sortNumbersBad([...numbers.slice(0,numbers.indexOf(Math.min.apply(null,numbers))),...numbers.slice(numbers.indexOf(Math.min.apply(null,numbers))+1,numbers.length)])]
}
function sortNumbersUnique(numbers){
	return sortNumbers(numbers).filter(function(object,index,array){return index==0||object!=array[index-1]})
}
function prime(value){
	if(value==1){
		return false
	}
	for(let a=2,la=sqrt(value);a<la;a++){
		if(value%a==0){
			return false
		}
	}
	return true
}
function smoothAnim(anim,trigger,minPoint,maxPoint,speed){
	if(trigger&&anim<maxPoint){
		return min(round(anim*speed+1)/speed,maxPoint)
	}
	if(!trigger&&anim>minPoint){
		return max(round(anim*speed-1)/speed,minPoint)
	}
	return anim
}
function updateMouse(layer){
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
	inputs.rel.x=(inputs.mouse.x-width/2)/stage.scale+layer.width/2
	inputs.rel.y=(inputs.mouse.y-height/2)/stage.scale+layer.height/2
}
function qa(name){
	let type=findNameApprox(name,types.card)
	if(type>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(type,0,current.standardColorize(type))
		return 'Added'
	}else{
		return 'Invalid'
	}
}
function quickAdd(name){
	let type=findNameApprox(name,types.card)
	if(type>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(type,0,0)
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards.length-1].colorful=true
		return 'Added'
	}else{
		return 'Invalid'
	}
}
function quickAddAlly(name){
	let type=findNameApprox(name,types.card)
	if(type>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(type,0,0)
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards.length-1].colorful=true
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards.length-1].spec.push(55)
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards.length-1].cost=99
		return 'Added'
	}else{
		return 'Invalid'
	}
}
function quickAddSec(name){
	let type=findNameApprox(name,types.card)
	if(type>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(type,0,types.card[type].list>=0&&types.card[type].list<=constants.playerNumber+5?types.card[type].list:0)
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards.length-1].cost=0
		return 'Added'
	}else{
		return 'Invalid'
	}
}
function quickAddEdition(name,edition){
	let type=findNameApprox(name,types.card)
	if(type>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(type,0,0,edition)
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards.length-1].colorful=true
		return 'Added'
	}else{
		return 'Invalid'
	}
}
function quickAddFull(name,group,level,color){
	let type=findNameApprox(name,types.card)
	if(type>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].getList(group).add(type,level,color)
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].getList(group).cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].getList(group).cards.length-1].colorful=true
		return 'Added'
	}else{
		return 'Invalid'
	}
}
function quickSummon(name){
	current.combatantManager.summonCombatant({x:0,y:0},findName(name,types.combatant),-30+floor(random(0,2))*60)
}
function quickSummonB(name){
	current.combatantManager.summonCombatant({x:0,y:0},findName(name,types.combatant),-30+floor(random(0,2))*60)
	current.counter.enemy--
}
function kill(index){
	if(index<current.combatantManager.combatants.length){
		current.combatantManager.combatants[index].life=0
		return 'Dead'
	}else{
		return 'Invalid'
	}
}
function massacre(index){
	for(let a=index,la=current.combatantManager.combatants.length;a<la;a++){
		current.combatantManager.combatants[a].life=0
	}
	return 'Dead'
}
function player(index){
	return current.combatantManager.combatants[index]
}
function enemy(index){
	return current.combatantManager.combatants[index+current.players]
}
function manager(index){
	return current.cardManagers[index]
}
function money(value){
	current.addCurrency(value,0)
}
function combo(value){
	current.combatantManager.combatants[0].combo+=value
}
function metal(value){
	current.combatantManager.combatants[0].metal+=value
}
function stance(value){
	current.combatantManager.combatants[0].enterStance(value)
}
function faith(value){
	current.combatantManager.combatants[0].faith+=value
}
function elemental(){
	current.combatantManager.combatants[0].vision+=12
}
function wish(value){
	current.combatantManager.combatants[0].wish+=value
}
function followup(){
	quickAddFull('Overflowing',1,0,0)
}
function edition(edition){
	current.cardManagers[0].hand.cards[0].edition=edition
}
function fight(name){
	current.setupBattle(types.encounter[findName(name,types.encounter)])
}
function quickNode(type){
	current.nodeManager.enterNode(type)
	transition.trigger=true
}
function quickDraw(){
	for(let a=0,la=4;a<la;a++){
		quickAddFull('Strike',1,0,0)
		quickAddFull('Defend',1,0,0)
		quickAddFull('Step',1,0,0)
		quickAddFull('Think',1,0,0)
	}
}
function quickPop(){
	for(let a=0,la=100;a<la;a++){
		quickAddFull('Strike',0,0,0)
	}
}
function quickBuild(){
	metal(100)
	qa('Build\nTurret')
	qa('Build\nProjector')
	qa('Build\nStrengthener')
}
function event(name){
	stage.scene='event'
	graphics.staticBackground.clear()
	setupBackground(5,graphics.staticBackground)
    current.eventManagers.forEach(eventManager=>eventManager.event=findName(name,types.event))
    current.eventManagers.forEach(eventManager=>eventManager.setup())
    current.combatantManager.resetCombatants()
}
function status(name){
	return findList(name,current.combatantManager.combatants[0].status.name)
}
function upgrade(){
	current.cardManagers[current.turn.main].allEffect(2,4)
}
function quickRelic(type,player){
	current.relicManager.addRelic(type,player)
}
function quickItem(type,player){
	current.itemManager.addItem(type,player)
}
function outEncounter(){
	console.log(`
Total:${current.nodeManager.listing.static[0][0].length+current.nodeManager.listing.static[0][1].length+current.nodeManager.listing.static[0][2].length+current.nodeManager.listing.static[0][3].length+current.nodeManager.listing.static[1][0].length+current.nodeManager.listing.static[1][1].length+current.nodeManager.listing.static[1][2].length+current.nodeManager.listing.static[2][0].length+current.nodeManager.listing.static[2][1].length+current.nodeManager.listing.static[2][2].length+current.nodeManager.listing.static[3][1].length+current.nodeManager.listing.static[3][2].length}/166
\nWorld 1:
Easies:${current.nodeManager.listing.static[0][3].length}/12
(${current.nodeManager.listing.name[0][3].join(',')})
Enemies:${current.nodeManager.listing.static[0][0].length}/24
(${current.nodeManager.listing.name[0][0].join(',')})
Elites:${current.nodeManager.listing.static[0][1].length}/12
(${current.nodeManager.listing.name[0][1].join(',')})
Bosses:${current.nodeManager.listing.static[0][2].length}/8
(${current.nodeManager.listing.name[0][2].join(',')})
Total:${current.nodeManager.listing.static[0][0].length+current.nodeManager.listing.static[0][1].length+current.nodeManager.listing.static[0][2].length+current.nodeManager.listing.static[0][3].length}/56
\nWorld 2:
Enemies:${current.nodeManager.listing.static[1][0].length}/32
(${current.nodeManager.listing.name[1][0].join(',')})
Elites:${current.nodeManager.listing.static[1][1].length}/12
(${current.nodeManager.listing.name[1][1].join(',')})
Bosses:${current.nodeManager.listing.static[1][2].length}/8
(${current.nodeManager.listing.name[1][2].join(',')})
Total:${current.nodeManager.listing.static[1][0].length+current.nodeManager.listing.static[1][1].length+current.nodeManager.listing.static[1][2].length}/52
\nWorld 3:
Enemies:${current.nodeManager.listing.static[2][0].length}/32
(${current.nodeManager.listing.name[2][0].join(',')})
Elites:${current.nodeManager.listing.static[2][1].length}/12
(${current.nodeManager.listing.name[2][1].join(',')})
Bosses:${current.nodeManager.listing.static[2][2].length}/8
(${current.nodeManager.listing.name[2][2].join(',')})
Total:${current.nodeManager.listing.static[2][0].length+current.nodeManager.listing.static[2][1].length+current.nodeManager.listing.static[2][2].length}/52
\nWorld 4:
Elites:${current.nodeManager.listing.static[3][1].length}/4
(${current.nodeManager.listing.name[3][1].join(',')})
Bosses:${current.nodeManager.listing.static[3][2].length}/2
(${current.nodeManager.listing.name[3][2].join(',')})
Total:${current.nodeManager.listing.static[3][1].length+current.nodeManager.listing.static[3][2].length}/6
	`)
}
function outListing(){
	let box=``
	let goal=160+160*constants.playerNumber+60+60+30+30+20
	let actual=current.cardManagers[0].listing.allListableCard[3].length
	let arbitrary=6400
	for(let a=0,la=constants.playerNumber;a<la;a++){
		box+=`		${types.combatant[a+1].name}:
Common:${current.cardManagers[0].listing.card[a+1][0].length}/65				${current.cardManagers[0].listing.card[a+1][0].length-65}
Uncommon:${current.cardManagers[0].listing.card[a+1][1].length}/65				${current.cardManagers[0].listing.card[a+1][1].length-65}
Rare:${current.cardManagers[0].listing.card[a+1][2].length}/30					${current.cardManagers[0].listing.card[a+1][2].length-30}
	Total:${current.cardManagers[0].listing.card[a+1][3].length}/160\n`
	}
	console.log(`Total Cards: ${types.card.length}/${arbitrary}		${types.card.length-arbitrary}
Listed Cards: ${actual}/${goal}		${actual-goal}
		Colorless:
Common:${current.cardManagers[0].listing.card[0][0].length}/65				${current.cardManagers[0].listing.card[0][0].length-65}
Uncommon:${current.cardManagers[0].listing.card[0][1].length}/65				${current.cardManagers[0].listing.card[0][1].length-65}
Rare:${current.cardManagers[0].listing.card[0][2].length}/30					${current.cardManagers[0].listing.card[0][2].length-30}
	Total:${current.cardManagers[0].listing.card[0][3].length}/160
${box}		Status:
	Total:${current.cardManagers[0].listing.card[constants.playerNumber+1][3].length}/60				${current.cardManagers[0].listing.card[constants.playerNumber+1][3].length-60}
		Curse:
	Total:${current.cardManagers[0].listing.card[constants.playerNumber+2][3].length}/60				${current.cardManagers[0].listing.card[constants.playerNumber+2][3].length-60}
		Partnership:
Common:${current.cardManagers[0].listing.card[constants.playerNumber+3][0].length}/10				${current.cardManagers[0].listing.card[constants.playerNumber+3][0].length-10}
Uncommon:${current.cardManagers[0].listing.card[constants.playerNumber+3][1].length}/10				${current.cardManagers[0].listing.card[constants.playerNumber+3][1].length-10}
Rare:${current.cardManagers[0].listing.card[constants.playerNumber+3][2].length}/10					${current.cardManagers[0].listing.card[constants.playerNumber+3][2].length-10}
	Total:${current.cardManagers[0].listing.card[constants.playerNumber+3][3].length}/30
		Tarot:
	Total:${current.cardManagers[0].listing.card[constants.playerNumber+4][3].length}/30				${current.cardManagers[0].listing.card[constants.playerNumber+4][3].length-30}
		Spectral:
	Total:${current.cardManagers[0].listing.card[constants.playerNumber+5][3].length}/20				${current.cardManagers[0].listing.card[constants.playerNumber+5][3].length-20}
		Subcard:
	Total:${current.cardManagers[0].listing.sub.length}/60				${current.cardManagers[0].listing.sub.length-60}
		Ally:
	Total:${current.cardManagers[0].listing.ally.length}/24				${current.cardManagers[0].listing.ally.length-24}
		Disband:
	Total:${current.cardManagers[0].listing.disband.length}/1500			${current.cardManagers[0].listing.disband.length-1500}
		Junkyard:
	Total:${current.cardManagers[0].listing.junk[constants.playerNumber+1].length}/${constants.playerNumber*8}			${current.cardManagers[0].listing.junk[constants.playerNumber+1].length-constants.playerNumber*8}
			`)
}
function outClassCosts(){
	let box=``
	let count=[]
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		count.push([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]])
	}
	for(let a=0,la=types.card.length;a<la;a++){
		if(types.card[a].list>=0&&types.card[a].list<=constants.playerNumber&&types.card[a].rarity>=0){
			for(let b=0,lb=types.card[a].levels.length;b<lb;b++){
				if(!specialCost(types.card[a].levels[b])&&types.card[a].levels[b].cost>=0&&[0,1,2,3,4,11].includes(types.card[a].levels[b].class)){
					count[types.card[a].list][[0,1,2,3,4,11].indexOf(types.card[a].levels[b].class)][0]++
					count[types.card[a].list][[0,1,2,3,4,11].indexOf(types.card[a].levels[b].class)][1]+=types.card[a].levels[b].cost
					count[types.card[a].list][0][0]++
					count[types.card[a].list][0][1]+=types.card[a].levels[b].cost
				}
			}
		}
	}
	for(let a=0,la=count.length;a<la;a++){
		if(a!=0){
			box+=`\n\n`
		}
		box+=`		${a==0?`Colorless`:types.combatant[a].name}:`
		for(let b=0,lb=count[a].length;b<lb;b++){
			box+=`\n	${[`Total`,`Attack`,`Defense`,`Movement`,`Power`,`Skill`][b]}: ${round(count[a][b][1]/count[a][b][0]*1000)/1000}`
		}
	}
	console.log(box)
}
function outMtg(){
	let count=[]
	for(let a=0,la=constants.playerNumber+2;a<la;a++){
		count.push([])
		for(let b=0,lb=4;b<lb;b++){
			count[a].push([])
			for(let c=0,lc=17;c<lc;c++){
				count[a][b].push(0)
			}
		}
	}
	for(let a=0,la=types.card.length;a<la;a++){
		if(types.card[a].mtg!=undefined){
			if(types.card[a].mtg.rarity>=0&&types.card[a].mtg.list>=-1&&types.card[a].mtg.list<=constants.playerNumber){
				let list=types.card[a].mtg.list==-1?0:types.card[a].mtg.list==0?1:types.card[a].mtg.list+1
				let color=types.card[a].mtg.color.length==1?types.card[a].mtg.color[0]:mtgCombineColor(types.card[a].mtg.color[0],types.card[a].mtg.color[1])
				try{
					count[list][types.card[a].mtg.rarity][color]++
					count[list][3][color]++
				}catch(error){
					console.log(types.card[a].name)
				}
			}
		}
	}
	let box=``
	for(let a=0,la=constants.playerNumber+2;a<la;a++){
		box+=`\n		${a==0?`Neutral`:a==1?`Colorless`:types.combatant[a-1].name}:
	Common: ${subMtg(count[a][0])}
	Uncommon: ${subMtg(count[a][1])}
	Rare: ${subMtg(count[a][2])}
	Total: ${subMtg(count[a][3])}\n`
	}
	console.log(box)
}
function subMtg(base){
	return `[
${base[0]},
${base[1]},${base[2]},${base[3]},${base[4]},${base[5]},
${base[7]},${base[8]},${base[9]},${base[10]},${base[11]},
${base[12]},${base[13]},${base[14]},${base[15]},${base[16]},
]`
	/*return ''+
	`Colorless: ${base[0]}, White: ${base[1]}, Blue: ${base[2]}, Black: ${base[3]}, `+
	`Green: ${base[4]}, Red: ${base[5]}, White-Blue: ${base[7]}, White-Black: ${base[8]}, `+
	`White-Green: ${base[9]}, White-Red: ${base[10]}, Blue-Black: ${base[11]}, Blue-Green: ${base[12]}, `+
	`Blue-Red: 
	${base[13]}, Black-Green: ${base[14]}, Black-Red: ${base[15]}, Green-Red: ${base[16]}`*/
}
function outMtg2(){
	let mtgd=0
	let count=[]
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		count.push([])
		for(let b=0,lb=2;b<lb;b++){
			count[a].push([0,0,0,0])
		}
	}
	for(let a=0,la=types.card.length;a<la;a++){
		if(types.card[a].mtg!=undefined){
			mtgd++
			if(types.card[a].rarity>=0&&types.card[a].list>=0&&types.card[a].mtg.rarity>=0&&types.card[a].mtg.list>=-1&&types.card[a].mtg.list<=constants.playerNumber){
				let list=types.card[a].list
				let sublist=types.card[a].list==types.card[a].mtg.list?0:1
				try{
					count[list][sublist][types.card[a].mtg.rarity]++
					count[list][sublist][3]++
				}catch(error){
					console.log(types.card[a].name,'Failed!')
				}
			}
		}
	}
	let box=``
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		box+=`\n		${a==0?`Colorless`:types.combatant[a].name}:
	Character:
Common: ${count[a][0][0]}
Uncommon: ${count[a][0][1]}
Rare: ${count[a][0][2]}
Total: ${count[a][0][3]}\n
	Neutral:
Common: ${count[a][1][0]}
Uncommon: ${count[a][1][1]}
Rare: ${count[a][1][2]}
Total: ${count[a][1][3]}\n`
	}
	console.log(box)
	console.log(`${mtgd}/${types.card.length} (${round(mtgd/types.card.length*1000/10)}%) Converted`)
}
function outMtgError(){
	for(let a=0,la=types.card.length;a<la;a++){
		if(types.card[a].list>=0&&types.card[a].mtg.list>=0&&types.card[a].list!=types.card[a].mtg.list){
			console.log(types.card[a].name)
		}
		for(let b=0,lb=types.card[a].mtg.levels.length;b<lb;b++){
			if(types.card[a].mtg.levels[b].cost==undefined){
				console.log(types.card[a].name)
			}
			if(
				!types.card[a].mtg.levels[b].spec.includes(11)&&
				!types.card[a].mtg.levels[b].spec.includes(21)&&
				!types.card[a].mtg.levels[b].spec.includes(59)&&
				!types.card[a].mtg.levels[b].spec.includes(67)&&(
					types.card[a].mtg.levels[b].cost.includes(0)&&!types.card[a].mtg.color.includes(0)||
					types.card[a].mtg.levels[b].cost.includes(1)&&!types.card[a].mtg.color.includes(1)||
					types.card[a].mtg.levels[b].cost.includes(2)&&!types.card[a].mtg.color.includes(2)||
					types.card[a].mtg.levels[b].cost.includes(3)&&!types.card[a].mtg.color.includes(3)||
					types.card[a].mtg.levels[b].cost.includes(4)&&!types.card[a].mtg.color.includes(4)||
					types.card[a].mtg.levels[b].cost.includes(5)&&!types.card[a].mtg.color.includes(5)||
					types.card[a].mtg.levels[b].cost.includes(6)&&!types.card[a].mtg.color.includes(0)||
					types.card[a].mtg.levels[b].cost.includes(7)&&(!types.card[a].mtg.color.includes(1)||!types.card[a].mtg.color.includes(2))||
					types.card[a].mtg.levels[b].cost.includes(8)&&(!types.card[a].mtg.color.includes(1)||!types.card[a].mtg.color.includes(3))||
					types.card[a].mtg.levels[b].cost.includes(9)&&(!types.card[a].mtg.color.includes(1)||!types.card[a].mtg.color.includes(4))||
					types.card[a].mtg.levels[b].cost.includes(10)&&(!types.card[a].mtg.color.includes(1)||!types.card[a].mtg.color.includes(5))||
					types.card[a].mtg.levels[b].cost.includes(11)&&(!types.card[a].mtg.color.includes(2)||!types.card[a].mtg.color.includes(3))||
					types.card[a].mtg.levels[b].cost.includes(12)&&(!types.card[a].mtg.color.includes(2)||!types.card[a].mtg.color.includes(4))||
					types.card[a].mtg.levels[b].cost.includes(13)&&(!types.card[a].mtg.color.includes(2)||!types.card[a].mtg.color.includes(5))||
					types.card[a].mtg.levels[b].cost.includes(14)&&(!types.card[a].mtg.color.includes(3)||!types.card[a].mtg.color.includes(4))||
					types.card[a].mtg.levels[b].cost.includes(15)&&(!types.card[a].mtg.color.includes(3)||!types.card[a].mtg.color.includes(5))||
					types.card[a].mtg.levels[b].cost.includes(16)&&(!types.card[a].mtg.color.includes(4)||!types.card[a].mtg.color.includes(5))
			)){
				console.log(types.card[a].name)
			}
		}
	}
}
function outDupes(){
	for(let a=0,la=types.card.length;a<la;a++){
		for(let b=a+1,lb=types.card.length;b<lb;b++){
			if(types.card[a].name==types.card[b].name&&types.card[a].name.length>0&&a!=b){
				console.log(types.card[a].name)
			}
		}
	}
}
function outRepeats(){
	for(let a=0,la=types.card.length;a<la;a++){
		for(let b=0,lb=types.card.length;b<lb;b++){
			if(types.card[a].name==types.card[b].name.substr(0,types.card[a].name.length)&&types.card[a].name.length>0&&a!=b){
				console.log(types.card[a].name)
			}
		}
	}
}
function outOffColor(){
	for(let a=0,la=types.card.length;a<la;a++){
		for(let b=0,lb=types.card[a].mtg.levels.length;b<lb;b++){
			if(
				(
					types.card[a].mtg.levels[b].cost.includes(0)&&!types.card[a].mtg.color.includes(0)||
					types.card[a].mtg.levels[b].cost.includes(1)&&!types.card[a].mtg.color.includes(1)||
					types.card[a].mtg.levels[b].cost.includes(2)&&!types.card[a].mtg.color.includes(2)||
					types.card[a].mtg.levels[b].cost.includes(3)&&!types.card[a].mtg.color.includes(3)||
					types.card[a].mtg.levels[b].cost.includes(4)&&!types.card[a].mtg.color.includes(4)||
					types.card[a].mtg.levels[b].cost.includes(5)&&!types.card[a].mtg.color.includes(5)||
					types.card[a].mtg.levels[b].cost.includes(6)&&!types.card[a].mtg.color.includes(0)||
					types.card[a].mtg.levels[b].cost.includes(7)&&(!types.card[a].mtg.color.includes(1)||!types.card[a].mtg.color.includes(2))||
					types.card[a].mtg.levels[b].cost.includes(8)&&(!types.card[a].mtg.color.includes(1)||!types.card[a].mtg.color.includes(3))||
					types.card[a].mtg.levels[b].cost.includes(9)&&(!types.card[a].mtg.color.includes(1)||!types.card[a].mtg.color.includes(4))||
					types.card[a].mtg.levels[b].cost.includes(10)&&(!types.card[a].mtg.color.includes(1)||!types.card[a].mtg.color.includes(5))||
					types.card[a].mtg.levels[b].cost.includes(11)&&(!types.card[a].mtg.color.includes(2)||!types.card[a].mtg.color.includes(3))||
					types.card[a].mtg.levels[b].cost.includes(12)&&(!types.card[a].mtg.color.includes(2)||!types.card[a].mtg.color.includes(4))||
					types.card[a].mtg.levels[b].cost.includes(13)&&(!types.card[a].mtg.color.includes(2)||!types.card[a].mtg.color.includes(5))||
					types.card[a].mtg.levels[b].cost.includes(14)&&(!types.card[a].mtg.color.includes(3)||!types.card[a].mtg.color.includes(4))||
					types.card[a].mtg.levels[b].cost.includes(15)&&(!types.card[a].mtg.color.includes(3)||!types.card[a].mtg.color.includes(5))||
					types.card[a].mtg.levels[b].cost.includes(16)&&(!types.card[a].mtg.color.includes(4)||!types.card[a].mtg.color.includes(5))
				)&&!specialCost(types.card[a].mtg.levels[b])
			){
				console.log(types.card[a].name)
			}
		}
	}
}
function outUniqueCards(){
	let list=[]
	for(let a=0,la=types.card.length;a<la;a++){
		if(!list.includes(types.card[a].levels[0].attack)){
			list.push(types.card[a].levels[0].attack)
		}
	}
	console.log(list.length)
}
function outUniqueEffects(){
	let list=[]
	for(let a=0,la=types.card.length;a<la;a++){
		for(let b=0,lb=types.card[a].levels.length;b<lb;b++){
			if(!list.includes(types.card[a].levels[b].attack)){
				list.push(types.card[a].levels[b].attack)
			}
		}
	}
	console.log(list.length)
}
function outRelic(){
	console.log(`Common: ${current.relicManager.listing.relic[0].length}
	Uncommon: ${current.relicManager.listing.relic[1].length}
	Rare: ${current.relicManager.listing.relic[2].length}
	Shop: ${current.relicManager.listing.relic[3].length}
	Boss: ${current.relicManager.listing.relic[4].length}
	`)
}
function outClass(){
	let totals=[]
	let build=``
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		totals.push([0,0,0,0,0,0,0,0,0,0,0,0])
	}
	for(let a=0,la=types.card.length;a<la;a++){
		if(types.card[a].list>=0&&types.card[a].list<=constants.playerNumber&&types.card[a].rarity>=0&&types.card[a].levels[0].class>=1&&types.card[a].levels[0].class<=11){
			totals[types.card[a].list][types.card[a].levels[0].class-1]++
		}
	}
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		build+=(a==0?`Colorless:`:`${types.combatant[a].name}:`)+`\nAttacks: ${totals[a][0]}\nDefenses: ${totals[a][1]}\nSkills: ${totals[a][10]}\nMovements: ${totals[a][2]}\nPowers: ${totals[a][3]}\n\n`
	}
	console.log(build)
}
function outSpec(){
	let totals=[]
	let build=``
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		totals.push([0,0,0,0])
	}
	for(let a=0,la=types.card.length;a<la;a++){
		if(types.card[a].list>=0&&types.card[a].list<=constants.playerNumber&&types.card[a].rarity>=0){
			if(types.card[a].levels[0].spec.includes(1)){
				totals[types.card[a].list][0]++
			}
			if(types.card[a].levels[0].spec.includes(2)){
				totals[types.card[a].list][1]++
			}
			if(types.card[a].levels[0].spec.includes(3)){
				totals[types.card[a].list][2]++
			}
			if(types.card[a].levels[0].spec.includes(4)){
				totals[types.card[a].list][3]++
			}
		}
	}
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		build+=(a==0?`Colorless:`:`${types.combatant[a].name}:`)+`\nExhaust: ${totals[a][0]}\nRetain: ${totals[a][1]}\nInnate: ${totals[a][2]}\nEthereal: ${totals[a][3]}\n\n`
	}
	console.log(build)
}
function outCosts(){
	let averages=[]
	let totals=[]
	let build=``
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		averages.push([0,0])
		totals.push([])
	}
	for(let a=0,la=types.card.length;a<la;a++){
		if(
			types.card[a].list>=0&&types.card[a].list<=constants.playerNumber&&types.card[a].rarity>=0&&
			!types.card[a].levels[0].spec.includes(5)&&
			!types.card[a].levels[0].spec.includes(11)&&
			!types.card[a].levels[0].spec.includes(21)&&
			!types.card[a].levels[0].spec.includes(35)&&
			!types.card[a].levels[0].spec.includes(58)&&
			!types.card[a].levels[0].spec.includes(59)&&
			!types.card[a].levels[0].spec.includes(67)
		){
			if(types.card[a].levels[0].cost>=0){
				averages[types.card[a].list][0]+=types.card[a].levels[0].cost
				averages[types.card[a].list][1]++
			}
			let complete=false
			for(let b=0,lb=totals[types.card[a].list].length;b<lb;b++){
				if(totals[types.card[a].list][b][0]==types.card[a].levels[0].cost){
					totals[types.card[a].list][b][1]++
					complete=true
				}
			}
			if(!complete){
				totals[types.card[a].list].push([types.card[a].levels[0].cost,1])
			}
		}
	}
	for(let a=0,la=constants.playerNumber+1;a<la;a++){
		build+=`${(a==0?`Colorless:`:`${types.combatant[a].name}:`)}\nAverage: ${round(averages[a][0]/averages[a][1]*1000)/1000}\n`
		let left=[]
		for(let b=0,lb=totals[a].length;b<lb;b++){
			left.push(totals[a][b][0])
		}
		for(let b=0,lb=left.length;b<lb;b++){
			left=sortNumbers(left)
			for(let c=0,lc=totals[a].length;c<lc;c++){
				if(totals[a][c][0]==left[0]){
					build+=`${totals[a][c][0]==-1?`X`:totals[a][c][0]} Cost: ${totals[a][c][1]}\n`
				}
			}
			left.splice(0,1)
		}
		build+=`\n`
	}
	console.log(build)
}
function colorTest(){
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards=[]
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(findName('Charm\nQuark',types.card),0,0)
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards.length-1].colorful=true
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.compact=0.45
	for(let a=0,la=constants.playerNumber+6;a<la;a++){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(1,0,a,0)
	}
}
function attackTest(type,target,startpoint,endpoint){
	switch(type){
		case 0: case 1: case 2: case 3:
			current.combatantManager.combatants[type==1?target[1]:target].setMaxHP(999999)
			current.combatantManager.combatants[type==1?target[1]:target].statusEffect('Cannot Die',1)
			current.combatantManager.combatants[0].statusEffect('Cannot Die',1)
			if(variants.mtg){
				for(let a=startpoint,la=endpoint==-1?types.card.length:endpoint;a<la;a++){
					for(let b=0,lb=types.card[a].mtg.levels.length;b<lb;b++){
						if((
								type==0&&types.card[a].mtg.levels[b].target[0]==2||
								type==1&&types.card[a].mtg.levels[b].target[0]==1||
								type==2&&types.card[a].mtg.levels[b].target[0]==5||
								type==3&&types.card[a].mtg.levels[b].target[0]==0
							)&&types.card[a].mtg.levels[b].attack!=types.card[a].levels[b].attack
						){
							current.attackManager.type=types.card[a].mtg.levels[b].attack
							current.attackManager.player=0
							current.attackManager.effect=types.card[a].mtg.levels[b].effect
							current.attackManager.attackClass=types.card[a].mtg.levels[b].class
							current.attackManager.user=0
							current.attackManager.level=b
							current.attackManager.color=current.standardColorize(a)
							current.attackManager.energy=3
							current.attackManager.target[0]=type==1?target[0]:target
							current.attackManager.targetDistance=1
							current.attackManager.targetClass=2
							current.attackManager.combo=0
							current.attackManager.amplify=true
							current.attackManager.relPos=[0,0]
							current.attackManager.limit=types.card[a].mtg.levels[b].limit
							current.attackManager.id=-1
							current.attackManager.edition=0
							current.attackManager.drawn=0
							current.attackManager.fuel=0
							current.attackManager.debut=false
							current.attackManager.evolve=0
							current.attackManager.cost=types.card[a].mtg.levels[b].cost
							current.attackManager.execute()
						}
					}
				}
			}else{
				for(let a=startpoint,la=endpoint==-1?types.card.length:endpoint;a<la;a++){
					for(let b=0,lb=types.card[a].levels.length;b<lb;b++){
						if(
							type==0&&types.card[a].levels[b].target[0]==2||
							type==1&&types.card[a].levels[b].target[0]==1||
							type==2&&types.card[a].levels[b].target[0]==5||
							type==3&&types.card[a].levels[b].target[0]==0
						){
							current.attackManager.type=types.card[a].levels[b].attack
							current.attackManager.player=0
							current.attackManager.effect=types.card[a].levels[b].effect
							current.attackManager.attackClass=types.card[a].levels[b].class
							current.attackManager.user=0
							current.attackManager.level=b
							current.attackManager.color=current.standardColorize(a)
							current.attackManager.energy=3
							current.attackManager.target[0]=type==1?target[0]:target
							current.attackManager.targetDistance=1
							current.attackManager.targetClass=2
							current.attackManager.combo=0
							current.attackManager.amplify=true
							current.attackManager.relPos=[0,0]
							current.attackManager.limit=types.card[a].levels[b].limit
							current.attackManager.id=-1
							current.attackManager.edition=0
							current.attackManager.drawn=0
							current.attackManager.fuel=0
							current.attackManager.debut=false
							current.attackManager.evolve=0
							current.attackManager.cost=types.card[a].levels[b].cost
							current.attackManager.execute()
						}
					}
				}
			}
		break
	}
	/*
	attackTest(3,0,0);player(1).setMaxHP(999999);game.animRate=4
	current.overlayManager.closeAll();manager(0).hand.clear();current.attackManager.attacks[0]
	*/
}
function cursed(){
	for(let a=0,la=current.combatantManager.combatants.length;a<la;a++){
		current.combatantManager.combatants[a].goal.anim.direction=0
	}
}
function oracle(){
	current.overlayManager.overlays[35][0].active=true
    current.overlayManager.overlays[35][0].activate([0,-99])
	for(let a=0,la=current.overlayManager.overlays[35][0].cards.length;a<la;a++){
		let cardData=current.overlayManager.overlays[35][0].cards[a]
		cardData.display()
	}
}
function oracle(){
	current.overlayManager.overlays[35][0].active=true
    current.overlayManager.overlays[35][0].activate([0,-99])
	for(let a=0,la=current.overlayManager.overlays[35][0].cards.length;a<la;a++){
		let cardData=current.overlayManager.overlays[35][0].cards[a]
		cardData.display()
	}
}
function movebuildle(){
	current.overlayManager.overlays.push([new overlay(current.overlayManager.layer,current.overlayManager.battle,0,27,[])])
	current.overlayManager.overlays[current.overlayManager.overlays.length-1][0].active=true
    current.overlayManager.overlays[current.overlayManager.overlays.length-1][0].activate([])
}
function rOracle(){
	current.overlayManager.overlays[142][0].active=true
    current.overlayManager.overlays[142][0].activate()
}
function generalizedSearch(test,type){
	current.overlayManager.overlays[35][0].active=true
    current.overlayManager.overlays[35][0].activate([0])
	for(let a=0,la=current.overlayManager.overlays[35][0].cards.length;a<la;a++){
		let cardData=current.overlayManager.overlays[35][0].cards[a]
		cardData.desc=cardData.description(cardData.attack,cardData.effect,cardData.spec,cardData.target)
		if(cardData.desc.includes(test)){
			console.log(cardData.name.replace('\n',' '),'\n',cardData.desc)
		}
	}
	if(type==1){
		current.overlayManager.overlays[115][0].active=true
		current.overlayManager.overlays[115][0].activate([0])
		for(let a=0,la=current.overlayManager.overlays[115][0].cards.length;a<la;a++){
			let cardData=current.overlayManager.overlays[115][0].cards[a]
			cardData.desc=cardData.description(cardData.attack,cardData.effect,cardData.spec,cardData.target)
			if(cardData.desc.includes(test)){
				console.log(cardData.name.replace('\n',' '),'\n',cardData.desc)
			}
		}
	}
}
function mtgPlayerColor(player){
	/*
	0-colorless
	1-white
	2-blue
	3-black
	4-green
	5-red
	6-rainbow
	*/
	switch(player){
		case 0: return [0]
		case 1: return [4]
		case 2: return [1]
		case 3: return [3,5]
		case 4: return [5]
		case 5: return [2,5]
		case 6: return [3,4]
		case 7: return [4,5]
		case 8: return [1,5]
		case 9: return [1,4]
		case 10: return [3]
		case 11: return [2,3]
		case 12: return [1,3]
		case 13: return [1,2]
		case 14: return [2]
		case 15: return [2,4]
		case 16: return [1,2,4]
		case 17: return [1,4,5]
		case 18: return [1,2,3]
		case 19: return [3,4,5]
		case 20: return [2,3,5]
		case 21: return [1,3,4]
		case 22: return [2,4]
		case 23: return [2,3]
		case 24: return [4,5]
		default: return [6]
	}
}
function mtgManaBase(player){
	let playerColor=mtgPlayerColor(player)
	let missing=[]
	for(let a=0,la=5;a<la;a++){
		if(!playerColor.includes(a+1)){
			missing.push(a+1)
		}
	}
	let result=[]
	if(playerColor.length==3){
		result=[
			[playerColor[0],playerColor[0],playerColor[1],playerColor[1],playerColor[2]],
			[playerColor[0],playerColor[0],playerColor[1],playerColor[2],playerColor[2]],
			[playerColor[0],playerColor[1],playerColor[1],playerColor[2],playerColor[2]],
			[playerColor[0],playerColor[0],playerColor[0],playerColor[1],playerColor[1]],
			[playerColor[0],playerColor[0],playerColor[1],playerColor[1],playerColor[1]],
			[playerColor[0],playerColor[0],playerColor[0],playerColor[2],playerColor[2]],
			[playerColor[0],playerColor[0],playerColor[2],playerColor[2],playerColor[2]],
			[playerColor[1],playerColor[1],playerColor[1],playerColor[2],playerColor[2]],
			[playerColor[1],playerColor[1],playerColor[2],playerColor[2],playerColor[2]]
		]
	}else if(playerColor.length==2){
		result=[
			[playerColor[0],playerColor[0],playerColor[0],playerColor[1],playerColor[1]],
			[playerColor[0],playerColor[0],playerColor[1],playerColor[1],playerColor[1]],
			[playerColor[0],playerColor[0],playerColor[1],playerColor[1],missing[0]],
			[playerColor[0],playerColor[0],playerColor[1],playerColor[1],missing[1]],
			[playerColor[0],playerColor[0],playerColor[1],playerColor[1],missing[2]]
		]
	}else{
		result=[
			[playerColor[0],playerColor[0],playerColor[0],missing[0],missing[0]],
			[playerColor[0],playerColor[0],playerColor[0],missing[1],missing[1]],
			[playerColor[0],playerColor[0],playerColor[0],missing[2],missing[2]],
			[playerColor[0],playerColor[0],playerColor[0],missing[3],missing[3]]
		]
	}
	if(variants.prism||variants.ultraprism||variants.junk){
		result.push([1,2,3,4,5])
	}
	return result
}
function mtgCombineColor(base1,base2){
	/*
	0-colorless
	1-white
	2-blue
	3-black
	4-green
	5-red
	6-rainbow

	7-white+blue
	8-white+black
	9-white+green
	10-white+red
	11-blue+black
	12-blue+green
	13-blue+red
	14-black+green
	15-black+red
	16-green+red
	*/
	switch(base1){
		case 1:
			switch(base2){
				case 1:
					return 1
				case 2:
					return 7
				case 3:
					return 8
				case 4:
					return 9
				case 5:
					return 10
				default:
					return 6
			}
		case 2:
			switch(base2){
				case 1:
					return 7
				case 2:
					return 2
				case 3:
					return 11
				case 4:
					return 12
				case 5:
					return 13
				default:
					return 6
			}
		case 3:
			switch(base2){
				case 1:
					return 8
				case 2:
					return 11
				case 3:
					return 3
				case 4:
					return 14
				case 5:
					return 15
				default:
					return 6
			}
		case 4:
			switch(base2){
				case 1:
					return 9
				case 2:
					return 12
				case 3:
					return 14
				case 4:
					return 4
				case 5:
					return 16
				default:
					return 6
			}
		case 5:
			switch(base2){
				case 1:
					return 10
				case 2:
					return 13
				case 3:
					return 15
				case 4:
					return 16
				case 5:
					return 5
				default:
					return 6
			}
		default: return 6
	}
}
function mtgSplitColor(base){
	switch(base){
        case 7:
            return [1,2]
        case 8:
            return [1,3]
        case 9:
            return [1,4]
        case 10:
            return [1,5]
        case 11:
            return [2,3]
        case 12:
            return [2,4]
        case 13:
            return [2,5]
        case 14:
            return [3,4]
        case 15:
            return [3,5]
        case 16:
            return [4,5]
		default:
			return [base]
	}
}
function mtgAutoCost(mana,cost,variant,args,bypass){
	let spend=[]
	let manaLeft=copyArray(mana)
	let costLeft=[]
	try{
		costLeft=copyArray(cost)
	}catch(error){
		console.log(`Cannot Parse Card Costing ${cost}`)
		noLoop()
	}
	for(let a=0,la=costLeft.length;a<la;a++){
		if(costLeft[a]==6){
			if(manaLeft[6]>0){
				manaLeft[6]--
				costLeft.splice(a,1)
				a--
				la--
				spend.push(6)
			}else if(!bypass){
				return -1
			}
		}
	}
	for(let a=0,la=costLeft.length;a<la;a++){
		if(costLeft[a]>=0&&costLeft[a]<=5){
			if(manaLeft[costLeft[a]]>0){
				manaLeft[costLeft[a]]--
				spend.push(costLeft[a])
				costLeft.splice(a,1)
				a--
				la--
			}else if(manaLeft[6]>0){
				manaLeft[6]--
				costLeft.splice(a,1)
				a--
				la--
				spend.push(6)
			}else if(!bypass){
				return -1
			}
		}
	}
	let effectiveManaLeft=copyArray(manaLeft)
	let totals=sortNumbersUnique(manaLeft)
	let priority=[]
	for(let a=0,la=totals.length;a<la;a++){
		for(let b=0,lb=totals.length;b<lb;b++){
			if(manaLeft[b]==totals[a]){
				priority.push(b)
			}
		}
	}
	switch(variant){
		case 1: case 3:
			for(let a=0,la=args[0].length;a<la;a++){
				for(let b=0,lb=args[0][a].cost.length;b<lb;b++){
					if(args[0][a].cost[b]>=0&&args[0][a].cost[b]<=6){
						effectiveManaLeft[args[0][a].cost[b]]--
					}
				}
			}
			for(let a=0,la=args[0].length;a<la;a++){
				for(let b=0,lb=args[0][a].cost.length;b<lb;b++){
					if(args[0][a].cost[b]>=7&&args[0][a].cost[b]<=16){
						let split=mtgSplitColor(args[0][a].cost[b])
						if(effectiveManaLeft[split[0]]>effectiveManaLeft[split[1]]){
							effectiveManaLeft[split[0]]--
						}else if(effectiveManaLeft[split[0]]<effectiveManaLeft[split[1]]){
							effectiveManaLeft[split[1]]--
						}else if(manaLeft[split[0]]>manaLeft[split[1]]&&manaLeft[split[0]]>0){
							effectiveManaLeft[split[0]]--
						}else if(manaLeft[split[0]]<manaLeft[split[1]]&&manaLeft[split[1]]>0){
							effectiveManaLeft[split[1]]--
						}else{
							effectiveManaLeft[split[0]]-=0.5
							effectiveManaLeft[split[1]]-=0.5
						}
					}
				}
			}
		break
	}
	let hybridTotal=[]
	for(let a=0,la=costLeft.length;a<la;a++){
		if(costLeft[a]>=7&&costLeft[a]<=16){
			hybridTotal.push(costLeft[a])
			costLeft.splice(a,1)
			a--
			la--
		}
	}
	if(hybridTotal.length>0){
		let parsingMana=copyArray(effectiveManaLeft)
		parsingMana[6]=0
		let hybridSpend=hybridRecurse(0,parsingMana,hybridTotal,[],priority,variant==2?1:variant)
		if(hybridSpend[0]==-1){
			hybridSpend=hybridRecurse(0,effectiveManaLeft,hybridTotal,[],priority,variant==2?1:variant)
			if(hybridSpend[0]==-1){
				hybridSpend=hybridRecurse(0,manaLeft,hybridTotal,[],priority,variant)
				if(hybridSpend[0]==-1){
					hybridSpend=[[],[hybridTotal]]
					if(!bypass){
						return -1
					}
				}
			}
		}
		for(let a=0,la=hybridSpend[0].length;a<la;a++){
			effectiveManaLeft[hybridSpend[0][a]]--
			manaLeft[hybridSpend[0][a]]--
			spend.push(hybridSpend[0][a])
		}
		for(let a=0,la=hybridSpend[1].length;a<la;a++){
			costLeft.push(hybridSpend[1][a])
		}
	}
	totals=sortNumbersUnique(manaLeft)
	priority=[]
	for(let a=0,la=totals.length;a<la;a++){
		for(let b=0,lb=manaLeft.length;b<lb;b++){
			if(manaLeft[b]==totals[a]){
				priority.push(b)
			}
		}
	}
	for(let a=0,la=costLeft.length;a<la;a++){
		if(costLeft[a]==-1){
			let spent=false
			let effectiveTotals=sortNumbers(effectiveManaLeft)
			for(let b=0,lb=effectiveTotals.length;b<lb;b++){
				for(let c=0,lc=priority.length;c<lc;c++){
					if(priority[lc-1-c]!=6&&manaLeft[priority[lc-1-c]]==effectiveTotals[lb-1-b]&&effectiveManaLeft[priority[lc-1-c]]>0&&manaLeft[priority[lc-1-c]]>0){
						manaLeft[priority[lc-1-c]]--
						effectiveManaLeft[priority[lc-1-c]]--
						costLeft.splice(a,1)
						a--
						la--
						spend.push(priority[lc-1-c])
						b=lb
						c=lc
						spent=true
					}
				}
			}
			if(!spent){
				effectiveTotals=sortNumbers(manaLeft)
				for(let b=0,lb=effectiveTotals.length;b<lb;b++){
					for(let c=0,lc=priority.length;c<lc;c++){
						if(priority[lc-1-c]!=6&&manaLeft[priority[lc-1-c]]==effectiveTotals[lb-1-b]&&manaLeft[priority[lc-1-c]]>0){
							manaLeft[priority[lc-1-c]]--
							costLeft.splice(a,1)
							a--
							la--
							spend.push(priority[lc-1-c])
							b=lb
							c=lc
							spent=true
						}
					}
				}
				if(!spent){
					if(manaLeft[6]>0){
						manaLeft[6]--
						costLeft.splice(a,1)
						a--
						la--
						spend.push(6)
					}else if(!bypass){
						return -1
					}
				}
			}
		}
	}
	for(let a=0,la=costLeft.length;a<la;a++){
		if(costLeft[a]==-3){
			if(variant==2){
				for(let b=0,lb=manaLeft.length;b<lb;b++){
					if(manaLeft[b]>0){
						for(let c=0,lc=manaLeft[b];c<lc;c++){
							spend.push(b)
						}
						manaLeft[b]=0
					}
				}
			}
			costLeft.splice(a,1)
			a--
			la--
		}
	}
	if(costLeft.length>0&&(variant==0||variant==3)){
		console.log(costLeft,'Failed MTG Spending Calculation')
		return -1
	}
	switch(variant){
		case 0: case 1: case 3:
			return spend
		case 2:
			return [spend,costLeft]
	}
}
function hybridRecurse(depth,mana,cost,spent,priority,variant){
	if(cost.length==0){
		return [spent,[]]
	}else{
		let possible=mtgSplitColor(cost[0])
		let higher=mana[possible[0]]==mana[possible[1]]?(priority.indexOf(possible[0])>priority.indexOf(possible[1])?0:1):(mana[possible[0]]>mana[possible[1]]?0:1)
		if(mana[possible[higher]]>0){
			let resultMana=copyArray(mana)
			resultMana[possible[higher]]--
			let attempt=hybridRecurse(depth+1,resultMana,cost.slice(1,cost.length),spent.concat(possible[higher]),priority,variant)
			if(attempt!=-1){
				return attempt
			}
		}
		if(mana[possible[1-higher]]>0){
			let resultMana=copyArray(mana)
			resultMana[possible[1-higher]]--
			let attempt=hybridRecurse(depth+1,resultMana,cost.slice(1,cost.length),spent.concat(possible[1-higher]),priority,variant)
			if(attempt!=-1){
				return attempt
			}
		}
		if(mana[6]>0){
			let resultMana=copyArray(mana)
			resultMana[6]--
			let attempt=hybridRecurse(depth+1,resultMana,cost.slice(1,cost.length),spent.concat(6),priority,variant)
			if(attempt!=-1){
				return attempt
			}
		}
		return [variant==2?spent:-1,cost]
	}
}
function total7(list){
	return list[0]+list[1]+list[2]+list[3]+list[4]+list[5]+list[6]
}