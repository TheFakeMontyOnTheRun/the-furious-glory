function drawRoadWithOffset(context, gameAssets, offset ) {
    var offset = offset % gameAssets.textureHeight;
    var center = gameAssets.screenWidth / 2;
    
    var roadPieceHeight;
    var roadTilePosition;
    
    for ( var i = -1; i < (Math.ceil( gameAssets.screenHeight / gameAssets.textureHeight) + 1 ); ++i ) {
	roadPiecePos = offset + ( i * gameAssets.textureHeight );
	
	roadTilePosition = center;
	context.drawImage( gameAssets.roadCenter, roadTilePosition, roadPiecePos );
	
	roadTilePosition -= gameAssets.laneWidth;
	context.drawImage( gameAssets.roadCenter, roadTilePosition, roadPiecePos );
	roadTilePosition -= gameAssets.laneWidth + gameAssets.borderSpaceOnEdgeLanes;
	context.drawImage( gameAssets.roadLeftCorner, roadTilePosition, roadPiecePos );
	roadTilePosition -= gameAssets.treePatchTextureWidth;
	context.drawImage( gameAssets.trees, roadTilePosition, roadPiecePos );
	
	
	roadTilePosition = center + gameAssets.laneWidth;
	context.drawImage( gameAssets.roadRightCorner, roadTilePosition, roadPiecePos );
	roadTilePosition += gameAssets.laneWidth + gameAssets.borderSpaceOnEdgeLanes;
	context.drawImage( gameAssets.trees, roadTilePosition, roadPiecePos );
    }
}
