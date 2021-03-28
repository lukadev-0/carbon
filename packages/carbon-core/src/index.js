require('dotenv').config()
require('./ExtendedMessage') // inline replies
const { Collection } = require('discord.js')
const client = require('./client')
client.commands = new Collection()
const { join, parse } = require('path')
const { readdirSync } = require('fs')
const commandsLocation = join(__dirname, 'commands')
const commandFiles = readdirSync(commandsLocation).filter((file) =>
	file.endsWith('.js')
)
const { hasBadWords, hasLinks } = require('./filter')
const createWelcomeImage = require('./createWelcomeImage')
const { handleHelpChannels } = require('./handleHelpChannels')
const reactionRoles = require('./reactionRoles')

for (const file of commandFiles) {
	const command = require(`${commandsLocation}/${file}`)
	client.commands.set(parse(`${commandsLocation}/${file}`).name, command)
}

client.on('ready', async () => {
	require('./slashcreator')
	console.log(`Logged in as ${client.user.tag}`)
	client.user.setActivity('https://daimond113.com', {
		type: 'WATCHING',
	})
	const reactionRoleChannel = await client.channels.fetch(
		process.env.REACTION_ROLE_CHANNEL
	)
	reactionRoleChannel.messages.fetch()
})

client.ws.on('INTERACTION_CREATE', (int) => {
	client.commands.get(int.data.name.toLowerCase())(int)
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
	const { author, channel, content } = message

	if (author.bot) return

	if (hasLinks(message))
		return message
			.delete()
			.then(() =>
				channel.send(
					`<@${author.id}>\n:x: You have sent a blacklisted link!\nIf that is not the case please report a issue at\n<https://github.com/daimond113/carbon/issues>`
				)
			)
			.catch((e) => console.log(e.message))

	if (hasBadWords(content))
		return message
			.delete()
			.then(() =>
				channel.send(
					`<@${author.id}>\n:x: I've detected a bad word in your message!\nPlease do not try to use bad words.\nFeel like this is an issue? Report it on <https://github.com/daimond113/carbon/issues>`
				)
			)
			.catch((e) => console.log(e.message))
}

client.on('message', (message) => {
	if (message.author.bot) return
	filter(message)

	handleHelpChannels(message)
})

client.on('messageUpdate', (_, message) => {
	if (message.author.bot) return
	filter(message)
})

const server = require('express')()
server.all('/', (_, res) => res.redirect(301, 'https://www.daimond113.com/#/'))
server.listen(3000)

client.login(process.env.TOKEN)
