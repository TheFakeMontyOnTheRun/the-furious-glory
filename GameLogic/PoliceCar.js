function PoliceCar(x, y, style ) {
	this.position = new Vec2(x,y);
	this.size = new Vec2(20, 50 );
	this.engine = new Engine( 4, 1 );
	this.appearance = style;

	this.targetPosition;

	this.movingLeft = function() {

	    this.position.x--;

	    if ( this.position.x <= this.targetPosition ) {
		this.currentAction = this.justRunning;
	    }
	}

	this.movingRight = function() {
	    this.position.x++;

	    if ( this.position.x >= this.targetPosition ) {
		this.currentAction = this.justRunning;
	    }
	}

	this.justRunning = function() {
	}

	this.currentAction = this.justRunning;

	this.update = function() {
		this.engine.update( this.position );
	
		this.currentAction();
	}

	this.stop = function() {
	    this.engine.stop();
	}

	this.moveLeft = function() {
	    this.currentAction = this.movingLeft;
	    this.targetPosition = ( Math.floor( this.position.x / this.size.x ) - 1 ) * this.size.x;
	}

	this.moveRight = function() {
	    this.currentAction = this.movingRight;
	    this.targetPosition = ( Math.floor( this.position.x / this.size.x ) + 1 ) * this.size.x;
	}
}
