function Oil(x, y, style ) {
	this.position = new Vec2(x, y);
	this.size = new Vec2( 64, 123 );
	this.appearance = style;
	this.lane = x / this.size.x;

	this.update = function() {
	    this.position.x = this.lane * this.size.x;
	}

	this.stop = function() {
	}
}
