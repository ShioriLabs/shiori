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

const Confess = new Resolver('confess', (message: Message) => {
  const user = message.mentions.users.first()

  if (user) {
    message.channel.send(`Hi <@!${user.id}>, do you want to be my boyfriend?`)
  } else {
    message.channel.send('Please @mention someone to confess')
  }
}, 'Confess to someone')

export default [
  // WuohMantab,
  Greet,
  Confess
]
