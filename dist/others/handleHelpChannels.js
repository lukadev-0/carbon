"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeSession = exports.handleMessage = exports.sessions = void 0;
const discord_js_1 = require("discord.js");
const variables_1 = __importDefault(require("../variables"));
const { CATEGORY_FREE_ID, CATEGORY_TAKEN_ID, HELP_INACTIVITY_TIME, COOLDOWN_ID, } = variables_1.default;
const HELP_CATEGORIES = new Set([CATEGORY_FREE_ID, CATEGORY_TAKEN_ID]);
exports.sessions = new discord_js_1.Collection();
async function handleMessage(message) {
    const { author, channel, member } = message;
    if (channel.type !== 'text')
        return;
    const textChannel = channel;
    if (!HELP_CATEGORIES.has(textChannel.parentID ?? ''))
        return;
    try {
        // Check if channel is already claimed
        if (exports.sessions.has(channel.id)) {
            const session = exports.sessions.get(channel.id);
            if (!session.timeout)
                return;
            setSessionTimeout(session);
        }
        else {
            // Return if member has cooldown
            if (member.roles.cache.has(COOLDOWN_ID))
                return;
            const session = {
                channel,
                initMessage: message,
            };
            exports.sessions.set(channel.id, session);
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(member.displayName, author.displayAvatarURL({ dynamic: true }))
                .setTitle('Channel Claimed')
                .setDescription('This channel has been claimed\n' + 'Use "/close" to close.')
                .setFooter(`Automatically closes after ${Number(HELP_INACTIVITY_TIME) / 60000} minutes of inactivity`);
            const infoMessage = await message.reply(embed);
            await channel.setParent(CATEGORY_TAKEN_ID);
            setSessionTimeout(session);
            session.infoMessage = infoMessage;
            await message.pin();
            await member.roles.add(COOLDOWN_ID);
        }
    }
    catch (e) {
        exports.sessions.delete(channel.id);
        channel
            .send(':x: An error occurred```' + e.message + '```', { split: true })
            .catch(console.log);
    }
}
exports.handleMessage = handleMessage;
function setSessionTimeout(session) {
    if (session.timeout)
        clearTimeout(session.timeout);
    session.timeout = setTimeout(() => closeSession(session), Number(HELP_INACTIVITY_TIME));
}
async function closeSession(session) {
    const { infoMessage, initMessage, channel } = session;
    exports.sessions.delete(channel.id);
    if (!initMessage.deleted)
        await initMessage.unpin();
    if (infoMessage && !infoMessage.deleted)
        await infoMessage.edit('*Closed*', {
            embed: null,
        });
    await channel.setParent(CATEGORY_FREE_ID);
    // run both at the same time
    await Promise.all([
        channel.send({
            embed: {
                title: 'Free Channel',
                description: 'Send a message to claim this channel',
            },
        }),
        initMessage.member.roles.remove(COOLDOWN_ID),
    ]);
}
exports.closeSession = closeSession;
