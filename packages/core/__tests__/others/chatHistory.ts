/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextChannel } from 'discord.js'
import { chatHistory } from '../../src/others/chatHistory'
import { client } from '../../src/client'

const mockMessage = {
    content: 'hi',
    author: {
        toString: () => '<@Mock>',
        tag: 'Mock#0000',
        displayAvatarURL: () => 'https://mock',
    },
}

jest.mock('../../src/client')

const channels = client.channels as jest.Mocked<typeof client.channels>

test('it logs deleted messages', async () => {
    const send = jest.fn()

    channels.fetch.mockResolvedValue({
        send,
    } as unknown as TextChannel)

    await (chatHistory as any)({
        ...mockMessage,
        deleted: true,
    })

    expect(send.mock.calls.length).toBe(1)
})

test('it logs edited messages', async () => {
    const send = jest.fn()

    channels.fetch.mockResolvedValue({
        send,
    } as unknown as TextChannel)

    await (chatHistory as any)(mockMessage, {
        ...mockMessage,
        content: 'new',
    })

    expect(send.mock.calls.length).toBe(1)
})
