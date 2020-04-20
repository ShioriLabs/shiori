import { Message } from 'discord.js'

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

const Confess = new Resolver('confess', (message: Message, args: string[]) => {
  const user = message.mentions.users.first()

  const possibleString = [
    'do you want to be my lover?',
    'would you go out with me?',
    'can we go on a date together?',
    'can i love you?'
  ]

  const confession = possibleString[Math.floor(Math.random() * possibleString.length)]
  let who = args.join(' ')

  if (user) {
    who = `<@!${user.id}>`
  }

  message.channel.send(`Hi ${who}, ${confession}`)
}, 'Confess to someone!')

const Coin = new Resolver('coin', (message: Message) => {
  const random = Math.random()
  message.channel.send(random > 0.5 ? 'Head' : 'Tails')
}, 'Flip a coin')

const Encourage = new Resolver('encourage', (message: Message) => {
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
  } else {
    message.channel.send('Please mention someone you want to encourage!')
  }
}, 'Encourage someone to do their best!')

export default [
  // WuohMantab,
  Greet,
  Confess,
  Coin,
  Encourage
]
