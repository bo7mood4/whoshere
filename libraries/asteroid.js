SCALE_ASTEROID_SIZE = 27;

function Asteroid(center,scalar,velocity) {
    this.center = center;
    this.previousPosition = center;
    this.scale = scalar;
    this.radius = SCALE_ASTEROID_SIZE*scalar;
    this.velocity = velocity;
    this.points = [
                new Point(0,9).scale(scalar),
                new Point(-16,29).scale(scalar),
                new Point(-30,9).scale(scalar),
                new Point(-16,2).scale(scalar),
                new Point(-30,-4).scale(scalar),
                new Point(-9,-24).scale(scalar),
                new Point(13,-24).scale(scalar),
                new Point(29,-4).scale(scalar),
                new Point(29,9).scale(scalar),
                new Point(13,29).scale(scalar),
                new Point(0,29).scale(scalar),
                new Point(0,9).scale(scalar)
            ];
}

Asteroid.prototype.Draw = function(ctx,debug){
    ctx.beginPath();
    ctx.moveTo(this.center.x + this.points[0].x,this.center.y + this.points[0].y)
    for (var i = 1; i < this.points.length; i++){
        ctx.lineTo(this.center.x + this.points[i].x,this.center.y + this.points[i].y);
    }//bledaow
    if (debug){
        ctx.moveTo(this.center.x,this.center.y);
        ctx.lineTo(this.velocity.x*10 + this.center.x,this.velocity.y*10 + this.center.y);
    }
    ctx.stroke();
};

Asteroid.prototype.Collide = function(other){
    if (this.center.distance(other.center) < (this.radius + other.radius)) return true;
    return false;
};

Asteroid.prototype.Bounce = function(other){
    this.velocity = new Point(
                        (this.velocity.x * (this.scale - other.scale) + 2 * other.scale * other.velocity.x) / (this.scale + other.scale),
                        (this.velocity.y * (this.scale - other.scale) + 2 * other.scale * other.velocity.y) / (this.scale + other.scale)
                    );
    
    other.velocity = new Point(
                        (other.velocity.x * (other.scale - this.scale) + 2 * this.scale * this.velocity.x) / (other.scale + this.scale),
                        (other.velocity.y * (other.scale - this.scale) + 2 * this.scale * this.velocity.y) / (other.scale + this.scale)
                    );
    this.center = this.previousPosition;
    other.center = other.previousPosition;
}

Asteroid.prototype.Move = function(vector){
    this.previousPosition = this.center.clone();
    this.center.add(vector||this.velocity)
};

Asteroid.prototype.Destroy = function(){
    if (scale > .5) return [
                        new Asteroid(
                            this.center.add(
                                new Point(
                                    SCALE_ASTEROID_SIZE*.75,
                                    SCALE_ASTEROID_SIZE*.75
                                )
                            ),
                            this.scale/2,
                            this.velocity
                        ),
                    ];
                    
    else return [];
}
