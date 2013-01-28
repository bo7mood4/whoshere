function Asteroid(center,scale,velocity) {
    this.center = center;
    this.radius = 24*scale;
    this.velocity = velocity;
    this.points = { 
        new Point(-12,-12),
        new Point(0,12),
        new Point(12,-12),
        new Point(-12,-12)
    };
}

Asteroid.prototype.Draw = function(ctx){
    ctx.beginPath();
    ctx.moveTo(center.x + this.points[0].x,center.y + this.points[0].y)
    for (var i = 1; i < this.points.length; i++){
        ctx.lineTo(center.x + this.points[i].x,center.y + this.points[i].y);
    }//bledaow
    ctx.stroke();
};

Asteroid.prototype.Collide = function(other){
    if (this.center.distance(other.center) < (this.radius + other.radius)) return true;
    return false;
};

Asteroid.prototype.Move = function(){
    this.center.add(this.velocity);
};
