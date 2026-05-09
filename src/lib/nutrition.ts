import { type Ingredient, type NutritionalValue } from './index';

function calculateNutritionalValue(ingredients: Ingredient[]): NutritionalValue {
    return ingredients.reduce(
        (total, ingredient) => ({
            calories: total.calories + ingredient.calories,
            protein: total.protein + ingredient.protein,
            fat: total.fat + ingredient.fat,
            carbs: total.carbs + ingredient.carbs
        }),
        { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );
}

export { calculateNutritionalValue };