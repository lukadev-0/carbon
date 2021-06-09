import { CommandInteraction } from 'discord.js'
import { mocked } from 'ts-jest/utils'
import { handleInteraction } from '../interaction'
import { handleCommandInteraction } from '../interaction/command'
import { Client } from '../../client'

jest.mock('../interaction/command')
jest.mock('discord.js')

const client = Client._mock()

test('it detects command interactions', () => {
    const mockInteraction = mocked(new CommandInteraction(client, {}), true)
    const mockedHandleCommandInteraction = mocked(handleCommandInteraction)

    mockInteraction.isCommand.mockReturnValue(true)

    handleInteraction(mockInteraction)

    expect(mockedHandleCommandInteraction.mock.calls).toHaveLength(1)
})