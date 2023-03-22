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
function mergeColor(color1,color2,value){
	return [color1[0]*(1-value)+color2[0]*value,color1[1]*(1-value)+color2[1]*value,color1[2]*(1-value)+color2[2]*value]
}
function upColor(color,value,key){
	return [color[0]+value*key[0],color[1]+value*key[1],color[2]+value*key[2]]
}
function sign(value){
	if(value<0){
		return -1
	}else{
		return 1
	}
}
function pointInsideBox(point,box){
	if(point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2){
		return true
	}
	else{
		return false
	}
}
function intentDescription(attack){
	switch(attack.type){
		case 1: return 'Deal '+attack.effect[0]+' Damage\nRange 1-1'
		case 2: return 'Deal '+attack.effect[0]+' Damage 3 Times\nRange 1-1'
		case 3: return 'Deal '+attack.effect[0]+' Damage\nPush 1 Tile\nRange 1-1'
		case 4: return 'Add '+attack.effect[0]+' Block'
		case 5: return 'Shuffle in '+attack.effect[0]+' Dazed'
		case 6: return 'Deal '+attack.effect[0]+' Damage\nRange 1-2'
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
function multiplyString(base,multiply){
	let string=''
	for(let a=0;a<multiply;a++){
		string+=base
	}
	return string
}
function copyCard(base){
	return new card(base.layer,base.battle,base.position.x,base.position.y,base.type,base.level,base.color,base.id)
}
function upgradeCard(base){
	return new card(base.layer,base.battle,base.position.x,base.position.y,base.type,min(types.card[base.type].levels.length-1,base.level+1),base.color,base.id)
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
				return 2
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
	}
	return false
}
function distTargetCombatant(type,combatant1,combatant2){
	return distTarget(type,combatant1.tilePosition.x-combatant2.tilePosition.x,combatant1.tilePosition.y-combatant2.tilePosition.y)
}
function transformDirection(type,direction){
	switch(type){
		case 0:
			let actualDirection=(direction%360+180)%360-180
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
	}else if(!trigger&&anim>minPoint){
		return max(round(anim*speed-1)/speed,minPoint)
	}
	return anim
}
function quickAdd(name){
	current.cardManager.hand.add(findName(name,types.card),0,0)
}
function updateMouse(layer){
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
	inputs.rel.x=(inputs.mouse.x-width/2)/stage.scale+layer.width/2
	inputs.rel.y=(inputs.mouse.y-height/2)/stage.scale+layer.height/2
}