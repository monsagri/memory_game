console.log("Up and running!");

 var cardsInPlay = [];
 var cardAmount = cards.length;
 var scoreString = parseInt(document.getElementById('scoredisplay').innerHTML);

 //Random number generation from MDN
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// Use insertChild to move each card around once to a random position
	//Create a random number between 0 and currentBoard.length as new position
var shuffleCards = function() {
	var currentBoard = document.querySelectorAll("img[data-id]");
	for (i = 0; i < currentBoard.length; i++) {
			var randomNumber = getRandomInt(0, currentBoard.length);
			console.log(randomNumber);
			var cardToShuffle = document.getElementById('game-board').childNodes[i];
			var randomCardLocation = document.getElementById('game-board').childNodes[randomNumber];
			document.getElementById('game-board').insertBefore(cardToShuffle, randomCardLocation);
	};
}

 // flipping Cards 
var flipCard = function() {
	cardId = this.getAttribute('data-id');
	this.setAttribute('data-status', "flipped");
 	console.log("Player flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
 	cardsInPlay.push(cards[cardId].rank);
 	this.setAttribute('src', cards[cardId].cardImage);
 	if (cardsInPlay.length === 2) {
 		checkForMatch();
 	};	
};

 // Check if cards match and empty the array after checking
var checkForMatch = function() {
	var flippedCards = document.querySelectorAll("img[data-status = 'flipped']");
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("You found a match!");
		//Find a way to remove flipped cards   -> set status to found
			scoreString += 5;
			document.getElementById('scoredisplay').innerHTML = scoreString;
			for (i = 0; i <flippedCards.length; i++) {
				flippedCards[i].setAttribute('data-status', "found");
				flippedCards[i].removeEventListener('click', flipCard);
			};
		/*Check to see if any cards remain unflipped and check for Highscores if not
			var remainingCards = document.querySelectorAll("img[data-status = 'unflipped']");
			console.log(remainingCards)
			if (remainingCards == "") {
				checkForHighscore();
			} else {

			};
		*/
			cardsInPlay = [];
	} else {
		alert("Sorry, try again.");
		// Add a way to unflip wrong cards -> set status back to unflipped and change src
			scoreString -= 2;
			document.getElementById('scoredisplay').innerHTML = scoreString;
			for (i = 0; i <flippedCards.length; i++) {
				flippedCards[i].setAttribute('src', "images/cards/back.png");
				flippedCards[i].setAttribute('data-status', "unflipped");
			};
			cardsInPlay = [];
	}
}

//Reset Board and Score function
var reset = function () {
	checkForHighscore();
	document.getElementById('game-board').innerHTML = "";
	createBoard();
	document.getElementById('scoredisplay').innerHTML = 0;
	cardsInPlay = [];
}

//Add Listener for Reset button click
document.getElementById('resetbutton').addEventListener('click', reset);

//Enter highscores into table
var scores = [];
	for (i = 0;i <= 4;i++)
		scores.push(parseInt(document.getElementById('score'+ i).innerHTML));

// Check for highscore using if
var checkForHighscore = function() {
	if ( scoreString > scores[0]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player0').innerHTML = player;
		document.getElementById('score0').innerHTML = scoreString;
	} else if (scoreString > scores[1]) {
		var playerString = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player1').innerHTML = player;
		document.getElementById('score1').innerHTML = scoreString;
	} else if ( scoreString > scores[2]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player2').innerHTML = player;
		document.getElementById('score2').innerHTML = scoreString;
	} else if ( scoreString > scores[3]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player3').innerHTML = player;
		document.getElementById('score3').innerHTML = scoreString;
	}else if ( scoreString > scores [4]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player4').innerHTML = player;
		document.getElementById('score4').innerHTML = scoreString;
	} else {
		alert("Better luck next time!");
	}
};

createBoard();
shuffleCards();