looping=0
abc=0
function keyPressed(){
    graphic1=createGraphics(600,600)
    setupLayer(graphic1)
    graphic1.translate(300,400)
    p1=new combatant(graphic1,graphics.proxyBattle,0,0,0,0,0,0,findName('Duck',types.combatant),0,0,-90+abc*15+looping%2*180)
    p1.size=5
    p1.fade=1
    p1.graphic=true
    p1.runAnimation(floor(looping/2)/6,0)
    p1.display()
    print(`DUCK-${floor(looping/2)}-${looping%2*12+abc}.png`)
    //save(graphic1,`DUCK-${floor(looping/2)}-${looping%2*12+abc}.png`)
    abc++
    if(abc>=12){
        abc-=12
        looping++
    }
}