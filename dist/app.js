"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var discord_js_1 = __importDefault(require("discord.js"));
var messageHandler_1 = __importDefault(require("./messageHandler"));
dotenv_1.default.config();
var client = new discord_js_1.default.Client();
client.on('ready', function () {
    if (client.user) {
        client.user.setPresence({
            activity: {
                name: 'your heart',
                type: 'LISTENING'
            }
        });
        console.log("Logged in as " + client.user.tag);
    }
});
client.on('message', messageHandler_1.default);
client.login(process.env.DISCORD_TOKEN);
