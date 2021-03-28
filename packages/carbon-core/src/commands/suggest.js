const { MessageEmbed } = require('discord.js')
const client = require('../client')
const { post, update } = require('../interactionHandler')

module.exports = async (int) => {
	await post(int, 'Suggesting...')
	try {
		const member = await client.users.fetch(int.member.user.id)
		const channel = await client.channels.fetch('808741885975068682')
		const embed = new MessageEmbed()
			.setTitle('Suggestion')
			.setAuthor(
				member.tag,
				member.displayAvatarURL({
					format: 'png',
					dynamic: true,
					size: 4096,
				})
			)
			.setColor('GREEN')
			.setDescription(int.data.options[0].value)
			.setFooter(member.id)
		await channel.send(embed)
		update(int, 'Successfuly send the suggestion')
	} catch (erro) {
		console.log(erro)
		post(int, 'Your suggestion has failed!')
	}
}
