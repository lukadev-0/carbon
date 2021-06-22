export { Client } from './client'
export { CarbonError, CarbonErrorType } from './util/CarbonError'
import { interactionHandler, defaults } from '@carbon-js/interactions'
import { client } from './client'

client.on('interaction', interactionHandler)

client.registerCommands({ commands: defaults() })

client.login('ODI1NDgwMjY0NzkxNzUyNzA0.YF-iZw.jVvDaKpMSerwRC5B6pN_sVFnaEk')