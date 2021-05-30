"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = __importDefault(require("../variables"));
const { SERVER_URL } = variables_1.default;
const app = express_1.default();
app.all('*', (_, res) => {
    res.redirect(301, SERVER_URL);
});
app.listen(3000);
