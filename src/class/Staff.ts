interface Staff {
  id: number;
  name: {
    first: string;
    last?: string;
    native: string;
  };
  description: string;
  image: {
    medium: string;
  };
  siteUrl: string;
}

export default Staff
