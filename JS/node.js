class node{
    constructor(layer,battle,x,y,tileX,tileY,type){
        this.layer=layer
        this.battle=battle
        this.position={x:x,y:y}
        this.tilePosition={x:tileX,y:tileY}
        this.type=type
        let index=0
        switch(this.type){
            case 0:
                this.reality=this.type
                let list=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][4].length>0?4:
                    this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][3].length>0?3:this.type
                index=floor(random(0,this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][list].length))
                this.combat=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][list][index]
                this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][list].splice(index,1)
            break
            case 1: case 2:
                this.reality=this.type
                index=floor(random(0,this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.type].length))
                this.combat=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.type][index]
                this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.type].splice(index,1)
            break
            case 5:
                index=floor(random(0,this.battle.nodeManager.unknownPossibilities.length))
                this.reality=this.battle.nodeManager.unknownPossibilities[index]
                this.battle.nodeManager.unknownPossibilities.splice(index,1)
                switch(this.reality){
                    case 0:
                        let list=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][4].length>0?4:
                            this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][3].length>0?3:this.reality
                        index=floor(random(0,this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][list].length))
                        this.combat=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][list][index]
                        this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][list].splice(index,1)
                    break
                    case 1: case 2:
                        index=floor(random(0,this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.reality].length))
                        this.combat=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.reality][index]
                        this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.reality].splice(index,1)
                    break
                }
            break
            case 6:
                if(this.battle.nodeManager.world==1&&game.ascend>=23){
                    this.reality=1
                    index=floor(random(0,this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.reality].length))
                    this.combat=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.reality][index]
                    this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][this.reality].splice(index,1)
                }else{
                    this.reality=this.type
                    this.combat=0
                }
            break
            default:
                this.reality=this.type
                this.combat=0
            break
        }
        this.base()
    }
    save(){
        let composite={
            position:this.position,
            tilePosition:this.tilePosition,
            type:this.type,
            reality:this.reality,
            combat:this.combat,
            connections:this.connections,
            extraConnections:this.extraConnections,
            complete:this.complete,
        }
        return composite
    }
    base(){
        this.base={position:{x:this.position.x,y:this.position.y}}

        this.connections=[]
        this.extraConnections=[]

        this.size=1
        this.fade=1
        this.scroll=0
        this.complete=false
        this.active=false

        this.anim={complete:0,active:0,past:0,description:0}
    }
    establish(x,y,tileX,tileY,type,reality,combat,connections,extraConnections,complete){
        this.position={x:x,y:y}
        this.tilePosition={x:tileX,y:tileY}
        this.type=type
        this.reality=reality
        this.combat=combat
        this.connections=connections
        this.extraConnections=extraConnections
        this.complete=complete
    }
    display(type=this.type){
        let color=mergeColor(
            mergeColor(
            mergeColor(
            mergeColor(
                [110,115,120],[50,255,50],this.anim.complete),
                [210,195,180],this.anim.active),
                [125,200,225],this.anim.active*this.anim.past),
                [100,255,200],this.anim.complete*this.anim.active*this.anim.past)
        let cap=max(this.anim.complete,this.anim.active,this.anim.description)
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.scale(this.size)
        if(this.battle.modded(93)){
            this.layer.stroke(...color,this.fade)
            this.layer.strokeWeight(3)
            this.layer.noFill()
            this.layer.arc(0,-6,16,16,-180,90)
            this.layer.line(0,2,0,7)
            this.layer.strokeWeight(5)
            this.layer.point(0,14)
            this.layer.noStroke()
            this.layer.fill(70,75,80,this.fade*cap)
            this.layer.rect(0,24,48,14,3)
            this.layer.fill(...color,this.fade*cap)
            this.layer.textSize(12)
            this.layer.text('Unknown',0,25)
        }else{
            let readable=(this.complete||this.active)&&!this.battle.modded(196)
            switch(type){
                case 0:
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    this.layer.ellipse(0,0,30,30)
                    this.layer.strokeWeight(6)
                    this.layer.point(-6,0)
                    this.layer.point(6,0)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade*cap)
                    if(readable&&types.encounter[this.combat].name.length>15){
                        this.layer.rect(0,24.5,readable?types.encounter[this.combat].name.length*4.05+13.5:30.5,15,3)
                        this.layer.fill(...color,this.fade*cap)
                        this.layer.textSize(9)
                        this.layer.text(readable?types.encounter[this.combat].name:'Battle',0,25)
                    }else{
                        this.layer.rect(0,24.5,readable?types.encounter[this.combat].name.length*5.4+18:42,16,3)
                        this.layer.fill(...color,this.fade*cap)
                        this.layer.textSize(12)
                        this.layer.text(readable?types.encounter[this.combat].name:'Battle',0,25)
                    }
                break
                case 1:
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    this.layer.ellipse(0,0,30,30)
                    this.layer.strokeWeight(6)
                    this.layer.point(-6,0)
                    this.layer.point(6,0)
                    this.layer.strokeWeight(2)
                    this.layer.line(-3,-3,-8,-5)
                    this.layer.line(3,-3,8,-5)
                    this.layer.triangle(-13,-7,-7,-13,-16,-16)
                    this.layer.triangle(13,-7,7,-13,16,-16)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade*cap)
                    if(readable&&types.encounter[this.combat].name.length>15){
                        this.layer.rect(0,24.5,readable?types.encounter[this.combat].name.length*4.05+13.5:30.5,15,3)
                        this.layer.fill(...color,this.fade*cap)
                        this.layer.textSize(9)
                        this.layer.text(readable?types.encounter[this.combat].name:'Elite',0,25)
                    }else{
                        this.layer.rect(0,24.5,readable?types.encounter[this.combat].name.length*5.4+18:35,16,3)
                        this.layer.fill(...color,this.fade*cap)
                        this.layer.textSize(12)
                        this.layer.text(readable?types.encounter[this.combat].name:'Elite',0,25)
                    }
                break
                case 2:
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade)
                    this.layer.ellipse(0,0,90,90)
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    this.layer.ellipse(0,0,70,70)
                    this.layer.ellipse(0,0,50,50)
                    for(let a=0,la=12;a<la;a++){
                        this.layer.line(lsin(360*a/la)*25,lcos(360*a/la)*25,lsin(360*(a-0.5)/la)*35,lcos(360*(a-0.5)/la)*35)
                        this.layer.line(lsin(360*a/la)*25,lcos(360*a/la)*25,lsin(360*(a+0.5)/la)*35,lcos(360*(a+0.5)/la)*35)
                        this.layer.line(lsin(360*(a-0.5)/la)*35,lcos(360*(a-0.5)/la)*35,lsin(360*(a-0.5)/la)*40,lcos(360*(a-0.5)/la)*40)
                    }
                    this.layer.ellipse(0,0,30,30)
                    this.layer.strokeWeight(6)
                    this.layer.point(-6,0)
                    this.layer.point(6,0)
                    this.layer.strokeWeight(2)
                    this.layer.line(-3,-3,-8,-5)
                    this.layer.line(3,-3,8,-5)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade)
                    this.layer.rect(0,52,36,20,3)
                    this.layer.fill(...color,this.fade)
                    this.layer.textSize(15)
                    this.layer.text(types.encounter[this.combat].name,0,52)
                break
                case 3:
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    this.layer.line(-10,7,10,17)
                    this.layer.line(10,7,-10,17)
                    this.layer.line(14,12,-14,12)
                    this.layer.arc(0,-2,16,16,-24,204)
                    this.layer.line(-lcos(24)*8,-2-lsin(24)*8,0,lcos(24)/lsin(24)*-8-2)
                    this.layer.line(lcos(24)*8,-2-lsin(24)*8,0,lcos(24)/lsin(24)*-8-2)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade*cap)
                    this.layer.rect(0,24,28,14,3)
                    this.layer.fill(...color,this.fade*cap)
                    this.layer.textSize(12)
                    this.layer.text('Rest',0,25)
                break
                case 4:
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    this.layer.rect(0,0,40,24,2)
                    this.layer.strokeWeight(2)
                    this.layer.line(0,-8,0,8)
                    this.layer.arc(0,-3,8,6,90,270)
                    this.layer.arc(0,3,8,6,-90,90)
                    this.layer.line(0,-6,3.5,-6)
                    this.layer.line(0,6,-3.5,6)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade*cap)
                    this.layer.rect(0,24,28,14,3)
                    this.layer.fill(...color,this.fade*cap)
                    this.layer.textSize(12)
                    this.layer.text('Shop',0,25)
                break
                case 5:
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    this.layer.arc(0,-6,16,16,-180,90)
                    this.layer.line(0,2,0,7)
                    this.layer.strokeWeight(5)
                    this.layer.point(0,14)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade*cap)
                    this.layer.rect(0,24,48,14,3)
                    if(this.battle.relicManager.hasRelic(98,-1)){
                        let term=this.reality>=0&&this.reality<=2?types.encounter[this.combat].name:['','','','Rest','Shop','Event'][this.reality]
                        if(readable&&term.length>15){
                            this.layer.rect(0,24.5,readable?term.length*4.05+13.5:30.5,15,3)
                            this.layer.fill(...color,this.fade*cap)
                            this.layer.textSize(9)
                            this.layer.text(readable?term:'Unknown',0,25)
                        }else{
                            let term=this.reality>=0&&this.reality<=2?types.encounter[this.combat].name:['','','','Rest','Shop','Event'][this.reality]
                            this.layer.rect(0,24.5,readable?term.length*5.4+18:42,16,3)
                            this.layer.fill(...color,this.fade*cap)
                            this.layer.textSize(12)
                            this.layer.text(readable?term:'Unknown',0,25)
                        }
                    }else{
                        this.layer.fill(...color,this.fade*cap)
                        this.layer.textSize(12)
                        this.layer.text('Unknown',0,25)
                    }
                break
                case 6:
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    this.layer.rect(0,-7,32,12)
                    this.layer.rect(0,7,28,16)
                    this.layer.rect(0,-4,6,4)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade*cap)
                    this.layer.rect(0,24,36,14,3)
                    this.layer.fill(...color,this.fade*cap)
                    this.layer.textSize(12)
                    this.layer.text('Stash',0,25)
                break
                case 7:
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    this.layer.ellipse(0,0,30,30)
                    this.layer.strokeWeight(1.5)
                    this.layer.arc(0,0,21,21,-195,-150)
                    this.layer.arc(0,0,21,21,-215,-210)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade*cap)
                    this.layer.rect(0,24,36,14,3)
                    this.layer.fill(...color,this.fade*cap)
                    this.layer.textSize(12)
                    this.layer.text('Fortune',0,25)
                break
                case 8:
                    this.layer.stroke(...color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    regPoly(this.layer,0,0,8,16,16,22.5)
                    this.layer.strokeWeight(1.5)
                    this.layer.line(-6,-6,6,6)
                    this.layer.line(-6,6,6,-6)
                    this.layer.noStroke()
                    this.layer.fill(70,75,80,this.fade*cap)
                    this.layer.rect(0,24,36,14,3)
                    this.layer.fill(...color,this.fade*cap)
                    this.layer.textSize(12)
                    this.layer.text('Not Visible',0,25)
                break
            }
        }
        this.layer.pop()
    }
    displayConnections(){
        this.layer.stroke(255,this.fade*0.1)
        this.layer.strokeWeight(3)
        for(let a=0,la=this.connections.length;a<la;a++){
            for(let b=0;b<10;b++){
                this.layer.line(
                    this.position.x*(0.7-b*0.01)+this.battle.nodeManager.nodes[this.connections[a]].position.x*(0.3+b*0.01),this.position.y*(0.7-b*0.01)+this.battle.nodeManager.nodes[this.connections[a]].position.y*(0.3+b*0.01),
                    this.position.x*(0.3+b*0.01)+this.battle.nodeManager.nodes[this.connections[a]].position.x*(0.7-b*0.01),this.position.y*(0.3+b*0.01)+this.battle.nodeManager.nodes[this.connections[a]].position.y*(0.7-b*0.01))
            }
        }
        if(this.battle.relicManager.hasRelic(341,-1)){
            this.layer.stroke(125,200,225,this.fade*0.1)
            for(let a=0,la=this.extraConnections.length;a<la;a++){
                for(let b=0;b<10;b++){
                    this.layer.line(
                        this.position.x*(0.7-b*0.01)+this.battle.nodeManager.nodes[this.extraConnections[a]].position.x*(0.3+b*0.01),this.position.y*(0.7-b*0.01)+this.battle.nodeManager.nodes[this.extraConnections[a]].position.y*(0.3+b*0.01),
                        this.position.x*(0.3+b*0.01)+this.battle.nodeManager.nodes[this.extraConnections[a]].position.x*(0.7-b*0.01),this.position.y*(0.3+b*0.01)+this.battle.nodeManager.nodes[this.extraConnections[a]].position.y*(0.7-b*0.01))
                }
            }
        }
    }
    getConnections(){
        return this.battle.relicManager.hasRelic(341,-1)?this.connections.concat(this.extraConnections):this.connections
    }
    update(active,past){
        this.size=smoothAnim(this.size,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<25,1,1.5,5)
        this.active=active
        this.anim.complete=smoothAnim(this.anim.complete,this.complete,0,1,5)
        this.anim.active=smoothAnim(this.anim.active,active,0,1,5)
        this.anim.past=smoothAnim(this.anim.past,past,0,1,5)
        this.anim.description=smoothAnim(this.anim.description,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<25,0,1,5)
        if(this.scroll>0){
            this.scroll-=5
            this.position.y-=5
        }else if(this.scroll<=-5){
            this.scroll+=5
            this.position.y+=5
        }
    }
}