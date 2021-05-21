/* eslint-disable no-mixed-spaces-and-tabs */
import { Client, ClientOptions } from 'discord.js'
import { CarbonDB } from './db/base'

interface CarbonClientOptions extends ClientOptions {
	db: CarbonDB
}

export class CarbonClient extends Client {
	db: CarbonDB

	/**
	 * @param options Options for the client
	 */
	constructor(options: CarbonClientOptions) {
	    super(options)

	    this.db = options.db

	    return this
	}
}

export const client = new Client({
    intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_INTEGRATIONS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES']
}) // temporary as a new'd CarbonClient isnt exported yet