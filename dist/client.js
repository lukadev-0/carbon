"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
exports.client = new discord_js_1.Client({
    intents: new discord_js_1.Intents(discord_js_1.Intents.ALL & ~(1 << 8)),
});
