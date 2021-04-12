require('./others/ExtendedMessage') // inline replies
const { Collection } = require('discord.js')
const client = require('./client')
client.commands = new Collection()
const { hasBadWords, hasLinks } = require('./filter')
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

function filter(message) {
	const {
		author,
		member: { roles },
		content,
	} = message

	if (author.bot) return
	if (roles.cache.some((role) => role.name.match(/moderator|owner/gi)))
		return false

	if (hasLinks(content))
		return message
			.delete()
			.then(() =>
				message.author
					.send(
						`:x: You have sent a blacklisted link!\nIf that is not the case please report a issue at\n<https://github.com/daimond113/carbon/issues>`
					)
					.catch((e) => console.log(e.message))
			)
			.catch((e) => console.log(e.message))

	if (hasBadWords(content))
		return message
			.delete()
			.then(() =>
				message.author
					.send(
						`:x: I've detected a bad word in your message!\nPlease do not try to use bad words.\nFeel like this is an issue? Report it on <https://github.com/daimond113/carbon/issues>`
					)
					.catch((e) => console.log(e.message))
			)
			.catch((e) => console.log(e.message))
}

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
