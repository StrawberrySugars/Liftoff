// place files you want to import through the `$lib` alias in this folder.

export interface Ingredient {
    id: string;
    name: string;
}

export interface NutritionalValue {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
}

export interface Meal {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    matchScore: number;
    nutritionalInfo: NutritionalValue;
}
