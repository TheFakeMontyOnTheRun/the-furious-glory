function SlowCar(x, y, style ) {
	this.position = new Vec2(x, y);
	this.size = new Vec2( 20, 40 );
	this.engine = new Engine(1, 0);
	this.appearance = style;

	this.update = function() {
		this.engine.update( this.position );
	}
}
