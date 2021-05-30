"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const discord_js_1 = require("discord.js");
const discord_interactive_core_1 = require("discord-interactive-core");
const variables_1 = __importDefault(require("../variables"));
const { OWNER_ID } = variables_1.default;
class Eval extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'eval',
            description: 'Run code (CREATOR ONLY)',
            options: [
                {
                    name: 'Code',
                    description: 'Code to run',
                    type: 3,
                    required: true,
                },
            ],
        });
    }
    /**
     *
     * @param {Interaction} ctx
     */
    async run(ctx) {
        await ctx.showLoadingIndicator(false);
        if (ctx.member.user.id !== OWNER_ID)
            return ctx.respond({ content: "You're not the owner!" });
        try {
            // inject variables
            const client = require('../client');
            let evaled = eval(ctx.data.options[0].value);
            if (typeof evaled !== 'string')
                evaled = util_1.inspect(evaled);
            await ctx.respond({
                content: 'Successfully evaluated',
            });
            for (const code of discord_js_1.Util.splitMessage(evaled)) {
                await ctx.respond({ content: `\`\`\`js\n${code}\`\`\`` });
            }
        }
        catch (err) {
            await ctx.respond({
                content: 'An error has occured!',
            });
            const error = err.message.replace('`', '`' + String.fromCharCode(8203));
            for (const code of discord_js_1.Util.splitMessage(error)) {
                await ctx.respond({ content: `\`\`\`js\n${code}\`\`\`` });
            }
        }
    }
}
exports.default = Eval;
