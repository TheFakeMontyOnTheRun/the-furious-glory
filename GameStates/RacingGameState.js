var score = 0;

function RacingGameState() {
    this.init = function() {
	this.entities = [
			 new PoliceCar(20, 120, '#F00' ),
			 new SlowCar( 0, 440, '#0F0' ),
			 new SlowCar( 40, 440, '#00F' )
			 ];
	
	this.currentRoadSegment = 250;
    };

    this.draw = function( context ) {

	var car;

	for ( id in this.entities ) {
	    car = this.entities[ id ];
	    context.fillStyle = car.appearance;
	    context.fillRect(car.position.x, this.currentRoadSegment - car.position.y, car.size.x, car.size.y);	
	}


	context.fillStyle = "#000";
	context.fillText( "Distance: " + this.currentRoadSegment, 10, 50 );
    };
    
    this.update = function() {
	this.currentRoadSegment += this.entities[ 0 ].engine.speed - this.entities[ 0 ].engine.acceleration;
	
	for ( id in this.entities ) {
	    this.entities[id].update();
	}
	
	//O(nlogn)
	for ( var c = 0; c < this.entities.length - 1; ++c ) {
	    for ( var d = c + 1; d < this.entities.length; ++d ) {
		if ( this.checkCollision( this.entities[ c ], this.entities[ d ] ) ) {
		    this.entities[ d ].engine.speed = 0;
		    this.entities[ d ].engine.acceleration = 0;
		    this.entities[ c ].engine.speed = 0;
		    this.entities[ c ].engine.acceleration = 0;		    
		
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
	this.entities[ 0 ].position.x-=20;
    };
    
    this.onRight = function() {
	this.entities[ 0 ].position.x+=20;
    };
};