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
function pointInsideBox(point,box){
	if(point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2){
		return true
	}
	else{
		return false
	}
}
function vectorAtan(point1,point2){
	return atan2(point2.x-point1.x,point2.y-point1.y)
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
	return new card(base.layer,base.position.x,base.position.y,base.type,base.level,base.color,base.id)
}
function updateMouse(layer){
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
	inputs.rel.x=(inputs.mouse.x-width/2)/stage.scale+layer.width/2
	inputs.rel.y=(inputs.mouse.y-height/2)/stage.scale+layer.height/2
}