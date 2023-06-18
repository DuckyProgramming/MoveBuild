function preload(){
    for(let a=0,la=26;a<la;a++){
        //loadImage(`../Assets/Minor/${a}.png`)
    }
}
function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()

    setupCombatantGraphics(0)

    level=2
    for(let a=level*10,la=min(level*10+10,graphics.combatant[0].sprites.kimono.mainDamage.front.length);a<la;a++){
        //save(graphics.combatant[0].sprites.kimono.mainDamage.front[a],`${a}`)
    }
}