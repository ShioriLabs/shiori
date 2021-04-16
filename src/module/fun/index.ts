import { Message, MessageEmbed } from 'discord.js'

import Resolver from '../../class/Resolver'

// const WuohMantab = new Resolver('mantap', (message: Message) => {
//   const user = message.mentions.users.first()

//   if (user) {
//     message.channel.send(`Wuooohh mantab! Jadi teringat deg2annya di momen melihat <@!${user.id}> pekan lalu`)
//   } else {
//     message.channel.send('Wuooohh mantab! Jadi teringat deg2annya di momen senbatsu Uza pekan lalu')
//   }
// })

const Greet = new Resolver('greet', (message: Message) => {
  const user = message.mentions.users.first()

  if (user) {
    message.channel.send(`Hi <@!${user.id}>!`)
  } else {
    message.channel.send('Hello All!')
  }
}, 'Greet someone (or anyone)')

const Confess = new Resolver('confess', (message: Message, args?: string[]) => {
  const user = message.mentions.users.first()

  const possibleString = [
    'do you want to be my lover?',
    'would you go out with me?',
    'can we go on a date together?',
    'can i love you?'
  ]

  const confession = possibleString[Math.floor(Math.random() * possibleString.length)]
  let who = args ? args.join(' ') : ''

  if (user) {
    who = `<@!${user.id}>`
  }

  message.channel.send(`Hi ${who}, ${confession}`)
}, 'Confess to someone!')

const Coin = new Resolver('coin', (message: Message) => {
  const random = Math.random()
  message.channel.send(random > 0.5 ? 'Head' : 'Tails')
}, 'Flip a coin')

const Dice = new Resolver('dice', (message: Message) => {
  const result = Math.ceil(Math.random() * 6)
  message.channel.send(result)
}, 'Roll a dice')

const Encourage = new Resolver('encourage', (message: Message, args?: string[]) => {
  const user = message.mentions.users.first()

  const possibleString = [
    'you can do it!',
    'don\'t let your dreams be dreams. So just do it!',
    'don\'t give up!',
    'I\'m proud of you! You can do it!',
    '頑張って！',
    '加油！'
  ]

  const encouragement = possibleString[Math.floor(Math.random() * possibleString.length)]

  if (user) {
    message.channel.send(`<@!${user.id}>, ${encouragement}`)
  } else if (args && args.length === 1 && args[0].toLowerCase() === 'me') {
    message.channel.send(`<@!${message.author.id}>, ${encouragement}`)
  } else {
    message.channel.send('Please mention someone you want to encourage!')
  }
}, 'Encourage someone to do their best!')

const Compliment = new Resolver('compliment', (message: Message) => {
  const user = message.mentions.users.first()

  const possibleString = [
    'good job!',
    'keep it up!',
    'nice! keep it up!'
  ]

  const compliment = possibleString[Math.floor(Math.random() * possibleString.length)]

  if (user) {
    message.channel.send(`<@!${user.id}>, ${compliment}`)
  } else {
    message.channel.send('Please mention someone you want to encourage!')
  }
}, 'Compliment someone for their hard work!')

const Pekofy = new Resolver('pekofy', async (message: Message) => {
  const msgId = message.reference?.messageID
  if (msgId) {
    const msg = await message.channel.messages.fetch(msgId)
    const splittedMessages = msg.content.split(/\./g)
    const punctuationsRegex = /[!?]/g
    const pekofiedMessages = splittedMessages.map(item => {
      if (item.length >= 1) {
        if (punctuationsRegex.test(item)) {
          const splittedMessage = Array.from(item)
          const punctuation = splittedMessage.pop()
          return `${splittedMessage.join('')} peko${punctuation}`
        }
        return `${item} peko`
      }
      return item
    })
    message.channel.send(pekofiedMessages.join('.'))
  } else {
    message.channel.send('Please reply to someone when using this command!')
  }
}, 'Pekofy a message peko')

const RockPaperScissor = new Resolver('rps', async (message: Message) => {
  const choices = ['✌', '✊', '✋']
  const player1 = {
    player: `${message.author.tag}`,
    choice: choices[Math.floor(Math.random() * choices.length)]
  }
  const player2 = {
    player: message.mentions.users.first()?.tag ?? 'Shiori',
    choice: choices[Math.floor(Math.random() * choices.length)]
  }
  const msg = new MessageEmbed({
    title: 'Rock-Paper-Scissor',
    color: '#f55875',
    fields: [
      {
        name: player1.player,
        value: player1.choice,
        inline: true
      },
      {
        name: player2.player,
        value: player2.choice,
        inline: true
      }
    ]
  })

  message.channel.send(msg)
}, 'Play rock-paper-scissors with someone!')

export default {
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
    Pekofy,
    RockPaperScissor
  ]
}
