import { hasLinks } from '../../src/filter/hasLinks'

test('it returns false if there are no links', async () => {
    expect(await hasLinks('Hello, this string has no links.')).toBe(false)
})

test('it returns false if there is a whitelisted link', async () => {
    expect(await hasLinks('https://github.com/')).toBe(false)
})

test('it returns true if there is a other link', async () => {
    expect(await hasLinks('https://discord.gg/')).toBe(true)
})

test("it returns true if the link's a redirect to other non whitelisted link", async () =>
    expect(await hasLinks('https://tinyurl.com/discordinviteforjest')).toBe(true))

test("it returns false if the link's a redirect to other whitelisted link", async () =>
    expect(await hasLinks('https://tinyurl.com/githublinkforjest')).toBe(false))
