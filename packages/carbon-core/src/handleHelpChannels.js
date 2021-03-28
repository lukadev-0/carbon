const { Collection, MessageEmbed, Message } = require('discord.js')

const {
	CATEGORY_FREE_ID,
	CATEGORY_TAKEN_ID,
	HELP_INACTIVITY_TIME,
	COOLDOWN_ID,
} = process.env
const HELP_CATEGORIES = new Set([CATEGORY_FREE_ID, CATEGORY_TAKEN_ID])
const channels = new Collection()

async function handleMessage(message) {
	const { author, channel, member, guild } = message
	if (!HELP_CATEGORIES.has(channel.parentID)) return
	const COOLDOWN_ROLE = await guild.roles.fetch(COOLDOWN_ID)
	try {
		if (channels.has(channel.id)) {
			// Channel is claimed
			const helpChannel = channels.get(channel.id)

			if (!helpChannel.timeout) return

			clearTimeout(helpChannel.timeout)

			helpChannel.timeout = setTimeout(
				closeChannel,
				Number(HELP_INACTIVITY_TIME),
				channel
			)
		} else {
			if (member.roles.cache.has(COOLDOWN_ID)) return //help channel cooldown
			// Add channel to claimed
			channels.set(channel.id, { channel })

			const embed = new MessageEmbed()
				.setAuthor(
					member.displayName,
					author.displayAvatarURL({ dynamic: true })
				)
				.setTitle('Channel Claimed')
				.setDescription(`This channel has been claimed\nSay "/close" to close.`)
				.setFooter(
					`Automatically closes after ${
						Number(HELP_INACTIVITY_TIME) / 60000
					} minutes of inactivity`
				)

			const infoMessage = await message
				.reply(embed)
				.catch((e) => channels.delete(channel.id))

			channel.setParent(CATEGORY_TAKEN_ID).catch(console.log)

			channels.set(channel.id, {
				channel,
				timeout: setTimeout(
					closeChannel,
					Number(HELP_INACTIVITY_TIME),
					channel
				),
				originalMessage: message,
				infoMessage,
			})

			message.pin().catch(console.log)
			member.roles.add(COOLDOWN_ROLE)
		}
	} catch (e) {
		channel
			.send(':x: An error occurred```' + e.message + '```', { split: true })
			.catch(console.log)
	}
}

function closeChannel(channel) {
	const channelInfo = channels.get(channel.id)
	if (!channelInfo) return

	const { infoMessage, originalMessage } = channelInfo

	channels.delete(channel.id)

	if (!originalMessage.deleted) originalMessage.unpin().catch(console.log)

	if (!infoMessage.deleted)
		infoMessage.edit('*Closed*', { embed: null }).catch(console.log)

	channel.setParent(CATEGORY_FREE_ID).catch(console.log)

	channel.send({
		embed: {
			title: 'Free Channel',
			description: 'Send a message to claim this channel',
		},
	})
	originalMessage.member.roles.remove(COOLDOWN_ROLE)
}

function getChannelOwner(channel) {
	const channelInfo = channels.get(channel.id)
	if (!channelInfo) return
	return channelInfo.originalMessage.member.id
}

module.exports = {
	handleHelpChannels: handleMessage,
	closeChannel,
	getChannelOwner,
}
