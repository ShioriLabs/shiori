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

export default [
  Ping,
  Help
]
