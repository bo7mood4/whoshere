

$(function(){
    c=document.getElementById("canvas");
    c.width = $(window).width();
    c.height = $(window).height();
    asteroids = [];
    for (var i = 0; i < 7; i++){
        asteroids.push(
            new Asteroid(
                new Point(
                    Math.floor(Math.random()*c.width),
                    Math.floor(Math.random()*c.height)),
                Math.random()*1.5+.5,
                new Point(
                    Math.random() * 2 * (Math.random() > .5 ? 1.0 : -1.0),
                    Math.random() * 2 * (Math.random() > .5 ? 1.0 : -1.0)
                )
            )
        )
    }
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
    
    for (var i = 0; i < asteroids.length; i++){
        asteroids[i].Move();
        checkForOB(asteroids[i]);
        for (var j = i + 1; j < asteroids.length; j++){
            if (asteroids[i].Collide(asteroids[j])){
                console.log("tink");
                console.log(asteroids[i].velocity);
                asteroids[i].Bounce(asteroids[j]);
            }
        }
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
