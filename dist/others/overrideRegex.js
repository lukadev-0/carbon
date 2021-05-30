"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = __importDefault(require("../variables"));
const { OVERRIDE_REGEX } = variables_1.default;
exports.default = new RegExp(OVERRIDE_REGEX, 'gi');
