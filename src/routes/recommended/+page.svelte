<script lang="ts">
	import { foods } from '$lib/foods';
	import { beverages } from '$lib/beverages';
	import { getPlantByName, getPlantId } from '$lib/planting';
	import { Link, MinusIcon, PlusIcon, Timer } from '@lucide/svelte';

	let daysElapsed = $state<number>(
		typeof window !== 'undefined' ? parseInt(localStorage.getItem('daysElapsed') ?? '0', 10) : 0
	);

	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('daysElapsed', daysElapsed.toString());
		}
	});

	let allPlants = $derived(
		[...new Set([
			...$foods.flatMap((item) => item.requiredPlants),
			...$beverages.flatMap((item) => item.requiredPlants)])
		].sort());

	function mealsForPlant(plant: string) {
		if (getPlantId(1)) {
			return $foods
				.filter((food) => food.requiredPlants.includes(plant))
				.map((food) => food.name)
				.sort();
		} else {
			return $beverages
				.filter((beverage) => beverage.requiredPlants.includes(plant))
				.map((beverage) => beverage.name)
				.sort();
		}
	}

	function growTimeForPlant(plant: string) {
		return getPlantByName(plant)?.timeToHarvestDays;
	}

	function quantityForPlant(plant: string) {
		if (getPlantId(1)) {
			return $foods
				.filter((food) => food.requiredPlants.includes(plant) && food.amount > 0)
				.reduce((sum, food) => sum + food.amount, 0);
		} else {
			return $beverages
				.filter((beverage) => beverage.requiredPlants.includes(plant) && beverage.amount > 0)
				.reduce((sum, beverage) => sum + beverage.amount, 0);
		}
	}
</script>

<div class="flex flex-col gap-4 rounded-lg p-5">
	<div>
		<div class="flex pb-2">
			<div>
				<h2 class="text-lg font-semibold">Recommended meals to prepare</h2>
				<p class="text-black/70">Based on the meals planned, you must grow:</p>
			</div>
			<div class="ml-auto flex overflow-hidden rounded-lg border border-gray-300">
				<button
					class="flex h-full items-center justify-center px-3 transition-opacity focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none {daysElapsed ===
					0
						? 'cursor-not-allowed opacity-50 '
						: 'hover:bg-gray-100'}"
					onclick={() => (daysElapsed = Math.max(0, daysElapsed - 1))}
					disabled={daysElapsed === 0}
					aria-label="Decrease days elapsed"
				>
					<MinusIcon size={18} />
				</button>
				<input
					type="number"
					bind:value={daysElapsed}
					min="0"
					step="1"
					class="w-15 border-r border-l border-gray-300 px-2 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					aria-label="Days elapsed for plant growth"
				/>
				<button
					class="flex h-full items-center justify-center px-3 transition-opacity hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					onclick={() => (daysElapsed = daysElapsed + 1)}
					aria-label="Increase days elapsed"
				>
					<PlusIcon size={18} />
				</button>
			</div>
		</div>
		<ul class="mt-4 space-y-3" role="list">
			{#each allPlants as plant (plant)}
				<li
					class="flex list-none items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
					role="listitem"
				>
					<div class="min-w-0 flex-1">
						<div class="flex flex-wrap items-center gap-2">
							<h3 class="font-semibold">{plant}</h3>
							<span
								class="text-sm text-gray-600"
								aria-label={`${plant} quantity: ${quantityForPlant(plant)}`}
								>× {quantityForPlant(plant)}</span
							>
						</div>
						<div class="mt-1 flex items-center gap-1 text-sm text-gray-600">
							<Link size={14} aria-hidden="true" />
							<span class="truncate">Required by: </span><span class="text-gray-900"
								>{mealsForPlant(plant).join(', ')}</span
							>
						</div>
						<div class="mt-1 flex items-center gap-1 text-sm text-gray-700">
							{#if growTimeForPlant(plant)}
								{@const time = growTimeForPlant(plant)! - daysElapsed}
								{#if time > 0}
									<Timer size={14} aria-hidden="true" />
									<span>
										Grow time: {growTimeForPlant(plant)! - daysElapsed} days remaining
									</span>
								{:else}
									<div
										class="flex items-center gap-1 rounded-lg bg-green-200 px-2 py-1 text-xs text-green-800"
										role="status"
										aria-live="polite"
										aria-label="Harvest ready"
									>
										<Timer size={14} aria-hidden="true" />
										<span>
											Harvest ready!
											{#if time < 0}
												({-time} days ago)
											{/if}
										</span>
									</div>
								{/if}
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
