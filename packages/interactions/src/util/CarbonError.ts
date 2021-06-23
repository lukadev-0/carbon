import { ErrorMessageEmbed } from './ErrorMessageEmbed'

/**
 * Carbon Error Types
 */

export enum CarbonErrorType {
    CommandNotFound = 'COMMAND_NOT_FOUND',
    CommandError = 'COMMAND_ERROR',
    InvalidPermission = 'INVALID_PERMISSION',
    MissingParam = 'MISSING_PARAMETER',
    MissingInstance = 'MISSING_INSTANCE'
}

/**
 * Represents a Carbon Interactions Error
 */
export class CarbonError extends Error {
    name = 'CarbonInteractionsError'
    /**
     * @param code The error type
     * @param message The error message
     */

    constructor(public code: CarbonErrorType, public message: string = code) {
        super()
    }
    /**
     * @returns A MessageEmbed representing this error
     */
    embed(): ErrorMessageEmbed {
        return new ErrorMessageEmbed(this)
    }
}