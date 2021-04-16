import { Client, Intents } from 'discord.js'

export const client = new Client({
	ws: {
		intents: new Intents(Intents.ALL & ~(1 << 8)),
	},
})
