<script lang="ts">
	import { ingredients } from '$lib/ingredientStore';
	import { suggestMeals } from '$lib/meals';

	const ingredientsList = $ingredients;
	const meals = suggestMeals(ingredientsList);
</script>

<h2>Recommended Meals</h2>
<div class="recMeal">
	<h4>It is recommended for you to have:</h4>
	<ul>
		{#each meals as meal (meal.id)}
			<li>{meal.name}</li>
		{/each}
	</ul>
</div>
