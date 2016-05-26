function SlowCar(x, y, accel,style ) {
	this.position = new Vec2(x, y);
	this.size = new Vec2( 20, 40 );
	this.engine = new Engine(1, accel);
	this.appearance = style;
	this.lane = x / this.size.x;

	this.update = function() {
	    this.position.x = this.lane * this.size.x;
		this.engine.update( this.position );
	}

	this.stop = function() {
	    this.engine.stop();
	}
}
