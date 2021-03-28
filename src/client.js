const { Client, Intents } = require('discord.js')
const client = new Client({
	ws: {
		intents: new Intents(Intents.ALL & ~(1 << 8)),
	},
})

module.exports = client
