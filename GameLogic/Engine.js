function Engine(initialSpeed, initialAcceleration, maxSpeed) {
    this.maxSpeed = maxSpeed;
	this.speed = initialSpeed;
	this.acceleration = initialAcceleration;

	this.update = function(position) {
		this.speed += this.acceleration;
		position.y += this.speed;
		if ( this.speed > this.maxSpeed ) {
		    this.speed = this.maxSpeed;
		}
	} 

	this.stop = function() {
	    this.speed = 0;
	    this.acceleration = 0;
	}
}
