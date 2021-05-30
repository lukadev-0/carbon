"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReaction = void 0;
const variables_1 = __importDefault(require("../variables"));
const { REACTION_ROLE_CHANNEL } = variables_1.default;
const roleIds = {
    '😎': '810641538585067520',
};
async function handleReaction(reaction, user, action) {
    const { message: { guild, channel }, emoji, } = reaction;
    if (channel.id !== REACTION_ROLE_CHANNEL)
        return;
    if (!guild)
        return;
    const { roles } = await guild.members.fetch(user.id);
    const role = roleIds[emoji.name];
    if (!role)
        return;
    try {
        switch (action) {
            case 'add':
                return await roles.add(role);
            case 'delete':
                return await roles.remove(role);
        }
    }
    catch (e) {
        console.error(e);
    }
}
exports.handleReaction = handleReaction;
