function LoadingScreenGameState() {

    this.gameAssets = new GameAssets();

    this.init = function() {
    };

    this.draw = function( context ) {
	context.fillStyle = '#333';
	context.fillRect( 0, 0, 800, 600 );
	context.fillStyle = "#000";
	context.fillText( "Loading...", 10, 50 );
    };

    this.update = function() {
	if ( this.gameAssets.isReadyToProceed() ) {
	    return function( gameStateList) {
		gameStateList.gameTitle.init();
		return gameStateList.gameTitle;
	    }
	} else {
	    return function( gameStateList ) {
		return gameStateList.gameLoading;
	    }
	}
    };

    this.onLeft = function() {

    };

    this.onRight = function() {

    };
};
