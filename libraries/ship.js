function Ship(center,scalar,invincibility){
    Obj.call(this,center,scalar,12*scalar,[
        new Point(-12,-6).scale(scalar),
        new Point(12,0).scale(scalar),
        new Point(-12,6).scale(scalar),
        new Point(-6,0).scale(scalar),
        new Point(-12,-6).scale(scalar)
    ]);
    this.invincibility = invincibility;
    this.facing = 0;
    this.velocity = new Point(0,0);
}

Ship.prototype = Object.create(Obj.prototype, {
    Turn : {
        value : function(deg){
            this.facing+=deg;
        },
        enumerable: true,
        configurable: true, 
        writable: true
    },
    Draw : {
        value : function(ctx){
            if (this.invincibility > 0 && this.invincibility %2 == 0) return;//blink
            var oldpoints = this.points.slice();
            this.points = [];
            for (var i = 0; i < oldpoints.length; i++){
                this.points.push(oldpoints[i].rotate(this.facing));
            }
            Obj.prototype.Draw.apply(this, [ctx]);//super
            this.points = oldpoints;
        },
        enumerable: true,
        configurable: true, 
        writable: true
    },
    Update : {
        value : function(){
            console.log("updatin");
            if (this.invincibility > 0)this.invincibility-=1;
        },
        enumerable: true,
        configurable: true, 
        writable: true
    },
    Thrust : {
        value : function(num){
            this.velocity.add(new Point(Math.cos(this.facing)*num,Math.sin(this.facing)*num));
        },
        enumerable: true,
        configurable: true, 
        writable: true
    },
    Move : {
        value : function(){
            this.center.add(this.velocity);//in this case, velocity is a Point where x is length and y is angle
        },
        enumerable: true,
        configurable: true, 
        writable: true
    }
});
            
