import { Client, ClientOptions } from 'discord.js'
import { CarbonDB } from './db/base'

interface CarbonClientOptions extends ClientOptions {
    db: CarbonDB
}

export class CarbonClient extends Client {
    db: CarbonDB

    /**
     * @param options Options for the client
     */
    constructor(options: CarbonClientOptions) {
        super(options)

        this.db = options.db
    }
}