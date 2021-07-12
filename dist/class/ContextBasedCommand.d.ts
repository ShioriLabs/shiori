import { Message } from 'discord.js';
import SimpleCommand from './SimpleCommand';
declare class ContextBasedCommand extends SimpleCommand {
    constructor(command: string, callback: (message: Message, args?: string[]) => Promise<string>, usage?: string);
}
export default ContextBasedCommand;
