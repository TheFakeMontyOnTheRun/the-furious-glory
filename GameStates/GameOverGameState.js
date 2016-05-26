function GameOverGameState() {

    this.highestScore = 0;
    this.currentScore = 0;
    this.gotTheHighestScore = false;
    this.currentRoadSegment = 0;

    this.init = function( score ) {
	this.pressedAnyKey = false;
	this.currentScore = Math.ceil(score);
	if ( this.highestScore <= this.currentScore ) {
	    this.highestScore = Math.ceil(score);
	    this.gotTheHighestScore = true;
	} else {
	    this.gotTheHighestScore = false;
	}
    };

    this.draw = function(context) {
	drawRoadWithOffset( context, this.gameAssets, this.currentRoadSegment );
    
	context.fillStyle = "#FFF";
	context.font = "15px Verdana";
	context.fillText("Your score: " + this.currentScore, 10, 50 );
	if ( this.gotTheHighestScore ) {
	    context.font = "20px Verdana";
	    context.fillText("You got the highest score so far!", 10, 80 );
	} else {
	    context.fillText("The highest score: " + this.highestScore, 10, 70 );
	}


	context.font = "30px Verdana";
	context.fillText( "GAME OVER", 300, 300 );

	context.font = "15px Verdana";
	context.fillText("Press RIGHT to proceed to the title screen", 10, 560 );
    };
    
    this.update = function() {
	
	this.currentRoadSegment++;

	if ( this.pressedAnyKey ) {
	    return function( gameStateList ) {
		gameStateList.gameTitle.init();
		return gameStateList.gameTitle;
	    }
	} else {
	    return function( gameStateList ) {
		return gameStateList.gameOver;
	    }
	}
    };
        
    this.onLeft = function() {
	//this.pressedAnyKey = true;
    };
    
    this.onRight = function() {
	this.pressedAnyKey = true;
    };
}
