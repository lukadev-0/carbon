import { ErrorMessageEmbed } from './ErrorMessageEmbed'

export enum CarbonErrorType {
    CommandNotFound = 'COMMAND_NOT_FOUND',
    CommandError = 'COMMAND_ERROR',
    ModuleNotEnabled = 'MODULE_NOT_ENABLED',
    InvalidPermission = 'INVALID_PERMISSION'
}

export class CarbonError extends Error {
    name = 'CarbonError'

    constructor(public code: CarbonErrorType, public message: string) {
        super()
    }

    embed(): ErrorMessageEmbed {
        return new ErrorMessageEmbed(this)
    }
}