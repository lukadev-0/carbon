export { Client } from './client'
export { CarbonError, CarbonErrorType } from './util/CarbonError'
import { interactionHandler, defaults } from '../../interactions/dist'
import { client } from './client'

client.on('interaction', interactionHandler)

client.registerCommands({ commands: defaults() })

client.removeCommands()

client.login('')