function PoliceCar(x, y, style ) {
	this.position = new Vec2(x,y);
	this.size = new Vec2(64, 123 );
	this.engine = new Engine( 0, 0.025, 25 );
	this.appearance = style;
	this.lane = x / this.size.x;
	this.targetPosition;


	this.skid = function() {
	    if ( Math.random() > 0.5 ) {
		this.moveLeft();
	    } else {
		this.moveRight();
	    }
	}

	this.movingLeft = function() {

	    this.position.x-=this.engine.speed;

	    if ( this.position.x <= this.targetPosition ) {
		this.currentAction = this.justRunning;
		this.position.x = this.targetPosition;
	    }
	}

	this.movingRight = function() {
	    this.position.x+=this.engine.speed;

	    if ( this.position.x >= this.targetPosition ) {
		this.currentAction = this.justRunning;
		this.position.x = this.targetPosition;
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
	    if ( this.lane > 0 && this.currentAction == this.justRunning ) {
		this.lane--;
		this.currentAction = this.movingLeft;
		this.targetPosition = this.lane * this.size.x;
	    }
	}

	this.moveRight = function() {
	    if ( this.lane < 3 && this.currentAction == this.justRunning ) {
		this.lane++;
		this.currentAction = this.movingRight;
		this.targetPosition = this.lane * this.size.x;
	    }
	}
}
