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
var Resolver_1 = __importDefault(require("../../class/Resolver"));
var anilistQueries_1 = __importDefault(require("../../util/anilistQueries"));
var Staff = new Resolver_1.default('staff', function (message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var searchQuery, sentMessage, result, descriptionSections, slicedDescription, reformattedDescription, embedMessage, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (args && args.length === 0) {
                    message.channel.send('You need to insert something to search!');
                    return [2 /*return*/];
                }
                searchQuery = (args && args.join(' '));
                return [4 /*yield*/, message.channel.send("Searching " + searchQuery + " on AniList...")];
            case 1:
                sentMessage = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, , 10]);
                return [4 /*yield*/, anilistQueries_1.default.getStaff(searchQuery)];
            case 3:
                result = _b.sent();
                if (!!result) return [3 /*break*/, 5];
                return [4 /*yield*/, sentMessage.edit("Can't find " + searchQuery + " on AniList!")];
            case 4:
                _b.sent();
                return [2 /*return*/];
            case 5:
                descriptionSections = result.description ? result.description.split('\n\n') : ['No description available.'];
                slicedDescription = descriptionSections.slice(0, 3).join('\n\n');
                reformattedDescription = slicedDescription.replace(/__/g, '**');
                embedMessage = new discord_js_1.MessageEmbed()
                    .setColor('#f55875')
                    .setTitle(result.name.full + " (" + result.name.native + ")")
                    .setURL(result.siteUrl)
                    .setDescription(reformattedDescription)
                    .setThumbnail(result.image.medium)
                    .setFooter('Content from AniList', 'https://anilist.co/img/icons/favicon-32x32.png');
                return [4 /*yield*/, sentMessage.edit('Here\'s what I found on AniList:')];
            case 6:
                _b.sent();
                return [4 /*yield*/, sentMessage.edit(embedMessage)];
            case 7:
                _b.sent();
                return [3 /*break*/, 10];
            case 8:
                _a = _b.sent();
                return [4 /*yield*/, sentMessage.edit("Can't find " + searchQuery + " on AniList!")];
            case 9:
                _b.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); }, 'Get an anime staff\'s detail');
var Anime = new Resolver_1.default('anime', function (message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var searchQuery, sentMessage, result, embedMessage, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (args && args.length === 0) {
                    message.channel.send('You need to insert something to search!');
                    return [2 /*return*/];
                }
                searchQuery = (args && args.join(' '));
                return [4 /*yield*/, message.channel.send("Searching " + searchQuery + " on AniList...")];
            case 1:
                sentMessage = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, , 10]);
                return [4 /*yield*/, anilistQueries_1.default.getAnime(searchQuery)];
            case 3:
                result = _b.sent();
                if (!!result) return [3 /*break*/, 5];
                return [4 /*yield*/, sentMessage.edit("Can't find " + searchQuery + " on AniList!")];
            case 4:
                _b.sent();
                return [2 /*return*/];
            case 5:
                embedMessage = new discord_js_1.MessageEmbed()
                    .setColor('#f55875')
                    .setTitle("" + (result.title.english ? result.title.english : result.title.romaji))
                    .setURL(result.siteUrl)
                    .setDescription(result.description.replace(/<br>/g, ''))
                    .addFields([
                    {
                        name: 'Alternate Name',
                        value: "" + (result.title.romaji && result.title.english ? result.title.romaji + ", " : '') + (result.title.native ? " " + result.title.native : '')
                    },
                    {
                        name: 'Season',
                        value: result.season + " " + result.seasonYear,
                        inline: true
                    },
                    {
                        name: 'Episodes',
                        value: result.episodes,
                        inline: true
                    },
                    {
                        name: 'Genres',
                        value: result.genres.join(', '),
                        inline: true
                    },
                    {
                        name: 'Casts',
                        value: result.characters.edges.map(function (item) {
                            var actor = "[" + item.voiceActors[0].name.full + "](" + item.voiceActors[0].siteUrl + ")";
                            var character = "[" + item.node.name.full + "](" + item.node.siteUrl + ")";
                            return "**" + actor + "**\nas " + character;
                        }).join('\n\n')
                    }
                ])
                    .setThumbnail(result.coverImage.medium)
                    .setFooter('Content from AniList', 'https://anilist.co/img/icons/favicon-32x32.png');
                return [4 /*yield*/, sentMessage.edit('Here\'s what I found on AniList:')];
            case 6:
                _b.sent();
                return [4 /*yield*/, sentMessage.edit(embedMessage)];
            case 7:
                _b.sent();
                return [3 /*break*/, 10];
            case 8:
                _a = _b.sent();
                return [4 /*yield*/, sentMessage.edit("Can't find " + searchQuery + " on AniList!")];
            case 9:
                _b.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); }, 'Get the detail of an anime');
exports.default = {
    id: 'acg',
    name: 'ACG',
    description: 'Commands related to the ACG culture',
    commands: [
        Staff,
        Anime
    ]
};
