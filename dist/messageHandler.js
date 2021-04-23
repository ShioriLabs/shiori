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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sentry = __importStar(require("@sentry/node"));
var parseCommand_1 = __importDefault(require("./util/parseCommand"));
var module_1 = __importDefault(require("./module"));
function MessageHandler(message) {
    if (!message.author.bot) {
        try {
            var parsedCommand_1 = parseCommand_1.default(process.env.NODE_ENV === 'development' ? 't=' : '=', message.content);
            var commands = module_1.default.reduce(function (prev, item) {
                return __spreadArrays(prev, item.commands);
            }, []);
            var commandExists = commands.some(function (item) {
                if (parsedCommand_1.command === item.command) {
                    try {
                        item.callback(message, parsedCommand_1.args);
                    }
                    catch (commandErr) {
                        Sentry.captureException(commandErr);
                        message.channel.send('I- I don\'t know how to understand this and something gone wrong. Please try again!');
                    }
                    return true;
                }
                return false;
            });
            if (!commandExists) {
                message.channel.send('Invalid command. please type `=help` to see available commands!');
            }
        }
        catch (e) {
        }
    }
}
exports.default = MessageHandler;
