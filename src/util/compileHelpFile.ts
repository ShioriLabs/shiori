import Modules from '../module'
import Resolver from '../class/Resolver'

function compileHelpFile (): Array<{command: string; usage: string}> {
  return Modules.map((item: Resolver) => {
    return {
      command: `=${item.command}`,
      usage: item.usage
    }
  })
}

export default compileHelpFile
