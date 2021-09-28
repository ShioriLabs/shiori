import Modules from '../modules'
import Resolver from '../class/Resolver'

function compileHelpFile (module: string): {name: string; description: string; help: {command: string; usage: string}[]} {
  const mod = Modules.filter(item => item.id === module)
  if (mod.length === 0) {
    throw new Error()
  }
  return {
    name: mod[0].name,
    description: mod[0].description,
    help: mod[0].commands.map((item: Resolver) => {
      return {
        command: `=${item.command}`,
        usage: item.usage
      }
    })
  }
}

function compileHelpPage (): Array<{ module: string; description: string; id: string }> {
  return Modules.map(item => {
    return {
      module: item.name,
      description: item.description,
      id: `=help ${item.id}`
    }
  })
}

export default { compileHelpPage, compileHelpFile }
export { compileHelpPage, compileHelpFile }
