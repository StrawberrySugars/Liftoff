import type { Ingredient } from '$lib';

export type PlantOption = Ingredient & {
    waterRequirementMm: number;
    timeToHarvestDays: number;
    list: number;
};

// Seasonal water requirement in millimeters of water.
// These values are normalized from crop watering guidance and crop water-use references,
// then matched against the amount of water available to the planting setup.
export const plants: PlantOption[] = [
    { id: "soybean", name: 'Soybean', waterRequirementMm: 600, timeToHarvestDays: 55, list: 1 },
    { id: "lettuce", name: 'Lettuce (Green leaf)', waterRequirementMm: 250, timeToHarvestDays: 25, list: 1 },
    { id: "carrot", name: 'Carrot', waterRequirementMm: 300, timeToHarvestDays: 75, list: 1 },
    { id: "sweet-potato", name: 'Sweet potato', waterRequirementMm: 450, timeToHarvestDays: 130, list: 1 },
    { id: "chickpea", name: 'Chickpea', waterRequirementMm: 350, timeToHarvestDays: 90, list: 1 },
    { id: "tomato", name: 'Tomato', waterRequirementMm: 500, timeToHarvestDays: 70, list: 1 },
    { id: "wheat", name: 'Wheat', waterRequirementMm: 550, timeToHarvestDays: 229, list: 1 },
    { id: "dill", name: 'Dill', waterRequirementMm: 200, timeToHarvestDays: 90, list: 1 },
    { id: "basil", name: 'Basil', waterRequirementMm: 220, timeToHarvestDays: 75, list: 1 },
    { id: "coffee-beans", name: 'Coffee beans', waterRequirementMm: 2000, timeToHarvestDays: 255, list: 2 },
    { id: "tea-leaves", name: 'Tea leaves', waterRequirementMm: 1750, timeToHarvestDays: 1000, list: 2 }
];

const plantAliases: Record<string, string> = {
    soybean: 'Soybean',
    soybeans: 'Soybean',
    lettuce: 'Lettuce (Green leaf)',
    carrot: 'Carrot',
    'sweet potato': 'Sweet potato',
    chickpea: 'Chickpea',
    chickpeas: 'Chickpea',
    tomato: 'Tomato',
    wheat: 'Wheat',
    'wheat (ground into flour)': 'Wheat',
    dill: 'Dill',
    basil: 'Basil'
};

function normalizePlantName(name: string) {
    return name.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function getPlantByName(name: string): PlantOption | undefined {
    const normalizedName = normalizePlantName(name);
    const plantName = plantAliases[normalizedName] ?? name;
    return plants.find((plant) => plant.name === plantName);
}

export function suggestPlants(availableWater: number): PlantOption[] {
    return plants
        .filter((plant) => plant.waterRequirementMm <= availableWater)
        .sort((left, right) => left.waterRequirementMm - right.waterRequirementMm)
        .map((plant) => ({
            id: plant.id,
            name: plant.name,
            waterRequirementMm: plant.waterRequirementMm,
            timeToHarvestDays: plant.timeToHarvestDays,
            list: plant.list
        }));
}
