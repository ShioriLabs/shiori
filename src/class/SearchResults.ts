import { GuildMember, Message } from 'discord.js'
import Audio from './Audio'

interface AudioSearchResult {
  user: GuildMember;
  sentMessage: Message;
  results: Audio[];
}

export default {}
export { AudioSearchResult }
