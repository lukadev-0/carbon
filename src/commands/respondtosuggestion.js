const client = require('../client')
const { MessageEmbed, Message } = require('discord.js')
const { update, post } = require('../interactionHandler')

module.exports = async (int) => {
	await post(int, 'Responding...')
	const guild = await client.guilds.fetch(int.guild_id)
	const user = await guild.members.fetch(int.member.user.id)
	if (
		user.roles.cache.some((role) =>
			role.name.toLowerCase().match(/moderator|owner/gi)
		)
	) {
		const channel = await client.channels.fetch('808741885975068682')
		const message = await channel.messages.fetch(int.data.options[0].value)
		const embeds = await message.embeds
		const embed = embeds[0]
		embed.addField(
			`${user.user.tag}: ${int.data.options[1].value}`,
			int.data.options[2].value,
			false
		)
		await message.edit(embed)

		update(int, 'Successfuly responded')
		const toDM = await client.users.fetch(embed.footer.text)
		const embed2 = new MessageEmbed()
			.setColor('GREEN')
			.setAuthor(
				user.user.tag,
				user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })
			)
			.setTitle('Responded to your suggestion')
			.setDescription(
				`Replied with: \n${int.data.options[2].value}\n[Go to suggestion](https://discord.com/channels/${int.guild_id}/${message.channel.id}/${message.id})`
			)
			.addField('Status: ', int.data.options[1].value)
		toDM.send(embed2).catch((erro) => {
			console.log(erro.message)
		})
	} else {
		update(int, "You're not a moderator or the owner!")
	}
}
