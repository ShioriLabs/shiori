import { Message } from 'discord.js'
import * as Sentry from '@sentry/node'

import parseCommand from './util/parseCommand'

import Modules from './module'
import Module from './class/Module'
import Resolver from './class/Resolver'

function MessageHandler (message: Message): void {
  if (!message.author.bot) {
    try {
      const parsedCommand = parseCommand(process.env.NODE_ENV === 'development' ? 't=' : '=', message.content)
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
      Sentry.captureException(e)
      message.channel.send('I- I don\'t know how to understand this and something gone wrong. Please try again!')
    }
  }
}

export default MessageHandler
