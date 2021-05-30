"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHistory = void 0;
const discord_js_1 = require("discord.js");
const client_1 = require("../client");
const variables_1 = __importDefault(require("../variables"));
const { CHAT_HISTORY } = variables_1.default;
// function to shorten messages so that they fit in the limit
function truncate(string, length) {
    return string.length > length ? string.slice(0, length - 3) + '...' : string;
}
async function chatHistory(message, newMsg) {
    const logs = (await client_1.client.channels.fetch(CHAT_HISTORY));
    const embed = new discord_js_1.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096,
    }))
        .setTitle(message.deleted ? 'Message deleted' : 'Message edited')
        .setColor('GREEN')
        .addFields([
        {
            name: 'Sender',
            value: message.author,
        },
        {
            name: newMsg ? 'From' : 'Content',
            value: truncate(message.content, 1024),
        },
        ...(newMsg
            ? [
                {
                    // Only add this field if newMsg is defined
                    name: 'To',
                    value: truncate(newMsg.content, 1024),
                },
            ]
            : []),
        {
            name: 'Message Link',
            value: message.url,
        },
    ]);
    logs.send(embed);
}
exports.chatHistory = chatHistory;
