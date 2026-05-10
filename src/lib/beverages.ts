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
        "img": "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg",
        "ingStr": " "
    },
    {
        "name": "Coffee",
        "requiredPlants": ["Coffee beans"],
        "amount": 1,
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG?utm_source=meta.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
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

function normalizeBeverage(beverage: Beverage) {
    return {
        ...beverage,
        amount: beverage.amount ?? 1,
        ingStr: beverage.ingStr ?? (beverage.requiredPlants.length > 0 ? 'Ingredients:' : '')
    };
}

function normalizeBeverages(items: Beverage[]) {
    return items.map(normalizeBeverage);
}

function normalizeBeverageName(name: string) {
    return name.trim().toLowerCase();
}

const initialBeverageImageByName = new Map(
    initialBeverages.map((beverage) => [normalizeBeverageName(beverage.name), beverage.img])
);

function resolveBeverageImage(beverage: Pick<Beverage, 'name' | 'img'>) {
    const canonicalImage = initialBeverageImageByName.get(normalizeBeverageName(beverage.name));
    if (canonicalImage) {
        return canonicalImage;
    }

    return beverage.img?.trim() ?? '';
}

const initialBeverageIngStrByName = new Map(
    initialBeverages.map((beverage) => [normalizeBeverageName(beverage.name), beverage.ingStr])
);

function getIngStr(beverage: Pick<Beverage, 'ingStr'>) {
    return beverage.ingStr?.trim() ?? '';
}

function createBeverageStore() {
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('beverages') : null;
    const initialData = storedData ? normalizeBeverages(JSON.parse(storedData)) : initialBeverages;

    const { subscribe, set, update } = writable<Beverage[]>(initialData);

    return {
        subscribe,
        addBeverage: (beverage: Omit<Beverage, 'id'>) =>
            update((items) => {
                const newBeverage = normalizeBeverage({
                    ...beverage,
                    amount: beverage.amount ?? 1
                } as Beverage);
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
