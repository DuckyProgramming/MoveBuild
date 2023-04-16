class particleManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        
        this.particles=[]
    }
    clear(){
        this.particles=[]
    }
    createDamageNumber(x,y,value){
        this.particles.push(new particle(this.layer,x,y,0,[value]))
    }
    display(){
        this.particles.forEach(particle=>particle.display())
    }
    update(){
        for(let a=0,la=this.particles.length;a<la;a++){
            this.particles[a].update()
            if(this.particles[a].remove){
                delete this.particles[0]
                this.particles.splice(a,1)
                a--
                la--
            }
        }
    }
}