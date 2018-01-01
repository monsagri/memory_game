console.log("Up and running!");

 var cards = [ {
 	rank:"queen",
 	suit:"diamonds",
 	cardImage:"images/queen-of-diamonds.jpg",
 },
 {
 	rank:"queen",
 	suit:"hearts",
 	cardImage:"images/queen-of-hearts.jpg",
 },
 {
 	rank:"king",
 	suit:"diamonds",
 	cardImage:"images/king-of-diamonds.jpg",
 },
 {
 	rank:"king",
 	suit:"hearts",
 	cardImage:"images/king-of-hearts.jpg",
 }
 ];
 var cardsInPlay = [];

 	// Check if cards match and empty the array after checking
var checkForMatch = function() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		console.log("You found a match!");
		cardsInPlay = [];
	} else {
		console.log("Sorry, try again.");
		cardsInPlay = [];
	}
}

 // flipping Cards 
var flipCard = function(cardId) {
	var cardOne;
 	var cardTwo;
 	console.log("Player flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
 	cardsInPlay.push(cards[cardId].rank);
 	if (cardsInPlay.length === 2) {
 		checkForMatch();
 	};	
};

flipCard(0);
flipCard(2);

//Enter highscores into table
var scores = [];
	for (i = 0;i <= 4;i++)
		scores.push(parseInt(document.getElementById('score'+ i).innerHTML));

var scoreentry = prompt("Enter your score please");
var score = parseInt(scoreentry);

// Check for highscore using if
	if ( score > scores[0]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player0').innerHTML = player;
		document.getElementById('score0').innerHTML = score;
	} else if (score > scores[1]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player1').innerHTML = player;
		document.getElementById('score1').innerHTML = score;
	} else if ( score > scores[2]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player2').innerHTML = player;
		document.getElementById('score2').innerHTML = score;
	} else if ( score > scores[3]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player3').innerHTML = player;
		document.getElementById('score3').innerHTML = score;
	}else if ( score > scores [4]) {
		var player = prompt("Congratulations! Enter your name for the Board!");
		document.getElementById('player4').innerHTML = player;
		document.getElementById('score4').innerHTML = score;
	} else {
		alert("Better luck next time!");
	}
  
