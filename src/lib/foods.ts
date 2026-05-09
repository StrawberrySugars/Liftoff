import { writable } from 'svelte/store';

export interface Food {
    id: number;
    name: string;
    calories: number;
    amount: number;
}

const initialFoods: Food[] = [
    { id: 1, name: 'Nuts', calories: 0, amount: 800000 },
    { id: 2, name: 'Rice', calories: 102, amount: 1000 },
    { id: 3, name: 'Sausage', calories: 2, amount: 3000 },
    { id: 4, name: 'Chicken', calories: 2, amount: 2000 },
    { id: 5, name: 'Cookies', calories: 84, amount: 1000 }
];

function createFoodStore() {
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('foods') : null;
    const initialData = storedData ? JSON.parse(storedData) : initialFoods;

    const { subscribe, set, update } = writable<Food[]>(initialData);

    return {
        subscribe,
        addFood: (food: Omit<Food, 'id'>) =>
            update((items) => {
                const newFood = {
                    ...food,
                    id: Math.max(...items.map((b) => b.id), 0) + 1
                };
                const updated = [...items, newFood];
                localStorage.setItem('food', JSON.stringify(updated));
                return updated;
            }),
        removeFood: (id: number) =>
            update((items) => {
                const updated = items.filter((b) => b.id !== id);
                localStorage.setItem('food', JSON.stringify(updated));
                return updated;
            }),
        reset: () => {
            set(initialFoods);
            localStorage.setItem('food', JSON.stringify(initialFoods));
        }
    };
}

export const foods = createFoodStore();
