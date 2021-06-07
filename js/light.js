class Particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = Math.random() + 0.5;
        this.speed = Math.random() * 3 + 0.5;
    }

    draw(){
        cm.context.beginPath();
        cm.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        cm.context.fill();
    }
}

class Line {
    constructor(index, x,y){
        this.x = x;
        this.y = y;
        this.h = 300;

        const gradientStartY = cm.canvasHeight - (this.h + (cm.canvasHeight - this.y));
        this.gradient = cm.context.createLinearGradient(
            0, gradientStartY,
            0, this.y,
        );
        this.gradient.addColorStop(0, `rgba(${cm.colors2[index]},0)`);
        this.gradient.addColorStop(0.5, `rgba(${cm.colors2[index]},0.5)`);
        this.gradient.addColorStop(1, `rgba(${cm.colors2[index]},0.8)`);


        const numberOfParticles = 30;
        this.particles = [];
        for(let i =0; i< numberOfParticles; i++){
            this.particles.push(
                new Particle(this.x, this.y)
            );

        }
    }

    draw() {
        cm.context.fillStyle = this.gradient;
        cm.context.strokeStyle = this.gradient;
        
        cm.context.beginPath();
        cm.context.moveTo(this.x, this.y);
        cm.context.lineTo(this.x, this.y - this.h);
        cm.context.stroke();

        let particle;
        for (let i=0; i<this.particles.length; i++){
            particle = this.particles[i];
            particle.y -= particle.speed;
            if(particle.y < this.y - this.h){
                particle.y = this.y;
            }
            particle.draw();
        }
    }
}

class Light {

    constructor(index, x,y){
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 300;
        this.angle = 0;

        const numberOfLines = 5;
        this.lines = [];
        for(let i =0; i<numberOfLines; i++){
            this.lines.push(
                new Line(
                    index,
                    this.x + (Math.random() * this.w - this.w *0.5),
                    this.y
                )
            );
        }

        this.gradient = cm.context.createLinearGradient(
            0, cm.canvasHeight - (this.h + (cm.canvasHeight - this.y)),
            0, this.y
        );
        this.gradient.addColorStop(0, `rgba(${cm.colors[index]},0)`);
        this.gradient.addColorStop(0, `rgba(${cm.colors[index]},0.5)`);
        this.gradient.addColorStop(0, `rgba(${cm.colors[index]},0.5)`);
        this.gradient.addColorStop(0, `rgba(${cm.colors[index]},1)`);

        
    }
    draw(){

        cm.context.fillStyle = this.gradient;

        cm.context.save();
        cm.context.filter = 'blur(20px)';
        cm.context.beginPath()
        cm.context.ellipse(
            this.x,
            this.y,
            this.w*2,
            this.w*0.5,
            0, 0, Math.PI*2
        );
        cm.context.fill();
        
        cm.context.filter = 'blur(5px);';
        cm.context.ellipse(
            this.x,
            this.y,
            this.w*2,
            this.w*0.5,
            0, 0, Math.PI*2
        );
        cm.context.fill();

        cm.context.fillRect(
            this.x - this.w*0.5,
            cm.canvasHeight - (this.h + (cm.canvasHeight - this.y)),
            this.w,
            this.h,
        )


        cm.context.restore();

        let line;
        for(let i=0;i<this.lines.length;i++){
            line = this.lines[i];
            line.draw();
        }
    }

}