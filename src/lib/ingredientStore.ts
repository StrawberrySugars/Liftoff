import type { Ingredient } from '$lib';
import { writable } from 'svelte/store';

const initialIngredients: Ingredient[] = [
    { id: 1, name: 'Soybean' },
    { id: 2, name: 'Lettuce (Green leaf)' },
    { id: 3, name: 'Carrot' },
    { id: 4, name: 'Sweet potato' },
    { id: 5, name: 'Chickpea', },
    { id: 6, name: 'Tomato', },
    { id: 7, name: 'Wheat', },
    { id: 8, name: 'Dill', },
    { id: 9, name: 'Basil', }
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
