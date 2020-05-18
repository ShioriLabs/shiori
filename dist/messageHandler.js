"use strict";
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
var parseCommand_1 = __importDefault(require("./util/parseCommand"));
var module_1 = __importDefault(require("./module"));
function MessageHandler(message) {
    if (!message.author.bot) {
        try {
            var parsedCommand_1 = parseCommand_1.default('=', message.content);
            var commands = module_1.default.reduce(function (prev, item) {
                return __spreadArrays(prev, item.commands);
            }, []);
            var commandExists = commands.some(function (item) {
                if (parsedCommand_1.command === item.command) {
                    item.callback(message, parsedCommand_1.args);
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
