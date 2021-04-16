import './others/ExtendedMessage' // Inline replies
import './others/server' // Web server

import { TextChannel, Message, User } from 'discord.js'
import { client } from './client'
import { filter } from './filter'
import { createWelcomeImage } from './others/createWelcomeImage'
import { handleMessage as handleHelpMessage } from './others/handleHelpChannels'
import { handleReaction } from './others/reactionRoles'
import { chatHistory } from './others/chatHistory'

client.on('ready', async () => {
	await import('./others/slashCreator')

	console.log(`Logged in as ${client.user!.tag}`)

	client.user!.setActivity('https://daimond113.com', {
		type: 'WATCHING',
	})

	const reactionRoleChannel = await client.channels.fetch(
		process.env.REACTION_ROLE_CHANNEL!
	) as TextChannel

	reactionRoleChannel.messages.fetch()
})

client.on('messageReactionAdd', (reaction, user) => {
	if (user.bot) return

	handleReaction(reaction, user as User, 'add')
})

client.on('messageReactionRemove', (reaction, user) => {
	if (user.bot) return

	handleReaction(reaction, user as User, 'delete')
})

client.on('guildMemberAdd', async (member) => {
	client.channels
		.fetch(process.env.WELCOME_CHANNEL!)
		.then(async (channel) => (
			(channel as TextChannel).send(await createWelcomeImage(member))
		))
})

client.on('message', async (message) => {
	if (message.author.bot) return

	await filter(message)

	handleHelpMessage(message)
})

client.on('messageUpdate', async (message, messageNew) => {
	if (message.author?.bot) return

	await filter(messageNew as Message)

	if (message.content !== messageNew.content) {
		chatHistory(message as Message, messageNew as Message)
	}
})

client.on('messageDelete', (message) => {
	if (message.author?.bot) return

	chatHistory(message as Message)
})

client.login(process.env.TOKEN!)
