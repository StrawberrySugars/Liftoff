import type { Ingredient } from '$lib';

export type PlantOption = Ingredient & {
    waterRequirementMm: number;
    timeToHarvestDays: number;
};

// Seasonal water requirement in millimeters of water.
// These values are normalized from crop watering guidance and crop water-use references,
// then matched against the amount of water available to the planting setup.
export const plants: PlantOption[] = [
    { id: "soybean", name: 'Soybean', waterRequirementMm: 600, timeToHarvestDays: 55 },
    { id: "lettuce", name: 'Lettuce (Green leaf)', waterRequirementMm: 250, timeToHarvestDays: 25 },
    { id: "carrot", name: 'Carrot', waterRequirementMm: 300, timeToHarvestDays: 75 },
    { id: "sweet-potato", name: 'Sweet potato', waterRequirementMm: 450, timeToHarvestDays: 130 },
    { id: "chickpea", name: 'Chickpea', waterRequirementMm: 350, timeToHarvestDays: 90 },
    { id: "tomato", name: 'Tomato', waterRequirementMm: 500, timeToHarvestDays: 70 },
    { id: "wheat", name: 'Wheat', waterRequirementMm: 550, timeToHarvestDays: 229 },
    { id: "dill", name: 'Dill', waterRequirementMm: 200, timeToHarvestDays: 90 },
    { id: "basil", name: 'Basil', waterRequirementMm: 220, timeToHarvestDays: 75 }
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
            timeToHarvestDays: plant.timeToHarvestDays
        }));
}
