class ParsedCommand {
  /**
   * Command to be run
   */
  command: string
  /**
   * Arguments passed with the command
   */
  args: string[]
  /**
   * Un-parsed command arguments
   */
  body: string

  /**
   * Creates new ParsedCommand instance
   * @param command Command to be run
   * @param arg Arguments passed with the command
   * @param body Un-parsed command arguments
   */
  constructor (command?: string, args?: string[], body?: string) {
    if (command !== undefined) {
      this.command = command
    }
    if (args !== undefined) {
      this.args = args
    }
    if (body !== undefined) {
      this.body = body
    }
  }
}

export default ParsedCommand
