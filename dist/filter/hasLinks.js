"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasLinks = void 0;
const axios_1 = __importDefault(require("axios"));
const WHITELIST = [
    'github.io',
    'cdn.discord.com',
    'cdn.discordapp.com',
    'daimond113.com',
    'youtube.com',
    'imgur.com',
    'tenor.com',
    'roblox.com',
    'reactjs.org',
    'create-react-app.dev',
    'nextjs.org',
    'expressjs.org',
    'nodejs.org',
    'deno.land',
    'npmjs.com',
    'github.com',
    'material-ui.com',
    'typescriptlang.org',
    'vercel.app',
    'bit.ly',
];
async function hasLinks(content) {
    const urls = content.match(/(https?:\/\/\S+)/gi);
    if (urls) {
        for (const url of urls) {
            const response = await axios_1.default.head(url, {
                maxRedirects: Infinity,
                timeout: 5000,
            });
            const matched = !WHITELIST.some((wlUrl) => {
                new RegExp(`^(.+\.)?${wlUrl}$`).test(response.request.host.toLowerCase());
            });
            if (matched)
                return true;
        }
    }
    return false;
}
exports.hasLinks = hasLinks;
