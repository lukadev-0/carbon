const { MessageReaction } = require('discord.js')
/**
 * @param {MessageReaction} reaction
 */

module.exports = async function (reaction, user, deleted) {
	const {
		message: { guild, channel },
		emoji,
	} = reaction

	if (channel.id !== process.env.REACTION_ROLE_CHANNEL) return
	const { roles } = await guild.members.fetch(user.id)

	let role
	switch (emoji.name) {
		case '😎':
			role = await guild.roles.fetch('810641538585067520')
			break
		default:
			break
	}
	if (!role) return

	try {
		if (deleted) roles.remove(role)
		else roles.add(role)
	} catch (e) {
		console.log(e.message)
	}
}
