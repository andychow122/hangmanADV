var inquirer = require("inquirer");
var word = require("./words.js");

var words = [
	"potato",
	"science",
	"pencil",
	"cat",
	"twister",
	"carpet",
	"christmas",
	"chill",
	"love"
	];

function inquireStart() {
	inquirer.prompt({
		name: "start",
		message: "Would you like to play a game of hangmanADV? (y/n)"
	}).then(answer => {

		if (answer.start === 'y') {
			startGame();
		} else if (answer.start === 'n') {
			console.log("Maybe next time!");
			process.exit();
		} else {
			console.log("Failure to follow instructions.");
			inquireStart();
		}
	});
}
//start game!
function startGame() {
	var guessesLeft = 9;
	console.log("GAME HAS STARTED" + "\nTHE GAME IS HANGMAN." + "\nYOU HAVE 9 GUESSES TO WIN." + "\nGOOD LUCK" + "\n-------------------");
    var newWord = new word.Word(words[Math.floor(Math.random()*words.length)]);
	// console.log(newWord); showing object
	inquireGuess(newWord, guessesLeft);
	
}

function inquireGuess(newWord, guessesLeft) {
	console.log("Guesses Left: " + guessesLeft);
	console.log("Incorrect Guesses: " + newWord.printGuesses());
	console.log("Word: " + newWord.printWord());
	
	inquirer.prompt({
			name: "guess",
			message: "Please guess a letter."
		}).then(answer => {
			var res = newWord.checkLetters(answer.guess);
			if (res === newWord.incorrect){
				guessesLeft--;
				if (guessesLeft === 0) {
					console.log("Ouch, maybe you'll get it next time. The word was: " + newWord.word);
					inquireStart();
					return;
				}
			} else if (res === newWord.correct){
				if (newWord.isComplete()) {
					console.log("YOU WIN! The word was: " + newWord.word);
					inquireStart();
					return;
				}
			}
			inquireGuess(newWord, guessesLeft);
		});
}

function checkGuesses(guessesLeft) {

	
}

inquireStart();