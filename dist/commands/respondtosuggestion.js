"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_interactive_core_1 = require("discord-interactive-core");
const discord_js_1 = require("discord.js");
const client_1 = require("../client");
const overrideRegex_1 = __importDefault(require("../others/overrideRegex"));
const variables_1 = __importDefault(require("../variables"));
const { SUGGESTION_CHANNEL } = variables_1.default;
class RespondToSuggestion extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'respondtosuggestion',
            description: 'Respond to a suggestion',
            options: [
                {
                    name: 'MessageID',
                    description: 'Message ID of the suggestion',
                    type: 3,
                    required: true,
                },
                {
                    name: 'Implemented',
                    description: 'Is this suggestion implemented?',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'Considered',
                            value: 'Considered',
                        },
                        {
                            name: 'Accepted',
                            value: 'Accepted',
                        },
                        {
                            name: 'Denied',
                            value: 'Denied',
                        },
                    ],
                },
                {
                    name: 'Comment',
                    description: 'A comment on this suggestion',
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
        const guild = await client_1.client.guilds.fetch(ctx.guild_id);
        const user = await guild.members.fetch(ctx.member.user.id);
        if (user.roles.cache.some((role) => Boolean(role.name.match(overrideRegex_1.default)))) {
            const channel = await client_1.client.channels.fetch(SUGGESTION_CHANNEL);
            const message = await channel.messages.fetch(ctx.data.options[0].value);
            const embeds = await message.embeds;
            const embed = embeds[0];
            embed.addField(`${user.user.tag}: ${ctx.data.options[1].value}`, ctx.data.options[2].value, false);
            await message.edit(embed);
            await ctx.respond({
                content: 'Successfuly responded',
            });
            const toDM = await client_1.client.users.fetch(embed.footer.text);
            const embed2 = new discord_js_1.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(user.user.tag, user.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096,
            }))
                .setTitle('Responded to your suggestion')
                .setDescription(`Replied with: \n${ctx.data.options[2].value}\n[Go to suggestion](https://discord.com/channels/${ctx.guild_id}/${message.channel.id}/${message.id})`)
                .addField('Status: ', ctx.data.options[1].value);
            toDM.send(embed2).catch((erro) => {
                console.log(erro.message);
            });
        }
        else {
            ctx.respond({
                content: "You're not a moderator or the owner!",
            });
        }
    }
}
exports.default = RespondToSuggestion;
