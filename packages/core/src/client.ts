import * as discord from 'discord.js'
import { logger } from './logger'
import { Command } from '@carbon-js/interactions'
import { CarbonError, CarbonErrorType } from './util/CarbonError'

export interface Client {
    interactions: Command[]
}

export class Client extends discord.Client {
    public interactions: Command[] = []
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

    /**
     * The function that allows you to register commands
     * @param params The register commands options
     * @param params.commands The array of Commands
     * @param params.guildId If provided, will register commands in a guild with that id
     */
    async registerCommands(params: { commands: Command[], guildId?: discord.Snowflake }): Promise<void> {
        const { commands, guildId } = params
        if (!commands) throw new CarbonError(CarbonErrorType.MissingParam, `commands expected type Command[], got ${typeof commands}`)
        if (!this.application?.commands) await this.application?.fetch()
        const location = guildId ? (await this.guilds.fetch(guildId)).commands : this.application?.commands
        if (!location) throw new CarbonError(CarbonErrorType.MissingInstance, 'The CommandManager couldn\'t be found.')
        commands.map((v) => {
            this.interactions.push(v)
            location?.add({
                name: v.name,
                description: v.description,
                options: v.options,
                defaultPermission: v.defaultPermission,
            })
        })
    }

    /**
     * The function that allows you to remove commands
     * @param params The remove commands options
     * @param params.names If provided, will only remove commands with the specified name
     * @param params.guildId If provided, will delete commands from guild with the id provided
     */
    async removeCommands(params?: { names?: string[], guildId?: discord.Snowflake }): Promise<void> {
        const names = params?.names
        const guildId = params?.guildId
        if (!this.application?.commands) await this.application?.fetch()
        const location = guildId ? (await this.guilds.fetch(guildId)).commands : this.application?.commands
        if (!location) throw new CarbonError(CarbonErrorType.MissingInstance, 'The CommandManager couldn\'t be found.')
        names ? names?.map((n) => {
            const cmd = location.cache.find((v) => v.name === n)
            if (!cmd) return logger.warn(`Command ${n} couldn't be find in the cache`)
            this.application?.commands.delete(cmd)
        }) : this.application?.commands.set([])
    }
}

export const client = new Client({
    intents: [ discord.Intents.ALL ], //temporary
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.toString()}`)
})
client.on('debug', m => {logger.debug(m)})
client.on('warn', m => {logger.warn(m)})
client.on('error', m => {logger.error(m)})