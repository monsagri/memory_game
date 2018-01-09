console.log("Up and running!");
//Declare global variables
 var cardsInPlay = [];
 var cardsInPlaySuit = [];
 var cardAmount = cards.length;
 var player = "";
 var scoreString = parseInt(document.getElementById('scoredisplay').innerHTML);
 //Random number generation from MDN
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//Create the board
var createBoard = function() {
	for (var i = 0; i < cards.length; i++) {
			cardElement = document.createElement('img');
			cardElement.setAttribute('src', "images/cards/back.png");
			cardElement.setAttribute('data-id', i);
			cardElement.setAttribute('data-status', "unflipped");
			cardElement.setAttribute('class', "card");
			cardElement.addEventListener('click', flipCard);
			document.getElementById('game-board').appendChild(cardElement);
	};
};
//Delay ending the game
var timedCheck = function(){
	setTimeout(checkForHighscore, 1200);
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
//checkmatch but with delay
var checkForMatchDelay = function(){
	setTimeout(checkForMatch, 1200);
};
//Reset Board and Score function
var reset = function() {
	document.getElementById('game-board').innerHTML = "";
	createBoard();
	shuffleCards();
	document.getElementById('scoredisplay').innerHTML = 0;
	var scoreString = parseInt(document.getElementById('scoredisplay').innerHTML)
	cardsInPlay = [];
	console.log("Game was reset.");
};
//Add Listener for Reset button click
document.getElementById('reset').addEventListener('click', reset);
//Enter highscores into table
var scores = [];
	for (i = 0;i <= 4;i++)
		scores.push(parseInt(document.getElementById('score'+ i).innerHTML));
//validate Playername input
var highscoreInput = function() {
	player = prompt("Congratulations! Enter your name for the Board!");
	if (player.length > 10) {
		player = prompt("Please use a maximum of 10 characters.");
	} else {

	};
};
//change highscoreboard
var updateScore = function(rank) {
	document.getElementById('player' + rank).innerHTML = player;
	document.getElementById('score' + rank).innerHTML = scoreString;
};
// Check for highscore using if
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
// Save highscoretable in local storage
var saveScores = function() {
	var tableStorage = document.getElementById('highscoretable').innerHTML;
	localStorage.setItem('highscorestorage', tableStorage);
};
// Retrieve scores from storage
var loadScores = function() {
	var innerHTMLTable = localStorage.getItem('highscorestorage');
	document.getElementById('highscoretable').innerHTML = innerHTMLTable;
};
// Check if game has ever stored scores locally and retrieve them if it has
var initializeScores = function() {
	if (localStorage.getItem('highscorestorage').length = 0) {
		saveScores();
	} else {
		loadScores();
	}
};
		
createBoard();
shuffleCards();
initializeScores();