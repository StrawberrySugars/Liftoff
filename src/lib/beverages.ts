import { writable } from 'svelte/store';

export interface Beverage {
    id: number;
    name: string;
}

const initialBeverages: Beverage[] = [
    { id: 1, name: 'Water' },
    { id: 2, name: 'Orange Juice' },
    { id: 3, name: 'Coffee' },
    { id: 4, name: 'Tea' },
    { id: 5, name: 'Smoothie' }
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
