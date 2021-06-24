import * as discord from 'discord.js'
import { logger } from './logger'
import { Command } from '@carbon-js/interactions'
import { CarbonError, CarbonErrorType } from './util/CarbonError'

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
     * @param params.overwrite RECOMMENDED If set to true will overwrite all commands to set them to commands provided
     */
    async registerCommands(params: { commands: Command[], guildId?: discord.Snowflake, overwrite?: boolean }): Promise<void> {
        params.overwrite ??= true
        const { commands, guildId, overwrite } = params
        if (!commands) throw new CarbonError(CarbonErrorType.MissingParam, `commands expected type Command[], got ${typeof commands}`)
        if (!this.application?.commands) await this.application?.fetch()
        const location = guildId ? (await this.guilds.fetch(guildId)).commands : this.application?.commands
        if (!location) throw new CarbonError(CarbonErrorType.MissingInstance, 'The CommandManager couldn\'t be found.')
        const properCommands = commands.map((v) => {
            this.interactions.push(v)
            return {
                name: v.name,
                description: v.description,
                options: v.options,
                defaultPermission: v.defaultPermission,
            }
        })
        overwrite ? location.set(properCommands) : properCommands.map(async (v) => await location.create(v))
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
        names ? names?.map(async (n) => {
            n = n.toLowerCase()
            let cmd = location.cache.find((v) => v.name.toLowerCase() === n)
            if (!cmd) logger.warn(`Command ${n} couldn't be find in the cache, trying to fetch...`)
            cmd = (await location.fetch()).find((v) => v.name.toLowerCase() === n)
            if (!cmd) return logger.warn(`Command ${n} couldn't be fetcher or found in the cache. Aborting.`)
            this.interactions.splice(this.interactions.findIndex((v) => v.name.toLowerCase() === cmd?.name), 1)
            location.delete(cmd)
        }) : location.set([])
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