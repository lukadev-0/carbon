import { Snowflake } from 'discord.js'

/**
 * A module
 */
export interface CarbonDBModule {
    name: string
    data: unknown
}

export type CarbonDBModuleRecord = Record<string, unknown>

/**
 * A Guild
 */
export interface CarbonDBGuild {
    name: string
    modules: CarbonDBModuleRecord
}

/**
 * Database implementation
 */
export interface CarbonDB {
    /**
     * update all modules in the array, create it if it doesn't exist
     * @param guildId id of the guild
     * @param modules modules to update
     */
    updateOrCreateModule(
        guildId: Snowflake,
        modules: CarbonDBModuleRecord
    ): Promise<void>

    /**
     * remove a module
     * @param guildId id of the guild
     * @param name name of the module to update
     */
    removeModule(
        guildId: Snowflake,
        modules: CarbonDBModuleRecord
    ): Promise<void>

    /**
     * Fetch a module, return null if it doesn't exist
     * @param guildId id of the guild
     * @param module name of the module to fetch
     */
    fetchModule(
        guildId: Snowflake,
        module: string
    ): Promise<CarbonDBModule | null>

    /**
     * create guild
     * @param guildId id of the guild
     * @param data data
     */
    createGuild(guildId: Snowflake, data: CarbonDBGuild): Promise<void>

    /**
     * delete guild
     * @param guildId id of the guild
     */
    deleteGuild(guildId: Snowflake): Promise<void>

    /**
     * Fetch a guild, return null if it doesn't exist
     * @param guildId id of the guild
     */
    fetchGuild(guildId: Snowflake): Promise<CarbonDBGuild | null>
}
