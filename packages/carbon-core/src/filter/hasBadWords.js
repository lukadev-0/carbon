let regExArray = [];
require("node-fetch")("https://raw.githubusercontent.com/mogade/badwords/master/en.txt")
	.then(res => res.text())
	.then(data => regExArray = data.split("\n"))

module.exports = function hasBadWords(content) {
	return regExArray.some(str =>
		content.match(new RegExp(str, "gi"))
	);
}
