const canvas = document.querySelector("#stars");
//gives access to all "2d" drawing functions
const ctx = canvas.getContext("2d")

var screen, starArray;
//controls properties of the operation
var params = {speed: 10, count:400, life: 5};

setupStars();
update();

window.onresize = function(){
    setupStars();
}

function Star(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.width;

    this.move = function(){
        this.z -= params.speed;

        if(this.z <= 0){
            this.z = canvas.width;
        }
    }

    this.show = function(){
        let x,y,radius,opacity;

        radius = canvas.width / this.z;

        x = (this.x - screen.c[0]) * radius;
        x = x+ screen.c[0];    
        y = (this.y - screen.c[1]) * radius;
        y = y+ screen.c[1];

        opacity = radius > params.life ? (2-radius/params.life) * 1.5:1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255," + opacity + ")";
        ctx.arc(x,y,radius,0, Math.PI*2);
        ctx.fill();    
    }
};

function setupStars(){
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
        
    }
    window.cancelAnimationFrame(update);

    canvas.width = screen.w;
    canvas.height = screen.h;

    starArray = [];

    for(var i = 0; i < params.count; i++){
        starArray[i] = new Star;
    }


};

function update(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height)

    starArray.forEach(function(s){
        s.show();
        s.move();
    })

    window.requestAnimationFrame(update);
}