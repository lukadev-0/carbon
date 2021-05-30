"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
class default_1 extends events_1.default {
    constructor(a) {
        super();
        this.rawArray = [] || a;
    }
    push(...items) {
        this.rawArray.push(...items);
        this.emit('change');
    }
    shift() {
        this.rawArray.shift();
        this.emit('shifted');
    }
}
exports.default = default_1;
