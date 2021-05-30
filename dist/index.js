"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./others/server"); // Web server
require("axios-debug-log");
const client_1 = require("./client");
const filter_1 = require("./filter");
const createImage_1 = __importDefault(require("./others/createImage"));
const handleHelpChannels_1 = require("./others/handleHelpChannels");
const reactionRoles_1 = require("./others/reactionRoles");
const chatHistory_1 = require("./others/chatHistory");
const variables_1 = __importDefault(require("./variables"));
const { REACTION_ROLE_CHANNEL, WELCOME_CHANNEL, GOODBYE_CHANNEL } = variables_1.default;
client_1.client.on('ready', async () => {
    await Promise.resolve().then(() => __importStar(require('./others/slashCreator')));
    console.log(`Logged in as ${client_1.client.user.tag}`);
    client_1.client.user.setActivity('https://daimond113.com', {
        type: 'WATCHING',
    });
    const reactionRoleChannel = (await client_1.client.channels.fetch(REACTION_ROLE_CHANNEL));
    reactionRoleChannel.messages.fetch();
});
client_1.client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot)
        return;
    reactionRoles_1.handleReaction(reaction, user, 'add');
});
client_1.client.on('messageReactionRemove', (reaction, user) => {
    if (user.bot)
        return;
    reactionRoles_1.handleReaction(reaction, user, 'delete');
});
client_1.client.on('guildMemberAdd', (member) => {
    client_1.client.channels
        .fetch(WELCOME_CHANNEL)
        .then(async (channel) => channel.send(await createImage_1.default(member)));
});
client_1.client.on('guildMemberRemove', (member) => {
    client_1.client.channels
        .fetch(GOODBYE_CHANNEL)
        .then(async (channel) => channel.send(await createImage_1.default(member, false)));
});
client_1.client.on('message', async (message) => {
    if (message.author.bot)
        return;
    await filter_1.filter(message);
    handleHelpChannels_1.handleMessage(message);
});
client_1.client.on('messageUpdate', async (message, messageNew) => {
    if (message.author?.bot)
        return;
    await filter_1.filter(messageNew);
    if (message.content !== messageNew.content) {
        chatHistory_1.chatHistory(message, messageNew);
    }
});
client_1.client.on('messageDelete', (message) => {
    if (message.author?.bot)
        return;
    chatHistory_1.chatHistory(message);
});
client_1.client.login(process.env.TOKEN);
