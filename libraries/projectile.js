function Projectile(center,speed,angle){//might have to make something completely new :/
    this.center = center;
    this.length = length;
    this.angle = angle;
    this.life = 100;
    this.length = 10;
    this.speed = speed;
}

Projectile.prototype.Collide = function(asteroid) {
    if (this.center.distance(asteroid.center) < asteroid.radius)return true;
    return false;
}
Projectile.prototype.Draw = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.center.x,this.center.y);
    ctx.lineTo(this.center.x + Math.cos(this.angle)*this.length, this.center.y + Math.sin(this.angle)*this.length);
    ctx.stroke();
}

Projectile.prototype.Move = function(){
    this.center = new Point(this.center.x + Math.cos(this.angle)*this.speed, this.center.y + Math.sin(this.angle)*this.speed);
}

Projectile.prototype.Update = function(){
    this.life--;
}
            
