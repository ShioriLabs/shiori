"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var yt_search_1 = __importDefault(require("yt-search"));
var Resolver_1 = __importDefault(require("../../class/Resolver"));
var audioSearchContext_1 = require("../../util/audioSearchContext");
var dispatchers = [];
var Join = new Resolver_1.default('join', function (message) {
    var _a;
    if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel) {
        message.member.voice.channel.join();
    }
    else {
        message.channel.send('You need to be in a voice channel to made me join a voice channel!');
    }
}, 'Join a voice channel');
var Leave = new Resolver_1.default('leave', function (message) {
    var _a, _b;
    if ((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.voice.channel) {
        message.guild.me.voice.channel.leave();
    }
}, 'Leave current voice channel');
var Play = new Resolver_1.default('play', function (message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var joinedArgs, selected, context, selectedSong, dispatcher, nowPlayingEmbed;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!args) return [3 /*break*/, 4];
                joinedArgs = args.join(' ');
                if (!((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.voice.channel)) return [3 /*break*/, 3];
                if (!!dispatchers.find(function (item) {
                    var _a;
                    return item.server.id === ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id);
                })) return [3 /*break*/, 2];
                if (!!isNaN(Number.parseInt(joinedArgs))) return [3 /*break*/, 2];
                selected = Number.parseInt(joinedArgs);
                context = audioSearchContext_1.getContext(message.member);
                if (!context) return [3 /*break*/, 2];
                selectedSong = context.context[selected - 1];
                if (!message.guild.me.voice.connection) return [3 /*break*/, 2];
                dispatcher = message.guild.me.voice.connection.play(ytdl_core_1.default(selectedSong.url, {
                    filter: 'audioonly'
                }));
                dispatchers.push({
                    server: message.guild,
                    dispatcher: dispatcher
                });
                nowPlayingEmbed = new discord_js_1.MessageEmbed()
                    .setColor('#f55875')
                    .setTitle('Now Playing')
                    .setDescription(selectedSong.title + " by " + selectedSong.channel);
                message.channel.send(nowPlayingEmbed);
                return [4 /*yield*/, context.audioMessage.delete()];
            case 1:
                _c.sent();
                audioSearchContext_1.removeContext(context.user);
                _c.label = 2;
            case 2: return [3 /*break*/, 4];
            case 3:
                message.channel.send('I\'m currently not in any voice channel. Please `=join` first!');
                _c.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
var Search = new Resolver_1.default('search', function (message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var result, resultEmbed, audioMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(!args || args.length === 0)) return [3 /*break*/, 1];
                message.channel.send('You need to insert something to search!');
                return [3 /*break*/, 4];
            case 1: return [4 /*yield*/, yt_search_1.default({
                    search: args.join(' '),
                    pageStart: 1,
                    pageEnd: 2
                })];
            case 2:
                result = (_a.sent()).videos.slice(0, 5).map(function (item) {
                    return {
                        title: item.title,
                        channel: item.author.name,
                        url: item.url
                    };
                });
                resultEmbed = new discord_js_1.MessageEmbed()
                    .setColor('#f55875')
                    .setTitle("Search result for \"" + args.join(' ') + "\"")
                    .addFields(result.map(function (item, index) {
                    return {
                        name: index + 1 + ": " + item.title,
                        value: "By " + item.channel
                    };
                }))
                    .addField('\u200B', 'Type `=play <number>` to add song into the queue');
                return [4 /*yield*/, message.channel.send(resultEmbed)];
            case 3:
                audioMessage = _a.sent();
                audioSearchContext_1.addContext(message.member, audioMessage, result);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
var Stop = new Resolver_1.default('stop', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatchers = dispatchers.filter(function (item) {
            var _a;
            if (item.server.id === ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id)) {
                item.dispatcher.destroy();
                return false;
            }
            else
                return true;
        });
        return [2 /*return*/];
    });
}); });
exports.default = {
    id: 'music',
    name: 'Music',
    description: 'Play them tunes',
    commands: [
        Join,
        Leave,
        Play,
        Stop,
        Search
    ]
};
