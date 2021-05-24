export interface CarbonModule<T> {
    /**
     * Unique name of the module
     */
    name: string

    /**
     * Human-friendly name of the module
     */
    displayName: string

    /**
     * Description of the module
     */
    description: string

    /**
     * Default config of the module
     */
    default: T

    /**
     * Whether or not this module is enabled when a
     * new guild is created
     */
    enabledByDefault: boolean
}

export interface Modules {
    report: CarbonModule<boolean>
}

export const modules = {
    report: {
        name: 'report',
        displayName: 'report',
        description: 'Allow users to report other users.',
        default: true,
        enabledByDefault: false,
    },
}
