import { hi, lol } from '../index'

describe('hi', () => {
    test('it returns lol', () => {
        expect(hi()).toBe('lol')
    })
})

describe('lol', () => {
    test('it returns what i give it', () => {
        expect(lol('hello')).toBe('hello')
    })
})
