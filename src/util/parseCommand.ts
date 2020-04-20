import ParsedCommand from '../class/ParsedCommand'

function parseCommand (prefix: string, message: string): ParsedCommand {
  if (message.startsWith(prefix) || message.toLowerCase().startsWith('hey shiori, ')) {
    const split = message.replace(prefix, '').replace('hey shiori, ', '').split(/ /g)
    const command = split.shift()
    return new ParsedCommand(command, split, split.join(' '))
  } else {
    throw new Error('Invalid command')
  }
}

export default parseCommand
