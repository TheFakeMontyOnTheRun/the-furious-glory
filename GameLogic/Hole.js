function Hole(x, y,style ) {
	this.position = new Vec2(x, y);
	this.size = new Vec2( 64, 128 );
	this.appearance = style;
	this.lane = x / this.size.x;
	this.hitPenalty = 1000;

	this.update = function() {
	    this.position.x = this.lane * this.size.x;
	}

	this.stop = function() {
	}
}
