<script lang="ts">
	import { foods } from '$lib/foods';
	import { MinusIcon, PlusIcon, TrashIcon } from '@lucide/svelte';
	import Popup from '../components/Popup.svelte';
	import { plants } from '$lib/planting';

	let shown = $state(false);
	let mealName = $state('');
	let selectedIngredients = $state<string[]>([]);

	function addMeal() {
		if (!mealName.trim() || selectedIngredients.length === 0) {
			return;
		}

		const selectedPlants = plants
			.filter((plant) => selectedIngredients.includes(plant.id))
			.map((plant) => plant.name);

		foods.addFood({
			name: mealName,
			requiredPlants: selectedPlants,
			nutrients: [],
			amount: 1
		});

		// Reset form
		mealName = '';
		selectedIngredients = [];
		shown = false;
	}
</script>

{#if shown}
	<Popup onDismiss={() => (shown = false)}>
		<div class="flex flex-col gap-5">
			<h2 class="text-xl font-bold">Add a New Meal</h2>

			<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
				<div class="mb-4">
					<h3 class="text-lg font-semibold">Ingredients checklist</h3>
					<p class="text-sm text-gray-600">
						Pick the ingredients you want to include in this meal.
					</p>
				</div>

				<fieldset class="border-0 p-0">
					<legend class="sr-only">Select ingredients</legend>
					<div class="grid max-h-72 grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
						{#each plants as ingredient (ingredient.id)}
							<label
								class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
							>
								<input
									type="checkbox"
									bind:group={selectedIngredients}
									value={ingredient.id}
									class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									aria-label="Include {ingredient.name} in meal"
								/>
								<span class="font-medium text-gray-800">{ingredient.name}</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<p class="mt-4 text-sm text-gray-600" role="status" aria-live="polite">
					Selected: <span class="font-semibold text-gray-900">{selectedIngredients.length}</span>
					{#if selectedIngredients.length === 0}
						<span class="ml-2 text-orange-600">(at least 1 required)</span>
					{/if}
				</p>
			</div>

			<div class="flex flex-col gap-2">
				<label for="mealNameInput" class="text-sm font-medium text-gray-700">Meal name</label>
				<input
					id="mealNameInput"
					type="text"
					bind:value={mealName}
					placeholder="e.g., Garden Salad"
					class="rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					aria-label="Name of the meal"
					aria-describedby="mealNameHint"
				/>
				<p id="mealNameHint" class="text-xs text-gray-500">Enter a descriptive name for your meal</p>
			</div>
			<button
				onclick={addMeal}
				disabled={!mealName.trim() || selectedIngredients.length === 0}
				class="rounded bg-blue-500 px-4 py-2 text-white font-medium disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition"
				aria-label="Add new meal with selected ingredients"
			>
				Add Meal
			</button>
		</div>
	</Popup>
{/if}

<div class="p-5">
	<h2 class="pb-2 text-lg font-semibold">List of Meals</h2>
	<div class="mt-5 space-y-2">
		{#each $foods as food, index (food.name)}
			<div class="mb-2 flex items-center justify-between rounded-lg border border-gray-300 p-3 hover:border-gray-400">
				<div class="flex-1">
					<h3 class="font-semibold text-gray-900">{food.name}</h3>
					<p class="text-sm text-gray-600">Ingredients: {food.requiredPlants.join(', ')}</p>
				</div>
				<div class="flex items-center gap-2 ml-4">
					<button
						disabled={food.amount <= 0}
						class="cursor-pointer rounded p-1 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent transition"
						onclick={() => foods.decreaseFoodAmount(index)}
						aria-label="Decrease quantity of {food.name}"
						title="Decrease quantity"
					>
						<MinusIcon size={18} aria-hidden="true" />
					</button>
					<div
						class="min-w-8 text-center font-medium"
						role="status"
						aria-live="polite"
						aria-label="Quantity: {food.amount}"
					>
						{food.amount}
					</div>
					<button
						class="cursor-pointer rounded p-1 hover:bg-gray-300 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						onclick={() => foods.increaseFoodAmount(index)}
						aria-label="Increase quantity of {food.name}"
						title="Increase quantity"
					>
						<PlusIcon size={18} aria-hidden="true" />
					</button>
					<button
						class="cursor-pointer rounded p-1 hover:bg-red-100 text-red-600 transition focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none ml-2"
						onclick={() => foods.removeFood(index)}
						aria-label="Remove {food.name} from meal list"
						title="Delete meal"
					>
						<TrashIcon size={18} aria-hidden="true" />
					</button>
				</div>
			</div>
		{/each}
		{#if $foods.length === 0}
			<p class="text-center text-gray-500 py-8">No meals added yet. Click "Add Meal" to get started!</p>
		{/if}
	</div>
</div>

<br />
