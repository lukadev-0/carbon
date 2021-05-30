"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const handleHelpChannels_1 = require("../others/handleHelpChannels");
const overrideRegex_1 = __importDefault(require("../others/overrideRegex"));
exports.default = {
    name: 'close',
    description: 'Close your help channel',
};
async function run(int) {
    const member = int.member;
    const session = handleHelpChannels_1.sessions.get(int.channelID);
    if (!session)
        return int.editReply('Failed to get the session, are you sure this is a help channel?');
    if (session?.initMessage.member.user.id === member.id ||
        member.roles.cache.some((v) => Boolean(v.name.match(overrideRegex_1.default)))) {
        await handleHelpChannels_1.closeSession(session);
        return int.editReply(':white_check_mark: Channel closed');
    }
    return int.editReply(':x: Failed to close channel. You can only close help channels that you own.');
}
exports.run = run;
