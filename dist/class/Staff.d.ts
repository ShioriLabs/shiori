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
}
export default Staff;
