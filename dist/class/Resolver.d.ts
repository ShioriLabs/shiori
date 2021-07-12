import { Message } from 'discord.js';
declare class Resolver {
    command: string;
    callback: (message: Message, args?: string[]) => void;
    usage: string;
    constructor(command: string, callback: (message: Message, args?: string[]) => void | Promise<void>, usage?: string);
}
export default Resolver;
