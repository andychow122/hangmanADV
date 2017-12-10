
function Letter(letter) {
    this.letter = letter;
    this.show = false;

}

Letter.prototype.showLetter = function() {
	if (this.show) {
		return this.letter;
	} else {
		return "_";
	}
}

module.exports = {
	Letter
};