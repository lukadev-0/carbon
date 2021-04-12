let regExArray = []
require('axios').default
	.get('https://raw.githubusercontent.com/daimond113/badwords/master/en.txt')
	.then((res) => (regExArray = res.data
		.split('\n')
		.map(regex => new RegExp(regex, 'gi'))
	))

module.exports = function hasBadWords(content) {
	const noWhitespace = content.replace(/\s+/g, '') // Using "+" is more performant
	return regExArray.some((regex) => regex.test(noWhitespace))
}
