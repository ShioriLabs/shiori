"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var parseCommand_1 = __importDefault(require("../../util/parseCommand"));
ava_1.default('parses no-args command correctly', function (t) {
    var command = '=help';
    var parsed = parseCommand_1.default('=', command);
    t.is(parsed.command, 'help', 'command is help');
});
ava_1.default('parses command with arguments correctly', function (t) {
    var command = '=echo test 123';
    var parsed = parseCommand_1.default('=', command);
    t.is(parsed.command, 'echo', 'command is echo');
    t.is(parsed.body, 'test 123', 'command has body');
    t.is(parsed.args.length, 2, 'command has 2 arguments');
});
ava_1.default('throws exception when sent invalid command', function (t) {
    t.throws(function () { return parseCommand_1.default('=', 'help'); });
    t.throws(function () { return parseCommand_1.default('=', '='); });
});
