console.log("Up and running!");

// Cards
 var cards = [ {
 	rank:"queen",
 	suit:"diamonds",
 	cardImage:"images/queen-of-diamonds.png",
 },
 {
 	rank:"queen",
 	suit:"hearts",
 	cardImage:"images/queen-of-hearts.png",
 },
 {
 	rank:"king",
 	suit:"diamonds",
 	cardImage:"images/king-of-diamonds.png",
 },
 {
 	rank:"king",
 	suit:"hearts",
 	cardImage:"images/king-of-hearts.png",
 }
 ];

 var cardsInPlay = [];
 var scoreString = parseInt(document.getElementById('scoredisplay').innerHTML);

 	// Check if cards match and empty the array after checking
var checkForMatch = function() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		console.log("You found a match!");
		//Find a way to remove flipped cards
			scoreString += 5;
			document.getElementById('scoredisplay').innerHTML = scoreString;
			cardsInPlay = [];

		
	} else {
		console.log("Sorry, try again.");
		// Add a way to unflip wrong cards
			scoreString -= 2;
			document.getElementById('scoredisplay').innerHTML = scoreString;
		cardsInPlay = [];
	}
}

 // flipping Cards 
var flipCard = function() {
	cardId = this.getAttribute('data-id');
 	console.log("Player flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
 	cardsInPlay.push(cards[cardId].rank);
 	this.setAttribute('src', cards[cardId].cardImage);
 	if (cardsInPlay.length === 2) {
 		checkForMatch();
 	};	
};

//Create the board
var createBoard = function() {
	for (var i = 0; i < cards.length; i++) {
			cardElement = document.createElement('img');
			cardElement.setAttribute('src', "images/back.png");
			cardElement.setAttribute('data-id', i);
			cardElement.setAttribute('data-rank', cards[i].rank)
			cardElement.addEventListener('click', flipCard);
			document.getElementById('game-board').appendChild(cardElement);

	};
};

createBoard();

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


//var scoreentry = prompt("Enter your score please");
//var score = parseInt(scoreentry);


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
  
/* Attempt to remove flipped cards from the board
		for (i = 0; i < cardsInPlay.length; i++) {
			console.log(cardsInPlay[i]);
			var currentCard = document.querySelectorAll('data-rank = " + CSS.escape(cardsInPlay[i]) + "');
			console.log(currentCard);
			currentCard.innerHTML = "";

*/