export interface Recipe {
    _id: string;
    title: string;
    imgUrls: [];
    videoUrl: [];
    createdAt: number;
    desc: string;
    yield: object;
    tools: [];
    labels: [];
    allIngredients: [];
    howToPrepare:[];
    notes: [];
    comments: [];

}