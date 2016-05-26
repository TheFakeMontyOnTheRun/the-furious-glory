function TitleScreenGameState() {

    this.init = function() {
	this.pressedAnyKey = false;
    };

    this.currentRoadSegment = 0;

    this.draw = function( context ) {
	drawRoadWithOffset( context, this.gameAssets, this.currentRoadSegment );
	context.fillStyle = "#FF0";
	context.font = "30px Verdana";
	context.fillText( "The Furious Glory!", 10, 50 );
	context.font = "10px Verdana";
	context.fillText( "Press LEFT to play", 20, 70 );

	context.font = "20px Verdana";
	context.fillText( "A game by Daniel Monteiro", 10, 560 );
    };

    this.update = function() {

	this.currentRoadSegment++;

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
	this.pressedAnyKey = true;
    };

    this.onRight = function() {
	//	this.pressedAnyKey = true;
    };
};
