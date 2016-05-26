var Game = {};

Game.fps = 30;

Game.initialize = function() {
    
    this.entities = {  gameLoading: new LoadingScreenGameState(), 
		       gameTitle: new TitleScreenGameState(),
			gamePlay: new RacingGameState(),
			gameOver: new GameOverGameState()
    };

    //not my brightest hour, but I'm no Javascript programmer and the deadline looms by
    this.entities.gamePlay.gameAssets = this.entities.gameLoading.gameAssets;
    this.entities.gameTitle.gameAssets = this.entities.gameLoading.gameAssets;
    this.entities.gameOver.gameAssets = this.entities.gameLoading.gameAssets;
    
    this.context = document.getElementById("canvas").getContext("2d");
    this.currentState = this.entities.gameLoading; 
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