import { writable } from 'svelte/store';

export interface Beverage {
    id: number;
    name: string;
    description: string;
}

const initialBeverages: Beverage[] = [
    { id: 1, name: 'Water', description: 'Pure drinking water' },
    { id: 2, name: 'Orange Juice', description: 'Fresh squeezed orange juice' },
    { id: 3, name: 'Coffee', description: 'Freshly brewed coffee' },
    { id: 4, name: 'Tea', description: 'Hot brewed tea' },
    { id: 5, name: 'Smoothie', description: 'Fruit smoothie' }
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
