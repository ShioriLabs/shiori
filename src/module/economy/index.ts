import { Message, MessageEmbed } from 'discord.js'

import { getBalance } from '../../util/faunaQueries'

import Resolver from '../../class/Resolver'

const Balance = new Resolver('balance', async (message: Message) => {
  const balance = await getBalance(message.member)
  const messageEmbed = new MessageEmbed()
    .setColor('#ffaaa5')
    .setTitle('Account Statement')
    .addField('Account Holder', message.author.username)
    .addField('Balance', `${balance} BCN`)
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
