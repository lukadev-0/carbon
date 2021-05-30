"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const discord_js_1 = require("discord.js");
const client_1 = require("../client");
exports.default = {
    name: 'avatar',
    description: "Get someone's avatar!",
    options: [
        {
            name: 'user',
            description: 'The user to get avatar from',
            type: 'USER',
            required: true,
        },
    ],
};
async function run(int) {
    const member = await client_1.client.users.fetch(int.options[0].value);
    const avatar = member.displayAvatarURL({
        size: 4096,
        dynamic: true,
        format: 'png',
    });
    int.editReply(new discord_js_1.MessageEmbed()
        .setTitle(`${member.username}'s avatar!`)
        .setColor('RANDOM')
        .setImage(avatar));
}
exports.run = run;
