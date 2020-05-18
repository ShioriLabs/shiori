declare class ParsedCommand {
    /**
     * Command to be run
     */
    command: string;
    /**
     * Arguments passed with the command
     */
    args: string[];
    /**
     * Un-parsed command arguments
     */
    body: string;
    /**
     * Creates new ParsedCommand instance
     * @param command Command to be run
     * @param arg Arguments passed with the command
     * @param body Un-parsed command arguments
     */
    constructor(command?: string, args?: string[], body?: string);
}
export default ParsedCommand;
