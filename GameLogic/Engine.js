function Engine(initialSpeed, initialAcceleration) {

	this.speed = initialSpeed;
	this.acceleration = initialAcceleration;

	this.update = function(position) {
		this.speed += this.acceleration;
		position.y += this.speed;

		if ( this.acceleration > 0 ) {
			this.acceleration--;
		}
	} 
}
