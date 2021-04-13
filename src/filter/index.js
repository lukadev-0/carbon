const hasLinks = require('./hasLinks')
const hasBadWords = require('./hasBadWords')
const { Message } = require('discord.js')

/**
 * @param {Message} message
 */
module.exports = exports = function filter(message) {
	// check if message is in a guild channel (has member property)
	if (!message.member) return

	const {
		author,
		member: { roles },
		content,
	} = message

	if (author.bot) return
	if (roles.cache.some((role) => role.name.match(/moderator|owner/gi)))
		return false

	if (hasLinks(content))
		return message
			.delete()
			.then(() =>
				message.author
					.send(
						`:x: You have sent a blacklisted link!\nIf that is not the case please report a issue at\n<https://github.com/daimond113/carbon/issues>`
					)
					.catch((e) => console.log(e.message))
			)
			.catch((e) => console.log(e.message))

	if (hasBadWords(content))
		return message
			.delete()
			.then(() =>
				message.author
					.send(
						`:x: I've detected a bad word in your message!\nPlease do not try to use bad words.\nFeel like this is an issue? Report it on <https://github.com/daimond113/carbon/issues>`
					)
					.catch((e) => console.log(e.message))
			)
			.catch((e) => console.log(e.message))
}

exports.isBad = s => hasLinks(s) || hasBadWords(s)
