interface Staff {
  id: number;
  name: {
    native: string;
    full: string;
  };
  description: string;
  image: {
    medium: string;
  };
  siteUrl: string;
  age: number;
  characters: {
    edges: [{
      media: [{
        title: {
          romaji: string;
          english: string;
          native: string;
        };
        siteUrl: string;
      }];
      node: {
        name: {
          full: string;
          native: string;
        };
        siteUrl: string;
      };
    }];
  };
}

export default Staff
