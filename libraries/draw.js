$(function(){
    asteroids = [];
    projectiles = [];
    score = 0;
    ship = null;
    
    c=document.getElementById("canvas");
    c.width = $(window).width();
    c.height = $(window).height();

    ctx=c.getContext("2d");
    ctx.fillStyle="#FFFFFF";
    
    createAsteroids();
    update();
});

function createAsteroids(){
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
    }

function getBounds(){//static for now
    //console.log(c.width);
    //console.log(c.height);
}

function update(){
    //console.log(asteroids);
    ctx.clearRect(0,0,c.width,c.height);
    
    if (ship){
        if (shipleft == true)ship.Turn(-.2);
        if (shipright == true)ship.Turn(.2);
        if (shipthrust == true)ship.Thrust(.2);
        if (shipreverse == true)ship.Thrust(-.2);
        ship.Update();
        console.log(ship.invincibility);
        ship.Move();
        checkForOB(ship);
        ship.Draw(ctx);
    }
    
    for (var i = 0; i < projectiles.length; i++){
        projectiles[i].Update();
        projectiles[i].Move();
        projectiles[i].Draw(ctx);
        
        if (projectiles[i].life < 0){
            projectiles.splice(i,1);
            i--;//does this work
            continue;//projectile died so no need to check collision
        }
        
        for (var j = 0; j < asteroids.length; j++){
            if (projectiles[i].Collide(asteroids[j])){
                score += 1;
                $("#message").html("score: "+score);
                newasteroids = asteroids[j].Destroy();
                asteroids.splice(j,1);
                asteroids = asteroids.concat(newasteroids);
                projectiles.splice(i,1);
                i--;
                break;//can only collide with one asteroid
            }
        }
    }
    
    for (var i = 0; i < asteroids.length; i++){
        asteroids[i].Move();
        checkForOB(asteroids[i]);
        for (var j = i + 1; j < asteroids.length; j++){
            if (asteroids[i].Collide(asteroids[j])){
                //console.log("tink");
                //console.log(asteroids[i].velocity);
                asteroids[i].Bounce(asteroids[j]);
            }
        }
        asteroids[i].Draw(ctx);
        
        if (ship&&ship.invincibility <= 0){
            
            if (asteroids[i].Collide(ship)){
                $("#message").html("game over! your score is " + score);
                score = 0;
                projectiles = [];
                asteroids = [];
                ship = null;
            }
        }
    }
    
    if (window.webkitRequestAnimationFrame)window.webkitRequestAnimationFrame(update);
    else if (window.mozRequestAnimationFrame)window.mozRequestAnimationFrame(update);
    else alert ("unsupported browser");
}


function checkForOB(Asteroid){
    if (Asteroid.center.x > c.width)Asteroid.center.x = 0;
    if (Asteroid.center.y > c.height)Asteroid.center.y = 0;
    
    if (Asteroid.center.x < 0)Asteroid.center.x = c.width;
    if (Asteroid.center.y < 0)Asteroid.center.y = c.height;
}

function initShip(){
    if (!asteroids.length)createAsteroids();
    console.log('called');
    shipleft = false;
    shipright = false;
    shipthrust = false;
    shipreverse = false;
    ship = new Ship(new Point(c.width/2,c.height/2),1,120);
    
       $(document).keydown(function(event){
        console.log(event.which);
        if (event.which == 37){
            shipleft = true;
        }
        if (event.which == 39){
            shipright = true;
        }
        if (event.which == 38){
            shipthrust = true;
        }
        if (event.which == 40){
            shipreverse = true;
        }
        if (event.which == 32){
            if(ship && projectiles.length < 3)projectiles.push(new Projectile(ship.center.clone(),ship.velocity.magnitude() + 5,ship.facing));
        }
    });
    
    $(document).keyup(function(event){
        console.log(event.which);
        if (event.which == 37){
            shipleft = false;
        }
        if (event.which == 39){
            shipright = false;
        }
        if (event.which == 38){
            shipthrust = false;
        }
        if (event.which == 40){
            shipreverse = false;
        }
    });
}
