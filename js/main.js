console.log("Up and running!");
/*
	 Description of Functions and layout goes here

	ALSO WHY THE FUCK DOES THE DEFAULT HIGHSCORE PLACE SCORES IN THE WRONG POSITION

	 I NEED TO MOVE ALL FUNCTIONS RELATED TO THE SECOND HIGHSCOREBOARD INTO ITS OWN JS FILE AND ONLY CALL IT WHEN NEEDED
	 THIS MESS IS GETTING OUT OF HAND

	 I ALSO NEED TO MAKE SURE THAT SCORES DONT GET REPLACED, BUT INSTEAD MOVED DOWN THE SCOREBOARD 

*/


//Declare global variables
 var cardsInPlay = [];
 var cardsInPlaySuit = [];
 var cardAmount = cards.length;
 var player = "";
 var scoreString = 0;
 var difficulty = "default";
 var scores = [];
 var scoresEasy = [];
 //Random number generation from MDN
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Create the board
var createBoard = function() {
	console.log("The current difficulty setting is " + difficulty);
	if (difficulty === "default") {
		for (var i = 0; i < cards.length; i++) {
			cardElement = document.createElement('img');
			cardElement.setAttribute('src', "images/cards/back.png");
			cardElement.setAttribute('data-id', i);
			cardElement.setAttribute('data-status', "unflipped");
			cardElement.setAttribute('class', "card");
			cardElement.addEventListener('click', flipCard);
			document.getElementById('game-board').appendChild(cardElement);
	}
	} else if (difficulty === "easy") {
			for (var i = 0; i < 8; i++) {
			cardElement = document.createElement('img');
			cardElement.setAttribute('src', "images/cards/back.png");
			cardElement.setAttribute('data-id', i);
			cardElement.setAttribute('data-status', "unflipped");
			cardElement.setAttribute('class', "card");
			cardElement.addEventListener('click', flipCard);
			document.getElementById('game-board').appendChild(cardElement);
	}} else {
		alert("Please set a difficulty.");
	};
};

//Delay ending the game
var timedCheck = function(){
	setTimeout(checkForHighscore, 1200);
};
// Shuffle the cards: Use insertChild to move each card around once to a random position
	//Create a random number between 0 and currentBoard.length as new position
var shuffleCards = function() {
	var currentBoard = document.querySelectorAll("img[data-id]");
	for (i = 0; i < currentBoard.length; i++) {
			var randomNumber = getRandomInt(0, currentBoard.length);
			var cardToShuffle = document.getElementById('game-board').childNodes[i];
			var randomCardLocation = document.getElementById('game-board').childNodes[randomNumber];
			document.getElementById('game-board').insertBefore(cardToShuffle, randomCardLocation);
	};
};
 // flipping Cards 
var flipCard = function() {
	cardId = this.getAttribute('data-id');
	this.setAttribute('data-status', "flipped");
 	console.log("Player flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
 	cardsInPlay.push(cards[cardId].rank);
 	cardsInPlaySuit.push(cards[cardId].suit);
 	this.setAttribute('src', cards[cardId].cardImage);
 	if (cardsInPlay.length === 2) {
 		checkForMatchDelay();
 	};	
};
 // Check if cards match and empty the array after checking
var checkForMatch = function() {
	var flippedCards = document.querySelectorAll("img[data-status = 'flipped']");
	// Check for a match
	if (cardsInPlay[0] === cardsInPlay[1] && cardsInPlaySuit[0] != cardsInPlaySuit[1]) {
		alert("You found a match!");
		//Find a way to remove flipped cards   -> set status to found
			scoreString += 5;
			document.getElementById('scoredisplay').innerHTML = scoreString;
			for (i = 0; i <flippedCards.length; i++) {
				flippedCards[i].setAttribute('data-status', "found");
				flippedCards[i].removeEventListener('click', flipCard);
			};
		//Check to see if any cards remain unflipped and check for Highscores if not
			var cardsLeft = document.querySelectorAll("img[data-status= 'unflipped']");
			if (cardsLeft.length === 0) {
				checkForHighscore();
			} else {

			};
			cardsInPlay = [];
			cardsInPlaySuit = [];
	}  //Check if player has clicked same card twice
	else if (cardsInPlay[0] === cardsInPlay[1] && cardsInPlaySuit[0] == cardsInPlaySuit[1]) {
		for (i = 0; i <flippedCards.length; i++) {
				flippedCards[i].setAttribute('src', "images/cards/back.png");
				flippedCards[i].setAttribute('data-status', "unflipped");
			};
		cardsInPlay = [];
		cardsInPlaySuit = [];
	} //Reset state if no match found: Set status back to unflipped and change src
	else {
			console.log(scoreString);
			scoreString -= 2;
			document.getElementById('scoredisplay').innerHTML = scoreString;
			for (i = 0; i < flippedCards.length; i++) {
				flippedCards[i].setAttribute('src', "images/cards/back.png");
				flippedCards[i].setAttribute('data-status', "unflipped");
			};
			cardsInPlay = [];
			cardsInPlaySuit = [];
	}
};
//checkmatch but with delay
var checkForMatchDelay = function(){
	setTimeout(checkForMatch, 1200);
};
//Reset Board and Score function
var reset = function() {
	document.getElementById('game-board').innerHTML = "";
	document.getElementById('scoredisplay').innerHTML = 0;
	scoreString = 0;
	cardsInPlay = [];
	scores = [];
	scoresEasy = [];
	console.log("Game was reset.");
	console.log("Score should be " + scoreString);
	createBoard();
	shuffleCards();
	readScores();
};

//validate Playername input
var highscoreInput = function() {
	player = prompt("Congratulations! You scored " + scoreString +". Enter your name for the Board!");
	if (player.length > 10) {
		player = prompt("Please use a maximum of 10 characters.");
	} else {

	};
};
//Get scores from HTML I NEED TO GET THIS FROM THE LOCALSTORAGE DATABASE
var readScores = function () {
	for (i = 0; i < 5; i++) {
		scores.push(parseInt(document.getElementById('score'+ i).innerHTML));
		scoresEasy.push(parseInt(document.getElementById('score'+ i + 'easy').innerHTML));
	}
};

// Check for highscore using if

var checkForHighscore = function() {
	if (difficulty === "defalut") {
		if ( scoreString > scores[0]) {
			highscoreInput();
			updateScore(0);
		} else if (scoreString > scores[1]) {
			highscoreInput();
			updateScore(1);
		} else if ( scoreString > scores[2]) {
			highscoreInput();
			updateScore(2);
		} else if ( scoreString > scores[3]) {
			highscoreInput();
			updateScore(3);
		}else if ( scoreString > scores[4]) {
			highscoreInput();
			updateScore(4);
		} else {
			alert("Your Score is  " + scoreString +". Better luck next time!");
		}
	} else {
		if ( scoreString > scoresEasy[0]) {
			highscoreInput();
			updateScore(0);
		} else if (scoreString > scoresEasy[1]) {
			highscoreInput();
			updateScore(1);
		} else if ( scoreString > scoresEasy[2]) {
			highscoreInput();
			updateScore(2);
		} else if ( scoreString > scoresEasy[3]) {
			highscoreInput();
			updateScore(3);
		}else if ( scoreString > scoresEasy[4]) {
			highscoreInput();
			updateScore(4);
		} else {
			alert("Your Score is  " + scoreString +". Better luck next time!");
		}
	}
	saveScores();
	reset();
};

//change highscoreboard
var updateScore = function(rank) {
	if (difficulty === "default") {
		for (i = 4; i < rank; i--) {
			// move everything down by 1
			document.getElementById('player' + i).innerHTML = document.getElementById('player' + (i - 1)).innerHTML;
			document.getElementById('score' + i).innerHTML = document.getElementById('score' + (i - 1)).innerHTML;
		};
		//change beat score to new score
		document.getElementById('player' + rank).innerHTML = player;
		document.getElementById('score' + rank).innerHTML = scoreString;
	} else {
			for (i = 4; i < rank; i--) {
			// move everything down by 1
			console.log(document.getElementById('score' + i + 'easy').innerHTML);
			document.getElementById('player' + i + 'easy').innerHTML = document.getElementById('player' + (i - 1) + 'easy').innerHTML;
			document.getElementById('score' + i + 'easy').innerHTML = document.getElementById('score' + (i - 1) + 'easy').innerHTML;
			console.log(document.getElementById('score' + i + 'easy').innerHTML);
			};
			document.getElementById('player' + rank + 'easy').innerHTML = player;
			document.getElementById('score' + rank + 'easy').innerHTML = scoreString;
	}
};
	
// Save highscoretable in local storage
var saveScores = function() {
	if (difficulty === "default") {
		var tableStorage = document.getElementById('highscoretable').innerHTML;
		console.log(tableStorage);
		localStorage.setItem('highscorestorage', tableStorage);
		console.log("Saving Scores");
	} else {
		var tableStorageEasy = document.getElementById('highscoretableeasy').innerHTML;
		localStorage.setItem('highscorestorageeasy', tableStorageEasy);
		console.log("Saving Scores to easy highscoreboard");
	}
};
// Retrieve scores from storage
// THIS SHOULDNT NEED AN IF STATEMENT TO STOP IT FROM RUNNING BOTH - WHO CARES IF THEY DO
var loadScores = function() {
	
		var innerHTMLTable = localStorage.getItem('highscorestorage');
		document.getElementById('highscoretable').innerHTML = innerHTMLTable;
		console.log("Loading Default Scores");
	
		var innerHTMLTable = localStorage.getItem('highscorestorageeasy');
		document.getElementById('highscoretableeasy').innerHTML = innerHTMLTable;
		console.log("Loading Scores from easy highscoreboard");
	
};
// Check if game has ever stored scores locally and retrieve them if it has
var initializeScores = function() {
	//Load default scores from localstorage or create them
	if (localStorage.getItem('highscorestorage') === null) {
		var tableStorage = document.getElementById('highscoretable').innerHTML;	
		console.log(tableStorage);
		localStorage.setItem('highscorestorage', tableStorage);
		console.log(localStorage.setItem('highscorestorage'));
	} else {
		loadScores();
		console.log("Loading Default Scores Initially");
	};// load easy scores from localstorage or createthem
	if (localStorage.getItem('highscorestorageeasy' === null)) {
		var tableStorageEasy = document.getElementById('highscoretableeasy').innerHTML;
		localStorage.setItem('highscorestorageeasy', tableStorageEasy);
		console.log("Creating initial Easy Highscoreboard.");
	} else {
		loadScores();
		console.log("Loading  Easy Scores Initially");
	};
	//read scores into array for highscorefunctions
	readScores();
};

var resetHighScores = function() {
	localStorage.removeItem('highscoretable');
	localStorage.removeItem('highscoretableeasy');
	console.log("Scores reset");
	initializeScores();
};

//create functions to avoid call on pageload

var hideDefault = function() {
	document.getElementById('highscoretableeasy').classList.remove("hidden");
	document.getElementById('highscoretable').classList.add("hidden");
	console.log("Showing Easy Highscoreboard");
};

var hideEasy = function() {
	document.getElementById('highscoretable').classList.remove("hidden");
	document.getElementById('highscoretableeasy').classList.add("hidden");
	console.log("Showing Default Highscoreboard");
};

// set difficulty to default

var defaultGame = function() {
	difficulty = "default";
	reset();
};

// set difficulty to easy
var easyGame = function() {
	difficulty = "easy";
	reset();
};
//Add Listener for easy button click
document.getElementById('easy').addEventListener('click', easyGame);
document.getElementById('easy').addEventListener('click', hideDefault);

//Add Listener for default button click
document.getElementById('default').addEventListener('click', defaultGame);
document.getElementById('default').addEventListener('click', hideEasy);

//Add Listener for highscore reset click
document.getElementById('resethighscores').addEventListener('click', resetHighScores);

//Add Listener for Reset button click
document.getElementById('reset').addEventListener('click', reset);

createBoard();
shuffleCards();
initializeScores();