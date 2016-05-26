var score = 0;

//this begs a refactor, but I'm not really a JS developer, so I don't really know good automatic tools.
function RacingGameState() {

    this.readySound = new Audio("apert.wav");
    this.readySound.play();

    //my kingdom for a constant
    this.numberOfLanes = 4;
    this.borderSpaceOnEdgeLanes = 32;
    this.textureHeight = 127;
    this.laneWidth = 64;
    this.laneWidthInWorldSpace = 20;
    this.screenWidth = 800;
    this.screenHeight = 600;
    this.treePatchTextureWidth = 230;

    this.lanePosition = function( lane ) {
	return lane * this.laneWidthInWorldSpace;
    }

    this.init = function() {
	this.entities = [
			 new PoliceCar( this.lanePosition( 2 ), 120, 'blueCar' ),
			 new SlowCar( this.lanePosition( 0 ), 440, 1, 'redCar' ),
			 new SlowCar( this.lanePosition( 1 ), 440,2,  'blackCar' ),
			 new SlowCar( this.lanePosition( 3 ), 440,0, 'yellowCar' )
			 ];
	
	this.currentRoadSegment = 250;
	this.timeForNextCar = 200;
    };

    this.translateToScreenSpace = function( worldSpacePosition ) {
	return new Vec2( ( 800 / 2 ) - ( ( this.numberOfLanes / 2 ) * this.laneWidth ) + this.laneWidth * ( ( worldSpacePosition.x) / this.laneWidthInWorldSpace ), this.currentRoadSegment - worldSpacePosition.y );
    }


    this.renderRoad = function(context) {
	//terribly, terrible based on game screen area...I would love to make this more independent
	var offset = this.currentRoadSegment % this.textureHeight; //128 is due to the texture size being 128
	var center = this.screenWidth / 2;

	var roadPieceHeight;
	var roadTilePosition;

	for ( var i = -1; i < (Math.ceil( this.screenHeight / this.textureHeight) + 1 ); ++i ) {
	    roadPiecePos = offset + ( i * this.textureHeight );

	    roadTilePosition = center;
	    context.drawImage( this.gameAssets.roadCenter, roadTilePosition, roadPiecePos );

	    roadTilePosition -= this.laneWidth;
	    context.drawImage( this.gameAssets.roadCenter, roadTilePosition, roadPiecePos );
	    roadTilePosition -= this.laneWidth + this.borderSpaceOnEdgeLanes;
	    context.drawImage( this.gameAssets.roadLeftCorner, roadTilePosition, roadPiecePos );
	    roadTilePosition -= this.treePatchTextureWidth;
	    context.drawImage( this.gameAssets.trees, roadTilePosition, roadPiecePos );	    


	    roadTilePosition = center + this.laneWidth;
	    context.drawImage( this.gameAssets.roadRightCorner, roadTilePosition, roadPiecePos );
	    roadTilePosition += this.laneWidth + this.borderSpaceOnEdgeLanes;
	    context.drawImage( this.gameAssets.trees, roadTilePosition, roadPiecePos );
	}
    }

    this.draw = function( context ) {

	var car;
	var screenPosition;
	var carSprite;
	this.renderRoad(context);

	for ( id in this.entities ) {
	    car = this.entities[ id ];

	    carSprite = this.gameAssets[ car.appearance ];
	    screenPosition = this.translateToScreenSpace( car.position );
	    context.fillStyle = car.appearance;
	    context.drawImage( carSprite, screenPosition.x, screenPosition.y );
	}

	context.fillStyle = "#F00";
	context.fillText( "Distance: " + this.currentRoadSegment, 10, 50 );
	context.fillText( "Speed: " + this.entities[ 0 ].engine.speed, 10, 60 );

    };
    
    this.update = function() {

	this.currentRoadSegment += this.entities[ 0 ].engine.speed + this.entities[ 0 ].engine.acceleration;
	this.timeForNextCar--;

	if ( this.timeForNextCar == 0 ) {

	    this.timeForNextCar = 200;

	    //spawn car ahead of camera, so it will transition smoothly into view
	    this.entities[ 1 ].position.y = this.currentRoadSegment + ( 3 * this.entities[ 1 ].size.y );
	    this.entities[ 1 ].lane = Math.floor( Math.random() * this.numberOfLanes );
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
	
	return function( gameStateList ) {
	    return gameStateList.gamePlay;
	}
    };

    this.isPlayer = function( car ) {
	return car.appearance == "blueCar";
    }
    
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
