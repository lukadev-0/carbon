"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_interactive_core_1 = require("discord-interactive-core");
const discord_js_1 = require("discord.js");
const client_1 = require("../client");
const filter_1 = require("../filter");
const variables_1 = __importDefault(require("../variables"));
const { SUGGESTION_CHANNEL } = variables_1.default;
class Suggest extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'suggest',
            description: 'Suggest something',
            options: [
                {
                    name: 'Suggestion',
                    description: 'Your suggestion',
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
        if (await filter_1.isBad(ctx.data.options[0].value)) {
            return ctx.respond({
                content: ':x: Your message has been filtered',
            });
        }
        await ctx.showLoadingIndicator(false);
        try {
            const member = await client_1.client.users.fetch(ctx.member.user.id);
            const channel = await client_1.client.channels.fetch(SUGGESTION_CHANNEL);
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('Suggestion')
                .setAuthor(member.tag, member.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096,
            }))
                .setColor('GREEN')
                .setDescription(ctx.data.options[0].value)
                .setFooter(member.id);
            await channel.send(embed);
            await ctx.respond({
                content: 'Successfuly send the suggestion',
            });
        }
        catch (erro) {
            console.log(erro);
            await ctx.respond({
                content: 'Your suggestion has failed!',
            });
        }
    }
}
exports.default = Suggest;
