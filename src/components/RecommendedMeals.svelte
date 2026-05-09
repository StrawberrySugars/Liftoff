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

<h2>Recommended ingredients to plant</h2>
<div class="m-5 flex flex-col gap-4 rounded-lg border border-gray-300 p-5">
	<div class="flex w-fit flex-col gap-2">
		<label for="waterAvailable">Enter water availability (liters):</label>
		<input
			type="number"
			bind:value={waterAvailable}
			placeholder="Enter water availability (liters)"
			class="rounded border border-gray-300 p-1"
		/>
	</div>
	<div>
		<h4>It is recommended for you to plant:</h4>
		<ul>
			{#each plants as plant (plant.id)}
				<li>{plant.name}</li>
			{/each}
		</ul>
	</div>
</div>
