"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBad = exports.filter = void 0;
const hasLinks_1 = require("./hasLinks");
const hasBadWords_1 = require("./hasBadWords");
const overrideRegex_1 = __importDefault(require("../others/overrideRegex"));
async function filter(message) {
    // check if message is in a guild channel (has member property)
    if (!message.member)
        return;
    const { author, member: { roles }, content, } = message;
    if (author.bot)
        return;
    const override = roles.cache.some((role) => Boolean(role.name.match(overrideRegex_1.default)));
    if (override)
        return;
    if (await hasLinks_1.hasLinks(content))
        return message
            .delete()
            .then(() => message.author.send(':x: You have sent a blacklisted link!\n' +
            'If that is not the case please report a issue at\n' +
            '<https://github.com/daimond113/carbon/issues>'))
            .catch((e) => console.error(e));
    if (hasBadWords_1.hasBadWords(content))
        return message
            .delete()
            .then(() => message.author.send(":x: I've detected a bad word in your message!\n" +
            'Please do not try to use bad words.\n' +
            'Feel like this is an issue?' +
            'Report it on <https://github.com/daimond113/carbon/issues>'))
            .catch((e) => console.log(e.message));
}
exports.filter = filter;
async function isBad(content) {
    return (await hasLinks_1.hasLinks(content)) || hasBadWords_1.hasBadWords(content);
}
exports.isBad = isBad;
