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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var discord_js_1 = __importDefault(require("discord.js"));
var Sentry = __importStar(require("@sentry/node"));
var messageHandler_1 = __importDefault(require("./messageHandler"));
dotenv_1.default.config();
Sentry.init({
    dsn: process.env.SENTRY_TOKEN,
    tracesSampleRate: 1.0
});
try {
    var client_1 = new discord_js_1.default.Client();
    client_1.on('ready', function () {
        if (client_1.user) {
            client_1.user.setPresence({
                activity: {
                    name: 'your heart',
                    type: 'LISTENING'
                }
            });
            console.log("Logged in as " + client_1.user.tag);
        }
    });
    client_1.on('message', messageHandler_1.default);
    client_1.login(process.env.DISCORD_TOKEN);
}
catch (e) {
    Sentry.captureException(e);
}
