const { MessageEmbed, Message } = require('discord.js')
const client = require('./client')

/**
 * @param {Message} message
 * @param {Message} newMsg
 */

module.exports.chathistory = async (message, newMsg) => {
	const logs = await client.channels.fetch(process.env.CHAT_HISTORY);
	const embed = new MessageEmbed().setAuthor(
		message.author.tag,
		message.author.displayAvatarURL({
			format: 'png',
			dynamic: true,
			size: 4096,
		})
	)
	if (message.deleted) {
		embed.setTitle('Deleted message.')
	} else {
		embed.setTitle('A message has been edited.')
	}
	embed.setColor('GREEN')
	if (newMsg) {
		embed.setDescription(
			`SentBy: ${message.author.toString()}\nMessageID: ${
				message.id
			}\nOldMessageContent:\n${message.content}\nNewMessageContent: \n${
				newMsg.content
			}\n[Go to message](${message.url})`
		)
	} else {
		embed.setDescription(
			`SentBy: ${message.author.toString()}\nMessageID: ${
				message.id
			}\nMessageContent:\n${message.content}`
		)
	}
	logs.send(embed)
}
