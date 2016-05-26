
//yuck, global...
var toLoad;

function GameAssets() {

    this.borderSpaceOnEdgeLanes = 32;
    this.textureHeight = 127;
    this.laneWidth = 64;
    this.laneWidthInWorldSpace = 64;
    this.screenWidth = 800;
    this.screenHeight = 600;
    this.treePatchTextureWidth = 230;

    toLoad = 10;
	
    this.onImageDoneLoading = function() {
	toLoad--;
    }

    this.blackCar = new Image();
    this.blackCar.onload = this.onImageDoneLoading;

    this.blueCar = new Image();
    this.blueCar.onload = this.onImageDoneLoading;

    this.redCar = new Image();
    this.redCar.onload = this.onImageDoneLoading;

    this.yellowCar = new Image();
    this.yellowCar.onload = this.onImageDoneLoading;

    this.trees = new Image();
    this.trees.onload = this.onImageDoneLoading;

    this.roadLeftCorner = new Image();
    this.roadLeftCorner.onload = this.onImageDoneLoading;

    this.roadRightCorner = new Image();
    this.roadRightCorner.onload = this.onImageDoneLoading;

    this.roadCenter = new Image();
    this.roadCenter.onload = this.onImageDoneLoading;

    this.oilSpill = new Image();
    this.oilSpill.onload = this.onImageDoneLoading;

    this.hole = new Image();
    this.hole.onload = this.onImageDoneLoading;

    this.isReadyToProceed = function() {
	return toLoad <= 0;
    }

    this.blackCar.src = "images/black.png";
    this.blueCar.src = "images/blue.png";
    this.redCar.src = "images/red.png";
    this.yellowCar.src = "images/yellow.png";
    this.trees.src = "images/trees.png";
    this.roadLeftCorner.src = "images/roadLeft.png";
    this.roadCenter.src = "images/roadCenter.png";
    this.roadRightCorner.src = "images/roadRight.png";
    this.oilSpill.src = "images/oil.png";
    this.hole.src = "images/hole.png";

}