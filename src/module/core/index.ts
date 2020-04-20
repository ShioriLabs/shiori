import { Message, MessageEmbed } from 'discord.js'

import Resolver from '../../class/Resolver'
import compileHelpFile from '../../util/compileHelpFile'

const Ping = new Resolver('ping', (message: Message) => {
  message.reply('Pong!')
}, 'Ping the bot')

const Help = new Resolver('help', (message: Message) => {
  const commandList = compileHelpFile()
  const HelpEmbed = new MessageEmbed()
    .setColor('#ffaaa5')
    .setTitle('HELP')
    .addFields([
      ...commandList.map(item => {
        return {
          name: `\`${item.command}\``,
          value: item.usage
        }
      })
    ])

  message.channel.send(HelpEmbed)
}, 'Show this help message')

const Echo = new Resolver('echo', (message: Message, args: string[]) => {
  if (args.length > 0) {
    const text = args.join(' ')
    message.channel.send(text)
  } else {
    message.channel.send('Please type something to echo')
  }
}, 'Echo back a text')

export default [
  Ping,
  Help,
  Echo
]
