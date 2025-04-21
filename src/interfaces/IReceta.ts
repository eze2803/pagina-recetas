export interface Ingredients {
    original: string;
}

export interface IStep {
    number: number;
    step: string;
}

export interface IReceta {
    id?: number;
    title?: string;
    image?: string;
    summary?: string;
    extendedIngredients?: Ingredients[];
    analyzedInstructions?: {
        name: string;
        steps: IStep[];
    }[];
}
