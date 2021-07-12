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
var axios_1 = __importDefault(require("axios"));
var jsqr_1 = __importDefault(require("jsqr"));
var jimp_1 = __importDefault(require("jimp"));
var Resolver_1 = __importDefault(require("../../class/Resolver"));
var ContextBasedCommand_1 = __importDefault(require("../../class/ContextBasedCommand"));
var Define = new Resolver_1.default('define', function (message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var sentMessage, query, searchResult, data, page, extract, resultMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(!args || args.length === 0)) return [3 /*break*/, 1];
                message.channel.send('You need to insert something to search!');
                return [3 /*break*/, 9];
            case 1: return [4 /*yield*/, message.channel.send('Let me search Wikipedia for that...')];
            case 2:
                sentMessage = _a.sent();
                query = encodeURI(args.join(' '));
                return [4 /*yield*/, axios_1.default.get("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + query + "&utf8=&format=json")];
            case 3:
                searchResult = (_a.sent()).data;
                if (!(searchResult.query.search.length === 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, sentMessage.edit("Can't find `" + args.join(' ') + "` in Wikipedia. Please try again")];
            case 4:
                _a.sent();
                return [2 /*return*/];
            case 5: return [4 /*yield*/, axios_1.default.get("https://en.wikipedia.org/w/api.php?&action=query&prop=extracts|info&titles=" + encodeURI(searchResult.query.search[0].title) + "&format=json&inprop=url&explaintext=true&exlimit=1&exintro=true")];
            case 6:
                data = (_a.sent()).data;
                page = Object.values(data.query.pages)[0];
                extract = page.extract;
                if (extract.length > 1950) {
                    extract = extract.substring(0, 1954) + "... (" + (extract.length - 1950) + " more characters)";
                }
                resultMessage = new discord_js_1.MessageEmbed()
                    .setColor('#f55875')
                    .setTitle(page.title)
                    .setURL(page.fullurl)
                    .setDescription(extract)
                    .setFooter('Content from Wikipedia');
                return [4 /*yield*/, sentMessage.edit('Here\'s what I found on Wikipedia:')];
            case 7:
                _a.sent();
                return [4 /*yield*/, sentMessage.edit(resultMessage)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); }, 'Get a definition of something from Wikipedia');
var Urban = new Resolver_1.default('urban', function (message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var sentMessage, query, data, result, resultMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(!args || args.length === 0)) return [3 /*break*/, 1];
                message.channel.send('You need to insert something to search!');
                return [3 /*break*/, 8];
            case 1: return [4 /*yield*/, message.channel.send('Let me search Urban Dictionary for that...')];
            case 2:
                sentMessage = _a.sent();
                query = encodeURI(args.join(''));
                return [4 /*yield*/, axios_1.default.get("http://api.urbandictionary.com/v0/define?term=" + query)];
            case 3:
                data = (_a.sent()).data;
                if (!(data.list.length === 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, sentMessage.edit("Can't find " + args.join(' ') + " on Urban Dictionary")];
            case 4:
                _a.sent();
                return [2 /*return*/];
            case 5:
                result = data.list[0];
                resultMessage = new discord_js_1.MessageEmbed()
                    .setColor('#f55875')
                    .setTitle(result.word)
                    .setURL(result.permalink)
                    .setDescription(result.definition)
                    .setFooter('Content from Urban Dictionary')
                    .addFields([
                    {
                        name: 'Examples',
                        value: result.example,
                        inline: false
                    }
                ]);
                return [4 /*yield*/, sentMessage.edit('Here\'s what I found on Urban Dictionary:')];
            case 6:
                _a.sent();
                return [4 /*yield*/, sentMessage.edit(resultMessage)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); }, 'Get a definition of something from Urban Dictionary');
var ScanQR = new ContextBasedCommand_1.default('scan-qr', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var image, attachmentFile, attachmentBuffer, imageObject, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image = message.attachments.first();
                if (!image) return [3 /*break*/, 3];
                return [4 /*yield*/, axios_1.default.get(image.url, { responseType: 'arraybuffer' })];
            case 1:
                attachmentFile = _a.sent();
                attachmentBuffer = Buffer.from(attachmentFile.data);
                return [4 /*yield*/, jimp_1.default.read(attachmentBuffer)];
            case 2:
                imageObject = _a.sent();
                result = jsqr_1.default(new Uint8ClampedArray(imageObject.bitmap.data), imageObject.bitmap.width, imageObject.bitmap.height);
                if (result) {
                    message.react('✅');
                    message.react('🆗');
                    return [2 /*return*/, "That QR Code contains: " + result.data];
                }
                message.react('❌');
                message.react('🆖');
                return [2 /*return*/, 'That QR Code seems invalid, let\'s try again!'];
            case 3: return [2 /*return*/, 'No image detected, let\'s try again!'];
        }
    });
}); }, 'Scan a QR code');
exports.default = {
    id: 'util',
    name: 'Utilities',
    description: 'Useful commands for getting real world info',
    commands: [
        Define,
        Urban,
        ScanQR
    ]
};
