import Audio from './Audio'
import { AudioSearchResult } from './SearchResults'
import { Guild, StreamDispatcher, GuildMember, Message } from 'discord.js'

class AudioContext {
  queue: Audio[];
  nowPlaying: Audio;
  dispatcher: StreamDispatcher;
  searchResult: AudioSearchResult[];

  setDispatcher (dispatcher: StreamDispatcher): void {
    this.dispatcher = dispatcher
  }

  setSearchResult (user: GuildMember, sentMessage: Message, results: Audio[]): void {
    const existing = this.searchResult.find(item => item.user.id === user.id)
    if (existing) {
      existing.sentMessage = sentMessage
      existing.results = results
    } else {
      this.searchResult.push({
        user,
        sentMessage,
        results
      })
    }
  }
}

class ServerContext {
  server: Guild;
  context: {
    audio: AudioContext;
  };

  constructor (server: Guild) {
    this.server = server
    this.context.audio = new AudioContext()
  }
}

export default ServerContext
export { ServerContext, AudioContext }
