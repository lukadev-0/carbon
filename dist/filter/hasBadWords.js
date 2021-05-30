"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasBadWords = void 0;
let regExArray = [];
const axios_1 = __importDefault(require("axios"));
axios_1.default
    .get('https://raw.githubusercontent.com/daimond113/badwords/master/en.txt')
    .then((res) => (regExArray = res.data
    .split('\n')
    .map((regex) => new RegExp(regex, 'gi'))));
function hasBadWords(content) {
    const noWhitespace = content.replace(/\s+/g, ''); // Using "+" is more performant
    return regExArray.some((regex) => regex.test(noWhitespace));
}
exports.hasBadWords = hasBadWords;
