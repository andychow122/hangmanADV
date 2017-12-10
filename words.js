var letter = require('./letters.js');
var isLetter = require("is-letter");

function Word(word){
	this.word = word;
	this.blanks = word.length; //how long is the word
    this.letters = [];
    this.wrongGuesses = [];
    this.invalid = 0;
    this.incorrect = 1;
    this.correct = 2;
    for (var i = 0; i < this.word.length; i++) {
        this.letters.push(new letter.Letter(this.word[i]));
    }
}

Word.prototype.printWord = function() {
	var thisWord = "";
	for (var i = 0; i < this.word.length; i++) {
		thisWord += this.letters[i].showLetter();
	}
	return thisWord;
}

Word.prototype.checkLetters = function(answer) {
	if (!isLetter(answer)){
		console.log("This is not a valid guess");
		return this.invalid;
	}else if (this.wrongGuesses.indexOf(answer) === -1) {
		var isPresent = false;
		for (var i = 0; i < this.word.length; i++){
			if (this.letters[i].letter === answer){
				isPresent = true;
				this.letters[i].show = true;
			}
		}
		if (!isPresent) {
			this.wrongGuesses.push(answer);
			return this.incorrect;
		}else {
			return this.correct;
		}
	}else {
		return this.invalid;
	}
}

Word.prototype.isComplete = function() {
	for (var i=0; i < this.word.length; i++){
		if (!this.letters[i].show){
			return false;
		}
	}
	return true;
}

Word.prototype.printGuesses = function() {
	thisWrongGuesses = "";
	for (var i = 0; i < this.wrongGuesses.length; i++) {
		thisWrongGuesses += this.wrongGuesses[i] + " ";
	}
	return thisWrongGuesses;
}

module.exports = {
	Word
};