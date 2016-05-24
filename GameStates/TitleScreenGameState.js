function TitleScreenGameState() {

    this.init = function() {
	this.pressedAnyKey = false;
    };

    this.draw = function( context ) {
	context.fillStyle = '#999';
	context.fillRect( 0, 0, 800, 600 );
	context.fillStyle = "#000";
	context.fillText( "The Furious Glory!", 10, 50 );
    };

    this.update = function() {
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
