var score = 0;

function RacingGameState() {

    this.readySound = new Audio("apert.wav");
    this.readySound.play();

    this.camera = new Vec2( 0, 200 );

    this.init = function() {
	this.entities = [
			 new PoliceCar(20, 120, '#F00' ),
			 new SlowCar( 0, 440, '#0F0' ),
			 new SlowCar( 40, 440, '#00F' )
			 ];
	
	this.currentRoadSegment = 250;
	this.timeForNextCar = 200;
    };

    this.draw = function( context ) {

	var car;
	var frame =  Math.floor( (this.currentRoadSegment / 50) % 3);

	for ( id in this.entities ) {
	    car = this.entities[ id ];
	    context.fillStyle = car.appearance;
	    context.fillRect(car.position.x, this.currentRoadSegment - car.position.y, car.size.x, car.size.y);	
	    context.drawImage( this.gameAssets.policeCar[ frame ], car.position.x, this.currentRoadSegment - car.position.y );
	}

	context.fillStyle = "#000";
	context.fillText( "Distance: " + this.currentRoadSegment, 10, 50 );
	context.fillText( "Speed: " + this.entities[ 0 ].engine.speed, 10, 60 );

    };
    
    this.update = function() {

	this.currentRoadSegment += this.entities[ 0 ].engine.speed - this.entities[ 0 ].engine.acceleration;
	this.camera.y = this.currentRoadSegment;
	this.timeForNextCar--;

	if ( this.timeForNextCar == 0 ) {
	    this.timeForNextCar = 200;

	    this.entities[ 1 ].position.y = this.currentRoadSegment;
	    this.entities[ 1 ].position.x = Math.round( Math.random() * 3 ) * this.entities[ 1 ].size.x;
	}

	for ( id in this.entities ) {
	    this.entities[id].update();
	}
	
	//O(nlogn)
	var car1;
	var car2;
	for ( var c = 0; c < this.entities.length - 1; ++c ) {
	    car1 = this.entities[ c ];
	    for ( var d = c + 1; d < this.entities.length; ++d ) {

		car2 = this.entities[ d ];

		if ( this.checkCollision( car1, car2 ) || this.checkCollision( car2, car1 ) ) {

		    car1.stop();
		    car2.stop();

		    score = this.currentRoadSegment;

		    return function( gameStateList ) {
			gameStateList.gameOver.init( score );
			return gameStateList.gameOver;
		    }
		}
	    }
	}
	
	return function( gameStateList ) {
	    return gameStateList.gamePlay;
	}
    };
    
    this.checkCollision = function( car1, car2 ) {
	
	if ( ( car1.position.x >= car2.position.x ) && ( car1.position.x < ( car2.position.x + car2.size.x ) ) ) {
	    if ( ( car1.position.y >= car2.position.y ) && ( car1.position.y < ( car2.position.y + car2.size.y ) ) ) {
		return true;
	    }
	}
	
	return false;
    };
    
    this.onLeft = function() {
	this.entities[ 0 ].moveLeft();
    };
    
    this.onRight = function() {
	this.entities[ 0 ].moveRight();
    };
};
