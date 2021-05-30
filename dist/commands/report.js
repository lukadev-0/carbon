"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_interactive_core_1 = require("discord-interactive-core");
const client_1 = require("../client");
const overrideRegex_1 = __importDefault(require("../others/overrideRegex"));
const variables_1 = __importDefault(require("../variables"));
const { REPORT_CHANNEL } = variables_1.default;
class Report extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'report',
            description: 'Report a user for breaking the rules.',
            options: [
                {
                    name: 'User',
                    description: 'User to report',
                    type: 6,
                    required: true,
                },
                {
                    name: 'Reason',
                    description: 'Report reason',
                    type: 3,
                    required: true,
                },
            ],
        });
    }
    async run(ctx) {
        await ctx.showLoadingIndicator(false);
        try {
            const options = ctx.data.options;
            const toReport = options[0].value;
            const reason = options[1].value;
            const reportChannel = (await client_1.client.channels.fetch(REPORT_CHANNEL));
            const guild = await client_1.client.guilds.fetch(ctx.guild_id);
            const user = await guild.members.fetch(toReport);
            if (ctx.member.user.id === toReport) {
                return await ctx.respond({
                    content: 'You cannot report yourself',
                });
            }
            if (user.roles.cache.some((role) => Boolean(role.name.match(overrideRegex_1.default)))) {
                return await ctx.respond({
                    content: 'You cannot report a moderator or the owner.',
                });
            }
            await ctx.respond({
                content: 'Reporting...\nFun fact: abusing this command will get you banned',
            });
            await ctx.respond({
                content: `<@${ctx.member.user.id}>, successfuly reported <@${toReport}>`,
            });
            reportChannel.send(`<@${ctx.member.user.id}> has reported <@${toReport}> for "${reason}"`);
        }
        catch (erro) {
            console.log(erro);
            ctx.respond({
                content: 'Your report has failed',
            });
        }
    }
}
exports.default = Report;
