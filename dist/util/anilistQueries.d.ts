import Staff from '../class/Staff';
import Anime from '../class/Anime';
declare const _default: {
    getStaff: (query: string) => Promise<Staff | null | undefined>;
    getAnime: (query: string) => Promise<Anime | null | undefined>;
};
export default _default;
