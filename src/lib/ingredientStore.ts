import type { Ingredient } from '$lib';
import { writable } from 'svelte/store';

const initialIngredients: Ingredient[] = [

];

function createIngredientStore() {
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('ingredients') : null;
    const initialData = storedData ? JSON.parse(storedData) : initialIngredients;

    const { subscribe, set, update } = writable<Ingredient[]>(initialData);

    return {
        subscribe,
        addIngredient: (ingredient: Omit<Ingredient, 'id'>) =>
            update((items) => {
                const newIngredient = {
                    ...ingredient,
                    id: Math.max(...items.map((b) => b.id), 0) + 1
                };
                const updated = [...items, newIngredient];
                localStorage.setItem('ingredients', JSON.stringify(updated));
                return updated;
            }),
        removeIngredient: (id: number) =>
            update((items) => {
                const updated = items.filter((b) => b.id !== id);
                localStorage.setItem('ingredients', JSON.stringify(updated));
                return updated;
            }),
        reset: () => {
            set(initialIngredients);
            localStorage.setItem('ingredients', JSON.stringify(initialIngredients));
        }
    };
}

export const ingredients = createIngredientStore();
