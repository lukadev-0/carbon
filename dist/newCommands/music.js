"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
exports.default = {
    name: 'music',
    description: 'Music commands',
    options: [
        {
            name: 'play',
            description: 'Play music',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'name',
                    description: 'Name of the song you want to play',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'skip',
            description: 'Skip your own song',
            type: 'SUB_COMMAND',
        },
        {
            name: 'queue',
            description: 'Get the queue',
            type: 'SUB_COMMAND',
        },
    ],
};
async function run() { }
exports.run = run;
