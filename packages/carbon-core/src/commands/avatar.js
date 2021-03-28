const { MessageEmbed } = require('discord.js')
const { post, update } = require('../interactionHandler')
const client = require('../client')

module.exports = async (int) => {
	await post(int, 'Getting the avatar')
	const user = await client.users.fetch(int.data.options[0].value)
	const avatar = user.displayAvatarURL({
		format: 'png',
		dynamic: true,
		size: 4096,
	})
	const embed = new MessageEmbed()
		.setTitle(`${user.username}'s avatar!`)
		.setColor('RANDOM')
		.setImage(avatar)
	update(int, 'Got the avatar', embed)
}
