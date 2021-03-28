const { inspect } = require('util')
const { post, update, followUp } = require('../interactionHandler')
const { Util } = require('discord.js')

const zwsp = String.fromCharCode(8203)
const clean = (text) =>
	typeof text === 'string'
		? text.replace(/`/g, '`' + zwsp).replace(/@/g, '@' + zwsp)
		: text

module.exports = async (int) => {
	await post(int, 'Running...')
	if (int.member.user.id !== process.env.OWNER_ID)
		return update(int, "You're not the owner!")

	try {
		let evaled = eval(int.data.options[0].value)
		if (typeof evaled !== 'string') evaled = inspect(evaled)
		await update(int, 'Successfully evaluated')
		for (const code of Util.splitMessage(evaled)) {
			await followUp(int, `\`\`\`js\n${code}\`\`\``)
		}
	} catch (err) {
		await update(int, 'An error has occured!')
		for (const code of Util.splitMessage(clean(err))) {
			followUp(int, `\`\`\`js\n${code}\`\`\``)
		}
	}
}
