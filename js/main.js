console.log("Up and running!");

// Cards
 var cards = [ {
 	rank:"queen",
 	suit:"clubs",
 	cardImage:"images/cards/queen-of-clubs.png",
 },
 {
 	rank:"queen",
 	suit:"spades",
 	cardImage:"images/cards/queen-of-spades.png",
 },
 {
 	rank:"king",
 	suit:"clubs",
 	cardImage:"images/cards/king-of-clubs.png",
 },
 {
 	rank:"king",
 	suit:"spades",
 	cardImage:"images/cards/king-of-spades.png",
 },
 {
	rank:"jack",
 	suit:"clubs",
 	cardImage:"images/cards/jack-of-clubs.png",
 },
 {
 	rank:"jack",
 	suit:"spades",
 	cardImage:"images/cards/jack-of-spades.png",
 },
 {
	rank:"10",
 	suit:"clubs",
 	cardImage:"images/cards/10-of-clubs.png",
 },
 {
	rank:"10",
 	suit:"spades",
 	cardImage:"images/cards/10-of-spades.png",
 },
 {
	rank:"9",
 	suit:"clubs",
 	cardImage:"images/cards/9-of-clubs.png",
 },
 {
	rank:"9",
 	suit:"spades",
 	cardImage:"images/cards/9-of-spades.png",
 },
 {
	rank:"8",
 	suit:"clubs",
 	cardImage:"images/cards/8-of-clubs.png",
 },
 {
	rank:"8",
 	suit:"spades",
 	cardImage:"images/cards/8-of-spades.png",
 },
 {
	rank:"7",
 	suit:"clubs",
 	cardImage:"images/cards/7-of-clubs.png",
 },
 {
	rank:"7",
 	suit:"spades",
 	cardImage:"images/cards/7-of-spades.png",
 },
 {
	rank:"6",
 	suit:"clubs",
 	cardImage:"images/cards/6-of-clubs.png",
 },
 {
	rank:"6",
 	suit:"spades",
 	cardImage:"images/cards/6-of-spades.png",
 },
 {
	rank:"5",
 	suit:"spades",
 	cardImage:"images/cards/5-of-spades.png",
 },
 {
	rank:"5",
 	suit:"clubs",
 	cardImage:"images/cards/5-of-clubs.png",
 }
 ];

 var cardsInPlay = [];
 var cardAmount = cards.length;
 var scoreString = parseInt(document.getElementById('scoredisplay').innerHTML);

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


 /* Get random integers (MDN Sourced)

 var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
console.log (getRandomInt(0, cardAmount));
*/