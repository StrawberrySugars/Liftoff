import { writable } from 'svelte/store';

export interface Food {
    name: string;
    nutrients: string[];
    requiredPlants: string[];
}

const initialFoods: Food[] = [
    {
        "name": "Fresh Garden Salad",
        "requiredPlants": ["Lettuce", "Tomato", "Carrots", "Basil", "Dill"],
        "nutrients": ["Vitamin A", "Vitamin K", "Fiber"]
    },
    {
        "name": "Sweet Potato and Chickpea Stew",
        "requiredPlants": ["Sweet potato", "Chickpeas", "Dill"],
        "nutrients": ["Carbohydrates", "Protein", "Vitamin A"]
    },
    {
        "name": "Soybean and Tomato Stir-fry",
        "requiredPlants": ["Soybeans", "Tomato", "Basil"],
        "nutrients": ["Protein", "Healthy Fats", "Vitamin C"]
    },
    {
        "name": "Space Flatbread with Herb Garnish",
        "requiredPlants": ["Wheat (Ground into flour)", "Basil", "Dill"],
        "nutrients": ["Carbohydrates", "Protein"]
    },
    {
        "name": "Chickpea Lettuce Wraps",
        "requiredPlants": ["Lettuce", "Chickpeas", "Carrots"],
        "nutrients": ["Protein", "Fiber", "Vitamin K"]
    }
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
                };
                const updated = [...items, newFood];
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
