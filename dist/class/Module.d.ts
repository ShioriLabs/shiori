import Resolver from './Resolver';
interface Module {
    id: string;
    name: string;
    description: string;
    commands: Resolver[];
}
export default Module;
