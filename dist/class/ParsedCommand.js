"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParsedCommand = /** @class */ (function () {
    /**
     * Creates new ParsedCommand instance
     * @param command Command to be run
     * @param arg Arguments passed with the command
     * @param body Un-parsed command arguments
     */
    function ParsedCommand(command, args, body) {
        this.command = command;
        if (args !== undefined) {
            this.args = args;
        }
        if (body !== undefined) {
            this.body = body;
        }
    }
    return ParsedCommand;
}());
exports.default = ParsedCommand;
