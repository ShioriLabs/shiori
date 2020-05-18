import { ServerContext } from '../class/Contexts'
import { Guild } from 'discord.js'

let Context: ServerContext[]

const addContext = (server: Guild): void => {
  const checkExistingContext = Context.find(item => item.server.id === server.id)
  if (!checkExistingContext) {
    const newContext: ServerContext = new ServerContext(server)
    Context.push(newContext)
  }
}

const getContext = (server: Guild): ServerContext | undefined => {
  let result = Context.find(item => item.server.id === server.id)
  if (!result) {
    addContext(server)
    result = Context.find(item => item.server.id === server.id)
  }
  return result
}

const removeContext = (server: Guild): void => {
  const filteredContext = Context.filter(ctx => ctx.server.id !== server.id)
  Context = filteredContext
}

const exportSetup = {
  addContext,
  getContext,
  removeContext
}

export default exportSetup
export { addContext, getContext, removeContext }
