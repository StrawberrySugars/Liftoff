<script lang="ts">
	import type { Meal } from '$lib';
	import { ingredients } from '$lib/ingredientStore';
	import { suggestMeals } from '$lib/meals';
	let meals = $state<Meal[]>([]);
</script>

<h2>Recommended ingredients to plant</h2>
<div class="recMeal">
	<h4>It is recommended for you to plant:</h4>
	<ul>
		{#each meals as meal (meal.id)}
			<li>{meal.name}</li>
		{/each}
	</ul>
</div>
