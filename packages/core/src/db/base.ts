import { Snowflake } from "discord.js"

/**
 * A module
 */
export interface CarbonDBModule {
    name: string
    data: unknown
}

export type CarbonDBModuleRecord = Record<string, CarbonDBModule>

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
     * @param guildId the id of the guild
     * @param modules the modules to update
     */
    updateModule(
        guildId: Snowflake,
        modules: CarbonDBModuleRecord
    ): Promise<void>

    /**
     * remove a module
     * @param guildId the id of the guild
     * @param name the name of the module to update
     */
    removeModule(
        guildId: Snowflake,
        modules: CarbonDBModuleRecord
    ): Promise<void>

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
}
