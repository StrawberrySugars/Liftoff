<script lang="ts">
	import { foods } from '$lib/foods';
	import { ingredients } from '$lib/ingredientStore';
	import { PlusIcon } from '@lucide/svelte';
	import Popup from '../components/Popup.svelte';

	let shown = $state(false);
	let mealName = $state('');
	let selectedIngredients = $state<number[]>([]);

	function addMeal() {
		const selectedIngredientNames = $ingredients
			.filter((ingredient) => selectedIngredients.includes(ingredient.id))
			.map((ingredient) => ingredient.name);

		if (!mealName.trim() || selectedIngredientNames.length === 0) {
			return;
		}

		foods.addFood({
			name: mealName.trim(),
			nutrients: selectedIngredientNames,
			requiredPlants: selectedIngredientNames
		});

		mealName = '';
		selectedIngredients = [];
		shown = false;
	}
</script>

{#if shown}
	<Popup onDismiss={() => (shown = false)}>
		<div class="flex flex-col gap-5">
			<h2>Add a new meal</h2>

			<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
				<div class="mb-4">
					<h3 class="text-lg font-semibold">Ingredients checklist</h3>
					<p class="text-sm text-gray-600">
						Pick the ingredients you want to include in this meal.
					</p>
				</div>

				<div class="grid max-h-72 grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
					{#each $ingredients as ingredient (ingredient.id)}
						<label
							class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:border-blue-400 hover:bg-blue-50"
						>
							<input
								type="checkbox"
								bind:group={selectedIngredients}
								value={ingredient.id}
								class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span class="font-medium text-gray-800">{ingredient.name}</span>
						</label>
					{/each}
				</div>

				<p class="mt-4 text-sm text-gray-600">
					Selected: <span class="font-semibold text-gray-900">{selectedIngredients.length}</span>
				</p>
			</div>

			<input
				type="text"
				bind:value={mealName}
				placeholder="Meal name"
				class="rounded border border-gray-300 p-2"
			/>
			<button onclick={addMeal} class="rounded bg-blue-500 px-4 py-2 text-white">Add Meal</button>
		</div>
	</Popup>
{/if}

<div class="p-5">
	<h2 class="pb-2 text-lg">List of Meals</h2>
	<button
		class="flex cursor-pointer gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		onclick={() => {
			mealName = '';
			selectedIngredients = [];
			shown = true;
		}}
	>
		<PlusIcon /> add a meal
	</button>
	<div class="mt-5">
		{#each $foods as food (food.name)}
			<div class="mb-2 flex rounded-lg border border-gray-300 p-3">
				<div class="item item1">
					{food.name}
				</div>
				<div class="item item2">{food.requiredPlants.join(', ')}</div>
				<div class="item item4">edit</div>
			</div>
		{/each}
	</div>
</div>

<br>