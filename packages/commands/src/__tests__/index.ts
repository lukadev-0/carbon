import { commands } from '../index'

test('it returns lol yes', () => {
    expect(commands()).toBe('lol yes')
})
