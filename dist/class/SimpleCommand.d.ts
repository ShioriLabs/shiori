import { Message } from 'discord.js';
import Resolver from './Resolver';
declare class SimpleCommand extends Resolver {
    constructor(command: string, callback: (message?: Message, args?: string[]) => string, usage?: string);
}
export default SimpleCommand;
