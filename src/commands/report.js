const client = require('../client.js')
const { update, post } = require('../interactionHandler.js')

module.exports = async (int) => {
	await post(int, 'Reporting...')
	try {
		const options = int.data.options
		const toReport = options[0].value
		const reason = options[1].value
		const reportChannel = await client.channels.fetch('808703338404249620')
		const guild = await client.guilds.fetch(int.guild_id)
		const user = await guild.members.fetch(toReport)
		if (int.member.user.id === toReport) {
			return update(int, 'You cannot report yourself')
		}
		if (
			user.roles.cache.some((role) =>
				role.name.toLowerCase().match(/moderator|owner/gi)
			)
		) {
			return update(int, 'You cannot report a moderator or the owner.')
		}
		await update(
			int,
			'Reporting...\nFun fact: abusing this command will get you banned'
		)
		update(int, `<@${int.member.user.id}>, successfuly reported <@${toReport}>`)
		reportChannel.send(
			`<@${int.member.user.id}> has reported <@${toReport}> for "${reason}"`
		)
	} catch (erro) {
		console.log(erro)
		update(int, 'Your report has failed!')
	}
}
