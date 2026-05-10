<script lang="ts">
	import { foods } from '$lib/foods';
	import { getPlantByName } from '$lib/planting';
	import { Link, MinusIcon, PlusIcon, Timer } from '@lucide/svelte';

	let daysElapsed = $state<number>(0);
	let allPlants = $derived([...new Set($foods.flatMap((item) => item.requiredPlants))].sort());

	function mealsForPlant(plant: string) {
		return $foods
			.filter((food) => food.requiredPlants.includes(plant))
			.map((food) => food.name)
			.sort();
	}

	function growTimeForPlant(plant: string) {
		return getPlantByName(plant)?.timeToHarvestDays;
	}
</script>

<div
	class=" flex flex-col gap-4 rounded-lg
    p-5"
>
	<div>
		<div class="flex">
			<div>
				<h2 class="text-lg">Recommended meals to prepare</h2>
				<p class="text-black/60">Based on the meals planned, you must grow:</p>
			</div>
			<div class="ml-auto flex overflow-hidden rounded-lg border border-gray-300">
				<button
					class="flex h-full items-center justify-center px-3 hover:bg-gray-100"
					onclick={() => (daysElapsed = Math.max(0, daysElapsed - 1))}
				>
					<MinusIcon size={18} />
				</button>
				<input
					type="number"
					bind:value={daysElapsed}
					class="w-12 border-r border-l border-gray-300 px-2 py-2 text-center focus:outline-none"
				/>
				<button
					class="flex h-full items-center justify-center px-3 hover:bg-gray-100"
					onclick={() => (daysElapsed = daysElapsed + 1)}
				>
					<PlusIcon size={18} />
				</button>
			</div>
		</div>
		<ul class="mt-2 space-y-3">
			{#each allPlants as plant (plant)}
				<li
					class="flex list-none items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
				>
					<!-- <div class="mt-1 h-2 w-2 shrink-0 rounded-full bg-gray-400"></div> -->
					<div class="min-w-0 flex-1">
						<div class="flex flex-wrap items-center gap-2">
							<div class="font-semibold">{plant}</div>
						</div>
						<div class="mt-1 flex items-center gap-1 text-sm text-gray-700">
							<Link size={14} />
							<span class="truncate">Required by: </span><span class="text-black"
								>{mealsForPlant(plant).join(', ')}</span
							>
						</div>
						<div class="mt-1 flex items-center gap-1 text-sm text-gray-700">
							{#if growTimeForPlant(plant)}
								<Timer size={14} />
								<span>
									Grow time: {growTimeForPlant(plant)} days
								</span>
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
