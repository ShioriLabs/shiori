import { Message } from 'discord.js'

class Resolver {
  command: string
  callback: (message: Message, args?: string[]) => void
  usage = 'A command'

  constructor (command: string, callback: (message: Message, args?: string[]) => void | Promise<void>, usage?: string) {
    this.command = command
    this.callback = callback
    if (usage !== undefined) {
      this.usage = usage
    }
  }
}

export default Resolver
