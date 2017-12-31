console.log("Up and running!");

 var cards = ["queen","queen","king","king",];
 var cardsInPlay = [];
 var cardOne;
 var cardOne = cards[0];
 var cardTwo;
 cardsInPlay.push(cardOne);
 console.log("User flipped" + " " + cardOne);
 var cardTwo = cards[2];
 cardsInPlay.push(cardTwo);
  console.log("User flipped" + " " + cardTwo);

 /*if (cardsInPlay.length === 2) {
 	console.log("checking for match");
 	if (cardsInPlay[0] === cardsInPlay[1]) {
 		alert("Score! You found a match!");
 	} else {
 		alert("Try Again.");
 	}
 }
*/
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
  
/*Check if player beat a highscore using switch
	// There has to be a better way of doing this - functions?
	switch(score) {
		case score > scores[0]:
			console.log("checking 1st place");
			var player = prompt("Congratulations! Enter your name for the Board!");
			document.getElementById('player0').innerHTML = player;
			document.getElementById('score0').innerHTML = score;
			break;
		case score > scores[1]:
			console.log("checking 2nd place");
			var player = prompt("Congratulations! Enter your name for the Board!");
			document.getElementById('player1').innerHTML = player;
			document.getElementById('score1').innerHTML = score;
			break;
		case score > scores[2]:
			console.log("checking 3rd place");
			var player = prompt("Congratulations! Enter your name for the Board!");
			document.getElementById('player2').innerHTML = player;
			document.getElementById('score2').innerHTML = score;
			break;
		case score > scores[3]:
			console.log("checking 4th place");
			var player = prompt("Congratulations! Enter your name for the Board!");
			document.getElementById('player3').innerHTML = player;
			document.getElementById('score3').innerHTML = score;
			break;
		case score > scores[4]:
			console.log("checking 5th place");
			var player = prompt("Congratulations! Enter your name for the Board!");
			document.getElementById('player4').innerHTML = player;
			document.getElementById('score4').innerHTML = score;
			break;
		default: 
			alert("Better luck next time!");
	}
*/
//var score3 = document.getElementById('score3').innerHTML;
//var player = prompt("Congratulations! Enter your name for the Board!");
 //document.getElementById('player3').innerHTML = player
 //var score = 35;
// document.getElementById('score3').innerHTML = score;
 console.log(scores);
 console.log(score);
 console.log(scores[1]);
 console.log(typeof score);
 console.log(typeof scores[1]);
 console.log(score > scores[1]);
