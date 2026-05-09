import { writable } from 'svelte/store';

export interface Beverage {
    id: number;
    name: string;
    calories: number;
    amount: number;
}

const initialBeverages: Beverage[] = [
    { id: 1, name: 'Water', calories: 0, amount: 800000 },
    { id: 2, name: 'Orange Juice', calories: 102, amount: 1000 },
    { id: 3, name: 'Coffee', calories: 2, amount: 3000 },
    { id: 4, name: 'Tea', calories: 2, amount: 2000 },
    { id: 5, name: 'Smoothie', calories: 84, amount: 1000 }
];

function createBeverageStore() {
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('beverages') : null;
    const initialData = storedData ? JSON.parse(storedData) : initialBeverages;

    const { subscribe, set, update } = writable<Beverage[]>(initialData);

    return {
        subscribe,
        addBeverage: (beverage: Omit<Beverage, 'id'>) =>
            update((items) => {
                const newBeverage = {
                    ...beverage,
                    id: Math.max(...items.map((b) => b.id), 0) + 1
                };
                const updated = [...items, newBeverage];
                localStorage.setItem('beverages', JSON.stringify(updated));
                return updated;
            }),
        removeBeverage: (id: number) =>
            update((items) => {
                const updated = items.filter((b) => b.id !== id);
                localStorage.setItem('beverages', JSON.stringify(updated));
                return updated;
            }),
        reset: () => {
            set(initialBeverages);
            localStorage.setItem('beverages', JSON.stringify(initialBeverages));
        }
    };
}

export const beverages = createBeverageStore();
