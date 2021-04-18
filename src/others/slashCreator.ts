import { Client as Interactive, Integration } from 'discord-interactive-core'
import { readdirSync } from 'fs'
import { join } from 'path'
import { client } from '../client'

// temporary integration
// i haven't published a official one yet
class MyIntegration extends Integration {
	constructor() {
		super()

			// 'INTERACTION_CREATE' is not a valid event
			; (client.ws.on as any)('INTERACTION_CREATE', (data: Object) => {
				this.emit('interaction-receive', data)
			})
	}

	interactionMiddleware() { }
}

const { GUILD } = process.env

const interactive = new Interactive({
	applicationId: client.user!.id,
	authToken: `Bot ${client.token}`,
	integration: new MyIntegration(),
})

const commandsLocation = join(__dirname, '../commands')

readdirSync(commandsLocation).forEach(async (file) => {
	if (file.endsWith('.js')) {
		const command = await import(join(commandsLocation, file))
		interactive.commands.guild(GUILD!).register(command.default)
	}
})

interactive.commands.guild(GUILD!).update()
