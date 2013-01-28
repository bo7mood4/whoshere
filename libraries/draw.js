asteroid = [];

asteroids  = [{x:30,y:30,dx:1,dy:1}];
console.log("initiate draw");

$(function(){
    c=document.getElementById("canvas");
    c.width = 300;
    c.height = 300;
    ctx=c.getContext("2d");
    ctx.fillStyle="#FFFFFF";
    update();
});

function getBounds(){
    console.log(c.width);
    console.log(c.height);
}

function drawFrame(){
    ctx.fillStyle="#FFF";
    ctx.fillRect(0,0,c.width,c.height);
    for(var i = 0; i < asteroids.length; i++){
        ctx.arc(asteroids[i].x,asteroids[i].y,5,0,2*Math.PI);
        ctx.stroke();
    }
}

function update(){
    console.log(asteroids);
    for(var i = 0; i < asteroids.length; i++){
        asteroids[i].x += asteroids[i].dx;
        asteroids[i].y += asteroids[i].dy;
    }
    checkForCollisions();
    getBounds();
    checkForOB();
    drawFrame();
    setTimeout(update,33);
}

function checkForCollisions(){
    
}

function checkForOB(){
    for(var i = 0; i < asteroids.length; i++){
        if (asteroids[i].x > c.width)asteroids[i].x = 0;
        if (asteroids[i].x < 0)asteroids[i].x = c.width;
        
        if (asteroids[i].y > c.height)asteroids[i].y = 0;
        if (asteroids[i].y < 0)asteroids[i].y = c.height;
    }
}
