import { hasBadWords, promise } from '../../src/filter/hasBadWords'

test('it returns true if there are bad words', async () => {
    await promise

    expect(hasBadWords('this is fucking bad.')).toBe(true)
})

test('it returns false if there are no bad words.', async () => {
    await promise

    expect(hasBadWords('this is good')).toBe(false)
})