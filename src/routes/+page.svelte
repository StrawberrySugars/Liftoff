<script lang="ts">
	import { foods } from '$lib/foods';
	import RecommendedMeals from '../components/RecommendedMeals.svelte';

	let shown = $state(false);
</script>

<RecommendedMeals />

<h2>List of Foods</h2>
<div class="create">+ add a food</div>
<div>
	{#each $foods as food (food.id)}
		<div class="list">
			<div class="item item1">
				{food.name}
			</div>
			<div class="item item2">{food.calories} calories/8oz</div>
			<div class="item item3">{food.amount}g remaining</div>
			<div class="item item4">edit</div>
		</div>
	{/each}
</div>

<br>