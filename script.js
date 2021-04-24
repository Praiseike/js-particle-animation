class Particle{

    setDirection(dir)
    {
        this.direction = dir;
    }

    constructor(x =0,y = 0){
        this.x = x;
        this.y = y;
        this.direction = [0,0];
    }
}


class System{
    
    CLEAR_COLOR = "#21214e";
    PARTICLE_COLOR = "#ffffffaa";
    LINE_COLOR = "#ffffff21";
    
    constructor(canvas)
    {
        this.speed = 5;
        this.particles = Array(60).fill(null);
        this.canvas = canvas;
        this.WIDTH = canvas.width;
        this.HEIGHT = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = this.CLEAR_COLOR;
        this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);

        for(var i = 0; i < this.particles.length; i++)
        {
            this.particles[i] = new Particle(this.randomInt(1,this.WIDTH),this.randomInt(1,this.HEIGHT));
            this.particles[i].direction = [Math.random()+1,Math.random()+1];
        }

        this.interval = setInterval(this.loop,this.speed);
    }


    setBackground(color)
    {
        this.CLEAR_COLOR = color;
    }

    setParticleColor(color)
    {
        this.PARTICLE_COLOR = color+"aa";
    }

    setLineColor(color)
    {
        this.LINE_COLOR = color+"21";
    }

    addParticles(x)
    {
        for(var i = 0 ; i < x ; i++)
        {
            let p = new Particle(this.randomInt(1,this.WIDTH),this.randomInt(1,this.HEIGHT));
            p.direction = [Math.random()+1,Math.random()+1]
            this.particles.push(p);    
        }
    }

    calc_distance = (a,b) =>
    {
        var y2 = (a.y - b.y)**2;
        var x2 = (a.x - b.x)**2;
        var dist2 = x2+y2;
        var dist = Math.sqrt(dist2);
        return dist;
    }
    
    randomArbit = (min,max) =>
    {
        return Math.random() * (max-min) +min;
    }
    
    randomInt = (min,max) =>
    {
        min = Math.ceil(min);
        max =Math.ceil(max);
        return Math.floor (Math.random() * (max - min + 1) ) + min;
    }
    
    draw_circles = () =>
    {
        for(var i = 0; i < this.particles.length; i++)
        {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.PARTICLE_COLOR;
            this.ctx.arc(this.particles[i].x,this.particles[i].y,2,0,360,false);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    clear = () =>{
        this.ctx.fillStyle = this.CLEAR_COLOR;
        this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
    }


    draw_line = (a,b) =>
    {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.LINE_COLOR;
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(a.x,a.y);
        this.ctx.lineTo(b.x,b.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    move(){
        for(var i = 0 ; i < this.particles.length; i++)
        {
            this.particles[i].x += this.particles[i].direction[0];
            this.particles[i].y += this.particles[i].direction[1];
    
            if(this.particles[i].x < 0 || this.particles[i].x >= this.WIDTH)
            {
                this.particles[i].direction[0] *= -1;
            }
    
            if(this.particles[i].y < 0 || this.particles[i].y >= this.HEIGHT)
            {
                this.particles[i].direction[1] *= -1;
            }
    
        }
    }

    check_proximity = () =>
    {
        for(var i = 0; i < this.particles.length; i++)
        {
            for(var j = 0 ; j < this.particles.length; j++)
            {
                if(this.calc_distance(this.particles[i],this.particles[j]) <= 100)
                {
                    this.draw_line(this.particles[i],this.particles[j]);
                }
            }
        }
    
    }
    
    loop = () =>{
        this.clear();
        this.draw_circles();
        this.check_proximity();
        this.move();
    }
    
}


canvas = document.querySelector('canvas');
particleSystem = new System(canvas);




let changeBackground = () =>
{
    bg = document.querySelector('.bg-color').value ;     
    particleSystem.setBackground(bg);
}

let changeParticleColor = () =>
{
    pt = document.querySelector('.pt-color').value;
    particleSystem.setParticleColor(pt);
}

let changeLineColor = () =>
{
    ln = document.querySelector('.ln-color').value;
    particleSystem.setLineColor(ln);
}

let addParticles = () =>
{
    particleSystem.addParticles(5);    
}