interface Anime {
  id: number;
  title: {
    english?: string;
    native?: string;
    romaji?: string;
  };
  description: string;
  season: string;
  seasonYear: number;
  episodes: number;
  coverImage: {
    medium: string;
  };
  genres: string[];
  siteUrl: string;
}

export default Anime
