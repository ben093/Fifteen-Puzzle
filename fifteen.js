"use strict";

var x_empty = 300;
var y_empty = 300;
var PIECES = [];

/*
HW 6: Extra Credit
Fall 2014
*/

window.onload = function() {
	$("shufflebutton").observe('click', shufflePuzzleEvent);
	populateTiles();
}

function populateTiles() {
	PIECES = $$('#puzzlearea div');
	var height = 4;
	var width = 4;
	var piece = 0;
	
	var pos;
	
	for(var i = 0; i < width; i++)
	{
		for(var j = 0; j < height; j++)
		{
			//build a string			
			pos = j * -100 + "px " + i * -100 + "px";
			PIECES[piece].style.backgroundPosition = pos;
			
			//position absolutely from left/top
			PIECES[piece].style.left = j * 100 + "px";
			PIECES[piece].style.top = i * 100 + "px";
			
			//set events
			PIECES[piece].observe('click', movePieceEvent);
			PIECES[piece].observe('mouseover', highlighterEvent);
			PIECES[piece].observe('mouseout', mouseoutEvent);
			
			//move to next piece
			piece += 1;
		}
	}
}

function movePieceEvent(event){
	movePiece(this);
}

function movePiece(piece) {
	if(checkNeighbors(piece))
	{
		//use temp vars to hold position of piece clicked
		var temp = piece.style.left
		var temp2 = piece.style.top;
		
		//move current piece to empty space
		piece.style.left = x_empty + "px";
		piece.style.top = y_empty + "px";
		
		//move empty space to piece clicked (temp vars)
		x_empty = parseInt(temp);
		y_empty = parseInt(temp2);
	}
	else
	{
		//alert("Please click a piece next to the empty piece to move it");
	}
	
	
}

function highlighterEvent(event){
	if(checkNeighbors(this))
	{	//change color if neighbors
		this.style.color = "red";
		this.style.borderColor = "red";
	}
}

function mouseoutEvent(event){
	//return to defaults
	this.style.color = "black";
	this.style.borderColor = "black";
}

function checkNeighbors(piece) {
	
	var x = parseInt(piece.style.left);
	var y = parseInt(piece.style.top);

	if(Math.abs(x - x_empty) == 100)
	{
		if(y == y_empty)
		{		
			return true;
		}
	}
	else if(Math.abs(y - y_empty) == 100)
	{
		if(x == x_empty)
		{
			return true;
		}
	}
	
	return false;
}

function shufflePuzzleEvent(event){	
	//try to do this random number of moves
	for(var j = 0; j <= Math.random() * (999999 - 99999) + 99999; j++)
	{	//grab random pieces
		for(var i = 0; i <= Math.random() * PIECES.length; i++)
		{ //check pieces for a match
			if(checkNeighbors(PIECES[i]))
			{	//move piece if random piece is neighbor
				movePiece(PIECES[i]);
			}
		}
	}
}