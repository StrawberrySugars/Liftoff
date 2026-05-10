import { writable } from 'svelte/store';

export interface Beverage {
    name: string;
    requiredPlants: string[];
    amount: number;
    img: string;
    ingStr: string;
}

const initialBeverages: Beverage[] = [
    {
        "name": "Water",
        "requiredPlants": [],
        "amount": 1,
        "img": "https://www.eatright.org/health/essential-nutrients/water/what-makes-a-healthful-drink-of-water",
        "ingStr": ""
    },
    {
        "name": "Coffee",
        "requiredPlants": ["Coffee beans"],
        "amount": 1,
        "img": "https://www.eatright.org/health/wellness/healthful-habits/benefits-of-coffee",
        "ingStr": "Ingredients:"
    },
    {
        "name": "Tea",
        "requiredPlants": ["Tea leaves"],
        "amount": 1,
        "img": "https://ca.brodandtaylor.com/cdn/shop/articles/dehydrated-tea-thumb_1024x.jpg?v=1648657037",
        "ingStr": "Ingredients:"
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
