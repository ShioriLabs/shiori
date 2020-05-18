"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver = /** @class */ (function () {
    function Resolver(command, callback, usage) {
        this.usage = 'A command';
        this.command = command;
        this.callback = callback;
        if (usage !== undefined) {
            this.usage = usage;
        }
    }
    return Resolver;
}());
exports.default = Resolver;
