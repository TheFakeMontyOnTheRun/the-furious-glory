function TitleScreenGameState() {

    this.init = function() {
	this.pressedAnyKey = false;
	readySound = new Audio("sounds/apert.wav");
	readySound.play();
	this.framesToIgnoreKeys = 60;
    };

    this.currentRoadSegment = 0;

    this.draw = function( context ) {
	drawRoadWithOffset( context, this.gameAssets, this.currentRoadSegment );
	context.fillStyle = "#FF0";
	context.font = "30px Verdana";
	context.fillText( "The Furious Glory!", 10, 50 );

	if ( this.framesToIgnoreKeys <= 0 ) {
	    context.font = "15px Verdana";
	    context.fillText( "Press LEFT or RIGHT to play", 20, 75 );
	}

	context.font = "20px Verdana";
	context.fillText( "A game by Daniel Monteiro", 10, 560 );
    };

    this.update = function() {
	this.framesToIgnoreKeys--;
	this.currentRoadSegment--;

	if ( this.pressedAnyKey ) {
	    return function( gameStateList) {
		gameStateList.gamePlay.init();
		return gameStateList.gamePlay;
	    }
	} else {
	    return function( gameStateList ) {
		return gameStateList.gameTitle;
	    }
	}
    };

    this.onLeft = function() {
	if ( this.framesToIgnoreKeys <= 0 ) {
	    this.pressedAnyKey = true;
	}
    };

    this.onRight = function() {
	if ( this.framesToIgnoreKeys <= 0 ) {
	    this.pressedAnyKey = true;
	}
    };
};
