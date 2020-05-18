import { GuildMember, Message } from 'discord.js';
import Audio from './Audio';
interface AudioSearchResult {
    user: GuildMember;
    sentMessage: Message;
    results: Audio[];
}
declare const _default: {};
export default _default;
export { AudioSearchResult };
