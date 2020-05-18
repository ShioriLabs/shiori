"use strict";
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
        Compliment
    ]
};
