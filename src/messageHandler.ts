import { Message } from 'discord.js'

import parseCommand from './util/parseCommand'

import Modules from './module'

function MessageHandler (message: Message): void {
  if (!message.author.bot) {
    try {
      const parsedCommand = parseCommand('=', message.content)
      const commands = Modules.reduce((prev, item) => {
        return [
          ...prev,
          ...item.commands
        ]
      }, [])
      const commandExists = commands.some(item => {
        if (parsedCommand.command === item.command) {
          item.callback(message, parsedCommand.args)
          return true
        }
      })
      if (!commandExists) {
        message.channel.send('Invalid command. please type `=help` to see available commands!')
      }
    } catch (e) {

    }
  }
}

export default MessageHandler
