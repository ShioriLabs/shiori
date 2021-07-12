import { Message } from 'discord.js'
import SimpleCommand from './SimpleCommand'

class ContextBasedCommand extends SimpleCommand {
  constructor (command: string, callback: (message: Message, args?: string[]) => Promise<string>, usage?: string) {
    const _callback = async (_message: Message, args?: string[]): Promise<string> => {
      if (_message && _message.reference?.messageID) {
        const msg = await _message.channel.messages.fetch(_message.reference.messageID)
        return callback(msg, args)
      }
      return callback(_message, args)
    }

    super(command, _callback, usage)
  }
}

export default ContextBasedCommand
