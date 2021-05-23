import { CarbonDB, CarbonDBModuleRecord, CarbonDBGuild } from './base'
import { Collection } from 'mongodb'
import { Snowflake } from 'discord.js'

function toDotNotation(object: Record<string, unknown>, prefix: string) {
    let result: Record<string, unknown> = {}

    for (const key in object) {
        const value = object[key]

        const newKey = `${prefix ? `${prefix}.` : ''}${key}`

        if (Object.prototype.toString.call(value) === '[object Object]') {
            result = {
                ...result,
                ...toDotNotation(value as Record<string, unknown>, newKey),
            }
        } else {
            result[newKey] = value
        }
    }

    return result
}

export class CarbonMongoDB implements CarbonDB {
    constructor(public collection: Collection) {}

    async updateModule(guildId: Snowflake, modules: CarbonDBModuleRecord): Promise<void> {
        await this.collection.updateOne(
            {
                _id: guildId,
            },
            {
                $set: toDotNotation(modules, 'modules'),
            },
        )
    }

    async removeModule(guildId: Snowflake, name: string): Promise<void> {
        await this.collection.updateOne(
            {
                _id: guildId,
            },
            {
                $unset: { [`modules.${name}`]: '' },
            },
        )
    }

    async createGuild(guildId: Snowflake, data: CarbonDBGuild): Promise<void> {
        await this.collection.insertOne({
            _id: guildId,
            ...data,
        })
    }

    async deleteGuild(guildId: Snowflake): Promise<void> {
        await this.collection.deleteOne({
            _id: guildId,
        })
    }
}
