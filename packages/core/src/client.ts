import * as discord from 'discord.js'
import { logger } from './logger'
import { Command } from '@carbon-js/interactions'
import { CarbonError, CarbonErrorType } from './util/CarbonError'
import { isDeepStrictEqual } from 'util'

export class Client extends discord.Client {
    public interactions: Command[] = []
    constructor(options: discord.ClientOptions) {
        super(options)
    }

    /**
     * Creates a mock client
     * @private
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
    async registerCommands(params: { commands: Command[], guildId?: discord.Snowflake, overwrite?: boolean }): Promise<this> {
        params.overwrite ??= true
        const { commands, guildId, overwrite } = params
        if (!commands) throw new CarbonError(CarbonErrorType.MissingParam, `commands expected type Command[], got ${typeof commands}`)
        if (!this.application?.commands) await this.application?.fetch()
        const location = guildId ? (await this.guilds.fetch(guildId)).commands : this.application?.commands
        if (!location) throw new CarbonError(CarbonErrorType.MissingInstance, 'The CommandManager couldn\'t be found.')
        const properCommands = commands.map(async (v) => {
            this.cacheCommands({ commands })
            const toReturn = {
                name: v.name,
                description: v.description,
                options: v.options,
                defaultPermission: v.defaultPermission,
            }
            const found = location.cache.find((c) => c.name === v.name) ?? (await location.fetch()).find((c) => c.name === v.name)
            if (isDeepStrictEqual(toReturn, found)) return null
            return toReturn
        }).filter((v) => v) // removes null stuff
        overwrite
            ? location.set(await (properCommands as unknown as Promise<discord.ApplicationCommandData[]>))
            : properCommands.map(async (v) => await location.create(await (v as Promise<discord.ApplicationCommandData>)))
        return this
    }

    /**
     * Allows you to cache your commands for Carbon's usage and not send a request to the Discord API.
     * @param params The cache options
     * @param params.commands The commands to cache
     * @private
     */

    cacheCommands(params: { commands: Command[] | Command }): this {
        const { commands } = params
        if (!commands) throw new CarbonError(CarbonErrorType.MissingParam, 'commands to cache not provided')
        const cache = (v: Command) => {
            const old = this.interactions.find((c) => c.name === v.name)
            if (old) this.uncacheCommand({ commands: old })
            this.interactions.push(v)
        }
        Array.isArray(commands)
            ? commands.map(cache)
            : cache(commands)
        return this
    }

    /**
     * Allows you to uncache commands from Carbon's usage.
     * @param params The uncacheCommand params
     * @param params.command The command to uncache
     * @private Only used for uncaching deleted commands, which can be done with removeCommands
     */

    uncacheCommand(params: { commands: discord.ApplicationCommand | Command | discord.ApplicationCommand[] | Command[] }): this {
        const { commands } = params
        if (!commands) throw new CarbonError(CarbonErrorType.MissingParam, 'commands to uncache not provided')
        const uncache = (command: discord.ApplicationCommand | Command) => {
            this.interactions.splice(this.interactions.findIndex((v) => v.name === command.name))
        }
        Array.isArray(commands)
            ? commands.map((v) => uncache(v))
            : uncache(commands)
        return this
    }

    /**
     * The function that allows you to remove commands
     * @param params The remove commands options
     * @param params.names If provided, will only remove commands with the specified name
     * @param params.guildId If provided, will delete commands from guild with the id provided
     */
    async removeCommands(params?: { names?: string[], guildId?: discord.Snowflake }): Promise<this> {
        const names = params?.names
        const guildId = params?.guildId
        if (!this.application?.commands) await this.application?.fetch()
        const location = guildId ? (await this.guilds.fetch(guildId)).commands : this.application?.commands
        if (!location) throw new CarbonError(CarbonErrorType.MissingInstance, 'The CommandManager couldn\'t be found.')
        names
            ? names?.map(async (n) => {
                n = n.toLowerCase()
                let cmd = location.cache.find((v) => v.name.toLowerCase() === n)
                if (!cmd) logger.warn(`Command ${n} couldn't be find in the cache, trying to fetch...`)
                cmd = (await location.fetch()).find((v) => v.name.toLowerCase() === n)
                if (!cmd) return logger.warn(`Command ${n} couldn't be fetcher or found in the cache. Aborting.`)
                this.uncacheCommand({ commands: cmd })
                location.delete(cmd)
            })
            : location.set([])
        return this
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