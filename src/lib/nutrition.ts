import { type Ingredient, type NutritionalValue } from './index';

function calculateNutritionalValue(ingredients: Ingredient[]): NutritionalValue {
    return {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0
    };
}

export { calculateNutritionalValue };