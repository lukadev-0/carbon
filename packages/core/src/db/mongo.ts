import {
    CarbonDB,
    CarbonDBModuleRecord,
    CarbonDBGuild,
    CarbonDBModule,
} from './base'
import { Collection } from 'mongodb'
import { Snowflake } from 'discord.js'

interface CarbonMongoDBGuild extends CarbonDBGuild {
    _id: string
}

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
    constructor(public collection: Collection<CarbonMongoDBGuild>) {}

    async updateOrCreateModule(
        guildId: Snowflake,
        modules: CarbonDBModuleRecord,
    ): Promise<void> {
        await this.collection.updateOne(
            {
                _id: guildId,
            },
            {
                $set: toDotNotation(modules, 'modules'),
            },
        )
    }

    async removeModule(
        guildId: Snowflake,
        modules: CarbonDBModuleRecord,
    ): Promise<void> {
        const unset: Record<string, true> = {}
        for (const key in modules) {
            unset[key] = true
        }

        await this.collection.updateOne(
            {
                _id: guildId,
            },
            {
                $unset: unset,
            },
        )
    }

    async fetchModule(
        guildId: Snowflake,
        module: string,
    ): Promise<CarbonDBModule | null> {
        return {
            data: await this.collection.findOne(
                {
                    _id: guildId,
                },
                {
                    projection: {
                        [`modules.${module}`]: 1,
                    },
                },
            ),
            name: module,
        }
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

    fetchGuild(guildId: Snowflake): Promise<CarbonDBGuild | null> {
        return this.collection.findOne(
            {
                _id: guildId,
            },
            {
                projection: {
                    _id: 0,
                },
            },
        )
    }
}
