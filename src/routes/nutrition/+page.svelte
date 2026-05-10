<script lang="ts">
	import { nutrients as actualNutrients } from '$lib/nutrients';
	import { foods } from '$lib/foods';
	import { beverages } from '$lib/beverages';
	import { plantAliases, normalizePlantName } from '$lib/planting';
	import { Plot, BarY, RuleY } from 'svelteplot';
	import { resolve } from '$app/paths';

	const HEALTH_CANADA_DAILY: Record<(typeof nutrientKeys)[number], number> = {
		calories_kcal: 2000,
		protein_g: 50,
		carbs_g: 130,
		fat_g: 65
	};
	const nutrientKeys = ['calories_kcal', 'protein_g', 'carbs_g', 'fat_g'] as const;
	const labels: Record<(typeof nutrientKeys)[number], string> = {
		calories_kcal: 'Calories',
		protein_g: 'Protein',
		carbs_g: 'Carbs',
		fat_g: 'Fat'
	};
	const units: Record<(typeof nutrientKeys)[number], string> = {
		calories_kcal: 'kcal',
		protein_g: 'g',
		carbs_g: 'g',
		fat_g: 'g'
	};

	const actualNuts = actualNutrients as unknown as Record<string, Record<string, number>>;

	const overallNutrients = nutrientKeys.map((key) => {
		let actual = 0;
		[...$foods, ...$beverages].forEach((item) => {
			(item.requiredPlants ?? []).forEach((plantName) => {
				const normalized = normalizePlantName(plantName);
				const realName = plantAliases[normalized] ?? plantName;
				const nutrients = actualNuts[realName];
				if (nutrients) {
					actual += (nutrients[key] ?? 0) * (item.amount ?? 1);
				}
			});
		});

		const expected = HEALTH_CANADA_DAILY[key];

		return {
			label: labels[key],
			unit: units[key],
			expected,
			actual: Number(actual.toFixed(2)),
			status: actual >= expected ? 'On target' : 'Needs improvement'
		};
	});
</script>

<main class="p-6" id="main-content">
	<section aria-labelledby="nutrition-summary-title">
		<h1 id="nutrition-summary-title" class="text-2xl font-semibold text-gray-900">
			Nutrient Summary
		</h1>
		<p class="mt-1 text-base text-gray-800">
			Overall nutrient intake based on current crops growing in <a
				class="text-blue-600 hover:text-blue-800"
				href={resolve('/ingredients')}>/ingredients</a
			>
			.
		</p>

		<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
			{#each overallNutrients as nutrient (nutrient.label)}
				<article class="rounded-xl border border-gray-300 bg-white p-4" role="listitem">
					<h3 class="text-base font-semibold text-gray-900">{nutrient.label}</h3>
					<dl class="mt-3 space-y-2 text-base [font-variant-numeric:tabular-nums]">
						<div class="flex items-baseline justify-between gap-3">
							<dt class="text-gray-700">Recommended</dt>
							<dd class="font-medium text-gray-900">{nutrient.expected} {nutrient.unit}</dd>
						</div>
						<div class="flex items-baseline justify-between gap-3">
							<dt class="text-gray-700">Predicted</dt>
							<dd class="font-medium text-gray-900">{nutrient.actual} {nutrient.unit}</dd>
						</div>
					</dl>
					<Plot grid>
						<RuleY data={[0]} />
						<BarY
							data={[
								{ label: 'Recommended', value: nutrient.expected },
								{
									label: 'Predicted',
									value: nutrient.actual
								}
							]}
							x="label"
							y="value"
							fill="status"
						/>
					</Plot>
				</article>
			{/each}
		</div>
	</section>
</main>
