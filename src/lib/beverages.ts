import { writable } from 'svelte/store';

export interface Beverage {
    name: string;
    requiredPlants: string[];
    amount: number;
}

const initialBeverages: Beverage[] = [
    {
        "name": "Water",
        "requiredPlants": [],
        "amount": 1
    },
    {
        "name": "Coffee",
        "requiredPlants": ["Coffee beans"],
        "amount": 1
    },
    {
        "name": "Tea",
        "requiredPlants": ["Tea leaves"],
        "amount": 1
    }
];

function normalizeBeverages(items: Beverage[]) {
    return items.map((beverage) => ({
        ...beverage,
        amount: beverage.amount ?? 1
    }));
}

function createBeverageStore() {
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('beverages') : null;
    const initialData = storedData ? normalizeBeverages(JSON.parse(storedData)) : initialBeverages;

    const { subscribe, set, update } = writable<Beverage[]>(initialData);

    return {
        subscribe,
        addBeverage: (beverage: Omit<Beverage, 'id'>) =>
            update((items) => {
                const newBeverage = {
                    ...beverage,
                    amount: beverage.amount ?? 1
                };
                const updated = [...items, newBeverage];
                localStorage.setItem('beverages', JSON.stringify(updated));
                return updated;
            }),
        increaseBeverageAmount: (index: number) =>
            update((items) => {
                const updated = items.map((beverage, itemIndex) =>
                    itemIndex === index ? { ...beverage, amount: beverage.amount + 1 } : beverage
                );
                localStorage.setItem('beverages', JSON.stringify(updated));
                return updated;
            }),
        decreaseBeverageAmount: (index: number) =>
            update((items) => {
                const updated = items.map((beverage, itemIndex) =>
                    itemIndex === index && beverage.amount > 0
                        ? { ...beverage, amount: beverage.amount - 1 }
                        : beverage
                );
                localStorage.setItem('beverages', JSON.stringify(updated));
                return updated;
            }),
        removeBeverage: (index: number) =>
            update((items) => {
                const updated = items.filter((_, i) => i !== index);
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
