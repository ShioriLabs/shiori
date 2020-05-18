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
var faunaQueries_1 = require("../../util/faunaQueries");
var Resolver_1 = __importDefault(require("../../class/Resolver"));
var Balance = new Resolver_1.default('balance', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var account, messageEmbed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, faunaQueries_1.getAccountInfo(message.author)];
            case 1:
                account = _a.sent();
                messageEmbed = new discord_js_1.MessageEmbed()
                    .setColor('#ffaaa5')
                    .setTitle('Account Statement')
                    .addField('Account Holder', message.author.username)
                    .addField('Balance', account.data.balance + " BCN")
                    .setTimestamp(Date.now());
                message.channel.send(messageEmbed);
                return [2 /*return*/];
        }
    });
}); }, 'Get balance info');
var Send = new Resolver_1.default('send', function (message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var to, amount, embed, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!args) return [3 /*break*/, 4];
                to = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
                if (!to) {
                    message.channel.send('You need to specify the user you want to send money to');
                    return [2 /*return*/];
                }
                args.shift();
                if (args.length === 0) {
                    message.channel.send('Please specify the amount you want to send');
                    return [2 /*return*/];
                }
                amount = Number.parseInt(args.shift());
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, faunaQueries_1.sendMoney(message.author, to.user, amount)];
            case 2:
                _b.sent();
                embed = new discord_js_1.MessageEmbed()
                    .setColor('#ffaaa5')
                    .setTitle('Money Received!')
                    .setDescription(message.author.tag + " has send you some money!")
                    .addFields([
                    {
                        name: 'Received',
                        value: amount + " BCN",
                        inline: true
                    },
                    {
                        name: 'From',
                        value: message.author.tag,
                        inline: true
                    }
                ])
                    .setTimestamp(Date.now());
                if (args.length > 0) {
                    embed.addFields([
                        {
                            name: 'Message',
                            value: args.join(' '),
                            inline: false
                        }
                    ]);
                }
                to.user.send(embed);
                message.channel.send("Successfully sent " + amount + " BCN to <@!" + to.user.id + ">!");
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                if (e_1 instanceof Error && e_1.message === 'Not enough balance') {
                    message.reply(e_1.message);
                }
                else {
                    console.log(e_1);
                    message.channel.send('I\'m sorry, I can\'t do that right now. Please try again');
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }, 'Send money to someone');
exports.default = {
    id: 'economy',
    name: 'Economy',
    description: 'Earn and spend virtual currency',
    commands: [
        Balance,
        Send
    ]
};
