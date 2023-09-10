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
			transition.trigger = false
			stage.scene=transition.scene
			if(transition.convert){
				transition.convert=false
				current.convert(stage.scene)
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
function regStar(layer,x,y,sides,radiusX,radiusY,radius2X,radius2Y,direction){
	layer.beginShape()
	for(k=0;k<sides*2;k++){
		layer.vertex(x+sin(direction+k*180/sides)*(k%2==0?radiusX:radius2X),y+cos(direction+k*180/sides)*(k%2==0?radiusY:radius2Y))
	}
	layer.endShape(CLOSE)
}
function diamond(layer,x,y,width,height,direction){
	layer.quad(x-width*cos(direction),y-width*sin(direction),x-height*sin(direction),y-height*cos(direction),x+width*cos(direction),y+width*sin(direction),x+height*sin(direction),y+height*cos(direction))
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
function upColor(color,value,key){
	return [color[0]+value*key[0],color[1]+value*key[1],color[2]+value*key[2]]
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
		case 0: case 2: case 5: case 7: case 8: case 10: case 11: case 12:
			let damage=effect
			let bonus=0
			let totalStr=0
			if(variant&&args[0]&&relicManager.hasRelic(50,player)){
				bonus+=2
			}
			if(variant&&args[1]&&user.status.main[76]>0){
				bonus+=user.status.main[76]
			}
			if(user.status.main[12]>0){
				bonus+=user.status.main[12]
			}
			if(user.status.main[40]>0){
				bonus+=user.status.main[40]
			}
			if(user.status.main[75]>0){
				bonus-=user.status.main[75]
			}
			if(user.status.main[6]!=0){
				totalStr+=user.status.main[6]
			}
			if(user.status.main[17]!=0){
				totalStr+=user.status.main[17]
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
				damage*=0.75
				bonus*=0.75
			}
			if(user.status.main[82]>0){
				damage*=2
				bonus*=2
			}
			damage=round(damage*10)/10
			bonus=round(bonus*10)/10
			switch(type){
				case 0: return damage==effect&&bonus==0?effect:effect+`(${damage+bonus})`
				case 2: return (damage==effect?effect+'X':effect+`(${damage})X`)+(bonus>0?`(+${bonus})`:``)
				case 5: return (damage==effect?effect+'XX':effect+`(${damage})XX`)+(bonus>0?`(+${bonus})`:``)
				case 7: return effect==1?(damage==effect?'1*Combo':`1(${damage})*Combo`):(damage==effect?effect+'*Combo':effect+`(${damage})*Combo`)
				case 8: return effect==1?(damage==effect&&bonus==0?effect+'1*Combo':effect+`1(${damage})*Combo`)+(bonus>0?`(+${bonus})`:``):(damage==effect&&bonus==0?effect+'*Combo':effect+`(${damage})*Combo`)+(bonus>0?`(+${bonus})`:``)
				case 10: return damage==effect?effect:effect+`(${damage})`
				case 11: return (damage==effect?effect+'X':effect+`(${damage})X`)
				case 12: return effect==1?(damage==effect?'1*Faith':`1(${damage})*Faith`):(damage==effect?effect+'*Faith':effect+`(${damage})*Faith`)

			}
		case 1: case 3: case 6:
			let block=effect
			let totalDex=0
			if(user.status.main[7]!=0){
				totalDex+=user.status.main[7]
			}
			if(user.status.main[18]!=0){
				totalDex+=user.status.main[18]
			}
			if(totalDex>0){
				block*=1+totalDex*0.2
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
			block=round(block*10)/10
			switch(type){
				case 1: return block==effect?effect:effect+` (${block})`
				case 3: return block==effect?effect+'X':effect+`(${block})X`
				case 6: return block==effect?effect+'*Combo':effect+`(${block})*Combo`

			}
		case 4: case 9:
			let health=effect
			if(relicManager.hasRelic(53,player)){
				health*=1.5
			}
			switch(type){
				case 4: return health==effect?effect:effect+` (${health})`
				case 9: return health==effect?effect+`X`:effect+` (${health})X`
			}
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
			case 12: case 80: case 115: case 161: case 165:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6\nNo Movement`
			case 13: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-1`
			case 14: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 15: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-2`
			case 16: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nRange 1-1`
			case 17: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nTargets Cannot Move\nFor ${info?attack.effect[0]:`?`} Turn${attack.effect[0]!=1?`s`:` `}\nRange 1-1`
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
			case 30: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nAdd ${info?calculateIntent(attack.effect[1],user,1):`?`}\nRange 1-2`
			case 31: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-1`
			case 32: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
			case 33: return `Apply ${info?attack.effect[0]:`?`} Weak\nRange 1-2`
			case 34: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nGain 1 Combo Per Hit\nRange 1-1`
			case 35: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nGain 1 Combo\nRange 1-1`
			case 36: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain 1 Combo Per Hit\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-1`
			case 37: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage+${info?calculateIntent(attack.effect[1],user,0):`?`}*Combo\nGain 1 Combo Per Hit\nRange 1-1`
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
			case 50: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turns\nRange 1-6\nNo Movement`
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
			case 84: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\n3 Tiles Wide\nRange 1-2`
			case 85: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n5 Tiles Wide\nRange 2-2`
			case 86: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\n5 Tiles Wide\nRange 2-2`
			case 87: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nto All Adjacent Tiles\nRange 1-1`
			case 88: return `You Cannot Move\nFor ${info?attack.effect[0]:`?`} Turn${attack.effect[0]!=1?`s`:` `}`
			case 89: case 145:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6\nNo Movement`
			case 90: case 235:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-6\nNo Movement`
			case 91: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6\nNo Movement`
			case 92: return `Draw ${info?attack.effect[0]:`?`} Less\nCard${attack.effect[0]!=1||info?`s`:``} Next Turn`
			case 93: return `Lose ${info?attack.effect[0]:`?`} Energy`
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
			case 108: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nCounter ${info?calculateIntent(attack.effect[0],user,0):`?`}`
			case 109: return `Heal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health`
			case 110: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block\nRetain Block\nFor 1 Turn\nCounter ${info?calculateIntent(attack.effect[0],user,0):`?`}`
			case 111: return `Gain ${info?attack.effect[0]:`?`} Metallicize`
			case 112: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nGain ${info?attack.effect[1]:`?`} Strength\nRange 1-2`
			case 113: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHeal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nRange 1-1`
			case 114: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`}\n3 Tiles Wide\nRange 1-1`
			case 116: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMove 1 Tile Away\nRange 1-1`
			case 117: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap`
			case 118: case 236:
				return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-6\nNo Movement`
			case 119: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDraw ${info?attack.effect[0]:`?`} Less\nCard${attack.effect[0]!=1||info?`s`:``} Next Turn\nRange 1-6\nNo Movement`
			case 120: return `Apply ${info?attack.effect[0]:`?`} Distracted\nto All Adjacent Tiles\nRange 1-1`
			case 121: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Right\nRange 1-1`
			case 122: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Left\nRange 1-1`
			case 123: return `Apply ${info?attack.effect[0]:`?`} Bleed\nRange 1-6\nNo Movement`
			case 124: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nDrain ${info?attack.effect[1]:`?`} Energy\n3 Tiles Wide\nRange 1-1`
			case 125: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSwap With Target\nRange 1-6`
			case 126: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Retain Block\nFor 2 Turns`
			case 127: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Splash Damage\nRange 2-2`
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
			case 140: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Move\nFor ${info?attack.effect[1]:`?`} Turn${attack.effect[1]!=1?`s`:` `}\nRange 1-6\nNo Movement`
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
			case 158: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nMove ${info?attack.effect[1]:`?`} Card${attack.effect[1]!=1?`s`:` `} From\nDraw to Discard\nRange 1-6\nNo Movement`
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
			case 193: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turns\nRange 1-6`
			case 194: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6`
			case 195: return `Move to End of Board,\nDeal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Targets and Swap\nUsable in 3 Directions`
			case 196: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-6`
			case 197: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Armor`
			case 198: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nDrain ${info?attack.effect[1]:`?`} Energy\nRange 1-1`
			case 199: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTransform ${info?attack.effect[1]:`?`} Cards\nRange 1-6`
			case 200: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nHeal ${info?calculateIntent(attack.effect[0],user,4):`?`} Health\nRange 1-6`
			case 201: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSet Values of ${info?attack.effect[1]:`?`} Cards to 1\nRange 1-6`
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
			case 213: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile Around\nto All Adjacent Tiles\nRange 1-1`
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

			default: return `INVALID`
		}
	}catch(error){
		return `error-${attack.type}-${attack.effect}`
	}
}
function vectorAtan(point1,point2){
	return atan2(point2.x-point1.x,point2.y-point1.y)
}
function findList(entry,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a]==entry){
			return a
		}
	}
}
function findName(name,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].name==name){
			return a
		}
	}
}
function findInternal(internal,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].internal==internal){
			return a
		}
	}
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
	return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,base.level,base.color,base.id,base.base.cost,base.additionalSpec,base.name,base.list,base.effect,base.attack,base.target,base.spec,base.cardClass)
}
function copyCardFree(base){
	return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,base.level,base.color,base.id,0,base.additionalSpec,base.name,base.list,base.effect,base.attack,base.target,base.spec,base.cardClass)
}
function upgradeCard(base){
	return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,min(types.card[base.type].levels.length-1,base.level+1),base.color,base.id,null,base.additionalSpec)
}
function unupgradeCard(base){
	return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,max(0,base.level-1),base.color,base.id,base.base.cost,base.additionalSpec)
}
function copyArray(base){
	let list=[]
	for(let a=0,la=base.length;a<la;a++){
		list.push(base[a])
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
	if(findName(name,types.card)>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(findName(name,types.card),0,0)
		return 'Added'
	}else{
		return 'Invalid'
	}
}
function quickAddL(name,level){
	if(findName(name,types.card)>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(findName(name,types.card),level,0)
		return 'Added'
	}else{
		return 'Invalid'
	}
}
function quickAddR(name){
	if(findName(name,types.card)>=0){
		current.cardManagers[constrain(current.turn.main,0,current.players-1)].reserve.add(findName(name,types.card),0,0)
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
function fight(name){
	current.setupBattle(types.encounter[findName(name,types.encounter)])
}
function status(name){
	return findList(name,current.combatantManager.combatants[0].status.name)
}
function outEncounter(){
	print(`
Total:${current.nodeManager.listing.encounter[0][0].length+current.nodeManager.listing.encounter[0][1].length+current.nodeManager.listing.encounter[0][2].length+current.nodeManager.listing.encounter[0][3].length+current.nodeManager.listing.encounter[1][0].length+current.nodeManager.listing.encounter[1][1].length+current.nodeManager.listing.encounter[1][2].length+current.nodeManager.listing.encounter[2][0].length+current.nodeManager.listing.encounter[2][1].length+current.nodeManager.listing.encounter[2][2].length+current.nodeManager.listing.encounter[3][1].length+current.nodeManager.listing.encounter[3][2].length}/108
\nWorld 1:
Easies:${current.nodeManager.listing.encounter[0][3].length}/6
(${current.nodeManager.listing.name[0][3].join(',')})
Enemies:${current.nodeManager.listing.encounter[0][0].length}/18
(${current.nodeManager.listing.name[0][0].join(',')})
Elites:${current.nodeManager.listing.encounter[0][1].length}/9
(${current.nodeManager.listing.name[0][1].join(',')})
Bosses:${current.nodeManager.listing.encounter[0][2].length}/6
(${current.nodeManager.listing.name[0][2].join(',')})
Total:${current.nodeManager.listing.encounter[0][0].length+current.nodeManager.listing.encounter[0][1].length+current.nodeManager.listing.encounter[0][2].length+current.nodeManager.listing.encounter[0][3].length}/39
\nWorld 2:
Enemies:${current.nodeManager.listing.encounter[1][0].length}/18
(${current.nodeManager.listing.name[1][0].join(',')})
Elites:${current.nodeManager.listing.encounter[1][1].length}/9
(${current.nodeManager.listing.name[1][1].join(',')})
Bosses:${current.nodeManager.listing.encounter[1][2].length}/6
(${current.nodeManager.listing.name[1][2].join(',')})
Total:${current.nodeManager.listing.encounter[1][0].length+current.nodeManager.listing.encounter[1][1].length+current.nodeManager.listing.encounter[1][2].length}/33
\nWorld 3:
Enemies:${current.nodeManager.listing.encounter[2][0].length}/18
(${current.nodeManager.listing.name[2][0].join(',')})
Elites:${current.nodeManager.listing.encounter[2][1].length}/9
(${current.nodeManager.listing.name[2][1].join(',')})
Bosses:${current.nodeManager.listing.encounter[2][2].length}/6
(${current.nodeManager.listing.name[2][2].join(',')})
Total:${current.nodeManager.listing.encounter[2][0].length+current.nodeManager.listing.encounter[2][1].length+current.nodeManager.listing.encounter[2][2].length}/33
\nWorld 4:
Elites:${current.nodeManager.listing.encounter[3][1].length}/2
(${current.nodeManager.listing.name[3][1].join(',')})
Bosses:${current.nodeManager.listing.encounter[3][2].length}/1
(${current.nodeManager.listing.name[3][2].join(',')})
Total:${current.nodeManager.listing.encounter[3][1].length+current.nodeManager.listing.encounter[3][2].length}/3
	`)
}
function outListing(){
	let box=``
	for(let a=0,la=game.playerNumber;a<la;a++){
		box+=`		${types.combatant[a+1].name}:
Common:${current.cardManagers[0].listing.card[a+1][0].length}
Uncommon:${current.cardManagers[0].listing.card[a+1][1].length}
Rare:${current.cardManagers[0].listing.card[a+1][2].length}
	Total:${current.cardManagers[0].listing.card[a+1][3].length}\n`
	}
	print(`		Colorless:
Common:${current.cardManagers[0].listing.card[0][0].length}
Uncommon:${current.cardManagers[0].listing.card[0][1].length}
Rare:${current.cardManagers[0].listing.card[0][2].length}
	Total:${current.cardManagers[0].listing.card[0][3].length}
${box}		Status:
Common:${current.cardManagers[0].listing.card[game.playerNumber+1][0].length}
Uncommon:${current.cardManagers[0].listing.card[game.playerNumber+1][1].length}
Rare:${current.cardManagers[0].listing.card[game.playerNumber+1][2].length}
	Total:${current.cardManagers[0].listing.card[game.playerNumber+1][3].length}
		Curse:
Common:${current.cardManagers[0].listing.card[game.playerNumber+2][0].length}
Uncommon:${current.cardManagers[0].listing.card[game.playerNumber+2][1].length}
Rare:${current.cardManagers[0].listing.card[game.playerNumber+2][2].length}
	Total:${current.cardManagers[0].listing.card[game.playerNumber+2][3].length}
		Partnership:
Common:${current.cardManagers[0].listing.card[game.playerNumber+3][0].length}
Uncommon:${current.cardManagers[0].listing.card[game.playerNumber+3][1].length}
Rare:${current.cardManagers[0].listing.card[game.playerNumber+3][2].length}
	Total:${current.cardManagers[0].listing.card[game.playerNumber+3][3].length}
			`)
}
function shut(){
	print('s')
}
function panic(text){
	print(`
!!!!!!!!!!-
${text}
!!!!!!!!!!-`)
}
function cursed(){
	for(let a=0,la=current.combatantManager.combatants.length;a<la;a++){
		current.combatantManager.combatants[a].goal.anim.direction=0
	}
}