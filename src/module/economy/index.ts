import { Message, MessageEmbed } from 'discord.js'

import Resolver from '../../class/Resolver'

const Balance = new Resolver('balance', (message: Message) => {
  const messageEmbed = new MessageEmbed()
    .setColor('#ffaaa5')
    .setTitle('Account Statement')
    .addField('Account Holder', message.author.username)
    .addField('Balance', '0 BCN')
    .setTimestamp(Date.now())
  message.channel.send(messageEmbed)
}, 'Get balance info')

export default {
  id: 'economy',
  name: 'Economy',
  description: 'Earn and spend virtual currency',
  commands: [
    Balance
  ]
}
