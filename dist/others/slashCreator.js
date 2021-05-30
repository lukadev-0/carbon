"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const client_1 = require("../client");
const variables_1 = __importDefault(require("../variables"));
const commandFunctions = {};
const ownerOnly = ['eval'];
const { readdir } = fs_1.promises;
const commandsLocation = path_1.join(__dirname, '../newCommands');
(async () => {
    const commands = await readdir(commandsLocation);
    const allCommands = [];
    for (const c of commands) {
        const imported = await Promise.resolve().then(() => __importStar(require(path_1.join(commandsLocation, c))));
        commandFunctions[imported.default.name] = imported.run;
        allCommands.push(imported.default);
    }
    const setCommands = await (await client_1.client.guilds.fetch(variables_1.default.GUILD)).commands.set(allCommands);
    for (const p of ownerOnly) {
        await setCommands
            .find((c) => c.name === p)
            ?.setPermissions([
            {
                id: variables_1.default.OWNER_ID,
                type: 'USER',
                permission: true,
            },
        ]);
    }
})();
client_1.client.on('interaction', async (interaction) => {
    if (!interaction.isCommand())
        return;
    await interaction.defer(false);
    commandFunctions[interaction.commandName](interaction);
});
