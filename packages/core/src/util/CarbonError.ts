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
 * @deprecated
 * @private
 * @readonly
 */
export class CarbonError extends Error {
    name = 'CarbonError'
    /**
     * @param code The error type
     * @param message The error message
     */

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