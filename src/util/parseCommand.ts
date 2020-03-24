import ParsedCommand from '../class/ParsedCommand'

function parseCommand (prefix: string, message: string): ParsedCommand {
  if (message.startsWith(prefix)) {
    const split = message.replace(prefix, '').split(/ /g)
    const command = split.shift()
    return new ParsedCommand(command, split, split.join(' '))
  } else {
    throw new Error('Invalid command')
  }
}

export default parseCommand
