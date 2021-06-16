import { createLogger, transports, format, config } from 'winston'
import { redBright, keyword, greenBright, yellowBright } from 'chalk'

const errorColors = {
    error: redBright,
    info: greenBright,
    debug: yellowBright,
    warn: keyword('orange'),
}

const customLevels: config.AbstractConfigSetLevels = { error: 0, warn: 1, debug: 2, info: 3 }

/**
 * Carbon Logger
 */

export const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
        }),
        new transports.File({ filename: 'log' }),
    ],
    format: format.printf(log => `${errorColors[log.level as keyof typeof errorColors](`[${log.level.toUpperCase()}]`)} - ${log.message}`),
    levels: customLevels,
})


process.on('uncaughtException', error => logger.error(error))