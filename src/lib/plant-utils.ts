import type { Food as FoodType } from '$lib/foods';

type ItemLike = { requiredPlants?: string[]; name?: string; amount?: number };

export function getAllPlants(...arrays: Array<ItemLike[]>) {
    const set = new Set<string>();
    arrays.flat().forEach((item) => {
        (item.requiredPlants ?? []).forEach((p) => set.add(p));
    });
    return Array.from(set).sort();
}

export function getItemsForPlant(plant: string, ...arrays: Array<ItemLike[]>) {
    return arrays
        .flat()
        .filter((item) => (item.requiredPlants ?? []).includes(plant))
        .map((item) => item.name ?? '')
        .filter(Boolean)
        .sort();
}

export function getQuantityForPlant(plant: string, ...arrays: Array<ItemLike[]>) {
    return arrays
        .flat()
        .filter((item) => (item.requiredPlants ?? []).includes(plant) && (item.amount ?? 0) > 0)
        .reduce((sum, item) => sum + (item.amount ?? 0), 0);
}

export type { FoodType };
