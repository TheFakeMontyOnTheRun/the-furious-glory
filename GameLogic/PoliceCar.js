function PoliceCar(x, y, style ) {
	this.position = new Vec2(x,y);
	this.size = new Vec2(20, 50 );
	this.engine = new Engine( 4, 1 );
	this.appearance = style;

	this.update = function() {
		this.engine.update( this.position );
	}

	this.stop = function() {
	    this.engine.stop();
	}
}
