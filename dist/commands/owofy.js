"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const owofire_1 = __importDefault(require("owofire"));
const discord_interactive_core_1 = require("discord-interactive-core");
const filter_1 = require("../filter");
class Owofy extends discord_interactive_core_1.SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'owofy',
            description: 'Owofy some text',
            options: [
                {
                    name: 'Text',
                    description: 'Text to owofy',
                    type: 3,
                    required: true,
                },
            ],
        });
    }
    async run(ctx) {
        await ctx.showLoadingIndicator(false);
        const content = owofire_1.default(ctx.data.options[0].value);
        if (await filter_1.isBad(content)) {
            return ctx.respond({
                content: ':x: Your message has been filtered',
            });
        }
        await ctx.respond({
            allowed_mentions: {
                parse: [],
            },
            content,
        });
    }
}
exports.default = Owofy;
