import type { Ingredient } from "$lib";

type PlantOption = Ingredient & {
    waterRequirementMm: number;
};

// Seasonal water requirement in millimeters of water.
// These values are normalized from crop watering guidance and crop water-use references,
// then matched against the amount of water available to the planting setup.
const plants: PlantOption[] = [
    { id: 1, name: 'Soybean', waterRequirementMm: 600 },
    { id: 2, name: 'Lettuce (Green leaf)', waterRequirementMm: 250 },
    { id: 3, name: 'Carrot', waterRequirementMm: 300 },
    { id: 4, name: 'Sweet potato', waterRequirementMm: 450 },
    { id: 5, name: 'Chickpea', waterRequirementMm: 350 },
    { id: 6, name: 'Tomato', waterRequirementMm: 500 },
    { id: 7, name: 'Wheat', waterRequirementMm: 550 },
    { id: 8, name: 'Dill', waterRequirementMm: 200 },
    { id: 9, name: 'Basil', waterRequirementMm: 220 }
];

export function suggestPlants(availableWater: number): Ingredient[] {
    return plants
        .filter((plant) => plant.waterRequirementMm <= availableWater)
        .sort((left, right) => left.waterRequirementMm - right.waterRequirementMm)
        .map((plant) => ({
            id: plant.id,
            name: plant.name
        }));
}