
// board size  n * m 
let n = 8, m = 8;

// squares size in px
let squareSize = 60;
let boardColumns = n * squareSize, boardRows = m * squareSize;

// Possible moves [rows, cols]
const POSSIBLE_MOVES = [[2, -1], [-1, 2], [-1, -2], [1, 2], [1, -2], [2, 1], [-2, -1], [-2, 1]];


let counter = 1;
let speed = 300;

let locationOnBoard, squareIndexToMove;
let row, col;

// arrays
let squaresArray = [], squareAndExits, exits, squaresToMove, squaresToMoveEach;

let problemSolved;




function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function createBoard() {
	let board = document.createElement('div');
	board.id = "board";

	return board;
}

function createSquare(width, height, className) {
	let square = document.createElement('div');
	square.className = `square ${className}`;
	square.style.width = width + "px";
	square.style.height = height + "px";
	square.innerText = '';

	return square;
}

function addSquares(w, h) {
	board.style.width = w + "px";
	board.style.height = h + "px";

	cols = Math.floor(h / squareSize)
	rows = Math.floor(w / squareSize)

	for(let j = 0; j < cols; j++) {
		let row = 0;

		if(j % 2 == 0) row = 0;
		else row = 1;
		

		for(let i = 0; i < rows; i++) {
			let square = 0;

			if(row == 0) {

				if(i % 2 == 0) square = createSquare(squareSize, squareSize, "white");
				else square = createSquare(squareSize, squareSize, "black");
					
								
			} else {

				if(i % 2 == 0) square = createSquare(squareSize, squareSize, "black");
				else square = createSquare(squareSize, squareSize, "white");
					
			}
			
			board.appendChild(square);
		}

	}
}

function findCurrentLocation() {
	let currentLocation;

	for(let i = 0; i < squares.length; i++){
		if(squares[i].innerText == "K") {
			currentLocation = i;
			break
		}
	}

	return currentLocation
}

function createSquaresArray() {
	for(let i = 0; i < n; i++) {
		for(let j = 0; j < m; j++) {
			squaresArray.push([i, j])
		}
	}
}

function findWay(currentLocation) {
	if(currentLocation == locationOnBoard) squaresToMove = [];
	squaresToMoveEach = [];

	for(let i = 0; i < POSSIBLE_MOVES.length; i++) {
		let rowCoordinate = squaresArray[currentLocation][0] + POSSIBLE_MOVES[i][0]
		let colCoordinate = squaresArray[currentLocation][1] + POSSIBLE_MOVES[i][1]	
		
		if((rowCoordinate >= 0 && colCoordinate >= 0) && (rowCoordinate < n && colCoordinate < m)) {
			row = rowCoordinate
			col = colCoordinate


			for(let i = 0; i < squaresArray.length; i++) {
				if(squaresArray[i][0] === row && squaresArray[i][1] === col){
					if(!tracedSquares.includes(i)){
						if(currentLocation != locationOnBoard) {
							squaresToMoveEach.push(i);

						}else {
							squaresToMove.push(i);
						}
						
					}
				}
			}	
		}
	}

	if(currentLocation != locationOnBoard) return squaresToMoveEach;
	else return squaresToMove;
	
	
}

function solveProblem() {
	squareAndExits = [];
	exits = [];

	locationOnBoard = findCurrentLocation();
	squaresToMove = findWay(locationOnBoard);

	// squere and possible positions for it
	for(let i = 0; i < squaresToMove.length; i++){
		squareAndExits.push([squaresToMove[i], findWay(squaresToMove[i])]);
	}


	for(let i = 0; i < squareAndExits.length; i++) {
		exits.push(squareAndExits[i][1].length);
	}

	// find square with least exits
	for(let i = 0; i < squareAndExits.length; i++) {
		if(squareAndExits[i][1].length === Math.min(...exits)) {
			squareIndexToMove = squareAndExits[i][0];
			break;	
		}
	}

	squares[locationOnBoard].innerText = `${counter}`;
	counter++;

	squares[squareIndexToMove].innerText = "K";
	tracedSquares.push(squareIndexToMove);

}

function isSolved() {
	for(let i = 0; i < squares.length; i++) {
		if(squares[i].innerText == "") {
			problemSolved = false;
			break;
		}else {
			problemSolved = true;
			continue;
		}
	}
	return problemSolved
}

function start() {
	
	if(isSolved() == false) {
		solveProblem();
	}else {
		squares[findCurrentLocation()].style.color = "Green";
		clearTimeout();
	}

	setTimeout("start()", speed);
	
}


let board = createBoard();
document.body.appendChild(board);

addSquares(boardColumns, boardRows);

let squares = document.querySelectorAll(".square")
locationOnBoard = getRandomInt(squares.length);

let tracedSquares = [locationOnBoard];
squares[locationOnBoard].innerText = 'K';
squares[locationOnBoard].style.color = "red";

createSquaresArray()

let solveBtn = document.getElementById("solve")
solveBtn.addEventListener("click", start) 

