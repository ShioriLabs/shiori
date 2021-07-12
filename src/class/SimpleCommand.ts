import { Message } from 'discord.js'
import Resolver from './Resolver'

class SimpleCommand extends Resolver {
  constructor (command: string, callback: (message: Message, args?: string[]) => string | Promise<string>, usage?: string) {
    const _callback = async (_message: Message, _args?: string[]): Promise<void> => {
      const returnValue = await callback(_message, _args)
      _message.channel.send(returnValue)
    }

    super(command, _callback, usage)
  }
}

export default SimpleCommand
