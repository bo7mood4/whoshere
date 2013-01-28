SCALE_ASTEROID_SIZE = 27;

function Asteroid(center,scalar,velocity) {
    Obj.call(this,center,scalar,SCALE_ASTEROID_SIZE*scalar,[
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
            ]);
    this.previousPosition = center;
    this.velocity = velocity;
}

Asteroid.prototype = Object.create(Obj.prototype, {
        Bounce : {
            value : function(other){
                var temp = this.velocity;
                this.velocity = other.velocity;
                other.velocity = temp;
            },
            enumerable: true,
            configurable: true, 
            writable: true
        },
    
        Move : {
            value : function(vector){
                this.previousPosition = this.center.clone();
                this.center.add(vector||this.velocity)
            },
            enumerable: true,
            configurable: true, 
            writable: true
        },
        
        Destroy : {
            value : function(){
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
            },
            
            enumerable: true,
            configurable: true, 
            writable: true
        }
    }
);



Asteroid.prototype.BounceNew = function(other){
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




