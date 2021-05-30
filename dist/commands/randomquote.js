"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quotejs = require('quote.js');
const canvas_1 = require("canvas");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const discord_interactive_core_1 = require("discord-interactive-core");
const client_1 = require("../client");
canvas_1.registerFont(path_1.join(process.cwd(), 'src', 'assets', 'font.ttf'), {
    family: 'Old Standard TT',
});
class RandomQuote extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'randomquote',
            description: 'Get a random quote!',
        });
    }
    async run(int) {
        await int.showLoadingIndicator(false);
        const randomQuote = quotejs(1, { authorIsKnown: true });
        const canvas = canvas_1.createCanvas(1000, 300);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffff';
        ctx.font = '30px Old Standard TT';
        ctx.fillText(`"${randomQuote[0].q}"`, 0, canvas.height / 2.5, canvas.width - 5);
        ctx.fillText(`-${randomQuote[0].a}`, canvas.width / 1.4, canvas.height / 1.8, canvas.width / 1.4);
        const msg = new discord_js_1.MessageAttachment(canvas.toBuffer());
        const channel = await client_1.client.channels.fetch(int.channel_id);
        const message = await channel.send(msg);
        await int.respond({
            content: 'Here is the quote!',
        });
    }
}
exports.default = RandomQuote;
