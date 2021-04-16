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
var Resolver_1 = __importDefault(require("../../class/Resolver"));
// const WuohMantab = new Resolver('mantap', (message: Message) => {
//   const user = message.mentions.users.first()
//   if (user) {
//     message.channel.send(`Wuooohh mantab! Jadi teringat deg2annya di momen melihat <@!${user.id}> pekan lalu`)
//   } else {
//     message.channel.send('Wuooohh mantab! Jadi teringat deg2annya di momen senbatsu Uza pekan lalu')
//   }
// })
var Greet = new Resolver_1.default('greet', function (message) {
    var user = message.mentions.users.first();
    if (user) {
        message.channel.send("Hi <@!" + user.id + ">!");
    }
    else {
        message.channel.send('Hello All!');
    }
}, 'Greet someone (or anyone)');
var Confess = new Resolver_1.default('confess', function (message, args) {
    var user = message.mentions.users.first();
    var possibleString = [
        'do you want to be my lover?',
        'would you go out with me?',
        'can we go on a date together?',
        'can i love you?'
    ];
    var confession = possibleString[Math.floor(Math.random() * possibleString.length)];
    var who = args ? args.join(' ') : '';
    if (user) {
        who = "<@!" + user.id + ">";
    }
    message.channel.send("Hi " + who + ", " + confession);
}, 'Confess to someone!');
var Coin = new Resolver_1.default('coin', function (message) {
    var random = Math.random();
    message.channel.send(random > 0.5 ? 'Head' : 'Tails');
}, 'Flip a coin');
var Dice = new Resolver_1.default('dice', function (message) {
    var result = Math.ceil(Math.random() * 6);
    message.channel.send(result);
}, 'Roll a dice');
var Encourage = new Resolver_1.default('encourage', function (message, args) {
    var user = message.mentions.users.first();
    var possibleString = [
        'you can do it!',
        'don\'t let your dreams be dreams. So just do it!',
        'don\'t give up!',
        'I\'m proud of you! You can do it!',
        '頑張って！',
        '加油！'
    ];
    var encouragement = possibleString[Math.floor(Math.random() * possibleString.length)];
    if (user) {
        message.channel.send("<@!" + user.id + ">, " + encouragement);
    }
    else if (args && args.length === 1 && args[0].toLowerCase() === 'me') {
        message.channel.send("<@!" + message.author.id + ">, " + encouragement);
    }
    else {
        message.channel.send('Please mention someone you want to encourage!');
    }
}, 'Encourage someone to do their best!');
var Compliment = new Resolver_1.default('compliment', function (message) {
    var user = message.mentions.users.first();
    var possibleString = [
        'good job!',
        'keep it up!',
        'nice! keep it up!'
    ];
    var compliment = possibleString[Math.floor(Math.random() * possibleString.length)];
    if (user) {
        message.channel.send("<@!" + user.id + ">, " + compliment);
    }
    else {
        message.channel.send('Please mention someone you want to encourage!');
    }
}, 'Compliment someone for their hard work!');
var Pekofy = new Resolver_1.default('pekofy', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var msgId, msg, splittedMessages, punctuationsRegex_1, pekofiedMessages;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                msgId = (_a = message.reference) === null || _a === void 0 ? void 0 : _a.messageID;
                if (!msgId) return [3 /*break*/, 2];
                return [4 /*yield*/, message.channel.messages.fetch(msgId)];
            case 1:
                msg = _b.sent();
                splittedMessages = msg.content.split(/\./g);
                punctuationsRegex_1 = /[!?]/g;
                pekofiedMessages = splittedMessages.map(function (item) {
                    if (item.length >= 1) {
                        if (punctuationsRegex_1.test(item)) {
                            var splittedMessage = Array.from(item);
                            var punctuation = splittedMessage.pop();
                            return splittedMessage.join('') + " peko" + punctuation;
                        }
                        return item + " peko";
                    }
                    return item;
                });
                message.channel.send(pekofiedMessages.join('.'));
                return [3 /*break*/, 3];
            case 2:
                message.channel.send('Please reply to someone when using this command!');
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); }, 'Pekofy a message peko');
exports.default = {
    id: 'fun',
    name: 'Fun',
    description: 'Fun & Wholesome commands to spice things up!',
    commands: [
        // WuohMantab,
        Greet,
        Confess,
        Coin,
        Dice,
        Encourage,
        Compliment,
        Pekofy
    ]
};
