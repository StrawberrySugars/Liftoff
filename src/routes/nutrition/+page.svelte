<script lang="ts">
	// no SvelteSet required for this demo
	import { BarY, Plot } from 'svelteplot';
	import { nutrients as actualNutrients } from '$lib/nutrients';
	import { expected_nutrients as expectedNutrients } from '$lib/expected_nutrients';
	import conversions from '$lib/conversions.json';
	import { getAllPlants, getItemsForPlant, getQuantityForPlant } from '$lib/plant-utils';
	import { getPlantByName } from '$lib/planting';
	import { foods } from '$lib/foods';
	import { beverages } from '$lib/beverages';
	const convs = conversions as unknown as Record<string, Record<string, number>>;

	let allPlants = getAllPlants($foods, $beverages);

	function mealsForPlant(plant: string) {
		return getItemsForPlant(plant, $foods, $beverages);
	}

	function growTimeForPlant(plant: string) {
		return getPlantByName(plant)?.timeToHarvestDays;
	}

	function quantityForPlant(plant: string) {
		return getQuantityForPlant(plant, $foods, $beverages);
	}

	const ingredients = allPlants.map((plant) => ({
		name: plant,
		amount: quantityForPlant(plant),
		unit: 'g' // assuming all quantities are in grams for simplicity; adjust as needed
	}));
	const calories = ingredients
		.map((it) => actualNutrients[it.name]?.calories_kcal ?? 0)
		.reduce((a, b) => a + b, 0);

	function toGrams(ing: { name: string; amount: number; unit: string }) {
		const key = ing.name.toLowerCase();
		const conv = convs[key] ?? {};
		// direct unit match
		if (ing.unit === 'g') return ing.amount;
		if (conv[ing.unit]) return conv[ing.unit] * ing.amount;
		// fallback to common units
		const common = convs.units ?? {};
		if (common[ing.unit]) return common[ing.unit] * ing.amount;
		return 0;
	}

	// Build long-format results for the plot: push expected then actual for selected nutrients
	const nutrientKeys = ['calories_kcal', 'protein_g', 'carbs_g', 'fat_g'];
	const pretty: Record<string, string> = {
		calories_kcal: 'Calories',
		protein_g: 'Protein (g)',
		carbs_g: 'Carbs (g)',
		fat_g: 'Fat (g)'
	};

	const resultsLong: Array<{ year: string; percent: number; party: string }> = [];

	for (const ing of ingredients) {
		const grams = toGrams(ing);
		for (const key of nutrientKeys) {
			const expectedPer100 = Number((expectedNutrients[ing.name] ?? {})[key] ?? 0);
			const expectedScaled = (expectedPer100 * grams) / 100;
			resultsLong.push({
				year: ing.name,
				percent: Number(expectedScaled.toFixed(2)),
				party: `${pretty[key]} — expected`
			});

			const actualPer100 = Number((actualNutrients[ing.name] ?? {})[key] ?? 0);
			const actualScaled = (actualPer100 * grams) / 100;
			resultsLong.push({
				year: ing.name,
				percent: Number(actualScaled.toFixed(2)),
				party: `${pretty[key]} — actual`
			});
		}
	}

	const scheme: Record<string, string> = {};
	// generate a color per nutrient key
	const uniqueParties = Array.from(new Set(resultsLong.map((r) => r.party)));
	const palette = ['#3ca951', '#efb118', '#d23a33', '#55598e', '#bf1d97', '#2b9eb3'];
	uniqueParties.forEach((p, i) => (scheme[p] = palette[i % palette.length]));

	// static filtered results (user can wire interactive filters later)
	let resultsLongFiltered = resultsLong.slice();
</script>

<Plot
	x={{ label: 'Ingredient', axis: 'bottom' }}
	y={{ label: 'Scaled Value (per portion)' }}
	color={{ scheme }}
	fx={{ axis: 'bottom', axisProps: { tickFontSize: 12 } }}
	opacity={{ range: [0.4, 1] }}
>
	<BarY data={resultsLongFiltered} x="year" y="percent" fx="party" fill="party" />
</Plot>
