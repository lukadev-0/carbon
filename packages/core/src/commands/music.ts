import {
    CommandInteraction,
    GuildMember,
    MessageEmbed,
    Snowflake,
    TextChannel,
    VoiceConnection,
    Util,
} from 'discord.js'
import ytsr from 'ytsr'
import ytdl from 'ytdl-core-discord'
import { Readable } from 'stream'
import overrideRegex from '../others/overrideRegex'
import BaseCommand from '../others/BaseCommand'
import { error as CarbonErrorEmoji } from '../constants/emojis'

interface QueueItem extends ytsr.Video {
    channel: TextChannel
    requested: Snowflake
    stream?: Readable
}

interface Queue {
    current: QueueItem | null
    items: QueueItem[]
}

const queues = new Map<Snowflake, Queue>()

export default new BaseCommand(
    {
        name: 'music',
        description: 'Music commands',
        module: 'music',
        options: [
            {
                name: 'play',
                description: 'Play music',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'name',
                        description: 'Name of the song you want to play',
                        type: 'STRING',
                        required: true,
                    },
                ],
            },
            {
                name: 'skip',
                description: 'Skip your own song',
                type: 'SUB_COMMAND',
            },
            {
                name: 'queue',
                description: 'Get the queue',
                type: 'SUB_COMMAND',
            },
        ],
        run: async function(int) {
            const connection = await (int.member as GuildMember).voice.channel?.join()

            if (!connection) {
                return int.editReply(`${CarbonErrorEmoji} You need to be in a voice channel`)
            }
        
            await connection.voice?.setDeaf(true)
        
            switch (int.options[0].name) {
                case 'play':
                    return play(int, connection)
                case 'skip':
                    return skip(int, connection)
                case 'queue':
                    return queue(int)
            }
        },
    },
)

function truncate(string: string, length: number) {
    return string.length > length ? string.slice(0, length - 3) + '...' : string
}

async function play(int: CommandInteraction, connection: VoiceConnection) {
    const queue =
        queues.get(int.guildID!) ??
        ({
            current: null,
            items: [],
        } as Queue)

    queues.set(int.guildID!, queue)

    const video = await searchForVideo(
        int.options[0].options![0].value as string,
    )

    const item = {
        ...video,
        channel: int.channel as TextChannel,
        requested: int.user.id,
    } as QueueItem

    const existingSongPlaying = Boolean(queue.current)

    if (existingSongPlaying) {
        queue.items.push(item)
    } else {
        await setCurrentInQueue(connection, queue, item)
    }

    const embed = generateEmbed(video).setFooter(
        existingSongPlaying ? 'Added to Queue' : 'Now Playing',
    )

    int.editReply(embed)
}

async function skip(int: CommandInteraction, connection: VoiceConnection) {
    const queue =
        queues.get(int.guildID!) ??
        ({
            current: null,
            items: [],
        } as Queue)

    if (!queue.current) return int.editReply(':x: There is no song to skip')

    if (
        queue.current.requested !== int.user.id &&
        !(int.member as GuildMember).roles.cache.some((role) =>
            Boolean(role.name.match(overrideRegex)),
        )
    )
        return int.editReply(
            ':x: You must be the requester of this song to skip it',
        )

    nextSong(connection, queue.current, queue)

    return int.editReply(':fast_forward: Skipped!')
}

async function queue(int: CommandInteraction) {
    const queue = queues.get(int.guildID!)

    if (!queue?.current) return int.editReply('No queue')

    const queueString =
        `:arrow_forward: ${queue.current?.title}` +
        queue.items.reduce(
            (acc, item) => `${acc}\n:black_small_square: ${item.title}`,
            '',
        )

    const split = Util.splitMessage(queueString, {
        maxLength: 2048,
    })

    const first = split.shift() as string
    const embed = new MessageEmbed()
        .setTitle(`Queue ${split.length ? `(1/${split.length + 1})` : ''}`)
        .setDescription(first)
        .setColor('#2f3136')

    await int.editReply(embed)

    split.forEach(async (v, i) => {
        const embed = new MessageEmbed()
            .setTitle(`Queue (${i + 2}/${split.length + 1})`)
            .setDescription(v)
            .setColor('#2f3136')

        await int.webhook.send(embed)
    })
}

async function setCurrentInQueue(
    connection: VoiceConnection,
    queue: Queue,
    item: QueueItem,
) {
    queue.current = item

    const stream = await ytdl(item.url)

    item.stream = stream

    stream.once('end', () => {
        nextSong(connection, item, queue)
    })

    connection.play(stream, {
        type: 'opus',
    })
}

function nextSong(
    connection: VoiceConnection,
    current: QueueItem,
    queue: Queue,
) {
    current.stream?.destroy()
    delete current.stream

    const nextSong = queue.items.shift()

    if (nextSong) {
        const embed = generateEmbed(nextSong).setFooter('Now Playing')

        current.channel.send(embed)

        setCurrentInQueue(connection, queue, nextSong)
    } else {
        queue.current = null

        current.channel.send('No more songs in queue')
    }
}

function generateEmbed(video: ytsr.Video) {
    return new MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(
            video.author?.name ?? 'Unknown Author',
            video.author?.bestAvatar.url ?? undefined,
            video.author?.url,
        )
        .setTitle(video.title)
        .setDescription(video.description ? truncate(video.description, 150) : '')
        .setThumbnail(video.bestThumbnail.url ?? '')
        .setURL(video.url)
}

async function searchForVideo(query: string) {
    const filters = await ytsr.getFilters(query)
    const filter = filters.get('Type')!.get('Video')!

    const results = await ytsr(filter.url!, {
        limit: 1,
    })

    return results.items[0]! as ytsr.Video
}
