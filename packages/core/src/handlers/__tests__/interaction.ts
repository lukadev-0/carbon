import { ApplicationCommand, CommandInteraction } from 'discord.js'
import { mocked } from 'ts-jest/utils'
import { handleInteraction } from '../interaction'
import { handleCommandInteraction } from '../interaction/command'
import { Client } from '../../client'
import { CarbonError, CarbonErrorType } from '../../util/CarbonError'
import { ErrorMessageEmbed } from '../../util/ErrorMessageEmbed'

jest.mock('../interaction/command')
jest.mock('discord.js')

const client = Client._mock()

describe('base', () => {
    test('it detects command interactions', () => {
        const mockInteraction = mocked(new CommandInteraction(client, {}), true)
        const mockedHandleCommandInteraction = mocked(handleCommandInteraction)

        mockInteraction.isCommand.mockReturnValue(true)

        handleInteraction(mockInteraction)

        expect(mockedHandleCommandInteraction.mock.calls).toHaveLength(1)
    })
})

describe('command', () => {
    test.todo('it detects non-existent commands')
    //() => {
    //     const mockInteraction = mocked(new CommandInteraction(client, {}), true)

    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     ;(mockInteraction as any).command = mocked(new ApplicationCommand(client, {}))
    //     mockInteraction.command!.name = 'non-existent'

    //     handleInteraction(mockInteraction)

    //     expect(
    //         ((
    //             mockInteraction.reply.mock.calls[0][0] as unknown as ErrorMessageEmbed
    //         )?.error as CarbonError).code,
    //     ).toBe(CarbonErrorType.CommandNotFound)
    // })
})