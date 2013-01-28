

$(function(){
    asteroids = [new Asteroid(new Point(30,30),1,new Point(1,1))];
    c=document.getElementById("canvas");
    c.width = 300;
    c.height = 300;
    ctx=c.getContext("2d");
    ctx.fillStyle="#FFFFFF";
    update();
});

function getBounds(){//static for now
    //console.log(c.width);
    //console.log(c.height);
}

function update(){
    //console.log(asteroids);
    ctx.clearRect(0,0,c.width,c.height);
    for(var i = 0; i < asteroids.length; i++){
        asteroids[i].Move();
        checkForOB(asteroids[i]);
        asteroids[i].Draw(ctx);
    }
    if (window.webkitRequestAnimationFrame)window.webkitRequestAnimationFrame(update);
    else if (window.moxRequestAnimationFrame)window.mozRequestAnimationFrame(update);
    else alert ("unsupported browser");
}


function checkForOB(Asteroid){
    if (Asteroid.center.x > c.width)Asteroid.center.x = 0;
    if (Asteroid.center.y > c.height)Asteroid.center.y = 0;
    
    if (Asteroid.center.x < 0)Asteroid.center.x = c.width;
    if (Asteroid.center.y < 0)Asteroid.center.y = c.height;
}
