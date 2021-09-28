import Resolver from '../class/Resolver'

interface Module {
  id: string;
  name: string;
  description: string;
  commands: Resolver[];
}

export default Module
