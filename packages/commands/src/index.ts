import { hi, lol } from '@carbon-js/core'

export function commands(): string {
    return lol(hi() + ' yes')
}
