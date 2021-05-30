"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const reddit_grabber_1 = require("reddit-grabber");
const discord_interactive_core_1 = require("discord-interactive-core");
class Meme extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'meme',
            description: 'Get a meme from reddit',
            options: [
                {
                    name: 'Subreddit',
                    description: 'Subreddit to fetch from',
                    type: 3,
                    required: true,
                },
            ],
        });
    }
    async run(ctx) {
        await ctx.showLoadingIndicator(false);
        try {
            const img = await reddit_grabber_1.get(Math.round(Math.random()) === 0 ? 'Image' : 'Video', ctx.data.options[0].value, false);
            const Embed = new discord_js_1.MessageEmbed()
                .setAuthor(img.author)
                .setTitle(img.title)
                .setURL(img.url)
                .setColor('RANDOM')
                .setImage(img.media);
            await ctx.respond({
                embeds: [Embed.toJSON()],
            });
        }
        catch (err) {
            console.log(err);
            await ctx.respond({
                content: err.message,
            });
        }
    }
}
exports.default = Meme;
