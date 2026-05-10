<script lang="ts">
	import { foods } from '$lib/foods';
	import { MinusIcon, PlusIcon, TrashIcon } from '@lucide/svelte';
</script>

<main class="p-5" id="main-content">
	<h1 class="pb-2 text-2xl font-semibold">List of Meals</h1>
	<div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each $foods as food, index (food.name)}
			<div
				class="flex h-full flex-col rounded-lg border border-gray-300 transition hover:border-gray-400"
			>
				{#if food.img}
					<img
						src={food.img}
						alt={food.name}
						class="h-70 w-full rounded-t-lg object-cover"
						onerror={(event) => {
							(event.currentTarget as HTMLImageElement).style.display = 'none';
						}}
					/>
				{/if}
				<div class="p-4">
					<div class="flex-1">
						<h3 class="font-semibold text-gray-900">{food.name}</h3>
						<p class="text-sm text-gray-600">Ingredients: {food.requiredPlants.join(', ')}</p>
					</div>
					<div class="mt-4 flex items-center justify-between gap-2 border-t border-gray-200 pt-3">
						<div class="flex items-center gap-2">
							<button
								disabled={food.amount <= 0}
								class="cursor-pointer rounded p-1 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
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
								class="cursor-pointer rounded p-1 transition hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
								onclick={() => foods.increaseFoodAmount(index)}
								aria-label="Increase quantity of {food.name}"
								title="Increase quantity"
							>
								<PlusIcon size={18} aria-hidden="true" />
							</button>
						</div>
						<!-- <button
							class="cursor-pointer rounded p-1 text-red-600 transition hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
							onclick={() => foods.removeFood(index)}
							aria-label="Remove {food.name} from meal list"
							title="Delete meal"
						>
							<TrashIcon size={18} aria-hidden="true" />
						</button> -->
					</div>
				</div>
			</div>
		{/each}
		{#if $foods.length === 0}
			<p class="py-8 text-center text-gray-500 sm:col-span-2 lg:col-span-3">
				No meals added yet. Click "Add Meal" to get started!
			</p>
		{/if}
	</div>
</main>
