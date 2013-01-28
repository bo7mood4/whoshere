function Obj(center,scalar,radius,points) {
    this.center = center;
    this.scale = scalar;
    this.radius = radius;
    this.points = points;
}

Obj.prototype.Draw = function(ctx){
    ctx.beginPath();
    ctx.moveTo(this.center.x + this.points[0].x,this.center.y + this.points[0].y)
    for (var i = 1; i < this.points.length; i++){
        ctx.lineTo(this.center.x + this.points[i].x,this.center.y + this.points[i].y);
    }//bledaow
    ctx.stroke();
};

Obj.prototype.Collide = function(other){
    if (this.center.distance(other.center) < (this.radius + other.radius)) return true;
    return false;
};
