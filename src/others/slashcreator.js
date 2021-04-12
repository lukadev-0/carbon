const {
	Client: InteractionsClient,
	Integration,
} = require('discord-interactive-core')
const { readdirSync } = require('fs')
const { join } = require('path')
const client = require('../client')
const {
	token: TOKEN,
	user: { id: applicationId },
} = require('../client')
const { GUILD } = process.env
const integration = new Integration()
const interactionsClient = new InteractionsClient({
	applicationId: applicationId,
	authToken: `Bot ${TOKEN}`,
	integration,
})
const commandsLocation = join(__dirname, '..', 'commands')
const commandFiles = readdirSync(commandsLocation).filter((file) =>
	file.endsWith('.js')
)
for (const file of commandFiles) {
	interactionsClient.commands
		.guild(GUILD)
		.register(require(`${commandsLocation}/${file}`))
}

interactionsClient.commands.guild(GUILD).update()

client.ws.on('INTERACTION_CREATE', (data) => {
	integration.emit('interaction-receive', data)
})
