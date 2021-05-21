"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ParsedCommand_1 = __importDefault(require("../class/ParsedCommand"));
function parseCommand(prefix, message) {
    if (message.startsWith(prefix) || message.toLowerCase().startsWith('hey shiori, ')) {
        var split = message.replace(prefix, '').replace('hey shiori, ', '').split(/ /g);
        var command = split.shift();
        if (command) {
            return new ParsedCommand_1.default(command, split, split.join(' '));
        }
    }
    throw new Error('Invalid command');
}
exports.default = parseCommand;
