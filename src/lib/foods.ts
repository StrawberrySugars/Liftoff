import { writable } from 'svelte/store';

export interface Food {
    name: string;
    nutrients: string[];
    requiredPlants: string[];
    amount: number;
    img: string;
}

const initialFoods: Food[] = [
    {
        "name": "Garden Salad",
        "requiredPlants": ["Lettuce", "Tomato", "Carrots", "Basil", "Dill"],
        "nutrients": ["Vitamin A", "Vitamin K", "Fiber"],
        "amount": 1,
        img: "https://neighborfoodblog.com/wp-content/uploads/2020/03/garden-salad-2-735x1103.jpg"
    },
    {
        "name": "Sweet Potato Stew",
        "requiredPlants": ["Sweet potato", "Chickpeas", "Dill"],
        "nutrients": ["Carbohydrates", "Protein", "Vitamin A"],
        "amount": 1,
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.chelseasmessyapron.com%2Fwp-content%2Fuploads%2F2015%2F12%2FSweet-Potato-Stew-2-768x1152.jpg&f=1&nofb=1&ipt=aa57d33dcb96f7d8e01ab5f66d7ea847ef265d298c4c82c8863a7e4979f644bd"
    },
    {
        "name": "Soybean Stir-fry",
        "requiredPlants": ["Soybeans", "Tomato", "Basil"],
        "nutrients": ["Protein", "Healthy Fats", "Vitamin C"],
        "amount": 1,
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.chelseasmessyapron.com%2Fwp-content%2Fuploads%2F2015%2F12%2FSweet-Potato-Stew-2-768x1152.jpg&f=1&nofb=1&ipt=aa57d33dcb96f7d8e01ab5f66d7ea847ef265d298c4c82c8863a7e4979f644bd"
    },
    {
        "name": "Herb Flatbread",
        "requiredPlants": ["Wheat (Ground into flour)", "Basil", "Dill"],
        "nutrients": ["Carbohydrates", "Protein"],
        "amount": 1,
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkindkitchenrecipes.com%2Fwp-content%2Fuploads%2F2025%2F08%2FGarlic-Butter-and-Herb-Flatbread.jpg&f=1&nofb=1&ipt=4f204ebfa501214c8fb0b307542d00d6bf60926ae4b075b4ea864c3ca69fdcae"
    },
    {
        "name": "Chickpea Wraps",
        "requiredPlants": ["Lettuce", "Chickpeas", "Carrots"],
        "nutrients": ["Protein", "Fiber", "Vitamin K"],
        "amount": 1,
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbetterhomerecipes.com%2Fwp-content%2Fuploads%2F2025%2F10%2Fihjaobcrutbicyqsmzvz.webp&f=1&nofb=1&ipt=a7510af6958942650bfac8955897dbe4cdbd2288b0986980734ba2014ca06b92"
    }
];

function normalizeFoodName(name: string) {
    return name.trim().toLowerCase();
}

const initialFoodImageByName = new Map(
    initialFoods.map((food) => [normalizeFoodName(food.name), food.img])
);

function resolveFoodImage(food: Pick<Food, 'name' | 'img'>) {
    const canonicalImage = initialFoodImageByName.get(normalizeFoodName(food.name));
    if (canonicalImage) {
        return canonicalImage;
    }

    return food.img?.trim() ?? '';
}

function normalizeFoods(items: Food[]) {
    return items.map((food) => ({
        ...food,
        amount: food.amount ?? 1,
        img: resolveFoodImage(food)
    }));
}

function createFoodStore() {
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('foods') : null;
    const initialData = storedData ? normalizeFoods(JSON.parse(storedData)) : initialFoods;

    if (typeof window !== 'undefined') {
        localStorage.setItem('foods', JSON.stringify(initialData));
    }

    const { subscribe, set, update } = writable<Food[]>(initialData);

    return {
        subscribe,
        addFood: (food: Omit<Food, 'id'>) =>
            update((items) => {
                const newFood = {
                    ...food,
                    amount: food.amount ?? 1,
                    img: resolveFoodImage(food)
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
