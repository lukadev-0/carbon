import * as discord from 'discord.js'
import { Command } from './Command'

/**
 * options for {@link Client.registerCommand}
 * @public
 */
export interface RegisterCommandOptions {
    /**
     * command(s) to register
     */
    command: Command | Command[]

    /**
     * guild to register this command in, if omitted, a global command will be created instead.
     */
    guild?: discord.GuildResolvable

    /**
     * If true, all existing commands will be overwritten with the new commands.
     * If not, it will loop trough the array, and register the commands one by one.
     * 
     * If {@link RegisterCommandOptions.command | `command`} is not an array, this will be ignored.
     * 
     * This is `false` by default.
     */
    overwrite?: boolean
}

/**
 * An extended client
 * @public
 */
export class Client extends discord.Client {
    /**
     * collection of registered commands
     */
    commands = new discord.Collection<discord.Snowflake, Command>()

    /**
     * @param options - options for the client
     */
    constructor(options: discord.ClientOptions) {
        super(options)
    }

    /**
     * register/create one or multiple commands
     * @param command - command(s) to register
     * @param guild - guild to register this command in
     * 
     * @remarks
     * If `guild` is omitted, the command will be registered as a global command.
     * If `command` is an array, {@link RegisterCommandOptions.overwrite | `overwrite`} will be false.
     */
    registerCommand(
        command: Command | Command[],
        guild?: discord.GuildResolvable,
    ): Promise<void>

    /**
     * register/create one or multiple commands using an options object
     * 
     * @param options - options
     */
    registerCommand(
        options: RegisterCommandOptions,
    ): Promise<void>

    async registerCommand(
        commandOrOptions: Command | Command[] | RegisterCommandOptions,
        guild?: discord.GuildResolvable,
    ): Promise<void> {
        if (!commandOrOptions) throw new TypeError('Missing argument')

        if (Array.isArray(commandOrOptions)) {
            return this.registerCommand({
                command: commandOrOptions,
                guild,
            })
        }

        if (commandOrOptions instanceof Command) {
            return this.registerCommand({
                command: commandOrOptions,
                guild,
            })
        }

        if (typeof commandOrOptions === 'object') {
            const {
                guild,
                command,
                overwrite = false,
            } = commandOrOptions as RegisterCommandOptions

            const guildId = guild && (this.guilds.resolveID(guild) ?? undefined)

            if (guild && !guildId) throw new Error('Invalid guild')
            if (!this.application) throw new Error('No application')

            if (Array.isArray(command) && overwrite) {
                const newCommands = await this.application.commands.set(command, guildId)

                newCommands.forEach((currentCommand) => {
                    const foundCommand = command.find(
                        data => data.name === currentCommand.name,
                    )

                    if (!foundCommand)
                        throw new Error(`Failed to find command '${currentCommand.name}'`)

                    this.commands.set(currentCommand.id, foundCommand)
                })

                return
            }

            if (Array.isArray(command)) {
                for (const currentCommand of command) {
                    await this.application.commands.create(currentCommand, guildId)
                }

                return
            }

            await this.application.commands.create(command, guildId)

            return
        }

        throw new TypeError(
            'Expected first argument to be ' +
            'a command, an array of commands or an object. ' +
            `Received ${typeof commandOrOptions}`,
        )
    }

    /**
     * overwrites all commands with the `commands` array
     * 
     * @param commands - an array of commands
     * @param guild - guild to overwrite
     * 
     * @remarks
     * If `guild` is omitted, global commands will be overwritten instead.
     * 
     * This is equivalent to
     * ```js
     * client.registerCommand({
     *   command: commands,
     *   guild,
     *   overwrite: true,
     * })
     * ```
     * 
     * @example
     * Simple example:
     * ```js
     * const myCoolCommand = new Command({
     *   name: 'cool-command',
     *   description: 'This command is very cool',
     *   module: 'cool-module'
     * })
     * 
     * myCoolCommand.run = (interaction) => {
     *   interaction.editReply('yes its cool')
     * }
     * 
     * client.overwriteCommands([ myCoolCommand ])
     * ```
     * 
     * @example
     * Delete all commands:
     * ```js
     * client.overwriteCommands([])
     * ```
     */
    overwriteCommands(
        commands: Command[],
        guild?: discord.GuildResolvable,
    ): Promise<void> {
        return this.registerCommand({
            command: commands,
            guild,
            overwrite: true,
        })
    }

    /**
     * unregister/delete one or multiple commands
     * 
     * @param command - command(s) to unregister
     * @param guild - guild to unregister this command from
     * 
     * @remarks
     * This will delete each command one by one.
     * 
     * If you need to delete all commands in one API request,
     * see {@link Client.overwriteCommands | `overwriteCommands`}.
     */
    async unregisterCommand(
        command: discord.ApplicationCommandResolvable | discord.ApplicationCommandResolvable[],
        guild?: discord.GuildResolvable,
    ): Promise<void> {
        if (!this.application) throw new Error('No application')

        if (Array.isArray(command)) {
            for (const currentCommand of command) {
                await this.unregisterCommand(currentCommand, guild)
            }

            return
        }

        const guildId = guild && (this.guilds.resolveID(guild) ?? undefined)

        if (guild && !guildId) throw new Error('Invalid guild')

        await this.application.commands.delete(command, guildId)

        const commandId = this.application.commands.resolveID(command)

        if (!commandId) throw new Error('Invalid command')

        this.commands.delete(commandId)
    }
}