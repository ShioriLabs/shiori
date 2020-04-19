import Audio from './Audio'
import { AudioSearchResult } from './SearchResults'
import { Guild, StreamDispatcher } from 'discord.js'

interface ServerContext {
  server: Guild;
  context: {
    audio: AudioContext;
  };
}

interface AudioContext {
  queue: Audio[];
  nowPlaying?: Audio;
  dispatcher?: StreamDispatcher;
  searchResult: AudioSearchResult[];
}

export default ServerContext
export { ServerContext, AudioContext }
