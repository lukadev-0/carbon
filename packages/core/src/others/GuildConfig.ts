import { Guild } from 'discord.js'

export class GuildConfig {
    constructor(public guild: Guild) {}

    async get(module: string): Promise<unknown | null> {
        const fetchedModule = await this.guild.client.db.fetchModule(
            this.guild.id,
            module,
        )

        return fetchedModule?.data ?? null
    }
}
