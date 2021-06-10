export function hi(): string {
    return 'lol'
}

export function lol<T>(arg: T): T {
    return arg
}