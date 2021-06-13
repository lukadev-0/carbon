import { ErrorMessageEmbed } from './ErrorMessageEmbed'

/**
 * Carbon Error Types
 */

export enum CarbonErrorType {
    CommandNotFound = 'COMMAND_NOT_FOUND',
    CommandError = 'COMMAND_ERROR',
    ModuleNotEnabled = 'MODULE_NOT_ENABLED',
    InvalidPermission = 'INVALID_PERMISSION'
}

/**
 * Represents a Carbon Error
 */
export class CarbonError extends Error {
    name = 'CarbonError'

    constructor(public code: CarbonErrorType, public message: string) {
        super()
    }
    /**
     * @returns A MessageEmbed representing this error
     */
    embed(): ErrorMessageEmbed {
        return new ErrorMessageEmbed(this)
    }
}