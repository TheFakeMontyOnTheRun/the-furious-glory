var score = 0;

//this begs a refactor, but I'm not really a JS developer, so I don't really know good automatic tools.
function RacingGameState() {

    this.readySound = new Audio("apert.wav");
    this.readySound.play();

    //my kingdom for a constant
    this.numberOfLanes = 4;
    this.timeForCarSpawn = 100;

    this.penalties = 0;

    this.lanePosition = function( lane ) {
	return lane * this.gameAssets.laneWidthInWorldSpace;
    }

    this.init = function() {
	this.entities = [
			 new PoliceCar( this.lanePosition( 2 ), 120, 'blueCar' ),
			 new Oil( this.lanePosition( 2 ), 8000, 'oilSpill' ),
			 new Hole( this.lanePosition( 0 ), 5000, 'hole' ),
			 new SlowCar( this.lanePosition( 0 ), 440, 1, 'redCar' ),
			 new SlowCar( this.lanePosition( 1 ), 440,2,  'blackCar' ),
			 new SlowCar( this.lanePosition( 3 ), 440,0, 'yellowCar' )
			 ];

	this.currentRoadSegment = 250;
	this.timeForNextCar = this.timeForCarSpawn;
	this.playerCar = this.entities[ 0 ];
    };

    this.translateToScreenSpace = function( worldSpacePosition ) {
	return new Vec2( ( 800 / 2 ) - ( ( this.numberOfLanes / 2 ) * this.gameAssets.laneWidth ) + this.gameAssets.laneWidth * ( ( worldSpacePosition.x) / this.gameAssets.laneWidthInWorldSpace ), this.currentRoadSegment - worldSpacePosition.y + this.gameAssets.textureHeight);
    }

    this.draw = function( context ) {

	var car;
	var screenPosition;
	var carSprite;
	
	drawRoadWithOffset( context, this.gameAssets, this.currentRoadSegment );

	for ( var id = this.entities.length - 1; id >= 0; --id ) {
	    car = this.entities[ id ];

	    carSprite = this.gameAssets[ car.appearance ];
	    screenPosition = this.translateToScreenSpace( car.position );
	    context.drawImage( carSprite, screenPosition.x, screenPosition.y );
	}

	context.fillStyle = "#F00";
	context.fillText( "Score: " + Math.ceil( this.currentRoadSegment - this.penalties), 10, 50 );
	context.fillText( "Speed: " + Math.floor(this.playerCar.engine.speed), 10, 70 );

    };


    this.isHole = function( entity ) {
	return entity.appearance == 'hole';
    }

    this.isOilSpill = function( entity ) {
	return entity.appearance == 'oilSpill';
    }
    
    this.update = function() {

	this.currentRoadSegment += this.playerCar.engine.speed + this.playerCar.engine.acceleration;
	this.timeForNextCar--;

	if ( this.timeForNextCar <= 0 ) {

	    this.timeForNextCar = this.timeForCarSpawn;
	    var randomCar = this.entities[ Math.ceil( Math.random() * 5 ) ];

	    var screenPosition = this.translateToScreenSpace( randomCar.position );

	    if ( screenPosition.y > this.gameAssets.screenHeight || screenPosition.y < -this.gameAssets.textureHeight ) {
		//spawn car ahead of camera, so it will transition smoothly into view
		randomCar.position.y = 2 * this.gameAssets.textureHeight + this.currentRoadSegment;
		randomCar.lane = Math.floor( Math.random() * this.numberOfLanes );
	    }
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
		
		if ( this.checkCollision( car1, car2 ) ) {
		    if ( this.isHole( car2 ) ) {
			this.readySound.play();
			this.penalties -= car2.hitPenalty;
		    } else if ( this.isOilSpill( car2 ) ){
			car1.skid();
		    } else {
			
			car1.stop();
			car2.stop();

			if ( this.isPlayer( car1 ) || this.isPlayer( car2 ) ) {
			    score = this.currentRoadSegment;
			    
			    return function( gameStateList ) {
				gameStateList.gameOver.init( score );
				return gameStateList.gameOver;
			    }
			}
			
		    }
		}
	    }
	}
	
	return function( gameStateList ) {
	    return gameStateList.gamePlay;
	}
    };

    this.isPlayer = function( car ) {
	return car.appearance == "blueCar";
    }
    
    this.checkCollision = function( car1, car2 ) {
	
	if ( Math.abs(car1.position.x - car2.position.x ) < Math.max( car1.size.x, car2.size.x) ) {
	    if ( Math.abs(car1.position.y - car2.position.y ) < Math.max( car1.size.y, car2.size.y) ) {
		return true;
	    }
	}
	
	return false;
    };
    
    this.onLeft = function() {
	this.playerCar.moveLeft();
    };
    
    this.onRight = function() {
	this.playerCar.moveRight();
    };
};
