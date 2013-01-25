asteroid = [];

asteroids  = [{x:30,y:30,dx:1,dy:1}];
console.log("initiate draw");

$(function(){
    c=document.getElementById("canvas");
    ctx=c.getContext("2d");
    ctx.fillStyle="#FF0000";
    setTimeout(update,12);
});

function getBounds(){
    canvasWidth = $("#canvas").width(); 
    canvasHeight = $("#canvas").height();
}

function drawFrame(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
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
    setTimeout(update,12);
}

function checkForCollisions(){
    
}

function checkForOB(){
    for(var i = 0; i < asteroids.length; i++){
        if (asteroids[i].x > canvasWidth)asteroids[i].x = 0;
        if (asteroids[i].x < 0)asteroids[i].x = canvasWidth;
        
        if (asteroids[i].y > canvasHeight)asteroids[i].y = 0;
        if (asteroids[i].y < 0)asteroids[i].y = canvasHeight;
    }
}
