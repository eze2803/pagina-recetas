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
    extendedIngredients: Ingredients[];
    analyzedInstructions: { steps: IStep[] }[];
}
