require('./others/ExtendedMessage') // inline replies
const { Collection } = require('discord.js')
const client = require('./client')
client.commands = new Collection()
const filter = require('./filter')
const createWelcomeImage = require('./others/createWelcomeImage')
const { handleHelpChannels } = require('./others/handleHelpChannels')
const reactionRoles = require('./others/reactionRoles')
const { chathistory } = require('./others/chathistory')

client.on('ready', async () => {
	require('./others/slashcreator')
	console.log(`Logged in as ${client.user.tag}`)
	client.user.setActivity('https://daimond113.com', {
		type: 'WATCHING',
	})
	const reactionRoleChannel = await client.channels.fetch(
		process.env.REACTION_ROLE_CHANNEL
	)
	reactionRoleChannel.messages.fetch()
})

client.on('messageReactionAdd', (reaction, user) => {
	if (user.bot) return
	reactionRoles(reaction, user, false)
})

client.on('messageReactionRemove', (reaction, user) => {
	if (user.bot) return
	reactionRoles(reaction, user, true)
})

client.on('guildMemberAdd', async (member) => {
	client.channels
		.fetch(process.env.WELCOME_CHANNEL)
		.then(async (channel) => channel.send(await createWelcomeImage(member)))
})

client.on('message', (message) => {
	if (message.author.bot) return
	filter(message)

	handleHelpChannels(message)
})

client.on('messageUpdate', (message, messageNew) => {
	if (message.author.bot) return
	filter(messageNew)
	if (message.content !== messageNew.content) {
		chathistory(message, messageNew)
	}
})

client.on('messageDelete', (message) => {
	if (message.author.bot) return
	chathistory(message)
})

const server = require('express')()
server.all('/', (_, res) => res.redirect(301, 'https://www.daimond113.com/#/'))
server.listen(3000)

client.login(process.env.TOKEN)
