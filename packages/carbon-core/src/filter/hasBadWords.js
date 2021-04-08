let regExArray = [];
require("node-fetch")("https://raw.githubusercontent.com/mogade/badwords/master/en.txt")
	.then(res => res.text())
	.then(data => regExArray = data.split("\n"))

module.exports = function hasBadWords(content) {
	const contentWithNoWhitespace = content.replace(/\s/g, '')

	return regExArray.some(str =>
		contentWithNoWhitespace.match(new RegExp(str, "gi"))
	);
}
