import { GuildMember, Message } from 'discord.js';
import UserAudioContext from '../class/UserAudioContext';
declare let userContext: Array<{
    user: GuildMember;
    audioMessage: Message;
    context: UserAudioContext[];
}>;
declare function addContext(user: GuildMember, audioMessage: Message, context: UserAudioContext[]): void;
declare function removeContext(user: GuildMember): void;
declare function getContext(user: GuildMember): {
    user: GuildMember;
    audioMessage: Message;
    context: UserAudioContext[];
} | undefined;
export default userContext;
export { addContext };
export { removeContext };
export { getContext };
