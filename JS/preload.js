function preload(){
    for(let a=0,la=26;a<la;a++){
        graphics.minor.push(loadImage(`../Assets/Minor/${a}.png`))
    }
    for(let a=0,la=6;a<la;a++){
        graphics.backgrounds.push(loadImage(`../Assets/Backgrounds/${a}.png`))
    }
    for(let a=0,la=1;a<la;a++){
        graphics.overlays.push(loadImage(`../Assets/Overlays/${a}.png`))
    }
    loadingSprites=[{hair:{back:[],front:[]},kimono:{main:{back:[],front:[]},outside:{back:[],front:[]},mainDamage:{back:[],front:[]},outsideDamage:{back:[],front:[]}}}]
    for(let a=0,la=24;a<la;a++){
        loadingSprites[0].hair.back.push(loadImage(`../Assets/Combatant/0/Hair/Back/${a}.png`))
        loadingSprites[0].hair.front.push(loadImage(`../Assets/Combatant/0/Hair/Front/${a}.png`))
        loadingSprites[0].kimono.main.back.push(loadImage(`../Assets/Combatant/0/Kimono/Main/Back/${a}.png`))
        loadingSprites[0].kimono.main.front.push(loadImage(`../Assets/Combatant/0/Kimono/Main/Front/${a}.png`))
        loadingSprites[0].kimono.outside.back.push(loadImage(`../Assets/Combatant/0/Kimono/Outside/Back/${a}.png`))
        loadingSprites[0].kimono.outside.front.push(loadImage(`../Assets/Combatant/0/Kimono/Outside/Front/${a}.png`))
        loadingSprites[0].kimono.mainDamage.back.push(loadImage(`../Assets/Combatant/0/Kimono/MainDamage/Back/${a}.png`))
        loadingSprites[0].kimono.mainDamage.front.push(loadImage(`../Assets/Combatant/0/Kimono/MainDamage/Front/${a}.png`))
        loadingSprites[0].kimono.outsideDamage.back.push(loadImage(`../Assets/Combatant/0/Kimono/OutsideDamage/Back/${a}.png`))
        loadingSprites[0].kimono.outsideDamage.front.push(loadImage(`../Assets/Combatant/0/Kimono/OutsideDamage/Front/${a}.png`))
    }
}

//graphics.combatant[graphics.combatant.length-1].sprites=loadingSprites[graphics.combatant.length-1]