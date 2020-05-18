import Audio from './Audio';
import { AudioSearchResult } from './SearchResults';
import { Guild, StreamDispatcher, GuildMember, Message } from 'discord.js';
declare class AudioContext {
    queue: Audio[];
    nowPlaying: Audio;
    dispatcher: StreamDispatcher;
    searchResult: AudioSearchResult[];
    setDispatcher(dispatcher: StreamDispatcher): void;
    setSearchResult(user: GuildMember, sentMessage: Message, results: Audio[]): void;
}
declare class ServerContext {
    server: Guild;
    context: {
        audio: AudioContext;
    };
    constructor(server: Guild);
}
export default ServerContext;
export { ServerContext, AudioContext };
