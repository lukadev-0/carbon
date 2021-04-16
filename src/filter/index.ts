import { hasLinks } from './hasLinks'
import { hasBadWords } from './hasBadWords'
import { Message } from 'discord.js'

export async function filter(message: Message) {
	// check if message is in a guild channel (has member property)
	if (!message.member) return

	const {
		author,
		member: { roles },
		content,
	} = message

	if (author.bot) return

	const override = roles.cache.some((role) => (
		Boolean(role.name.match(/moderator|owner/gi)))
	)

	if (override) return

	if (await hasLinks(content))
		return message.delete()
			.then(() => message.author.send(
				':x: You have sent a blacklisted link!\n' +
				'If that is not the case please report a issue at\n' +
				'<https://github.com/daimond113/carbon/issues>'
			))
			.catch((e) => console.error(e))

	if (hasBadWords(content))
		return message.delete()
			.then(() => message.author.send(
				":x: I've detected a bad word in your message!\n" +
				'Please do not try to use bad words.\n' +
				'Feel like this is an issue?' +
				'Report it on <https://github.com/daimond113/carbon/issues>'
			))
			.catch((e) => console.log(e.message))
}

export async function isBad(content: string) {
	return await hasLinks(content) || hasBadWords(content)
}
