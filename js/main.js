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

 if (cardsInPlay.length === 2) {
 	console.log("checking for match");
 	if (cardsInPlay[0] === cardsInPlay[1]) {
 		alert("Score! You found a match!");
 	} else {
 		alert("Try Again.");
 	}
 }