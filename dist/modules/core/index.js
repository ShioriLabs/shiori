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
var discord_js_1 = require("discord.js");
var Resolver_1 = __importDefault(require("../../class/Resolver"));
var compileHelpFile_1 = require("../../util/compileHelpFile");
var Ping = new Resolver_1.default('ping', function (message) {
    message.reply('Pong!');
}, 'Ping the bot');
var Help = new Resolver_1.default('help', function (message, args) {
    if (args && args.length === 0) {
        var commandList = compileHelpFile_1.compileHelpPage();
        var HelpEmbed = new discord_js_1.MessageEmbed()
            .setColor('#f55875')
            .setTitle('Help Page')
            .setDescription('Get help on the modules by typing `=help <module>`. Below is the available modules')
            .addFields(__spreadArrays(commandList.map(function (item) {
            return {
                name: "`" + item.id + "`",
                value: "**" + item.module + "**: " + item.description
            };
        })));
        message.channel.send(HelpEmbed);
    }
    else {
        var moduleName = (args && args.join(' '));
        try {
            var commandList = compileHelpFile_1.compileHelpFile(moduleName);
            var HelpEmbed = new discord_js_1.MessageEmbed()
                .setColor('#f55875')
                .setTitle("Help Page: " + commandList.name)
                .setDescription("" + commandList.description)
                .addFields(__spreadArrays(commandList.help.map(function (item) {
                return {
                    name: "`" + item.command + "`",
                    value: item.usage
                };
            })));
            message.channel.send(HelpEmbed);
        }
        catch (_a) {
            message.channel.send('Can\'t get help for that module. Please try again');
        }
    }
}, 'Show this help message');
var Echo = new Resolver_1.default('echo', function (message, args) {
    if (args && args.length > 0) {
        var text = args.join(' ');
        message.channel.send(text);
    }
    else {
        message.channel.send('Please type something to echo');
    }
}, 'Echo back a text');
exports.default = {
    id: 'core',
    name: 'Core',
    description: 'Core Shiori commands',
    commands: [
        Ping,
        Help,
        Echo
    ]
};
