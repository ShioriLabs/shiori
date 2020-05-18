import { ServerContext } from '../class/Contexts';
import { Guild } from 'discord.js';
declare const addContext: (server: Guild) => void;
declare const getContext: (server: Guild) => ServerContext | undefined;
declare const removeContext: (server: Guild) => void;
declare const exportSetup: {
    addContext: (server: Guild) => void;
    getContext: (server: Guild) => ServerContext | undefined;
    removeContext: (server: Guild) => void;
};
export default exportSetup;
export { addContext, getContext, removeContext };
