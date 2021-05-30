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
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const discord_js_1 = require("discord.js");
exports.default = {
    name: 'eval',
    description: 'Run code',
    defaultPermission: false,
    options: [
        {
            name: 'code',
            description: 'Code to run',
            type: 'STRING',
            required: true,
        },
    ],
};
async function run(int) {
    try {
        /* Inject variables */
        const client = Promise.resolve().then(() => __importStar(require('../client')));
        const evaled = eval(int.options[0].value);
        int.editReply('Successfully ran!');
        for (const msg of discord_js_1.Util.splitMessage(evaled)) {
            int.webhook.send(msg, { code: 'js' });
        }
    }
    catch (e) {
        int.editReply('An error has occured');
        const error = e.message.replace('`', '`' + String.fromCharCode(8203));
        for (const msg of discord_js_1.Util.splitMessage(error)) {
            int.webhook.send(msg, { code: 'js' });
        }
    }
}
exports.run = run;
