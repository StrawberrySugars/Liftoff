import { writable } from 'svelte/store';

export interface Food {
    name: string;
    nutrients: string[];
    requiredPlants: string[];
    amount: number;
}

const initialFoods: Food[] = [
    {
        "name": "Garden Salad",
        "requiredPlants": ["Lettuce", "Tomato", "Carrots", "Basil", "Dill"],
        "nutrients": ["Vitamin A", "Vitamin K", "Fiber"],
        "amount": 1
    },
    {
        "name": "Sweet Potato Stew",
        "requiredPlants": ["Sweet potato", "Chickpeas", "Dill"],
        "nutrients": ["Carbohydrates", "Protein", "Vitamin A"],
        "amount": 1
    },
    {
        "name": "Soybean Stir-fry",
        "requiredPlants": ["Soybeans", "Tomato", "Basil"],
        "nutrients": ["Protein", "Healthy Fats", "Vitamin C"],
        "amount": 1
    },
    {
        "name": "Herb Flatbread",
        "requiredPlants": ["Wheat (Ground into flour)", "Basil", "Dill"],
        "nutrients": ["Carbohydrates", "Protein"],
        "amount": 1
    },
    {
        "name": "Chickpea Wraps",
        "requiredPlants": ["Lettuce", "Chickpeas", "Carrots"],
        "nutrients": ["Protein", "Fiber", "Vitamin K"],
        "amount": 1
    }
];

function normalizeFoods(items: Food[]) {
    return items.map((food) => ({
        ...food,
        amount: food.amount ?? 1
    }));
}

function createFoodStore() {
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('foods') : null;
    const initialData = storedData ? normalizeFoods(JSON.parse(storedData)) : initialFoods;

    const { subscribe, set, update } = writable<Food[]>(initialData);

    return {
        subscribe,
        addFood: (food: Omit<Food, 'id'>) =>
            update((items) => {
                const newFood = {
                    ...food,
                    amount: food.amount ?? 1
                };
                const updated = [...items, newFood];
                localStorage.setItem('foods', JSON.stringify(updated));
                return updated;
            }),
        increaseFoodAmount: (index: number) =>
            update((items) => {
                const updated = items.map((food, itemIndex) =>
                    itemIndex === index ? { ...food, amount: food.amount + 1 } : food
                );
                localStorage.setItem('foods', JSON.stringify(updated));
                return updated;
            }),
        decreaseFoodAmount: (index: number) =>
            update((items) => {
                const updated = items.map((food, itemIndex) =>
                    itemIndex === index && food.amount > 0
                        ? { ...food, amount: food.amount - 1 }
                        : food
                );
                localStorage.setItem('foods', JSON.stringify(updated));
                return updated;
            }),
        removeFood: (index: number) =>
            update((items) => {
                const updated = items.filter((_, i) => i !== index);
                localStorage.setItem('foods', JSON.stringify(updated));
                return updated;
            }),
        reset: () => {
            set(initialFoods);
            localStorage.setItem('foods', JSON.stringify(initialFoods));
        }
    };
}

export const foods = createFoodStore();
