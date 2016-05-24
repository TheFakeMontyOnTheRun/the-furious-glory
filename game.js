var Game = {};

Game.fps = 30;

Game.initialize = function() {
    
    this.entities = {   gameTitle: new TitleScreenGameState(),
			gamePlay: new RacingGameState(),
			gameOver: new GameOverGameState()
    };
    
    this.context = document.getElementById("canvas").getContext("2d");
    this.currentState = this.entities.gameTitle; 
};

Game.draw = function() {
	this.context.clearRect(0, 0, 800, 600);
	this.currentState.draw( this.context );
};

Game.update = function() {
    this.currentState = (this.currentState.update())( this.entities );
};

Game.onLeft = function() {
    this.currentState.onLeft();
};

Game.onRight = function() {
    this.currentState.onRight();
};