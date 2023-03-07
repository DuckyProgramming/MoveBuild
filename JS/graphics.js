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
	graphics.backgrounds[0].background(0)
	graphics.backgrounds[0].fill(255)
	for(let a=0;a<9;a++){
		for(let b=0;b<3;b++){
			graphics.backgrounds[0].ellipse(random(0,100)+a*100,(pow(1.3,a*3+b+3+2)*40)%600,2,2);
		}
	}
	graphics.minor=[]
    for(let g=0;g<86;g++){
		graphics.minor.push(createGraphics(160,160))
	}

	for(let a=0,la=graphics.minor.length;a<la;a++){
		setupLayer(graphics.minor[a])
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
}