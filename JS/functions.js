function isInt(value) {
	return !isNaN(value) && 
		   parseInt(Number(value)) == value && 
		   !isNaN(parseInt(value, 10));
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
		transition.anim=round(transition.anim*10+1)/10
		if(transition.anim>1.1){
			transition.trigger = false
			stage.scene=transition.scene
		}
	}
	else if(transition.anim>0){
		transition.anim=round(transition.anim*10-1)/10
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
				layer.endShape()
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
function calculateEffect(effect,user,type,player,relicManager,variant,args){
	switch(type){
		case 0: case 2: case 5:
			let damage=effect
			let bonus=0
			let totalStr=0
			if(variant&&args[0]&&relicManager.hasRelic(50,player)){
				bonus+=2
			}
			if(user.status.main[12]>0){
				bonus+=user.status.main[12]
			}
			if(user.status.main[40]>0){
				bonus+=user.status.main[40]
			}
			if(user.status.main[6]!=0){
				totalStr+=user.status.main[6]
			}
			if(user.status.main[17]!=0){
				totalStr+=user.status.main[17]
			}
			if(totalStr>0){
				damage*=1+totalStr*0.2
				bonus*=1+totalStr*0.2
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
			damage=round(damage*10)/10
			if(type==0){
				return damage==effect&&bonus==0?effect:effect+`(${damage+bonus})`
			}else if(type==2){
				return (damage==effect&&bonus==0?effect+'X':effect+`(${damage})X`)+(bonus>0?`(+${bonus})`:``)
			}else if(type==5){
				return (damage==effect&&bonus==0?effect+'XX':effect+`(${damage})XX`)+(bonus>0?`(+${bonus})`:``)
			}
		case 1: case 3:
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
			block=round(block*10)/10
			if(type==1){
				return block==effect?effect:effect+` (${block})`
			}else if(type==3){
				return block==effect?effect+'X':effect+`X (+${block})`
			}
		case 4:
			let health=effect
			if(relicManager.hasRelic(53,player)){
				health*=1.5
			}
			return health==effect?effect:effect+` (${health})`
	}
}
function calculateIntent(effect,user,type){
	return calculateEffect(effect,user,type,-1,new disabledRelicManager(),false,[])
}
function intentDescription(attack,user,info){
	switch(attack.type){
		case 1: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-1`
		case 2: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-1`
		case 3: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-1`
		case 4: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block`
		case 5: return `Shuffle in ${info?attack.effect[0]:`?`} Dazed`
		case 6: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-2`
		case 7: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nPush 1 Tile\nRange 1-2`
		case 8: return `Shuffle in ${info?attack.effect[0]:`?`} Burn\nRange 1-2`
		case 9: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-1`
		case 10: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies`
		case 11: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 5 Times\nRange 1-1`
		case 12: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6\nNo Movement`
		case 13: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-1`
		case 14: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
		case 15: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Weak\nRange 1-2`
		case 16: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nRange 1-1`
		case 17: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nto All Adjacent Tiles\nRange 1-1`
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
		case 37: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage + ${info?calculateIntent(attack.effect[1],user,0):`?`} Per Combo\nGain 1 Combo Per Hit\nRange 1-1`
		case 38: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nRange 1-6`
		case 39: return `Spawn ${info?attack.effect[0]:`?`} ${info?attack.effect[1]+(attack.effect[0]>0?`s`:``):`?`}`
		case 40: return `Create ${info?attack.effect[0]:`?`} Landmines`;
		case 41: return `Create ${info?attack.effect[0]:`?`} Spikes`;
		case 42: return `Create ${info?attack.effect[0]:`?`} Trenches`;
		case 43: return `Create Target Zone\nfor ${info?attack.effect[0]:`?`} Damage`
		case 44: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nApply ${info?attack.effect[1]:`?`} Bleed\n3 Tiles Wide\nRange 1-2`
		case 45: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 3 Times\nRange 1-6`
		case 46: return `Create Target Line\nfor ${info?attack.effect[0]:`?`} Damage`
		case 47: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-6\nNo Movement`
		case 48: return `Add ${info?attack.effect[0]:`?`} Block\nRetain Block\nFor 1 Turn`
		case 49: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nRange 1-6\nNo Movement`
		case 50: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nTarget Cannot Gain\nBlock for ${info?attack.effect[1]:``} Turns\nRange 1-6\nNo Movement`
		case 51: return `Create ${info?attack.effect[0]:`?`} Traps`;
		case 52: return `Create ${info?attack.effect[0]*2:`?`} Slime Tiles`;
		case 53: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\n3 Tiles Wide\nRange 1-2`
		case 54: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nto All Adjacent Tiles\nRange 1-1`
		case 55: return `Apply ${info?attack.effect[0]:`?`} Weak\nto All Adjacent Tiles\nRange 1-2`
		case 56: return `Create ${info?attack.effect[0]:`?`} Shield Particles`
		case 57: return `Gain Block Equal\nto Health of\nShield Particles`
		case 58: return `Apply ${info?attack.effect[0]:`?`} Bleed`
		case 59: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nRange 1-6`
		case 60: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nIf Unblocked,\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\n3 Tiles Wide\nRange 1-1`
		case 61: return `Apply ${info?attack.effect[0]:`?`} Frail\nRange 1-2`
		case 62: return `Apply ${info?attack.effect[0]:`?`} Vulnerable\nRange 1-2`
		case 63: return `All Enemies\nGain ${info?attack.effect[0]:`?`} Dexterity`
		case 64: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\n3 Tiles Wide\nIgnore Block\nRange 1-1`
		case 65: return `Add ${info?calculateIntent(attack.effect[0],user,1):`?`} Block to All Enemies\nAll Enemies Retain Block\nFor 1 Turn`
		case 66: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage 2 Times\nShuffle in ${info?attack.effect[1]:'?'} ${info?attack.effect[2].replace(/(\r\n|\n|\r)/gm,' '):'?'}\nRange 1-2`
		case 67: return `Deal ${info?calculateIntent(attack.effect[0],user,0):`?`} Damage\nSteal ${info?attack.effect[0]:`?`} Currency\nRange 1-2`
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
		
		default: return `INVALID`
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
	let string=''
	for(let a=0;a<multiply;a++){
		string+=base
	}
	return string
}
function copyCard(base){
	return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,base.type,base.level,base.color,base.id,base.base.cost,base.additionalSpec,base.name,base.list,base.effect,base.attack,base.target,base.spec,base.cardClass)
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
function legalTarget(type,lengthStart,lengthEnd,x,y){
	switch(type){
		case 0:
			if((x==y&&abs(x)>=lengthStart&&abs(x)<=lengthEnd||y==0&&abs(x)>=lengthStart&&abs(x)<=lengthEnd||x==0&&abs(y)>=lengthStart&&abs(y)<=lengthEnd)&&(x!=0||y!=0)){
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
function legalTargetCombatant(type,lengthStart,lengthEnd,combatant1,combatant2,tiles){
	switch(type){
		case 0:
			if(legalTarget(0,lengthStart,lengthEnd,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)){
				let length=distTarget(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)-1
				for(a=0,la=tiles.length;a<la;a++){
					if(tiles[a].occupied>0&&legalTarget(0,0,length,tiles[a].tilePosition.x-combatant2.tilePosition.x,tiles[a].tilePosition.y-combatant2.tilePosition.y)&&targetDirection(0,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)==targetDirection(0,tiles[a].tilePosition.x-combatant2.tilePosition.x,tiles[a].tilePosition.y-combatant2.tilePosition.y)){
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
function distTargetCombatant(type,combatant1,combatant2){
	return distTarget(type,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)
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
	current.cardManagers[constrain(current.turn.main,0,current.players-1)].hand.add(findName(name,types.card),0,0)
}
function kill(index){
	current.combatantManager.combatants[index].life=0
}
function enemy(index){
	return current.combatantManager.combatants[index+current.players]
}