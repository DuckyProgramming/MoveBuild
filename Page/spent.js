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
	*/
	for(let a=0,la=26;a<la;a++){
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
	flower(graphics.minor[9],0.4,[[136,61,92],[195,68,87],[124,41,51],[211,153,120]],[21,28,7,3],[56])
	graphics.minor[9].translate(0,-30)
	flower(graphics.minor[9],0.5,[[136,61,92],[195,68,87],[124,41,51],[211,153,120]],[21,28,7,3],[56])
	graphics.minor[10].translate(80,80)
	flower(graphics.minor[10],0.5,[[241,170,189],[250,222,226],[240,207,211],[254,228,232]],[20,40,12,4],[54])
	graphics.minor[11].translate(80,160)
	crystalFlower(graphics.minor[11],0.3,36,[[216,112,124],[247,225,225],[220,160,180],[240,180,200]],[30,4,3],[62])
	graphics.minor[11].translate(0,-30)
	crystalFlower(graphics.minor[11],0.5,0,[[216,112,124],[247,225,225],[220,160,180],[240,180,200]],[30,4,3],[62])
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
            for(let a=0;a<1e3;a++){
                b=random(0,2)
                c=random(15,20)
                d=random(layer.height*0.65+lsin((-50+(a*12)%(layer.width+100))*1.2)*50,layer.height*0.8)
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
                    layer.quad(d+lsin(f)*h,e+lcos(f)*h,d+lsin(f+90)*h*3,e+lcos(f+90)*h*3,d+lsin(f+180)*h,e+lcos(f+180)*h,d+lsin(f+270)*h*3,e+lcos(f+270)*h*3)
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
			/**/
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