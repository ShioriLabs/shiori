import { Message, MessageEmbed } from 'discord.js'

import { getAccountInfo, sendMoney } from '../../util/faunaQueries'

import Resolver from '../../class/Resolver'

const Balance = new Resolver('balance', async (message: Message) => {
  const account = await getAccountInfo(message.member)
  const messageEmbed = new MessageEmbed()
    .setColor('#ffaaa5')
    .setTitle('Account Statement')
    .addField('Account Holder', message.author.username)
    .addField('Balance', `${account.data.balance} BCN`)
    .setTimestamp(Date.now())
  message.channel.send(messageEmbed)
}, 'Get balance info')

const Send = new Resolver('send', async (message: Message, args: string[]) => {
  const to = message.mentions.members.first()
  if (!to) {
    message.channel.send('You need to specify the user you want to send money to')
    return
  }
  args.shift()
  if (args.length === 0) {
    message.channel.send('Please specify the amount you want to send')
    return
  }
  const amount = Number.parseInt(args.shift())
  try {
    await sendMoney(message.member, to, amount)
    const embed = new MessageEmbed()
      .setColor('#ffaaa5')
      .setTitle('Money Received!')
      .setDescription(`${message.author.tag} has send you some money!`)
      .addFields([
        {
          name: 'Received',
          value: `${amount} BCN`,
          inline: true
        },
        {
          name: 'From',
          value: message.author.tag,
          inline: true
        }
      ])
      .setTimestamp(Date.now())
    if (args.length > 0) {
      embed.addFields([
        {
          name: 'Message',
          value: args.join(' '),
          inline: false
        }
      ])
    }
    to.user.send(embed)
    message.channel.send(`Successfully sent ${amount} BCN to <!@${to.user.id}>!`)
  } catch (e) {
    if (e instanceof Error && e.message === 'Not enough balance') {
      message.reply(e.message)
    } else {
      console.log(e)
      message.channel.send('I\'m sorry, I can\'t do that right now. Please try again')
    }
  }
}, 'Send money to someone')

export default {
  id: 'economy',
  name: 'Economy',
  description: 'Earn and spend virtual currency',
  commands: [
    Balance,
    Send
  ]
}
