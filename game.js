var Game = {};

Game.fps = 30;

Game.initialize = function() {

	this.entities = [
			new PoliceCar(20, 120, '#F00' ),
			new SlowCar( 10, 140, '#0F0' ),
			new SlowCar( 40, 140, '#00F' )
		];

	this.context = document.getElementById("canvas").getContext("2d");

	this.currentRoadSegment = 250;
};


Game.draw = function() {
	this.context.clearRect(0, 0, 800, 600);

	for ( id in this.entities ) {
		this.context.fillStyle = this.entities[ id ].appearance;
		this.context.fillRect(this.entities[id].position.x, this.currentRoadSegment - this.entities[id].position.y, 20, 20)	;	
	}
};


Game.update = function() {
	this.currentRoadSegment += this.entities[ 0 ].engine.speed - this.entities[ 0 ].engine.acceleration;

	for ( id in this.entities ) {
		this.entities[id].update();
	}

};


Game.onLeft = function() {
	this.entities[ 0 ].position.x--;
}

Game.onRight = function() {
	this.entities[ 0 ].position.x++;
}
