import * as discord from 'discord.js'
import { logger } from './logger'
import { Command } from '@carbon-js/interactions'

export interface Client {
    interactions: Command[]
}

export class Client extends discord.Client {
    constructor(options: discord.ClientOptions) {
        super(options)
    }

    /**
     * Creates a mock client
     * @internal
     */
    static _mock(options?: Partial<discord.ClientOptions>): Client {
        return new this({
            intents: [],
            ...options,
        })
    }
}

export const client = new Client({
    intents: [ discord.Intents.ALL ], //temporary
})

client.on('ready', () => {logger.info(`Logged in as ${client.user!.tag}!`)})
client.on('debug', m => {logger.debug(m)})
client.on('warn', m => {logger.warn(m)})
client.on('error', m => {logger.error(m)})