import { Message } from 'discord.js'

import parseCommand from './util/parseCommand'

import Modules from './module'
import Module from './class/Module'
import Resolver from './class/Resolver'

function MessageHandler (message: Message): void {
  if (!message.author.bot) {
    try {
      const parsedCommand = parseCommand('=', message.content)
      const commands = Modules.reduce((prev: Resolver[], item: Module): Resolver[] => {
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
        return false
      })
      if (!commandExists) {
        message.channel.send('Invalid command. please type `=help` to see available commands!')
      }
    } catch (e) {

    }
  }
}

export default MessageHandler
