//mark gradient
p5.Gradient=class{
	constructor(){}
	setAngle(angle){
		if(_angleMode=="degrees"){
			this.angle=radians(angle)
		}else{
			this.angle=angle
		}
	}
	colors(){
		let stops
		if(Array.isArray(arguments[0])){
			stops=arguments[0]
		}else{
			stops=arguments
		}
		for(let a=0,la=stops.length;a<la;a+=2){
			const pos=stops[a]
			const col=stops[a+1].toString()
			this.gradient.addColorStop(pos,col)
		}
	}
}
p5.LinearGradient=class LinearGradient extends p5.Gradient{
	constructor(angle,width){
		super()
		this.setAngle(angle||0)
		this.width=width||100
		const x=lcos(this.angle)*this.width
		const y=lsin(this.angle)*this.width
		this.gradient=drawingContext.createLinearGradient(0,0,x,y)
	}
}
p5.RadialGradient=class RadialGradient extends p5.Gradient{
	constructor(innerRadius,outerRadius,x,y){
		super()
		this.innerRadius=innerRadius||0
		this.outerRadius=outerRadius||100
		this.x=x||0
		this.y=y||0
		this.gradient=drawingContext.createRadialGradient(this.x,this.y,this.innerRadius,this.x,this.y,this.outerRadius)
	}
}
p5.ConicGradient=class ConicGradient extends p5.Gradient{
	constructor(angle,x,y){
	  super()
	  this.setAngle(angle||0)
	  this.x=x||0
	  this.y=y||0
	  this.gradient=drawingContext.createConicGradient(this.angle,this.x,this.y)
	}
}
p5.prototype.createLinearGradient=function(angle,width){
	return new p5.LinearGradient(angle,width)
}
p5.prototype.createConicGradient=function(angle,x,y){
	return new p5.ConicGradient(angle,x,y)
}
p5.prototype.createRadialGradient=function(innerRadius,outerRadius,x,y){
	return new p5.RadialGradient(innerRadius,outerRadius,x,y)
}
p5.prototype.createPattern=function(patternElement,repeat){
	if(patternElement.canvas){
		patternElement=patternElement.canvas
	}else if(patternElement.elt){
		patternElement=patternElement.elt
	}
	return this.drawingContext.createPattern(patternElement,repeat||"repeat")
}
p5.prototype.createSimplePattern=(func,w,h,repeat)=>{ 
	let buffer=this.createGraphics(w||5,h||5)
	buffer.pixelDensity(1)
	buffer.background(255)
	func(buffer)
	return this.drawingContext.createPattern(buffer.canvas,repeat||"repeat")
}
p5.prototype.fillGradient=function(gradient){
	this.drawingContext.fillStyle=gradient.gradient?gradient.gradient:gradient
}
p5.prototype.strokeGradient=function(gradient){
	this.drawingContext.strokeStyle=gradient.gradient?gradient.gradient:gradient
}
p5.prototype.backgroundPattern=function(pattern){
	this.drawingContext.fillStyle=pattern
	this.drawingContext.fillRect(0,0,width,height)
}
//mark standard
function menuBackground(layer){
	for(let a=0,la=30;a<=la;a++){
		for(let b=0,lb=20;b<=lb;b++){
			let offset=noise(a/2+b/3+150)*20+noise(b/2+a/3+200)*20
			layer.fill(30+random(0,5)+offset,40+random(0,5)+offset,50+random(0,5)+offset)
			layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
		}
	}
	for(let a=0.5,la=30;a<=la;a++){
		for(let b=0.5,lb=20;b<=lb;b++){
			let offset=noise(a/2+b/3+150)*20+noise(b/2+a/3+200)*20
			layer.fill(30+random(0,5)+offset,40+random(0,5)+offset,50+random(0,5)+offset)
			layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
		}
	}
	for(let b=0,lb=5;b<lb;b++){
		let bounce=random(-1.5,-0.5)
		for(let a=0,la=20;a<=la+1;a++){
			let offset=noise(a*1.5+b*0.5-100)*20+noise(b*1.5+a*0.5-50)*20
			layer.fill(random(0,5)+offset,random(0,5)+offset,10+random(0,5)+offset)
			layer.quad(layer.width*(a+bounce)/la+15,layer.height*(0.9+b/lb*0.2),layer.width*(a+1+bounce)/la+15,layer.height*(0.9+b/lb*0.2),layer.width*(a+1+bounce)/la-15,layer.height*(0.9+(b+1)/lb*0.2),layer.width*(a+bounce)/la-15,layer.height*(0.9+(b+1)/lb*0.2))
		}
	}
}
function displayTrianglesBack(layer,parts,direction,base,width,weight,slant,color,fade){
	if(color==-1){
		layer.fill(0,fade)
		layer.stroke(0,fade)
		layer.erase(fade,fade)
	}else{
		layer.fill(...color,fade)
		layer.stroke(...color,fade)
	}
	layer.strokeWeight(weight)
	layer.strokeJoin(ROUND)
	for(let part of parts){
		let reality=[
			(part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
			(part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
			part.spin[2]+direction
		]
		let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
		let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
		if(c[0]<0){
			if(c[1]<0){
				if(c[2]<0){
					layer.triangle(
						s[0]*width/2,base,
						s[1]*width/2,base,
						s[2]*(width/2+part.height*slant),base+part.height
					)
				}
			}else{
				if(c[2]<0){
					let inter=reality[1]<90?
						abs(-90-reality[1])/abs(reality[2]-reality[1]):
						abs(270-reality[1])/abs(reality[2]-reality[1])
					layer.quad(
						s[0]*width/2,base,
						-width/2,base,
						-width/2-part.height*inter*slant,base+part.height*inter,
						s[2]*(width/2+part.height*slant),base+part.height
					)
				}else{
					let inter=reality[0]<90?
						abs(-90-reality[0])/abs(reality[2]-reality[0]):
						abs(270-reality[0])/abs(reality[2]-reality[0])
					layer.triangle(
						s[0]*width/2,base,
						-width/2,base,
						-width/2-part.height*inter*slant,base+part.height*inter
					)
				}
			}
		}else{
			if(c[1]<0){
				if(c[2]<0){
					let inter=reality[1]<-90?
						abs(-270-reality[0])/abs(reality[2]-reality[0]):
						abs(90-reality[0])/abs(reality[2]-reality[0])
					layer.quad(
						s[1]*width/2,base,
						width/2,base,
						width/2+part.height*inter*slant,base+part.height*inter,
						s[2]*(width/2+part.height*slant),base+part.height
					)
				}else{
					let inter=reality[0]<-90?
						abs(-270-reality[1])/abs(reality[2]-reality[1]):
						abs(90-reality[1])/abs(reality[2]-reality[1])
					layer.triangle(
						s[1]*width/2,base,
						width/2,base,
						width/2+part.height*inter*slant,base+part.height*inter
					)
				}
			}
		}
		/*if(lcos(part.spin[1]+direction)<=0&&lcos(part.spin[0]+direction)>0){
			if(lcos(part.spin[2]+direction)>0){
				layer.triangle(lsin(part.spin[1]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])))
			}else{
				layer.quad(lsin(part.spin[1]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])),lsin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
			}
		}else if(lcos(part.spin[0]+direction)<=0&&lcos(part.spin[1]+direction)>0){
			if(lcos(part.spin[2]+direction)>0){
				layer.triangle(lsin(part.spin[0]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])))
			}else{
				layer.quad(lsin(part.spin[0]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])),lsin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
			}
		}else if(lcos(part.spin[0]+direction)<=0&&lcos(part.spin[1]+direction)<=0&&lcos(part.spin[2]+direction)<=0){
			layer.triangle(lsin(part.spin[0]+direction)*width/2,base,lsin(part.spin[1]+direction)*width/2,base,lsin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
		}*/
	}
	layer.strokeJoin(MITER)
}
function displayTrianglesFront(layer,parts,direction,base,width,weight,slant,color,fade){
	if(color==-1){
		layer.fill(0,fade)
		layer.stroke(0,fade)
		layer.erase(fade,fade)
	}else if(weight==0){
		layer.fill(...color,fade)
		layer.noStroke()
	}else{
		layer.fill(...color,fade)
		layer.stroke(...color,fade)
	}
	layer.strokeWeight(weight)
	layer.strokeJoin(ROUND)
	for(let part of parts){
		let reality=[
			(part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
			(part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
			part.spin[2]+direction
		]
		let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
		let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
		if(c[0]>=0){
			if(c[1]>=0){
				if(c[2]>=0){
					layer.triangle(
						s[0]*width/2,base,
						s[1]*width/2,base,
						s[2]*(width/2+part.height*slant),base+part.height
					)
				}
			}else{
				if(c[2]>=0){
					let inter=reality[1]<-90?
						abs(-270-reality[1])/abs(reality[2]-reality[1]):
						abs(90-reality[1])/abs(reality[2]-reality[1])
					layer.quad(
						s[0]*width/2,base,
						width/2,base,
						width/2+part.height*inter*slant,base+part.height*inter,
						s[2]*(width/2+part.height*slant),base+part.height
					)
				}else{
					let inter=reality[0]<-90?
						abs(-270-reality[0])/abs(reality[2]-reality[0]):
						abs(90-reality[0])/abs(reality[2]-reality[0])
					layer.triangle(
						s[0]*width/2,base,
						width/2,base,
						width/2+part.height*inter*slant,base+part.height*inter
					)
				}
			}
		}else{
			if(c[1]>=0){
				if(c[2]>=0){
					let inter=reality[1]<90?
						abs(-90-reality[0])/abs(reality[2]-reality[0]):
						abs(270-reality[0])/abs(reality[2]-reality[0])
					layer.quad(
						s[1]*width/2,base,
						-width/2,base,
						-width/2-part.height*inter*slant,base+part.height*inter,
						s[2]*(width/2+part.height*slant),base+part.height
					)
				}else{
					let inter=reality[0]<90?
						abs(-90-reality[1])/abs(reality[2]-reality[1]):
						abs(270-reality[1])/abs(reality[2]-reality[1])
					layer.triangle(
						s[1]*width/2,base,
						-width/2,base,
						-width/2-part.height*inter*slant,base+part.height*inter
					)
				}
			}
		}
		/*if(lcos(part.spin[1]+direction)<=0&&lcos(part.spin[0]+direction)>0){
			if(lcos(part.spin[2]+direction)<=0){
				if(90-part.spin[2]-direction>180){
					layer.triangle(lsin(part.spin[0]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(-270-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(-270-part.spin[2]-direction)/(part.spin[0]-part.spin[2])))
				}else{
					layer.triangle(lsin(part.spin[0]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])))
				}
			}else{
				layer.quad(lsin(part.spin[0]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])),lsin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
			}
		}else if(lcos(part.spin[0]+direction)<=0&&lcos(part.spin[1]+direction)>0){
			if(lcos(part.spin[2]+direction)<=0){
				if(-90-part.spin[2]-direction<-180){
					layer.triangle(lsin(part.spin[1]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(270-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(270-part.spin[2]-direction)/(part.spin[1]-part.spin[2])))
				}else{
					layer.triangle(lsin(part.spin[1]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])))
				}
			}else{
				layer.quad(lsin(part.spin[1]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])),lsin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
			}
		}else if(lcos(part.spin[0]+direction)>0&&lcos(part.spin[1]+direction)>0&&lcos(part.spin[2]+direction)>0){
			layer.triangle(lsin(part.spin[0]+direction)*width/2,base,lsin(part.spin[1]+direction)*width/2,base,lsin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
		}*/
	}
	layer.strokeJoin(MITER)
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
			layer.fill(...mergeColor(color1,color2,g/lg))
			layer.stroke(...mergeColor(color1,color2,g/lg))
		}
		let reality=[
			(part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
			(part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
			part.spin[2]+direction
		]
		let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
		let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
		if(c[0]<0){
			if(c[1]<0){
				if(c[2]<0){
					layer.triangle(
						s[0]*(width/2+part.y[0]*slant),base+part.y[0],
						s[1]*(width/2+part.y[1]*slant),base+part.y[1],
						s[2]*(width/2+part.y[2]*slant),base+part.y[2]
					)
				}
			}else{
				if(c[2]<0){
					let inter=[
						reality[1]<90?
						abs(-90-reality[1])/abs(reality[0]-reality[1]):
						abs(270-reality[1])/abs(reality[0]-reality[1]),
						reality[1]<90?
						abs(-90-reality[1])/abs(reality[1]-reality[2]):
						abs(270-reality[1])/abs(reality[1]-reality[2])
					]
					let cut=[
						part.y[1]*(1-inter[0])+part.y[0]*inter[0],
						part.y[1]*(1-inter[1])+part.y[2]*inter[1]
					]
					layer.quad(
						s[0]*(width/2+part.y[0]*slant),base+part.y[0],
						-width/2-cut[0]*slant,base+cut[0],
						-width/2-cut[1]*slant,base+cut[1],
						s[2]*(width/2+part.y[2]*slant),base+part.y[2]
					)
				}else{
					let inter=[
						reality[0]<90?
						abs(-90-reality[0])/abs(reality[0]-reality[1]):
						abs(270-reality[0])/abs(reality[0]-reality[1]),
						reality[0]<90?
						abs(-90-reality[0])/abs(reality[0]-reality[2]):
						abs(270-reality[0])/abs(reality[0]-reality[2])
					]
					let cut=[
						part.y[0]*(1-inter[0])+part.y[1]*inter[0],
						part.y[0]*(1-inter[1])+part.y[2]*inter[1]
					]
					layer.triangle(
						s[0]*(width/2+part.y[0]*slant),base+part.y[0],
						-width/2-cut[0]*slant,base+cut[0],
						-width/2-cut[1]*slant,base+cut[1]
					)
				}
			}
		}else{
			if(c[1]<0){
				if(c[2]<0){
					let inter=[
						reality[0]<-90?
						abs(-270-reality[0])/abs(reality[0]-reality[1]):
						abs(90-reality[0])/abs(reality[0]-reality[1]),
						reality[0]<-90?
						abs(-270-reality[0])/abs(reality[0]-reality[2]):
						abs(90-reality[0])/abs(reality[0]-reality[2])
					]
					let cut=[
						part.y[0]*(1-inter[0])+part.y[1]*inter[0],
						part.y[0]*(1-inter[1])+part.y[2]*inter[1]
					]
					layer.quad(
						s[1]*(width/2+part.y[1]*slant),base+part.y[1],
						width/2+cut[0]*slant,base+cut[0],
						width/2+cut[1]*slant,base+cut[1],
						s[2]*(width/2+part.y[2]*slant),base+part.y[2]
					)
				}else{
					let inter=[
						reality[1]<-90?
						abs(-270-reality[1])/abs(reality[0]-reality[1]):
						abs(90-reality[1])/abs(reality[0]-reality[1]),
						reality[1]<-90?
						abs(-270-reality[1])/abs(reality[1]-reality[2]):
						abs(90-reality[1])/abs(reality[1]-reality[2])
					]
					let cut=[
						part.y[1]*(1-inter[0])+part.y[0]*inter[0],
						part.y[1]*(1-inter[1])+part.y[2]*inter[1]
					]
					layer.triangle(
						s[1]*(width/2+part.y[1]*slant),base+part.y[1],
						width/2+cut[0]*slant,base+cut[0],
						width/2+cut[1]*slant,base+cut[1]
					)
				}
			}
		}
		/*if(lcos(part.spin[1]+direction)<=0&&lcos(part.spin[0]+direction)>0){
			if(lcos(part.spin[2]+direction)>0){
				layer.triangle(lsin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
				width/2+(part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
				base+part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
				width/2+(part.y[2]*abs(1-(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))+part.y[1]*abs(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))*slant,
				base+part.y[2]*abs(1-(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))+part.y[1]*abs(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))
			}else{
				layer.quad(lsin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
				lsin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
				width/2+(part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
				base+part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
				width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
				base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
			}
		}else if(lcos(part.spin[0]+direction)<=0&&lcos(part.spin[1]+direction)>0){
			if(lcos(part.spin[2]+direction)>0){
				layer.triangle(lsin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
				-width/2-(part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
				base+part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
				-width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
				base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
			}else{
				layer.quad(lsin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
				lsin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
				-width/2-(part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
				base+part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
				-width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
				base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
			}
		}else if(lcos(part.spin[0]+direction)<=0&&lcos(part.spin[1]+direction)<=0&&lcos(part.spin[2]+direction)<=0){
			layer.triangle(lsin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],lsin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],lsin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2])
		}*/
	}
	layer.strokeJoin(MITER)
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
			layer.fill(...mergeColor(color1,color2,g/lg))
			layer.stroke(...mergeColor(color1,color2,g/lg))
		}
		let reality=[
			(part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
			(part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
			part.spin[2]+direction
		]
		let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
		let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
		if(c[0]>=0){
			if(c[1]>=0){
				if(c[2]>=0){
					layer.triangle(
						s[0]*(width/2+part.y[0]*slant),base+part.y[0],
						s[1]*(width/2+part.y[1]*slant),base+part.y[1],
						s[2]*(width/2+part.y[2]*slant),base+part.y[2]
					)
				}
			}else{
				if(c[2]>=0){
					let inter=[
						reality[1]<-90?
						abs(-270-reality[1])/abs(reality[0]-reality[1]):
						abs(90-reality[1])/abs(reality[0]-reality[1]),
						reality[1]<-90?
						abs(-270-reality[1])/abs(reality[1]-reality[2]):
						abs(90-reality[1])/abs(reality[1]-reality[2])
					]
					let cut=[
						part.y[1]*(1-inter[0])+part.y[0]*inter[0],
						part.y[1]*(1-inter[1])+part.y[2]*inter[1]
					]
					layer.quad(
						s[0]*(width/2+part.y[0]*slant),base+part.y[0],
						width/2+cut[0]*slant,base+cut[0],
						width/2+cut[1]*slant,base+cut[1],
						s[2]*(width/2+part.y[2]*slant),base+part.y[2]
					)
				}else{
					let inter=[
						reality[0]<-90?
						abs(-270-reality[0])/abs(reality[0]-reality[1]):
						abs(90-reality[0])/abs(reality[0]-reality[1]),
						reality[0]<-90?
						abs(-270-reality[0])/abs(reality[0]-reality[2]):
						abs(90-reality[0])/abs(reality[0]-reality[2])
					]
					let cut=[
						part.y[0]*(1-inter[0])+part.y[1]*inter[0],
						part.y[0]*(1-inter[1])+part.y[2]*inter[1]
					]
					layer.triangle(
						s[0]*(width/2+part.y[0]*slant),base+part.y[0],
						width/2+cut[0]*slant,base+cut[0],
						width/2+cut[1]*slant,base+cut[1]
					)
				}
			}
		}else{
			if(c[1]>=0){
				if(c[2]>=0){
					let inter=[
						reality[0]<90?
						abs(-90-reality[0])/abs(reality[0]-reality[1]):
						abs(270-reality[0])/abs(reality[0]-reality[1]),
						reality[0]<90?
						abs(-90-reality[0])/abs(reality[0]-reality[2]):
						abs(270-reality[0])/abs(reality[0]-reality[2])
					]
					let cut=[
						part.y[0]*(1-inter[0])+part.y[1]*inter[0],
						part.y[0]*(1-inter[1])+part.y[2]*inter[1]
					]
					layer.quad(
						s[1]*(width/2+part.y[1]*slant),base+part.y[1],
						-width/2-cut[0]*slant,base+cut[0],
						-width/2-cut[1]*slant,base+cut[1],
						s[2]*(width/2+part.y[2]*slant),base+part.y[2]
					)
				}else{
					let inter=[
						reality[1]<90?
						abs(-90-reality[1])/abs(reality[0]-reality[1]):
						abs(270-reality[1])/abs(reality[0]-reality[1]),
						reality[1]<90?
						abs(-90-reality[1])/abs(reality[1]-reality[2]):
						abs(270-reality[1])/abs(reality[1]-reality[2])
					]
					let cut=[
						part.y[1]*(1-inter[0])+part.y[0]*inter[0],
						part.y[1]*(1-inter[1])+part.y[2]*inter[1]
					]
					layer.triangle(
						s[1]*(width/2+part.y[1]*slant),base+part.y[1],
						-width/2-cut[0]*slant,base+cut[0],
						-width/2-cut[1]*slant,base+cut[1]
					)
				}
			}
		}
		/*if(lcos(part.spin[1]+direction)<=0&&lcos(part.spin[0]+direction)>0){
			if(lcos(part.spin[2]+direction)<=0){
				layer.triangle(lsin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
				width/2+(part.y[0]*(1-abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
				base+part.y[0]*(1-abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
				width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
				base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
			}else{
				layer.quad(lsin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
				lsin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
				width/2+(part.y[0]*(1-(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))+part.y[1]*(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))*slant,
				base+part.y[0]*(1-(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))+part.y[1]*(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]),
				width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
				base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
			}
		}else if(lcos(part.spin[0]+direction)<=0&&lcos(part.spin[1]+direction)>0){
			if(lcos(part.spin[2]+direction)<=0){
				layer.triangle(lsin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
				-width/2-(part.y[1]*(1-abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
				base+part.y[1]*(1-abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
				-width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
				base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
			}else{
				layer.quad(lsin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
				lsin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
				-width/2-(part.y[1]*(1-(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))+part.y[0]*(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))*slant,
				base+part.y[1]*(1-(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))+part.y[0]*(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]),
				-width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
				base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
			}
		}else if(lcos(part.spin[0]+direction)>0&&lcos(part.spin[1]+direction)>0&&lcos(part.spin[2]+direction)>0){
			layer.triangle(lsin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],lsin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],lsin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2])
		}*/
	}
	layer.strokeJoin(MITER)
}
function controlSpin(set,direction,spec){
	for(let g=0,lg=set.length;g<lg;g++){
		if(set[g].spin[0]>set[g].spin[1]&&spec==1){
			set[g].spin=[set[g].spin[1],set[g].spin[0],set[g].spin[2]]
			set[g].y=[set[g].y[1],set[g].y[0],set[g].y[2]]
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
function minorGraphicDisplay(layer,type){
	layer.noStroke()
	switch(type){
		case 0:
			layer.fill(251,172,180)
			for(let h=0;h<6;h++){
				layer.rotate(60)
				layer.ellipse(0,1.4,2,3)
			}
			layer.fill(237,109,167)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,1.4,1.6,2.6)
			}
			layer.fill(252,158,191)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,1,1.2,1.8)
			}
			layer.fill(178,20,116)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,-1.4,1.6,2.6)
			}
			layer.fill(213,54,146)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,-1,1.2,1.8)
			}
			layer.fill(251,166,172)
			layer.ellipse(0,0,1.2,1.2)
			layer.fill(166,48,35)
			layer.ellipse(0,0,0.8,0.8)
		break
		case 1:
			layer.fill(255,230,217)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.5,2.2,3)
			}
			layer.fill(245,113,150)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.5,1.8,2.6)
			}
			layer.fill(249,144,184)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.2,1.2,2)
			}
			layer.fill(255,255,244)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.2,0.3,0.8)
			}
			layer.ellipse(0,0,0.5,0.5)
		break
		case 2:
			layer.fill(255,217,218)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.5,2.4,2.8)
			}
			layer.fill(210,28,53)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.5,2.1,2.5)
			}
			layer.fill(241,80,52)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.5,1.8,2.2)
			}
			layer.fill(254,145,80)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.2,1.4,1.8)
			}
			layer.fill(255,240,211)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1,0.2,0.7)
			}
			layer.ellipse(0,0,0.4,0.4)
		break
		case 3:
			layer.fill(255,224,215)
			for(let h=0;h<4;h++){
				layer.rotate(90)
				layer.ellipse(0,1.375,2.75,2.75)
			}
			layer.fill(23,165,189)
			for(let h=0;h<4;h++){
				layer.rotate(90)
				layer.ellipse(0,1.375,2.25,2.25)
			}
			layer.fill(108,215,222)
			for(let h=0;h<4;h++){
				layer.rotate(90)
				layer.ellipse(0,1.375,1.75,1.75)
			}
			layer.rotate(45)
			layer.fill(255,224,215)
			for(let h=0;h<4;h++){
				layer.rotate(90)
				layer.ellipse(0,1.375,2.75,2.75)
			}
			layer.fill(186,54,77)
			for(let h=0;h<4;h++){
				layer.rotate(90)
				layer.ellipse(0,1.375,2.25,2.25)
			}
			layer.fill(255,210,207)
			for(let h=0;h<4;h++){
				layer.rotate(90)
				layer.ellipse(-0.375,-1.75,0.25,0.25)
				layer.ellipse(0.375,-1.75,0.25,0.25)
				layer.ellipse(-0.375,-1,0.25,0.25)
				layer.ellipse(0.375,-1,0.25,0.25)
			}
		break
		case 4:
			layer.strokeJoin(ROUND)
			layer.stroke(231,208,210)
			layer.strokeWeight(0.6)
			for(let h=0;h<6;h++){
				layer.rotate(45+(h%2)*30)
				layer.triangle(0,0,-0.65,1.2,0.65,1.2)
				layer.arc(0,1.5,1.5,1.5,0,360)
			}
			layer.noStroke()
			for(let g=0,lg=10;g<lg;g++){
				layer.fill(161+82*g/lg,1+123*g/lg,19+143*g/lg)
				for(let h=0;h<6;h++){
					layer.rotate(45+(h%2)*30)
					layer.triangle(0,0,-0.65*(1-g/lg),1.2*(1-0.8*g/lg),0.65*(1-g/lg),1.2*(1-0.8*g/lg))
					layer.arc(0,1.5*(1-0.8*g/lg),1.5*(1-g/lg),1.5,0,360)
				}
			}
			layer.rotate(22.5)
			layer.fill(166,58,30)
			layer.stroke(214,185,132)
			layer.strokeWeight(0.1)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.bezier(0,0,-0.4,1.6,0.4,1.6,0,0)
			}
			layer.strokeJoin(MITER)
		break
		case 5:
			layer.fill(242,232,231)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,1.25,3.25,3)
			}
			layer.fill(189,42,26)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,1.125,2.25,2.25)
			}
			layer.stroke(224,142,139)
			layer.strokeWeight(0.15)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(-0.45,1.4,0.5,0.5)
				layer.ellipse(0.45,1.4,0.5,0.5)
				layer.ellipse(0,0.65,0.5,0.5)
			}
		break
		case 6:
			layer.fill(241,212,226)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.1,2.1,2.7)
			}
			layer.fill(143,90,141)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.1,1.7,2.3)
			}
			layer.rotate(36)
			layer.fill(229,201,211)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.05,2.4,2.7)
			}
			layer.fill(247,132,76)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.05,1.8,2.1)
			}
			layer.fill(237,163,170)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,0.5,0.5,4/3)
			}
			layer.fill(128,59,148)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,0.5,1/6,1)
			}
			layer.rotate(36)
			layer.fill(255,197,164)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1/3,0.5,1)
			}
			layer.fill(210,23,61)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1/3,1/6,2/3)
			}
		break
		case 7:
			layer.fill(255,246,236)
			for(let h=0;h<10;h++){
				layer.rotate(27+(h%2)*18)
				layer.arc(0,1.6,1.3,1.3,0,360)
			}
			layer.ellipse(0,0,3,3)
			for(let g=0,lg=10;g<lg;g++){
				layer.fill(162+59*abs(4-g)/5,40+117*abs(4-g)/5,61+72*abs(4-g)/5)
				for(let h=0;h<10;h++){
					layer.rotate(27+(h%2)*18)
					layer.triangle(0,0,-0.5*(1-g/lg),1.5*(1-g/lg),0.5*(1-g/lg),1.5*(1-g/lg))
					layer.arc(0,1.6*(1-g/lg),1*(1-g/lg),1*(1-g/lg),0,360)
				}
			}
			layer.rotate(13.5)
			layer.fill(254,242,237)
			layer.ellipse(0,0,0.6,0.6)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.rect(0,-0.8,0.15,1.6)
			}
			layer.fill(211,95,159)
			layer.ellipse(0,0,0.4,0.4)
		break
		case 8:
			layer.fill(233,197,220)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,2,0.8,2)
			}
			layer.fill(157,78,128)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,2,0.6,1.8)
			}
			layer.fill(123,64,107)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.85,0.5,1.5)
			}
			layer.fill(79,29,75)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.7,0.4,1.2)
			}
			layer.rotate(48)
			layer.fill(249,212,237)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.2,1.2,2.4)
			}
			layer.fill(172,5,65)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.2,1,2.2)
			}
			layer.fill(193,15,82)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,0.8,0.6,1.4)
			}
			layer.rotate(36)
			layer.fill(252,206,219)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.2,1.2,2.4)
			}
			layer.fill(222,84,132)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.2,1,2.2)
			}
			layer.fill(252,130,170)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,0.8,0.6,1.4)
			}
			layer.fill(236,137,109)
			layer.ellipse(0,0,0.6,0.6)
			layer.fill(253,213,132)
			layer.ellipse(0,0,0.4,0.4)
		break
		case 9:
			layer.fill(253,233,237)
			for(let h=0;h<8;h++){
				layer.rotate(45+lcos(h*90+45)*10)
				layer.ellipse(0,lsin(h*90)*0.4+1.6,1,2)
				layer.rect(0,-1,0.16,2)
			}
			for(let g=0,lg=5;g<lg;g++){
				layer.fill(217-38*g/lg,224-63*g/lg,137-66*g/lg)
				for(let h=0;h<8;h++){
					layer.rotate(45+lcos(h*90+45)*10)
					layer.ellipse(0,lsin(h*90)*0.4+1.6-0.9*g/lg,0.8*(1-g/lg),1.8*(1-g/lg))
					layer.rect(0,-(lsin(h*90)*0.4+1.6-0.9*g/lg)/2,0.08-0.08*g/lg,lsin(h*90)*0.4+1.6-0.9*g/lg)
				}
			}
			layer.rotate(18)
			layer.scale(0.8)
			layer.fill(235,201,215)
			for(let h=0;h<8;h++){
				layer.rotate(45+lcos(h*90+45)*10)
				layer.ellipse(0,lsin(h*90)*0.4+1.6,1,2)
				layer.rect(0,-1,0.16,2)
			}
			for(let g=0,lg=5;g<lg;g++){
				layer.fill(173-51*g/lg,113-68*g/lg,180-42*g/lg)
				for(let h=0;h<8;h++){
					layer.rotate(45+lcos(h*90+45)*10)
					layer.ellipse(0,lsin(h*90)*0.4+1.6-0.9*g/lg,0.8*(1-g/lg),1.8*(1-g/lg))
					layer.rect(0,-(lsin(h*90)*0.4+1.6-0.9*g/lg)/2,0.08-0.08*g/lg,lsin(h*90)*0.4+1.6-0.9*g/lg)
				}
			}
		break
		case 10:
			layer.fill(254,180,202)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,1.8,1.2,2)
			}
			layer.fill(169,91,129)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,1.8,1,1.8)
			}
			layer.fill(106,48,88)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,1.65,0.7,1.5)
			}
			layer.fill(69,24,68)
			for(let h=0;h<3;h++){
				layer.rotate(120)
				layer.ellipse(0,1.5,0.4,1.2)
			}
			layer.rotate(48)
			for(let h=0,lh=16;h<lh;h++){
				layer.rotate(72)
				layer.fill(248+6*h/lh,215-21*h/lh,232-19*h/lh)
				layer.ellipse(0,-1.2+h*0.05,2.2-h*0.1,2-h*0.1)
				layer.ellipse(0,1.2-h*0.05,2.2-h*0.1,2-h*0.1)
				layer.fill(255-52*h/lh,170-103*h/lh,192-80*h/lh)
				layer.ellipse(0,-1.2+h*0.05,2-h*0.1,1.8-h*0.1)
				layer.ellipse(0,1.2-h*0.05,2-h*0.1,1.8-h*0.1)
			}
			layer.fill(239,177,106)
			layer.ellipse(0,0,0.8,0.8)
			layer.fill(250,210,145)
			layer.ellipse(0,0,0.6,0.6)
		break
		case 11:
			layer.fill(246,136,164)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.4,1.4,2.4)
			}
			layer.fill(188,10,69)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.4,1,2)
			}
			layer.rotate(36)
			layer.fill(244,139,177)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.4,1.4,2.4)
			}
			layer.fill(181,3,65)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.4,1,2)
			}
			layer.fill(230,118,138)
			layer.ellipse(0,0,1,1)
			layer.fill(167,61,48)
			layer.ellipse(0,0,0.6,0.6)
		break
		case 12:
			layer.fill(243,186,203)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.4,1,2.8)
			}
			layer.fill(231,97,124)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.4,0.6,2.4)
			}
			layer.fill(225,51,100)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1,0.4,1.6)
			}
			layer.rotate(36)
			layer.fill(232,169,191)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.4,1,2.8)
			}
			layer.fill(232,112,133)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.4,0.6,2.4)
			}
			layer.fill(223,55,101)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1,0.4,1.6)
			}
			layer.fill(248,167,196)
			layer.ellipse(0,0,0.8,0.8)
			layer.fill(193,80,113)
			layer.ellipse(0,0,0.4,0.4)
		break
		case 13:
			layer.fill(231,108,217)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.beginShape()
				layer.vertex(0,-0.3)
				layer.bezierVertex(-1,0.9,-1,1.8,0,3)
				layer.bezierVertex(1,1.8,1,0.9,0,-0.3)
				layer.endShape()
			}
			layer.fill(125,3,44)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.beginShape()
				layer.vertex(0,0)
				layer.bezierVertex(-0.8,1.2,-0.8,1.5,0,2.7)
				layer.bezierVertex(0.8,1.5,0.8,1.2,0,0)
				layer.endShape()
			}
			layer.fill(194,92,132)
			layer.ellipse(0,0,1,1)
			layer.fill(141,37,74)
			layer.ellipse(0,0,0.6,0.6)
		break
		case 14:
			layer.fill(245,171,177)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.5,1.1,2.1)
				layer.rect(0,0.8,0.15,1.6)
			}
			for(let g=0,lg=5;g<lg;g++){
				layer.fill(179-22*g/lg,125-51*g/lg,179)
				for(let h=0;h<5;h++){
					layer.rotate(72)
					layer.ellipse(0,1.5-0.95*g/lg,0.8*(1-g/lg),1.8*(1-g/lg))
				}
			}
			layer.rotate(30)
			layer.fill(246,185,195)
			for(let h=0;h<5;h++){
				layer.rotate(72)
				layer.ellipse(0,1.8,1.3,2.5)
				layer.rect(0,1,0.15,2)
			}
			for(let g=0,lg=5;g<lg;g++){
				layer.fill(190-76*g/lg,147-133*g/lg,183-42*g/lg)
				for(let h=0;h<5;h++){
					layer.rotate(72)
					layer.ellipse(0,1.8-1.1*g/lg,1*(1-g/lg),2.2*(1-g/lg))
				}
			}
		break
	}
}
function generateSprite(layer,type,direction){
	let data=graphics.combatant[graphics.combatant.length-1]
	switch(type){
		case 0:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFront(layer,data.parts.hair.inside,direction,0,33,1,-0.05,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,35,1,-0.05,data.color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
		break
		case 1:
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,35,1,-0.05,data.color.hair.back,1)
			displayTrianglesBack(layer,data.parts.hair.inside,direction,0,33,1,-0.05,data.color.hair.insideBack,1)
		break
		case 2:
			controlSpin(data.parts.kimono.main,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.main,direction,20,9.25,0.5,0.16,data.color.kimono.main.start,data.color.kimono.main.end,1)
		break
		case 3:
			displayTrianglesBackMerge(layer,data.parts.kimono.main,direction,20,9.25,0.5,0.16,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
		break
		case 4:
			controlSpin(data.parts.kimono.outside,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outside,direction,20,9,0.5,0.2,data.color.kimono.outside.start,data.color.kimono.outside.end,1)
			controlSpin(data.parts.kimono.outsideTop,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outsideTop,direction,20,9,0.5,0.2,data.color.kimono.outside.start,data.color.kimono.outside.end,1)
		break
		case 5:
			displayTrianglesBackMerge(layer,data.parts.kimono.outside,direction,20,9,0.5,0.2,data.color.kimono.outsideBack.start,data.color.kimono.outsideBack.end,1)
		break
		case 6:
			controlSpin(data.parts.kimono.mainDamage,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainDamage,direction,20,9.25,0.5,0.16,data.color.kimono.main.start,data.color.kimono.main.end,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainAnti,direction,20,9.25,0.5,0.16,-1,-1,1)
		break
		case 7:
			displayTrianglesBackMerge(layer,data.parts.kimono.mainDamage,direction,20,9.25,0.5,0.16,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.mainAnti,direction,20,9.25,0.5,0.16,-1,-1,1)
		break
		case 8:
			controlSpin(data.parts.kimono.outsideDamage,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outsideDamage,direction,20,9,0.5,0.2,data.color.kimono.outside.start,data.color.kimono.outside.end,1)
			controlSpin(data.parts.kimono.outsideTop,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outsideTop,direction,20,9,0.5,0.2,data.color.kimono.outside.start,data.color.kimono.outside.end,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outsideAnti,direction,20,9,0.5,0.2,-1,-1,1)
		break
		case 9:
			displayTrianglesBackMerge(layer,data.parts.kimono.outsideDamage,direction,20,9,0.5,0.2,data.color.kimono.outsideBack.start,data.color.kimono.outsideBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.outsideAnti,direction,20,9,0.5,0.2,-1,-1,1)
		break
		case 10:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFront(layer,data.parts.hair.inside,direction,0,33,1,0.1,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,35,1,0.1,data.color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
			layer.strokeWeight(0.75)
			for(let g=0,lg=data.parts.hair.strand.length;g<lg;g++){
				if(lcos(data.parts.hair.strand[g]+direction)>0){
					layer.line(lsin(data.parts.hair.strand[g]+direction)*15.5,0,lsin(data.parts.hair.strand[g]+direction)*14,18)
				}
			}
			layer.strokeWeight(0.5)
			layer.noFill()
			layer.arc(lcos(direction+data.parts.hair.top)*-5,-10,16*lcos(direction+data.parts.hair.top),12,-180,0)
		break
		case 11:
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,35,1,0.1,data.color.hair.back,1)
			layer.strokeWeight(0.75)
			for(let g=0,lg=data.parts.hair.strand.length;g<lg;g++){
				if(lcos(data.parts.hair.strand[g]+direction)<=0){
					layer.line(lsin(data.parts.hair.strand[g]+direction)*15.5,0,lsin(data.parts.hair.strand[g]+direction)*14,18)
				}
			}
			displayTrianglesBack(layer,data.parts.hair.inside,direction,0,33,1,0.1,data.color.hair.insideBack,1)
		break
		case 12:
			controlSpin(data.parts.kimono.main,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.main,direction,20,9,0.5,0.15,data.color.kimono.main.start,data.color.kimono.main.end,1)
			layer.erase()
			layer.fill(0)
			layer.rect(0,layer.height*0.825/5,layer.width/5,layer.height*0.35/5)
			data.sprites.temp=createGraphics(200,330)
			setupLayer(data.sprites.temp)
			data.sprites.temp.translate(100,0)
			data.sprites.temp.scale(5,2)
			displayTrianglesFrontMerge(data.sprites.temp,data.parts.kimono.main,direction,87,3,0.5,0.36,data.color.kimono.main.start,data.color.kimono.main.end,1)
			data.sprites.temp.erase()
			data.sprites.temp.rect(0,52,40,104)
			layer.image(data.sprites.temp,-layer.width/10,0,layer.width/5,layer.height/5)
		break
		case 13:
			displayTrianglesBackMerge(layer,data.parts.kimono.main,direction,20,9,0.5,0.15,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
			layer.erase()
			layer.fill(0)
			layer.rect(0,layer.height*0.825/5,layer.width/5,layer.height*0.35/5)
			data.sprites.temp=createGraphics(200,330)
			setupLayer(data.sprites.temp)
			data.sprites.temp.translate(100,0)
			data.sprites.temp.scale(5,2)
			displayTrianglesBackMerge(data.sprites.temp,data.parts.kimono.main,direction,87,3,0.5,0.36,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
			data.sprites.temp.erase()
			data.sprites.temp.rect(0,52,40,104)
			layer.image(data.sprites.temp,-layer.width/10,0,layer.width/5,layer.height/5)
		break
		case 14:
			controlSpin(data.parts.kimono.outside,direction,0)
			displayTrianglesFront(layer,data.parts.kimono.outside,direction,27,18,0.5,0.2,data.color.kimono.outside.end,1)
			for(let g=0;g<36;g++){
				layer.fill(mergeColor(data.color.kimono.outside.start,data.color.kimono.outside.end,g/36))
				layer.stroke(mergeColor(data.color.kimono.outside.start,data.color.kimono.outside.end,g/36))
				layer.quad(-5-g/9,9+g/2,5+g/9,9+g/2,5+(g+1)/9,9.5+g/2,-5-(g+1)/9,9.5+g/2)
			}
			displayTrianglesFront(layer,data.parts.kimono.outsideTop,direction,9,10,0.25,0.2,data.color.kimono.outside.start,1)
		break
		case 15:
			displayTrianglesBack(layer,data.parts.kimono.outside,direction,27,18,0.5,0.2,data.color.kimono.outsideBack.end,1)
			displayTrianglesBack(layer,data.parts.kimono.outsideTop,direction,9,10,0.25,0.2,data.color.kimono.outsideBack.start,1)
		break
		case 16:
			controlSpin(data.parts.kimono.fringe,direction,0)
			displayTrianglesFront(layer,data.parts.kimono.fringe,direction,0,18,0.3,0.2,data.color.kimono.fringe,1)
			displayTrianglesFront(layer,data.parts.kimono.outsideFringe,direction,0,18,0.15,0.2,data.color.kimono.outsideFringe,1)
		break
		case 17:
			displayTrianglesBack(layer,data.parts.kimono.fringe,direction,0,18,0.3,0.2,data.color.kimono.fringeBack,1)
			displayTrianglesFront(layer,data.parts.kimono.outsideFringe,direction,0,18,0.15,0.2,data.color.kimono.outsideFringeBack,1)
		break
		case 18:
			for(let g=0,lg=data.parts.tail.length;g<lg;g++){
				controlSpin(data.parts.tail[g][0],direction,0)
				controlSpin(data.parts.tail[g][1],direction,0)
				layer.translate(lsin(direction*6+g*135)*0.6,0)
				displayTrianglesFrontMerge(layer,data.parts.tail[g][0],direction,30-g*5,3.2+min(g,4)*1.2,1,0.4*(0.8+min(g,4)*0.3),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,g/lg),lcos(direction+data.spin.tail)*20,[0,1,1]),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(g+1)/lg),lcos(direction+data.spin.tail)*20,[0,1,1]),1),
				displayTrianglesFrontMerge(layer,data.parts.tail[g][1],direction,30-g*5,3.2+min(g,4)*1.2,1,-0.4*(0.8+min(g,4)*0.3),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,g/lg),lcos(direction+data.spin.tail)*20,[0,1,1]),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(g+1)/lg),lcos(direction+data.spin.tail)*20,[0,1,1]),1)
				layer.translate(lsin(direction*6+g*135)*-0.6,0)
			}
			layer.noStroke()
			layer.fill(111,23,27)
			layer.rect(lsin(direction*6)*0.3+lsin(direction*6+135)*0.3,27.1,abs(lsin(direction*6)*0.57-lsin(direction*6+135)*0.57)+3.8,0.3)
			layer.rect(lsin(direction*6)*0.3+lsin(direction*6+135)*0.3,27.9,abs(lsin(direction*6)*0.57-lsin(direction*6+135)*0.57)+3.8,0.3)
		break
		case 19:
			controlSpin(data.parts.under.dress,direction,0)
			displayTrianglesFront(layer,data.parts.under.dress,direction,41,16,0.5,0.5,data.color.under.dress,1)
			layer.quad(-5,21,5,21,8,41,-8,41)
		break
		case 20:
			displayTrianglesBack(layer,data.parts.under.dress,direction,41,16,0.5,0.5,data.color.under.dressBack,1)
		break
		case 21:
			controlSpin(data.parts.kimono.shadow,direction,0)
			displayTrianglesFront(layer,data.parts.kimono.shadow,direction,3,15,0.5,0.15,data.color.kimono.shadow,1)
		break
		case 22:
			controlSpin(data.parts.kimono.mainDamage,direction,1)
			controlSpin(data.parts.kimono.mainAnti,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainDamage,direction,20,9,0.5,0.15,data.color.kimono.main.start,data.color.kimono.main.end,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainAnti,direction,20,9,0.5,0.15,-1,-1,1)
			layer.erase()
			layer.fill(0)
			layer.rect(0,layer.height*0.825/5,layer.width/5,layer.height*0.35/5)
			data.sprites.temp=createGraphics(200,330)
			setupLayer(data.sprites.temp)
			data.sprites.temp.translate(100,0)
			data.sprites.temp.scale(5,2)
			displayTrianglesFrontMerge(data.sprites.temp,data.parts.kimono.mainDamage,direction,87,3,0.5,0.36,data.color.kimono.main.start,data.color.kimono.main.end,1)
			data.sprites.temp.erase()
			data.sprites.temp.rect(0,52,40,104)
			layer.image(data.sprites.temp,-layer.width/10,0,layer.width/5,layer.height/5)
		break
		case 23:
			displayTrianglesBackMerge(layer,data.parts.kimono.mainDamage,direction,20,9,0.5,0.15,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.mainAnti,direction,20,9,0.5,0.15,-1,-1,1)
			layer.erase()
			layer.fill(0)
			layer.rect(0,layer.height*0.825/5,layer.width/5,layer.height*0.35/5)
			data.sprites.temp=createGraphics(200,330)
			setupLayer(data.sprites.temp)
			data.sprites.temp.translate(100,0)
			data.sprites.temp.scale(5,2)
			displayTrianglesBackMerge(data.sprites.temp,data.parts.kimono.mainDamage,direction,87,3,0.5,0.36,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
			data.sprites.temp.erase()
			data.sprites.temp.rect(0,52,40,104)
			layer.image(data.sprites.temp,-layer.width/10,0,layer.width/5,layer.height/5)
		break
		case 24:
			controlSpin(data.parts.kimono.outsideDamage,direction,0)
			controlSpin(data.parts.kimono.outsideAnti,direction,0)
			controlSpin(data.parts.kimono.outsideTopAnti,direction,0)
			displayTrianglesFront(layer,data.parts.kimono.outsideDamage,direction,27,18,0.5,0.2,data.color.kimono.outside.end,1)
			for(let g=0;g<36;g++){
				layer.fill(mergeColor(data.color.kimono.outside.start,data.color.kimono.outside.end,g/36))
				layer.stroke(mergeColor(data.color.kimono.outside.start,data.color.kimono.outside.end,g/36))
				layer.quad(-5-g/9,9+g/2,5+g/9,9+g/2,5+(g+1)/9,9.5+g/2,-5-(g+1)/9,9.5+g/2)
			}
			displayTrianglesFront(layer,data.parts.kimono.outsideAnti,direction,31,20,0.5,0.2,-1,1)
			displayTrianglesFront(layer,data.parts.kimono.outsideTopAnti,direction,7,9.5,0.25,0.2,-1,1)
		break
		case 25:
			displayTrianglesBack(layer,data.parts.kimono.outsideDamage,direction,27,18,0.5,0.2,data.color.kimono.outsideBack.end,1)
			for(let g=0;g<36;g++){
				layer.fill(mergeColor(data.color.kimono.outside.start,data.color.kimono.outside.end,g/36))
				layer.stroke(mergeColor(data.color.kimono.outside.start,data.color.kimono.outside.end,g/36))
				layer.quad(-5-g/9,9+g/2,5+g/9,9+g/2,5+(g+1)/9,9.5+g/2,-5-(g+1)/9,9.5+g/2)
			}
			displayTrianglesBack(layer,data.parts.kimono.outsideAnti,direction,31,20,0.5,0.2,-1,1)
			displayTrianglesBack(layer,data.parts.kimono.outsideTopAnti,direction,7,9.5,0.25,0.2,-1,1)
		break
		case 26:
			controlSpin(data.parts.kimono.fringeDamage,direction,0)
			displayTrianglesFront(layer,data.parts.kimono.fringeDamage,direction,0,18,0.3,0.2,data.color.kimono.fringe,1)
			displayTrianglesFront(layer,data.parts.kimono.outsideFringeDamage,direction,0,18,0.15,0.2,data.color.kimono.outsideFringe,1)
		break
		case 27:
			displayTrianglesBack(layer,data.parts.kimono.fringeDamage,direction,0,18,0.3,0.2,data.color.kimono.fringeBack,1)
			displayTrianglesFront(layer,data.parts.kimono.outsideFringeDamage,direction,0,18,0.15,0.2,data.color.kimono.outsideFringeBack,1)
		break
		case 28:
			controlSpin(data.parts.kimono.shadowDamage,direction,0)
			controlSpin(data.parts.kimono.shadowAnti,direction,0)
			displayTrianglesFront(layer,data.parts.kimono.shadowDamage,direction,3,15,0.5,0.15,data.color.kimono.shadow,1)
			displayTrianglesFront(layer,data.parts.kimono.shadowAnti,direction,7,19,0.5,0.15,-1,1)
		break
		case 29:
			for(let g=0;g<2;g++){
				if(lcos(data.spin.tail[g]+direction)>=0){
					for(let h=0,lh=data.parts.tail[g].length;h<lh;h++){
						controlSpin(data.parts.tail[g][h][0],direction,0)
						controlSpin(data.parts.tail[g][h][1],direction,0)
						layer.push()
						layer.translate(lsin(data.spin.tail[g]+direction)*data.parts.hair.tail[h][0]+lsin(data.spin.tail[g]+h*150+direction*6)*0.5,-5+data.parts.hair.tail[h][1])
						layer.rotate(lsin(data.spin.tail[g]+direction)*data.parts.hair.tail[h][2])
						displayTrianglesFrontMerge(layer,data.parts.tail[g][h][0],direction,5,2.5,1,0.4,
							upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,h/lh),lcos(direction+data.spin.tail[g])*20,[1,1,1]),
							upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(h+1)/lh),lcos(direction+data.spin.tail[g])*20,[1,1,1]),1)
						displayTrianglesFrontMerge(layer,data.parts.tail[g][h][1],direction,5,2.5,1,-0.4,
							upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,h/lh),lcos(direction+data.spin.tail[g])*20,[1,1,1]),
							upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(h+1)/lh),lcos(direction+data.spin.tail[g])*20,[1,1,1]),1)
						layer.pop()
					}
				}
			}
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFront(layer,data.parts.hair.inside,direction,0,30,1,-0.2,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,32,1,-0.15,data.color.hair.front,1)
			layer.arc(0,0,32,32,-180,0)
			layer.line(-16,0,16,0)
			controlSpin(data.parts.hair.reverse,direction,0)
			displayTrianglesFront(layer,data.parts.hair.reverse,direction,0.5,33,0.1,0.1,-1,1)
		break
		case 30:
			for(let g=0;g<2;g++){
				if(lcos(data.spin.tail[g]+direction)<0){
					for(let h=0,lh=data.parts.tail[g].length;h<lh;h++){
						controlSpin(data.parts.tail[g][h][0],direction,0)
						controlSpin(data.parts.tail[g][h][1],direction,0)
						layer.push()
						layer.translate(lsin(data.spin.tail[g]+direction)*data.parts.hair.tail[h][0]+lsin(data.spin.tail[g]+h*150+direction*6)*0.5,-5+data.parts.hair.tail[h][1])
						layer.rotate(lsin(data.spin.tail[g]+direction)*data.parts.hair.tail[h][2])
						displayTrianglesFrontMerge(layer,data.parts.tail[g][h][0],direction,5,2.5,1,0.4,
							upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,h/lh),lcos(direction+data.spin.tail[g])*20,[1,1,1]),
							upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(h+1)/lh),lcos(direction+data.spin.tail[g])*20,[1,1,1]),1)
						displayTrianglesFrontMerge(layer,data.parts.tail[g][h][1],direction,5,2.5,1,-0.4,
							upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,h/lh),lcos(direction+data.spin.tail[g])*20,[1,1,1]),
							upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(h+1)/lh),lcos(direction+data.spin.tail[g])*20,[1,1,1]),1)
						layer.pop()
					}
				}
			}
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,32,1,-0.2,data.color.hair.back,1)
			displayTrianglesFront(layer,data.parts.hair.reverse,direction,0.5,33,0.1,0.1,data.color.hair.back,1)
			displayTrianglesBack(layer,data.parts.hair.inside,direction,0,30,1,-0.15,data.color.hair.insideBack,1)
		break
		case 31:
			controlSpin(data.parts.kimono.main,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.main,direction,24.5,10.5,0.5,0.18,data.color.kimono.under.start,data.color.kimono.under.end,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.main,direction,23,10.5,0.5,0.18,data.color.kimono.main.start,data.color.kimono.main.end,1)
			controlSpin(data.parts.kimono.mainTop,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainTop,direction,23,10.5,0.5,0.18,data.color.kimono.main.start,data.color.kimono.main.end,1)

			layer.noStroke()
			for(let g=0,lg=data.parts.kimono.decoration.large.length;g<lg;g++){
				if(lcos(data.parts.kimono.decoration.large[g].spin+direction)>0){
					layer.push()
					layer.translate((1.5+data.parts.kimono.decoration.large[g].y*0.18)*lsin(data.parts.kimono.decoration.large[g].spin+direction),-71+data.parts.kimono.decoration.large[g].y+73)
					layer.rotate(-12*lsin(data.parts.kimono.decoration.large[g].spin+direction))
					layer.scale(lcos(data.parts.kimono.decoration.large[g].spin+direction),1)
					layer.rotate(data.parts.kimono.decoration.large[g].rotate)
					minorGraphicDisplay(layer,data.parts.kimono.decoration.large[g].type)
					layer.pop()
				}
			}
		break
		case 32:
			displayTrianglesBackMerge(layer,data.parts.kimono.main,direction,24.5,10.5,0.5,0.18,data.color.kimono.underBack.start,data.color.kimono.underBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.main,direction,23,10.5,0.5,0.18,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.mainTop,direction,23,10.5,0.5,0.18,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
		break
		case 33:
			controlSpin(data.parts.kimono.underDamage,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.underDamage,direction,24.5,10.5,0.5,0.18,data.color.kimono.under.start,data.color.kimono.under.end,1)
			controlSpin(data.parts.kimono.underAnti,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.underAnti,direction,24,10.5,0.5,0.18,-1,1)
			layer.noErase()
			controlSpin(data.parts.kimono.mainDamage,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainDamage,direction,23,10.5,0.5,0.18,data.color.kimono.main.start,data.color.kimono.main.end,1)
			layer.noStroke()
			for(let g=0,lg=data.parts.kimono.decoration.large.length;g<lg;g++){
				if(lcos(data.parts.kimono.decoration.large[g].spin+direction)>0){
					layer.push()
					layer.translate((1.5+data.parts.kimono.decoration.large[g].y*0.18)*lsin(data.parts.kimono.decoration.large[g].spin+direction),-71+data.parts.kimono.decoration.large[g].y+73)
					layer.rotate(-12*lsin(data.parts.kimono.decoration.large[g].spin+direction))
					layer.scale(lcos(data.parts.kimono.decoration.large[g].spin+direction),1)
					layer.rotate(data.parts.kimono.decoration.large[g].rotate)
					minorGraphicDisplay(layer,data.parts.kimono.decoration.large[g].type)
					layer.pop()
				}
			}
			controlSpin(data.parts.kimono.mainAnti,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainAnti,direction,23,10.5,0.5,0.18,-1,1)
		break
		case 34:
			displayTrianglesBackMerge(layer,data.parts.kimono.underDamage,direction,24.5,10.5,0.5,0.18,data.color.kimono.underBack.start,data.color.kimono.underBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.underAnti,direction,24.5,10.5,0.5,0.18,-1,1)
			layer.noErase()
			displayTrianglesBackMerge(layer,data.parts.kimono.mainDamage,direction,23,10.5,0.5,0.18,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.mainAnti,direction,23,10.5,0.5,0.18,-1,1)
		break
		case 35:
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,35,1,-0.05,data.color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
		break
		case 36:
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,35,1,-0.05,data.color.hair.back,1)
		break
		case 37:
			controlSpin(data.parts.under.dress,direction,0)
			displayTrianglesFront(layer,data.parts.under.dress,direction,44,17,0.5,0.75,data.color.under.dress,1)
			layer.quad(-5,21,5,21,8.5,44,-8.5,44)
		break
		case 38:
			displayTrianglesBack(layer,data.parts.under.dress,direction,44,17,0.5,0.75,data.color.under.dressBack,1)
		break
		case 39:
			controlSpin(data.parts.under.dressDamage,direction,0)
			displayTrianglesFront(layer,data.parts.under.dressDamage,direction,44,17,0.5,0.75,data.color.under.dress,1)
			layer.quad(-5,21,5,21,8.5,44,-8.5,44)
			controlSpin(data.parts.under.dressAnti,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.under.dressAnti,direction,21,10,0.5,7/66,-1,1)
		break
		case 40:
			displayTrianglesBack(layer,data.parts.under.dressDamage,direction,44,17,0,0.75,data.color.under.dressBack,1)
			displayTrianglesBackMerge(layer,data.parts.under.dressAnti,direction,21,10,0.5,7/66,-1,1)
		break
		case 41:
			controlSpin(data.parts.kimono.main,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.main,direction,20,10,0.5,0.12,data.color.kimono.main.start,data.color.kimono.main.end,1)
		break
		case 42:
			displayTrianglesBackMerge(layer,data.parts.kimono.main,direction,20,10,0.5,0.12,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
		break
		case 43:
			controlSpin(data.parts.kimono.outside,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outside,direction,20,9.75,0.5,0.15,data.color.kimono.outside.start,data.color.kimono.outside.end,1)
			controlSpin(data.parts.kimono.outsideTop,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outsideTop,direction,20,9.75,0.5,0.15,data.color.kimono.outside.start,data.color.kimono.outside.end,1)
		break
		case 44:
			displayTrianglesBackMerge(layer,data.parts.kimono.outside,direction,20,9,0.5,0.15,data.color.kimono.outsideBack.start,data.color.kimono.outsideBack.end,1)
		break
		case 45:
			controlSpin(data.parts.kimono.mainDamage,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainDamage,direction,20,10,0.5,0.12,data.color.kimono.main.start,data.color.kimono.main.end,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.mainAnti,direction,20,10,0.5,0.12,-1,-1,1)
		break
		case 46:
			displayTrianglesBackMerge(layer,data.parts.kimono.mainDamage,direction,20,10,0.5,0.12,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.mainAnti,direction,20,10,0.5,0.12,-1,-1,1)
		break
		case 47:
			controlSpin(data.parts.kimono.outsideDamage,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outsideDamage,direction,20,9.75,0.5,0.15,data.color.kimono.outside.start,data.color.kimono.outside.end,1)
			controlSpin(data.parts.kimono.outsideTop,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outsideTop,direction,20,9.75,0.5,0.15,data.color.kimono.outside.start,data.color.kimono.outside.end,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outsideAnti,direction,20,9.75,0.5,0.15,-1,-1,1)
		break
		case 48:
			displayTrianglesBackMerge(layer,data.parts.kimono.outsideDamage,direction,20,9.75,0.5,0.15,data.color.kimono.outsideBack.start,data.color.kimono.outsideBack.end,1)
			displayTrianglesBackMerge(layer,data.parts.kimono.outsideAnti,direction,20,9.75,0.5,0.15,-1,-1,1)
		break
		case 49:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFront(layer,data.parts.hair.inside,direction,0,33,1,-0.05,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,35,1,-0.05,data.color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
			controlSpin(data.parts.hair.reverse,direction,0)
			displayTrianglesFront(layer,data.parts.hair.reverse,direction,0.5,34,0.1,0.1,-1,1)
		break
		case 50:
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,35,1,-0.05,data.color.hair.back,1)
			displayTrianglesFront(layer,data.parts.hair.reverse,direction,0.5,34,0.1,0.1,data.color.hair.back,1)
			displayTrianglesBack(layer,data.parts.hair.inside,direction,0,33,1,-0.05,data.color.hair.insideBack,1)
		break
		case 51:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFront(layer,data.parts.hair.inside,direction,0,33,1,-0.025,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,35,1,-0.025,data.color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
			controlSpin(data.parts.hair.reverse,direction,0)
			displayTrianglesFront(layer,data.parts.hair.reverse,direction,0.5,34,0.1,0.1,-1,1)
		break
		case 52:
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,35,1,-0.025,data.color.hair.back,1)
			displayTrianglesFront(layer,data.parts.hair.reverse,direction,0.5,34,0.1,0.1,data.color.hair.back,1)
			displayTrianglesBack(layer,data.parts.hair.inside,direction,0,33,1,-0.025,data.color.hair.insideBack,1)
		break
		case 53:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFront(layer,data.parts.hair.inside,direction,0,33,1,-0.06,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,35,1,-0.03,data.color.hair.front,1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
		break
		case 54:
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,35,1,-0.06,data.color.hair.back,1)
			displayTrianglesBack(layer,data.parts.hair.inside,direction,0,33,1,-0.03,data.color.hair.insideBack,1)
		break
		case 55:
			for(let g=0,lg=data.parts.tail[0].length;g<lg;g++){
				controlSpin(data.parts.tail[0][g][0],direction,0)
				controlSpin(data.parts.tail[0][g][1],direction,0)
				layer.translate(sin(direction*6+g*135)*0.3,0)
				displayTrianglesFrontMerge(layer,data.parts.tail[0][g][0],direction,24-g*5,4,1,0.48,
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,g/lg),cos(direction+data.spin.tail[0])*20,[1,1,1]),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(g+1)/lg),cos(direction+data.spin.tail[0])*20,[1,1,1]),1),
				displayTrianglesFrontMerge(layer,data.parts.tail[0][g][1],direction,24-g*5,4,1,-0.48,
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,g/lg),cos(direction+data.spin.tail[0])*20,[1,1,1]),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(g+1)/lg),cos(direction+data.spin.tail[0])*20,[1,1,1]),1)
				layer.translate(sin(direction*6+g*135)*-0.3,0)
			}
		break
		case 56:
			for(let g=0,lg=data.parts.tail[0].length;g<lg;g++){
				controlSpin(data.parts.tail[1][g][0],direction,0)
				controlSpin(data.parts.tail[1][g][1],direction,0)
				layer.translate(sin(direction*6+g*135)*0.3,0)
				displayTrianglesFrontMerge(layer,data.parts.tail[1][g][0],direction,24-g*5,4,1,0.48,
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,g/lg),cos(direction+data.spin.tail[1])*20,[1,1,1]),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(g+1)/lg),cos(direction+data.spin.tail[1])*20,[1,1,1]),1),
				displayTrianglesFrontMerge(layer,data.parts.tail[1][g][1],direction,24-g*5,4,1,-0.48,
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,g/lg),cos(direction+data.spin.tail[1])*20,[1,1,1]),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(g+1)/lg),cos(direction+data.spin.tail[1])*20,[1,1,1]),1)
				layer.translate(sin(direction*6+g*135)*-0.3,0)
			}
		break
		case 57:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFront(layer,data.parts.hair.inside,direction,0,32,1,-0.25,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,34,1,-0.125,data.color.hair.front,1)
			layer.arc(0,0,34,33,-180,0)
			layer.line(-17,0,17,0)
		break
		case 58:
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,34,1,-0.25,data.color.hair.back,1)
			displayTrianglesBack(layer,data.parts.hair.inside,direction,0,32,1,-0.125,data.color.hair.insideBack,1)
		break
		case 59:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFront(layer,data.parts.hair.inside,direction,0,33,1,0.02,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFront(layer,data.parts.hair.main,direction,0,34,1,0.01,data.color.hair.front,1)
			layer.noStroke()
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
			controlSpin(data.parts.hair.reverse,direction,0)
			displayTrianglesFront(layer,data.parts.hair.reverse,direction,0.5,35.25-3*lcos(direction),0.1,0.1,-1,1)
		break
		case 60:
			displayTrianglesBack(layer,data.parts.hair.main,direction,0,34,1,0.02,data.color.hair.back,1)
			displayTrianglesBack(layer,data.parts.hair.reverse,direction,0.5,33,0.1,0.1,data.color.hair.back,1)
			displayTrianglesBack(layer,data.parts.hair.inside,direction,0,33,1,0.01,data.color.hair.insideBack,1)
		break
		case 61:
			layer.stroke(174,160,167)
			layer.strokeWeight(1.6)
			layer.line(lsin(direction*6+270)*0.6-2.7,13.25,lsin(direction*6+135)*0.6+2.4,15.75)
			layer.line(lsin(direction*6+135)*0.6-2.1,18.25,lsin(direction*6)*0.6+1.8,20.75)
			layer.stroke(241,240,245)
			layer.strokeWeight(1.2)
			layer.line(lsin(direction*6+270)*0.6-2.7,13.25,lsin(direction*6+135)*0.6+2.4,15.75)
			layer.line(lsin(direction*6+135)*0.6-2.1,18.25,lsin(direction*6)*0.6+1.8,20.75)
			for(let g=0,lg=data.parts.tail.length;g<lg;g++){
				controlSpin(data.parts.tail[g][0],direction,0)
				controlSpin(data.parts.tail[g][1],direction,0)
				layer.translate(lsin(direction*6+g*135)*0.6,0)
				displayTrianglesFrontMerge(layer,data.parts.tail[g][0],direction,22-g*5,2.8+min(g,4)*0.35-(g==3?0.8:0),1,0.35*(0.7+min(g,4)*0.1-(g==3?0.2:0)),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,g/lg),lcos(direction+data.spin.tail)*20,[0,1,1]),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(g+1)/lg),lcos(direction+data.spin.tail)*20,[0,1,1]),1),
				displayTrianglesFrontMerge(layer,data.parts.tail[g][1],direction,22-g*5,2.8+min(g,4)*0.35-(g==3?0.8:0),1,-0.35*(0.7+min(g,4)*0.1-(g==3?0.2:0)),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,g/lg),lcos(direction+data.spin.tail)*20,[0,1,1]),
					upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(g+1)/lg),lcos(direction+data.spin.tail)*20,[0,1,1]),1)
				layer.translate(lsin(direction*6+g*135)*-0.6,0)
			}
			layer.noStroke()
			layer.fill(221,215,219)
			layer.rect(lsin(direction*6+225)*0.2,7,4.8,5)
			layer.fill(83,99,115)
			layer.rect(lsin(direction*6+225)*0.2,5.3,4.8,0.5)
			layer.rect(lsin(direction*6+225)*0.2,8.7,4.8,0.5)
			layer.stroke(174,160,167)
			layer.strokeWeight(1.6)
			layer.line(lsin(direction*6+270)*0.6-2.7,13.25,lsin(direction*6+270)*0.6+2.4,10.75)
			layer.line(lsin(direction*6+135)*0.6-2.1,18.25,lsin(direction*6+135)*0.6+2.4,15.75)
			layer.line(lsin(direction*6)*0.6,22,lsin(direction*6)*0.6+1.8,20.75)
			layer.stroke(241,240,245)
			layer.strokeWeight(1.2)
			layer.line(lsin(direction*6+270)*0.6-2.7,13.25,lsin(direction*6+270)*0.6+2.4,10.75)
			layer.line(lsin(direction*6+135)*0.6-2.1,18.25,lsin(direction*6+135)*0.6+2.4,15.75)
			layer.line(lsin(direction*6)*0.6,22,lsin(direction*6)*0.6+1.8,20.75)
			layer.stroke(213,157,175)
			layer.strokeWeight(0.8)
			layer.point(lsin(direction*6)*0.6,22)
		break
		case 62:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.inside,direction,0,31,1,0.15,data.color.hair.insideFront,data.color.hair.insideFront,1)
			layer.fill(...data.color.hair.front)
			layer.stroke(...data.color.hair.front)
			layer.strokeWeight(1)
			layer.arc(0,0,33,32,-180,0)
			layer.line(-16.5,0,16.5,0)
			controlSpin(data.parts.hair.reverse,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.reverse,direction,0.5,34.5,0.1,0.1,-1,-1,1)
			layer.noErase()
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.main,direction,0,33,1,0.15,data.color.hair.front,data.color.hair.front,1)
			layer.erase()
			layer.noFill()
			layer.stroke(0)
			layer.strokeWeight(3)
			layer.arc(0,0,37,36,-180,0)
		break
		case 63:
			layer.fill(...data.color.hair.front)
			layer.stroke(...data.color.hair.front)
			layer.strokeWeight(1)
			layer.arc(0,0,33,32,-180,0)
			layer.line(-16.5,0,16.5,0)
			displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,33,1,0.15,data.color.hair.back,data.color.hair.back,1)
			displayTrianglesBackMerge(layer,data.parts.hair.inside,direction,0,31,1,0.15,data.color.hair.insideBack,data.color.hair.insideBack,1)
			layer.erase()
			layer.noFill()
			layer.stroke(0)
			layer.strokeWeight(3)
			layer.arc(0,0,37,36,-180,0)
		break
		case 64:
			controlSpin(data.parts.kimono.main,direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.main,direction,20,8.5,0.5,0.12,data.color.kimono.main.start,data.color.kimono.main.end,1)
		break
		case 65:
			displayTrianglesBackMerge(layer,data.parts.kimono.main,direction,20,8.5,0.5,0.12,data.color.kimono.mainBack.start,data.color.kimono.mainBack.end,1)
		break
		case 66:
			controlSpin(data.parts.kimono.outside[0],direction,1)
			controlSpin(data.parts.kimono.outside[1],direction,1)
			displayTrianglesFrontMerge(layer,data.parts.kimono.outside[0],direction,20,9,0.5,0.15,data.color.kimono.outside.start,mergeColor(data.color.kimono.outside.start,data.color.kimono.outside.end,0.5),1)
			for(let g=0,lg=data.parts.kimono.decoration[0].length;g<lg;g++){
				let element=data.parts.kimono.decoration[0][g]
				if(lcos(element.spin+direction)>0){
					layer.push()
					layer.translate(
						(4.5+element.y*0.15)*lsin(element.spin+direction),
						20+element.y
					)
					layer.rotate(-12*lsin(element.spin+direction))
					layer.scale(
						0.1*element.size*lcos(element.spin+direction),
						0.1*element.size
					)
					layer.rotate(element.rotate)
					switch(element.type){
						case 0:
							layer.noStroke()
							layer.fill(...data.color.kimono.decoration[0])
							for(let a=0,la=5;a<la;a++){
								layer.beginShape()
								layer.vertex(0,0)
								layer.bezierVertex(-3,-2,-3,-6,-2,-8)
								layer.vertex(0,-6)
								layer.vertex(2,-8)
								layer.bezierVertex(3,-6,3,-2,0,0)
								layer.endShape()
								layer.rotate(360/la)
							}
						break
						case 1:
							layer.noStroke()
							layer.fill(...data.color.kimono.decoration[1])
							for(let a=0,la=5;a<la;a++){
								layer.beginShape()
								layer.vertex(0,0)
								layer.bezierVertex(-3,-3,-3,-6,-3,-8)
								layer.vertex(-1.5,-6)
								layer.vertex(0,-8)
								layer.vertex(1.5,-6)
								layer.vertex(3,-8)
								layer.bezierVertex(3,-6,3,-3,0,0)
								layer.endShape()
								layer.rotate(360/la)
							}
						break
						case 2:
							layer.noFill()
							layer.stroke(...data.color.kimono.decoration[2])
							layer.strokeWeight(0.4)
							for(let a=0,la=5;a<la;a++){
								layer.beginShape()
								layer.vertex(0,0)
								layer.bezierVertex(-2.5,-4,-4,-8,-2.5,-11)
								layer.vertex(-1,-9.5)
								layer.endShape()
								layer.beginShape()
								layer.vertex(0,0)
								layer.bezierVertex(2.5,-4,4,-8,2.5,-11)
								layer.vertex(1,-9.5)
								layer.endShape()
								layer.rotate(360/la)
							}
						break
					}
					layer.pop()
				}
			}
			displayTrianglesFrontMerge(layer,data.parts.kimono.outside[1],direction,20,9,0.5,0.15,mergeColor(data.color.kimono.outside.start,data.color.kimono.outside.end,0.5),data.color.kimono.outside.end,1)
			for(let g=0,lg=data.parts.kimono.decoration[1].length;g<lg;g++){
				let element=data.parts.kimono.decoration[1][g]
				if(lcos(element.spin+direction)>0){
					layer.push()
					layer.translate(
						(4.5+element.y*0.15)*lsin(element.spin+direction),
						20+element.y
					)
					layer.rotate(-12*lsin(element.spin+direction))
					layer.scale(
						0.1*element.size*lcos(element.spin+direction),
						0.1*element.size
					)
					layer.rotate(element.rotate)
					switch(element.type){
						case 0:
							layer.noStroke()
							layer.fill(...data.color.kimono.decoration[0])
							for(let a=0,la=5;a<la;a++){
								layer.beginShape()
								layer.vertex(0,0)
								layer.bezierVertex(-3,-3,-3,-6,-3,-8)
								layer.vertex(-1.5,-6)
								layer.vertex(0,-8)
								layer.vertex(1.5,-6)
								layer.vertex(3,-8)
								layer.bezierVertex(3,-6,3,-3,0,0)
								layer.endShape()
								layer.rotate(360/la)
							}
						break
						case 1:
							layer.noStroke()
							layer.fill(...data.color.kimono.decoration[1])
							for(let a=0,la=5;a<la;a++){
								layer.beginShape()
								layer.vertex(0,0)
								layer.bezierVertex(-3,-2,-3,-6,-2,-8)
								layer.vertex(0,-6)
								layer.vertex(2,-8)
								layer.bezierVertex(3,-6,3,-2,0,0)
								layer.endShape()
								layer.rotate(360/la)
							}
						break
						case 2:
							layer.noFill()
							layer.stroke(...data.color.kimono.decoration[2])
							layer.strokeWeight(0.4)
							for(let a=0,la=5;a<la;a++){
								layer.beginShape()
								layer.vertex(0,0)
								layer.bezierVertex(-2.5,-4,-4,-8,-2.5,-11)
								layer.vertex(-1,-9.5)
								layer.endShape()
								layer.beginShape()
								layer.vertex(0,0)
								layer.bezierVertex(2.5,-4,4,-8,2.5,-11)
								layer.vertex(1,-9.5)
								layer.endShape()
								layer.rotate(360/la)
							}
						break
					}
					layer.pop()
				}
			}
			layer.fill(...data.color.kimono.top)
			layer.stroke(...data.color.kimono.top)
			layer.strokeWeight(0.5)
			layer.quad(-4.5,20,4.5,20,4.65,21,-4.65,21)
		break
		case 67:
			displayTrianglesBackMerge(layer,data.parts.kimono.outside[0],direction,20,9,0.5,0.15,data.color.kimono.outsideBack.start,mergeColor(data.color.kimono.outsideBack.start,data.color.kimono.outsideBack.end,0.5),1)
			displayTrianglesBackMerge(layer,data.parts.kimono.outside[1],direction,20,9,0.5,0.15,mergeColor(data.color.kimono.outsideBack.start,data.color.kimono.outsideBack.end,0.5),data.color.kimono.outsideBack.end,1)
		break
		case 68:
			layer.fill(...data.color.hair.front)
			layer.stroke(...data.color.hair.front)
			layer.strokeWeight(1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.main,direction,0,35,1,-0.0225,data.color.hair.front,data.color.hair.front,1)
			controlSpin(data.parts.hair.reverse,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.reverse,direction,1,34.5,0.1,0.1,-1,-1,1)
			layer.noErase()
		break
		case 69:
			displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,35,1,-0.045,data.color.hair.back,data.color.hair.back,1)
		break
		case 70:
			layer.fill(...data.color.hair.insideFront)
			layer.stroke(...data.color.hair.insideFront)
			layer.strokeWeight(1)
			layer.arc(0,0,34,33,-180,0)
			layer.line(-17.5,0,17.5,0)
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.inside,direction,0,35,1,-0.0225,data.color.hair.insideFront,data.color.hair.insideFront,1)
			controlSpin(data.parts.hair.reverseInside,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.reverseInside,direction,1,34.5,0.1,0.1,-1,-1,1)
			layer.noErase()
		break
		case 71:
			displayTrianglesBackMerge(layer,data.parts.hair.inside,direction,0,35,1,-0.045,data.color.hair.insideBack,data.color.hair.insideBack,1)
		break
		case 72:
			layer.fill(...data.color.hair.front)
			layer.stroke(...data.color.hair.front)
			layer.strokeWeight(1)
			layer.arc(0,0,34,34,-180,0)
			layer.line(-17,0,17,0)
			controlSpin(data.parts.hair.reverse,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.reverse,direction,0.5,33.5,0.1,0.15,-1,-1,1)
			layer.noErase()
			controlSpin(data.parts.hair.main,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.main,direction,0,34,1,-0.025,data.color.hair.front,data.color.hair.front,1)
			layer.erase()
			layer.noFill()
			layer.stroke(0)
			layer.strokeWeight(3)
			layer.arc(0,0,38,38,-180,0)
			layer.line(-19,0,-19,10)
			layer.line(19,0,19,10)
		break
		case 73:
			layer.fill(...data.color.hair.back)
			layer.stroke(...data.color.hair.back)
			layer.strokeWeight(1)
			layer.arc(0,0,35,34,-180,0)
			layer.line(-17.5,0,17.5,0)
			displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,34,1,-0.025,data.color.hair.back,data.color.hair.back,1)
			displayTrianglesBackMerge(layer,data.parts.hair.inside,direction,0,33.5,1,-0.025,data.color.hair.insideBack,data.color.hair.insideBack,1)
			layer.erase()
			layer.noFill()
			layer.stroke(0)
			layer.strokeWeight(3)
			layer.arc(0,0,38,38,-180,0)
			layer.line(-19,0,-19,10)
			layer.line(19,0,19,10)
		break
		case 74:
			controlSpin(data.parts.hair.inside,direction,0)
			displayTrianglesFrontMerge(layer,data.parts.hair.inside,direction,0,33.5,1,-0.025,data.color.hair.insideFront,data.color.hair.insideFront,1)
			layer.erase()
			layer.noFill()
			layer.stroke(0)
			layer.strokeWeight(3)
			layer.arc(0,0,38,38,-180,0)
			layer.line(-19,0,-19,10)
			layer.line(19,0,19,10)
		break
		case 75:
			layer.fill(...data.color.jacket.main)
			layer.arc(0,0,13.5,52,-180,0)
			layer.quad(-6.75,0,6.75,0,7.25,4,-7.25,4)
			layer.arc(0,4,14.5,2,0,180)

			layer.erase()
			layer.noFill()
			layer.stroke(0)
			layer.strokeWeight(3)
			for(let a=0,la=3;a<la;a++){
				let spin=[-20,0,20][a]
				if(lcos(direction+spin)>0){
					if(lsin(direction+spin)>0){
						layer.arc(0,5,14.5*lsin(direction+spin),58,-90,0)
					}else if(lsin(direction+spin)<0){
						layer.arc(0,5,14.5*lsin(direction+spin),58,-180,-90)
					}else{
						layer.line(0,5,0,-24)
					}
				}
			}
			layer.fill(0)
			layer.noStroke()
			layer.ellipse(0,-24,12,5)
			
			let layer2=createGraphics(100,250)
			setupLayer(layer2)
			layer2.translate(50,125)
			layer2.scale(5)

			layer2.fill(...data.color.jacket.detail)
			for(let a=0,la=18;a<la;a++){
				let ls=lsin((a+0.5)/la*360+direction)
				let lc=lcos((a+0.5)/la*360+direction)
				if(a>=2&&a<16&&lc>0){
					layer2.rect(7.25*ls,2.5+lc,lc*0.4,2)
					layer2.triangle(
						7.25*ls-lc*0.2,
						2.25+lc,
						7.25*ls-lc*0.2,
						0.25+lc,
						7.25*ls+lc*0.6,
						2.25+lc,
					)
				}
			}

			layer2.noFill()
			layer2.stroke(...data.color.jacket.detail)
			layer2.strokeWeight(0.4)
			layer2.arc(0,3.5,14.5,2,0,180)

			layer2.strokeWeight(4.4)
			for(let a=0,la=2;a<la;a++){
				let spin=[-20,20][a]
				if(lcos(direction+spin)>0&&abs(14.5*lsin(direction+spin*2))<12){
					if(lsin(direction+spin)>0){
						layer2.arc(0,5,14.5*lsin(direction+spin),58,-90,0)
					}else if(lsin(direction+spin)<0){
						layer2.arc(0,5,14.5*lsin(direction+spin),58,-180,-90)
					}else{
						layer2.line(0,5,0,-23.5)
					}
				}
			}

			layer2.erase()
			layer2.stroke(0)
			layer2.strokeWeight(3.6)
			for(let a=0,la=3;a<la;a++){
				let spin=[-20,0,20][a]
				if(lcos(direction+spin)>0){
					if(lsin(direction+spin)>0){
						layer2.arc(0,5,14.5*lsin(direction+spin),58,-90,0)
						layer2.line(7.25*lsin(direction+spin),5,7.25*lsin(direction+spin),8)
					}else if(lsin(direction+spin)<0){
						layer2.arc(0,5,14.5*lsin(direction+spin),58,-180,-90)
						layer2.line(7.25*lsin(direction+spin),5,7.25*lsin(direction+spin),8)
					}else{
						layer2.line(0,8,0,-23.5)
					}
				}
			}
			layer2.strokeCap(SQUARE)
			layer2.arc(0,0,17.1,55.6,-180,0)
			layer2.line(-8.7,0,-9.1,4)
			layer2.line(8.7,0,9.1,4)
			layer2.strokeCap(ROUND)

			layer2.strokeWeight(20)
			layer2.arc(0,3.5,48,22.4,0,180)
			layer2.fill(0)
			layer2.noStroke()
			layer2.ellipse(0,-24,12,5)


			layer.image(layer2,-10,-25,20,50)
		break
		case 76:
			layer.stroke(...data.color.wing[1])
			layer.strokeWeight(0.5)
			let nodes=[
				[0,0],
				[-20,-5],
				[-35,-15],
				[-40,-30]
			]
			let lengths=[]
			let totalLength=0
			for(let a=0,la=nodes.length-1;a<la;a++){
				layer.line(nodes[a][0],nodes[a][1],nodes[a+1][0],nodes[a+1][1])
				lengths.push(dist(nodes[a][0],nodes[a][1],nodes[a+1][0],nodes[a+1][1]))
				totalLength+=dist(nodes[a][0],nodes[a][1],nodes[a+1][0],nodes[a+1][1])
			}
			for(let a=0,la=nodes.length-1;a<la;a++){
				for(let b=0,lb=round(lengths[a]*2);b<lb;b++){
					layer.stroke(...mergeColor(data.color.wing[0],data.color.wing[1],random(0.5,1)))
					let rand=random(0.2,0.8)
					layer.strokeWeight(random(0.8,1.2))
					layer.point(
						map((b+rand)/lb,0,1,nodes[a][0],nodes[a+1][0]),
						map((b+rand)/lb,0,1,nodes[a][1],nodes[a+1][1])
					)
				}
			}
			layer.strokeWeight(0.6)
			layer.noStroke()
			for(let a=0,la=600;a<la;a++){
				let part=0
				let prePosition=a*2%totalLength
				let position=prePosition
				while(position>lengths[part]){
					position-=lengths[part]
					part++
				}
				let dir=map(
					position/lengths[part]*(part==lengths.length-1?1.8:1),0,1,
					part==0?-75:atan2(nodes[part][0]-nodes[part-1][0],nodes[part][1]-nodes[part-1][1]),
					atan2(nodes[part+1][0]-nodes[part][0],nodes[part+1][1]-nodes[part][1])
				)
				let size=random(0.4,0.8)+(prePosition/totalLength)**2.5*2
				let offset=random(4,6)-a/la*4
				layer.fill(...mergeColor(data.color.wing[0],data.color.wing[1],random(0,0.2)+a/la*0.8))
				layer.push()
				layer.translate(
					map(position,0,lengths[part],nodes[part][0],nodes[part+1][0]),
					map(position,0,lengths[part],nodes[part][1],nodes[part+1][1])
				)
				layer.rotate(-dir-90)
				layer.beginShape()
				layer.vertex(-0.2,-0.25+offset*0.1)
				layer.bezierVertex(
					-1.2*(0.5+size*0.5),(4+offset)*size,
					-0.6*(0.5+size*0.5),(5+offset)*size,
					0,(6+offset)*size,
				)
				layer.bezierVertex(
					0.6*(0.5+size*0.5),(5+offset)*size,
					1.2*(0.5+size*0.5),(4+offset)*size,
					0.2,-0.25+offset*0.1
				)
				layer.endShape()
				layer.pop()
			}
		break
		
	}
	//mark s
}
function setupCombatantGraphics(type){
	let data
	switch(type){
		case 0:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{back:[],front:[]},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]},mainDamage:{back:[],front:[]},outsideDamage:{back:[],front:[]}}},
				parts:{kimono:{main:[],outside:[],outsideTop:[],mainDamage:[],outsideDamage:[],mainAnti:[],outsideAnti:[]}},
				color:{
					hair:{back:[30,70,40],front:[40,90,50],insideBack:[25,60,35],insideFront:[35,80,45],glow:[50,110,60]},
					skin:{head:[255,225,200],body:[255,215,190],legs:[255,215,190],arms:[255,215,190],button:[245,180,145]},
					eye:{back:[40,70,45],front:[10,30,15],glow:[175,255,175]},
					under:{outside:[50,125,50],fringe:[100,200,100],tanga:[200,210,200],bow:[200,255,200],decoration:[50,175,50],under:{top:[250,195,170],button:[200,145,120],bottom:[[255,228,181],[241,178,131]]}},
					kimono:{main:{start:[90,110,105],end:[150,170,165]},mainBack:{start:[30,60,40],end:[70,100,80]},decoration:{back:[[25,100,25],[50,125,50]],front:[[75,175,75],[100,250,100]]},
					outside:{start:[110,180,120],end:[115,215,180]},outsideBack:{start:[70,120,80],end:[75,155,140]},
					bow:[125,225,175]},
					band:[[100,165,100],[150,200,150],[100,225,100]],mouth:{in:[225,125,125],out:[0,0,0]},
				}
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={
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
		
			data.sprites.genAmount=360/data.sprites.detail

			for(let g=0;g<5;g++){
				data.parts.kimono.main.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,13.5+g*4.5]})
				data.parts.kimono.main.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[13.5+g*4.5,0,14+g*4.5]})
				data.parts.kimono.main.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,16+g*4.5,14+g*4.5]})
				data.parts.kimono.main.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,16+g*4.5]})
				data.parts.kimono.main.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[16+g*4.5,0,15.5+g*4.5]})
				data.parts.kimono.main.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,18+g*4.5,15.5+g*4.5]})
			}
			data.parts.kimono.main.push({spin:[117,132,132],y:[0,0,36]})
			for(let g=0;g<2;g++){
				data.parts.kimono.main.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,34,36+g*0.5]})
				data.parts.kimono.main.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,34]})
				data.parts.kimono.main.push({spin:[146+g*48,156+g*48,156+g*48],y:[34,0,35]})
				data.parts.kimono.main.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,34,35]})
				data.parts.kimono.main.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,34]})
				data.parts.kimono.main.push({spin:[166+g*48,180+g*48,180+g*48],y:[34,0,36.5-g*0.5]})
			}
			data.parts.kimono.main.push({spin:[228,243,228],y:[0,0,36]})
			for(let g=4;g>=-3;g--){
				data.parts.kimono.main.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,18+g*4.5,15.5+g*4.5]})
				data.parts.kimono.main.push({spin:[84-g*48,75-g*48,72-g*48],y:[16+g*4.5,0,15.5+g*4.5]})
				data.parts.kimono.main.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,16+g*4.5]})
				data.parts.kimono.main.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,16+g*4.5,14+g*4.5]})
				data.parts.kimono.main.push({spin:[108-g*48,92-g*48,87-g*48],y:[13.5+g*4.5,0,14+g*4.5]})
				data.parts.kimono.main.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,13.5+g*4.5]})
			}
			for(let g=1;g<5;g++){
				data.parts.kimono.outside.push({spin:[-90+g*48,-36+g*48,-48+g*48],y:[0,0,16+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[-48+g*48,-32+g*48,-27+g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[-32+g*48,-24+g*48,-27+g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[-32+g*48,-8+g*48,-24+g*48],y:[0,0,17.5+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[-24+g*48,-15+g*48,-12+g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[-15+g*48,g*48,-12+g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
			}
			for(let g=4;g>=0;g--){
				data.parts.kimono.outside.push({spin:[15-g*48,-g*48,12-g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[24-g*48,15-g*48,12-g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[32-g*48,8-g*48,24-g*48],y:[0,0,17.5+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[32-g*48,24-g*48,27-g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[48-g*48,32-g*48,27-g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
				data.parts.kimono.outside.push({spin:[60-g*48,36-g*48,48-g*48],y:[0,0,16+g*5.5-15]})
			}
			for(let g=0;g<12;g++){
				data.parts.kimono.outsideTop.push({spin:[-90-g*30,-60-g*30,-75-g*30],y:[0,0,-0.5]})
			}
			if(options.damage){
				for(let g=0;g<5;g++){
					data.parts.kimono.mainDamage.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,13.5+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[13.5+g*4.5,0,14+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,16+g*4.5,14+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,16+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[16+g*4.5,0,15.5+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,18+g*4.5,15.5+g*4.5]})
				}
				data.parts.kimono.mainDamage.push({spin:[117,132,132],y:[0,0,36]})
				for(let g=0;g<2;g++){
					data.parts.kimono.mainDamage.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,34,36+g*0.5]})
					data.parts.kimono.mainDamage.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,34]})
					data.parts.kimono.mainDamage.push({spin:[146+g*48,156+g*48,156+g*48],y:[34,0,35]})
					data.parts.kimono.mainDamage.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,34,35]})
					data.parts.kimono.mainDamage.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,34]})
					data.parts.kimono.mainDamage.push({spin:[166+g*48,180+g*48,180+g*48],y:[34,0,36.5-g*0.5]})
				}
				data.parts.kimono.mainDamage.push({spin:[228,243,228],y:[0,0,36]})
				for(let g=4;g>=-3;g--){
					data.parts.kimono.mainDamage.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,18+g*4.5,15.5+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[84-g*48,75-g*48,72-g*48],y:[16+g*4.5,0,15.5+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,16+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,16+g*4.5,14+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[108-g*48,92-g*48,87-g*48],y:[13.5+g*4.5,0,14+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,13.5+g*4.5]})
				}
				for(let g=1;g<5;g++){
					data.parts.kimono.outsideDamage.push({spin:[-90+g*48,-36+g*48,-48+g*48],y:[0,0,16+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-48+g*48,-32+g*48,-27+g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-32+g*48,-24+g*48,-27+g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-32+g*48,-8+g*48,-24+g*48],y:[0,0,17.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-24+g*48,-15+g*48,-12+g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-15+g*48,g*48,-12+g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
				}
				for(let g=4;g>=0;g--){
					data.parts.kimono.outsideDamage.push({spin:[15-g*48,-g*48,12-g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[24-g*48,15-g*48,12-g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[32-g*48,8-g*48,24-g*48],y:[0,0,17.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[32-g*48,24-g*48,27-g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[48-g*48,32-g*48,27-g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[60-g*48,36-g*48,48-g*48],y:[0,0,16+g*5.5-15]})
				}
				for(let g=0,lg=data.parts.kimono.mainDamage.length;g<lg;g++){
					for(let h=0,lh=data.parts.kimono.mainDamage[g].y.length;h<lh;h++){
						data.parts.kimono.mainDamage[g].y[h]=max(0,data.parts.kimono.mainDamage[g].y[h]-(g*4+h*1.5)**1.25%6)
					}
				}
				for(let g=0,lg=data.parts.kimono.outsideDamage.length;g<lg;g++){
					for(let h=0,lh=data.parts.kimono.outsideDamage[g].y.length;h<lh;h++){
						data.parts.kimono.outsideDamage[g].y[h]=max(0,data.parts.kimono.outsideDamage[g].y[h]-(g*4+h*1.5)**1.5%6)
					}
				}
				for(let g=0;g<18;g++){
					data.parts.kimono.mainAnti.push({spin:[-96-g*20,-64-g*20,-80-g*20],y:[-1,-1,6+((g+2)**3%6)/2-lcos(-80-g*20)*5]})
				}
				for(let g=0;g<12;g++){
					data.parts.kimono.outsideAnti.push({spin:[-84-g*30,-36-g*30,-60-g*30],y:[-1,-1,6+((g+1)**2%6)/2-lcos(-60-g*30)*5]})
				}
				data.parts.kimono.outsideAnti.push({spin:[-36,36,0],y:[-1,-1,11]})
			}
			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(250,500))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(125,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],0,g*data.sprites.detail)
				//console.log('Generated L-HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(250,500))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(125,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],1,g*data.sprites.detail)
				//console.log('Generated L-HB-'+(g+1))
			}
			data.sprites.kimono.main={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.kimono.main.front.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.main.front[g])
				data.sprites.kimono.main.front[g].translate(75,0)
				data.sprites.kimono.main.front[g].scale(5)
				generateSprite(data.sprites.kimono.main.front[g],2,g*data.sprites.detail)
				//console.log('Generated L-KMF-'+(g+1))
				data.sprites.kimono.main.back.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.main.back[g])
				data.sprites.kimono.main.back[g].translate(75,0)
				data.sprites.kimono.main.back[g].scale(5)
				generateSprite(data.sprites.kimono.main.back[g],3,g*data.sprites.detail)
				//console.log('Generated L-KMB-'+(g+1))
			}
			data.sprites.kimono.outside={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.kimono.outside.front.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.outside.front[g])
				data.sprites.kimono.outside.front[g].translate(75,0)
				data.sprites.kimono.outside.front[g].scale(5)
				generateSprite(data.sprites.kimono.outside.front[g],4,g*data.sprites.detail)
				//console.log('Generated L-KOF-'+(g+1))
				data.sprites.kimono.outside.back.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.outside.back[g])
				data.sprites.kimono.outside.back[g].translate(75,0)
				data.sprites.kimono.outside.back[g].scale(5)
				generateSprite(data.sprites.kimono.outside.back[g],5,g*data.sprites.detail)
				//console.log('Generated L-KOB-'+(g+1))
			}
			if(options.damage){
				data.sprites.kimono.mainDamage={front:[],back:[]}
				for(let g=0;g<data.sprites.genAmount;g++){
					data.sprites.kimono.mainDamage.front.push(createGraphics(150,330))
					setupLayer(data.sprites.kimono.mainDamage.front[g])
					data.sprites.kimono.mainDamage.front[g].translate(75,0)
					data.sprites.kimono.mainDamage.front[g].scale(5)
					generateSprite(data.sprites.kimono.mainDamage.front[g],6,g*data.sprites.detail)
					//console.log('Generated L-DMF-'+(g+1))
					data.sprites.kimono.mainDamage.back.push(createGraphics(150,330))
					setupLayer(data.sprites.kimono.mainDamage.back[g])
					data.sprites.kimono.mainDamage.back[g].translate(75,0)
					data.sprites.kimono.mainDamage.back[g].scale(5)
					generateSprite(data.sprites.kimono.mainDamage.back[g],7,g*data.sprites.detail)
					//console.log('Generated L-DMB-'+(g+1))
				}
				data.sprites.kimono.outsideDamage={front:[],back:[]}
				for(let g=0;g<data.sprites.genAmount;g++){
					data.sprites.kimono.outsideDamage.front.push(createGraphics(150,330))
					setupLayer(data.sprites.kimono.outsideDamage.front[g])
					data.sprites.kimono.outsideDamage.front[g].translate(75,0)
					data.sprites.kimono.outsideDamage.front[g].scale(5)
					generateSprite(data.sprites.kimono.outsideDamage.front[g],8,g*data.sprites.detail)
					//console.log('Generated L-DOF-'+(g+1))
					data.sprites.kimono.outsideDamage.back.push(createGraphics(150,330))
					setupLayer(data.sprites.kimono.outsideDamage.back[g])
					data.sprites.kimono.outsideDamage.back[g].translate(75,0)
					data.sprites.kimono.outsideDamage.back[g].scale(5)
					generateSprite(data.sprites.kimono.outsideDamage.back[g],9,g*data.sprites.detail)
					//console.log('Generated L-DOB-'+(g+1))
				}
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
                    kimono:{fringe:[246,215,217],fringeBack:[254,229,243],outsideFringe:[255,234,231],outsideFringeBack:[252,228,223],shadow:[201,137,180],bow:[158,57,60],decoration:{back:[165,92,144],front:[114,40,119]},
                    outside:{start:[245,228,237],end:[235,175,193]},outsideBack:{start:[244,220,232],end:[204,143,185]},
                    main:{start:[232,164,199],end:[255,246,249]},mainBack:{start:[176,108,132],end:[255,228,236]},string:[168,74,94]},
                    wrap:{in:[209,80,84],out:[202,51,60],center:[249,155,138]},
                    necklace:[207,90,101],mouth:{in:[235,146,132],out:[0,0,0]},
                }
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={
				main:[
                    {spin:[5,60,20],height:2},{spin:[-80,-10,-25],height:4},{spin:[-110,-40,-75],height:8},{spin:[-110,-25,-45],height:6},{spin:[0,90,60],height:3},{spin:[25,105,55],height:7},
                    {spin:[-160,-100,-125],height:14},{spin:[-160,-70,-105],height:10},{spin:[-15,5,-5],height:1},{spin:[150,-120,-180],height:21},{spin:[120,-120,-180],height:23},{spin:[160,-120,-160],height:17},
                    {spin:[120,-160,155],height:21},{spin:[60,130,90],height:4},{spin:[75,180,110],height:11},{spin:[105,-140,130],height:16},{spin:[40,110,80],height:6},{spin:[-120,-70,-90],height:9}
                ],inside:[
                ],strand:[-66,66],top:15
			}
			
			data.sprites.genAmount=360/data.sprites.detail
			
			for(let g=0;g<16;g++){
				data.parts.hair.inside.push({spin:[-data.parts.hair.main[g].spin[1],-data.parts.hair.main[g].spin[0],-data.parts.hair.main[g].spin[2]],height:data.parts.hair.main[g].height*0.75})
			}
			for(let g=0;g<5;g++){
				data.parts.kimono.main.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,16+g*5]})
				data.parts.kimono.main.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[16+g*5,0,15.5+g*5]})
				data.parts.kimono.main.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,17.5+g*5,15.5+g*5]})
				data.parts.kimono.main.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,17.5+g*5]})
				data.parts.kimono.main.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[17.5+g*5,0,17+g*5]})
				data.parts.kimono.main.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,21+g*5,17+g*5]})
			}
			data.parts.kimono.main.push({spin:[117,132,132],y:[0,0,41]})
			for(let g=0;g<2;g++){
				data.parts.kimono.main.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,39,41+g]})
				data.parts.kimono.main.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,39]})
				data.parts.kimono.main.push({spin:[146+g*48,156+g*48,156+g*48],y:[39,0,40]})
				data.parts.kimono.main.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,39,40]})
				data.parts.kimono.main.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,39]})
				data.parts.kimono.main.push({spin:[166+g*48,180+g*48,180+g*48],y:[39,0,42-g]})
			}
			data.parts.kimono.main.push({spin:[228,243,228],y:[0,0,41]})
			for(let g=4;g>=-3;g--){
				data.parts.kimono.main.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,21+g*5,17+g*5]})
				data.parts.kimono.main.push({spin:[84-g*48,75-g*48,72-g*48],y:[17.5+g*5,0,17+g*5]})
				data.parts.kimono.main.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,17.5+g*5]})
				data.parts.kimono.main.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,17.5+g*5,15.5+g*5]})
				data.parts.kimono.main.push({spin:[108-g*48,92-g*48,87-g*48],y:[16+g*5,0,15.5+g*5]})
				data.parts.kimono.main.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,16+g*5]})
			}
			for(let g=0;g<15;g++){
				data.parts.kimono.outside.push({spin:[-177+g*24,-159+g*24,-168+g*24],height:3})
				data.parts.kimono.outside.push({spin:[-187+g*24,-173+g*24,-180+g*24],height:1.5})
			}
			for(let g=0;g<9;g++){
				data.parts.kimono.outsideTop.push({spin:[-195+g*40,-165+g*40,-180+g*40],height:-1.5})
				data.parts.kimono.outsideTop.push({spin:[-172+g*40,-148+g*40,-160+g*40],height:-0.75})
			}
			for(let g=0;g<30;g++){
				data.parts.kimono.fringe.push({spin:[-186+g*12,-174+g*12,-180+g*12],height:-2})
				data.parts.kimono.fringe.push({spin:[-186+g*12,-174+g*12,-180+g*12],height:2})
			}
			for(let g=0;g<30;g++){
				data.parts.kimono.outsideFringe.push({spin:[-180+g*12,-168+g*12,-174+g*12],height:-1.5})
				data.parts.kimono.outsideFringe.push({spin:[-180+g*12,-168+g*12,-174+g*12],height:1.5})
			}
			for(let g=0;g<6;g++){
				data.parts.tail.push([[],[]])
				for(let h=0;h<12;h++){
					data.parts.tail[g][0].push({spin:[g*15+h*30-15,g*15+h*30+15,g*15+h*30],y:[0,0,-5]})
					data.parts.tail[g][1].push({spin:[g*15+h*30-15,g*15+h*30+15,g*15+h*30],y:[0,0,5]})
				}
			}
			for(let g=0;g<12;g++){
				data.parts.under.dress.push({spin:[-171+g*30,-159+g*30,-165+g*30],height:5})
				data.parts.under.dress.push({spin:[-189+g*30,-171+g*30,-180+g*30],height:7})
			}
			for(let g=0;g<15;g++){
				data.parts.kimono.shadow.push({spin:[-177+g*24,-159+g*24,-168+g*24],height:3})
				data.parts.kimono.shadow.push({spin:[-187+g*24,-173+g*24,-180+g*24],height:1.5})
			}
			if(options.damage){
				for(let g=0;g<5;g++){
					data.parts.kimono.mainDamage.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,16+g*5]})
					data.parts.kimono.mainDamage.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[16+g*5,0,15.5+g*5]})
					data.parts.kimono.mainDamage.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,17.5+g*5,15.5+g*5]})
					data.parts.kimono.mainDamage.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,17.5+g*5]})
					data.parts.kimono.mainDamage.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[17.5+g*5,0,17+g*5]})
					data.parts.kimono.mainDamage.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,21+g*5,17+g*5]})
				}
				data.parts.kimono.mainDamage.push({spin:[117,132,132],y:[0,0,41]})
				for(let g=0;g<2;g++){
					data.parts.kimono.mainDamage.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,39,41+g]})
					data.parts.kimono.mainDamage.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,39]})
					data.parts.kimono.mainDamage.push({spin:[146+g*48,156+g*48,156+g*48],y:[39,0,40]})
					data.parts.kimono.mainDamage.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,39,40]})
					data.parts.kimono.mainDamage.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,39]})
					data.parts.kimono.mainDamage.push({spin:[166+g*48,180+g*48,180+g*48],y:[39,0,42-g]})
				}
				data.parts.kimono.mainDamage.push({spin:[228,243,228],y:[0,0,41]})
				for(let g=4;g>=-3;g--){
					data.parts.kimono.mainDamage.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,21+g*5,17+g*5]})
					data.parts.kimono.mainDamage.push({spin:[84-g*48,75-g*48,72-g*48],y:[17.5+g*5,0,17+g*5]})
					data.parts.kimono.mainDamage.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,17.5+g*5]})
					data.parts.kimono.mainDamage.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,17.5+g*5,15.5+g*5]})
					data.parts.kimono.mainDamage.push({spin:[108-g*48,92-g*48,87-g*48],y:[16+g*5,0,15.5+g*5]})
					data.parts.kimono.mainDamage.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,16+g*5]})
				}
				for(let g=0;g<15;g++){
					data.parts.kimono.outsideDamage.push({spin:[-177+g*24,-159+g*24,-168+g*24],height:3-(g*4)**1.5%4})
					data.parts.kimono.outsideDamage.push({spin:[-187+g*24,-173+g*24,-180+g*24],height:1.5-(g*4+2)**1.5%4})
				}
				for(let g=0;g<30;g++){
					data.parts.kimono.fringeDamage.push({spin:[-186+g*12+(g*3)**1.75%5,-174+g*12-(g*3)**1.75%5,-180+g*12],height:-2+(g*3)**1.5%1.5})
					data.parts.kimono.fringeDamage.push({spin:[-186+g*12+(g*3)**1.75%5,-174+g*12-(g*3)**1.75%5,-180+g*12],height:2-(g*3+2)**1.5%1.5})
				}
				for(let g=0;g<30;g++){
					data.parts.kimono.outsideFringeDamage.push({spin:[-180+g*12+(g*2.25+1)**1.75%6,-168+g*12-(g*2.25*1)**1.75%6,-174+g*12],height:-1.5+(g*2.5)**1.5%1.25})
					data.parts.kimono.outsideFringeDamage.push({spin:[-180+g*12+(g*2.25+1)**1.75%6,-168+g*12-(g*2.25*1)**1.75%6,-174+g*12],height:1.5-(g*2.5+1.5)**1.5%1.25})
				}
				for(let g=0;g<15;g++){
					data.parts.kimono.shadowDamage.push({spin:[-177+g*24,-159+g*24,-168+g*24],height:3-(g*4)**1.5%4})
					data.parts.kimono.shadowDamage.push({spin:[-187+g*24,-173+g*24,-180+g*24],height:1.5-(g*4+2)**1.5%4})
				}
				for(let g=0,lg=data.parts.kimono.mainDamage.length;g<lg;g++){
					for(let h=0,lh=data.parts.kimono.mainDamage[g].y.length;h<lh;h++){
						data.parts.kimono.mainDamage[g].y[h]=max(0,data.parts.kimono.mainDamage[g].y[h]-(g*4+h*1.5)**1.25%12)
					}
				}
				for(let g=0;g<18;g++){
					data.parts.kimono.mainAnti.push({spin:[-96-g*20,-64-g*20,-80-g*20],y:[-1,-1,5+((g+2)**3%6)/2-lcos(-80-g*20)*5]})
				}
				for(let g=0;g<12;g++){
					data.parts.kimono.outsideAnti.push({spin:[-84-g*30,-36-g*30,-60-g*30],height:-3-((g+2)**2.5%6)/2})
					data.parts.kimono.shadowAnti.push({spin:[-84-g*30,-36-g*30,-60-g*30],height:-3-((g+2)**2.5%6)/2})
				}
				for(let g=0;g<15;g++){
					data.parts.kimono.outsideTopAnti.push({spin:[-90-g*24,-48-g*24,-69-g*24],height:3+((g+1)**2.7%7)/2})
				}
			}

			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(100,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],10,g*data.sprites.detail)
				//console.log('Generated S-HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(100,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],11,g*data.sprites.detail)
				//console.log('Generated S-HB-'+(g+1))
			}
			data.sprites.kimono.main={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.kimono.main.front.push(createGraphics(200,330))
				setupLayer(data.sprites.kimono.main.front[g])
				data.sprites.kimono.main.front[g].translate(100,0)
				data.sprites.kimono.main.front[g].scale(5)
				generateSprite(data.sprites.kimono.main.front[g],12,g*data.sprites.detail)
				//console.log('Generated S-KMF-'+(g+1))
				data.sprites.kimono.main.back.push(createGraphics(200,330))
				setupLayer(data.sprites.kimono.main.back[g])
				data.sprites.kimono.main.back[g].translate(100,0)
				data.sprites.kimono.main.back[g].scale(5)
				generateSprite(data.sprites.kimono.main.back[g],13,g*data.sprites.detail)
				//console.log('Generated S-KMB-'+(g+1))
			}
			data.sprites.kimono.outside={front:[],back:[]}
			for(let g=0;g<24;g++){
				data.sprites.kimono.outside.front.push(createGraphics(150,200))
				setupLayer(data.sprites.kimono.outside.front[g])
				data.sprites.kimono.outside.front[g].translate(75,0)
				data.sprites.kimono.outside.front[g].scale(5)
				generateSprite(data.sprites.kimono.outside.front[g],14,g)
				//console.log('Generated S-KOF-'+(g+1))
				data.sprites.kimono.outside.back.push(createGraphics(150,200))
				setupLayer(data.sprites.kimono.outside.back[g])
				data.sprites.kimono.outside.back[g].translate(75,0)
				data.sprites.kimono.outside.back[g].scale(5)
				generateSprite(data.sprites.kimono.outside.back[g],15,g)
				//console.log('Generated S-KOB-'+(g+1))
			}
			data.sprites.kimono.fringe={front:[],back:[]}
			for(let g=0;g<12;g++){
				data.sprites.kimono.fringe.front.push(createGraphics(150,50))
				setupLayer(data.sprites.kimono.fringe.front[g])
				data.sprites.kimono.fringe.front[g].translate(75,25)
				data.sprites.kimono.fringe.front[g].scale(5)
				generateSprite(data.sprites.kimono.fringe.front[g],16,g)
				//console.log('Generated S-KFF-'+(g+1))
				data.sprites.kimono.fringe.back.push(createGraphics(150,50))
				setupLayer(data.sprites.kimono.fringe.back[g])
				data.sprites.kimono.fringe.back[g].translate(75,25)
				data.sprites.kimono.fringe.back[g].scale(5)
				generateSprite(data.sprites.kimono.fringe.back[g],17,g)
				//console.log('Generated S-KFB-'+(g+1))
			}
			data.sprites.hair.tail=[]
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.tail.push(createGraphics(120,300))
				setupLayer(data.sprites.hair.tail[g])
				data.sprites.hair.tail[g].translate(60,0)
				data.sprites.hair.tail[g].scale(5)
				generateSprite(data.sprites.hair.tail[g],18,g*data.sprites.detail)
				//console.log('Generated S-HT-'+(g+1))
			}
			data.sprites.under.dress={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.under.dress.front.push(createGraphics(150,250))
				setupLayer(data.sprites.under.dress.front[g])
				data.sprites.under.dress.front[g].translate(75,0)
				data.sprites.under.dress.front[g].scale(5)
				generateSprite(data.sprites.under.dress.front[g],19,g*data.sprites.detail)
				//console.log('Generated S-UDF-'+(g+1))
				data.sprites.under.dress.back.push(createGraphics(150,250))
				setupLayer(data.sprites.under.dress.back[g])
				data.sprites.under.dress.back[g].translate(75,0)
				data.sprites.under.dress.back[g].scale(5)
				generateSprite(data.sprites.under.dress.back[g],20,g*data.sprites.detail)
				//console.log('Generated S-UDB-'+(g+1))
			}
			data.sprites.kimono.shadow=[]
			for(let g=0;g<24;g++){
				data.sprites.kimono.shadow.push(createGraphics(150,50))
				setupLayer(data.sprites.kimono.shadow[g])
				data.sprites.kimono.shadow[g].translate(75,0)
				data.sprites.kimono.shadow[g].scale(5)
				generateSprite(data.sprites.kimono.shadow[g],21,g)
				//console.log('Generated S-KS-'+(g+1))
			}
			if(options.damage){
				data.sprites.kimono.mainDamage={front:[],back:[]}
				for(let g=0;g<data.sprites.genAmount;g++){
					data.sprites.kimono.mainDamage.front.push(createGraphics(200,330))
					setupLayer(data.sprites.kimono.mainDamage.front[g])
					data.sprites.kimono.mainDamage.front[g].translate(100,0)
					data.sprites.kimono.mainDamage.front[g].scale(5)
					generateSprite(data.sprites.kimono.mainDamage.front[g],22,g*data.sprites.detail)
					//console.log('Generated S-DMF-'+(g+1))
					data.sprites.kimono.mainDamage.back.push(createGraphics(200,330))
					setupLayer(data.sprites.kimono.mainDamage.back[g])
					data.sprites.kimono.mainDamage.back[g].translate(100,0)
					data.sprites.kimono.mainDamage.back[g].scale(5)
					generateSprite(data.sprites.kimono.mainDamage.back[g],23,g*data.sprites.detail)
					//console.log('Generated S-DMB-'+(g+1))
				}
				data.sprites.kimono.outsideDamage={front:[],back:[]}
				for(let g=0;g<24;g++){
					data.sprites.kimono.outsideDamage.front.push(createGraphics(150,200))
					setupLayer(data.sprites.kimono.outsideDamage.front[g])
					data.sprites.kimono.outsideDamage.front[g].translate(75,0)
					data.sprites.kimono.outsideDamage.front[g].scale(5)
					generateSprite(data.sprites.kimono.outsideDamage.front[g],24,g)
					//console.log('Generated S-DOF-'+(g+1))
					data.sprites.kimono.outsideDamage.back.push(createGraphics(150,200))
					setupLayer(data.sprites.kimono.outsideDamage.back[g])
					data.sprites.kimono.outsideDamage.back[g].translate(75,0)
					data.sprites.kimono.outsideDamage.back[g].scale(5)
					generateSprite(data.sprites.kimono.outsideDamage.back[g],25,g)
					//console.log('Generated S-DOB-'+(g+1))
				}
				data.sprites.kimono.fringeDamage={front:[],back:[]}
				for(let g=0;g<12;g++){
					data.sprites.kimono.fringeDamage.front.push(createGraphics(150,50))
					setupLayer(data.sprites.kimono.fringeDamage.front[g])
					data.sprites.kimono.fringeDamage.front[g].translate(75,25)
					data.sprites.kimono.fringeDamage.front[g].scale(5)
					generateSprite(data.sprites.kimono.fringeDamage.front[g],26,g)
					//console.log('Generated S-DFF-'+(g+1))
					data.sprites.kimono.fringeDamage.back.push(createGraphics(150,50))
					setupLayer(data.sprites.kimono.fringeDamage.back[g])
					data.sprites.kimono.fringeDamage.back[g].translate(75,25)
					data.sprites.kimono.fringeDamage.back[g].scale(5)
					generateSprite(data.sprites.kimono.fringeDamage.back[g],27,g)
					//console.log('Generated S-DFB-'+(g+1))
				}
				data.sprites.kimono.shadowDamage=[]
				for(let g=0;g<24;g++){
					data.sprites.kimono.shadowDamage.push(createGraphics(150,50))
					setupLayer(data.sprites.kimono.shadowDamage[g])
					data.sprites.kimono.shadowDamage[g].translate(75,0)
					data.sprites.kimono.shadowDamage[g].scale(5)
					generateSprite(data.sprites.kimono.shadowDamage[g],28,g)
					//console.log('Generated S-DS-'+(g+1))
				}
			}
		break
		case 2:
			graphics.combatant.push({
				spin:{tail:108},
				sprites:{detail:15,genAmount:0,animDirection:0,temp:0,hair:{back:[],front:[],tail:[]},under:{dress:{back:[],front:[]},dressDamage:{back:[],front:[]}}},
				parts:{under:{dress:[],dressDamage:[],dressAnti:[]}},
				color:{
                    hair:{back:[15,0,30],front:[10,0,20],glow:[40,0,80]},
                    skin:{head:[45,0,90],body:[40,0,80],legs:[35,0,70],arms:[35,0,70]},
                    eye:{back:[255,255,255],front:[50,150,200],glow:[150,200,255]},
                    under:{dress:[50,0,100],dressBack:[30,0,60]},
					mouth:{in:[225,150,125],out:[0,0,0]},
                }
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={
				main:[
					{spin:[165,195,180],height:72},
                    {spin:[135,225,180],height:36},
					{spin:[-135,0,-90],height:4},
					{spin:[0,135,90],height:4},
					{spin:[-165,-75,-120],height:8},
					{spin:[75,165,120],height:8},
					{spin:[-180,-105,-150],height:16},
					{spin:[105,180,150],height:16},
                ],
			}
			
			data.sprites.genAmount=360/data.sprites.detail
			
			for(let g=0;g<12;g++){
				data.parts.under.dress.push({spin:[-171+g*30,-159+g*30,-165+g*30],height:5})
				data.parts.under.dress.push({spin:[-189+g*30,-171+g*30,-180+g*30],height:7})
			}
			if(options.damage){
				for(let g=0;g<12;g++){
					data.parts.under.dressDamage.push({spin:[-171+g*30,-159+g*30,-165+g*30],height:5-random(0,3)})
					data.parts.under.dressDamage.push({spin:[-189+g*30,-171+g*30,-180+g*30],height:7-random(0,5)})
				}
				for(let g=0;g<10;g++){
					data.parts.under.dressAnti.push({spin:[-96-g*36,-52-g*36,-74-g*36],y:[-1,-1,3+((g+2)**3%5)/2-lcos(-80-g*20)*2]})
				}
			}
			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(100,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],35,g*data.sprites.detail)
				//console.log('Generated S-HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(100,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],36,g*data.sprites.detail)
				//console.log('Generated S-HB-'+(g+1))
			}
			data.sprites.under.dress={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.under.dress.front.push(createGraphics(150,250))
				setupLayer(data.sprites.under.dress.front[g])
				data.sprites.under.dress.front[g].translate(75,0)
				data.sprites.under.dress.front[g].scale(5)
				generateSprite(data.sprites.under.dress.front[g],37,g*data.sprites.detail)
				//console.log('Generated S-UDF-'+(g+1))
				data.sprites.under.dress.back.push(createGraphics(150,250))
				setupLayer(data.sprites.under.dress.back[g])
				data.sprites.under.dress.back[g].translate(75,0)
				data.sprites.under.dress.back[g].scale(5)
				generateSprite(data.sprites.under.dress.back[g],38,g*data.sprites.detail)
				//console.log('Generated S-UDB-'+(g+1))
			}
			if(options.damage){
				data.sprites.under.dressDamage={front:[],back:[]}
				for(let g=0;g<data.sprites.genAmount;g++){
					data.sprites.under.dressDamage.front.push(createGraphics(150,250))
					setupLayer(data.sprites.under.dressDamage.front[g])
					data.sprites.under.dressDamage.front[g].translate(75,0)
					data.sprites.under.dressDamage.front[g].scale(5)
					generateSprite(data.sprites.under.dressDamage.front[g],39,g*data.sprites.detail)
					//console.log('Generated S-UDF-'+(g+1))
					data.sprites.under.dressDamage.back.push(createGraphics(150,250))
					setupLayer(data.sprites.under.dressDamage.back[g])
					data.sprites.under.dressDamage.back[g].translate(75,0)
					data.sprites.under.dressDamage.back[g].scale(5)
					generateSprite(data.sprites.under.dressDamage.back[g],40,g*data.sprites.detail)
					//console.log('Generated S-UDB-'+(g+1))
				}
			}
		break
		case 3:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{back:[],front:[]},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]},mainDamage:{back:[],front:[]},outsideDamage:{back:[],front:[]}}},
				parts:{kimono:{main:[],outside:[],outsideTop:[],mainDamage:[],outsideDamage:[],mainAnti:[],outsideAnti:[]}},
				color:{
					hair:{back:[84,46,55],front:[128,71,79],insideBack:[74,41,50],insideFront:[118,66,74],glow:[94,51,60]},
					skin:{head:[255,239,224],body:[254,238,223],legs:[255,235,217],arms:[255,233,214],button:[245,180,145]},
					eye:{back:[175,121,123],front:[20,10,0],glow:[200,125,175]},
					under:{under:{top:[250,195,170],button:[200,145,120],bottom:[[255,228,181],[241,178,131]]}},
					kimono:{main:{start:[175,117,125],end:[169,155,182]},mainBack:{start:[108,76,87],end:[73,64,78]},ribbon:{start:[100,180,255],end:[125,200,255]},decoration:{back:[[50,150,200],[100,175,200]],front:[[125,255,255],[175,255,255]]},
					outside:{start:[121,131,167],end:[127,131,167]},outsideBack:{start:[81,91,127],end:[87,91,127]},
					bow:[185,103,161]},
					band:[[96,54,66],[182,47,31],[87,101,124],[195,214,223]],mouth:{in:[225,125,125],out:[0,0,0]},
				}
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={
				main:[
					{spin:[66,87,75],height:13},
                    {spin:[-87,-66,-75],height:13},
                    {spin:[18,150,84],height:9},
                    {spin:[-150,-18,-84],height:9},
                    {spin:[135,225,180],height:44},
					{spin:[135,225,165],height:35},
					{spin:[135,225,195],height:35},
                    {spin:[45,195,135],height:23},
                    {spin:[-195,-45,-135],height:23},
                    {spin:[75,225,150],height:27},
                    {spin:[-225,-75,-150],height:27},
				],inside:[
					{spin:[15,75,51],height:4},
					{spin:[-75,-15,-51],height:4},
					{spin:[75,147,111],height:9},
					{spin:[-147,-75,-111],height:9},
					{spin:[-189,-141,-165],height:21},
					{spin:[141,189,165],height:21},
				],reverse:[
					{spin:[-12,12,0],height:-1},
				]
			}
		
			data.sprites.genAmount=360/data.sprites.detail

			for(let g=0;g<5;g++){
				data.parts.kimono.main.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,11.5+g*6.5]})
				data.parts.kimono.main.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[11.5+g*6.5,0,13+g*6.5]})
				data.parts.kimono.main.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,15+g*6.5,13+g*6.5]})
				data.parts.kimono.main.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,15+g*6.5]})
				data.parts.kimono.main.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[15+g*6.5,0,14.5+g*6.5]})
				data.parts.kimono.main.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,18+g*6.5,14.5+g*6.5]})
			}
			data.parts.kimono.main.push({spin:[117,132,132],y:[0,0,36]})
			for(let g=0;g<2;g++){
				data.parts.kimono.main.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,44,45.5+g*0.5]})
				data.parts.kimono.main.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,44]})
				data.parts.kimono.main.push({spin:[146+g*48,156+g*48,156+g*48],y:[44,0,45]})
				data.parts.kimono.main.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,44,45]})
				data.parts.kimono.main.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,44]})
				data.parts.kimono.main.push({spin:[166+g*48,180+g*48,180+g*48],y:[44,0,46-g*0.5]})
			}
			data.parts.kimono.main.push({spin:[228,243,228],y:[0,0,36]})
			for(let g=4;g>=-2;g--){
				data.parts.kimono.main.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,18+g*6.5,14.5+g*6.5]})
				data.parts.kimono.main.push({spin:[84-g*48,75-g*48,72-g*48],y:[15+g*6.5,0,14.5+g*6.5]})
				data.parts.kimono.main.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,15+g*6.5]})
				data.parts.kimono.main.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,15+g*6.5,13+g*6.5]})
				data.parts.kimono.main.push({spin:[108-g*48,92-g*48,87-g*48],y:[11.5+g*6.5,0,13+g*6.5]})
				data.parts.kimono.main.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,11.5+g*6.5]})
			}
			for(let g=1;g<5;g++){
				data.parts.kimono.outside.push({spin:[-90+g*48,-36+g*48,-48+g*48],y:[0,0,16+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[-48+g*48,-32+g*48,-27+g*48],y:[16+g*8.5-15,0,18+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[-32+g*48,-24+g*48,-27+g*48],y:[0,19+g*8.5-15,18+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[-32+g*48,-8+g*48,-24+g*48],y:[0,0,19+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[-24+g*48,-15+g*48,-12+g*48],y:[19+g*8.5-15,0,19.5+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[-15+g*48,g*48,-12+g*48],y:[0,24.5+g*8.5-15,19.5+g*8.5-15]})
			}
			for(let g=4;g>=0;g--){
				data.parts.kimono.outside.push({spin:[15-g*48,-g*48,12-g*48],y:[0,24.5+g*8.5-15,19.5+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[24-g*48,15-g*48,12-g*48],y:[19+g*8.5-15,0,19.5+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[32-g*48,8-g*48,24-g*48],y:[0,0,19+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[32-g*48,24-g*48,27-g*48],y:[0,19+g*8.5-15,18+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[48-g*48,32-g*48,27-g*48],y:[16+g*8.5-15,0,18+g*8.5-15]})
				data.parts.kimono.outside.push({spin:[60-g*48,36-g*48,48-g*48],y:[0,0,16+g*8.5-15]})
			}
			for(let g=0;g<18;g++){
				data.parts.kimono.outsideTop.push({spin:[-90-g*20,-70-g*20,-80-g*20],y:[0,0,-1]})
			}
			if(options.damage){
				for(let g=0;g<5;g++){
					data.parts.kimono.mainDamage.push({spin:[-120+g*48,-96+g*48,-108+g*48],y:[0,0,13.5+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-108+g*48,-92+g*48,-87+g*48],y:[13.5+g*4.5,0,14+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-92+g*48,-84+g*48,-87+g*48],y:[0,16+g*4.5,14+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-92+g*48,-68+g*48,-84+g*48],y:[0,0,16+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-84+g*48,-75+g*48,-72+g*48],y:[16+g*4.5,0,15.5+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[-75+g*48,-60+g*48,-72+g*48],y:[0,18+g*4.5,15.5+g*4.5]})
				}
				data.parts.kimono.mainDamage.push({spin:[117,132,132],y:[0,0,36]})
				for(let g=0;g<2;g++){
					data.parts.kimono.mainDamage.push({spin:[132+g*48,146+g*48,132+g*48],y:[0,34,36+g*0.5]})
					data.parts.kimono.mainDamage.push({spin:[132+g*48,156+g*48,146+g*48],y:[0,0,34]})
					data.parts.kimono.mainDamage.push({spin:[146+g*48,156+g*48,156+g*48],y:[34,0,35]})
					data.parts.kimono.mainDamage.push({spin:[156+g*48,166+g*48,156+g*48],y:[0,34,35]})
					data.parts.kimono.mainDamage.push({spin:[180+g*48,156+g*48,166+g*48],y:[0,0,34]})
					data.parts.kimono.mainDamage.push({spin:[166+g*48,180+g*48,180+g*48],y:[34,0,36.5-g*0.5]})
				}
				data.parts.kimono.mainDamage.push({spin:[228,243,228],y:[0,0,36]})
				for(let g=4;g>=-3;g--){
					data.parts.kimono.mainDamage.push({spin:[75-g*48,60-g*48,72-g*48],y:[0,18+g*4.5,15.5+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[84-g*48,75-g*48,72-g*48],y:[16+g*4.5,0,15.5+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[92-g*48,68-g*48,84-g*48],y:[0,0,16+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[92-g*48,84-g*48,87-g*48],y:[0,16+g*4.5,14+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[108-g*48,92-g*48,87-g*48],y:[13.5+g*4.5,0,14+g*4.5]})
					data.parts.kimono.mainDamage.push({spin:[120-g*48,96-g*48,108-g*48],y:[0,0,13.5+g*4.5]})
				}
				for(let g=1;g<5;g++){
					data.parts.kimono.outsideDamage.push({spin:[-90+g*48,-36+g*48,-48+g*48],y:[0,0,16+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-48+g*48,-32+g*48,-27+g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-32+g*48,-24+g*48,-27+g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-32+g*48,-8+g*48,-24+g*48],y:[0,0,17.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-24+g*48,-15+g*48,-12+g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[-15+g*48,g*48,-12+g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
				}
				for(let g=4;g>=0;g--){
					data.parts.kimono.outsideDamage.push({spin:[15-g*48,-g*48,12-g*48],y:[0,21.5+g*5.5-15,18+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[24-g*48,15-g*48,12-g*48],y:[17.5+g*5.5-15,0,18+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[32-g*48,8-g*48,24-g*48],y:[0,0,17.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[32-g*48,24-g*48,27-g*48],y:[0,17.5+g*5.5-15,16.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[48-g*48,32-g*48,27-g*48],y:[16+g*5.5-15,0,16.5+g*5.5-15]})
					data.parts.kimono.outsideDamage.push({spin:[60-g*48,36-g*48,48-g*48],y:[0,0,16+g*5.5-15]})
				}
				for(let g=0,lg=data.parts.kimono.mainDamage.length;g<lg;g++){
					for(let h=0,lh=data.parts.kimono.mainDamage[g].y.length;h<lh;h++){
						data.parts.kimono.mainDamage[g].y[h]=max(0,data.parts.kimono.mainDamage[g].y[h]-(g*4+h*1.5)**1.25%6)
					}
				}
				for(let g=0,lg=data.parts.kimono.outsideDamage.length;g<lg;g++){
					for(let h=0,lh=data.parts.kimono.outsideDamage[g].y.length;h<lh;h++){
						data.parts.kimono.outsideDamage[g].y[h]=max(0,data.parts.kimono.outsideDamage[g].y[h]-(g*4+h*1.5)**1.5%6)
					}
				}
				for(let g=0;g<18;g++){
					data.parts.kimono.mainAnti.push({spin:[-96-g*20,-64-g*20,-80-g*20],y:[-1,-1,6+((g+2)**3%6)/2-lcos(-80-g*20)*5]})
				}
				for(let g=0;g<12;g++){
					data.parts.kimono.outsideAnti.push({spin:[-84-g*30,-36-g*30,-60-g*30],y:[-1,-1,6+((g+1)**2%6)/2-lcos(-60-g*30)*5]})
				}
				data.parts.kimono.outsideAnti.push({spin:[-36,36,0],y:[-1,-1,11]})
			}
			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(250,500))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(125,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],49,g*data.sprites.detail)
				//console.log('Generated L-HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(250,500))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(125,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],50,g*data.sprites.detail)
				//console.log('Generated L-HB-'+(g+1))
			}
			data.sprites.kimono.main={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.kimono.main.front.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.main.front[g])
				data.sprites.kimono.main.front[g].translate(75,0)
				data.sprites.kimono.main.front[g].scale(5)
				generateSprite(data.sprites.kimono.main.front[g],41,g*data.sprites.detail)
				//console.log('Generated L-KMF-'+(g+1))
				data.sprites.kimono.main.back.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.main.back[g])
				data.sprites.kimono.main.back[g].translate(75,0)
				data.sprites.kimono.main.back[g].scale(5)
				generateSprite(data.sprites.kimono.main.back[g],42,g*data.sprites.detail)
				//console.log('Generated L-KMB-'+(g+1))
			}
			data.sprites.kimono.outside={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.kimono.outside.front.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.outside.front[g])
				data.sprites.kimono.outside.front[g].translate(75,0)
				data.sprites.kimono.outside.front[g].scale(5)
				generateSprite(data.sprites.kimono.outside.front[g],43,g*data.sprites.detail)
				//console.log('Generated L-KOF-'+(g+1))
				data.sprites.kimono.outside.back.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.outside.back[g])
				data.sprites.kimono.outside.back[g].translate(75,0)
				data.sprites.kimono.outside.back[g].scale(5)
				generateSprite(data.sprites.kimono.outside.back[g],44,g*data.sprites.detail)
				//console.log('Generated L-KOB-'+(g+1))
			}
			if(options.damage){
				data.sprites.kimono.mainDamage={front:[],back:[]}
				for(let g=0;g<data.sprites.genAmount;g++){
					data.sprites.kimono.mainDamage.front.push(createGraphics(150,330))
					setupLayer(data.sprites.kimono.mainDamage.front[g])
					data.sprites.kimono.mainDamage.front[g].translate(75,0)
					data.sprites.kimono.mainDamage.front[g].scale(5)
					generateSprite(data.sprites.kimono.mainDamage.front[g],45,g*data.sprites.detail)
					//console.log('Generated L-DMF-'+(g+1))
					data.sprites.kimono.mainDamage.back.push(createGraphics(150,330))
					setupLayer(data.sprites.kimono.mainDamage.back[g])
					data.sprites.kimono.mainDamage.back[g].translate(75,0)
					data.sprites.kimono.mainDamage.back[g].scale(5)
					generateSprite(data.sprites.kimono.mainDamage.back[g],46,g*data.sprites.detail)
					//console.log('Generated L-DMB-'+(g+1))
				}
				data.sprites.kimono.outsideDamage={front:[],back:[]}
				for(let g=0;g<data.sprites.genAmount;g++){
					data.sprites.kimono.outsideDamage.front.push(createGraphics(150,330))
					setupLayer(data.sprites.kimono.outsideDamage.front[g])
					data.sprites.kimono.outsideDamage.front[g].translate(75,0)
					data.sprites.kimono.outsideDamage.front[g].scale(5)
					generateSprite(data.sprites.kimono.outsideDamage.front[g],47,g*data.sprites.detail)
					//console.log('Generated L-DOF-'+(g+1))
					data.sprites.kimono.outsideDamage.back.push(createGraphics(150,330))
					setupLayer(data.sprites.kimono.outsideDamage.back[g])
					data.sprites.kimono.outsideDamage.back[g].translate(75,0)
					data.sprites.kimono.outsideDamage.back[g].scale(5)
					generateSprite(data.sprites.kimono.outsideDamage.back[g],48,g*data.sprites.detail)
					//console.log('Generated L-DOB-'+(g+1))
				}
			}
		break
		case 4:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{back:[],front:[]}},
				parts:{},
				color:{
					hair:{back:[62,51,48],front:[85,74,69],insideBack:[45,36,34],insideFront:[78,69,64],glow:[96,82,82],pin:[[130,185,169],[120,107,107]]},
					skin:{head:[251,250,239],body:[255,254,244],legs:[252,250,237],arms:[251,242,231],button:[238,208,197],blush:[254,244,234]},
					eye:{back:[81,134,116],front:[13,19,22],glow:[178,233,214]},
					mouth:{in:[225,125,125],out:[0,0,0]},halo:[229,255,247],
					uniform:{main:[244,246,248],stripe:[83,105,122],underskirt:[66,55,52],bow:[149,221,199],belt:[167,176,191]},
					sock:[[225,227,231],[100,95,97]],shoe:[72,63,61],
				}
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={
				main:[
					{spin:[30,54,42],height:12},
                    {spin:[-54,-30,-42],height:12},
					{spin:[48,72,60],height:15},
                    {spin:[-72,-48,-60],height:15},
					{spin:[66,90,78],height:17.8},
                    {spin:[-90,-66,-78],height:17.8},
					{spin:[84,108,96],height:20.4},
                    {spin:[-108,-84,-96],height:20.4},
					{spin:[102,126,114],height:22.8},
                    {spin:[-126,-102,-114],height:22.8},
					{spin:[120,144,132],height:25},
                    {spin:[-144,-120,-132],height:25},
					{spin:[138,162,150],height:27},
                    {spin:[-162,-138,-150],height:27},
					{spin:[154,186,169.5],height:28.4},
                    {spin:[-186,-154,-169.5],height:28.4},
				],inside:[
					{spin:[39,63,51],height:13.5},
                    {spin:[-63,-39,-51],height:13.5},
					{spin:[57,81,69],height:16.4},
                    {spin:[-81,-57,-69],height:16.4},
					{spin:[75,99,87],height:19.1},
                    {spin:[-99,-75,-87],height:19.1},
					{spin:[93,117,105],height:21.6},
                    {spin:[-117,-93,-105],height:21.64},
					{spin:[111,135,123],height:23.9},
                    {spin:[-135,-111,-123],height:23.9},
					{spin:[129,153,141],height:26},
                    {spin:[-153,-129,-141],height:26},
					{spin:[147,171,159],height:27.7},
                    {spin:[-171,-147,-159],height:27.7},
					{spin:[163,207,180],height:28.8},
				],reverse:[
					{spin:[-27,3,-6],height:-5},
					{spin:[3,27,6],height:-5},
				]
			}
		
			data.sprites.genAmount=360/data.sprites.detail

			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(100,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],51,g*data.sprites.detail)
				//console.log('Generated L-HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(100,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],52,g*data.sprites.detail)
				//console.log('Generated L-HB-'+(g+1))
			}
		break
		case 5:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{back:[],front:[],tail:[[],[]]}},
				parts:{},
				color:{
                    hair:{back:[182,202,209],front:[252,255,254],insideBack:[147,178,197],insideFront:[216,236,241],tail:{start:[211,238,245],end:[158,198,221]},glow:[255,255,255],bow:[88,90,123]},
                    skin:{head:[255,249,242],body:[251,253,235],legs:[253,251,247],arms:[254,246,240]},
                    eye:{back:[255,148,157],front:[61,0,5],glow:[255,238,236]},
					mouth:{in:[254,194,166],out:[0,0,0]},
                    dress:{main:[254,253,255],shawl:[239,237,238],inside:[88,91,129],highlight:[84,147,210],border:[49,100,192],tie:[89,95,97],bow:[[48,125,242],[216,242,255]],sleeve:[233,232,237]},
				},
				spin:{tail:[-114,114]}
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={main:[
				{spin:[-9,-3,-6],height:1},
				{spin:[-3,9,6],height:1},

				{spin:[-18,-12,-14],height:0.5},
				{spin:[12,18,14],height:0.5},
				{spin:[-24,-15,-19],height:1},
				{spin:[15,24,19],height:1},
				{spin:[-30,-24,-26],height:1.5},
				{spin:[24,30,26],height:1.5},

				{spin:[-51,-33,-42],height:2},
				{spin:[33,51,42],height:2},
				{spin:[-63,-45,-54],height:3},
				{spin:[45,63,54],height:3},
				{spin:[-90,-60,-75],height:4},
				{spin:[60,90,75],height:4},

				{spin:[-108,-84,-96],height:6},
				{spin:[84,108,96],height:6},
				{spin:[-81,-72,-78],height:8},
				{spin:[72,81,78],height:8},
				{spin:[-81,-72,-75],height:7},
				{spin:[72,81,75],height:7},

				{spin:[96,150,132],height:14},
				{spin:[-150,-96,-132],height:14},
				
				{spin:[120,180,156],height:17},
				{spin:[-180,-120,-156],height:17},

				{spin:[120,-120,180],height:18},
			],inside:[
				{spin:[-3,3,0],height:1.5},
				
				{spin:[-12,-6,-8],height:1},
				{spin:[6,12,8],height:1},
				{spin:[-18,-9,-13],height:0.5},
				{spin:[9,18,13],height:0.5},
				{spin:[-24,-18,-20],height:2},
				{spin:[18,24,20],height:2},

				{spin:[-54,-42,-48],height:2.5},
				{spin:[42,54,48],height:2.5},
				{spin:[-72,-60,-66],height:3.5},
				{spin:[60,72,66],height:3.5},

				{spin:[-93,-75,-84],height:7},
				{spin:[75,93,84],height:7},
				{spin:[-150,-90,-120],height:11},
				{spin:[90,150,120],height:11},
				{spin:[105,-165,165],height:12.5},
				{spin:[165,-105,-165],height:12.5},
			]}

			data.parts.tail=[[],[]]

			for(let g=0;g<2;g++){
				for(let h=0;h<4;h++){
					data.parts.tail[g].push([[],[]])
					for(let i=0;i<12;i++){
						data.parts.tail[g][h][0].push({spin:[h*15+i*30-15,h*15+i*30+15,h*15+i*30],y:[0,0,-4]})
						data.parts.tail[g][h][1].push({spin:[h*15+i*30-15,h*15+i*30+15,h*15+i*30],y:[0,0,4]})
					}
				}
			}
		
			data.sprites.genAmount=360/data.sprites.detail

			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(100,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],53,g*data.sprites.detail)
				//console.log('Generated HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(100,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],54,g*data.sprites.detail)
				//console.log('Generated HB-'+(g+1))
			}
			data.sprites.hair.tail=[[],[]]
			for(let g=0;g<2;g++){
				for(let h=0;h<data.sprites.genAmount;h++){
					data.sprites.hair.tail[g].push(createGraphics(120,360))
					setupLayer(data.sprites.hair.tail[g][h])
					data.sprites.hair.tail[g][h].translate(60,0)
					data.sprites.hair.tail[g][h].scale(5)
					generateSprite(data.sprites.hair.tail[g][h],55+g,h*data.sprites.detail)
					//console.log('Generated HT-'+(g*data.sprites.genAmount+h+1))
				}
			}
		break
		case 6:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{back:[],front:[]}},
				parts:{},
				color:{
                    hair:{back:[185,191,104],front:[211,216,127],insideBack:[117,123,90],insideFront:[154,155,98],glow:[228,239,181]},
                    skin:{head:[250,235,193],body:[250,228,186],legs:[247,241,189],arms:[249,236,192],blush:[232,157,122]},
                    eye:{back:[45,74,118],front:[47,53,77],glow:[176,188,183]},
					mouth:{in:[235,168,126],out:[0,0,0]},
                    dress:{under:[254,249,226],over:[78,107,136],tie:[238,233,143]},
					wing:{back:[250,237,214],front:[86,53,57]},
				},
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={main:[
				{spin:[-6,6,0],height:4},
				{spin:[-9,0,-4.5],height:3},
				{spin:[-0,9,4.5],height:3},
				{spin:[-15,-3,-10.5],height:1.5},
				{spin:[3,15,10.5],height:1.5},
				{spin:[-30,-12,-24],height:2},
				{spin:[12,30,24],height:2},
				{spin:[-60,-24,-42],height:5},
				{spin:[24,60,42],height:5},
				{spin:[-84,-42,-66],height:9},
				{spin:[42,84,66],height:9},
				{spin:[-108,-66,-90],height:11},
				{spin:[66,108,90],height:11},
				{spin:[-138,-90,-114],height:12},
				{spin:[90,138,114],height:12},
				{spin:[-162,-114,-138],height:12.5},
				{spin:[114,162,138],height:12.5},
				{spin:[174,-138,-162],height:13},
				{spin:[138,-174,162],height:13},
				{spin:[153,-153,180],height:13.5},
				{spin:[-93,-69,-84],height:19},
				{spin:[69,93,84],height:19},
				{spin:[-123,-99,-114],height:22},
				{spin:[99,123,114],height:22},
			],inside:[
				{spin:[-27,-15,-15],height:1},
				{spin:[15,27,15],height:1},
				{spin:[-42,-18,-30],height:3},
				{spin:[18,42,30],height:3},
				{spin:[-66,-42,-54],height:7},
				{spin:[42,66,54],height:7},
				{spin:[-90,-66,-78],height:10},
				{spin:[66,90,78],height:10},
				{spin:[-114,-90,-102],height:11.25},
				{spin:[90,114,102],height:11.25},
				{spin:[-138,-114,-126],height:12.125},
				{spin:[114,138,126],height:12.125},
				{spin:[-162,-138,-150],height:12.625},
				{spin:[138,162,150],height:12.625},
				{spin:[174,-162,-174],height:13.125},
				{spin:[162,-174,174],height:13.125},
				{spin:[-108,-84,-99],height:17},
				{spin:[84,108,99],height:17},
			]}
		
			data.sprites.genAmount=360/data.sprites.detail

			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(100,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],57,g*data.sprites.detail)
				//console.log('Generated HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(100,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],58,g*data.sprites.detail)
				//console.log('Generated HB-'+(g+1))
			}
		break
		case 7:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{back:[],front:[],tail:[[],[]]}},
				parts:{tail:[]},
				spin:{tail:84},
				color:{
                    hair:{back:[107,128,116],front:[118,169,155],insideBack:[117,152,119],insideFront:[99,133,126],tail:{start:[121,171,162],end:[130,146,160]},glow:[168,198,193],pin:[[96,117,123],[217,215,221],[36,30,40]]},
                    skin:{head:[248,228,222],body:[239,220,208],legs:[237,215,203],arms:[237,219,208]},
                    eye:{back:[120,147,138],front:[47,46,53],glow:[164,199,189]},
					mouth:{in:[235,168,126],out:[0,0,0]},
					dress:{main:[51,101,134],highlight:[233,238,241],dot:[197,214,224],sleeve:[228,224,239],sleeveHighlight:[73,80,122]},
					sock:[204,199,202],shoe:[104,74,64],
				},
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={main:[
				{spin:[-36,-22.5,-33],height:2},
				{spin:[22.5,36,33],height:2},
				{spin:[-51,-39,-48],height:5},
				{spin:[39,51,48],height:5},
				{spin:[-66,-54,-63],height:8.5},
				{spin:[54,66,63],height:8.5},
				{spin:[-81,-69,-78],height:12},
				{spin:[69,81,78],height:12},
				{spin:[-96,-81,-93],height:15.5},
				{spin:[81,96,93],height:15.5},
				{spin:[-111,-96,-108],height:18.5},
				{spin:[96,111,108],height:18.5},
				{spin:[-126,-111,-123],height:21},
				{spin:[111,126,123],height:21},
				{spin:[-141,-126,-138],height:23},
				{spin:[126,141,138],height:23},
				{spin:[-156,-141,-153],height:24.5},
				{spin:[141,156,153],height:24.5},
				{spin:[-171,-156,-168],height:25.5},
				{spin:[156,171,168],height:25.5},
				{spin:[171,-171,-180],height:26},
			],inside:[
				{spin:[-57,-32,-54],height:2},
				{spin:[32,57,54],height:2},
				{spin:[-72,-47,-69],height:4.5},
				{spin:[47,72,69],height:4.5},
				{spin:[-87,-65,-84],height:7.5},
				{spin:[65,87,84],height:7.5},
				{spin:[-102,-77,-99],height:11},
				{spin:[77,102,99],height:11},
				{spin:[-117,-92,-114],height:14},
				{spin:[92,117,114],height:14},
				{spin:[-132,-107,-129],height:16},
				{spin:[107,132,129],height:16},
				{spin:[-147,-122,-144],height:18.5},
				{spin:[122,147,144],height:18.5},
				{spin:[-162,-137,-159],height:19.5},
				{spin:[137,162,159],height:19.5},
				{spin:[-177,-152,-174],height:21},
				{spin:[152,177,174],height:21},
			],reverse:[
				{spin:[-15,3,-3],height:-7},
				{spin:[0,12,3],height:-4},
				{spin:[-21,-12,-15],height:-1.5},
				{spin:[9,21,18],height:-1},
			]}
			for(let a=0,la=data.parts.hair.main.length;a<la;a++){
				if(a>2){
					data.parts.hair.main[a].spin[0]-=random(0,3)
					data.parts.hair.main[a].spin[1]+=random(0,3)
				}
				data.parts.hair.main[a].spin[2]+=random(-3,3)
			}
			for(let a=0,la=data.parts.hair.inside.length;a<la;a++){
				data.parts.hair.inside[a].spin[0]-=random(0,1)
				data.parts.hair.inside[a].spin[1]+=random(0,1)
				data.parts.hair.inside[a].spin[2]+=random(-1,1)
			}

			for(let g=0;g<5;g++){
				data.parts.tail.push([[],[]])
				for(let h=0;h<12;h++){
					data.parts.tail[g][0].push({spin:[g*15+h*30-15,g*15+h*30+15,g*15+h*30],y:[0,0,-5]})
					data.parts.tail[g][1].push({spin:[g*15+h*30-15,g*15+h*30+15,g*15+h*30],y:[0,0,5]})
				}
			}
		
			data.sprites.genAmount=360/data.sprites.detail

			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(250,500))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(125,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],59,g*data.sprites.detail)
				//console.log('Generated HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(250,500))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(125,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],60,g*data.sprites.detail)
				//console.log('Generated HB-'+(g+1))
			}
			data.sprites.hair.tail=[]
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.tail.push(createGraphics(120,300))
				setupLayer(data.sprites.hair.tail[g])
				data.sprites.hair.tail[g].translate(60,0)
				data.sprites.hair.tail[g].scale(5)
				generateSprite(data.sprites.hair.tail[g],61,g*data.sprites.detail)
				//console.log('Generated S-HT-'+(g+1))
			}
		break
		case 8:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{back:[],front:[]},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]}}},
				parts:{kimono:{main:[],outside:[[],[]],decoration:[[],[]]}},
				color:{
					hair:{back:[115,92,134],front:[160,138,177],insideBack:[90,61,93],insideFront:[131,107,155],glow:[226,211,216]},
					skin:{head:[252,222,212],body:[244,198,185],legs:[250,217,208],arms:[249,219,209],button:[238,164,165]},
					eye:{back:[142,48,66],front:[25,8,16],glow:[254,255,255]},
					sleeve:{back:[187,72,101],front:[206,77,86]},
                    kimono:{
						main:{start:[255,233,235],end:[240,201,204]},mainBack:{start:[214,188,213],end:[201,159,179]},
						outside:{start:[201,65,79],end:[159,59,95]},outsideBack:{start:[140,40,66],end:[100,26,59]},
						decoration:[[228,189,210],[234,142,165],[220,174,99]],top:[123,29,55]},
					wrap:{in:[78,50,72],rope:[144,100,75],bow:[105,69,83],decoration:[166,124,84],string:[231,186,118]},
					mouth:{in:[225,125,125],out:[0,0,0]},
				}
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={
				main:[
					{spin:[0,6,3],y:[-6,-6,3]},

					{spin:[-54,-18,-36],y:[0,-3,5]},
					{spin:[-60,-42,-54],y:[0,0,9]},
					{spin:[-90,-54,-75],y:[0,0,11]},
					{spin:[-99,-84,-93],y:[0,0,16]},
					{spin:[-114,-99,-108],y:[0,0,12]},
					{spin:[-129,-105,-120],y:[0,0,15]},
					{spin:[-154,-117,-135],y:[0,0,17]},
					{spin:[-180,-144,-162],y:[0,0,16]},
					{spin:[174,-162,-177],y:[0,0,19]},

					{spin:[18,45,33],y:[-3,0,4]},
					{spin:[36,63,51],y:[0,0,8]},
					{spin:[57,96,81],y:[0,0,13]},
					{spin:[81,102,93],y:[0,0,14]},
					{spin:[99,117,111],y:[0,0,17]},
					{spin:[108,126,117],y:[0,0,15]},
					{spin:[123,159,138],y:[0,0,18]},
					{spin:[150,171,165],y:[0,0,17]},
				],inside:[
					{spin:[-57,-36,-48],y:[0,0,4.5]},
					{spin:[-66,-51,-60],y:[0,0,7.5]},
					{spin:[-90,-81,-87],y:[0,0,9.5]},
					{spin:[-108,-93,-102],y:[0,0,10.5]},
					{spin:[-117,-99,-114],y:[0,0,11.5]},
					{spin:[-138,-123,-129],y:[0,0,13.5]},
					{spin:[-156,-132,-147],y:[0,0,14.5]},
					{spin:[174,-159,-171],y:[0,0,16.5]},

					{spin:[39,51,42],y:[0,0,3.5]},
					{spin:[48,72,69],y:[0,0,6.5]},
					{spin:[72,99,87],y:[0,0,10.5]},
					{spin:[90,111,99],y:[0,0,11.5]},
					{spin:[108,117,114],y:[0,0,15.5]},
					{spin:[120,135,129],y:[0,0,12.5]},
					{spin:[138,177,150],y:[0,0,15.5]},
					{spin:[159,-168,174],y:[0,0,17.5]},
				],reverse:[
					{spin:[-24,24,3],y:[0,0,-6]},
				]
			}
		
			data.sprites.genAmount=360/data.sprites.detail

			for(let a=0,la=12;a<la;a++){
				data.parts.kimono.main.push({
					spin:[-195+a*30,-165+a*30,-180+a*30],
					y:[0,0,lsin((a+0.5)/(la+0.5)*90)*34]
				})
				data.parts.kimono.main.push({
					spin:[-180+a*30,-171+a*30,-165+a*30],
					y:[lsin((a+0.5)/(la+0.5)*90)*34,lsin((a+1)/(la+0.5)*90)*34+3,0]
				})
				data.parts.kimono.main.push({
					spin:[-171+a*30,-165+a*30,-165+a*30],
					y:[lsin((a+1)/(la+0.5)*90)*34+3,lsin((a+1)/(la+0.5)*90)*34+3.5,0]
				})
				data.parts.kimono.main.push({
					spin:[-165+a*30,-159+a*30,-165+a*30],
					y:[lsin((a+1)/(la+0.5)*90)*34+3.5,lsin((a+1)/(la+0.5)*90)*34+3,0]
				})
				data.parts.kimono.main.push({
					spin:[-159+a*30,-150+a*30,-165+a*30],
					y:[lsin((a+1)/(la+0.5)*90)*34+3,lsin((a+1.5)/(la+0.5)*90)*34,0]
				})
			}
			data.parts.kimono.main.push({
				spin:[165,-165,-180],
				y:[0,0,36]
			})
			for(let a=0,la=12;a<la;a++){
				data.parts.kimono.main.push({
					spin:[-159+a*30,-150+a*30,-165+a*30],
					y:[lsin(90+(a+1)/(la+0.5)*90)*34+3,lsin(90+(a+1.5)/(la+0.5)*90)*34,0]
				})
				data.parts.kimono.main.push({
					spin:[-165+a*30,-159+a*30,-165+a*30],
					y:[lsin(90+(a+1)/(la+0.5)*90)*34+3.5,lsin(90+(a+1)/(la+0.5)*90)*34+3,0]
				})
				data.parts.kimono.main.push({
					spin:[-171+a*30,-165+a*30,-165+a*30],
					y:[lsin(90+(a+1)/(la+0.5)*90)*34+3,lsin(90+(a+1)/(la+0.5)*90)*34+3.5,0]
				})
				data.parts.kimono.main.push({
					spin:[-180+a*30,-171+a*30,-165+a*30],
					y:[lsin(90+(a+0.5)/(la+0.5)*90)*34,lsin(90+(a+1)/(la+0.5)*90)*34+3,0]
				})
				data.parts.kimono.main.push({
					spin:[-165+a*30,-135+a*30,-150+a*30],
					y:[0,0,lsin(90+(a+1.5)/(la+0.5)*90)*34]
				})
			}
			let decorationIndex=0
			for(let a=0,la=12;a<la;a++){
				data.parts.kimono.outside[0].push({
					spin:[-120+a*24,-96+a*24,-108+a*24],
					y:[0,0,lsin((a+0.5)/(la+0.5)*90)*40]
				})
				data.parts.kimono.outside[0].push({
					spin:[-108+a*24,-84+a*24,-96+a*24],
					y:[lsin((a+0.5)/(la+0.5)*90)*40,lsin((a+1.5)/(la+0.5)*90)*40,0]
				})
				data.parts.kimono.decoration[a==11?1:0].push(
					{
						type:floor(random(0,3)),spin:-96+a*24,rotate:random(0,360),size:random(1,1.5),
						y:lsin((a+1)/(la+0.5)*90)*40-1-decorationIndex%2*3-(decorationIndex%4==1?1:0)*3-random(0,2)
					}
				)
				decorationIndex++
				data.parts.kimono.decoration[a==11?1:0].push(
					{
						type:floor(random(0,3)),spin:-84+a*24,rotate:random(0,360),size:random(1,1.5),
						y:lsin((a+1.5)/(la+0.5)*90)*40-1-decorationIndex%2*3-(decorationIndex%4==1?1:0)*3-random(0,2)
					}
				)
				decorationIndex++
			}
			data.parts.kimono.outside[0].push({
				spin:[168,-168,-180],
				y:[0,0,40]
			})
			for(let a=0,la=12;a<la;a++){
				data.parts.kimono.outside[1].push({
					spin:[-180+a*24,-156+a*24,-168+a*24],
					y:[lsin(90+(a+0.5)/(la+0.5)*90)*40,lsin(90+(a+1.5)/(la+0.5)*90)*40,0]
				})
				data.parts.kimono.outside[1].push({
					spin:[-168+a*24,-144+a*24,-156+a*24],
					y:[0,0,lsin(90+(a+1.5)/(la+0.5)*90)*40]
				})
				data.parts.kimono.decoration[1].push(
					{
						type:floor(random(0,3)),spin:-168+a*24,rotate:random(0,360),size:random(1,1.5),
						y:lsin(90+(a+1)/(la+0.5)*90)*40-1-decorationIndex%2*3-(decorationIndex%4==1?1:0)*3-random(0,2)
					}
				)
				decorationIndex++
				data.parts.kimono.decoration[1].push(
					{
						type:floor(random(0,3)),spin:-156+a*24,rotate:random(0,360),size:random(1,1.5),
						y:lsin(90+(a+1.5)/(la+0.5)*90)*40-1-decorationIndex%2*3-(decorationIndex%4==1?1:0)*3-random(0,2)
					}
				)
				decorationIndex++
			}
			for(let a=0,la=data.parts.kimono.decoration.length;a<la;a++){
				for(let b=0,lb=data.parts.kimono.decoration[a].length;b<lb;b++){
					if(data.parts.kimono.decoration[a][b].y<3){
						data.parts.kimono.decoration[a].splice(b,1)
						b--
						lb--
					}
				}
			}

			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(250,500))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(125,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],62,g*data.sprites.detail)
				//console.log('Generated L-HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(250,500))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(125,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],63,g*data.sprites.detail)
				//console.log('Generated L-HB-'+(g+1))
			}
			data.sprites.kimono.main={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.kimono.main.front.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.main.front[g])
				data.sprites.kimono.main.front[g].translate(75,0)
				data.sprites.kimono.main.front[g].scale(5)
				generateSprite(data.sprites.kimono.main.front[g],64,g*data.sprites.detail)
				//console.log('Generated L-KMF-'+(g+1))
				data.sprites.kimono.main.back.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.main.back[g])
				data.sprites.kimono.main.back[g].translate(75,0)
				data.sprites.kimono.main.back[g].scale(5)
				generateSprite(data.sprites.kimono.main.back[g],65,g*data.sprites.detail)
				//console.log('Generated L-KMB-'+(g+1))
			}
			data.sprites.kimono.outside={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.kimono.outside.front.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.outside.front[g])
				data.sprites.kimono.outside.front[g].translate(75,0)
				data.sprites.kimono.outside.front[g].scale(5)
				generateSprite(data.sprites.kimono.outside.front[g],66,g*data.sprites.detail)
				//console.log('Generated L-KOF-'+(g+1))
				data.sprites.kimono.outside.back.push(createGraphics(150,330))
				setupLayer(data.sprites.kimono.outside.back[g])
				data.sprites.kimono.outside.back[g].translate(75,0)
				data.sprites.kimono.outside.back[g].scale(5)
				generateSprite(data.sprites.kimono.outside.back[g],67,g*data.sprites.detail)
				//console.log('Generated L-KOB-'+(g+1))
			}
		break
		case 9:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0,hair:{preBack:[],preFront:[],insideBack:[],insideFront:[],back:[],front:[]}},
				parts:{},
				color:{
                    hair:{back:[156,146,183],front:[165,184,227],insideBack:[172,152,187],insideFront:[215,187,209],glow:[253,191,255]},
                    skin:{head:[255,242,226],body:[253,222,219],legs:[255,234,220],arms:[255,224,209]},
                    eye:{back:[248,253,249],front:[49,78,178],glow:[190,235,202]},
					mouth:{in:[254,194,166],out:[0,0,0]},
                    dress:{main:[239,216,226],outline:[25,38,44],mark:[147,173,230],gem:[111,197,255],sleeve:[219,217,228],trim:[247,249,253]},
					hat:{main:[240,224,225],back:[224,188,188],outline:[43,37,37],outlineBack:[22,32,34],trim:[[186,209,225],[168,187,201]],sun:[83,114,207]},
					sock:[234,228,238],shoe:[80,95,178],
					star:[[74,111,225],[255,255,255]],
				},
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={main:[],inside:[],reverse:[],reverseInside:[]}

			for(let a=0,la=20;a<la;a++){
				let zonal=[random(-180/la,-60/la),random(-60/la,60/la),random(60/la,180/la)]
				let scale=9-lcos(a/la*360)*10-lcos(a/la*360)*abs(lcos(a/la*360))*2.5+random(-0.2,0.2)
				if(scale>0){
					data.parts.hair.main.push({spin:[a/la*360-180/la,a/la*360,a/la*360+zonal[0]],y:[0,0,scale/2]})
					data.parts.hair.main.push({spin:[a/la*360,a/la*360+180/la,a/la*360+zonal[2]],y:[0,0,scale/2]})
					data.parts.hair.main.push({spin:[a/la*360+zonal[0],a/la*360+zonal[2],a/la*360],y:[scale/2,scale/2,0]})
					data.parts.hair.main.push({spin:[a/la*360+zonal[0],a/la*360+zonal[2],a/la*360+zonal[1]],y:[scale/2,scale/2,scale]})
				}else{
					data.parts.hair.reverse.push({spin:[a/la*360-180/la-max(0,-6-scale*4),a/la*360,a/la*360+zonal[0]],y:[0,0,scale/2-0.5]})
					data.parts.hair.reverse.push({spin:[a/la*360,a/la*360+180/la+max(0,-6-scale*4),a/la*360+zonal[2]],y:[0,0,scale/2-0.5]})
					data.parts.hair.reverse.push({spin:[a/la*360+zonal[0],a/la*360+zonal[2],a/la*360],y:[scale/2-0.5,scale/2-0.5,0]})
					data.parts.hair.reverse.push({spin:[a/la*360+zonal[0],a/la*360+zonal[2],a/la*360+zonal[1]],y:[scale/2-0.5,scale/2-0.5,scale-1]})
				}

				zonal=[random(-180/la,-30/la),random(-90/la,90/la),random(30/la,180/la)]
				scale=7	-lcos((a+0.5)/la*360)*9-lcos((a+0.5)/la*360)*abs(lcos((a+0.5)/la*360))*2.25+random(-0.2,0.2)
				if(scale>0){
					data.parts.hair.inside.push({spin:[(a+0.5)/la*360-180/la,(a+0.5)/la*360,(a+0.5)/la*360+zonal[0]],y:[0,0,scale/2]})
					data.parts.hair.inside.push({spin:[(a+0.5)/la*360,(a+0.5)/la*360+180/la,(a+0.5)/la*360+zonal[2]],y:[0,0,scale/2]})
					data.parts.hair.inside.push({spin:[(a+0.5)/la*360+zonal[0],(a+0.5)/la*360+zonal[2],(a+0.5)/la*360],y:[scale/2,scale/2,0]})
					data.parts.hair.inside.push({spin:[(a+0.5)/la*360+zonal[0],(a+0.5)/la*360+zonal[2],(a+0.5)/la*360+zonal[1]],y:[scale/2,scale/2,scale]})
				}else{
					data.parts.hair.reverseInside.push({spin:[(a+0.5)/la*360-180/la-max(0,-6-scale*4),(a+0.5)/la*360,(a+0.5)/la*360+zonal[0]],y:[0,0,scale/2-1]})
					data.parts.hair.reverseInside.push({spin:[(a+0.5)/la*360,(a+0.5)/la*360+180/la+max(0,-6-scale*4),(a+0.5)/la*360+zonal[2]],y:[0,0,scale/2-1]})
					data.parts.hair.reverseInside.push({spin:[(a+0.5)/la*360+zonal[0],(a+0.5)/la*360+zonal[2],(a+0.5)/la*360],y:[scale/2-1,scale/2-1,0]})
					data.parts.hair.reverseInside.push({spin:[(a+0.5)/la*360+zonal[0],(a+0.5)/la*360+zonal[2],(a+0.5)/la*360+zonal[1]],y:[scale/2-1,scale/2-1,scale-2]})
				}
			}
		
			data.sprites.genAmount=360/data.sprites.detail

			data.sprites.hair={preBack:[],preFront:[],insideBack:[],insideFront:[],back:[],front:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.insideFront.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.insideFront[g])
				data.sprites.hair.insideFront[g].translate(100,100)
				data.sprites.hair.insideFront[g].scale(5)
				generateSprite(data.sprites.hair.insideFront[g],70,g*data.sprites.detail)
				//console.log('Generated HIF-'+(g+1))
				data.sprites.hair.insideBack.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.insideBack[g])
				data.sprites.hair.insideBack[g].translate(100,100)
				data.sprites.hair.insideBack[g].scale(5)
				generateSprite(data.sprites.hair.insideBack[g],71,g*data.sprites.detail)
				//console.log('Generated HIB-'+(g+1))
				data.sprites.hair.preFront.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.preFront[g])
				data.sprites.hair.preFront[g].translate(100,100)
				data.sprites.hair.preFront[g].scale(5)
				generateSprite(data.sprites.hair.preFront[g],68,g*data.sprites.detail)
				//console.log('Generated HF-'+(g+1))
				data.sprites.hair.preBack.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.preBack[g])
				data.sprites.hair.preBack[g].translate(100,100)
				data.sprites.hair.preBack[g].scale(5)
				generateSprite(data.sprites.hair.preBack[g],69,g*data.sprites.detail)
				//console.log('Generated HB-'+(g+1))
				data.sprites.hair.front.push(createGraphics(200,300))
				data.sprites.hair.front[g].image(data.sprites.hair.insideFront[g],0,0,200,300)
				data.sprites.hair.front[g].image(data.sprites.hair.preFront[g],0,0,200,300)
				data.sprites.hair.back.push(createGraphics(200,300))
				data.sprites.hair.back[g].image(data.sprites.hair.insideBack[g],0,0,200,300)
				data.sprites.hair.back[g].image(data.sprites.hair.preBack[g],0,0,200,300)
			}
			for(let a=0,la=data.sprites.hair.insideFront.length;a<la;a++){
				delete data.sprites.hair.insideFront[a]
				a--
				la--
			}
			for(let a=0,la=data.sprites.hair.insideBack.length;a<la;a++){
				delete data.sprites.hair.insideBack[a]
				a--
				la--
			}
		break
		case 10:
			graphics.combatant.push({
				sprites:{detail:15,genAmount:0,animDirection:0},
				parts:{jacket:[]},
				color:{
                    hair:{back:[168,146,158],front:[229,229,227],insideBack:[121,104,122],insideFront:[208,188,190],glow:[255,249,233],braid:[206,198,211]},
                    skin:{head:[228,199,185],body:[229,199,188],legs:[238,214,186],arms:[245,233,217],button:[162,112,115]},
                    eye:{back:[89,40,119],front:[28,6,24],glow:[237,119,141]},
					mouth:{in:[191,125,127],out:[0,0,0]},
					dress:{main:[99,56,99],back:[43,29,64],highlight:[68,32,68],sleeve:[71,42,96],detail:[243,237,239],bow:{out:[130,19,51],center:[[109,100,127],[112,62,65],[41,7,40]]}},
					jacket:{main:[245,221,196],back:[118,90,113],sleeve:[234,210,174],detail:[61,45,92]},
					wing:[[103,100,181],[231,225,227]],
				},
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={main:[
				{spin:[-14,-6,-10],y:[-6,-6,-2]},
				{spin:[-6,2,-2],y:[-6,-6,-2]},
				{spin:[-10,-2,-6],y:[-2,-2,-6]},
				{spin:[-10,-2,-1],y:[-2,-2,2]},
				{spin:[4,8,6],y:[-6,-6,-3]},
				{spin:[8,12,10],y:[-6,-6,-3]},
				{spin:[6,10,8],y:[-3,-3,-6]},
				{spin:[6,10,5],y:[-3,-3,0]},
				{spin:[-39,-27,-36],y:[-5,-5,1]},
				{spin:[30,39,33],y:[-5,-5,1]},
				{spin:[-72,-48,-63],y:[-2,-2,8]},
				{spin:[-96,-69,-87],y:[0,0,11]},
				{spin:[-111,-93,-105],y:[0,0,12.5]},
				{spin:[-126,-93,-117],y:[0,0,13]},
				{spin:[-156,-120,-132],y:[0,0,15]},
				{spin:[-165,-144,-159],y:[0,0,14.5]},
				{spin:[-186,-147,-171],y:[0,0,16]},
				{spin:[48,72,57],y:[-2,-2,8]},
				{spin:[69,96,78],y:[0,0,10]},
				{spin:[96,108,99],y:[0,0,9.5]},
				{spin:[93,126,117],y:[0,0,12]},
				{spin:[120,156,129],y:[0,0,14.5]},
				{spin:[147,186,165],y:[0,0,15.5]},
			],inside:[
				{spin:[-2,2,1],y:[-6,-6,-1]},
				{spin:[-13.5,-7.5,-15],y:[-6,-6,-1]},
				{spin:[7.5,10.5,13.5],y:[-6,-6,-1.5]},
				{spin:[-57,-48,-49.5],y:[-5,-5,4]},
				{spin:[-78,-60,-72],y:[-2,-2,6.5]},
				{spin:[-102,-90,-99],y:[0,0,9]},
				{spin:[-136,-109,-124],y:[0,0,11]},
				{spin:[-162,-138,-147],y:[0,0,12.5]},
				{spin:[-192,-176,-183],y:[0,0,13.5]},
				{spin:[27,33,30],y:[-5,-5,1.5]},
				{spin:[42,51,45],y:[-5,-5,3]},
				{spin:[63,72,69],y:[-2,-2,5]},
				{spin:[87,93,90],y:[0,0,10.5]},
				{spin:[144,159,150],y:[0,0,13]},
			],reverse:[
				{spin:[-27,12,-8],y:[0,0,-5]},
				{spin:[-12,27,8],y:[0,0,-6]},
				{spin:[-48,-30,-36],y:[0,0,-3]},
				{spin:[27,51,39],y:[0,0,-4]},
			]}
		
			data.sprites.genAmount=360/data.sprites.detail

			data.sprites.hair={frontUnder:[],front:[],back:[]}
			data.sprites.jacket=[]
			data.sprites.wing=[]
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.frontUnder.push(createGraphics(250,300))
				setupLayer(data.sprites.hair.frontUnder[g])
				data.sprites.hair.frontUnder[g].translate(125,100)
				data.sprites.hair.frontUnder[g].scale(5)
				generateSprite(data.sprites.hair.frontUnder[g],72,g*data.sprites.detail)
				//console.log('Generated HFU-'+(g+1))

				data.sprites.hair.front.push(createGraphics(250,300))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(125,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],74,g*data.sprites.detail)
				data.sprites.hair.front[g].image(data.sprites.hair.frontUnder[g],-25,-20,50,60)
				//console.log('Generated HF-'+(g+1))

				data.sprites.hair.back.push(createGraphics(250,300))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(125,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],73,g*data.sprites.detail)
				//console.log('Generated HB-'+(g+1))
				
				data.sprites.jacket.push(createGraphics(100,250))
				setupLayer(data.sprites.jacket[g])
				data.sprites.jacket[g].translate(50,125)
				data.sprites.jacket[g].scale(5)
				generateSprite(data.sprites.jacket[g],75,g*data.sprites.detail)
				//console.log('Generated SGJ-'+(g+1))
			}
			data.sprites.wing.push(createGraphics(400,300))
			setupLayer(data.sprites.wing[0])
			data.sprites.wing[0].translate(350,250)
			data.sprites.wing[0].scale(5)
			generateSprite(data.sprites.wing[0],76,0)
		break
		case 20:
			graphics.combatant.push({
				spin:{tail:[-96,96]},
				sprites:{detail:15,genAmount:0,animDirection:0,temp:0,hair:{back:[],front:[],tail:[[],[]]},kimono:{main:{back:[],front:[]},mainDamage:{back:[],front:[]}}},
				parts:{tail:[[],[]],kimono:{main:[],mainTop:[],decoration:{large:[]},mainDamage:[],mainAnti:[],underDamage:[],underAnti:[]}},
				color:{
					hair:{back:[227,133,149],front:[255,198,205],insideBack:[213,111,133],insideFront:[253,167,178],tail:{start:[255,198,206],end:[241,167,182]},pin:[[241,240,246],[198,137,171],[106,106,116]],glow:[255,255,255]},
					skin:{head:[253,235,223],body:[248,218,210],legs:[254,225,220],arms:[252,224,220],button:[228,163,159],blush:[229,176,162]},
					eye:{back:[184,125,153],front:[41,20,54],glow:[255,222,239]},
					sleeve:{back:[201,30,82],front:[235,84,115]},
					under:{outside:[255,240,240],fringe:[[255,180,180],[255,200,200],[255,150,150],[255,170,170],[255,120,120]],shawl:[255,210,210],bow:{main:[255,140,140],extra:[255,80,80]},tanga:[219,210,218],under:{top:[246,200,195],button:[221,139,143],bottom:[[242,158,152],[224,135,137]]}},
                    kimono:{bow:[141,43,51],main:{start:[205,35,64],end:[250,149,163]},mainBack:{start:[143,9,36],end:[211,41,68]},under:{start:[254,254,254],end:[239,242,251]},underBack:{start:[235,228,236],end:[239,242,251]}},
					wrap:{in:[210,182,75],out:[158,109,51],decoration:[255,247,176],center:[183,49,60],bow:{in:[132,223,214],out:[71,168,174]},sleeveIn:[255,255,255],sleeveOut:[201,176,215]},
					mouth:{in:[255,169,177],out:[0,0,0]},
				}
			})

			data=graphics.combatant[graphics.combatant.length-1]

			data.parts.hair={
				main:[
                    {spin:[-48,-18,-30],height:2},
                    {spin:[18,48,30],height:2},
                    {spin:[-54,-24,-36],height:3},
                    {spin:[24,54,36],height:3},
                    {spin:[-84,-36,-60],height:6},
                    {spin:[36,84,60],height:6},
                    {spin:[-90,-72,-78],height:14},
                    {spin:[72,90,78],height:14},
                    {spin:[-132,-78,-102],height:10},
                    {spin:[78,132,102],height:10},
                    {spin:[-180,-102,-144],height:11},
                    {spin:[102,180,144],height:11},
                    {spin:[132,-132,180],height:12},
                ],inside:[
					{spin:[-60,-30,-48],height:4},
                    {spin:[30,60,48],height:4},
                    {spin:[-81,-66,-75],height:8},
                    {spin:[66,81,75],height:8},
                    {spin:[-108,-75,-93],height:9},
                    {spin:[75,108,93],height:9},
                    {spin:[-150,-90,-120],height:10},
                    {spin:[90,150,120],height:10},
                    {spin:[-180,-132,-162],height:11},
                    {spin:[132,180,162],height:11},
                ],reverse:[
                    {spin:[-18,0,-12],height:-1},
                    {spin:[0,18,12],height:-1},
                    {spin:[-9,9,0],height:-2.5},
                    {spin:[0,9,6],height:-6},
                ],tail:[
					[14,-2,-24],
					[16.5,2,-9],
					[17.5,7,0],
					[17.25,13,6],
					[16.75,19,12],
				]
			}
			
			data.sprites.genAmount=360/data.sprites.detail

			for(let g=0;g<9;g++){
				data.parts.kimono.main.push({spin:[-108+g*24,-84+g*24,-96+g*24],y:[0,0,10.5+g*1.5]})
				data.parts.kimono.main.push({spin:[-96+g*24,-84+g*24,-84+g*24],y:[10.5+g*1.5,0,12.5+g*1.5]})
				data.parts.kimono.main.push({spin:[-84+g*24,-72+g*24,-84+g*24],y:[12.5+g*1.5,12+g*1.5,0]})
			}
			data.parts.kimono.main.push({spin:[96,120,120],y:[0,0,24]})
			for(let g=0;g<5;g++){
				data.parts.kimono.main.push({spin:[120+g*24,132+g*24,120+g*24],y:[0,26,24+min(g,1)]})
				data.parts.kimono.main.push({spin:[114+g*24,150+g*24,132+g*24],y:[0,0,26]})
				data.parts.kimono.main.push({spin:[132+g*24,144+g*24,144+g*24],y:[26,0,28-max(g,3)]})
			}
			data.parts.kimono.main.push({spin:[240,264,240],y:[0,0,24]})
			for(let g=8;g>=-7;g--){
				data.parts.kimono.main.push({spin:[84-g*24,72-g*24,84-g*24],y:[12.5+g*1.5,12+g*1.5,0]})
				data.parts.kimono.main.push({spin:[96-g*24,84-g*24,84-g*24],y:[max(0,10.5+g*1.5),0,12.5+g*1.5]})
				data.parts.kimono.main.push({spin:[108-g*24,84-g*24,96-g*24],y:[0,0,max(0,10.5+g*1.5)]})
			}
			for(let g=-15;g<15;g++){
				data.parts.kimono.mainTop.push(g>=0?{spin:[-84+g*24,-66+g*24,-75+g*24],y:[0,0,-0.75]}:{spin:[0,0,0],y:[-999,-999,-999]})
			}
			for(let g=0;g<2;g++){
				data.parts.kimono.decoration.large.push({spin:100-g*40,rotate:random(0,360),y:40.5-g*2.5,type:floor(random(0,15))})
			}
			data.parts.kimono.decoration.large.push({spin:140,rotate:random(0,360),y:43,type:floor(random(0,15))})
			data.parts.kimono.decoration.large.push({spin:180,rotate:random(0,360),y:43.5,type:floor(random(0,15))})
			data.parts.kimono.decoration.large.push({spin:220,rotate:random(0,360),y:43,type:floor(random(0,15))})
			for(let g=0;g<7;g++){
				data.parts.kimono.decoration.large.push({spin:260+g*40,rotate:random(0,360),y:40.5-g*2.5,type:floor(random(0,15))})
			}

			data.parts.kimono.decoration.large.push({spin:108,rotate:random(0,360),y:34,type:floor(random(0,15))})
			data.parts.kimono.decoration.large.push({spin:156,rotate:random(0,360),y:37,type:floor(random(0,15))})
			data.parts.kimono.decoration.large.push({spin:204,rotate:random(0,360),y:37,type:floor(random(0,15))})
			for(let g=0;g<5;g++){
				data.parts.kimono.decoration.large.push({spin:252+g*48,rotate:random(0,360),y:34-g*3,type:floor(random(0,15))})
			}

			data.parts.kimono.decoration.large.push({spin:124,rotate:random(0,360),y:27.5,type:floor(random(0,15))})
			data.parts.kimono.decoration.large.push({spin:180,rotate:random(0,360),y:31,type:floor(random(0,15))})
			for(let g=0;g<2;g++){
				data.parts.kimono.decoration.large.push({spin:234+g*56,rotate:random(0,360),y:27.5-g*3.5,type:floor(random(0,15))})
			}
			if(options.damage){
				for(let g=0;g<9;g++){
					data.parts.kimono.mainDamage.push({spin:[-108+g*24,-84+g*24,-96+g*24],y:[0,0,10.5+g*1.5]})
					data.parts.kimono.mainDamage.push({spin:[-96+g*24,-84+g*24,-84+g*24],y:[10.5+g*1.5,0,12.5+g*1.5]})
					data.parts.kimono.mainDamage.push({spin:[-84+g*24,-72+g*24,-84+g*24],y:[12.5+g*1.5,12+g*1.5,0]})
				}
				data.parts.kimono.mainDamage.push({spin:[96,120,120],y:[0,0,24]})
				for(let g=0;g<5;g++){
					data.parts.kimono.mainDamage.push({spin:[120+g*24,132+g*24,120+g*24],y:[0,26,24+min(g,1)]})
					data.parts.kimono.mainDamage.push({spin:[114+g*24,150+g*24,132+g*24],y:[0,0,26]})
					data.parts.kimono.mainDamage.push({spin:[132+g*24,144+g*24,144+g*24],y:[26,0,28-max(g,3)]})
				}
				data.parts.kimono.mainDamage.push({spin:[240,264,240],y:[0,0,24]})
				for(let g=8;g>=-7;g--){
					data.parts.kimono.mainDamage.push({spin:[84-g*24,72-g*24,84-g*24],y:[12.5+g*1.5,12+g*1.5,0]})
					data.parts.kimono.mainDamage.push({spin:[96-g*24,84-g*24,84-g*24],y:[max(0,10.5+g*1.5),0,12.5+g*1.5]})
					data.parts.kimono.mainDamage.push({spin:[108-g*24,84-g*24,96-g*24],y:[0,0,max(0,10.5+g*1.5)]})
				}
				for(let g=0;g<9;g++){
					data.parts.kimono.underDamage.push({spin:[-108+g*24,-84+g*24,-96+g*24],y:[0,0,10.5+g*1.5]})
					data.parts.kimono.underDamage.push({spin:[-96+g*24,-84+g*24,-84+g*24],y:[10.5+g*1.5,0,12.5+g*1.5]})
					data.parts.kimono.underDamage.push({spin:[-84+g*24,-72+g*24,-84+g*24],y:[12.5+g*1.5,12+g*1.5,0]})
				}
				data.parts.kimono.underDamage.push({spin:[96,120,120],y:[0,0,24]})
				for(let g=0;g<5;g++){
					data.parts.kimono.underDamage.push({spin:[120+g*24,132+g*24,120+g*24],y:[0,26,24+min(g,1)]})
					data.parts.kimono.underDamage.push({spin:[114+g*24,150+g*24,132+g*24],y:[0,0,26]})
					data.parts.kimono.underDamage.push({spin:[132+g*24,144+g*24,144+g*24],y:[26,0,28-max(g,3)]})
				}
				data.parts.kimono.underDamage.push({spin:[240,264,240],y:[0,0,24]})
				for(let g=8;g>=-7;g--){
					data.parts.kimono.underDamage.push({spin:[84-g*24,72-g*24,84-g*24],y:[12.5+g*1.5,12+g*1.5,0]})
					data.parts.kimono.underDamage.push({spin:[96-g*24,84-g*24,84-g*24],y:[max(0,10.5+g*1.5),0,12.5+g*1.5]})
					data.parts.kimono.underDamage.push({spin:[108-g*24,84-g*24,96-g*24],y:[0,0,max(0,10.5+g*1.5)]})
				}
				for(let g=0,lg=data.parts.kimono.mainDamage.length;g<lg;g++){
					for(let h=0,lh=data.parts.kimono.mainDamage[g].y.length;h<lh;h++){
						data.parts.kimono.mainDamage[g].y[h]=max(0,data.parts.kimono.mainDamage[g].y[h]-(2+g*4+h*1.5)**1.2%3)
					}
				}
				for(let g=0,lg=data.parts.kimono.underDamage.length;g<lg;g++){
					for(let h=0,lh=data.parts.kimono.underDamage[g].y.length;h<lh;h++){
						data.parts.kimono.underDamage[g].y[h]=max(0,data.parts.kimono.underDamage[g].y[h]-(3+g*4.75+h*1.75)**1.2%3)
					}
				}
				for(let g=0;g<12;g++){
					data.parts.kimono.mainAnti.push({spin:[-93-g*30,-57-g*30,-75-g*30],y:[-1,-1,((g+1.5)**1.5%3)/2]})
				}
				for(let g=0;g<24;g++){
					data.parts.kimono.underAnti.push({spin:[-90-g*15,-72-g*15,-81-g*15],y:[-1,-1,((g+1)**1.75%3)/2]})
				}
			}
			for(let g=0;g<2;g++){
				for(let h=0;h<5;h++){
					data.parts.tail[g].push([[],[]])
					for(let i=0;i<6;i++){
						data.parts.tail[g][h][0].push({spin:[h*30+i*60-30,h*30+i*60+30,h*30+i*60],y:[0,0,-3]})
						data.parts.tail[g][h][1].push({spin:[h*30+i*60-30,h*30+i*60+30,h*30+i*60],y:[0,0,3]})
					}
				}
			}

			data.sprites.hair={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.hair.front.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.front[g])
				data.sprites.hair.front[g].translate(100,100)
				data.sprites.hair.front[g].scale(5)
				generateSprite(data.sprites.hair.front[g],29,g*data.sprites.detail)
				//console.log('Generated U-HF-'+(g+1))
				data.sprites.hair.back.push(createGraphics(200,300))
				setupLayer(data.sprites.hair.back[g])
				data.sprites.hair.back[g].translate(100,100)
				data.sprites.hair.back[g].scale(5)
				generateSprite(data.sprites.hair.back[g],30,g*data.sprites.detail)
				//console.log('Generated U-HB-'+(g+1))
			}
			data.sprites.kimono.main={front:[],back:[]}
			for(let g=0;g<data.sprites.genAmount;g++){
				data.sprites.kimono.main.front.push(createGraphics(200,330))
				setupLayer(data.sprites.kimono.main.front[g])
				data.sprites.kimono.main.front[g].translate(100,0)
				data.sprites.kimono.main.front[g].scale(5)
				generateSprite(data.sprites.kimono.main.front[g],31,g*data.sprites.detail)
				//console.log('Generated U-KMF-'+(g+1))
				data.sprites.kimono.main.back.push(createGraphics(200,330))
				setupLayer(data.sprites.kimono.main.back[g])
				data.sprites.kimono.main.back[g].translate(100,0)
				data.sprites.kimono.main.back[g].scale(5)
				generateSprite(data.sprites.kimono.main.back[g],32,g*data.sprites.detail)
				//console.log('Generated U-KMB-'+(g+1))
			}
			if(options.damage){
				data.sprites.kimono.mainDamage={front:[],back:[]}
				for(let g=0;g<data.sprites.genAmount;g++){
					data.sprites.kimono.mainDamage.front.push(createGraphics(200,330))
					setupLayer(data.sprites.kimono.mainDamage.front[g])
					data.sprites.kimono.mainDamage.front[g].translate(100,0)
					data.sprites.kimono.mainDamage.front[g].scale(5)
					generateSprite(data.sprites.kimono.mainDamage.front[g],33,g*data.sprites.detail)
					//console.log('Generated U-KMF-'+(g+1))
					data.sprites.kimono.mainDamage.back.push(createGraphics(200,330))
					setupLayer(data.sprites.kimono.mainDamage.back[g])
					data.sprites.kimono.mainDamage.back[g].translate(100,0)
					data.sprites.kimono.mainDamage.back[g].scale(5)
					generateSprite(data.sprites.kimono.mainDamage.back[g],34,g*data.sprites.detail)
					//console.log('Generated U-KMB-'+(g+1))
				}
			}
		break
		
	}
	//mark c
}
function setupCombatantBackground(type,player,a,la,damage,layer){
	let p1
	switch(type){
		case 0:
			p1=new combatant(layer,graphics.proxyBattle,425-la*87.5+a*525,535,0,0,0,0,player[a],0,0,-30)
			//p1=new combatant(layer,graphics.proxyBattle,425+(a-4)*87.5,535,0,0,0,0,player[a],0,0,-30)
			switch(p1.name){
				case 'George':
					p1.parts.mouth-=4
					p1.anim.mouth.x+=3
					p1.anim.mouth.y--
					p1.spin.mouth-=180
					p1.anim.legs=[{top:12,bottom:3,length:{top:18,bottom:18}},{top:9,bottom:30,length:{top:18,bottom:18}}]
                    p1.anim.arms=[{top:105,bottom:-150,length:{top:18,bottom:18}},{top:33,bottom:-3,length:{top:18,bottom:18}}]
                	p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:60}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Lira': case 'Sakura': case 'Ume':
					switch(p1.name){
						case 'Lira':
							p1.parts.mouth-=4
							p1.spin.mouth-=180
						break
						case 'Sakura':
							p1.anim.mouth.y++
						break
						case 'Ume':
							p1.parts.mouth-=2
							p1.spin.mouth-=180
						break
					}
					p1.spin.sword=36-(player[a]-2)*24
					p1.anim.legs=[
						{top:24-(player[a]-2)*12,bottom:12-(player[a]-2)*9,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
						{top:12-(player[a]-2)*6,bottom:36-(player[a]-2)*6,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
					]
					p1.anim.arms=[
						{top:36-(player[a]-2)*9,bottom:-6+(player[a]-2)*87,length:{top:16,bottom:16}},
						{top:27-(player[a]-2)*3,bottom:108-(player[a]-2)*90,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:60,bottom:60,lock:0}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:120,bottom:141-(player[a]-2)*45,lock:0}]
				break
				case 'Certes':
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:30,bottom:24,length:{top:16,bottom:16}},
						{top:12,bottom:6,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:33,bottom:84,length:{top:16,bottom:16}},
						{top:33,bottom:84,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:42,lock:0},{top:0,bottom:0,lock:0}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Azis':
					p1.parts.mouth-=4
					p1.anim.mouth.x+=3
					p1.anim.mouth.y--
					p1.spin.mouth-=180
					p1.anim.legs=[
						{top:18,bottom:3,length:{top:16.5,bottom:16.5}},
						{top:15,bottom:45,length:{top:16.5,bottom:16.5}}
					]
                    p1.anim.arms=[
						{top:48,bottom:78,length:{top:16.5,bottom:16.5}},
						{top:36,bottom:-9,length:{top:16.5,bottom:16.5}}
					]
                	p1.spin.legs=[
						{top:-60,bottom:-120},
						{top:60,bottom:60}
					]
					p1.spin.arms=[
						{top:-93,bottom:-75,lock:0},
						{top:93,bottom:75,lock:0}
					]
				break
				case 'Donakho':
					p1.anim.arms[0].top=42
					p1.anim.arms[1].top=84
					p1.anim.legs[0].top=6
				break
				case 'Setsuna':
					p1.parts.mouth-=4
					p1.spin.mouth-=180
					p1.spin.sword=21
					p1.anim.legs=[
						{top:24,bottom:12,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
						{top:12,bottom:36,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
					]
					p1.anim.arms=[
						{top:69,bottom:144,length:{top:17,bottom:17}},
						{top:33,bottom:9,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:60,bottom:60,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-81,lock:0},{top:90,bottom:84,lock:0}]
				break
				case 'Airi':
					p1.anim.mouth.y--
					p1.parts.mouth++
					p1.position.x-=15
					p1.anim.legs=[
						{top:6,bottom:3,length:{top:16,bottom:16}},
						{top:12,bottom:15,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:36,bottom:75,length:{top:16,bottom:16}},
						{top:27,bottom:48,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:60,bottom:60,lock:0}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:120,bottom:141,lock:0}]
				break
				case 'Edgar':
					p1.position.y-=1
					p1.position.x+=2.5
					p1.parts.mouth-=3
					p1.anim.mouth.y--
					p1.spin.mouth-=180
					p1.anim.legs=[{top:0,bottom:0,length:{top:17,bottom:17}},{top:6,bottom:27,length:{top:17,bottom:17}}]
					p1.anim.arms=[{top:42,bottom:-30,length:{top:17,bottom:17}},{top:42,bottom:-30,length:{top:17,bottom:17}}]
					p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:60}]
					p1.spin.arms=[{top:-90,bottom:-66,lock:0},{top:90,bottom:66,lock:0}]
				break
				case 'Chip':
					p1.position.y-=1
					p1.position.x-=7.5
					p1.anim.mouth.y++
					p1.anim.legs=[{top:18,bottom:6,length:{top:17,bottom:17}},{top:6,bottom:12,length:{top:17,bottom:17}}]
					p1.anim.arms=[{top:36,bottom:-24,length:{top:17,bottom:17}},{top:60,bottom:108,length:{top:17,bottom:17}}]
					p1.spin.legs=[{top:-60,bottom:-60},{top:60,bottom:60}]
					p1.spin.arms=[{top:-93,bottom:-99,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Joe':
					p1.position.y-=1
					p1.anim.legs=[{top:9,bottom:3,length:{top:17,bottom:17}},{top:6,bottom:27,length:{top:17,bottom:17}}]
					p1.anim.arms=[{top:48,bottom:-36,length:{top:17,bottom:17}},{top:48,bottom:-36,length:{top:17,bottom:17}}]
					p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:60}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Shiru':
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:33,bottom:72,length:{top:15.5,bottom:15.5}},
						{top:6,bottom:-3,length:{top:15.5,bottom:15.5}}
					]
					p1.anim.arms=[
						{top:36,bottom:51,length:{top:15.5,bottom:15.5}},
						{top:36,bottom:51,length:{top:15.5,bottom:15.5}}
					]
					p1.spin.legs=[{top:-60,bottom:42,lock:0},{top:0,bottom:0,lock:0}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'DD-610':
					p1.anim.legs=[
						{top:3,bottom:1.5,length:{top:17,bottom:17}},
						{top:3,bottom:1.5,length:{top:17,bottom:17}}
					]
                    p1.anim.arms=[
						{top:12,bottom:3,length:{top:17,bottom:17}},
						{top:12,bottom:3,length:{top:17,bottom:17}}
					]
                	p1.spin.legs=[
						{top:-60,bottom:-120},
						{top:60,bottom:60}
					]
					p1.spin.arms=[
						{ top:-93,bottom:-75,lock:0},
						{top:93,bottom:75,lock:0}
					]
				break
				case 'Prehextorica':
					p1.anim.legs=[
						{top:24,bottom:18,length:{top:17,bottom:17}},
						{top:24,bottom:18,length:{top:17,bottom:17}}
					]
                    p1.anim.arms=[
						{top:54,bottom:-42,length:{top:17,bottom:17}},
						{top:66,bottom:-36,length:{top:17,bottom:17}}
					]
                	p1.spin.legs=[
						{top:-75,bottom:-105},
						{top:75,bottom:90}
					]
					p1.spin.arms=[
						{top:-96,bottom:-72,lock:0},
						{top:84,bottom:72,lock:0}
					]
				break
				case 'Vincent':
					p1.anim.legs=[
						{top:6,bottom:9,length:{top:17,bottom:17}},
						{top:12,bottom:18,length:{top:17,bottom:17}}
					]
                    p1.anim.arms=[
						{top:24,bottom:-18,length:{top:17,bottom:17}},
						{top:12,bottom:36,length:{top:17,bottom:17}}
					]
                	p1.spin.legs=[
						{top:-75,bottom:-105},
						{top:75,bottom:90}
					]
					p1.spin.arms=[
						{top:-96,bottom:-72,lock:0},
						{top:84,bottom:48,lock:0}
					]
				break
				case 'Daiyousei':
					p1.position.y-=60
					p1.anim.mouth.y++
					p1.anim.eye=[1,1]
					p1.anim.eyeStyle=[1,1]
					p1.anim.legs=[
						{top:24,bottom:63,length:{top:15,bottom:15}},
						{top:6,bottom:-18,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:36,bottom:63,length:{top:15,bottom:15}},
						{top:36,bottom:51,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-60,bottom:42,lock:0},{top:0,bottom:0,lock:0}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:102,lock:0}]
				break
				case 'Sanae':
					p1.spin.sword=165
					p1.anim.legs=[
						{top:15,bottom:3,length:{top:16.5,bottom:16.5}},
						{top:27,bottom:24,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:75,bottom:156,length:{top:16.5,bottom:16.5}},
						{top:15,bottom:3,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:45,bottom:60,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-81,lock:0},{top:90,bottom:84,lock:0}]
				break
				case 'Shinmyoumaru':
					p1.position.x+=10
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:12,bottom:9,length:{top:15,bottom:15}},
						{top:12,bottom:36,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:36,bottom:51,length:{top:15,bottom:15}},
						{top:36,bottom:51,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:45,bottom:90,lock:0}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Merlin':
					p1.anim.mouth.y++
					p1.anim.eye=[1,1]
					p1.anim.eyeStyle=[1,1]
					p1.anim.legs=[
						{top:33,bottom:18,length:{top:16.5,bottom:16.5}},
						{top:6,bottom:-15,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:36,bottom:-12,length:{top:16.5,bottom:16.5}},
						{top:36,bottom:-12,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:0,bottom:60,lock:0}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Ducopo':
					p1.position.y+=10
					p1.anim.arms[0].top=72
					p1.anim.arms[1].top=60
					p1.anim.legs[0].top=30
					p1.anim.legs[1].top=36
				break
				case 'Randy':
					p1.position.y-=1
					p1.position.x+=2.5
					p1.anim.legs=[{top:9,bottom:3,length:{top:17,bottom:17}},{top:12,bottom:15,length:{top:17,bottom:17}}]
					p1.anim.arms=[{top:24,bottom:-33,length:{top:17,bottom:17}},{top:24,bottom:-33,length:{top:17,bottom:17}}]
					p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:60}]
					p1.spin.arms=[{top:-90,bottom:-66,lock:0},{top:90,bottom:66,lock:0}]
				break
				case 'Sagume':
					p1.anim.legs=[
						{top:15,bottom:3,length:{top:16.75,bottom:16.75}},
						{top:27,bottom:24,length:{top:16.75,bottom:16.75}}
					]
					p1.anim.arms=[
						{top:105,bottom:123,length:{top:16.75,bottom:16.75}},
						{top:15,bottom:3,length:{top:16.75,bottom:16.75}}
					]
					p1.spin.legs=[{top:-60,bottom:-60},{top:30,bottom:60}]
					p1.spin.arms=[{top:-90,bottom:12,lock:0},{top:90,bottom:84,lock:0}]
				break
				case 'Fernando':
					p1.anim.legs=[
						{top:15,bottom:9,length:{top:13,bottom:13}},
						{top:33,bottom:24,length:{top:13,bottom:13}}
					]
					p1.anim.arms=[
						{top:48,bottom:54,length:{top:13,bottom:13}},
						{top:15,bottom:3,length:{top:13,bottom:13}}
					]
					p1.spin.legs=[{top:-60,bottom:-60},{top:48,bottom:60}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:84,lock:0}]
				break
				case 'Decratite':
					p1.anim.legs=[
						{top:12,bottom:9,length:{top:17,bottom:17}},
						{top:24,bottom:18,length:{top:17,bottom:17}}
					]
                    p1.anim.arms=[
						{top:36,bottom:-24,length:{top:17,bottom:17}},
						{top:45,bottom:36,length:{top:17,bottom:17}}
					]
                	p1.spin.legs=[
						{top:-75,bottom:-105},
						{top:75,bottom:90}
					]
					p1.spin.arms=[
						{top:-96,bottom:-72,lock:0},
						{top:84,bottom:72,lock:0}
					]
				break
				case 'Dukelis':
					p1.position.y+=10
					p1.anim.arms[0].top=96
					p1.anim.arms[1].top=33
					p1.anim.legs[0].top=27
					p1.anim.legs[1].top=36
				break

			}
			p1.size=2.5
			p1.fade=1
			p1.graphic=true
			if(damage[a]==1&&options.damage){
				p1.trigger.display.extra.damage=true
			}
			return p1
		case 1:
			p1=new combatant(layer,graphics.proxyBattle,475-la*50+a*200,470+a*20,0,0,0,0,player[a],0,0,-45)
			switch(p1.name){
				case 'George':
					p1.position.y+=5
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:30,bottom:60-a*36,length:{top:18,bottom:18}},
						{top:18+a*6,bottom:-48-a*24,length:{top:18,bottom:18}}
					]
					p1.anim.arms=[
						{top:36,bottom:12,length:{top:18,bottom:18}},
						{top:36+a*12,bottom:60-a*42,length:{top:18,bottom:18}}
					]
					p1.spin.legs=[{top:-180,bottom:-180,lock:0},{top:-60,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Lira': case 'Sakura': case 'Certes': case 'Ume':
					if(p1.name=='Sakura'){
						p1.parts.mouth+=4
						p1.spin.mouth+=180
					}
					p1.anim.mouth.y++
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:30-a*6,bottom:-60-a*24,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
						{top:6-a*18,bottom:-24-a*42,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
					]
					p1.anim.arms=[
						{top:36,bottom:12,length:{top:16,bottom:16}},
						{top:36+a*12,bottom:60-a*42,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-45,bottom:-45,lock:0},{top:-30,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Certes':
					p1.parts.mouth+=3
					p1.spin.mouth+=156
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:30-a*6,bottom:-60-a*24,length:{top:16,bottom:16}},
						{top:6-a*18,bottom:-24-a*42,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:36,bottom:12,length:{top:16,bottom:16}},
						{top:36+a*12,bottom:60-a*42,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-45,bottom:-45,lock:0},{top:-30,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Azis':
					p1.position.y+=7.5
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:30,bottom:48-a*18,length:{top:16.5,bottom:16.5}},
						{top:12+a*3,bottom:-36-a*15,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:36,bottom:12,length:{top:16.5,bottom:16.5}},
						{top:18+a*3,bottom:24-a*6,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-180,bottom:-180,lock:0},{top:-60,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Donakho':
					p1.parts.eyeLevel++
				break
				case 'Setsuna':
					p1.anim.mouth.y++
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:30-a*6,bottom:-60-a*24,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
						{top:6-a*18,bottom:-24-a*42,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
					]
					p1.anim.arms=[
						{top:36,bottom:12,length:{top:17,bottom:17}},
						{top:36+a*12,bottom:60-a*42,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-45,bottom:-45,lock:0},{top:-30,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Edgar': case 'Chip': case 'Joe':
					p1.position.y+=10
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:18,bottom:30-a*18,length:{top:17,bottom:17}},
						{top:9+a*3,bottom:-24-a*12,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:18,bottom:6,length:{top:17,bottom:17}},
						{top:18+a*6,bottom:30-a*21,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-180,bottom:-180,lock:0},{top:-60,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Airi':
					p1.parts.mouth+=3
					p1.spin.mouth+=180
					p1.anim.mouth.y--
					p1.anim.legs=[
						{top:30-a*6,bottom:-60-a*24,length:{top:16,bottom:16}},
						{top:6-a*18,bottom:-24-a*42,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:36,bottom:12,length:{top:16,bottom:16}},
						{top:36+a*12,bottom:60-a*42,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-45,bottom:-45,lock:0},{top:-30,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Shiru':
					p1.parts.mouth+=2.5
					p1.spin.mouth+=156
					p1.anim.mouth.y--
					p1.anim.legs=[
						{top:18-a*9,bottom:-54-a*18,length:{top:15.5,bottom:15.5}},
						{top:-6-a*15,bottom:-18-a*33,length:{top:15.5,bottom:15.5}}
					]
					p1.anim.arms=[
						{top:27,bottom:9,length:{top:15.5,bottom:15.5}},
						{top:24+a*3,bottom:54-a*48,length:{top:15.5,bottom:15.5}}
					]
					p1.spin.legs=[{top:-45,bottom:-45,lock:0},{top:-30,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'DD-610':
					p1.position.y+=4
					p1.anim.legs=[
						{top:6+a*3,bottom:-3+a*6,length:{top:17,bottom:17}},
						{top:6-a*3,bottom:-39-a*9,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:24,bottom:6+a*3,length:{top:17,bottom:17}},
						{top:18-a*3,bottom:12-a*3,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-180,bottom:-180,lock:0},{top:-60,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Prehextorica':
					p1.anim.direction-=15
					p1.position.y+=7.5
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:21-a*3,bottom:-48-a*6,length:{top:17,bottom:17}},
						{top:9,bottom:12-a*24,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:177,bottom:150+a*3,length:{top:17,bottom:17}},
						{top:15+a*3,bottom:24-a*9,length:{top:17,bottom:17}}
					]
					p1.parts.arms[0].top.y-=5
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:120,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-150,lock:0},{top:90,bottom:120,lock:0}]
				break
				case 'Vincent':
					p1.anim.direction+=10
					p1.position.y+=15
					p1.anim.legs=[
						{top:6,bottom:-12,length:{top:17,bottom:17}},
						{top:15,bottom:9,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:27,bottom:12,length:{top:17,bottom:17}},
						{top:27-a*6,bottom:12+a*24,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-90,bottom:-90,lock:0},{top:120,bottom:120,lock:0}]
					p1.spin.arms=[{top:-135,bottom:-135,lock:0},{top:105,bottom:105,lock:0}]
				break
				case 'Daiyousei':
					p1.parts.mouth+=2.5
					p1.spin.mouth+=168
					p1.anim.legs=[
						{top:9,bottom:27,length:{top:15,bottom:15}},
						{top:9,bottom:6,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:27,bottom:9,length:{top:15,bottom:15}},
						{top:27,bottom:9,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-90,bottom:135,lock:0},{top:90,bottom:105,lock:0}]
					p1.spin.arms=[{top:-96,bottom:-165,lock:0},{top:96,bottom:108,lock:0}]
				break
				case 'Sanae':
					p1.parts.mouth+=3.5
					p1.spin.mouth+=183
					p1.anim.mouth.y++
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:-12-a*6,bottom:-60-a*24,length:{top:16.5,bottom:16.5}},
						{top:-30-a*24,bottom:-24-a*42,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:36,bottom:12,length:{top:16.5,bottom:16.5}},
						{top:51-a*3,bottom:15-a*9,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-75,bottom:-75,lock:0},{top:-60,bottom:-75,lock:0}]
					p1.spin.arms=[{top:-120,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Shinmyoumaru':
					p1.parts.mouth+=2.5
					p1.spin.mouth+=183
					p1.anim.mouth.y--
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:24-a*9,bottom:-72-a*9,length:{top:15,bottom:15}},
						{top:-6-a*15,bottom:-36-a*18,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:27,bottom:27,length:{top:15,bottom:15}},
						{top:45+a*18,bottom:51-a*42,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-45,bottom:-45,lock:0},{top:-30,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Merlin':
					p1.trigger.display.star=false
					p1.parts.mouth+=2.5
					p1.spin.mouth+=156
					p1.anim.mouth.y--
					p1.anim.legs=[
						{top:36-a*9,bottom:-81+a*6,length:{top:16.5,bottom:16.5}},
						{top:-30-a*9,bottom:-39-a*15,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:27,bottom:9,length:{top:16.5,bottom:16.5}},
						{top:42+a*15,bottom:69+a*12,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-45,bottom:-45,lock:0},{top:-30,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Ducopo':
					p1.parts.eyeLevel++
					p1.anim.arms[0].top=54
					p1.anim.arms[1].top=45
					p1.anim.legs[0].top=12
					p1.anim.legs[1].top=42
				break
				case 'Randy':
					p1.position.y+=10
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:9,bottom:12-a*3,length:{top:17,bottom:17}},
						{top:3+a*6,bottom:-15-a*3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:36,bottom:-12,length:{top:17,bottom:17}},
						{top:24+a*15,bottom:39-a*24,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-180,bottom:-180,lock:0},{top:-60,bottom:-45,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-120,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Sagume':
					p1.parts.mouth+=3
					p1.anim.mouth.y--
					p1.spin.mouth+=174
					p1.anim.direction+=75
					p1.anim.legs=[
						{top:9+a*6,bottom:48-a*15,length:{top:16.75,bottom:16.75}},
						{top:3+a*6,bottom:15+a*33,length:{top:16.75,bottom:16.75}}
					]
					p1.anim.arms=[
						{top:72,bottom:177,length:{top:16.75,bottom:16.75}},
						{top:33-a*6,bottom:21-a*3,length:{top:16.75,bottom:16.75}}
					]
					p1.spin.legs=[{top:-60,bottom:36},{top:36,bottom:48}]
					p1.spin.arms=[{top:-30,bottom:-12,lock:0},{top:90,bottom:105,lock:0}]
				break
				case 'Fernando':
					p1.anim.legs=[
						{top:12,bottom:48,length:{top:13,bottom:13}},
						{top:12,bottom:12,length:{top:13,bottom:13}}
					]
					p1.anim.arms=[
						{top:27,bottom:36,length:{top:13,bottom:13}},
						{top:27,bottom:15,length:{top:13,bottom:13}}
					]
					p1.spin.legs=[{top:-90,bottom:-144},{top:90,bottom:132}]
					p1.spin.arms=[{top:-105,bottom:-147,lock:0},{top:90,bottom:132,lock:0}]
				break
				case 'Decratite':
					p1.anim.direction-=15
					p1.position.y+=7.5
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:21-a*3,bottom:-48-a*6,length:{top:17,bottom:17}},
						{top:9,bottom:12-a*24,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:177,bottom:150+a*3,length:{top:17,bottom:17}},
						{top:15+a*3,bottom:24-a*9,length:{top:17,bottom:17}}
					]
					p1.parts.arms[0].top.y-=5
					p1.spin.legs=[{top:-75,bottom:-75,lock:0},{top:135,bottom:135,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-150,lock:0},{top:105,bottom:132,lock:0}]
				break
				case 'Dukelis':
					p1.parts.eyeLevel++
					p1.anim.arms[0].top=33
					p1.anim.arms[1].top=75
					p1.anim.legs[0].top=9
					p1.anim.legs[1].top=33
				break
			}
			p1.anim.eye=[1,1]
			p1.size=2.5
			p1.fade=1
			p1.direction=84
			p1.graphic=true
			if(damage[a]==1&&options.damage){
				p1.trigger.display.extra.damage=true
			}
			return p1
		case 2:
			p1=new combatant(layer,graphics.proxyBattle,225+a*450,314,0,0,0,0,player[a],0,0,30-a*60)
			switch(p1.name){
				case 'Donakho': case 'Ducopo':
					p1.position.y+=2
				break
			}
			p1.size=1
			p1.fade=1
			p1.graphic=true
			if(damage[a]==1&&options.damage){
				p1.trigger.display.extra.damage=true
			}
			return p1
		case 3:
			p1=new combatant(layer,graphics.proxyBattle,350-a*100,520,0,0,0,0,player[a],0,0,30+a*3)
			switch(p1.name){
				case 'George':
					p1.position.y-=42.5
					p1.anim.legs=[
						{top:6,bottom:6,length:{top:18,bottom:18}},
						{top:6,bottom:6,length:{top:18,bottom:18}}
					]
					p1.anim.arms=[
						{top:36,bottom:72-a*12,length:{top:18,bottom:18}},
						{top:36,bottom:72-a*12,length:{top:18,bottom:18}}
					]
					p1.spin.legs=[{top:-60,bottom:-150+a*15,lock:0},{top:60,bottom:150-a*15,lock:0}]
					p1.spin.arms=[{top:-84-a*3,bottom:-12-a*15,lock:0},{top:84+a*3,bottom:-30+a*15,lock:0}]
				break
				case 'Lira': case 'Sakura': case 'Ume':
					switch(p1.name){
						case 'Lira':
							p1.parts.mouth-=4
							p1.spin.mouth-=180
						break
						case 'Sakura':
							p1.anim.mouth.y++
						break
						case 'Ume':
							p1.parts.mouth-=2
							p1.spin.mouth-=180
						break
					}
					p1.fades.kimono.main.front={x:1,y:0.975}
					p1.fades.kimono.main.back={x:1,y:0.975}
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:30,bottom:87,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
						{top:30,bottom:87,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
					]
					p1.anim.arms=[
						{top:24,bottom:60-a*30,length:{top:16,bottom:16}},
						{top:24,bottom:60-a*30,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60-a*30,bottom:-150,lock:0},{top:60+a*30,bottom:150,lock:0}]
					p1.spin.arms=[{top:-75-a*15,bottom:-12-a*48,lock:0},{top:75+a*15,bottom:-30+a*120,lock:0}]
				break
				case 'Certes':
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:30,bottom:87,length:{top:16,bottom:16}},
						{top:30,bottom:87,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:24,bottom:60-a*30,length:{top:16,bottom:16}},
						{top:24,bottom:60-a*30,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60-a*30,bottom:-150,lock:0},{top:60+a*30,bottom:150,lock:0}]
					p1.spin.arms=[{top:-75-a*15,bottom:-12-a*48,lock:0},{top:75+a*15,bottom:-30+a*120,lock:0}]
				break
				case 'Azis':
					p1.position.y-=42.5
					p1.parts.eyeLevel++
					p1.anim.legs=[
						{top:12,bottom:6,length:{top:16.5,bottom:16.5}},
						{top:12,bottom:6,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:24,bottom:12+a*3,length:{top:16.5,bottom:16.5}},
						{top:24,bottom:12+a*3,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-150+a*6,lock:0},{top:60,bottom:150-a*6,lock:0}]
					p1.spin.arms=[{top:-84-a*3,bottom:-60-a*6,lock:0},{top:84+a*3,bottom:48+a*9,lock:0}]
				break
				case 'Donakho':
					p1.position.y-=25
					p1.anim.arms[0].top=33
					p1.anim.arms[1].top=33
					p1.anim.legs[0].top=54
					p1.anim.legs[1].top=54
				break
				case 'Setsuna':
					p1.position.y-=2
					p1.parts.mouth-=4
					p1.spin.mouth-=180
					p1.fades.kimono.main.front={x:1,y:0.975}
					p1.fades.kimono.main.back={x:1,y:0.975}
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:12,bottom:87,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
						{top:12,bottom:87,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
					]
					p1.anim.arms=[
						{top:24,bottom:60-a*30,length:{top:17,bottom:17}},
						{top:24,bottom:60-a*30,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60-a*30,bottom:-150,lock:0},{top:60+a*30,bottom:165,lock:0}]
					p1.spin.arms=[{top:-75-a*15,bottom:-16-a*48,lock:0},{top:75+a*15,bottom:-30+a*120,lock:0}]
				break
				case 'Edgar': case 'Chip': case 'Joe':
					p1.position.y-=42.5
					p1.anim.legs=[
						{top:6,bottom:6,length:{top:18,bottom:18}},
						{top:6,bottom:6,length:{top:18,bottom:18}}
					]
					p1.anim.arms=[
						{top:27-a*6,bottom:12-a*24,length:{top:18,bottom:18}},
						{top:27-a*6,bottom:12-a*24,length:{top:18,bottom:18}}
					]
					p1.spin.legs=[{top:-60,bottom:-150+a*15,lock:0},{top:60,bottom:150-a*15,lock:0}]
					p1.spin.arms=[{top:-84-a*3,bottom:-60,lock:0},{top:84+a*3,bottom:12,lock:0}]
				break
				case 'Airi':
					p1.anim.mouth.y--
					p1.parts.mouth++
					p1.position.y-=40
					p1.anim.legs=[
						{top:-18,bottom:-12,length:{top:16,bottom:16}},
						{top:9,bottom:-27,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:24,bottom:60-a*30,length:{top:16,bottom:16}},
						{top:24,bottom:60-a*30,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60-a*30,bottom:-150,lock:0},{top:60+a*30,bottom:30,lock:0}]
					p1.spin.arms=[{top:-75-a*15,bottom:-30-a*48,lock:0},{top:75+a*15,bottom:-12+a*120,lock:0}]
				break
				case 'Shiru':
					p1.position.y+=30
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:54,bottom:66,length:{top:15.5,bottom:15.5}},
						{top:54+a*12,bottom:66-a*24,length:{top:15.5,bottom:15.5}}
					]
					p1.anim.arms=[
						{top:24,bottom:36-a*6,length:{top:15.5,bottom:15.5}},
						{top:24,bottom:36-a*6,length:{top:15.5,bottom:15.5}}
					]
					p1.spin.legs=[{top:-45+a*5,bottom:-15-a*5,lock:0},{top:120+a*5,bottom:150-a*30,lock:0}]
					p1.spin.arms=[{top:-75+a*6,bottom:-12-a*24,lock:0},{top:75-a*6,bottom:-30+a*60,lock:0}]
				break
				case 'DD-610':
					p1.position.y-=40
					p1.parts.eyeLevel++
					p1.anim.legs=[
						{top:3,bottom:6,length:{top:17,bottom:17}},
						{top:3,bottom:6,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:12,bottom:6-a*3,length:{top:17,bottom:17}},
						{top:12,bottom:6-a*3,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-150+a*6,lock:0},{top:60,bottom:150-a*6,lock:0}]
					p1.spin.arms=[{top:-84-a*3,bottom:-60-a*6,lock:0},{top:84+a*3,bottom:48+a*9,lock:0}]
				break
				case 'Prehextorica':
					p1.position.y-=40
					p1.parts.eyeLevel++
					p1.anim.legs=[
						{top:12,bottom:9-a*3,length:{top:17,bottom:17}},
						{top:12,bottom:9-a*3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:27,bottom:-24,length:{top:17,bottom:17}},
						{top:27,bottom:-24,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-45,bottom:-60,lock:0},{top:30,bottom:90,lock:0}]
					p1.spin.arms=[{top:-84-a*3,bottom:-150-a*24,lock:0},{top:84+a*3,bottom:120+a*12,lock:0}]
				break
				case 'Vincent':
					p1.position.y-=35
					p1.parts.eyeLevel-=0.5
					p1.anim.legs=[
						{top:12,bottom:9-a*3,length:{top:17,bottom:17}},
						{top:12,bottom:9-a*3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:21,bottom:24,length:{top:17,bottom:17}},
						{top:21,bottom:24,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-75,bottom:-90,lock:0},{top:75,bottom:90,lock:0}]
					p1.spin.arms=[{top:-84-a*3,bottom:-150-a*24,lock:0},{top:84+a*3,bottom:120+a*12,lock:0}]
				break
				case 'Daiyousei':
					p1.anim.legs=[
						{top:9,bottom:72,length:{top:15,bottom:15}},
						{top:9,bottom:72,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:27,bottom:42,length:{top:15,bottom:15}},
						{top:27,bottom:9,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-90,bottom:-90-a*6,lock:0},{top:90,bottom:150+a*6,lock:0}]
					p1.spin.arms=[{top:-96,bottom:-30,lock:0},{top:96,bottom:18,lock:0}]
				break
				case 'Sanae':
					p1.anim.mouth.y+=1.5
					p1.parts.mouth-=0.5
					p1.spin.sword=30
					p1.anim.legs=[
						{top:6,bottom:87,length:{top:16.5,bottom:16.5}},
						{top:6,bottom:87,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:24,bottom:48-a*24,length:{top:16.5,bottom:16.5}},
						{top:24,bottom:48-a*24,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60-a*30,bottom:-150,lock:0},{top:60+a*30,bottom:165,lock:0}]
					p1.spin.arms=[{top:-75-a*15,bottom:-30-a*54,lock:0},{top:75+a*15,bottom:6+a*72,lock:0}]
				break
				case 'Shinmyoumaru':
					p1.fades.kimono.main.front={x:1,y:0.85}
					p1.fades.kimono.main.back={x:1,y:0.85}
					p1.fades.kimono.outside.front={x:1,y:0.85}
					p1.fades.kimono.outside.back={x:1,y:0.85}
					p1.trigger.display.extra.sword=false
					p1.position.y+=30
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:54,bottom:66-a*48,length:{top:15,bottom:15}},
						{top:54+a*12,bottom:66-a*42,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:18,bottom:48-a*6,length:{top:15,bottom:15}},
						{top:18,bottom:48-a*6,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-45+a*5,bottom:-15-a*45,lock:0},{top:120+a*5,bottom:150-a*36,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Merlin':
					p1.position.y+=30
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:36,bottom:51,length:{top:16.5,bottom:16.5}},
						{top:36+a*12,bottom:51-a*24,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:24,bottom:36-a*6,length:{top:16.5,bottom:16.5}},
						{top:24,bottom:36-a*6,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-45+a*5,bottom:-15-a*5,lock:0},{top:120+a*5,bottom:150-a*12,lock:0}]
					p1.spin.arms=[{top:-75+a*6,bottom:-24-a*9,lock:0},{top:75-a*6,bottom:30+a*15,lock:0}]
				break
				case 'Ducopo':
					p1.position.y-=36
					p1.anim.arms[0].top=60
					p1.anim.arms[1].top=45
					p1.anim.legs[0].top=18
					p1.anim.legs[1].top=12
				break
				case 'Randy':
					p1.position.y-=47.5
					p1.anim.legs=[
						{top:6,bottom:3,length:{top:18,bottom:18}},
						{top:6,bottom:3,length:{top:18,bottom:18}}
					]
					p1.anim.arms=[
						{top:15+a*3,bottom:9+a*6,length:{top:18,bottom:18}},
						{top:15+a*3,bottom:9+a*6,length:{top:18,bottom:18}}
					]
					p1.spin.legs=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
					p1.spin.arms=[{top:-84-a*3,bottom:-60,lock:0},{top:84+a*3,bottom:12,lock:0}]
				break
				case 'Sagume':
					p1.anim.mouth.y+=1.5
					p1.parts.mouth-=0.5
					p1.anim.legs=[
						{top:4.5,bottom:93,length:{top:16.75,bottom:16.75}},
						{top:4.5,bottom:93,length:{top:16.75,bottom:16.75}}
					]
					p1.anim.arms=[
						{top:102,bottom:135,length:{top:16.75,bottom:16.75}},
						{top:12,bottom:15-a*6,length:{top:16.75,bottom:16.75}}
					]
					p1.spin.legs=[{top:-60-a*30,bottom:-150},{top:60+a*30,bottom:165}]
					p1.spin.arms=[{top:-21-a*15,bottom:-18,lock:0},{top:75+a*15,bottom:69+a*12,lock:0}]
				break
				case 'Fernando':
					p1.position.y-=40
					p1.anim.legs=[
						{top:6,bottom:15,length:{top:13,bottom:13}},
						{top:6,bottom:15,length:{top:13,bottom:13}}
					]
					p1.anim.arms=[
						{top:21,bottom:-18,length:{top:13,bottom:13}},
						{top:21,bottom:-18,length:{top:13,bottom:13}}
					]
					p1.spin.legs=[{top:-60,bottom:-105,lock:0},{top:60,bottom:105,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-84,lock:0},{top:90,bottom:84,lock:0}]
				break
				case 'Decratite':
					p1.position.y-=42
					p1.parts.eyeLevel++
					p1.anim.legs=[
						{top:6,bottom:3-a*3,length:{top:17,bottom:17}},
						{top:6,bottom:3-a*3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:30,bottom:-12,length:{top:17,bottom:17}},
						{top:30,bottom:-12,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-45,bottom:-60,lock:0},{top:30,bottom:90,lock:0}]
					p1.spin.arms=[{top:-84-a*3,bottom:-150-a*24,lock:0},{top:84+a*3,bottom:120+a*12,lock:0}]
				break
				case 'Dukelis':
					p1.position.y-=36
					p1.anim.arms[0].top=105
					p1.anim.arms[1].top=27
					p1.anim.legs[0].top=21
					p1.anim.legs[1].top=15
				break
			}
			if(p1.name!='DD-610'&&p1.name!='Vincent'&&p1.name!='Ducopo'&&p1.name!='Randy'&&p1.name!='Dukelis'){
				p1.anim.eye=[1,1]
				p1.anim.eyeStyle=[2,2]
			}
			p1.size=2.5
			p1.fade=1
			p1.graphic=true
			if(damage[a]==1&&options.damage){
				p1.trigger.display.extra.damage=true
			}
			return p1
		case 4:
			p1=new combatant(layer,graphics.proxyBattle,550-a*300,477.5+a*32.5,0,0,0,0,player[a],0,0,30-a*60)
			switch(p1.name){
				case 'George':
					p1.position.y-=a*15
					p1.anim.legs=[
						{top:3+a*36,bottom:6+a*9,length:{top:18,bottom:18-a*2}},
						{top:3+a*36,bottom:6+a*9,length:{top:18,bottom:18-a*2}}
					]
					p1.anim.arms=[
						{top:30+a*18,bottom:12+a*48,length:{top:18,bottom:18}},
						{top:39-a*12,bottom:60-a*54,length:{top:18,bottom:18}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120-a*15,lock:0},{top:60-a*15,bottom:120+a*15,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Lira': case 'Sakura': case 'Ume':
					switch(p1.name){
						case 'Lira':
							p1.parts.mouth-=3
							p1.spin.mouth-=180
							p1.anim.mouth.y-=2
						break
						case 'Sakura':
							p1.anim.mouth.y--
						break
						case 'Ume':
							p1.parts.mouth-=2
							p1.spin.mouth-=180
							p1.anim.mouth.y--
						break
					}
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:6+a*36,bottom:12+a*9,length:{top:16,bottom:16-a*8,sandal:{back:15.5-a*8,front:14.5-a*8}}},
						{top:6+a*36,bottom:12+a*9,length:{top:16,bottom:16-a*8,sandal:{back:15.5-a*8,front:14.5-a*8}}}
					]
					p1.anim.arms=[
						{top:18+a*36,bottom:12+a*96,length:{top:16,bottom:16}},
						{top:27-a*3,bottom:60-a*42,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120-a*30,lock:0},{top:60-a*15,bottom:120+a*30,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Certes':
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:6+a*36,bottom:12+a*9,length:{top:16,bottom:16-a*8}},
						{top:6+a*36,bottom:12+a*9,length:{top:16,bottom:16-a*8}}
					]
					p1.anim.arms=[
						{top:18+a*36,bottom:12+a*96,length:{top:16,bottom:16}},
						{top:27-a*3,bottom:60-a*42,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120-a*30,lock:0},{top:60-a*15,bottom:120+a*30,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Azis':
					p1.position.y-=a*22.5
					p1.anim.legs=[
						{top:12+a*24,bottom:9+a*3,length:{top:16.5,bottom:16.5-a}},
						{top:12+a*24,bottom:9+a*3,length:{top:16.5,bottom:16.5-a}}
					]
					p1.anim.arms=[
						{top:24+a*15,bottom:12+a*24,length:{top:16.5,bottom:16.5}},
						{top:33-a*9,bottom:60-a*33,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120-a*15,lock:0},{top:60-a*15,bottom:120+a*15,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Donakho':
					p1.anim.arms[0].top=15+a*60
					p1.anim.arms[1].top=66-a*12
					p1.position.y+=10-a*25
				break
				case 'Setsuna':
					p1.position.y-=a*15
					p1.parts.mouth-=3
					p1.spin.mouth-=180
					p1.anim.mouth.y-=2
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:6+a*24,bottom:12+a*6,length:{top:17,bottom:17-a*4,sandal:{back:16.5-a*4,front:15.5-a*4}}},
						{top:6+a*24,bottom:12+a*6,length:{top:17,bottom:17-a*4,sandal:{back:16.5-a*4,front:15.5-a*4}}}
					]
					p1.anim.arms=[
						{top:18+a*36,bottom:12+a*96,length:{top:17,bottom:17}},
						{top:27-a*3,bottom:60-a*42,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120-a*30,lock:0},{top:60-a*15,bottom:120+a*30,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Edgar': case 'Chip': case 'Joe':
					p1.position.y-=a*22.5
					p1.anim.legs=[
						{top:3+a*24,bottom:6+a*6,length:{top:17,bottom:17}},
						{top:3+a*24,bottom:6+a*6,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:30+a*6,bottom:12+a*24,length:{top:17,bottom:17}},
						{top:39-a*3,bottom:60-a*30,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120-a*15,lock:0},{top:60-a*15,bottom:120+a*15,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Airi':
					p1.anim.mouth.y++
					p1.position.y-=a*10
					p1.anim.legs=[
						{top:3+a*24,bottom:9+a*6,length:{top:16,bottom:16-a*8}},
						{top:3+a*24,bottom:9+a*6,length:{top:16,bottom:16-a*8}}
					]
					p1.anim.arms=[
						{top:24+a*48,bottom:54+a*36,length:{top:16,bottom:16}},
						{top:36-a*12,bottom:84-a*30,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120-a*30,lock:0},{top:60-a*15,bottom:120+a*30,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Shiru':
					p1.position.y+=a*40
					p1.anim.mouth.y+=0.5
					p1.parts.mouth+=0.5
					p1.anim.legs=[
						{top:6+a*36,bottom:12+a*60,length:{top:15.5,bottom:15.5-a*6}},
						{top:6+a*36,bottom:12+a*60,length:{top:15.5,bottom:15.5-a*6}}
					]
					p1.anim.arms=[
						{top:15+a*9,bottom:6+a*36,length:{top:15.5,bottom:15.5}},
						{top:27-a*3,bottom:102-a*54,length:{top:15.5,bottom:15.5}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120+a*45,lock:0},{top:60-a*15,bottom:120+a*30,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'DD-610':
					p1.position.y-=a*30
					p1.anim.legs=[
						{top:3,bottom:0,length:{top:17,bottom:17-a}},
						{top:3,bottom:0,length:{top:17,bottom:17-a}}
					]
					p1.anim.arms=[
						{top:6+a*30,bottom:3+a*72,length:{top:17,bottom:17}},
						{top:36-a*30,bottom:75-a*72,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Prehextorica':
					p1.position.y-=a*27.5
					p1.anim.legs=[
						{top:12+a*6,bottom:9+a*3,length:{top:17,bottom:17-a}},
						{top:12+a*6,bottom:9+a*3,length:{top:17,bottom:17-a}}
					]
					p1.anim.arms=[
						{top:24+a*15,bottom:12+a*24,length:{top:17,bottom:17}},
						{top:33-a*9,bottom:60-a*33,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60+a*15,bottom:-120-a*15,lock:0},{top:60-a*15,bottom:120+a*15,lock:0}]
					p1.spin.arms=[{top:-165+a*45,bottom:-180+a*45,lock:0},{top:120+a*45,bottom:150+a*45,lock:0}]
				break
				case 'Vincent':
					p1.position.y+=10-a*30
					p1.anim.legs=[
						{top:3,bottom:0,length:{top:15,bottom:15}},
						{top:3,bottom:0,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:15-a*3,bottom:3-a*3,length:{top:15,bottom:15}},
						{top:12+a*3,bottom:a*3,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Daiyousei':
					p1.position.y-=a*27.5
					p1.anim.legs=[
						{top:12+a*6,bottom:9+a*3,length:{top:17,bottom:17-a}},
						{top:12+a*6,bottom:9+a*3,length:{top:17,bottom:17-a}}
					]
					p1.anim.arms=[
						{top:33+a*15,bottom:12+a*24,length:{top:17,bottom:17}},
						{top:39-a*9,bottom:60-a*33,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60+a*15,bottom:-120-a*15,lock:0},{top:60-a*15,bottom:120+a*15,lock:0}]
					p1.spin.arms=[{top:-165+a*45,bottom:-180+a*45,lock:0},{top:120+a*45,bottom:150+a*45,lock:0}]
				break
				case 'Sanae':
					p1.position.y-=a*33
					p1.parts.mouth++
					p1.anim.mouth.y-=1.5
					p1.spin.mouth-=12
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:6+a*3,bottom:12-a*6,length:{top:16.5,bottom:16.5}},
						{top:6+a*3,bottom:12-a*6,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:18+a*12,bottom:12-a*6,length:{top:16.5,bottom:16.5}},
						{top:27-a*3,bottom:36-a*21,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120-a*30,lock:0},{top:60-a*15,bottom:120+a*30,lock:0}]
					p1.spin.arms=[{top:-90-a*18,bottom:-30-a*15,lock:0},{top:90,bottom:-15+a*60,lock:0}]
				break
				case 'Shinmyoumaru':
					p1.position.y-=a*25
					p1.anim.mouth.y+=0.5
					p1.parts.mouth+=0.5
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:6+a*36,bottom:12-a*18,length:{top:15,bottom:15}},
						{top:6+a*36,bottom:12-a*18,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:15+a*9,bottom:6+a*36,length:{top:15,bottom:15}},
						{top:27-a*3,bottom:72-a*24,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-48+a*45,bottom:-120+a*90,lock:0},{top:60-a*15,bottom:120+a*30,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Merlin':
					p1.position.y+=a*40
					p1.anim.mouth.y+=0.5
					p1.parts.mouth-=0.5
					p1.anim.legs=[
						{top:6+a*36,bottom:12+a*60,length:{top:16.5,bottom:16.5-a*3}},
						{top:6+a*36,bottom:12+a*60,length:{top:16.5,bottom:16.5-a*3}}
					]
					p1.anim.arms=[
						{top:15+a*9,bottom:6+a*36,length:{top:16.5,bottom:16.5}},
						{top:27-a*3,bottom:-12-a*15,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60+a*45,bottom:-120+a*45,lock:0},{top:60-a*15,bottom:120+a*30,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Ducopo':
					p1.anim.arms[0].top=30+a*72
					p1.anim.arms[1].top=54-a*9
					p1.anim.legs[0].top=15
					p1.anim.legs[1].top=15
					p1.position.y+=5-a*25
				break
				case 'Randy':
					p1.position.y-=a*30
					p1.anim.legs=[
						{top:3+a*6,bottom:6+a*9,length:{top:17,bottom:17}},
						{top:3+a*6,bottom:6+a*9,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:15-a*3,bottom:3+a*6,length:{top:17,bottom:17}},
						{top:18+a*3,bottom:21-a*3,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120-a*15,lock:0},{top:60-a*15,bottom:120+a*15,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Sagume':
					p1.position.y+=3-a*34
					p1.parts.mouth++
					p1.anim.mouth.y-=1.5
					p1.spin.mouth-=12
					p1.anim.legs=[
						{top:6+a*3,bottom:24-a*6,length:{top:16.75,bottom:16.75}},
						{top:6+a*3,bottom:24-a*6,length:{top:16.75,bottom:16.75}}
					]
					p1.anim.arms=[
						{top:96-a*9,bottom:123+a*12,length:{top:16.75,bottom:16.75}},
						{top:27-a*3,bottom:36-a*21,length:{top:16.75,bottom:16.75}}
					]
					p1.spin.legs=[{top:-45+a*27,bottom:-120+a*12},{top:60-a*15,bottom:120+a*6}]
					p1.spin.arms=[{top:-30-a*24,bottom:-18+a*33,lock:0},{top:90,bottom:-15+a*60,lock:0}]
				break
				case 'Fernando':
					p1.position.y-=a*30
					p1.anim.legs=[
						{top:12,bottom:15,length:{top:13,bottom:13}},
						{top:12,bottom:15,length:{top:13,bottom:13}}
					]
					p1.anim.arms=[
						{top:15,bottom:15,length:{top:13,bottom:13}},
						{top:9,bottom:9,length:{top:13,bottom:13}}
					]
					p1.spin.legs=[{top:-60,bottom:-105,lock:0},{top:60,bottom:105,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75,lock:0},{top:90,bottom:75,lock:0}]
				break
				case 'Decratite':
					p1.position.y-=a*27.5
					p1.anim.legs=[
						{top:12+a*6,bottom:9+a*3,length:{top:17,bottom:17-a}},
						{top:12+a*6,bottom:9+a*3,length:{top:17,bottom:17-a}}
					]
					p1.anim.arms=[
						{top:24+a*15,bottom:-15+a*24,length:{top:17,bottom:17}},
						{top:33-a*9,bottom:-30-a*33,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60+a*15,bottom:-120-a*15,lock:0},{top:60-a*15,bottom:120+a*15,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Dukelis':
					p1.anim.arms[0].top=76
					p1.anim.arms[1].top=39
					p1.anim.legs[0].top=18
					p1.anim.legs[1].top=18
					p1.position.y+=5-a*30
				break
			}
			p1.size=2.5
			p1.fade=1
			p1.graphic=true
			if(damage[a]==1&&options.damage){
				p1.trigger.display.extra.damage=true
			}
			return p1
		case 5:
			p1=new combatant(layer,graphics.proxyBattle,100+a*700,477.5,0,0,0,0,player[a],0,0,30-a*60)
			switch(p1.name){
				case 'George':
					p1.anim.legs=[
						{top:6-a*3,bottom:6-a*3,length:{top:18,bottom:18}},
						{top:6-a*3,bottom:6-a*3,length:{top:18,bottom:18}}
					]
					p1.anim.arms=[
						{top:42-a*9,bottom:-30+a*27,length:{top:18,bottom:18}},
						{top:42-a*9,bottom:-30+a*27,length:{top:18,bottom:18}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Lira': case 'Sakura': case 'Ume':
					switch(p1.name){
						case 'Lira':
							p1.parts.mouth-=3
							p1.spin.mouth-=180
							p1.anim.mouth.y-=2
						break
						case 'Sakura':
							p1.anim.mouth.y--
						break
						case 'Ume':
							p1.parts.mouth-=2
							p1.spin.mouth-=180
							p1.anim.mouth.y--
						break
					}
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:9-a*6,bottom:3,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
						{top:9-a*6,bottom:3,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
					]
					p1.anim.arms=[
						{top:21+a*3,bottom:24+a*12,length:{top:16,bottom:16}},
						{top:21+a*3,bottom:36,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Certes':
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:9-a*6,bottom:3,length:{top:16,bottom:16}},
						{top:9-a*6,bottom:3,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:21+a*3,bottom:24+a*12,length:{top:16,bottom:16}},
						{top:21+a*3,bottom:36,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Azis':
					p1.anim.legs=[
						{top:9+a*3,bottom:12+a*3,length:{top:16.5,bottom:16.5}},
						{top:9+a*3,bottom:12+a*3,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:27-a*3,bottom:-6+a*3,length:{top:16.5,bottom:16.5}},
						{top:27-a*3,bottom:-6+a*3,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Donakho':
					p1.anim.arms[0].top=15+a*51
					p1.anim.arms[1].top=66-a*51
					p1.anim.legs[0].top=18
					p1.anim.legs[1].top=18
					p1.position.y+=10
				break
				case 'Setsuna':
					p1.parts.mouth-=3
					p1.spin.mouth-=180
					p1.anim.mouth.y-=2
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:9-a*6,bottom:3,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
						{top:9-a*6,bottom:3,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
					]
					p1.anim.arms=[
						{top:21+a*3,bottom:24+a*12,length:{top:17,bottom:17}},
						{top:21+a*3,bottom:36,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Edgar': case 'Chip': case 'Joe':
					p1.anim.legs=[
						{top:12-a*3,bottom:a*3,length:{top:17,bottom:17}},
						{top:12-a*3,bottom:a*3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:24-a*3,bottom:12+a*6,length:{top:17,bottom:17}},
						{top:24-a*3,bottom:12+a*6,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Airi':
					p1.anim.mouth.y+=2
					p1.anim.eye=[1,1]
					p1.anim.eyeStyle=[1,1]
					p1.anim.legs=[
						{top:3-a*1.5,bottom:3,length:{top:16,bottom:16}},
						{top:3-a*1.5,bottom:3,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:36-a*3,bottom:48+a*18,length:{top:16,bottom:16}},
						{top:36-a*3,bottom:72,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Shiru':
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:9-a*6,bottom:3,length:{top:15.5,bottom:15.5}},
						{top:9-a*6,bottom:3,length:{top:15.5,bottom:15.5}}
					]
					p1.anim.arms=[
						{top:39+a*3,bottom:24-a*30,length:{top:15.5,bottom:15.5}},
						{top:39-a*3,bottom:-6+a*24,length:{top:15.5,bottom:15.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'DD-610':
					p1.anim.legs=[
						{top:6-a*3,bottom:0,length:{top:17,bottom:17}},
						{top:6-a*3,bottom:0,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:12-a*3,bottom:9-a*3,length:{top:17,bottom:17}},
						{top:12-a*3,bottom:9-a*3,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Prehextorica':
					p1.position.y+=3
					p1.anim.mouth.y-=1.5
					p1.parts.mouth--
					p1.anim.legs=[
						{top:24-a*15,bottom:9-a*3,length:{top:17,bottom:17}},
						{top:9+a*15,bottom:6+a*3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:36+a*6,bottom:-24-a*9,length:{top:17,bottom:17}},
						{top:36+a*6,bottom:-24-a*9,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-90,lock:0},{top:60,bottom:90,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-96,lock:0},{top:105,bottom:96,lock:0}]
				break
				case 'Vincent':
					p1.position.y+=3
					p1.anim.mouth.y-=0.5
					p1.anim.legs=[
						{top:12,bottom:9,length:{top:17,bottom:17}},
						{top:12,bottom:9,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:24+a*6,bottom:-12+a*9,length:{top:17,bottom:17}},
						{top:24+a*6,bottom:-12+a*9,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-105,lock:0},{top:60,bottom:105,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-96,lock:0},{top:105-a*36,bottom:96-a*36,lock:0}]
				break
				case 'Daiyousei':
					p1.parts.mouth+=0.5
					p1.anim.legs=[
						{top:12,bottom:-6,length:{top:15,bottom:15}},
						{top:12,bottom:-6,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:39-a*6,bottom:54-a*9,length:{top:15,bottom:15}},
						{top:33+a*6,bottom:45+a*9,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-90,bottom:-120,lock:0},{top:90,bottom:120,lock:0}]
					p1.spin.arms=[{top:-72,bottom:-15,lock:0},{top:72,bottom:15,lock:0}]
				break
				case 'Sanae':
					p1.anim.direction-=a*6
					p1.anim.legs=[
						{top:3-a*1.5,bottom:1.5-a*3,length:{top:16.5,bottom:16.5}},
						{top:3-a*1.5,bottom:1.5-a*3,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:18+a*3,bottom:15+a*6,length:{top:16.5,bottom:16.5}},
						{top:18+a*3,bottom:18,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:60,bottom:60,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Shinmyoumaru':
					p1.trigger.display.extra.sword=false
					p1.anim.mouth.y+=0.25
					p1.anim.legs=[
						{top:9-a*6,bottom:3,length:{top:15,bottom:15}},
						{top:9-a*6,bottom:3,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:12+a*3,bottom:6+a*30,length:{top:15,bottom:15}},
						{top:12-a*3,bottom:36-a*24,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Merlin':
					p1.anim.mouth.y++
					p1.anim.legs=[
						{top:9-a*6,bottom:3,length:{top:16.5,bottom:16.5}},
						{top:9-a*6,bottom:3,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:15+a*3,bottom:24-a*30,length:{top:16.5,bottom:16.5}},
						{top:15-a*3,bottom:-6+a*24,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-75+a*15,bottom:-30+a*45,lock:0},{top:60+a*6,bottom:75-a*45,lock:0}]
				break
				case 'Ducopo':
					p1.anim.arms[0].top=21+a*27
					p1.anim.arms[1].top=48-a*27
					p1.anim.legs[0].top=21
					p1.anim.legs[1].top=21
					p1.position.y+=12
				break
				case 'Randy':
					p1.anim.legs=[
						{top:6-a*3,bottom:9+a*3,length:{top:17,bottom:17}},
						{top:6-a*3,bottom:9+a*3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:24-a*3,bottom:-9+a*6,length:{top:17,bottom:17}},
						{top:24-a*3,bottom:-9+a*6,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105+a*15,bottom:-90+a*15,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Sagume':
					p1.anim.legs=[
						{top:12-a*1.5,bottom:-1-a*3,length:{top:16.75,bottom:16.75}},
						{top:12-a*1.5,bottom:-1-a*3,length:{top:16.75,bottom:16.75}}
					]
					p1.anim.arms=[
						{top:123,bottom:99,length:{top:16.75,bottom:16.75}},
						{top:24+a*3,bottom:9-a*3,length:{top:16.75,bottom:16.75}}
					]
					p1.spin.legs=[{top:-54-a*9,bottom:-90},{top:60-a*12,bottom:96-a*6}]
					p1.spin.arms=[{top:-63+a*9,bottom:-21+a*39,lock:0},{top:90+a*30,bottom:75+a*30,lock:0}]
				break
				case 'Fernando':
					p1.anim.legs=[
						{top:3,bottom:1.5,length:{top:13,bottom:13}},
						{top:3,bottom:1.5,length:{top:13,bottom:13}}
					]
					p1.anim.arms=[
						{top:16.5,bottom:-1.5,length:{top:13,bottom:13}},
						{top:16.5,bottom:-1.5,length:{top:13,bottom:13}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Decratite':
					p1.position.y+=3
					p1.anim.mouth.y-=1.5
					p1.parts.mouth--
					p1.anim.legs=[
						{top:12-a*6,bottom:9-a*3,length:{top:17,bottom:17}},
						{top:6+a*6,bottom:6+a*3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:27+a*6,bottom:-30-a*9,length:{top:17,bottom:17}},
						{top:27+a*6,bottom:-30-a*9,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-90,lock:0},{top:60,bottom:90,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-96,lock:0},{top:105,bottom:96,lock:0}]
				break
				case 'Dukelis':
					p1.anim.arms[0].top=99
					p1.anim.arms[1].top=72
					p1.anim.legs[0].top=24
					p1.anim.legs[1].top=21
					p1.position.y+=5
				break
			}
			p1.size=2.5
			p1.fade=1
			p1.graphic=true
			if(damage[a]==1&&options.damage){
				p1.trigger.display.extra.damage=true
			}
			return p1
		case 6:
			p1=new combatant(layer,graphics.proxyBattle,675-a*450,477.5,0,0,0,0,player[a],0,0,-45+a*90)
			switch(p1.name){
				case 'George':
					p1.spin.mouth-=200
					p1.anim.mouth.x++
					p1.anim.mouth.y-=3
					p1.parts.mouth-=3
					p1.anim.legs=[
						{top:9,bottom:0,length:{top:18,bottom:18}},
						{top:9,bottom:0,length:{top:18,bottom:18}}
					]
					p1.anim.arms=[
						{top:24-a*6,bottom:6-a*12,length:{top:18,bottom:18}},
						{top:24+a*12,bottom:6+a*96,length:{top:18,bottom:18}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90-a*15,bottom:-75-a*15,lock:0},{top:120-a*30,bottom:105-a*30,lock:0}]
				break
				case 'Lira': case 'Ume':
					switch(p1.name){
						case 'Lira':
							p1.parts.mouth-=3
							p1.spin.mouth-=180
							p1.anim.mouth.y-=2
						break
						case 'Ume':
							p1.parts.mouth-=2
							p1.spin.mouth-=180
							p1.anim.mouth.y--
						break
					}
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:6,bottom:12,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
						{top:6,bottom:12,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
					]
					p1.anim.arms=[
						{top:36-a*15,bottom:54-a*15,length:{top:16,bottom:16}},
						{top:24+a*9,bottom:36+a*27,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90+a*60,bottom:-75+a*60,lock:0},{top:30+a*60,bottom:15+a*60,lock:0}]
				break
				case 'Sakura':
					p1.anim.direction+=10-a*10
					p1.anim.mouth.y--
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:6,bottom:12,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
						{top:6,bottom:12,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
					]
					p1.anim.arms=[
						{top:30-a*15,bottom:27-a*6,length:{top:16,bottom:16}},
						{top:21+a*3,bottom:18-a*3,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90-a*15,bottom:-78-a*9,lock:0},{top:135-a*48,bottom:108-a*36,lock:0}]
				break
				case 'Certes':
					p1.anim.mouth.y+=1.5
					p1.anim.legs=[
						{top:6,bottom:12,length:{top:16,bottom:16}},
						{top:6,bottom:12,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:36-a*15,bottom:54-a*15,length:{top:16,bottom:16}},
						{top:24+a*9,bottom:36+a*27,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90+a*60,bottom:-75+a*60,lock:0},{top:30+a*60,bottom:15+a*60,lock:0}]
				break
				case 'Azis':
					p1.spin.mouth-=200
					p1.anim.mouth.x--
					p1.anim.mouth.y-=4
					p1.parts.mouth-=4
					p1.anim.legs=[
						{top:15,bottom:0,length:{top:16.5,bottom:16.5}},
						{top:15,bottom:0,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:15,bottom:3-a*3,length:{top:16.5,bottom:16.5}},
						{top:21+a*3,bottom:12+a*12,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90-a*15,bottom:-75-a*15,lock:0},{top:120-a*30,bottom:105-a*30,lock:0}]
				break
				case 'Donakho':
					p1.anim.arms[0].top=24+a*36
					p1.anim.arms[1].top=60-a*36
					p1.anim.legs[0].top=30
					p1.anim.legs[1].top=30
					p1.position.y+=5
				break
				case 'Setsuna':
					p1.parts.mouth-=3
					p1.spin.mouth-=180
					p1.anim.mouth.y-=2
					p1.trigger.display.extra.sword=false
					p1.anim.legs=[
						{top:6,bottom:12,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
						{top:6,bottom:12,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
					]
					p1.anim.arms=[
						{top:36-a*15,bottom:54-a*15,length:{top:17,bottom:17}},
						{top:24+a*9,bottom:36+a*27,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90+a*60,bottom:-75+a*60,lock:0},{top:30+a*60,bottom:15+a*60,lock:0}]
				break
				case 'Edgar': case 'Chip': case 'Joe':
					p1.spin.mouth-=180
					p1.anim.mouth.x++
					p1.anim.mouth.y-=3
					p1.parts.mouth-=3
					p1.position.y+=2.5
					p1.anim.legs=[
						{top:6,bottom:0,length:{top:17,bottom:17}},
						{top:6,bottom:0,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:18-a*3,bottom:6-a*24,length:{top:17,bottom:17}},
						{top:18+a*6,bottom:6+a*72,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90-a*15,bottom:-75-a*15,lock:0},{top:120-a*30,bottom:90-a*15,lock:0}]
				break
				case 'Airi':
					p1.anim.mouth.y++
					p1.anim.eye=[1,1]
					p1.anim.eyeStyle=[1,1]
					p1.anim.legs=[
						{top:6,bottom:3,length:{top:16,bottom:16}},
						{top:6,bottom:3,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:108-a*6,bottom:135-a*12,length:{top:16,bottom:16}},
						{top:108-a*6,bottom:135-a*12,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Shiru':
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:6,bottom:3,length:{top:15.5,bottom:15.5}},
						{top:6,bottom:3,length:{top:15.5,bottom:15.5}}
					]
					p1.anim.arms=[
						{top:24+a*6,bottom:36-a*12,length:{top:15.5,bottom:15.5}},
						{top:18-a*6,bottom:24+a*18,length:{top:15.5,bottom:15.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-75+a*60,lock:0},{top:90,bottom:15+a*60,lock:0}]
				break
				case 'DD-610':
					p1.anim.legs=[
						{top:6-a*3,bottom:0,length:{top:17,bottom:17}},
						{top:6-a*3,bottom:0,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:60-a*48,bottom:96-a*87,length:{top:17,bottom:17}},
						{top:12+a*48,bottom:9+a*87,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-75-a*15,bottom:-30-a*60,lock:0},{top:90-a*15,bottom:90-a*60,lock:0}]
				break
				case 'Prehextorica':
					p1.spin.mouth-=200
					p1.anim.mouth.x--
					p1.anim.mouth.y-=3
					p1.parts.mouth-=4
					p1.anim.legs=[
						{top:15-a*6,bottom:0,length:{top:17,bottom:17}},
						{top:15-a*6,bottom:0,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:15+a*39,bottom:6-a*42,length:{top:17,bottom:17}},
						{top:54-a*39,bottom:-36+a*42,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90+a*12,bottom:-75+a*6,lock:0},{top:90+a*9,bottom:75+a*15,lock:0}]
				break
				case 'Vincent':
					p1.anim.mouth.x-=0.5
					p1.anim.mouth.y--
					p1.parts.mouth-=1.5
					p1.anim.legs=[
						{top:6+a*3,bottom:0,length:{top:17,bottom:17}},
						{top:6+a*3,bottom:0,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:15+a*12,bottom:6-a*15,length:{top:17,bottom:17}},
						{top:27-a*12,bottom:-9+a*15,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90+a*12,bottom:-75+a*6,lock:0},{top:90+a*9,bottom:75+a*15,lock:0}]
				break
				case 'Daiyousei':
					p1.parts.mouth+=0.5
					p1.anim.eye=[1,1]
					p1.anim.eyeStyle=[1,1]
					p1.anim.legs=[
						{top:12,bottom:21,length:{top:15,bottom:15}},
						{top:12,bottom:21,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:120,bottom:144,length:{top:15,bottom:15}},
						{top:120,bottom:144,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-60,bottom:-105,lock:0},{top:60,bottom:105,lock:0}]
					p1.spin.arms=[{top:-60-a*60,bottom:-60-a*60,lock:0},{top:120-a*60,bottom:120-a*60,lock:0}]
				break
				case 'Sanae':
					p1.position.y+=36
					p1.anim.mouth.y-=0.5
					p1.spin.sword-=60-a*12
					p1.anim.legs=[
						{top:6,bottom:93,length:{top:16.5,bottom:16.5}},
						{top:6,bottom:93,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:30-a*9,bottom:45-a*12,length:{top:16.5,bottom:16.5}},
						{top:18+a*6,bottom:27+a*21,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-150,lock:0},{top:60,bottom:150,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Shinmyoumaru':
					p1.trigger.display.extra.sword=false
					p1.anim.mouth.y-=0.5
					p1.parts.mouth+=0.25
					p1.anim.legs=[
						{top:6,bottom:0,length:{top:15,bottom:15}},
						{top:6,bottom:0,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:24+a*6,bottom:36-a*12,length:{top:15,bottom:15}},
						{top:18-a*6,bottom:24+a*18,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-105,lock:0},{top:105,bottom:105,lock:0}]
				break
				case 'Merlin':
					p1.anim.mouth.y+=0.5
					p1.parts.mouth-=0.5
					p1.anim.legs=[
						{top:6,bottom:3,length:{top:16.5,bottom:16.5}},
						{top:6,bottom:3,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:24+a*6,bottom:36-a*12,length:{top:16.5,bottom:16.5}},
						{top:18-a*6,bottom:24+a*18,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-120+a*60,lock:0},{top:90,bottom:105+a*60,lock:0}]
				break
				case 'Ducopo':
					p1.anim.arms[0].top=36+a*18
					p1.anim.arms[1].top=54-a*18
					p1.anim.legs[0].top=36
					p1.anim.legs[1].top=36
					p1.position.y+=8
				break
				case 'Randy':
					p1.position.y+=1
					p1.anim.legs=[
						{top:3,bottom:0,length:{top:17,bottom:17}},
						{top:3,bottom:0,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:18-a*3,bottom:6-a*24,length:{top:17,bottom:17}},
						{top:18+a*6,bottom:6-a*12,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90-a*15,bottom:-75-a*15,lock:0},{top:120-a*30,bottom:90-a*15,lock:0}]
				break
				case 'Sagume':
					p1.position.y+=36
					p1.anim.mouth.y-=0.5
					p1.anim.legs=[
						{top:6,bottom:93,length:{top:16.75,bottom:16.75}},
						{top:21,bottom:84,length:{top:16.75,bottom:16.75}}
					]
					p1.anim.arms=[
						{top:81+a*15,bottom:162-a*18,length:{top:16.75,bottom:16.75}},
						{top:21+a*12,bottom:-15-a*9,length:{top:16.75,bottom:16.75}}
					]
					p1.spin.legs=[{top:-60,bottom:-150-a*15,lock:0},{top:60,bottom:105+a*51,lock:0}]
					p1.spin.arms=[{top:-72-a*15,bottom:18-a*48,lock:0},{top:90,bottom:120,lock:0}]
				break
				case 'Fernando':
					p1.anim.legs=[
						{top:3,bottom:1.5,length:{top:13,bottom:13}},
						{top:3,bottom:1.5,length:{top:13,bottom:13}}
					]
					p1.anim.arms=[
						{top:7.5,bottom:4.5,length:{top:13,bottom:13}},
						{top:7.5,bottom:4.5,length:{top:13,bottom:13}}
					]
					p1.spin.legs=[{top:-60,bottom:-102,lock:0},{top:60,bottom:102,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Decratite':
					p1.spin.mouth-=200
					p1.anim.mouth.x--
					p1.anim.mouth.y-=3
					p1.parts.mouth-=4
					p1.anim.legs=[
						{top:9-a*6,bottom:3,length:{top:17,bottom:17}},
						{top:9-a*6,bottom:3,length:{top:17,bottom:17}}
					]
					p1.anim.arms=[
						{top:24+a*33,bottom:-9-a*9,length:{top:17,bottom:17}},
						{top:48-a*33,bottom:-15+a*9,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90+a*12,bottom:-75+a*6,lock:0},{top:90+a*9,bottom:75+a*15,lock:0}]
				break
				case 'Dukelis':
					p1.anim.arms[0].top=99
					p1.anim.arms[1].top=72
					p1.anim.legs[0].top=24
					p1.anim.legs[1].top=21
					p1.position.y+=5
				break
			}
			p1.size=2
			p1.fade=1
			p1.graphic=true
			if(damage[a]==1&&options.damage){
				p1.trigger.display.extra.damage=true
			}
			return p1
		case 7:
			p1=new combatant(layer,graphics.proxyBattle,400-a*200,425+a*25,0,0,0,0,player[a],0,0,30)
			switch(p1.name){
				case 'George':
					p1.parts.mouth-=4
					p1.anim.mouth.x+=3
					p1.anim.mouth.y--
					p1.spin.mouth-=180
					p1.anim.legs=[{top:12,bottom:3,length:{top:18,bottom:18}},{top:9,bottom:30,length:{top:18,bottom:18}}]
                    p1.anim.arms=[{top:120,bottom:-165,length:{top:18,bottom:18}},{top:36,bottom:-24,length:{top:18,bottom:18}}]
                	p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:120}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Lira': case 'Sakura': case 'Ume':
					switch(p1.name){
						case 'Lira':
							p1.parts.mouth-=4
							p1.spin.mouth-=180
						break
						case 'Sakura':
							p1.anim.mouth.y++
						break
						case 'Ume':
							p1.parts.mouth-=2
							p1.spin.mouth-=180
						break
					}
					p1.spin.sword=36-(player[a]-2)*30
					p1.anim.legs=[
						{top:3-(player[a]-2)*3,bottom:24-(player[a]-2)*9,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
						{top:15-(player[a]-2)*6,bottom:6-(player[a]-2)*3,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
					]
					p1.anim.arms=[
						{top:36-(player[a]-2)*3,bottom:-6+(player[a]-2)*84,length:{top:16,bottom:16}},
						{top:21+(player[a]-2)*6,bottom:135-(player[a]-2)*111,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:60,bottom:60,lock:0}]
					p1.spin.arms=[{top:-120,bottom:-141,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Certes':
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:36,bottom:72,length:{top:16,bottom:16}},
						{top:18,bottom:12,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:96,bottom:132,length:{top:16,bottom:16}},
						{top:96,bottom:132,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-6,lock:0},{top:0,bottom:0,lock:0}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Azis':
					p1.parts.mouth-=3
					p1.anim.mouth.x++
					p1.anim.mouth.y-=2
					p1.spin.mouth-=180
					p1.anim.legs=[{top:6,bottom:3,length:{top:16.5,bottom:16.5}},{top:6,bottom:3,length:{top:16.5,bottom:16.5}}]
                    p1.anim.arms=[{top:30,bottom:96,length:{top:16.5,bottom:16.5}},{top:30,bottom:3,length:{top:16.5,bottom:16.5}}]
                	p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:120}]
					p1.spin.arms=[{top:-93,bottom:-90,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Donakho':
					p1.anim.arms[0].top=45
					p1.anim.arms[1].top=114
				break
				case 'Setsuna':
					p1.parts.mouth-=4
					p1.spin.mouth-=180
					p1.spin.sword=-147
					p1.anim.legs=[
						{top:3-(player[a]-2)*3,bottom:24-(player[a]-2)*9,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
						{top:15-(player[a]-2)*6,bottom:6-(player[a]-2)*3,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
					]
					p1.anim.arms=[
						{top:60-(player[a]-2)*3,bottom:72+(player[a]-2)*84,length:{top:17,bottom:17}},
						{top:21+(player[a]-2)*6,bottom:150-(player[a]-2)*111,length:{top:17,bottom:17}}
					]
					p1.spin.legs=[{top:-60,bottom:-60,lock:0},{top:60,bottom:60,lock:0}]
					p1.spin.arms=[{top:-120,bottom:-135,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Edgar': case 'Chip': case 'Joe':
					p1.parts.mouth-=4
					p1.anim.mouth.x+=3
					p1.anim.mouth.y--
					p1.spin.mouth-=180
					p1.anim.legs=[{top:6,bottom:0,length:{top:17,bottom:17}},{top:3,bottom:18,length:{top:17,bottom:17}}]
                    p1.anim.arms=[{top:18,bottom:48,length:{top:17,bottom:17}},{top:36,bottom:-24,length:{top:17,bottom:17}}]
                	p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:120}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Airi':
					p1.anim.mouth.y++
					p1.anim.eye=[1,1]
					p1.anim.eyeStyle=[1,1]
					p1.anim.legs=[
						{top:36,bottom:24,length:{top:16,bottom:16}},
						{top:6,bottom:-6,length:{top:16,bottom:16}}
					]
					p1.anim.arms=[
						{top:108-a*6,bottom:135-a*12,length:{top:16,bottom:16}},
						{top:60-a*6,bottom:72-a*12,length:{top:16,bottom:16}}
					]
					p1.spin.legs=[{top:-60,bottom:-120,lock:0},{top:60,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Shiru':
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:18,bottom:6,length:{top:15.5,bottom:15.5}},
						{top:27,bottom:-48,length:{top:15.5,bottom:15.5}}
					]
					p1.anim.arms=[
						{top:18,bottom:105,length:{top:15.5,bottom:15.5}},
						{top:27,bottom:99,length:{top:15.5,bottom:15.5}}
					]
					p1.spin.legs=[{top:-30,bottom:-60,lock:0},{top:30,bottom:120,lock:0}]
					p1.spin.arms=[{top:-105,bottom:-99,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'DD-610':
					p1.anim.legs=[{top:9,bottom:3,length:{top:17,bottom:17}},{top:9,bottom:3,length:{top:17,bottom:17}}]
                    p1.anim.arms=[{top:12,bottom:6,length:{top:17,bottom:17}},{top:105,bottom:165,length:{top:17,bottom:17}}]
                	p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:120}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Prehextorica':
					p1.parts.mouth-=3
					p1.anim.mouth.x++
					p1.anim.mouth.y-=2
					p1.spin.mouth-=180
					p1.anim.legs=[{top:6,bottom:3,length:{top:17,bottom:17}},{top:24,bottom:15,length:{top:17,bottom:17}}]
                    p1.anim.arms=[{top:24,bottom:42,length:{top:17,bottom:17}},{top:24,bottom:-9,length:{top:17,bottom:17}}]
                	p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:120}]
					p1.spin.arms=[{top:-93,bottom:-90,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Vincent':
					p1.anim.legs=[{top:6,bottom:3,length:{top:17,bottom:17}},{top:9,bottom:3,length:{top:17,bottom:17}}]
                    p1.anim.arms=[{top:12,bottom:6,length:{top:17,bottom:17}},{top:9,bottom:3,length:{top:17,bottom:17}}]
                	p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:120}]
					p1.spin.arms=[{top:-93,bottom:-90,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Daiyousei':
					p1.parts.mouth+=0.5
					p1.anim.eye=[1,1]
					p1.anim.eyeStyle=[1,1]
					p1.anim.legs=[
						{top:12,bottom:3,length:{top:15,bottom:15}},
						{top:12,bottom:3,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:36,bottom:72,length:{top:15,bottom:15}},
						{top:36,bottom:72,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-75,bottom:-105,lock:0},{top:75,bottom:105,lock:0}]
					p1.spin.arms=[{top:-120,bottom:-204,lock:0},{top:84,bottom:144,lock:0}]
				break
				case 'Sanae':
					p1.anim.mouth.y++
					p1.spin.sword=147
					p1.anim.legs=[
						{top:3,bottom:3,length:{top:16.5,bottom:16.5}},
						{top:3,bottom:3,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:33,bottom:123,length:{top:16.5,bottom:16.5}},
						{top:26,bottom:57,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-60,bottom:-90,lock:0},{top:60,bottom:90,lock:0}]
					p1.spin.arms=[{top:-120,bottom:-141,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Shinmyoumaru':
					p1.anim.mouth.y-=0.5
					p1.anim.legs=[
						{top:18,bottom:6,length:{top:15,bottom:15}},
						{top:24,bottom:-24,length:{top:15,bottom:15}}
					]
					p1.anim.arms=[
						{top:21,bottom:33,length:{top:15,bottom:15}},
						{top:27,bottom:18,length:{top:15,bottom:15}}
					]
					p1.spin.legs=[{top:-30,bottom:-60,lock:0},{top:30,bottom:120,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-60,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Merlin':
					p1.anim.mouth.y+=0.5
					p1.anim.legs=[
						{top:18,bottom:-3,length:{top:16.5,bottom:16.5}},
						{top:45,bottom:27,length:{top:16.5,bottom:16.5}}
					]
					p1.anim.arms=[
						{top:36,bottom:54,length:{top:16.5,bottom:16.5}},
						{top:27,bottom:18,length:{top:16.5,bottom:16.5}}
					]
					p1.spin.legs=[{top:-30,bottom:-60,lock:0},{top:30,bottom:30,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-60,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Ducopo':
					p1.anim.arms[0].top=57
					p1.anim.arms[1].top=30
				break
				case 'Randy':
					p1.anim.legs=[{top:6,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:3,length:{top:17,bottom:17}}]
                    p1.anim.arms=[{top:18,bottom:-6,length:{top:17,bottom:17}},{top:36,bottom:-24,length:{top:17,bottom:17}}]
                	p1.spin.legs=[{top:-45,bottom:-60},{top:45,bottom:60}]
					p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
				break
				case 'Sagume':
					p1.anim.legs=[
						{top:12,bottom:12,length:{top:16.75,bottom:16.75}},
						{top:21,bottom:3,length:{top:16.75,bottom:16.75}}
					]
					p1.anim.arms=[
						{top:135,bottom:93,length:{top:16.75,bottom:16.75}},
						{top:24,bottom:15,length:{top:16.75,bottom:16.75}}
					]
					p1.spin.legs=[{top:-45,bottom:-72},{top:48,bottom:48}]
					p1.spin.arms=[{top:-69,bottom:-21,lock:0},{top:93,bottom:129,lock:0}]
				break
				case 'Fernando':
					p1.anim.legs=[
						{top:7.5,bottom:9,length:{top:13,bottom:13}},
						{top:33,bottom:16.5,length:{top:13,bottom:13}}
					]
					p1.anim.arms=[
						{top:15,bottom:7.5,length:{top:13,bottom:13}},
						{top:24,bottom:27,length:{top:13,bottom:13}}
					]
					p1.spin.legs=[{top:-60,bottom:-102,lock:0},{top:60,bottom:102,lock:0}]
					p1.spin.arms=[{top:-90,bottom:-90,lock:0},{top:90,bottom:90,lock:0}]
				break
				case 'Decratite':
					p1.parts.mouth-=3
					p1.anim.mouth.x++
					p1.anim.mouth.y--
					p1.spin.mouth-=180
					p1.anim.legs=[{top:6,bottom:3,length:{top:17,bottom:17}},{top:18,bottom:-3,length:{top:17,bottom:17}}]
                    p1.anim.arms=[{top:36,bottom:-3,length:{top:17,bottom:17}},{top:24,bottom:-9,length:{top:17,bottom:17}}]
                	p1.spin.legs=[{top:-60,bottom:-120},{top:60,bottom:120}]
					p1.spin.arms=[{top:-93,bottom:-90,lock:0},{top:93,bottom:90,lock:0}]
				break
				case 'Dukelis':
					p1.anim.arms[0].top=54
					p1.anim.arms[1].top=45
					p1.anim.legs[0].top=27
					p1.anim.legs[1].top=33
					p1.position.y-=5
				break
			}
			p1.size=1.5
			p1.fade=1
			p1.graphic=true
			if(damage[a]==1&&options.damage){
				p1.trigger.display.extra.damage=true
			}
			return p1
	}
}
function setupGeneralGraphics(){
	/*
	0-1 Lira Bow
	2-3 Lira Flower
	4-6 Lira Sandal Bottom
	7-8 Lira Sandal Top
	9-11 Sakura Flower
	12-14 Sakura Sandal Bottom
	15-16 Sakura Sandal Top
	17 Sakura Scythe
	18 Sakura Floral Print
	19-21 Ume Sandal Bottom
	22-23 Ume Sandal Top
	24-25 Sakura Parasol
	26 Plant Tile
	27-29 Setsuna Sandal Bottom
	30-31 Setsuna Sandal Top
	32-33 Setsuna Bow
	34-35 Setsuna Flower
	36 Daiyousei Bow
	*/
	for(let a=0,la=37;a<la;a++){
		switch(a){
			case 9: case 11:
				graphics.minor.push(createGraphics(160,240))
			break
			case 24:
				graphics.minor.push(createGraphics(600,300))
			break
			case 25:
				graphics.minor.push(createGraphics(400,200))
			break
			case 26:
				graphics.minor.push(createGraphics(80,80))
			break
			default:
				graphics.minor.push(createGraphics(160,160))
			break
		}
		setupLayer(graphics.minor[graphics.minor.length-1])
	}
	for(let a=0,la=2;a<la;a++){
		graphics.minor[a].translate(80,80)
		for(let b=0,lb=16;b<lb;b++){
			graphics.minor[a].fill(80+b*8,200+b*5,80+b*8)
			graphics.minor[a].triangle(0,0,15+b*0.5,45-b*1.25,45-b*1.25,15+b*0.5)
			graphics.minor[a].triangle(0,0,-15-b*0.5,-45+b*1.25,-45+b*1.25,-15-b*0.5)
		}
	}
	graphics.minor[1].erase()
	graphics.minor[1].triangle(15,20,40,30,20,55)
	graphics.minor[1].triangle(-15,-60,-40,-20,-20,-25)
	for(let a=0,la=2;a<la;a++){
		graphics.minor[2+a].translate(80,80)
		for(let b=0,lb=8;b<lb;b++){
			graphics.minor[2+a].rotate(19+a*7-b)
			graphics.minor[2+a].fill(100+a*25+b*(20-a*5),50+b*15,150-a*25+b*(5+a*5))
			for(let c=0,lc=12;c<lc;c++){
				graphics.minor[2+a].rotate(30)
				graphics.minor[2+a].ellipse(0,(24-b)*(1-b/lb),15*(1-b/lb),30*(1-b/lb))
			}
		}
		graphics.minor[2+a].rotate(12+a*36)
		graphics.minor[2+a].fill(50+a*25,0,100-a*25)
		for(let b=0,lb=5;b<lb;b++){
			graphics.minor[2+a].rotate(72)
			graphics.minor[2+a].rect(0,-6,2,12)
			graphics.minor[2+a].ellipse(0,-12,4,4)
		}
	}
	for(let a=0,la=3;a<la;a++){
		graphics.minor[4+a].fill(150,160,196)
		graphics.minor[4+a].rect(80,80,100,20)
		graphics.minor[4+a].ellipse(80,70,100,100)
		graphics.minor[4+a].ellipse(80,90,100,100)
		graphics.minor[4+a].fill(105,112,137)
		graphics.minor[4+a].rect(80,70,100,6)
		graphics.minor[4+a].rect(80,90,100,6)
		graphics.minor[4+a].quad(36,47,124,47,127,53,33,53)
		graphics.minor[4+a].quad(36,113,124,113,127,107,33,107)
		graphics.minor[4+a].quad(54,27,106,27,114,33,46,33)
		graphics.minor[4+a].quad(54,133,106,133,114,127,46,127)
	}
	graphics.minor[5].erase()
	graphics.minor[5].triangle(90,70,65,20,115,20)
	graphics.minor[5].triangle(65,100,95,140,35,140)
	graphics.minor[6].erase()
	graphics.minor[6].triangle(70,50,25,20,115,20)
	graphics.minor[6].triangle(95,85,75,140,115,140)
	for(let a=0,la=2;a<la;a++){
		graphics.minor[7+a].stroke(95,55,65)
		graphics.minor[7+a].strokeWeight(20)
		graphics.minor[7+a].line(80+56*(a*2-1),46,80,150)
	}
	graphics.minor[9].translate(80,140)
	flower(graphics.minor[9],0.4,[[136,61,92],[195,68,87],[124,41,51],[211,153,120]],[21,28,7,3],[56],1,100)
	graphics.minor[9].translate(0,-30)
	flower(graphics.minor[9],0.5,[[136,61,92],[195,68,87],[124,41,51],[211,153,120]],[21,28,7,3],[56],1,100)
	graphics.minor[10].translate(80,80)
	flower(graphics.minor[10],0.5,[[241,170,189],[250,222,226],[240,207,211],[254,228,232]],[20,40,12,4],[54],1,100)
	graphics.minor[11].translate(80,160)
	crystalFlower(graphics.minor[11],0.3,36,[[216,112,124],[247,225,225],[220,160,180],[240,180,200]],[30,4,3],[62],1)
	graphics.minor[11].translate(0,-30)
	crystalFlower(graphics.minor[11],0.5,0,[[216,112,124],[247,225,225],[220,160,180],[240,180,200]],[30,4,3],[62],1)
	for(let a=0,la=3;a<la;a++){
		graphics.minor[12+a].fill(151,119,103)
		graphics.minor[12+a].rect(80,80,100,20)
		graphics.minor[12+a].ellipse(80,70,100,100)
		graphics.minor[12+a].ellipse(80,90,100,100)
		graphics.minor[12+a].fill(122,94,90)
		graphics.minor[12+a].rect(80,70,100,6)
		graphics.minor[12+a].rect(80,90,100,6)
		graphics.minor[12+a].quad(36,47,124,47,127,53,33,53)
		graphics.minor[12+a].quad(36,113,124,113,127,107,33,107)
		graphics.minor[12+a].quad(54,27,106,27,114,33,46,33)
		graphics.minor[12+a].quad(54,133,106,133,114,127,46,127)
	}
	graphics.minor[13].erase()
	graphics.minor[13].triangle(90,70,65,20,115,20)
	graphics.minor[13].triangle(65,100,95,140,35,140)
	graphics.minor[14].erase()
	graphics.minor[14].triangle(70,50,25,20,115,20)
	graphics.minor[14].triangle(95,85,75,140,115,140)
	for(let a=0,la=2;a<la;a++){
		graphics.minor[15+a].stroke(201,61,96)
		graphics.minor[15+a].strokeWeight(20)
		graphics.minor[15+a].line(80+56*(a*2-1),46,80,150)
		graphics.minor[15+a].stroke(233,216,194)
		graphics.minor[15+a].strokeWeight(8)
		for(let b=0,lb=4;b<lb;b++){
			graphics.minor[15+a].point(80+(51-b*14)*(a*2-1),56+b*26)
		}
	}
	graphics.minor[17].translate(80,80)
	graphics.minor[17].scale(-0.9,0.9)
	graphics.minor[17].rotate(-90)
	graphics.minor[17].fill(138,141,207)
	graphics.minor[17].arc(0,0,150,180,0,30)
	graphics.minor[17].fill(111,114,178)
	graphics.minor[17].arc(0,0,150,180,30,60)
	graphics.minor[17].fill(88,82,128)
	graphics.minor[17].arc(0,0,150,180,60,90)
	graphics.minor[17].fill(161,168,222)
	graphics.minor[17].arc(0,0,135,180,0,15)
	graphics.minor[17].fill(121,124,188)
	graphics.minor[17].arc(0,0,135,180,15,45)
	graphics.minor[17].fill(98,92,138)
	graphics.minor[17].arc(0,0,135,180,45,75)
	graphics.minor[17].fill(77,65,108)
	graphics.minor[17].arc(0,0,135,180,75,90)
	graphics.minor[17].erase()
	graphics.minor[17].arc(0,0,120,180,0,90)
	graphics.minor[17].noErase()
	graphics.minor[17].fill(189,187,237)
	graphics.minor[17].rect(0,0,160,8,3)
	graphics.minor[17].fill(149,134,184)
	graphics.minor[17].rect(0,-2,160,4,3)
	graphics.minor[18].translate(80,80)
    graphics.minor[18].fill(255,123,205)
    graphics.minor[18].noStroke()
    for(let a=0;a<5;a++){
        graphics.minor[18].beginShape()
        graphics.minor[18].vertex(0,0)
        graphics.minor[18].bezierVertex(-18,-20,-16,-45,0,-45)
        graphics.minor[18].bezierVertex(16,-45,18,-20,0,0)
        graphics.minor[18].endShape()
        graphics.minor[18].rotate(72)
    }
    graphics.minor[18].erase()
    graphics.minor[18].ellipse(0,0,20,20)
	for(let a=0,la=3;a<la;a++){
		graphics.minor[19+a].fill(183,157,196)
		graphics.minor[19+a].rect(80,80,100,20)
		graphics.minor[19+a].ellipse(80,70,100,100)
		graphics.minor[19+a].ellipse(80,90,100,100)
		graphics.minor[19+a].fill(116,109,166)
		graphics.minor[19+a].rect(80,70,100,6)
		graphics.minor[19+a].rect(80,90,100,6)
		graphics.minor[19+a].quad(36,47,124,47,127,53,33,53)
		graphics.minor[19+a].quad(36,113,124,113,127,107,33,107)
		graphics.minor[19+a].quad(54,27,106,27,114,33,46,33)
		graphics.minor[19+a].quad(54,133,106,133,114,127,46,127)
	}
	graphics.minor[20].erase()
	graphics.minor[20].triangle(90,70,65,20,115,20)
	graphics.minor[20].triangle(65,100,95,140,35,140)
	graphics.minor[21].erase()
	graphics.minor[21].triangle(70,50,25,20,115,20)
	graphics.minor[21].triangle(95,85,75,140,115,140)
	for(let a=0,la=2;a<la;a++){
		graphics.minor[22+a].stroke(200,233,226)
		graphics.minor[22+a].strokeWeight(20)
		graphics.minor[22+a].line(80+56*(a*2-1),46,80,150)
		graphics.minor[22+a].stroke(107,200,215)
		graphics.minor[22+a].strokeWeight(8)
		for(let b=0,lb=4;b<lb;b++){
			graphics.minor[22+a].line(80+(58-b*14)*(a*2-1),53.5+b*26,80+(48-b*14)*(a*2-1),53.5+b*26)
		}
	}
	graphics.minor[24].stroke(99,58,71)
	graphics.minor[24].strokeWeight(3)
	for(let a=0;a<10;a++){
		graphics.minor[24].line(300,225,60+(a+0.5)*48,75)
	}
	graphics.minor[24].fill(0)
	graphics.minor[24].noStroke()
	graphics.minor[24].erase()
	graphics.minor[24].beginShape()
	graphics.minor[24].vertex(480,125)
	graphics.minor[24].bezierVertex(400,100,200,100,120,125)
	graphics.minor[24].vertex(20,125)
	graphics.minor[24].vertex(20,50)
	graphics.minor[24].vertex(580,50)
	graphics.minor[24].vertex(580,125)
	graphics.minor[24].endShape()
	graphics.minor[25].stroke(178,86,74)
	graphics.minor[25].strokeWeight(3)
	for(let a=0;a<11;a++){
		graphics.minor[25].line(200,125,20+a*36,25)
	}
	graphics.minor[25].fill(0)
	graphics.minor[25].noStroke()
	graphics.minor[25].erase()
	graphics.minor[25].beginShape()
	graphics.minor[25].vertex(380,25)
	graphics.minor[25].bezierVertex(300,50,100,50,20,25)
	graphics.minor[25].vertex(0,20)
	graphics.minor[25].vertex(400,20)
	graphics.minor[25].endShape()
	graphics.minor[26].fill(0,100,0)
	graphics.minor[26].ellipse(40,40,54,54)
	for(let a=0,la=60;a<la;a++){
		b=360*a/la
		c=sqrt(random(0,28**2))
		graphics.minor[26].fill(random(0,50),100+random(0,100),random(0,50))
		graphics.minor[26].ellipse(40+lsin(b)*c,40+lcos(b)*c,random(10,15))
	}
	for(let a=0,la=3;a<la;a++){
		graphics.minor[27+a].fill(155,176,150)
		graphics.minor[27+a].rect(80,80,100,20)
		graphics.minor[27+a].ellipse(80,70,100,100)
		graphics.minor[27+a].ellipse(80,90,100,100)
		graphics.minor[27+a].fill(107,117,105)
		graphics.minor[27+a].rect(80,70,100,6)
		graphics.minor[27+a].rect(80,90,100,6)
		graphics.minor[27+a].quad(36,47,124,47,127,53,33,53)
		graphics.minor[27+a].quad(36,113,124,113,127,107,33,107)
		graphics.minor[27+a].quad(54,27,106,27,114,33,46,33)
		graphics.minor[27+a].quad(54,133,106,133,114,127,46,127)
	}
	graphics.minor[28].erase()
	graphics.minor[28].triangle(90,70,65,20,115,20)
	graphics.minor[28].triangle(65,100,95,140,35,140)
	graphics.minor[29].erase()
	graphics.minor[29].triangle(70,50,25,20,115,20)
	graphics.minor[29].triangle(95,85,75,140,115,140)
	for(let a=0,la=2;a<la;a++){
		graphics.minor[30+a].stroke(55,65,95)
		graphics.minor[30+a].strokeWeight(20)
		graphics.minor[30+a].line(80+56*(a*2-1),46,80,150)
	}
	for(let a=0,la=2;a<la;a++){
		graphics.minor[32+a].translate(80,80)
		graphics.minor[32+a].rotate(15)
		for(let b=0,lb=16;b<lb;b++){
			graphics.minor[32+a].fill(184+b*10,102+b*6,78+b*5)
			for(let c=0,lc=4;c<lc;c++){
				graphics.minor[32].rotate(90)
				graphics.minor[32+a].triangle(-2,-2,20+b*0.5,45-b*1.25,45-b*1.25,20+b*0.5)
			}
		}
	}
	graphics.minor[33].erase()
	graphics.minor[33].triangle(15,20,40,30,20,55)
	graphics.minor[33].triangle(-15,-60,-40,-20,-20,-25)
	for(let a=0,la=2;a<la;a++){
		graphics.minor[34+a].translate(80,80)
		for(let b=0,lb=8;b<lb;b++){
			graphics.minor[34+a].rotate(19+a*7-b)
			graphics.minor[34+a].fill(225-a*25+b*10,75+a*125+b*10,75+a*125+b*10)
			for(let c=0,lc=5;c<lc;c++){
				graphics.minor[34+a].rotate(72)
				graphics.minor[34+a].ellipse(0,(24-b)*(1-b/lb),24*(1-b/lb),36*(1-b/lb))
			}
		}
		graphics.minor[34+a].rotate(-12-a*36)
		graphics.minor[34+a].fill(225,200,50)
		for(let b=0,lb=9;b<lb;b++){
			graphics.minor[34+a].rotate(40)
			graphics.minor[34+a].rect(0,-5,1,10)
			graphics.minor[34+a].ellipse(0,-10,3,3)
		}
	}
	graphics.minor[36].translate(80,80)
	graphics.minor[36].rotate(-155)
	for(let a=0,la=16;a<la;a++){
		let merge=mergeColor([234,200,116],[203,130,68],abs(8-a)/8)
		graphics.minor[36].fill(...merge)
		graphics.minor[36].rotate(-10)
		graphics.minor[36].quad(0,0,-48+a/la*24,-24+a/la*24,-39+a/la*12,0,-48+a/la*24,24-a/la*24)
		graphics.minor[36].rotate(20)
		graphics.minor[36].quad(0,0,48-a/la*24,-24+a/la*24,39-a/la*12,0,48-a/la*24,24-a/la*24)
		graphics.minor[36].rotate(50)
		graphics.minor[36].quad(0,0,-48+a/la*24,-9+a/la*9,-42+a/la*12,0,-48+a/la*24,9-a/la*9)
		graphics.minor[36].rotate(-120)
		graphics.minor[36].quad(0,0,48-a/la*24,-9+a/la*9,42-a/la*12,0,48-a/la*24,9-a/la*9)
		graphics.minor[36].rotate(60)

	}
}
function setupBackground(type,layer){
	switch(type){
		case -1:
			layer.background(0)
		break
		case 0:
			layer.noStroke()
            for(let a=0,la=layer.height*4/5;a<la;a++){
                layer.fill(130-50*a/la,195-50*a/la,230-50*a/la)
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
            for(let a=0,la=layer.height/100;a<la;a++){
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
            for(let a=0;a<1e3;a++){
                b=random(0,2)
                c=random(15,20)
                d=random(layer.height*0.65+lsin((-50+(a*12)%(layer.width+100))*1.2)*50,layer.height*0.8)
                e=random(0,360)
                f=random(b/4,b)
				layer.push()
                layer.translate(-50+(a*12)%(layer.width+100),d)
                layer.rotate(e)
                for(h=0;h<3;h++){
                    for(g=0;g<5;g++){
                        layer.rotate(72)
                        layer.fill(105+b*70-h*15,170+f*65-h*15,170+f*95-h*15)
                        layer.ellipse(c*(1-h/3)*0.9,0,c*1.8*(1-h/3),c*0.6*(1-h/3))
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
                    layer.quad(d+lsin(f)*h,e+lcos(f)*h,d+lsin(f+90)*h*3,e+lcos(f+90)*h*3,d+lsin(f+180)*h,e+lcos(f+180)*h,d+lsin(f+270)*h*3,e+lcos(f+270)*h*3)
                }
            }
            for(let a=0,la=layer.height*2/25+30;a<la;a++){
                layer.fill(130-100*a/la,155-100*a/la,175-100*a/la)
                for(let b=0,lb=20;b<lb;b++){
                    layer.quad(layer.width*(b+b%2)/lb,a*2.5+0.5+layer.height*4/5,layer.width*(b+b%2)/lb,a*2.5+0.5+layer.height*4/5+30,layer.width*(b+1-b%2)/lb,a*2.5+0.5+layer.height*4/5,layer.width*(b+1-b%2)/lb,a*2.5+0.5+layer.height*4/5-30)
                }
            }
            for(let a=0,la=layer.height/25+30;a<la;a++){
                layer.fill(70-50*a/la,95-50*a/la,115-50*a/la)
                for(let b=0,lb=20;b<lb;b++){
                    layer.quad(layer.width*(b+1-b%2)/lb,a*2.5+0.5+layer.height*0.9,layer.width*(b+1-b%2)/lb,a*2.5+0.5+layer.height*0.9+30,layer.width*(b+b%2)/lb,a*2.5+0.5+layer.height*0.9,layer.width*(b+b%2)/lb,a*2.5+0.5+layer.height*0.9-30)
                }
            }
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
		break
		case 2:
			for(let a=0,la=30;a<=la;a++){
				for(let b=0,lb=20;b<=lb;b++){
					let offset=noise(a/2+b/3+150)*20+noise(b/2+a/3+200)*20
					layer.fill(60+random(0,5)+offset,70+random(0,5)+offset,80+random(0,5)+offset)
					layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
				}
			}
			for(let a=0.5,la=30;a<=la;a++){
				for(let b=0.5,lb=20;b<=lb;b++){
					let offset=noise(a/2+b/3+150)*20+noise(b/2+a/3+200)*20
					layer.fill(60+random(0,5)+offset,70+random(0,5)+offset,80+random(0,5)+offset)
					layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
				}
			}
			for(let b=0,lb=10;b<lb;b++){
				let bounce=random(-1.5,-0.5)
				for(let a=0,la=20;a<=la+1;a++){
					let offset=noise(a*1.5+b*0.5-100)*20+noise(b*1.5+a*0.5-50)*20
					layer.fill(20+random(0,5)+offset,30+random(0,5)+offset,40+random(0,5)+offset)
					layer.quad(layer.width*(a+bounce)/la+15,layer.height*(0.8+b/lb*0.2),layer.width*(a+1+bounce)/la+15,layer.height*(0.8+b/lb*0.2),layer.width*(a+1+bounce)/la-15,layer.height*(0.8+(b+1)/lb*0.2),layer.width*(a+bounce)/la-15,layer.height*(0.8+(b+1)/lb*0.2))
				}
			}
			for(let a=0,la=2;a<la;a++){
				layer.fill(150)
				regPoly(layer,layer.width/4+layer.width/2*a,layer.height*0.3+162.5,6,220,220,30)
				for(let b=0,lb=20;b<lb;b++){
					for(let c=0,lc=5+(b>=10?10-floor((b+1)/2):floor((b+1)/2));c<lc;c++){
						let offset=noise(b*1.5+c*0.5-200-a*100)*60+noise(c*1.5+b*0.5-150-a*100)*60
						layer.fill(100+random(0,5)+offset,180+random(0,5)+offset,(b>=16?100:200)+random(0,5)+offset)
						regTriangle(layer,layer.width/4+a*layer.width/2-(-lc/2+0.5+c)*40,layer.height*0.3+b*17.5-b%2*5,24,24,b%2*60)
					}
				}
			}
			p1=new combatant(layer,graphics.proxyBattle,900,940,0,0,0,0,findName('Managerial',types.combatant),0,0,180)
			p1.parts.mouth-=4
			p1.anim.mouth.x+=3
			p1.anim.mouth.y--
			p1.spin.mouth-=180
			p1.anim.legs=[{top:6,bottom:0,length:{top:20,bottom:20}},{top:6,bottom:0,length:{top:20,bottom:20}}]
			p1.anim.arms=[{top:120,bottom:-150,length:{top:20,bottom:20}},{top:21,bottom:-12,length:{top:20,bottom:20}}]
			p1.spin.legs=[{top:-60,bottom:-90},{top:60,bottom:90}]
			p1.spin.arms=[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]
			p1.size=5
			p1.fade=1
			p1.graphic=true
			p1.display()
		break
		case 3:
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
				b=random(3,4)
				c=b*random(1.25,1.5)
				d=b*random(4.5,7.5)
				e=random(0,layer.width)
				layer.fill(255,random(200,255),255,1-0.6*a/la)
				layer.ellipse(e,a*8,b)
				layer.fill(random(200,255),random(200,255),255,0.2-0.12*a/la)
				layer.ellipse(e,a*8,c,d)
				layer.ellipse(e,a*8,d,c)
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
            	layer.quad(900+lcos(20)*(120-a*5),920-lsin(20)*(120-a*5),900,920,900-lcos(20)*(120-a*5),920-lsin(20)*(120-a*5),900,600+a*12.5)
			}
			for(let a=0,la=20;a<la;a++){
            	layer.fill(255,125+a*5,0,0.15)
				layer.arc(900,920,(120-a*5),(120-a*5),-20,200)
            	layer.quad(900+lcos(20)*(60-a*2.5),920-lsin(20)*(60-a*2.5),900,920,900-lcos(20)*(60-a*2.5),920-lsin(20)*(60-a*2.5),900,760+a*6.25)
			}
		break
		case 4:
			layer.noStroke()
			for(let a=0,la=layer.height*4/5;a<la;a++){
                layer.fill(200-50*a/la,225-50*a/la,250-50*a/la)
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
			for(let a=0,la=400;a<la;a++){
				b=random(0,180)
				c=sqrt(random(0,600**2))
				layer.push()
				layer.translate(layer.width*0.7+lcos(b)*c,layer.height*0.825-lsin(b)*c*0.5)
				layer.rotate(random(0,360))
				layer.fill(random(100,120),random(100,120),random(90,100))
				layer.rect(0,0,random(60,80))
				layer.pop()
			}
			for(let a=0,la=50;a<la;a++){
				layer.fill(random(100,120),120,120)
				layer.ellipse(random(0,layer.width),layer.height*0.8+random(-5,5),random(20,40))
			}
			for(let a=0,la=layer.height/5;a<la;a++){
                layer.fill(125-25*a/la,115-25*a/la,105-25*a/la)
                layer.rect(layer.width/2,a+0.5+layer.height*4/5,layer.width,2)
            }
		break
		case 5:
			for(let a=0,la=layer.height/5;a<la;a++){
                layer.fill(40+50*a/la,60+50*a/la,50+50*a/la)
                layer.rect(layer.width/2,a+0.5+layer.height*4/5,layer.width,2)
            }
            for(let a=0,la=100;a<la;a++){
                b=-50+a*75%(layer.width+100)+random(-10,10)
                c=-20+a*95%(layer.height*0.2+50)+random(-10,10)+layer.height*0.8
                d=random(0.6,1)
                e=random(0.8,1)
                g=random(0,2)
                for(let f=0,lf=20;f<lf;f++){
                    layer.fill(mergeColor([100,110,120],[90,95,100],f/lf+g))
                    layer.ellipse(b,c,120*d*(1-f/lf),90*d*e*(1-f/lf))
                }
            }
			for(let a=0,la=layer.height*4/5;a<la;a++){
                layer.fill(150+50*a/la,225+25*a/la,200+25*a/la)
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
			for(let a=0,la=200;a<la;a++){
                b=random(0,10)**2.5*2
                c=random(0.6,1)
                e=random(220,240)
                f=random(0,layer.width)
                for(let d=0,ld=20;d<ld;d++){
                    layer.fill(e,0.025)
                    layer.ellipse(f,b,c*400*(1-d/ld),c*240*(1-d/ld))
                }
            }
			for(let a=0,la=20;a<=la;a++){
				c=a==0?random(300,600):d
				d=random(300,600)+a%2*200
				for(let b=0,lb=20;b<lb;b++){
					layer.fill(150-50*(a-b/lb)/la)
					layer.quad(
						layer.width*(a-b/lb)/la,lerp(d,c,b/lb),
						layer.width*(a-(b+1)/lb)/la,lerp(d,c,(b+1)/lb),
						layer.width*(a-(b+1)/lb)/la,layer.height*0.8+1,
						layer.width*(a-b/lb)/la,layer.height*0.8+1,
					)
				}
			}
			for(let a=0,la=20;a<=la;a++){
				c=a==0?random(450,750):d
				d=random(450,750)+a%2*200
				for(let b=0,lb=20;b<lb;b++){
					layer.fill(100-50*(a-b/lb)/la)
					layer.quad(
						layer.width*(a+0.5-b/lb)/la,lerp(d,c,b/lb),
						layer.width*(a+0.5-(b+1)/lb)/la,lerp(d,c,(b+1)/lb),
						layer.width*(a+0.5-(b+1)/lb)/la,layer.height*0.8+1,
						layer.width*(a+0.5-b/lb)/la,layer.height*0.8+1,
					)
				}
			}
			for(let a=0,la=60;a<la;a++){
				layer.fill(0,1-sqrt(a/la))
				layer.rect(layer.width/2,a,layer.width,2)
			}
		break
		case 6:
			for(let a=0,la=layer.height;a<la;a++){
                layer.fill(40+30*a/la,80+70*a/la,100+80*a/la)
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
			for(let a=0,la=layer.height*0.1;a<la;a++){
				b=random(3,4)
				c=b*random(1.25,1.5)
				d=b*random(4.5,7.5)
				e=random(0,layer.width)
				layer.fill(random(200,255),random(200,255),255,1-0.6*a/la)
				layer.ellipse(e,a*8,b)
				layer.fill(random(200,255),random(200,255),255,0.2-0.12*a/la)
				layer.ellipse(e,a*8,c,d)
				layer.ellipse(e,a*8,d,c)
			}
			for(let a=0,la=30;a<=la;a++){
				for(let b=14,lb=20,sb=b;b<=lb;b++){
					let offset=noise(a/2+b/5+50)*20+noise(b/2+a/5+100)*20
					layer.fill(30+random(0,5)+offset,50+random(0,5)+offset,70+random(0,5)+offset)
					if(b==16&&sb==16&&abs(15-a)!=8){
						layer.triangle(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
					}else{
						layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
					}
				}
			}
			for(let a=0.5,la=30;a<=la;a++){
				for(let b=14.5,lb=20,sb=b;b<=lb;b++){
					let offset=noise(a/2+b/5+50)*20+noise(b/2+a/5+100)*20
					layer.fill(30+random(0,5)+offset,50+random(0,5)+offset,70+random(0,5)+offset)
					if(b==16&&sb==16&&abs(15-a)!=8){
						layer.triangle(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
					}else{
						layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
					}
				}
			}
			for(let a=0,la=30;a<=la;a++){
				for(let b=8+constrain(abs(15-a)+2,4,8),lb=20,sb=b;b<=lb;b++){
					let offset=noise(a/2+b/5)*20+noise(b/2+a/5+50)*20
					layer.fill(60+random(0,5)+offset,80+random(0,5)+offset,100+random(0,5)+offset)
					if(b==16&&sb==16&&abs(15-a)!=6){
						layer.triangle(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
					}else{
						layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
					}
				}
			}
			for(let a=0.5,la=30;a<=la;a++){
				for(let b=8+constrain(abs(15-a)+2,4.5,8.5),lb=20;b<=lb;b++){
					let offset=noise(a+b/3)*20+noise(b+a/3+50)*20
					layer.fill(60+random(0,5)+offset,80+random(0,5)+offset,100+random(0,5)+offset)
					layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
				}
			}
			for(let a=0,la=5;a<la;a++){
				for(let b=0,lb=5;b<lb;b++){
					let offset=noise(a/2+b/5+100)*60+noise(b/2+a/5+150)*60
					layer.fill(160+offset,180+offset,200+offset)
					layer.quad(
						layer.width/2+(a-b-1)*layer.width/60-0.5,layer.height/2+(a+b-7)*layer.height/40,
						layer.width/2+(a-b)*layer.width/60,layer.height/2+(a+b-8)*layer.height/40-0.5,
						layer.width/2+(a-b+1)*layer.width/60+0.5,layer.height/2+(a+b-7)*layer.height/40,
						layer.width/2+(a-b)*layer.width/60,layer.height/2+(a+b-6)*layer.height/40+0.5)
				}
			}
		break
		case 7:
			for(let a=0,la=layer.height;a<la;a++){
                layer.fill(250-25*a/la,220-50*a/la,240-60*a/la)
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
			for(let a=0,la=layer.height/5;a<la;a++){
				for(let b=0,lb=4;b<lb;b++){
					for(let c=0,lc=20;c<lc;c++){
						layer.fill(250-25*(a/la+c/lc*0.6),220-50*(a/la+c/lc*0.6),240-60*(a/la+c/lc*0.6))
						layer.rect(layer.width*b/(lb-1),a*5+2.5,layer.width/lb*0.8*(1-c/lc)*(la/2+a/2)/la,6)
					}
				}
			}
			for(let a=0,la=100;a<la;a++){
                b=random(0,10)**2.5
                c=random(0.6,1)
                e=random(160,200)
                f=random(0,layer.width)
                for(let d=0,ld=10;d<ld;d++){
                    layer.fill(e+100,e,e,0.01)
                    layer.ellipse(f,b,c*200*(1-d/ld),c*120*(1-d/ld))
                }
            }
			for(let a=0,la=30;a<la;a++){
				c=random(15,30)
				d=random(-30,30)+(a+0.5)/la*layer.width
				e=random(15,25)
				f=random(0,1)
				g=random(1,2)
				for(let b=0,lb=2;b<lb;b++){
					layer.fill(237.5-25*(f+b*0.2),175-50*(f+b*0.2),190-60*(f+b*0.2))
					layer.triangle(d-c+b*c*g/2,layer.height*0.9+b*c*e/10,d+c+b*c*g/2,layer.height*0.9+b*c*e/10,d-c+b*c*g/2,layer.height*0.9-c*e+b*c*e/10)
				}
			}
			for(let a=0,la=20;a<la;a++){
				c=random(20,40)
				d=random(-30,30)+(a+0.5)/la*layer.width
				e=random(15,25)
				f=random(0,1)
				g=random(1,2)
				for(let b=0,lb=3;b<lb;b++){
					layer.fill(225-25*(f+b*0.2),150-50*(f+b*0.2),160-60*(f+b*0.2))
					layer.triangle(d-c+b*c*g/2,layer.height*0.9+b*c*e/10,d+c+b*c*g/2,layer.height*0.9+b*c*e/10,d-c+b*c*g/2,layer.height*0.9-c*e+b*c*e/10)
				}
			}
			for(let a=0,la=3;a<la;a++){
				for(let b=0,lb=50;b<lb;b++){
					c=a/la*0.5+(b*7+0.5)%lb/lb*0.5+random(0,0.2)
					layer.fill(212.5-25*c,125-50*c,130-60*c)
					layer.rect((b*7+0.5)%lb/lb*layer.width+random(-20,20),layer.height-random(100,120)+a*50,random(60,120),random(60,120))
				}
			}
			for(let a=0,la=40;a<la;a++){
				for(let b=0,lb=10-floor(a/4);b<lb;b++){
					c=random(0,0.5)*b/lb
					d=random(0,1)
					layer.fill(220-c*80+d*30,140-c*90+d*20,120-c*100+d*10)
					layer.rect(a*40+random(-5,5),layer.height-25-a*10-lb*20+b*40,random(40,80),random(40,80))
				}
			}
			for(let a=0,la=80;a<la;a++){
				b=random(0,1)
				layer.fill(200-b*20,120-b*20,95-b*25)
				layer.ellipse(a*19.5+9.75+random(-15,15),layer.height-255-a*2.4+random(-5,5)+random(0,1)**4*(200-a/la*150),random(10,15))
			}
		break
		case 8:
			for(let a=0,la=30;a<=la;a++){
				for(let b=0,lb=20;b<=lb;b++){
					let offset=noise(a/2+b/3+150)*20+noise(b/2+a/3+200)*20
					layer.fill(100+random(0,5)+offset,110+random(0,5)+offset,120+random(0,5)+offset)
					layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
				}
			}
			for(let a=0.5,la=30;a<=la;a++){
				for(let b=0.5,lb=20;b<=lb;b++){
					let offset=noise(a/2+b/3+150)*20+noise(b/2+a/3+200)*20
					layer.fill(100+random(0,5)+offset,110+random(0,5)+offset,120+random(0,5)+offset)
					layer.quad(layer.width*a/la-layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb-layer.height/lb/2,layer.width*a/la+layer.width/la/2,layer.height*b/lb,layer.width*a/la,layer.height*b/lb+layer.height/lb/2)
				}
			}
			for(let b=0,lb=10;b<lb;b++){
				let bounce=random(-1.5,-0.5)
				for(let a=0,la=20;a<=la+1;a++){
					let offset=noise(a*1.5+b*0.5-100)*20+noise(b*1.5+a*0.5-50)*20
					layer.fill(60+random(0,5)+offset,70+random(0,5)+offset,80+random(0,5)+offset)
					layer.quad(layer.width*(a+bounce)/la+15,layer.height*(0.8+b/lb*0.2),layer.width*(a+1+bounce)/la+15,layer.height*(0.8+b/lb*0.2),layer.width*(a+1+bounce)/la-15,layer.height*(0.8+(b+1)/lb*0.2),layer.width*(a+bounce)/la-15,layer.height*(0.8+(b+1)/lb*0.2))
				}
			}
			layer.fill(180)
			for(let a=0,la=3;a<la;a++){
				layer.rect(layer.width/2-240+a*240,layer.height*0.55,125,125)
				layer.rect(layer.width/2-240+a*240,layer.height*0.75,125,125)
				layer.rect(layer.width/2-240+a*240,layer.height*0.55+100,200,55)
				layer.rect(layer.width/2-240+a*240,layer.height*0.75+100,200,55)
			}
			layer.rect(layer.width/2,layer.height*0.32,875,275)
			layer.fill(20)
			for(let a=0,la=3;a<la;a++){
				layer.rect(layer.width/2-240+a*240,layer.height*0.55,100,100)
				layer.rect(layer.width/2-240+a*240,layer.height*0.75,100,100)
				layer.rect(layer.width/2-240+a*240,layer.height*0.55+100,175,30)
				layer.rect(layer.width/2-240+a*240,layer.height*0.75+100,175,30)
			}
			layer.rect(layer.width/2,layer.height*0.32,850,250)
			layer.fill(180)
			regTriangle(layer,layer.width/2-245,layer.height*0.55,30,30,-30)
			regTriangle(layer,layer.width/2-25,layer.height*0.55,24,24,-30)
			regTriangle(layer,layer.width/2+15,layer.height*0.55,24,24,-30)
			regTriangle(layer,layer.width/2+260,layer.height*0.55,20,20,-30)
			layer.rect(layer.width/2-240,layer.height*0.75,36,36)
			regPoly(layer,layer.width/2,layer.height*0.75,4,25,25,0)
			layer.rect(layer.width/2+228,layer.height*0.75-12,18,18)
			layer.rect(layer.width/2+228,layer.height*0.75+12,18,18)
			layer.rect(layer.width/2+252,layer.height*0.75-12,18,18)
			layer.rect(layer.width/2+252,layer.height*0.75+12,18,18)
			layer.noFill()
			layer.stroke(180)
			layer.strokeWeight(10)
			layer.ellipse(layer.width/2+220,layer.height*0.55,30)
			layer.line(layer.width/2+235,layer.height*0.55,layer.width/2+250,layer.height*0.55)
			layer.noStroke()
			layer.fill(255)
			layer.textSize(20)
			layer.text('BEGIN 1 PLAYER',layer.width/2-240,layer.height*0.55+100)
			layer.text('BEGIN 2 PLAYER',layer.width/2,layer.height*0.55+100)
			layer.text('LOAD SAVE',layer.width/2+240,layer.height*0.55+100)
			layer.text('VARIANTS',layer.width/2-240,layer.height*0.75+100)
			layer.text('TUTORIALS',layer.width/2,layer.height*0.75+100)
			layer.text('COLLECTION',layer.width/2+240,layer.height*0.75+100)
			layer.textSize(180)
			for(let a=0,la=10;a<la;a++){
				layer.fill(50-50*a/la,255-105*a/la,100-100*a/la)
				layer.text('Movebuild',layer.width/2+a,layer.height*0.3+a)
			}
			layer.textSize(60)
			for(let a=0,la=10;a<la;a++){
				layer.fill(50-50*a/la,200-100*a/la,100-100*a/la)
				layer.text('DuckyProgramming',layer.width/2+a,layer.height*0.38+a)
			}
		break
		case 9:
			menuBackground(layer)
			layer.fill(120)
			layer.rect(layer.width/2,92.5,layer.width-40,145)
			layer.rect(layer.width/2,215,layer.width-40,80)
			layer.rect(layer.width/2+300,layer.height*0.6,125,125)
			layer.rect(layer.width/2+300,layer.height*0.6+100,125,55)
			layer.rect(layer.width/2-350,layer.height-60,610,80)
			layer.rect(layer.width/2-350,layer.height-137.5,225,55)
			layer.rect(layer.width/2+350,layer.height-60,610,80)
			layer.rect(layer.width/2+350,layer.height-137.5,225,55)
			layer.fill(0)
			layer.rect(layer.width/2,60,layer.width-65,55)
			layer.rect(layer.width/2,125,layer.width-65,55)
			for(let a=0,la=types.ascend.length;a<la;a++){
				layer.rect(25+(layer.width-50)*(0.5+a)/la,205,(layer.width-50)/la-12.5,35)
			}
			layer.rect(layer.width/2+300,layer.height*0.6,100,100)
			layer.rect(layer.width/2+300,layer.height*0.6+100,100,30)
			layer.rect(layer.width/2-575,layer.height-60,135,55)
			layer.rect(layer.width/2-425,layer.height-60,135,55)
			layer.rect(layer.width/2-275,layer.height-60,135,55)
			layer.rect(layer.width/2-125,layer.height-60,135,55)
			layer.rect(layer.width/2+125,layer.height-60,135,55)
			layer.rect(layer.width/2+275,layer.height-60,135,55)
			layer.rect(layer.width/2+425,layer.height-60,135,55)
			layer.rect(layer.width/2+575,layer.height-60,135,55)
			layer.rect(layer.width/2-350,layer.height-137.5,200,30)
			layer.rect(layer.width/2+350,layer.height-137.5,200,30)
			layer.fill(120)
			regTriangle(layer,layer.width/2+295,layer.height*0.6,30,30,-30)
			regTriangle(layer,layer.width/2-575,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-437.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-412.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-300,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-275,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-250,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-162.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-137.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-112.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-87.5,layer.height-60,22.5,22.5,-30)
			layer.textSize(40)
			layer.text('N/A',layer.width/2+125,layer.height-57.5)
			layer.text('15s',layer.width/2+275,layer.height-57.5)
			layer.text('30s',layer.width/2+425,layer.height-57.5)
			layer.text('60s',layer.width/2+575,layer.height-57.5)
			layer.fill(255)
			layer.textSize(20)
			for(let a=0,la=types.ascend.length;a<la;a++){
				layer.text(a,25+(layer.width-50)*(0.5+a)/la,240)
			}
			layer.text('ANIMATION SPEED',layer.width/2-350,layer.height-137.5)
			layer.text('TURN TIMER',layer.width/2+350,layer.height-137.5)
			layer.text('BEGIN',layer.width/2+300,layer.height*0.6+100)
			layer.fill(120)
			regPoly(layer,layer.width/2,layer.height*0.3+177.5,6,220,220,30)
			for(let b=0,lb=20;b<lb;b++){
				for(let c=0,lc=5+(b>=10?10-floor((b+1)/2):floor((b+1)/2));c<lc;c++){
					let offset=noise(b*1.5+c*0.5-200-a*100)*60+noise(c*1.5+b*0.5-150-a*100)*60
					layer.fill(offset)
					regTriangle(layer,layer.width/2-(-lc/2+0.5+c)*40,layer.height*0.3+b*17.5-b%2*5+15,24,24,b%2*60)
				}
			}
			layer.fill(120)
			regPoly(layer,layer.width/2,layer.height*0.3+177.5,6,120,120,30)
			layer.rect(layer.width/2,layer.height*0.65,225,75)
			layer.rect(layer.width/2-160,layer.height*0.65,75,75)
			layer.rect(layer.width/2+160,layer.height*0.65,75,75)
			layer.rect(layer.width/2,layer.height*0.65+80,225,65)
			layer.rect(layer.width/2,layer.height*0.65+160,225,75)
			layer.rect(layer.width/2-160,layer.height*0.65+160,75,75)
			layer.rect(layer.width/2+160,layer.height*0.65+160,75,75)
			layer.rect(layer.width/2,layer.height*0.65-480,225,65)
			layer.fill(0)
			regPoly(layer,layer.width/2,layer.height*0.3+177.5,6,100,100,30)
			layer.rect(layer.width/2,layer.height*0.65,200,50)
			layer.rect(layer.width/2-160,layer.height*0.65,50,50)
			layer.rect(layer.width/2+160,layer.height*0.65,50,50)
			layer.rect(layer.width/2,layer.height*0.65+80,200,40)
			layer.rect(layer.width/2,layer.height*0.65+160,200,50)
			layer.rect(layer.width/2-160,layer.height*0.65+160,50,50)
			layer.rect(layer.width/2+160,layer.height*0.65+160,50,50)
			layer.rect(layer.width/2,layer.height*0.65-480,200,40)
			layer.fill(120)
			regTriangle(layer,layer.width/2-157.5,layer.height*0.65,20,20,30)
			regTriangle(layer,layer.width/2+157.5,layer.height*0.65,20,20,-30)
			regTriangle(layer,layer.width/2-157.5,layer.height*0.65+160,20,20,30)
			regTriangle(layer,layer.width/2+157.5,layer.height*0.65+160,20,20,-30)
			layer.fill(255)
			layer.textSize(16)
			layer.text('RANDOM CHARACTER',layer.width/2,layer.height*0.65-480)
		break
		case 10:
			menuBackground(layer)
			layer.fill(120)
			layer.rect(layer.width/2,92.5,layer.width-40,145)
			layer.rect(layer.width/2,215,layer.width-40,80)
			layer.rect(layer.width/2,layer.height*0.6,125,125)
			layer.rect(layer.width/2,layer.height*0.6+100,125,55)
			layer.rect(layer.width/2-350,layer.height-60,610,80)
			layer.rect(layer.width/2-350,layer.height-137.5,225,55)
			layer.rect(layer.width/2+350,layer.height-60,610,80)
			layer.rect(layer.width/2+350,layer.height-137.5,225,55)
			layer.fill(0)
			layer.rect(layer.width/2,60,layer.width-65,55)
			layer.rect(layer.width/2,125,layer.width-65,55)
			for(let a=0,la=types.ascend.length;a<la;a++){
				layer.rect(25+(layer.width-50)*(0.5+a)/la,205,(layer.width-50)/la-12.5,35)
			}
			layer.rect(layer.width/2,layer.height*0.6,100,100)
			layer.rect(layer.width/2,layer.height*0.6+100,100,30)
			layer.rect(layer.width/2-575,layer.height-60,135,55)
			layer.rect(layer.width/2-425,layer.height-60,135,55)
			layer.rect(layer.width/2-275,layer.height-60,135,55)
			layer.rect(layer.width/2-125,layer.height-60,135,55)
			layer.rect(layer.width/2+125,layer.height-60,135,55)
			layer.rect(layer.width/2+275,layer.height-60,135,55)
			layer.rect(layer.width/2+425,layer.height-60,135,55)
			layer.rect(layer.width/2+575,layer.height-60,135,55)
			layer.rect(layer.width/2-350,layer.height-137.5,200,30)
			layer.rect(layer.width/2+350,layer.height-137.5,200,30)
			layer.fill(120)
			regTriangle(layer,layer.width/2-5,layer.height*0.6,30,30,-30)
			regTriangle(layer,layer.width/2-575,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-437.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-412.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-300,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-275,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-250,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-162.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-137.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-112.5,layer.height-60,22.5,22.5,-30)
			regTriangle(layer,layer.width/2-87.5,layer.height-60,22.5,22.5,-30)
			layer.textSize(40)
			layer.text('N/A',layer.width/2+125,layer.height-57.5)
			layer.text('15s',layer.width/2+275,layer.height-57.5)
			layer.text('30s',layer.width/2+425,layer.height-57.5)
			layer.text('60s',layer.width/2+575,layer.height-57.5)
			layer.fill(255)
			layer.textSize(20)
			for(let a=0,la=types.ascend.length;a<la;a++){
				layer.text(a,25+(layer.width-50)*(0.5+a)/la,240)
			}
			layer.text('ANIMATION SPEED',layer.width/2-350,layer.height-137.5)
			layer.text('TURN TIMER',layer.width/2+350,layer.height-137.5)
			layer.text('BEGIN',layer.width/2,layer.height*0.6+100)
			for(let a=0,la=2;a<la;a++){
				layer.fill(120)
				regPoly(layer,layer.width/4+layer.width/2*a,layer.height*0.3+177.5,6,220,220,30)
				for(let b=0,lb=20;b<lb;b++){
					for(let c=0,lc=5+(b>=10?10-floor((b+1)/2):floor((b+1)/2));c<lc;c++){
						let offset=noise(b*1.5+c*0.5-200-a*100)*60+noise(c*1.5+b*0.5-150-a*100)*60
						layer.fill(offset)
						regTriangle(layer,layer.width/4+a*layer.width/2-(-lc/2+0.5+c)*40,layer.height*0.3+b*17.5-b%2*5+15,24,24,b%2*60)
					}
				}
				layer.fill(120)
				regPoly(layer,layer.width/4+layer.width/2*a,layer.height*0.3+177.5,6,120,120,30)
				layer.rect(layer.width/4+layer.width/2*a,layer.height*0.65,225,75)
				layer.rect(layer.width/4+layer.width/2*a-160,layer.height*0.65,75,75)
				layer.rect(layer.width/4+layer.width/2*a+160,layer.height*0.65,75,75)
				layer.rect(layer.width/4+layer.width/2*a,layer.height*0.65+80,225,65)
				layer.rect(layer.width/4+layer.width/2*a,layer.height*0.65+160,225,75)
				layer.rect(layer.width/4+layer.width/2*a-160,layer.height*0.65+160,75,75)
				layer.rect(layer.width/4+layer.width/2*a+160,layer.height*0.65+160,75,75)
				layer.rect(layer.width/4+layer.width/2*a,layer.height*0.65-480,225,65)
				layer.fill(0)
				regPoly(layer,layer.width/4+layer.width/2*a,layer.height*0.3+177.5,6,100,100,30)
				layer.rect(layer.width/4+layer.width/2*a,layer.height*0.65,200,50)
				layer.rect(layer.width/4+layer.width/2*a-160,layer.height*0.65,50,50)
				layer.rect(layer.width/4+layer.width/2*a+160,layer.height*0.65,50,50)
				layer.rect(layer.width/4+layer.width/2*a,layer.height*0.65+80,200,40)
				layer.rect(layer.width/4+layer.width/2*a,layer.height*0.65+160,200,50)
				layer.rect(layer.width/4+layer.width/2*a-160,layer.height*0.65+160,50,50)
				layer.rect(layer.width/4+layer.width/2*a+160,layer.height*0.65+160,50,50)
				layer.rect(layer.width/4+layer.width/2*a,layer.height*0.65-480,200,40)
				layer.fill(120)
				regTriangle(layer,layer.width/4+layer.width/2*a-157.5,layer.height*0.65,20,20,30)
				regTriangle(layer,layer.width/4+layer.width/2*a+157.5,layer.height*0.65,20,20,-30)
				regTriangle(layer,layer.width/4+layer.width/2*a-157.5,layer.height*0.65+160,20,20,30)
				regTriangle(layer,layer.width/4+layer.width/2*a+157.5,layer.height*0.65+160,20,20,-30)
				layer.fill(255)
				layer.textSize(16)
				layer.text('RANDOM CHARACTER',layer.width/4+layer.width/2*a,layer.height*0.65-480)
			}
		break
		case 11:
			menuBackground(layer)
			layer.fill(120)
			layer.rect(layer.width/2-105,layer.height*0.7-10,125,125)
			layer.rect(layer.width/2-105,layer.height*0.7+90,200,55)
			layer.rect(layer.width/2+105,layer.height*0.7-10,125,125)
			layer.rect(layer.width/2+105,layer.height*0.7+90,200,55)
			for(let a=0,la=variants.names.length;a<la;a++){
				layer.rect(layer.width/2-570+a%4*380,layer.height/2-250+floor(a/4)*80,350,70)
			}
			layer.fill(0)
			layer.rect(layer.width/2-105,layer.height*0.7-10,100,100)
			layer.rect(layer.width/2-105,layer.height*0.7+90,175,30)
			layer.rect(layer.width/2+105,layer.height*0.7-10,100,100)
			layer.rect(layer.width/2+105,layer.height*0.7+90,175,30)
			for(let a=0,la=variants.names.length;a<la;a++){
				layer.rect(layer.width/2-597.5+a%4*380,layer.height/2-250+floor(a/4)*80,270,45)
				layer.rect(layer.width/2-430+a%4*380,layer.height/2-250+floor(a/4)*80,45,45)
			}
			layer.fill(120)
			regTriangle(layer,layer.width/2-110,layer.height*0.7-10,30,30,-30)
			layer.rect(layer.width/2+105,layer.height*0.7-10,36,36)
			layer.fill(255)
			layer.textSize(20)
			layer.text('BACK',layer.width/2-105,layer.height*0.7+90)
			for(let a=0,la=variants.names.length;a<la;a++){
				layer.textSize(a==10?18:20)
				layer.text(variants.names[a].toUpperCase(),layer.width/2-597.5+a%4*380,layer.height/2-250+floor(a/4)*80)
			}
			for(let a=0,la=5;a<la;a++){
				layer.text(a+1,layer.width/2-770,layer.height/2-250+a*80)
			}
			for(let a=0,la=4;a<la;a++){
				layer.text(a+1,layer.width/2-590+a%4*380,layer.height/2-300)
			}
			layer.textSize(15)
			layer.text('CUSTOM ULTRAPRISM',layer.width/2+105,layer.height*0.7+90)
		break
		case 12:
			menuBackground(layer)
			layer.fill(120)
			layer.rect(layer.width/2-210,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2-210,layer.height*0.7+290,200,55)
			layer.rect(layer.width/2,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2,layer.height*0.7+290,200,55)
			layer.rect(layer.width/2+210,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2+210,layer.height*0.7+290,200,55)
			for(let a=0,la=40;a<la;a++){
				layer.rect(layer.width/2-570+a%4*380,layer.height/2-450+floor(a/4)*80,350,70)
			}
			layer.fill(0)
			layer.rect(layer.width/2-210,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2-210,layer.height*0.7+290,175,30)
			layer.rect(layer.width/2,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2,layer.height*0.7+290,175,30)
			layer.rect(layer.width/2+210,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2+210,layer.height*0.7+290,175,30)
			for(let a=0,la=40;a<la;a++){
				layer.rect(layer.width/2-597.5+a%4*380,layer.height/2-450+floor(a/4)*80,270,45)
				layer.rect(layer.width/2-430+a%4*380,layer.height/2-450+floor(a/4)*80,45,45)
			}
			layer.fill(120)
			regTriangle(layer,layer.width/2-215,layer.height*0.7+190,30,30,-30)
			layer.beginShape()
			layer.vertex(layer.width/2-20,layer.height*0.7+160)
			layer.vertex(layer.width/2-30,layer.height*0.7+160)
			layer.vertex(layer.width/2-30,layer.height*0.7+170)
			layer.vertex(layer.width/2+20,layer.height*0.7+220)
			layer.vertex(layer.width/2+30,layer.height*0.7+220)
			layer.vertex(layer.width/2+30,layer.height*0.7+210)
			layer.endShape()
			layer.beginShape()
			layer.vertex(layer.width/2-20,layer.height*0.7+220)
			layer.vertex(layer.width/2-30,layer.height*0.7+220)
			layer.vertex(layer.width/2-30,layer.height*0.7+210)
			layer.vertex(layer.width/2+20,layer.height*0.7+160)
			layer.vertex(layer.width/2+30,layer.height*0.7+160)
			layer.vertex(layer.width/2+30,layer.height*0.7+170)
			layer.endShape()
			layer.rect(layer.width/2+210,layer.height*0.7+190,14,65)
			layer.rect(layer.width/2+210,layer.height*0.7+190,65,14)
			layer.fill(255)
			layer.textSize(20)
			layer.text('BACK',layer.width/2-210,layer.height*0.7+290)
			layer.text('DISABLE ALL',layer.width/2,layer.height*0.7+290)
			layer.text('ENABLE ALL',layer.width/2+210,layer.height*0.7+290)
			let names2=['COLORLESS','STATUS','CURSE','PARTNER','ARCANA','SPECTRAL','SUBSPECTRAL','JUNKYARD','SUBCARD','EVENT','RESERVE','DEVELOPER','REMOVED','BASIC','PACK','MISC']
			for(let a=0,la=40;a<la;a++){
				layer.text(a>=constants.playerNumber?names2[a-constants.playerNumber]:types.combatant[a+1].name.toUpperCase(),layer.width/2-597.5+a%4*380,layer.height/2-450+floor(a/4)*80)
			}
			for(let a=0,la=10;a<la;a++){
				layer.text((a+1)%10,layer.width/2-770,layer.height/2-450+a*80)
			}
			for(let a=0,la=4;a<la;a++){
				layer.text(a+1,layer.width/2-590+a%4*380,layer.height/2-500)
			}
		break
		case 13:
			menuBackground(layer)
			layer.fill(120)
			layer.rect(layer.width/2,layer.height*0.7+170,125,125)
			layer.rect(layer.width/2,layer.height*0.7+270,125,55)
			for(let a=0,la=32;a<la;a++){
				layer.rect(layer.width/2-570+a%4*380,layer.height/2-370+(a>=8?60:0)+floor(a/4)*80,350,70)
			}
			layer.fill(0)
			layer.rect(layer.width/2,layer.height*0.7+170,100,100)
			layer.rect(layer.width/2,layer.height*0.7+270,100,30)
			for(let a=0,la=32;a<la;a++){
				layer.rect(layer.width/2-597.5+a%4*380,layer.height/2-370+(a>=8?60:0)+floor(a/4)*80,270,45)
				layer.rect(layer.width/2-430+a%4*380,layer.height/2-370+(a>=8?60:0)+floor(a/4)*80,45,45)
			}
			layer.fill(120)
			regTriangle(layer,layer.width/2-5,layer.height*0.7+170,30,30,-30)
			layer.fill(255)
			layer.textSize(20)
			layer.text('BACK',layer.width/2,layer.height*0.7+270)
			let names3=['BASIC','LOCATIONS','KEYWORDS','HOTKEYS','STATUSES','ENEMIES','TACTICS','CHARACTER OVERVIEW']
			for(let a=0,la=32;a<la;a++){
				layer.text(a<8?names3[a]:types.combatant[a-7].name.toUpperCase(),layer.width/2-597.5+a%4*380,layer.height/2-370+(a>=8?60:0)+floor(a/4)*80)
			}
			for(let a=0,la=8;a<la;a++){
				layer.text(a+1,layer.width/2-770,layer.height/2-370+(a>=2?60:0)+a*80)
			}
			for(let a=0,la=4;a<la;a++){
				layer.text(a+1,layer.width/2-590+a%4*380,layer.height/2-420)
			}
			layer.textSize(50)
			for(let a=0,la=10;a<la;a++){
				layer.fill(50-50*a/la,255-105*a/la,100-100*a/la)
				layer.text('Mechanics',layer.width/2+a*0.5,layer.height/2-440+a*0.5)
				layer.text('Characters',layer.width/2+a*0.5,layer.height/2-220+a*0.5)
			}
		break
		case 14:
			menuBackground(layer)
			layer.fill(120)
			layer.rect(layer.width/2,layer.height*0.7+115,125,125)
			layer.rect(layer.width/2,layer.height*0.7+265,125,125)
			layer.rect(layer.width/2-150,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2+150,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2+300,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2+450,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2+600,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2+750,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2+300,layer.height*0.7+290,125,55)
			layer.rect(layer.width/2+450,layer.height*0.7+290,125,55)
			layer.rect(layer.width/2+600,layer.height*0.7+290,125,55)
			layer.rect(layer.width/2+750,layer.height*0.7+290,125,55)
			layer.rect(layer.width/2-150,layer.height*0.7+85,125,55)
			layer.rect(layer.width/2+150,layer.height*0.7+85,125,55)
			layer.rect(layer.width/2+450,layer.height*0.7+77.5,350,70)
			layer.fill(0)
			layer.rect(layer.width/2,layer.height*0.7+115,100,100)
			layer.rect(layer.width/2,layer.height*0.7+265,100,100)
			layer.rect(layer.width/2-150,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2+150,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2+300,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2+450,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2+600,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2+750,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2+300,layer.height*0.7+290,100,30)
			layer.rect(layer.width/2+450,layer.height*0.7+290,100,30)
			layer.rect(layer.width/2+600,layer.height*0.7+290,100,30)
			layer.rect(layer.width/2+750,layer.height*0.7+290,100,30)
			layer.rect(layer.width/2-150,layer.height*0.7+85,100,30)
			layer.rect(layer.width/2+150,layer.height*0.7+85,100,30)
			layer.rect(layer.width/2+422.5,layer.height*0.7+77.5,270,45)
			layer.rect(layer.width/2+590,layer.height*0.7+77.5,45,45)
			layer.fill(120)
			regTriangle(layer,layer.width/2-145,layer.height*0.7+190,30,30,30)
			regTriangle(layer,layer.width/2+145,layer.height*0.7+190,30,30,-30)
			regTriangle(layer,layer.width/2,layer.height*0.7+260,30,30,0)
			regTriangle(layer,layer.width/2,layer.height*0.7+120,30,30,60)
			layer.rect(layer.width/2+300,layer.height*0.7+190,36,36)
			layer.rect(layer.width/2+450,layer.height*0.7+176.5,36,9)
			layer.rect(layer.width/2+450,layer.height*0.7+190,36,9)
			layer.rect(layer.width/2+450,layer.height*0.7+203.5,36,9)
			layer.rect(layer.width/2+586.5,layer.height*0.7+190,9,36)
			layer.rect(layer.width/2+600,layer.height*0.7+190,9,36)
			layer.rect(layer.width/2+613.5,layer.height*0.7+190,9,36)
			regTriangle(layer,layer.width/2+750,layer.height*0.7+172,18,18,0)
			regTriangle(layer,layer.width/2+750,layer.height*0.7+208,18,18,60)
			layer.fill(255)
			layer.textSize(20)
			layer.text('MARK INGAME',layer.width/2+422.5,layer.height*0.7+77.5)
			layer.text('BACK',layer.width/2+300,layer.height*0.7+290)
			layer.text('QUERIES',layer.width/2+450,layer.height*0.7+290)
			layer.text('LISTS',layer.width/2+600,layer.height*0.7+290)
			layer.textSize(13)
			layer.text('MOVEBUILDLE',layer.width/2+750,layer.height*0.7+290)
		break
		case 15:
			menuBackground(layer)
			layer.fill(120)
			layer.rect(layer.width/2-210,layer.height*0.7+50,125,125)
			layer.rect(layer.width/2-210,layer.height*0.7+150,200,55)
			layer.rect(layer.width/2,layer.height*0.7+50,125,125)
			layer.rect(layer.width/2,layer.height*0.7+150,200,55)
			layer.rect(layer.width/2+210,layer.height*0.7+50,125,125)
			layer.rect(layer.width/2+210,layer.height*0.7+150,200,55)
			for(let a=0,la=12;a<la;a++){
				layer.rect(layer.width/2-570+a%4*380,layer.height/2-130+(a>=4?60:0)+floor(a/4)*80,350,70)
			}
			layer.fill(0)
			layer.rect(layer.width/2-210,layer.height*0.7+50,100,100)
			layer.rect(layer.width/2-210,layer.height*0.7+150,175,30)
			layer.rect(layer.width/2,layer.height*0.7+50,100,100)
			layer.rect(layer.width/2,layer.height*0.7+150,175,30)
			layer.rect(layer.width/2+210,layer.height*0.7+50,100,100)
			layer.rect(layer.width/2+210,layer.height*0.7+150,175,30)
			for(let a=0,la=12;a<la;a++){
				layer.rect(layer.width/2-597.5+a%4*380,layer.height/2-130+(a>=4?60:0)+floor(a/4)*80,270,45)
				layer.rect(layer.width/2-430+a%4*380,layer.height/2-130+(a>=4?60:0)+floor(a/4)*80,45,45)
			}
			layer.fill(120)
			regTriangle(layer,layer.width/2-215,layer.height*0.7+50,30,30,-30)
			regTriangle(layer,layer.width/2-215,layer.height*0.7+50,30,30,-30)
			layer.beginShape()
			layer.vertex(layer.width/2-20,layer.height*0.7+20)
			layer.vertex(layer.width/2-30,layer.height*0.7+20)
			layer.vertex(layer.width/2-30,layer.height*0.7+30)
			layer.vertex(layer.width/2+20,layer.height*0.7+80)
			layer.vertex(layer.width/2+30,layer.height*0.7+80)
			layer.vertex(layer.width/2+30,layer.height*0.7+70)
			layer.endShape()
			layer.beginShape()
			layer.vertex(layer.width/2-20,layer.height*0.7+80)
			layer.vertex(layer.width/2-30,layer.height*0.7+80)
			layer.vertex(layer.width/2-30,layer.height*0.7+70)
			layer.vertex(layer.width/2+20,layer.height*0.7+20)
			layer.vertex(layer.width/2+30,layer.height*0.7+20)
			layer.vertex(layer.width/2+30,layer.height*0.7+30)
			layer.endShape()
			layer.rect(layer.width/2+210,layer.height*0.7+50,14,65)
			layer.rect(layer.width/2+210,layer.height*0.7+50,65,14)
			layer.fill(255)
			layer.textSize(20)
			layer.text('BACK',layer.width/2-210,layer.height*0.7+150)
			layer.text('DISABLE ALL',layer.width/2,layer.height*0.7+150)
			layer.text('ENABLE ALL',layer.width/2+210,layer.height*0.7+150)
			let names4=['COMMON','UNCOMMON','RARE','OTHER','ATTACK','DEFENSE','MOVEMENT','SKILL','POWER','STATUS','CURSE','OTHER']
			for(let a=0,la=12;a<la;a++){
				layer.text(names4[a],layer.width/2-597.5+a%4*380,layer.height/2-130+(a>=4?60:0)+floor(a/4)*80)
			}
			layer.textSize(50)
			for(let a=0,la=10;a<la;a++){
				layer.fill(50-50*a/la,255-105*a/la,100-100*a/la)
				layer.text('Rarity',layer.width/2+a*0.5,layer.height/2-200+a*0.5)
				layer.text('Class',layer.width/2+a*0.5,layer.height/2-60+a*0.5)
			}
		break
		case 16:
			menuBackground(layer)
			layer.fill(120)
			layer.rect(layer.width/2-210,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2-210,layer.height*0.7+290,200,55)
			layer.rect(layer.width/2,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2,layer.height*0.7+290,200,55)
			layer.rect(layer.width/2+210,layer.height*0.7+190,125,125)
			layer.rect(layer.width/2+210,layer.height*0.7+290,200,55)
			for(let a=0,la=40;a<la;a++){
				layer.rect(layer.width/2-570+a%4*380,layer.height/2-450+floor(a/4)*80,350,70)
			}
			layer.fill(0)
			layer.rect(layer.width/2-210,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2-210,layer.height*0.7+290,175,30)
			layer.rect(layer.width/2,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2,layer.height*0.7+290,175,30)
			layer.rect(layer.width/2+210,layer.height*0.7+190,100,100)
			layer.rect(layer.width/2+210,layer.height*0.7+290,175,30)
			for(let a=0,la=40;a<la;a++){
				layer.rect(layer.width/2-597.5+a%4*380,layer.height/2-450+floor(a/4)*80,270,45)
				layer.rect(layer.width/2-430+a%4*380,layer.height/2-450+floor(a/4)*80,45,45)
			}
			layer.fill(120)
			regTriangle(layer,layer.width/2-215,layer.height*0.7+190,30,30,-30)
			layer.beginShape()
			layer.vertex(layer.width/2-20,layer.height*0.7+160)
			layer.vertex(layer.width/2-30,layer.height*0.7+160)
			layer.vertex(layer.width/2-30,layer.height*0.7+170)
			layer.vertex(layer.width/2+20,layer.height*0.7+220)
			layer.vertex(layer.width/2+30,layer.height*0.7+220)
			layer.vertex(layer.width/2+30,layer.height*0.7+210)
			layer.endShape()
			layer.beginShape()
			layer.vertex(layer.width/2-20,layer.height*0.7+220)
			layer.vertex(layer.width/2-30,layer.height*0.7+220)
			layer.vertex(layer.width/2-30,layer.height*0.7+210)
			layer.vertex(layer.width/2+20,layer.height*0.7+160)
			layer.vertex(layer.width/2+30,layer.height*0.7+160)
			layer.vertex(layer.width/2+30,layer.height*0.7+170)
			layer.endShape()
			layer.rect(layer.width/2+210,layer.height*0.7+190,14,65)
			layer.rect(layer.width/2+210,layer.height*0.7+190,65,14)
			layer.fill(255)
			layer.textSize(20)
			layer.text('BACK',layer.width/2-210,layer.height*0.7+290)
			layer.text('DISABLE ALL',layer.width/2,layer.height*0.7+290)
			layer.text('ENABLE ALL',layer.width/2+210,layer.height*0.7+290)
			for(let a=0,la=10;a<la;a++){
				layer.text((a+1)%10,layer.width/2-770,layer.height/2-450+a*80)
			}
			for(let a=0,la=4;a<la;a++){
				layer.text(a+1,layer.width/2-590+a%4*380,layer.height/2-500)
			}
		break

	}
}
function setupOverlay(type,layer){
	switch(type){
		case 0:
			layer.fill(0)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			layer.erase(0.2)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			layer.noErase()
			layer.erase(0.025)
			for(let a=0,la=100;a<la;a++){
				layer.arc(900,920,1440-a*24,1080-a*18,-180,0)
				layer.arc(900,920,1440-a*24,360-a*6,0,180)
			}
		break
	}
}
function setupEdition(type,layer,width){
	switch(type){
		case 0:
			layer.noFill()
			layer.stroke(0)
			layer.strokeWeight(10)
			layer.erase(1,1)
			layer.rect(layer.width/2,layer.height/2,width+15,135,12.5)
		break
		case 1:
			layer.fill(235,245,255,0.025)
			for(let a=0,la=120;a<la;a++){
				if(a%20==0){
					layer.noErase()
				}else if(a%20==10){
					layer.erase(0.025,0.025)
				}
				layer.rect(layer.width/2,layer.height/2,width*(1-a/la)*5/4,layer.height*(1-a/la),40*(1-a/la))
			}
			layer.noErase()
			for(let a=0,la=15;a<la;a++){
				let b=random(-6,6)
				let c=random(0.5,2.5)
				layer.stroke(255,255,255,random(0.025,0.1)*c)
				layer.strokeWeight(random(3,3.6)*c)
				layer.line(0,layer.height*a/la*2.25+b,layer.width,layer.height*(a/la*2.25-1.25)+b)
				layer.strokeWeight(random(1.2,2.4)*c)
				layer.line(0,layer.height*a/la*2.25+b,layer.width,layer.height*(a/la*2.25-1.25)+b)
				layer.strokeWeight(random(0.4,0.8)*c)
				layer.line(0,layer.height*a/la*2.25+b,layer.width,layer.height*(a/la*2.25-1.25)+b)
			}
		break
		case 2:
			layer.fill(100,50,200,0.1)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			layer.noFill()
			for(let a=0,la=50;a<la;a++){
				let b=random(-4,4)
				layer.stroke(255,255,255,random(0.025,0.1))
				layer.strokeWeight(random(2,3))
				layer.ellipse(layer.width/2,layer.height/2,10*a+b)
				layer.strokeWeight(random(0.5,1))
				layer.ellipse(layer.width/2,layer.height/2,10*a+b)
			}
			layer.fill(255,0.02)
			for(let a=0,la=6;a<la;a++){
				for(let b=0,lb=10;b<lb;b++){
					layer.arc(layer.width/2,layer.height/2,600,600,-90+a*60-8*(1-b/lb),-90+a*60+8*(1-b/lb))
				}
			}
		break
		case 3:
			layer.colorMode(HSB,360,255,255,1)
			layer.fill(0,150,200)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			let schema=[]
			for(let a=0,la=layer.width*0.06;a<la;a++){
				schema.push([])
				for(let b=0,lb=14;b<lb;b++){
					schema[a].push([random(0.6,1.5),random(1,2)])
				}
			}
			for(let a=0,la=24;a<la;a++){
				layer.fill(360*(a+1)/(la+1),150,200)
				layer.stroke(360*(a+1)/(la+1),150,200)
				layer.strokeWeight(3)
				layer.strokeJoin(ROUND)
				for(let b=0,lb=layer.width*0.06;b<lb;b++){
					for(let c=0,lc=14;c<lc;c++){
						if(1-a/la*schema[b][c][1]>0){
							regTriangle(layer,(b+(1-constants.sqrt3/2)/(constants.sqrt3/2)*((b+c)%2*2-1))/(lb-1)*layer.width,c/(lc-1)*layer.height,10*(1-a/la*schema[b][c][1])*random(0.8,1.2)*schema[b][c][0],10*(1-a/la*schema[b][c][1])*random(0.8,1.2)*schema[b][c][0],(b+c)%2*60-30+random(-15,15))
						}
					}
				}
			}
			layer.colorMode(RGB,255,255,255,1)
			layer.noStroke()
			layer.fill(100,50,200,0.5)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			layer.erase(0.5)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
		break
		case 4:
			layer.colorMode(HSB,360,255,255,1)
			layer.fill(0,150,200)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			for(let a=0,la=10;a<la;a++){
				for(let b=0,lb=120;b<lb;b++){
					layer.fill((360*6*b/lb+a*150)%360,100,150)
					layer.arc(layer.width/2,layer.height/2,500*(1-a/la),500*(1-a/la),360*b/lb,360*(b+1)/lb)
				}
			}
			for(let a=0,la=layer.width*0.04;a<la;a++){
				for(let b=0,lb=6;b<lb;b++){
					let c=(a+random(0.3,0.7))/la*layer.width
					let d=(b+a%2*0.5+random(0.05,0.45))/lb*layer.height
					let e=random(10,40)
					let f=random(0,360)
					let g=random(0,1)
					for(let h=0,lh=60;h<lh;h++){
						layer.fill(360*3*h/lh%360,100+100*g,150+100*g,0.25)
						for(let i=0,li=5;i<li;i++){
							layer.arc(c,d,e*(1-i/li*0.5),e*(1-i/li*0.5),f+360*h/lh,f+360*(h+1)/lh)
						}
					}
				}
			}
			layer.colorMode(RGB,255,255,255,1)
			layer.fill(100,50,200,0.5)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			layer.erase(0.5)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
		break
		case 5:
			for(let a=0,la=layer.width*0.08;a<la;a++){
				for(let b=0,lb=12;b<lb;b++){
					let c=(a+random(0.3,0.7))/la*layer.width
					let d=(b+a%2*0.5+random(0.05,0.45))/lb*layer.height
					let e=random(10,40)
					let f=random(0,360)
					let g=random(0,1)
					for(let h=0,lh=6;h<lh;h++){
						layer.fill(100+g*50,0.005)
						for(let i=0,li=10;i<li;i++){
							layer.arc(c,d,e*(1-i/li*0.7),e*(1-i/li*0.7),f+360*h/lh,f+360*(h+0.5)/lh)
						}
					}
				}
			}
		break
		case 6:
			layer.fill(50,75,75,0.2)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			for(let a=0,la=layer.width*0.08;a<la;a++){
				for(let b=0,lb=12;b<lb;b++){
					let c=floor(random(0,3))
					switch(c){
						case 0:
							layer.fill(25,75,225,0.3)
						break
						case 1:
							layer.fill(255,75,75,0.3)
						break
						case 2:
							layer.fill(255,175,0,0.3)
						break
					}
					c=floor(random(0,3))
					switch(c){
						case 0:
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height,6,2)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height-2,2,2)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height+2,2,2)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height,5,1)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height-1.5,1,2)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height+1.5,1,2)
						break
						case 1:
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height-2,6,2)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height+2,6,2)
							layer.rect((a+0.5)/la*layer.width-2,(b+0.5)/lb*layer.height,2,2)
							layer.rect((a+0.5)/la*layer.width+2,(b+0.5)/lb*layer.height,2,2)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height-2,5,1)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height+2,5,1)
							layer.rect((a+0.5)/la*layer.width-2,(b+0.5)/lb*layer.height,1,3)
							layer.rect((a+0.5)/la*layer.width+2,(b+0.5)/lb*layer.height,1,3)
						break
						case 2:
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height,2,2)
							layer.rect((a+0.5)/la*layer.width-2,(b+0.5)/lb*layer.height-2,2,2)
							layer.rect((a+0.5)/la*layer.width+2,(b+0.5)/lb*layer.height-2,2,2)
							layer.rect((a+0.5)/la*layer.width-2,(b+0.5)/lb*layer.height+2,2,2)
							layer.rect((a+0.5)/la*layer.width+2,(b+0.5)/lb*layer.height+2,2,2)
							layer.rect((a+0.5)/la*layer.width,(b+0.5)/lb*layer.height,1,1)
							layer.rect((a+0.5)/la*layer.width-2,(b+0.5)/lb*layer.height-2,1,1)
							layer.rect((a+0.5)/la*layer.width+2,(b+0.5)/lb*layer.height-2,1,1)
							layer.rect((a+0.5)/la*layer.width-2,(b+0.5)/lb*layer.height+2,1,1)
							layer.rect((a+0.5)/la*layer.width+2,(b+0.5)/lb*layer.height+2,1,1)
						break
					}
				}
			}
		break
		case 7:
			layer.fill(128,180,172,0.4)
			layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
			layer.stroke(180,245,235,0.4)
			layer.strokeWeight(4)
			for(let a=0,la=25;a<la;a++){
				layer.line(0,layer.height*(a/la*2.5-1.5),layer.width,layer.height*a/la*2.5)
			}
			layer.stroke(94,117,122,0.4)
			layer.strokeWeight(5)
			for(let a=0,la=10;a<la;a++){
				layer.beginShape()
				for(let b=0,lb=15;b<lb;b++){
					layer.vertex(layer.width*b/(lb-1),layer.height*(a+0.7-(a+b)%2*0.4)/la)
				}
				layer.endShape()
			}
		break
		case 8:
			let gradient=[new p5.LinearGradient(-10,layer.width),new p5.LinearGradient(5,layer.width),new p5.LinearGradient(15,layer.width)]
			gradient[0].colors(
				0.00,color(255,255,255,0.5),
				0.05,color(0,255,255,0.5),
				0.10,color(0,255,0,0.5),
				0.15,color(255,255,0,0.5),
				0.20,color(255,255,255,0.5),
				0.25,color(255,255,0,0.5),
				0.30,color(0,255,0,0.5),
				0.35,color(0,255,255,0.5),
				0.40,color(255,255,255,0.5),
				0.45,color(0,255,255,0.5),
				0.50,color(0,255,0,0.5),
				0.55,color(255,255,0,0.5),
				0.60,color(255,255,255,0.5),
				0.65,color(255,255,0,0.5),
				0.70,color(0,255,0,0.5),
				0.75,color(0,255,255,0.5),
				0.80,color(255,255,255,0.5),
				0.85,color(0,255,255,0.5),
				0.90,color(0,255,0,0.5),
				0.95,color(255,255,0,0.5),
				1.00,color(255,255,255,0.5)
			)
			gradient[1].colors(
				0.00,color(255,0,255,0.5),
				0.05,color(255,125,125,0.5),
				0.10,color(255,255,255,0.5),
				0.15,color(255,125,125,0.5),
				0.20,color(255,0,255,0.5),
				0.25,color(0,255,255,0.5),
				0.30,color(255,255,255,0.5),
				0.35,color(0,255,255,0.5),
				0.40,color(255,0,255,0.5),
				0.45,color(255,125,125,0.5),
				0.50,color(255,255,255,0.5),
				0.55,color(255,125,125,0.5),
				0.60,color(255,0,255,0.5),
				0.65,color(0,255,255,0.5),
				0.70,color(255,255,255,0.5),
				0.75,color(0,255,255,0.5),
				0.80,color(255,0,255,0.5),
				0.85,color(255,125,125,0.5),
				0.90,color(255,255,255,0.5),
				0.95,color(255,125,125,0.5),
				1.00,color(255,0,255,0.5)
			)
			gradient[2].colors(
				0.00,color(125,125,255,0.5),
				0.05,color(255,255,255,0.5),
				0.10,color(125,125,255,0.5),
				0.15,color(125,255,255,0.5),
				0.20,color(125,255,125,0.5),
				0.25,color(255,255,255,0.5),
				0.30,color(125,255,125,0.5),
				0.35,color(125,255,255,0.5),
				0.40,color(125,125,255,0.5),
				0.45,color(255,255,255,0.5),
				0.50,color(125,125,255,0.5),
				0.55,color(125,255,255,0.5),
				0.60,color(125,255,125,0.5),
				0.65,color(255,255,255,0.5),
				0.70,color(125,255,125,0.5),
				0.75,color(125,255,255,0.5),
				0.80,color(125,125,255,0.5),
				0.85,color(255,255,255,0.5),
				0.90,color(125,125,255,0.5),
				0.95,color(125,255,125,0.5),
				1.00,color(125,255,255,0.5)
			)
			for(let a=0,la=layer.width/10+2;a<la;a++){
				for(let b=0,lb=layer.height/3;b<lb;b++){
					let bounce=floor(random(-10,10))
					let length=(floor(random(0,20))==0?layer.width/5:floor(random(0,5))==0?3:floor(random(0,3))==0?2:1)
					layer.translate(bounce,0)
					if(floor(random(0,6))==0){
						layer.fillGradient(gradient[floor(random(0,3))])
						layer.rect(a*10-bounce-length%2*5,1.5+b*3,10*length,3)
					}
					layer.translate(-bounce,0)
				}
			}
			for(let a=0,la=layer.width/10*3+1;a<la;a++){
				for(let b=0,lb=layer.height/3;b<lb;b++){
					if(floor(random(0,20))==0){
						layer.fill(75+(a+b)%2*25,0.5)
						layer.rect(a*10/3,1.5+b*3,10/3,3)
					}
				}
			}
		break
	}
}
function setupSingleEditionGraphic(edition,width){
	let local=graphics.edition[edition-1]
	local.push([width,createGraphics(600,150)])
	setupLayer(local[local.length-1][1])
	setupEdition(edition,local[local.length-1][1],width)
	setupEdition(0,local[local.length-1][1],width)
}
function setupGraphics(){
	angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
	setupTrig()
	graphics.main=createGraphics(900,600)
	setupLayer(graphics.main)
	graphics.proxyBattle={player:[0],players:0}

	setupGeneralGraphics()
	graphics.staticBackground=createGraphics(1800,1200)
	setupLayer(graphics.staticBackground)
	setupBackground(8,graphics.staticBackground)
	/*for(let a=0,la=graphics.backgroundGen;a<la;a++){
		graphics.backgrounds.push(createGraphics(1800,1200))
		if(stage.scene!='graphic'||a==graphics.test){
			setupLayer(graphics.backgrounds[a])
			setupBackground(a,graphics.backgrounds[a])
		}
	}*/
	for(let a=0,la=graphics.overlayGen;a<la;a++){
		graphics.overlays.push(createGraphics(1800,1200))
		setupLayer(graphics.overlays[a])
		setupOverlay(a,graphics.overlays[a])
	}
	for(let a=0,la=8;a<la;a++){
		graphics.edition.push([[90,createGraphics(200,150)]])
		setupLayer(graphics.edition[a][0][1])
		setupEdition(a+1,graphics.edition[a][0][1],90)
		setupEdition(0,graphics.edition[a][0][1],90)
	}
	for(let a=0,la=50;a<la;a++){
		graphics.paperball.push([random(0,80),random(0,360)])
	}
	/*
	0-Perk
	1-Loss
	2-Win
	3-Rest
	4-Stash
	5-Event
	6-Bossstash
	7-Pack
	8-Title
	9-Menu
	10-Menu2
	11-Variants
	12-Custom
	13-Tutorial
	14-Collection (Background Only)
	*/
}
function setupTrig(){
	for(let a=0,la=180;a<la;a++){
		constants.trig[0].push(sin(a))
		constants.trig[1].push(cos(a))
		if(abs(constants.trig[0][a])<0.001){
			constants.trig[0][a]=0
		}
		if(abs(constants.trig[1][a])<0.001){
			constants.trig[1][a]=0
		}
	}
	for(let a=0,la=180;a<la;a++){
		constants.trig[0].push(-constants.trig[0][a])
		constants.trig[1].push(-constants.trig[1][a])
	}
}
function lsin(direction){
	return constants.trig[0][floor((direction%360+360)%360)]
}
function lcos(direction){
	return constants.trig[1][floor((direction%360+360)%360)]
}