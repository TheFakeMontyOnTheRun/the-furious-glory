function GameOverGameState() {

    this.highestScore = 0;
    this.currentScore = 0;
    this.gotTheHighestScore = false;

    this.init = function( score ) {
	this.pressedAnyKey = false;

	if ( this.highestScore < score ) {
	    this.highestScore = score;
	    this.gotTheHighestScore = true;
	} else {
	    this.gotTheHighestScore = false;
	}

	this.currentScore = score;
    };

    this.draw = function(context) {
	context.fillStyle = '#000';
	context.fillRect(0, 0, 800, 600);
    
	context.fillStyle = "#FFF";
	context.fillText("Your score: " + this.currentScore, 10, 50 );
	if ( this.gotTheHighestScore ) {
	    context.fillText("You got the highest score so far!", 10, 70 );
	} else {
	    context.fillText("The highest score: " + this.highestScore, 10, 70 );
	}
    };
    
    this.update = function() {
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
