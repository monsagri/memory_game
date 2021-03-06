console.log("Up and running!");
/* 
	TODO LIST
		
		Create groupings and index for this file
		Eventually fix bug where you can click third card in window before checkmatch is called

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
	initializeScores();
	readDefaultScores();
};

// Check if game has ever stored scores locally and retrieve them if it has
var initializeScores = function() {
	if (localStorage.getItem('highscorestorage') === null) {
		var tableStorage = document.getElementById('highscoretable').innerHTML;
		localStorage.setItem('highscorestorage', tableStorage);
		console.log("Resetting Scoreboard");
	} else {
		loadScores();
	};
	if (localStorage.getItem('highscorestorageeasy') === null) {
		var tableStorageEasy = document.getElementById('highscoretableeasy').innerHTML;
		localStorage.setItem('highscorestorageeasy', tableStorageEasy);
	} else {
		loadScoresEasy();
	}

};
// Retrieve Default scores from storage
var loadScores = function() {
	var innerHTMLTable = localStorage.getItem('highscorestorage');
	document.getElementById('highscoretable').innerHTML = innerHTMLTable;
	console.log("Loading Scores");
};
//Retrieve Easy Scores from Storage
var loadScoresEasy = function() {
	var innerHTMLTableEasy = localStorage.getItem('highscorestorageeasy');
	document.getElementById('highscoretableeasy').innerHTML = innerHTMLTableEasy;
	console.log("Loading Easy Scores");
};

//Read  Default Highscores from current display
var readDefaultScores = function() {
	scores = [];
	for (i = 0;i <= 4;i++)
		scores.push(parseInt(document.getElementById('score'+ i).innerHTML));
};
//Read  Easy Mode Highscores from current display
var readEasyScores = function() {
	scoresEasy = [];
	for (i = 0;i <= 4;i++) {
		scoresEasy.push(parseInt(document.getElementById('score'+ i + 'easy').innerHTML));
	}
};

// Use insertChild to move each card around once to a random position
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

//checkmatch but with delay
var checkForMatchDelay = function(){
	setTimeout(checkForMatch, 1200);
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
			if (cardsLeft.length === 0 && difficulty === "default") {
				checkForHighscore();
			} else if (cardsLeft.length === 0 && difficulty === "easy") {
				checkForHighscoreEasy();
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
			for (i = 0; i <flippedCards.length; i++) {
				flippedCards[i].setAttribute('src', "images/cards/back.png");
				flippedCards[i].setAttribute('data-status', "unflipped");
			};
			cardsInPlay = [];
			cardsInPlaySuit = [];
	}
};
// Check for Default Game ighscore using if
var checkForHighscore = function() {
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
	}else if ( scoreString > scores [4]) {
		highscoreInput();
		updateScore(4);
	} else {
		alert("Better luck next time!");
	}
	saveScores();
	reset();
};
// Check for Easy Game Highscore
var checkForHighscoreEasy = function() {
	if ( scoreString > scoresEasy[0]) {
		highscoreInput();
		updateScoreEasy(0);
	} else if (scoreString > scoresEasy[1]) {
		highscoreInput();
		updateScoreEasy(1);
	} else if ( scoreString > scoresEasy[2]) {
		highscoreInput();
		updateScoreEasy(2);
	} else if ( scoreString > scoresEasy[3]) {
		highscoreInput();
		updateScoreEasy(3);
	}else if ( scoreString > scoresEasy[4]) {
		highscoreInput();
		updateScoreEasy(4);
	} else {
		alert("Better luck next time!");
	}
	saveScores();
	reset();
};

//validate Playername input
var highscoreInput = function() {
	player = prompt("Congratulations! You scored " + scoreString + " points.  Enter your name for the Board!");
	if (player.length > 10) {
		player = prompt("Please use a maximum of 10 characters.");
	} else {

	};
};
//change default highscoreboard
var updateScore = function(rank) {
	//moving Elements down by 1
	for (i = 4; i > rank; i--) {
			document.getElementById('player' + i).innerHTML = document.getElementById('player' + (i - 1)).innerHTML;
			document.getElementById('score' + i).innerHTML = document.getElementById('score' + (i - 1)).innerHTML;
		}
	document.getElementById('player' + rank).innerHTML = player;
	document.getElementById('score' + rank).innerHTML = scoreString;
};
//change easy highscoreboard
var updateScoreEasy = function(rank) {
	//moving Elements down by 1
	for (i = 4; i > rank; i--) {
			document.getElementById('player' + i + 'easy').innerHTML = document.getElementById('player' + (i - 1) + 'easy').innerHTML;
			document.getElementById('score' + i + 'easy').innerHTML = document.getElementById('score' + (i - 1) + 'easy').innerHTML;
		}
	document.getElementById('player' + rank + 'easy').innerHTML = player;
	document.getElementById('score' + rank +'easy').innerHTML = scoreString;
};

// Save highscoretable in local storage
var saveScores = function() {
	var tableStorage = document.getElementById('highscoretable').innerHTML;
	var tableStorageEasy = document.getElementById('highscoretableeasy').innerHTML;
	console.log(tableStorage);
	console.log(tableStorageEasy);
	localStorage.setItem('highscorestorage', tableStorage);
	localStorage.setItem('highscorestorageeasy', tableStorageEasy);
	console.log("Saving Scores")
};

//Reset Board and Score function
var reset = function() {
	document.getElementById('game-board').innerHTML = "";
	createBoard();
	shuffleCards();
	document.getElementById('scoredisplay').innerHTML = 0;
	scoreString = 0;
	cardsInPlay = [];
	console.log("Game was reset.");
	console.log("Score should be " + scoreString);
	readDefaultScores();
	readEasyScores();
};
var resetScores = function() {
	localStorage.clear();
	window.location.reload(true);
}

//Set difficulty to default
var defaultGame = function() {
	difficulty = "default";
	reset();
	document.getElementById('highscoretable').classList.remove("hidden");
	document.getElementById('highscoretableeasy').classList.add("hidden");
	readEasyScores();
};
// set difficulty to easy
var easyGame = function() {
	difficulty = "easy";
	reset();
	document.getElementById('highscoretableeasy').classList.remove("hidden");
	document.getElementById('highscoretable').classList.add("hidden");
	readEasyScores();
};

//Add Listener for Reset button click
document.getElementById('easy').addEventListener('click', easyGame);
//Add Listener for Reset button click
document.getElementById('default').addEventListener('click', defaultGame);
//Add Listener for Reset button click
document.getElementById('resetscores').addEventListener('click', resetScores);
//Add Listener for Reset button click
document.getElementById('reset').addEventListener('click', reset);
		
createBoard();
shuffleCards();