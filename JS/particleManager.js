class particleManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        
        this.particles=[]
        this.particlesBack=[]
    }
    clear(){
        this.particles=[]
        this.particlesBack=[]
    }
    createNumber(type,x,y,value){
        this.particles.push(new particle(this.layer,x,y,type,[value]))
    }
    display(scene){
        switch(scene){
            case 'back':
                this.particlesBack.forEach(particle=>particle.display())
            break
            case 'front':
                this.particles.forEach(particle=>particle.display())
            break
        }
    }
    update(){
        for(let a=0,la=this.particlesBack.length;a<la;a++){
            for(let b=0,lb=game.animRate;b<lb;b++){
                this.particlesBack[a].update()
            }
            if(this.particlesBack[a].remove){
                delete this.particlesBack[a]
                this.particlesBack.splice(a,1)
                a--
                la--
            }
        }
        for(let a=0,la=this.particles.length;a<la;a++){
            for(let b=0,lb=game.animRate;b<lb;b++){
                this.particles[a].update()
            }
            if(this.particles[a].remove){
                delete this.particles[a]
                this.particles.splice(a,1)
                a--
                la--
            }
        }
    }
}