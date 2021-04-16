import { Message, MessageEmbed } from 'discord.js'

import Resolver from '../../class/Resolver'
import { compileHelpFile, compileHelpPage } from '../../util/compileHelpFile'

const Ping = new Resolver('ping', (message: Message) => {
  message.reply('Pong!')
}, 'Ping the bot')

const Help = new Resolver('help', (message: Message, args?: string[]) => {
  if (args && args.length === 0) {
    const commandList = compileHelpPage()
    const HelpEmbed = new MessageEmbed()
      .setColor('#f55875')
      .setTitle('Help Page')
      .setDescription('Get help on the modules by typing `=help <module>`. Below is the available modules')
      .addFields([
        ...commandList.map(item => {
          return {
            name: `\`${item.id}\``,
            value: `**${item.module}**: ${item.description}`
          }
        })
      ])
    message.channel.send(HelpEmbed)
  } else {
    const moduleName = (args && args.join(' ')) as string
    try {
      const commandList = compileHelpFile(moduleName)
      const HelpEmbed = new MessageEmbed()
        .setColor('#f55875')
        .setTitle(`Help Page: ${commandList.name}`)
        .setDescription(`${commandList.description}`)
        .addFields([
          ...commandList.help.map(item => {
            return {
              name: `\`${item.command}\``,
              value: item.usage
            }
          })
        ])
      message.channel.send(HelpEmbed)
    } catch {
      message.channel.send('Can\'t get help for that module. Please try again')
    }
  }
}, 'Show this help message')

const Echo = new Resolver('echo', (message: Message, args?: string[]) => {
  if (args && args.length > 0) {
    const text = args.join(' ')
    message.channel.send(text)
  } else {
    message.channel.send('Please type something to echo')
  }
}, 'Echo back a text')

export default {
  id: 'core',
  name: 'Core',
  description: 'Core Shiori commands',
  commands: [
    Ping,
    Help,
    Echo
  ]
}
