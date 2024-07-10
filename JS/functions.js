function isInt(value){
	return !isNaN(value)&&parseInt(Number(value))==value&&!isNaN(parseInt(value,10))
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
	layer.triangle(x+sin(direction)*radiusX,y+cos(direction)*radiusY,x+sin(direction+120)*radiusX,y+cos(direction+120)*radiusY,x+sin(direction+240)*radiusX,y+cos(direction+240)*radiusY)
}
function regPoly(layer,x,y,sides,radiusX,radiusY,direction){
	layer.beginShape()
	for(k=0;k<sides;k++){
		layer.vertex(x+sin(direction+k*360/sides)*radiusX,y+cos(direction+k*360/sides)*radiusY)
	}
	layer.endShape(CLOSE)
}
function regPolyBroken(layer,x,y,sides,radiusX,radiusY,direction){
	layer.beginShape()
	for(k=0;k<sides;k++){
		layer.vertex(x+sin(direction+(k-k%2*0.5)*360/sides)*radiusX,y+cos(direction+(k-k%2*0.5)*360/sides)*radiusY)
	}
	layer.endShape(CLOSE)
}
function regStar(layer,x,y,sides,radiusX,radiusY,radius2X,radius2Y,direction){
	layer.beginShape()
	for(k=0;k<sides*2;k++){
		layer.vertex(x+sin(direction+k*180/sides)*(k%2==0?radiusX:radius2X),y+cos(direction+k*180/sides)*(k%2==0?radiusY:radius2Y))
	}
	layer.endShape(CLOSE)
}
function halfRegStar(layer,x,y,sides,radiusX,radiusY,radius2X,radius2Y,direction){
	layer.beginShape()
	for(k=0;k<sides*2+1;k++){
		layer.vertex(x+sin(direction+k*90/sides)*(k%2==0?radiusX:radius2X),y+cos(direction+k*90/sides)*(k%2==0?radiusY:radius2Y))
	}
	layer.endShape(CLOSE)
}
function diamond(layer,x,y,width,height,direction){
	layer.quad(x-width*cos(direction),y-width*sin(direction),x-height*sin(direction),y-height*cos(direction),x+width*cos(direction),y+width*sin(direction),x+height*sin(direction),y+height*cos(direction))
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
function flower(layer,size,color,width,height){
	layer.push()
	layer.scale(size)
	layer.strokeWeight(0.6)
	layer.strokeJoin(ROUND)
	for(let a=0,la=100;a<la;a++){
		for(let b=0,lb=5;b<lb;b++){
			layer.fill(mergeColor(color[0],color[1],a/la))
			layer.stroke(mergeColor(color[0],color[1],a/la))
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
	layer.fill(color[2])
	for(let a=0,la=5;a<la;a++){
		layer.rotate(60)
		layer.quad(0,-4,width[3],-16,0,-24,-width[3],-16)
		layer.rotate(12)
	}
	layer.fill(color[3])
	layer.ellipse(0,0,12,12)
	layer.pop()
}
function crystalFlower(layer,size,direction,color,width,height){
	layer.push()
	layer.scale(size)
    layer.rotate(direction)
    for(let a=0,la=5;a<la;a++){
        for(let b=0,lb=100;b<lb;b++){
            layer.fill(mergeColor(color[0],color[1],1-b/lb))
            layer.beginShape()
            layer.vertex(0,0)
            layer.bezierVertex(-width[0]*(1-b/lb),-15*(1-b/lb),-width[0]*(1-b/lb),-55*(1-b/lb),-width[1]*(1-b/lb),-70*(1-b/lb))
            layer.vertex(0,-height[0]*(1-0.75*b/lb))
            layer.endShape(CLOSE)
        }
        layer.rotate(-72)
        for(let b=0,lb=100;b<lb;b++){
            layer.fill(mergeColor([216,112,124],[247,225,225],1-b/lb))
            layer.beginShape()
            layer.vertex(0,0)
            layer.bezierVertex(width[0]*(1-b/lb),-15*(1-b/lb),width[0]*(1-b/lb),-55*(1-b/lb),width[1]*(1-b/lb),-70*(1-b/lb))
            layer.vertex(0,-height[0]*(1-0.75*b/lb))
            layer.endShape(CLOSE)
        }
    }
    layer.fill(color[2])
    for(let a=0;a<5;a++){
        layer.rotate(60)
        layer.quad(0,-4,width[2],-16,0,-24,-width[2],-16)
        layer.rotate(12)
    }
    layer.fill(color[3])
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
function sign(value){
	return value<0?-1:1
}
function pointInsideBox(point,box){
	return point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2
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
			if(variant&&args[4]&&user.status.main[402]>0){
				bonus+=user.status.main[402]
			}
			if(variant&&args[5]&&user.status.main[403]>0){
				bonus+=user.status.main[403]
			}
			if(variant&&args[6]&&user.status.main[404]>0){
				bonus+=user.status.main[404]
			}
			if(variant&&args[7]&&user.status.main[413]>0){
				bonus+=user.status.main[413]
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
			if(user.status.main[8]>0){
				damage*=user.status.main[381]>0?1.25:0.75
				bonus*=user.status.main[381]>0?1.25:0.75
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
				damage*=2
				bonus*=2
			}
			if(user.stance==4){
				damage*=0.5
				bonus*=0.5
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
		case 1: case 3: case 6: case 14: case 15: case 16:
			let block=effect
			let bonusB=0
			let totalDex=0
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
			if(user.status.main[9]>0){
				block*=0.75
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
				case 6: return effect==1?(block==effect?'1*Combo':`1(${tennify(block)})*Combo`):(block==effect?tennify(effect)+'*Combo':tennify(effect)+`(${tennify(block)})*Combo`)
				case 14: return block==effect?tennify(effect):tennify(effect)+`(${tennify(block)})`
				case 15: return effect==1?(block==effect?'1*':`1(${tennify(block)})*`):(block==effect?tennify(effect)+'*':tennify(effect)+`(${tennify(block)})*C`)
				case 16: return (block==effect?(effect==1?``:tennify(effect))+'X':tennify(effect)+`(${tennify(block)})X`)

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
				case 9: return health==effect?tennify(effect)+`X`:tennify(effect)+` (${tennify(health)})X`
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
			case 5: return `Shuffle in ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}`
			case 6: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2`
			case 7: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-2`
			case 8: return `Shuffle in ${info?attack.effect[0]:`?`} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 9: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-1`
			case 10: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies`
			case 11: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\nRange 1-1`
			case 12: case 80: case 115: case 161: case 165: case 245: case 283: case 362:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6\nNo Movement`
			case 13: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-1`
			case 14: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 15: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-2`
			case 16: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nRange 1-1`
			case 17: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nTargets Cannot Move\nFor ${info?attack.effect[1]:`?`} Turn${attack.effect[1]!=1?`s`:``}\nRange 1-1`
			case 18: return `Gain ${info?attack.effect[0]:`?`} Strength`
			case 19: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-2`
			case 20: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-2`
			case 21: return `Do Nothing`
			case 22: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-1`
			case 23: return `Apply ${info?attack.effect[0]:`?`} Weak\nRange 1-1`
			case 24: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bleed\nRange 1-2`
			case 25: return `Heal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nFor All Enemies`
			case 26: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Strength`
			case 27: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Frail\nRange 1-2`
			case 28: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-2`
			case 29: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 1 Turn`
			case 30: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\nRange 1-2`
			case 31: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-1`
			case 32: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 33: return `Apply ${info?attack.effect[0]:`?`} Weak\nRange 1-2`
			case 34: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nGain 1 Combo Per Hit\nRange 1-1`
			case 35: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nGain 1 Combo\nRange 1-1`
			case 36: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain 1 Combo Per Hit\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-1`
			case 37: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage+${info?calculateIntent(attack.effect[1],user,0):`?`}*Combo\nRange 1-1`
			case 38: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6`
			case 39: return `Spawn ${info?attack.effect[0]:`?`} ${info?attack.effect[1]+(attack.effect[0]!=1?`s`:``):`?`}`
			case 40: return `Create ${info?attack.effect[0]:`?`} Landmine${attack.effect[0]!=1?`s`:``}`;
			case 41: return `Create ${info?attack.effect[0]:`?`} Spike${attack.effect[0]!=1?`s`:``}`;
			case 42: return `Create ${info?attack.effect[0]:`?`} Trenche${attack.effect[0]!=1?`s`:``}`;
			case 43: return `Create Target Zone\nfor ${info?attack.effect[0]:`?`} Damage`
			case 44: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bleed\n3 Tiles Wide\nRange 1-2`
			case 45: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-6`
			case 46: return `Create Target Line\nfor ${info?attack.effect[0]:`?`} Damage`
			case 47: case 173:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-6\nNo Movement`
			case 48: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 2 Turns`
			case 49: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-6\nNo Movement`
			case 50: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turn${attack.effect[1]!=1?`s`:``}\nRange 1-6\nNo Movement`
			case 51: return `Create ${info?attack.effect[0]:`?`} Trap${attack.effect[0]!=1?`s`:``}`;
			case 52: return `Create ${info?attack.effect[0]*2:`?`} Slime Tile${attack.effect[0]!=1?`s`:``}`;
			case 53: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\n3 Tiles Wide\nRange 1-2`
			case 54: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nto All Adjacent Tiles\nRange 1-1`
			case 55: return `Apply ${info?attack.effect[0]:`?`} Weak\nto All Adjacent Tiles\nRange 1-2`
			case 56: return `Create ${info?attack.effect[0]:`?`} Shield Particle${attack.effect[0]!=1?`s`:``}`
			case 57: return `Gain Block Equal\nto Health of\nShield Particles`
			case 58: return `Apply ${info?attack.effect[0]:`?`} Bleed`
			case 59: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-6`
			case 60: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\n3 Tiles Wide\nRange 1-1`
			case 61: return `Apply ${info?attack.effect[0]:`?`} Frail\nRange 1-2`
			case 62: return `Apply ${info?attack.effect[0]:`?`} Vulnerable\nRange 1-2`
			case 63: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Dexterity`
			case 64: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nIgnore Block\nRange 1-1`
			case 65: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Retain Block\nFor 1 Turn`
			case 66: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 67: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSteal ${info?attack.effect[1]:`?`} Currency\nRange 1-2`
			case 68: return `Leave Battle`
			case 69: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\n3 Tiles Wide\nRange 1-1`
			case 70: return `Heal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nFor Core`
			case 71: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-3`
			case 72: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Strength`
			case 73: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-3`
			case 74: return `Shuffle in ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nUpgrade All ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}s\nRange 1-3`
			case 75: return `Create Currency on All Tiles`
			case 76: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 77: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 4 Times\nRange 1-2`
			case 78: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nBetween Self and\nOther Bronze Orbs`
			case 79: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-3`
			case 81: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6\nNo Movement`
			case 82: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\n3 Tiles Wide\nRange 1-1`
			case 83: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6`
			case 84: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\n3 Tiles Wide\nRange 1-1`
			case 85: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n5 Tiles Wide\nRange 2-2`
			case 86: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\n5 Tiles Wide\nRange 2-2`
			case 87: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nto All Adjacent Tiles\nRange 1-1`
			case 88: return `You Cannot Move\nFor ${info?attack.effect[0]:`?`} Turn${attack.effect[0]!=1?`s`:``}`
			case 89: case 145: case 338:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6\nNo Movement`
			case 90: case 235:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-6\nNo Movement`
			case 91: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6\nNo Movement`
			case 92: return `Draw ${info?attack.effect[0]:`?`} Less\nCard${attack.effect[0]!=1||info?`s`:``} Next Turn`
			case 93: return `Target Loses ${info?attack.effect[0]:`?`} Energy`
			case 94: return `Apply ${info?attack.effect[0]:`?`} Anti-Control`
			case 95: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 4 Times\n3 Tiles Wide\nRange 1-1`
			case 96: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPulls at Range 2\nRange 1-2`
			case 97: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nPush 1 Tile\nRange 1-1`
			case 98: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-6`
			case 99: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-3`
			case 100: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-4`
			case 101: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 4 Times\nRange 1-1`
			case 102: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 3 Turns`
			case 103: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-2`
			case 104: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\n3 Tiles Wide\nRange 1-1`
			case 105: return `Shuffle in ${info?attack.effect[0]:`?`} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}\n3 Tiles Wide\nRange 1-2`
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
			case 119: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDraw ${info?attack.effect[0]:`?`} Less\nCard${attack.effect[0]!=1||info?`s`:``} Next Turn\nRange 1-6\nNo Movement`
			case 120: return `Apply ${info?attack.effect[0]:`?`} Distracted\nto All Adjacent Tiles\nRange 1-1`
			case 121: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Right\nRange 1-1`
			case 122: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Left\nRange 1-1`
			case 123: return `Apply ${info?attack.effect[0]:`?`} Bleed\nRange 1-6\nNo Movement`
			case 124: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} Energy\n3 Tiles Wide\nRange 1-1`
			case 125: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSwap With Target\nRange 1-6`
			case 126: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Retain Block\nFor 2 Turns`
			case 127: case 363:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nRange 2-2`
			case 128: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-1`
			case 129: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\nRange 1-6\nNo Movement`
			case 130: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-6\nNo Movement`
			case 131: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Directions Wide\nRange 1-6\nNo Movement`
			case 132: return `Shuffle in ${info?attack.effect[0]:`?`} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nto All Adjacent Tiles\nRange 1-1`
			case 133: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\n2 Times\nRange 1-1`
			case 134: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6\nNo Movement\nIf No Target,\nCreate Target Zone`
			case 135: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nand Shuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nto All Targets and Swap`
			case 136: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nKill Self\nRange 1-1`
			case 137: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2\nTargets Adjacent Diagonals`
			case 138: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Back Left\nRange 1-2`
			case 139: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Back Right\nRange 1-2`
			case 140: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Move\nFor ${info?attack.effect[1]:`?`} Turn${attack.effect[1]!=1?`s`:``}\nRange 1-6\nNo Movement`
			case 141: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} Energy\nRange 1-6\nNo Movement`
			case 142: return `Gain ${info?attack.effect[0]:`?`} Strength\nDeal ${info?calculateIntent(attack.effect[1],user,0):`?`} Damage\nPush 1 Tile\nto All Adjacent Tiles\nRange 1-1`
			case 143: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 2 Tiles\nRange 1-3`
			case 144: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nStaple ${info?attack.effect[1]:`?`} Cards\nRange 1-6\nNo Movement`
			case 146: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\n3 Tiles Wide\nRange 1-2`
			case 147: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\n3 Times\nRange 1-1`
			case 148: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Poison\nRange 1-6\nNo Movement`
			case 149: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Bleed\nRange 1-2`
			case 150: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nSmoke ${info?attack.effect[1]:`?`} Cards\nRange 2-2`
			case 151: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\nRange 1-6\nNo Movement`
			case 152: return `Apply ${info?attack.effect[0]:`?`} Weak\nRange 1-6`
			case 153: return `Apply ${info?attack.effect[0]:`?`} Weak\n3 Tiles Wide\nRange 1-1`
			case 154: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nSpawn Line of Poison Tiles`
			case 155: return `Spawn ${info?attack.effect[0]:`?`} ${info?attack.effect[1]+(attack.effect[0]!=1?`s`:``):`?`} Nearby`
			case 156: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nPulls at Range 2\nRange 1-2`
			case 157: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nPush 1 Tile\nto All Adjacent Tiles\nRange 1-1`
			case 158: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMove ${info?attack.effect[1]:`?`} Card${attack.effect[1]!=1?`s`:``} From\nDraw to Discard\nRange 1-6\nNo Movement`
			case 159: return `Gain ${info?attack.effect[0]:`?`} Stack${attack.effect[0]!=1?`s`:``} of\nRandom Buffs or Nerfs`
			case 160: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPull to 1 Range\nRange 1-1`
			case 162: return `Move until Collision,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage`
			case 163: return `Heal ${info?attack.effect[0]:`?`} Health\nNext ${info?attack.effect[1]:`?`} Attack${attack.effect[1]!=1?`s`:``}\nDeal Double Damage`;
			case 164: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 166: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nPulls at 2 Range\nto All Adjacent Tiles\nRange 1-2`
			case 167: return `Gain ${info?attack.effect[0]:`?`}-${info?attack.effect[1]:`?`} Stacks of\n5 Random Buffs or Nerfs`
			case 168: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\n3 Tiles Wide\nRange 1-2`
			case 169: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Regen`
			case 170: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Buffer`
			case 171: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bleed\n3 Tiles Wide\nRange 1-2`
			case 172: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Percent Health as Damage\nRange 1-3`
			case 174: return `Take Half Damage\nFor ${info?attack.effect[0]:`?`} Turns`
			case 175: return `Move up to 3 Tiles,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap`
			case 176: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin 12 Directions\nRange 1-2`
			case 177: return `Become Invisible for ${info?attack.effect[0]:`?`} Turns`
			case 178: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6`
			case 179: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6\nNo Movement`
			case 180: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdvances to and Pulls\nat Range 2 at Above\nRange 1-6`
			case 181: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 2-2`
			case 182: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 6 Turns`
			case 183: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in (3-Range)x${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 184: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n6 Times\nRange 1-6`
			case 185: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-6`
			case 186: return `Respawn All Defeated\nAllies Nearby`
			case 187: return `Gain ${info?attack.effect[0]:`?`} Buffer\nGain ${info?attack.effect[1]:`?`} Strength`
			case 188: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`}xRange Damage\nRange 1-6\nNo Movement`
			case 189: return `Spawn ${info?attack.effect[0]:`?`} ${info?attack.effect[1]+(attack.effect[0]>0?`s`:``):`?`} at Corners\nHas Chance to Spawn ${info?attack.effect[2]+(attack.effect[0]>0?`s`:``):`?`}`
			case 190: return `Add ${info?attack.effect[0]:`?`} Block\nGain ${info?attack.effect[1]:`?`} Armor\nGain ${info?attack.effect[2]:`?`} Strength`
			case 191: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\nRange 1-6\nNo Movement`
			case 192: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nto All Adjacent Tiles\nRange 1-2`
			case 193: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turn${attack.effect[1]!=1?`s`:``}\nRange 1-6`
			case 194: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6`
			case 195: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nUsable in 3 Directions`
			case 196: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6`
			case 197: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Armor`
			case 198: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nTargets Lose ${info?attack.effect[1]:`?`} Energy\nRange 1-1`
			case 199: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTransform ${info?attack.effect[1]:`?`} Card${attack.effect[1]!=1?`s`:``}\nRange 1-6`
			case 200: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHeal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nRange 1-6`
			case 201: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSet Values of ${info?attack.effect[1]:`?`} Card${attack.effect[1]!=1?`s`:``} to 1\nRange 1-6`
			case 202: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nClear Target Statuses\nRange 1-6`
			case 203: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile in a Random Direction\nRange 1-2`
			case 204: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n5 Tiles Wide\nRange 1-1`
			case 205: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin 3 Directions\nRange 1-6`
			case 206: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nSwap With Target\nRange 1-6`
			case 207: return `Gain ${info?attack.effect[0]:`?`} Strength\nGains Double When Below Half Health`
			case 208: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nRange 1-6`
			case 209: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nRange 1-1`
			case 210: return `Move ${info?attack.effect[0]:`?`} More Time${attack.effect[0]>0?`s`:``} Per Turn`
			case 211: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSet Range to 3-Range\nRange 1-2`
			case 212: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nIf Successful, Repeats Once\nRange 1-1`
			case 213: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Left\nto All Adjacent Tiles\nRange 1-1`
			case 214: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2\nTargets 2 Adjacent Tiles`
			case 215: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Dissipate\nto All Adjacent Tiles\nRange 1-2`
			case 216: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage to Self\nHeal Health to Boss\nEqual to Damage Dealt`
			case 217: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nSpawn ${info?attack.effect[1]:`?`} ${info?attack.effect[2]+(attack.effect[1]>0?`s`:``):`?`}\nOn Hit\nRange 1-1`
			case 218: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Diagonal Directions\nRange 1-6\nNo Movement`
			case 219: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin All Directions\nRange 1-6\nNo Movement`
			case 220: return `Take Third Damage\nFor ${info?attack.effect[0]:`?`} Turns`
			case 221: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-3\nTargets 2 Adjacent Tiles\nTargets Adjacent Diagonals`
			case 222: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nin a 60% Field\nRange 1-3`
			case 223: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHits All Targets in Range\nPush 1 Tile Right\nRange 1-2`
			case 224: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHits All Targets in Range\nPush 1 Tile Left\nRange 1-2`
			case 225: return `Kill Self\nReturn Next Turn,\nHealed to Full`
			case 228: return `Counter ${info?calculateIntent(attack.effect[0],user,0):`?`} All This Combat`
			case 229: return `Apply ${info?calculateIntent(attack.effect[0],user,0):`?`} Take Per Turn`
			case 230: return `Add ${info?attack.effect[0]:`?`} Block\nto Builder`
			case 231: return `Builder Draws ${info?attack.effect[0]:`?`}\nCard${attack.effect[0]!=1||info?`s`:``}`
			case 232: return `Builder Gains ${info?attack.effect[0]:`?`}\nTemporary Strength`
			case 233: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTo All Targets`
			case 234: return `Builder Adds ${info?attack.effect[0]:`?`}\nGun Rack${attack.effect[0]!=1||info?`s`:``} to Hand`
			case 237: return `Builder Gains ${info?attack.effect[0]:`?`}\nMetal`
			case 238: return `Builder Upgrades ${info?attack.effect[0]:`?`}\nCard${attack.effect[0]!=1||info?`s`:``}`
			case 239: return `Builder Transforms ${info?attack.effect[0]:`?`}\nCard${attack.effect[0]!=1||info?`s`:``}`
			case 240: return `Builder Duplicates ${info?attack.effect[0]:`?`}\nCard${attack.effect[0]!=1||info?`s`:``}`
			case 241: return `Builder Exhausts ${info?attack.effect[0]:`?`}\nCard${attack.effect[0]!=1||info?`s`:``}\nBuilder Draws ${info?attack.effect[1]:`?`}\nCard${attack.effect[1]!=1||info?`s`:``}`
			case 242: return `Apply ${info?attack.effect[0]:`?`} Burn\nRange 1-1`
			case 243: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage to Self`
			case 244: return `Randomly Edit the Map,\nAdding in Mines`
			case 246: return `Apply ${info?attack.effect[0]:`?`} Freeze\nRange 1-1`
			case 247: return `Apply ${info?attack.effect[0]:`?`} Burn, Freeze, or Shock\nRange 1-1`
			case 248: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`}-${info?calculateIntent(attack.effect[1],user,0):`?`} Damage`
			case 249: return `Apply ${info?attack.effect[0]:`?`} Weak\nto Everybody Else`
			case 250: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Vulnerable to Self\nRange 1-2`
			case 251: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nand Take ${info?attack.effect[1]:`?`} Damage\n3 Times\nRange 1-1`
			case 252: return `Apply ${info?attack.effect[0]:`?`} Dissipating\nPush 1 Tile\nRange 1-1`
			case 253: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bruise\nRange 1-2`
			case 254: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nAll Enemies\nGain ${info?attack.effect[1]:`?`} Strength`
			case 255: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nto All Adjacent Tiles\nRange 1-2`
			case 256: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Vulnerable\nto All Adjacent Tiles\nRange 1-2`
			case 257: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies\nGain ${info?attack.effect[1]:`?`} Dexterity`
			case 258: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Block\nRange 1-2`
			case 259: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\n1 Less Range Forward\nRange 1-2`
			case 260: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMove ${info?attack.effect[1]:`?`} More Time${attack.effect[1]>0?`s`:``} Per Turn\nRange 1-2`
			case 261: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nMove ${info?attack.effect[1]:`?`} More Time${attack.effect[1]>0?`s`:``} Per Turn`
			case 262: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Shock\nRange 1-6`
			case 263: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\nRange 1-6`
			case 264: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Shock\n3 Tiles Wide\nRange 1-1`
			case 265: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Burn\n3 Tiles Wide\nRange 1-1`
			case 266: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Ichor\nRange 1-6\nNo Movement`
			case 267: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Ichor`
			case 268: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMove ${info?attack.effect[1]:`?`} More Time${attack.effect[1]>0?`s`:``} Per Turn\nRange 1-6`
			case 269: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Strength\nMove ${info?attack.effect[2]:`?`} More Time${attack.effect[2]>0?`s`:``} Per Turn`
			case 270: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDraw ${info?attack.effect[1]:`?`} Less\nCard${attack.effect[1]!=1||info?`s`:``} Next Turn\nRange 1-1`
			case 271: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} Energy\nRange 1-1`
			case 272: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2`
			case 273: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-2`
			case 274: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDiscard ${info?attack.effect[1]:`?`} Card${attack.effect[1]!=1||info?`s`:``} Next Turn\nRange 1-1`
			case 275: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd a Miracle to\nYour Hand Next Turn\nRange 1-2`
			case 276: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd a Smite to\nYour Hand Next Turn\nRange 1-2`
			case 277: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd a Safety to\nYour Hand Next Turn\nRange 1-2`
			case 278: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nGain ${info?attack.effect[1]:`?`} Deprecating Armor\nRange 1-1`
			case 279: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Deprecating Armor\nRange 1-6`
			case 280: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nGain ${info?attack.effect[1]:`?`} Deprecating Armor\nRange 1-6`
			case 281: return `Heal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nFor All Enemies\nThey Move ${info?attack.effect[1]:`?`} More Time${attack.effect[1]>0?`s`:``} Per Turn`
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
			case 296: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAnywhere`
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
			case 311: return `Hold ${info?attack.effect[0]:`?`} Random Orb${attack.effect[0]!=1?`s`:``}`
			case 312: return `Inflict:\n${info?attack.effect[0]:`?`} Poison, ${info?attack.effect[1]:`?`} Shock, ${info?attack.effect[2]:`?`} Freeze, \n${info?attack.effect[3]:`?`} Burn, ${info?attack.effect[4]:`?`} Weak, ${info?attack.effect[5]:`?`} Vulnerable, \n${info?attack.effect[6]:`?`} Frail, ${info?attack.effect[7]:`?`} Anti-Control, ${info?attack.effect[8]:`?`} Jinx\nRange 1-3`
			case 313: return `Evoke All Orbs\non Target or Self\nRange 1-3`
			case 314: return `Build a Shotgun`; break
            case 315: return `Build a Repulse Turret`; break
			case 316: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTransform ${info?attack.effect[1]:`?`} Card${attack.effect[1]!=1?`s`:``}\nRange 1-6`
			case 317: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nEnter Wrath\nRange 1-2`
			case 318: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 2 Turns\nEnter Sturdy`
			case 319: return `Move up to 3 Tiles,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nEnter Haste`
			case 320: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Charge\nRange 1-6\nNo Movement`
			case 321: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nGain ${info?attack.effect[3]:`?`} Charge\nRange 1-6\nNo Movement`
			case 322: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMore than or Equal to 5 Charge:\nDeals Double`; break
			case 323: return `Apply ${info?attack.effect[0]:`?`} Burn\nAnywhere`
			case 324: return `Apply ${info?attack.effect[0]:`?`} Miss\nAnywhere`
			case 325: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n50%: Deals Double\nRange 1-2`
			case 326: return `Replace ${info?attack.effect[0]:`?`} Cards\nWith${attack.effect[0]!=1?``:` a`} Strikes${attack.effect[0]!=1?`s`:``}\nReplace ${info?attack.effect[1]:`?`} Cards\nWith${attack.effect[1]!=1?``:` a`} Defend${attack.effect[1]!=1?`s`:``}`
			case 327: return `Apply ${info?attack.effect[0]:`?`} Jinx\nRange 1-6`
			case 328: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDiscard ${info?attack.effect[1]:`?`} Card${attack.effect[1]!=1?`s`:``}\nRange 1-6`
			case 329: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Loses ${info?attack.effect[1]:`?`} Energy\nRange 1-2`
			case 330: return `Apply ${info?attack.effect[0]:`?`} Shock\n3 Tiles Wide\nRange 1-1`
			case 331: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nTargets Lose ${info?attack.effect[1]:`?`} Energy\nRange 2-2`
			case 332: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-1\nIncreases by ${info?attack.effect[1]:`?`}`
			case 333: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Strength\nAnd ${info?attack.effect[1]:`?`} Dexterity`
			case 334: return `All Enemies Deal Double Damage\nFor Their Next ${info?attack.effect[0]:`?`} Attack${attack.effect[0]!=1?`s`:``}`
			case 335: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nReplace Target Items\nWith Mundane Dust\nRange 1-6`
			case 336: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRewind ${info?attack.effect[1]:`?`} Card${attack.effect[1]!=1?`s`:``}\nRange 1-6\nNo Movement`
			case 337: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDraw ${info?attack.effect[1]:`?`} Less Card${attack.effect[1]!=1?`s`:``} Next Turn\nRange 1-6\nNo Movement`
			case 339: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`} Barrier\nRange 1-3`
			case 340: return `Gain ${info?attack.effect[0]:`?`} Dexterity\nRemove ${info?attack.effect[1]:`?`} Dexterity`
			case 341: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 9 Times\nGain ${info?attack.effect[1]:`?`} Intangible\nRange 1-1`
			case 342: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turn${attack.effect[1]!=1?`s`:``}\nRange 1-2`
			case 343: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Anti-Control\nRange 1-2`
			case 344: return `Move up to 4 Tiles Backward,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nEnter Haste`
			case 345: return `Remove All Self Debuffs`
			case 346: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 2 Turns\nGain ${info?attack.effect[1]:`?`} Strength`
			case 347: return `Move up to 4 Tiles,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nEnter Haste`
			case 348: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Vulnerable\nApply ${info?attack.effect[2]:`?`} Frail\nRange 1-3`
			case 349: return `Gain ${info?attack.effect[0]:`?`} Intangible\nGain ${info?attack.effect[1]:`?`} Strength`
			case 350: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nPush 1 Tile Left\nto All Adjacent Tiles\nRange 1-1`
			case 351: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nPush 1 Tile Right\nto All Adjacent Tiles\nRange 1-1`
			case 352: return `Spawn a Random\nPlayer Character Form`
			case 353: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-6`
			case 354: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nApply ${info?attack.effect[1]:`?`} Vulnerable\nRange 1-2`
			case 355: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nApply ${info?attack.effect[1]:`?`} Vulnerable\nRange 1-1`
			case 356: return `${user.sins.length<7?`Create a Random Sin`:`Create the Next Horseman`}`
			case 357: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\n3 Tiles Wide\nRange 1-2`
			case 358: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6`
			case 359: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 3 Turns\nRemove All Self Debuffs`
			case 360: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 (10) Times\n3 Tiles Wide\nRange 1-2`
			case 361: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 (4) Times\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6`
			case 364: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`}-${info?calculateIntent(attack.effect[1],user,14):`?`}*Range Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6\nNo Movement`
			case 365: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Gain ${info?attack.effect[1]:`?`} Armor`
			case 366: return `Next ${info?attack.effect[0]:`?`} Attack${attack.effect[0]!=1?`s`:``}\nFrom Builder\nDeal Double Damage`
			
			/*
			case 1: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-1`
			case 2: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-1`
			case 3: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-1`
			case 4: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block`
			case 5: return `Shuffle in ${info?attack.effect[0]:'?'} ${info?attack.effect[1].replace(/(\r\n|\n|\r)/gm,' '):'?'}`
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
function copyCard(base){
	return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,base.level,base.color,base.id,base.cost,base.additionalSpec,base.name,base.list,base.effect,base.attack,base.target,base.spec,base.cardClass,base.limit,base.falsed,base.retain2,base.colorful,base.edition,base.base.cost,base.drawn,base.edited.cost,base.edited.costComplete,base.nonCalc)
}
function copyCardFree(base){
	return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,base.level,base.color,base.id,0,base.additionalSpec,base.name,base.list,base.effect,base.attack,base.target,base.spec,base.cardClass,base.limit,base.falsed,base.retain2,base.colorful,base.edition,base.base.cost,base.drawn,base.edited.cost,base.edited.costComplete,base.nonCalc)
}
function upgradeCard(base,nonlimiting=false){
	if(base.spec.includes(37)){
		return copyCard(base)
	}else{
		let result=new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,base.spec.includes(53)?base.level+1:min(types.card[base.type].levels.length-1,base.level+1),base.color,base.id,null,base.additionalSpec,base.name,base.list,base.spec.includes(53)?[base.effect[0]+base.effect[1],base.effect[1]]:undefined,undefined,undefined,undefined,undefined,undefined,base.falsed,base.retain2,base.colorful,base.edition,undefined,base.drawn,base.edited.cost,false,base.nonCalc)
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
		let result=new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,max(0,base.level-1),base.color,base.id,null,base.additionalSpec,base.name,base.list,base.spec.includes(53)?[base.effect[0]-base.effect[1],base.effect[1]]:undefined,undefined,undefined,undefined,undefined,undefined,base.falsed,base.retain2,base.colorful,base.edition,undefined,base.drawn,base.edited.cost,false,base.nonCalc)
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
function quadroArray(base){
	return [base,base,base,base]
}
function copyArray(base){
	/*let list=[]
	for(let a=0,la=base.length;a<la;a++){
		list.push(base[a])
	}
	return list*/
	return base.slice()
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
function copyArrayAttack(base){
	let list=[]
	for(let a=0,la=base.length;a<la;a++){
		let proxy={type:base[a].type,effect:[]}
		for(let b=0,lb=base[a].effect.length;b<lb;b++){
			proxy.effect.push(base[a].effect[b])
		}
		list.push(proxy)
	}
	return list
}
function copyFalsed(base){
	return {trigger:base.trigger,name:base.name,attack:base.attack,effect:base.effect,spec:base.spec,rarity:base.rarity,class:base.class,reality:base.reality,colorDetail:base.colorDetail,target:base.target,cost:base.cost}
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
	if(numbers.length==0){
		return []
	}
	let result=[]
	for(let a=0,la=numbers.length;a<la;a++){
		if(numbers.length==0){
			break
		}
		let minimum=numbers[0]
		for(let b=0,lb=numbers.length;b<lb;b++){
			minimum=min(minimum,numbers[b])
		}
		for(let b=0,lb=numbers.length;b<lb;b++){
			if(numbers[b]==minimum){
				result.push(numbers[b])
				numbers.splice(b,1)
				b--
				lb--
			}
		}
	}
	return result
}
function prime(value){
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
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(type,0,types.card[type].list>=0&&types.card[type].list<=game.playerNumber+5?types.card[type].list:0)
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
function outEncounter(){
	print(`
Total:${current.nodeManager.listing.encounter[0][0].length+current.nodeManager.listing.encounter[0][1].length+current.nodeManager.listing.encounter[0][2].length+current.nodeManager.listing.encounter[0][3].length+current.nodeManager.listing.encounter[1][0].length+current.nodeManager.listing.encounter[1][1].length+current.nodeManager.listing.encounter[1][2].length+current.nodeManager.listing.encounter[2][0].length+current.nodeManager.listing.encounter[2][1].length+current.nodeManager.listing.encounter[2][2].length+current.nodeManager.listing.encounter[3][1].length+current.nodeManager.listing.encounter[3][2].length}/130
\nWorld 1:
Easies:${current.nodeManager.listing.encounter[0][3].length}/9
(${current.nodeManager.listing.name[0][3].join(',')})
Enemies:${current.nodeManager.listing.encounter[0][0].length}/21
(${current.nodeManager.listing.name[0][0].join(',')})
Elites:${current.nodeManager.listing.encounter[0][1].length}/12
(${current.nodeManager.listing.name[0][1].join(',')})
Bosses:${current.nodeManager.listing.encounter[0][2].length}/6
(${current.nodeManager.listing.name[0][2].join(',')})
Total:${current.nodeManager.listing.encounter[0][0].length+current.nodeManager.listing.encounter[0][1].length+current.nodeManager.listing.encounter[0][2].length+current.nodeManager.listing.encounter[0][3].length}/48
\nWorld 2:
Enemies:${current.nodeManager.listing.encounter[1][0].length}/21
(${current.nodeManager.listing.name[1][0].join(',')})
Elites:${current.nodeManager.listing.encounter[1][1].length}/12
(${current.nodeManager.listing.name[1][1].join(',')})
Bosses:${current.nodeManager.listing.encounter[1][2].length}/6
(${current.nodeManager.listing.name[1][2].join(',')})
Total:${current.nodeManager.listing.encounter[1][0].length+current.nodeManager.listing.encounter[1][1].length+current.nodeManager.listing.encounter[1][2].length}/39
\nWorld 3:
Enemies:${current.nodeManager.listing.encounter[2][0].length}/21
(${current.nodeManager.listing.name[2][0].join(',')})
Elites:${current.nodeManager.listing.encounter[2][1].length}/12
(${current.nodeManager.listing.name[2][1].join(',')})
Bosses:${current.nodeManager.listing.encounter[2][2].length}/6
(${current.nodeManager.listing.name[2][2].join(',')})
Total:${current.nodeManager.listing.encounter[2][0].length+current.nodeManager.listing.encounter[2][1].length+current.nodeManager.listing.encounter[2][2].length}/39
\nWorld 4:
Elites:${current.nodeManager.listing.encounter[3][1].length}/3
(${current.nodeManager.listing.name[3][1].join(',')})
Bosses:${current.nodeManager.listing.encounter[3][2].length}/1
(${current.nodeManager.listing.name[3][2].join(',')})
Total:${current.nodeManager.listing.encounter[3][1].length+current.nodeManager.listing.encounter[3][2].length}/4
	`)
}
function outListing(){
	let box=``
	let goal=125+125*game.playerNumber+30+20+15+30+15+100+150
	let arbitrary=3000
	for(let a=0,la=game.playerNumber;a<la;a++){
		box+=`		${types.combatant[a+1].name}:
Common:${current.cardManagers[0].listing.card[a+1][0].length}/50				${current.cardManagers[0].listing.card[a+1][0].length-50}
Uncommon:${current.cardManagers[0].listing.card[a+1][1].length}/55				${current.cardManagers[0].listing.card[a+1][1].length-55}
Rare:${current.cardManagers[0].listing.card[a+1][2].length}/20					${current.cardManagers[0].listing.card[a+1][2].length-20}
	Total:${current.cardManagers[0].listing.card[a+1][3].length}/125\n`
	}
	print(`Total Cards: ${types.card.length}/${arbitrary}		${types.card.length-arbitrary}
Listed Cards: ${current.cardManagers[0].listing.allListableCard[3].length+current.cardManagers[0].listing.sub.length+current.cardManagers[0].listing.junk[game.playerNumber+1].length}/${goal}		${current.cardManagers[0].listing.allListableCard[3].length+current.cardManagers[0].listing.junk[game.playerNumber+1].length-goal}
		Colorless:
Common:${current.cardManagers[0].listing.card[0][0].length}/50				${current.cardManagers[0].listing.card[0][0].length-50}
Uncommon:${current.cardManagers[0].listing.card[0][1].length}/55				${current.cardManagers[0].listing.card[0][1].length-55}
Rare:${current.cardManagers[0].listing.card[0][2].length}/20					${current.cardManagers[0].listing.card[0][2].length-20}
	Total:${current.cardManagers[0].listing.card[0][3].length}/125
${box}		Status:
	Total:${current.cardManagers[0].listing.card[game.playerNumber+1][3].length}/30				${current.cardManagers[0].listing.card[game.playerNumber+1][3].length-30}
		Curse:
	Total:${current.cardManagers[0].listing.card[game.playerNumber+2][3].length}/20				${current.cardManagers[0].listing.card[game.playerNumber+2][3].length-20}
		Partnership:
Common:${current.cardManagers[0].listing.card[game.playerNumber+3][0].length}/5					${current.cardManagers[0].listing.card[game.playerNumber+3][0].length-5}
Uncommon:${current.cardManagers[0].listing.card[game.playerNumber+3][1].length}/10				${current.cardManagers[0].listing.card[game.playerNumber+3][1].length-10}
	Total:${current.cardManagers[0].listing.card[game.playerNumber+3][3].length}/15
		Tarot:
	Total:${current.cardManagers[0].listing.card[game.playerNumber+4][3].length}/30				${current.cardManagers[0].listing.card[game.playerNumber+4][3].length-30}
		Spectral:
	Total:${current.cardManagers[0].listing.card[game.playerNumber+5][3].length}/15				${current.cardManagers[0].listing.card[game.playerNumber+5][3].length-15}
		Subcard:
	Total:${current.cardManagers[0].listing.sub.length}/100				${current.cardManagers[0].listing.sub.length-100}
		Disband:
	Total:${current.cardManagers[0].listing.disband.length}/200				${current.cardManagers[0].listing.disband.length-200}
		Junkyard:
	Total:${current.cardManagers[0].listing.junk[game.playerNumber+1].length}/150				${current.cardManagers[0].listing.junk[game.playerNumber+1].length-150}
			`)
}
function outDupes(){
	for(let a=0,la=types.card.length;a<la;a++){
		for(let b=0,lb=types.card.length;b<lb;b++){
			if(types.card[a].name==types.card[b].name&&types.card[a].name.length>0&&a!=b){
				print(types.card[a].name)
			}
		}
	}
}
function outRepeats(){
	for(let a=0,la=types.card.length;a<la;a++){
		for(let b=0,lb=types.card.length;b<lb;b++){
			if(types.card[a].name==types.card[b].name.substr(0,types.card[a].name.length)&&types.card[a].name.length>0&&a!=b){
				print(types.card[a].name)
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
	print(list.length)
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
	print(list.length)
}
function outRelic(){
	print(`Common: ${current.relicManager.listing.relic[0].length}
	Uncommon: ${current.relicManager.listing.relic[1].length}
	Rare: ${current.relicManager.listing.relic[2].length}
	Shop: ${current.relicManager.listing.relic[3].length}
	Boss: ${current.relicManager.listing.relic[4].length}
	`)
}
function outClass(){
	let totals=[]
	let build=``
	for(let a=0,la=game.playerNumber+1;a<la;a++){
		totals.push([0,0,0,0,0,0,0,0,0,0,0,0])
	}
	for(let a=0,la=types.card.length;a<la;a++){
		if(types.card[a].list>=0&&types.card[a].list<=game.playerNumber&&types.card[a].rarity>=0&&types.card[a].levels[0].class>=1&&types.card[a].levels[0].class<=11){
			totals[types.card[a].list][types.card[a].levels[0].class-1]++
		}
	}
	for(let a=0,la=game.playerNumber+1;a<la;a++){
		build+=(a==0?`Colorless:`:`${types.combatant[a].name}:`)+`\nAttacks: ${totals[a][0]}\nDefenses: ${totals[a][1]}\nSkills: ${totals[a][10]}\nMovements: ${totals[a][2]}\nPowers: ${totals[a][3]}\n\n`
	}
	print(build)
}
function outCost(){
	let averages=[]
	let totals=[]
	let build=``
	for(let a=0,la=game.playerNumber+1;a<la;a++){
		averages.push([0,0])
		totals.push([])
	}
	for(let a=0,la=types.card.length;a<la;a++){
		if(
			types.card[a].list>=0&&types.card[a].list<=game.playerNumber&&types.card[a].rarity>=0&&
			!types.card[a].levels[0].spec.includes(5)&&
			!types.card[a].levels[0].spec.includes(11)&&
			!types.card[a].levels[0].spec.includes(21)&&
			!types.card[a].levels[0].spec.includes(35)&&
			!types.card[a].levels[0].spec.includes(41)
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
	for(let a=0,la=game.playerNumber+1;a<la;a++){
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
	print(build)
}
function colorTest(){
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards=[]
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(findName('Charm\nQuark',types.card),0,0)
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards[current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.cards.length-1].colorful=true
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.compact=0.6
	for(let a=0,la=game.playerNumber+6;a<la;a++){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(1,0,a,0)
	}
}
function attackTest(type,target,startpoint){
	switch(type){
		case 0:
			current.combatantManager.combatants[target].setMaxHP(999999)
			for(let a=startpoint,la=types.card.length;a<la;a++){
				for(let b=0,lb=types.card[a].levels.length;b<lb;b++){
					if(types.card[a].levels[b].target[0]==2){
						current.attackManager.type=types.card[a].levels[b].attack
						current.attackManager.player=0
						current.attackManager.effect=types.card[a].levels[b].effect
						current.attackManager.attackClass=types.card[a].levels[b].class
						current.attackManager.user=0
						current.attackManager.level=b
						current.attackManager.color=types.card[a].list<0?0:types.card[a].list>=types.color.card.length?0:types.card[a].list
						current.attackManager.energy=3
						current.attackManager.target[0]=target
						current.attackManager.targetDistance=1
						current.attackManager.targetClass=2
						current.attackManager.combo=0
						current.attackManager.amplify=true
						current.attackManager.relPos=[0,0]
						current.attackManager.limit=types.card[a].levels[b].limit
						current.attackManager.id=-1
						current.attackManager.edition=0
						current.attackManager.drawn=0
						current.attackManager.cost=types.card[a].levels[b].cost
						current.attackManager.execute()
					}
				}
			}
		break
		case 1:
			current.combatantManager.combatants[target[1]].setMaxHP(999999)
			for(let a=startpoint,la=types.card.length;a<la;a++){
				for(let b=0,lb=types.card[a].levels.length;b<lb;b++){
					if(types.card[a].levels[b].target[0]==1){
						current.attackManager.type=types.card[a].levels[b].attack
						current.attackManager.player=0
						current.attackManager.effect=types.card[a].levels[b].effect
						current.attackManager.attackClass=types.card[a].levels[b].class
						current.attackManager.user=0
						current.attackManager.level=b
						current.attackManager.color=types.card[a].list<0?0:types.card[a].list>=types.color.card.length?0:types.card[a].list
						current.attackManager.energy=3
						current.attackManager.target[0]=target[0]
						current.attackManager.targetDistance=1
						current.attackManager.targetClass=2
						current.attackManager.combo=0
						current.attackManager.amplify=true
						current.attackManager.relPos=[0,0]
						current.attackManager.limit=types.card[a].levels[b].limit
						current.attackManager.id=-1
						current.attackManager.edition=0
						current.attackManager.drawn=0
						current.attackManager.cost=types.card[a].levels[b].cost
						current.attackManager.execute()
					}
				}
			}
		break
	}
}
function cursed(){
	for(let a=0,la=current.combatantManager.combatants.length;a<la;a++){
		current.combatantManager.combatants[a].goal.anim.direction=0
	}
}
function mtgPlayerColor(player){
	/*
	0-colorless
	1-green
	2-blue
	3-black
	4-white
	5-red
	*/
	switch(player){
		case 1: return [1]
		case 2: return [4]
		case 3: return [3,5]
		case 4: return [5]
		case 5: return [2,1]
		case 6: return [3,1]
		case 7: return [5,1]
		case 8: return [4,5]
		case 9: return [4,1]
		case 10: return [2]
		case 11: return [2,3]
		case 12: return [3]
		case 13: return [4,3]
		case 14: return [2,5]
		case 15: return [4,2]
		case 16: return [4,2,1]
		case 17: return [3,5,1]
		default: return [0]
	}
}
function mtgCardColor(color){
	if(color>=1&&color<=16){
		return mtgPlayerColor(color)
	}else{
		return [color]
	}
}
function mtgManaBase(energy,player){
	let playerColor=mtgPlayerColor(player)
	if(playerColor.length==2&&floor(random(0,2))==0){
		playerColor=[playerColor[1],playerColor[0]]
	}else if(playerColor.length==3){
		let left=copyArray(playerColor)
		playerColor=[]
		for(let a=0,la=left.length;a<la;a++){
			let index=floor(random(0,left.length))
			playerColor.push(left[index])
			left.splice(index,1)
		}		
	}
	if(playerColor.length==1){
		let remaining=[1,2,3,4,5]
		for(let a=0,la=playerColor.length;a<la;a++){
			remaining.splice(remaining.indexOf(playerColor[a]),1)
		}
		for(let a=0,la=remaining.length;a<la;a++){
			playerColor.push(remaining[floor(random(0,remaining.length))])
		}
	}
	if(playerColor.length==3){
		switch(energy){
			case 0: return []
			case 1: return [playerColor[0]]
			case 2: return [playerColor[0],playerColor[1]]
			case 3: return [playerColor[0],playerColor[1],playerColor[2]]
			case 4: return [playerColor[0],playerColor[0],playerColor[1],playerColor[2]]
			case 5: return [playerColor[0],playerColor[0],playerColor[1],playerColor[1],playerColor[2]]
		}
	}else if(playerColor.length==2){
		switch(energy){
			case 0: return []
			case 1: return [playerColor[0]]
			case 2: return [playerColor[0],playerColor[1]]
			case 3: return [playerColor[0],playerColor[0],playerColor[1]]
			case 4: return [playerColor[0],playerColor[0],playerColor[1],playerColor[1]]
			case 5: return [playerColor[0],playerColor[0],playerColor[0],playerColor[1],playerColor[1]]
		}
	}else{
		switch(energy){
			case 0: return []
			case 1: return [playerColor[0]]
			case 2: return [playerColor[0],-1]
			case 3: return [playerColor[0],playerColor[0],-1]
			case 4: return [playerColor[0],playerColor[0],playerColor[1],-1]
			case 5: return [playerColor[0],playerColor[0],playerColor[1],playerColor[1],-1]
		}
	}
}
function total7(list){
	return list[0]+list[1]+list[2]+list[3]+list[4]+list[5]+list[6]
}