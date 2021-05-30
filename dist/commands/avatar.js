"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_interactive_core_1 = require("discord-interactive-core");
const client_1 = require("../client");
class Avatar extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'avatar',
            description: "Get someone's avatar!",
            options: [
                {
                    name: 'User',
                    description: 'The user to get avatar from',
                    type: 6,
                    required: true,
                },
            ],
        });
    }
    async run(ctx) {
        await ctx.showLoadingIndicator(false);
        const user = await client_1.client.users.fetch(ctx.data.options[0].value);
        const json = new discord_js_1.MessageEmbed()
            .setTitle(`${user.username}'s avatar!`)
            .setColor('RANDOM')
            .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
            .toJSON();
        await ctx.respond({
            content: 'Got the avatar!',
            embeds: [json],
        });
    }
}
exports.default = Avatar;
