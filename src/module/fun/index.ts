import { Message, MessageEmbed } from 'discord.js'

import Resolver from '../../class/Resolver'
import SimpleCommand from '../../class/SimpleCommand'

// const WuohMantab = new Resolver('mantap', (message: Message) => {
//   const user = message.mentions.users.first()

//   if (user) {
//     message.channel.send(`Wuooohh mantab! Jadi teringat deg2annya di momen melihat <@!${user.id}> pekan lalu`)
//   } else {
//     message.channel.send('Wuooohh mantab! Jadi teringat deg2annya di momen senbatsu Uza pekan lalu')
//   }
// })

const Greet = new SimpleCommand('greet', (message?: Message): string => {
  const user = message?.mentions.users.first()

  if (user) {
    return `Hi <@!${user.id}>!`
  }

  return 'Hello All!'
}, 'Greet someone (or anyone)')

const Confess = new SimpleCommand('confess', (message?: Message, args?: string[]): string => {
  const user = message?.mentions.users.first()

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

  return `Hi ${who}, ${confession}`
}, 'Confess to someone!')

const Coin = new SimpleCommand('coin', (): string => {
  const random = Math.random()
  return random > 0.5 ? 'Head' : 'Tails'
}, 'Flip a coin')

const Dice = new SimpleCommand('dice', (): string => {
  const result = Math.ceil(Math.random() * 6)
  return `The dice is rolled to ${result}!`
}, 'Roll a dice')

const Encourage = new SimpleCommand('encourage', (message?: Message, args?: string[]) => {
  const user = message?.mentions.users.first()

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
    return `<@!${user.id}>, ${encouragement}`
  } else if (args && args.length === 1 && args[0].toLowerCase() === 'me') {
    return `<@!${message?.author.id}>, ${encouragement}`
  }

  return 'Please mention someone you want to encourage!'
}, 'Encourage someone to do their best!')

const Compliment = new SimpleCommand('compliment', (message?: Message) => {
  const user = message?.mentions.users.first()

  const possibleString = [
    'good job!',
    'keep it up!',
    'nice! keep it up!'
  ]

  const compliment = possibleString[Math.floor(Math.random() * possibleString.length)]

  if (user) {
    return `<@!${user.id}>, ${compliment}`
  }
  return 'Please mention someone you want to encourage!'
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

const Mock = new Resolver('mock', async (message: Message, args?: string[]) => {
  const msgId = message.reference?.messageID
  if (msgId) {
    const msg = await message.channel.messages.fetch(msgId)
    const splittedText = msg.content.split('')
    const mockedText = splittedText.map(char => {
      if (Math.random() > 0.5) return char.toUpperCase()
      return char.toLowerCase()
    })
    message.channel.send(mockedText.join(''))
  } else if (args && args.length > 0) {
    const msg = args.join(' ')
    const splittedText = msg.split('')
    const mockedText = splittedText.map(char => {
      if (Math.random() > 0.5) return char.toUpperCase()
      return char.toLowerCase()
    })
    message.channel.send(mockedText.join(''))
  } else {
    message.channel.send('Please reply to someone or pass an argument when using this command!')
  }
}, 'MoCKifY a message')

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
    Mock,
    RockPaperScissor
  ]
}
