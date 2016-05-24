function SlowCar(x, y, style ) {
	this.position = new Vec2(x, y);
	this.engine = new Engine(1, 0);
	this.appearance = style;

	this.update = function() {
		this.engine.update( this.position );
	}
}
