"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_interactive_core_1 = require("discord-interactive-core");
const handleHelpChannels_1 = require("../others/handleHelpChannels");
const client_1 = require("../client");
const overrideRegex_1 = __importDefault(require("../others/overrideRegex"));
class Close extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'close',
            description: 'Close your help channel',
        });
    }
    async run(ctx) {
        await ctx.showLoadingIndicator(true);
        const member = await (await client_1.client.guilds.fetch(ctx.guild_id)).members.fetch(ctx.member.user.id);
        const session = handleHelpChannels_1.sessions.get(ctx.channel_id);
        if (session?.initMessage.member.user.id === ctx.member.user.id ||
            member.roles.cache.some((v) => Boolean(v.name.match(overrideRegex_1.default)))) {
            await handleHelpChannels_1.closeSession(session);
            return ctx.respond({
                content: ':white_check_mark: Channel closed',
            });
        }
        return ctx.respond({
            content: ':x: Failed to close channel. You can only close help channels that you own.',
        });
    }
}
exports.default = Close;
