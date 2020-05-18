import { GuildMember, Message } from 'discord.js'
import UserAudioContext from '../class/UserAudioContext'

let userContext: Array<{user: GuildMember; audioMessage: Message; context: UserAudioContext[]}> = []

function addContext (user: GuildMember, audioMessage: Message, context: UserAudioContext[]): void {
  const existingContext = userContext.find(item => item.user.id === user.id)
  if (existingContext) {
    existingContext.context = context
  } else {
    userContext.push({
      user,
      audioMessage,
      context
    })
  }
}

function removeContext (user: GuildMember): void {
  userContext = userContext.filter(item => item.user.id !== user.id)
}

function getContext (user: GuildMember): {user: GuildMember; audioMessage: Message; context: UserAudioContext[]} | undefined {
  return userContext.find(item => item.user.id === user.id)
}

export default userContext
export { addContext }
export { removeContext }
export { getContext }
