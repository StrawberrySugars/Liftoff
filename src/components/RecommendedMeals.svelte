<script lang="ts">
	import { browser } from '$app/environment';
	import type { Ingredient } from '$lib';
	import { suggestPlants } from '$lib/planting';
	import { onMount } from 'svelte';

	let waterAvailable = $state<number>(0);
	let plants = $derived<Ingredient[]>(suggestPlants(waterAvailable));

	onMount(() => {
		if (browser) {
			const saved = localStorage.getItem('waterAvailable');
			if (saved) {
				waterAvailable = JSON.parse(saved);
			}
		}
	});

	$effect(() => {
		if (browser) {
			localStorage.setItem('waterAvailable', JSON.stringify(waterAvailable));
		}
	});
</script>

<h2>Recommended Ingredients to Plant</h2>
<div class="m-5 flex flex-col gap-4 rounded-lg border border-gray-300 p-5">
	<form class="flex w-fit flex-col gap-2">
		<label for="waterAvailable" class="font-medium">Enter water availability (liters):</label>
		<input
			id="waterAvailable"
			type="number"
			bind:value={waterAvailable}
			placeholder="Enter water availability in liters"
			aria-describedby="water-help"
			class="rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
		/>
		<p id="water-help" class="text-sm text-gray-600">
			This helps determine which plants are best to grow
		</p>
	</form>
	<div class="mt-4">
		<h3 class="font-semibold">Recommended plants:</h3>
		<ul class="mt-2 list-inside list-disc">
			{#each plants as plant (plant.id)}
				<li>{plant.name}</li>
			{/each}
			{#if plants.length === 0}
				<li class="text-gray-500">No plants recommended. Enter a water availability value.</li>
			{/if}
		</ul>
	</div>
</div>
