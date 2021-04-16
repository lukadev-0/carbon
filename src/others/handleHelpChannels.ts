import { Collection, MessageEmbed, Message, TextChannel, Snowflake } from 'discord.js'

const {
	CATEGORY_FREE_ID,
	CATEGORY_TAKEN_ID,
	HELP_INACTIVITY_TIME,
	COOLDOWN_ID,
} = process.env

interface HelpSession {
	channel: TextChannel,
	timeout?: NodeJS.Timeout,
	initMessage: Message,
	infoMessage?: Message
}

const HELP_CATEGORIES = new Set([CATEGORY_FREE_ID, CATEGORY_TAKEN_ID])
const channels = new Collection<Snowflake, HelpSession>()

export async function handleMessage(message: Message) {
	const { author, channel, member } = message

	if (channel.type !== 'text') return

	const textChannel = channel as TextChannel

	if (!HELP_CATEGORIES.has(textChannel.parentID ?? undefined)) return

	try {
		// Check if channel is already claimed
		if (channels.has(channel.id)) {
			const session = channels.get(channel.id)!

			if (!session.timeout) return

			setSessionTimeout(session)
		} else {
			// Return if member has cooldown
			if (member!.roles.cache.has(COOLDOWN_ID!)) return

			const session: HelpSession = {
				channel,
				initMessage: message
			}

			channels.set(channel.id, session)

			const embed = new MessageEmbed()
				.setAuthor(
					member!.displayName,
					author.displayAvatarURL({ dynamic: true })
				)
				.setTitle('Channel Claimed')
				.setDescription(
					'This channel has been claimed\n' +
					'Use "/close" to close.'
				)
				.setFooter(
					`Automatically closes after ${Number(HELP_INACTIVITY_TIME) / 60000
					} minutes of inactivity`
				)

			const infoMessage = await message.reply(embed)

			await channel.setParent(CATEGORY_TAKEN_ID!)

			setSessionTimeout(session)

			session.infoMessage = infoMessage

			await message.pin()
			await member!.roles.add(COOLDOWN_ID!)
		}
	} catch (e) {
		channels.delete(channel.id)

		channel
			.send(':x: An error occurred```' + e.message + '```', { split: true })
			.catch(console.log)
	}
}

function setSessionTimeout(session: HelpSession) {
	if (session.timeout) clearTimeout(session.timeout)

	session.timeout = setTimeout(
		() => closeSession(session),
		Number(HELP_INACTIVITY_TIME)
	)
}

async function closeSession(session: HelpSession) {
	const { infoMessage, initMessage, channel } = session

	channels.delete(channel.id)

	if (!initMessage.deleted) await initMessage.unpin()

	if (infoMessage && !infoMessage.deleted)
		await infoMessage.edit('*Closed*', {
			embed: null
		})

	await channel.setParent(CATEGORY_FREE_ID!)

	// run both at the same time
	await Promise.all([
		channel.send({
			embed: {
				title: 'Free Channel',
				description: 'Send a message to claim this channel',
			}
		}),

		initMessage.member!.roles.remove(COOLDOWN_ID!)
	])
}

